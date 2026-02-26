-- ============================================================================
-- VIDA Ecosystem - Migration 00002: Public Schema Tables
-- ============================================================================
-- Core public tables: profiles, family_groups, family_members
-- Includes ENUM types, foreign keys, constraints, indexes, and RLS policies
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUM Types
-- ----------------------------------------------------------------------------

CREATE TYPE public.family_role AS ENUM (
  'admin',
  'member',
  'child',
  'extended',
  'trusted'
);

-- ----------------------------------------------------------------------------
-- Helper function: get current authenticated user ID
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID
LANGUAGE sql
STABLE
AS $$
  SELECT auth.uid();
$$;

-- ----------------------------------------------------------------------------
-- Trigger function: auto-update updated_at timestamp
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ----------------------------------------------------------------------------
-- Trigger function: auto-create profile on signup
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

-- ----------------------------------------------------------------------------
-- Function: generate invite code
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.generate_invite_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
  exists_already BOOLEAN;
BEGIN
  LOOP
    code := upper(substr(md5(random()::text), 1, 8));
    SELECT EXISTS(SELECT 1 FROM public.family_groups WHERE invite_code = code) INTO exists_already;
    EXIT WHEN NOT exists_already;
  END LOOP;
  RETURN code;
END;
$$;

-- ============================================================================
-- TABLE: profiles
-- ============================================================================

CREATE TABLE public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT NOT NULL DEFAULT '',
  avatar_url      TEXT DEFAULT '',
  phone           TEXT,
  currency_preference TEXT NOT NULL DEFAULT 'MZN',
  tier            TEXT NOT NULL DEFAULT 'FREE' CHECK (tier IN ('FREE', 'PREMIUM', 'FAMILY')),
  locale          TEXT NOT NULL DEFAULT 'pt-MZ',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.profiles IS 'User profile data extending auth.users';

-- Indexes
CREATE INDEX idx_profiles_email ON public.profiles (email);

-- Updated_at trigger
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- TABLE: family_groups
-- ============================================================================

CREATE TABLE public.family_groups (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  description     TEXT,
  created_by      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invite_code     TEXT UNIQUE NOT NULL DEFAULT public.generate_invite_code(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.family_groups IS 'Family groups that users can create and join';

-- Indexes
CREATE INDEX idx_family_groups_created_by ON public.family_groups (created_by);
CREATE INDEX idx_family_groups_invite_code ON public.family_groups (invite_code);

-- Updated_at trigger
CREATE TRIGGER set_family_groups_updated_at
  BEFORE UPDATE ON public.family_groups
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: family_members
-- ============================================================================

CREATE TABLE public.family_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id        UUID NOT NULL REFERENCES public.family_groups(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role            public.family_role NOT NULL DEFAULT 'member',
  nickname        TEXT,
  relationship    TEXT,
  permissions     JSONB DEFAULT '{}',
  joined_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- A user can only be a member of a group once
  UNIQUE (group_id, user_id)
);

COMMENT ON TABLE public.family_members IS 'Membership records linking users to family groups';

-- Indexes
CREATE INDEX idx_family_members_group_id ON public.family_members (group_id);
CREATE INDEX idx_family_members_user_id ON public.family_members (user_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- Profiles RLS Policies
-- --------------------------------------------------------------------------

-- Users can read their own profile
CREATE POLICY "profiles_select_own"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can read profiles of people in their family groups
CREATE POLICY "profiles_select_family"
  ON public.profiles
  FOR SELECT
  USING (
    id IN (
      SELECT fm.user_id
      FROM public.family_members fm
      WHERE fm.group_id IN (
        SELECT fm2.group_id
        FROM public.family_members fm2
        WHERE fm2.user_id = auth.uid()
      )
    )
  );

-- Users can insert their own profile (handled by trigger, but allow manual)
CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "profiles_delete_own"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- --------------------------------------------------------------------------
-- Family Groups RLS Policies
-- --------------------------------------------------------------------------

-- Members can see groups they belong to
CREATE POLICY "family_groups_select_member"
  ON public.family_groups
  FOR SELECT
  USING (
    id IN (
      SELECT fm.group_id
      FROM public.family_members fm
      WHERE fm.user_id = auth.uid()
    )
    OR created_by = auth.uid()
  );

-- Authenticated users can create groups
CREATE POLICY "family_groups_insert"
  ON public.family_groups
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Only group creator (admin) can update the group
CREATE POLICY "family_groups_update"
  ON public.family_groups
  FOR UPDATE
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Only group creator can delete the group
CREATE POLICY "family_groups_delete"
  ON public.family_groups
  FOR DELETE
  USING (created_by = auth.uid());

-- --------------------------------------------------------------------------
-- Family Members RLS Policies
-- --------------------------------------------------------------------------

-- Members can see other members in their groups
CREATE POLICY "family_members_select"
  ON public.family_members
  FOR SELECT
  USING (
    group_id IN (
      SELECT fm.group_id
      FROM public.family_members fm
      WHERE fm.user_id = auth.uid()
    )
  );

-- Admins of a group can add members
CREATE POLICY "family_members_insert"
  ON public.family_members
  FOR INSERT
  WITH CHECK (
    -- User is admin of the group
    EXISTS (
      SELECT 1
      FROM public.family_members fm
      WHERE fm.group_id = group_id
        AND fm.user_id = auth.uid()
        AND fm.role = 'admin'
    )
    -- Or user is the group creator adding themselves
    OR (
      user_id = auth.uid()
      AND EXISTS (
        SELECT 1 FROM public.family_groups fg
        WHERE fg.id = group_id AND fg.created_by = auth.uid()
      )
    )
  );

-- Admins can update members in their groups
CREATE POLICY "family_members_update"
  ON public.family_members
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.family_members fm
      WHERE fm.group_id = group_id
        AND fm.user_id = auth.uid()
        AND fm.role = 'admin'
    )
  );

-- Admins can remove members; members can remove themselves
CREATE POLICY "family_members_delete"
  ON public.family_members
  FOR DELETE
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1
      FROM public.family_members fm
      WHERE fm.group_id = group_id
        AND fm.user_id = auth.uid()
        AND fm.role = 'admin'
    )
  );
