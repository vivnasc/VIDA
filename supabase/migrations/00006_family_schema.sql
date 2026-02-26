-- ============================================================================
-- VIDA Ecosystem - Migration 00006: Family Schema Tables
-- ============================================================================
-- Family coordination tables for VIDA Family:
--   calendar_events, family_tasks, photos, milestones,
--   family_goals, chat_messages
-- Includes ENUM types, foreign keys, constraints, indexes, RLS policies,
-- and Realtime configuration
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUM Types
-- ----------------------------------------------------------------------------

CREATE TYPE family_schema.task_priority AS ENUM (
  'low',
  'medium',
  'high'
);

CREATE TYPE family_schema.task_status AS ENUM (
  'pending',
  'in_progress',
  'completed'
);

CREATE TYPE family_schema.goal_status AS ENUM (
  'active',
  'completed',
  'archived'
);

CREATE TYPE family_schema.message_type AS ENUM (
  'text',
  'image',
  'voice',
  'system'
);

-- ============================================================================
-- TABLE: calendar_events
-- ============================================================================

CREATE TABLE family_schema.calendar_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  group_id        UUID REFERENCES public.family_groups(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  start_time      TIMESTAMPTZ NOT NULL,
  end_time        TIMESTAMPTZ,
  all_day         BOOLEAN NOT NULL DEFAULT false,
  location        TEXT,
  color           TEXT,
  source_app      TEXT,
  source_id       UUID,
  recurrence      JSONB,
  reminders       JSONB DEFAULT '[]',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT chk_event_times CHECK (end_time IS NULL OR end_time > start_time)
);

COMMENT ON TABLE family_schema.calendar_events IS 'Shared family calendar events';

-- Indexes
CREATE INDEX idx_calendar_events_user_id ON family_schema.calendar_events (user_id);
CREATE INDEX idx_calendar_events_group_id ON family_schema.calendar_events (group_id);
CREATE INDEX idx_calendar_events_start ON family_schema.calendar_events (start_time);
CREATE INDEX idx_calendar_events_user_range ON family_schema.calendar_events (user_id, start_time, end_time);
CREATE INDEX idx_calendar_events_source ON family_schema.calendar_events (source_app, source_id)
  WHERE source_app IS NOT NULL;

-- Updated_at trigger
CREATE TRIGGER set_calendar_events_updated_at
  BEFORE UPDATE ON family_schema.calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: family_tasks
-- ============================================================================

CREATE TABLE family_schema.family_tasks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  group_id        UUID REFERENCES public.family_groups(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  assigned_to     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  due_date        DATE,
  priority        family_schema.task_priority NOT NULL DEFAULT 'medium',
  status          family_schema.task_status NOT NULL DEFAULT 'pending',
  points          INT DEFAULT 0 CHECK (points >= 0),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_schema.family_tasks IS 'Family task management with assignments and gamification';

-- Indexes
CREATE INDEX idx_family_tasks_user_id ON family_schema.family_tasks (user_id);
CREATE INDEX idx_family_tasks_group_id ON family_schema.family_tasks (group_id);
CREATE INDEX idx_family_tasks_assigned_to ON family_schema.family_tasks (assigned_to);
CREATE INDEX idx_family_tasks_status ON family_schema.family_tasks (status);
CREATE INDEX idx_family_tasks_due ON family_schema.family_tasks (due_date)
  WHERE status != 'completed';

-- Updated_at trigger
CREATE TRIGGER set_family_tasks_updated_at
  BEFORE UPDATE ON family_schema.family_tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: photos
-- ============================================================================

CREATE TABLE family_schema.photos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  group_id        UUID REFERENCES public.family_groups(id) ON DELETE CASCADE,
  url             TEXT NOT NULL,
  thumbnail_url   TEXT,
  caption         TEXT,
  taken_at        TIMESTAMPTZ,
  album           TEXT,
  tags            TEXT[],
  is_favorite     BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_schema.photos IS 'Family photo gallery with albums and tagging';

-- Indexes
CREATE INDEX idx_photos_user_id ON family_schema.photos (user_id);
CREATE INDEX idx_photos_group_id ON family_schema.photos (group_id);
CREATE INDEX idx_photos_album ON family_schema.photos (group_id, album);
CREATE INDEX idx_photos_taken_at ON family_schema.photos (taken_at DESC);
CREATE INDEX idx_photos_favorites ON family_schema.photos (group_id, is_favorite)
  WHERE is_favorite = true;

-- ============================================================================
-- TABLE: milestones
-- ============================================================================

CREATE TABLE family_schema.milestones (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  group_id        UUID REFERENCES public.family_groups(id) ON DELETE CASCADE,
  member_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  date            DATE NOT NULL,
  category        TEXT,
  photo_url       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_schema.milestones IS 'Family milestones and achievements';

-- Indexes
CREATE INDEX idx_milestones_user_id ON family_schema.milestones (user_id);
CREATE INDEX idx_milestones_group_id ON family_schema.milestones (group_id);
CREATE INDEX idx_milestones_member_id ON family_schema.milestones (member_id);
CREATE INDEX idx_milestones_date ON family_schema.milestones (date DESC);

-- ============================================================================
-- TABLE: family_goals
-- ============================================================================

CREATE TABLE family_schema.family_goals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  group_id        UUID REFERENCES public.family_groups(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  target_date     DATE,
  target_amount   DECIMAL(15, 2),
  current_amount  DECIMAL(15, 2) DEFAULT 0.00,
  photo_url       TEXT,
  status          family_schema.goal_status NOT NULL DEFAULT 'active',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE family_schema.family_goals IS 'Shared family goals with optional financial targets';

-- Indexes
CREATE INDEX idx_family_goals_user_id ON family_schema.family_goals (user_id);
CREATE INDEX idx_family_goals_group_id ON family_schema.family_goals (group_id);
CREATE INDEX idx_family_goals_status ON family_schema.family_goals (group_id, status);

-- Updated_at trigger
CREATE TRIGGER set_family_goals_updated_at
  BEFORE UPDATE ON family_schema.family_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: chat_messages
-- ============================================================================

CREATE TABLE family_schema.chat_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id        UUID NOT NULL REFERENCES public.family_groups(id) ON DELETE CASCADE,
  sender_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content         TEXT,
  message_type    family_schema.message_type NOT NULL DEFAULT 'text',
  media_url       TEXT,
  reply_to        UUID REFERENCES family_schema.chat_messages(id) ON DELETE SET NULL,
  is_encrypted    BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Text messages must have content; media messages must have media_url
  CONSTRAINT chk_message_content CHECK (
    (message_type IN ('text', 'system') AND content IS NOT NULL)
    OR (message_type IN ('image', 'voice') AND media_url IS NOT NULL)
  )
);

COMMENT ON TABLE family_schema.chat_messages IS 'Family group chat with encryption support';

-- Indexes
CREATE INDEX idx_chat_messages_group_id ON family_schema.chat_messages (group_id);
CREATE INDEX idx_chat_messages_sender_id ON family_schema.chat_messages (sender_id);
CREATE INDEX idx_chat_messages_group_created ON family_schema.chat_messages (group_id, created_at DESC);
CREATE INDEX idx_chat_messages_reply_to ON family_schema.chat_messages (reply_to)
  WHERE reply_to IS NOT NULL;

-- ============================================================================
-- ENABLE REALTIME on chat_messages
-- ============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE family_schema.chat_messages;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all family_schema tables
ALTER TABLE family_schema.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_schema.family_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_schema.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_schema.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_schema.family_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_schema.chat_messages ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- Helper: Check if user is a member of a family group
-- --------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION family_schema.is_group_member(p_group_id UUID, p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.family_members
    WHERE group_id = p_group_id AND user_id = p_user_id
  );
$$;

-- --------------------------------------------------------------------------
-- Calendar Events RLS Policies
-- --------------------------------------------------------------------------

-- Users can see their own events or events in their family groups
CREATE POLICY "calendar_events_select"
  ON family_schema.calendar_events FOR SELECT
  USING (
    auth.uid() = user_id
    OR (
      group_id IS NOT NULL
      AND family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "calendar_events_insert_own"
  ON family_schema.calendar_events FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      group_id IS NULL
      OR family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "calendar_events_update_own"
  ON family_schema.calendar_events FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "calendar_events_delete_own"
  ON family_schema.calendar_events FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Family Tasks RLS Policies
-- --------------------------------------------------------------------------

-- Users can see tasks they created, are assigned to, or in their groups
CREATE POLICY "family_tasks_select"
  ON family_schema.family_tasks FOR SELECT
  USING (
    auth.uid() = user_id
    OR auth.uid() = assigned_to
    OR (
      group_id IS NOT NULL
      AND family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "family_tasks_insert_own"
  ON family_schema.family_tasks FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      group_id IS NULL
      OR family_schema.is_group_member(group_id, auth.uid())
    )
  );

-- Task creator or assignee can update
CREATE POLICY "family_tasks_update"
  ON family_schema.family_tasks FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = assigned_to)
  WITH CHECK (auth.uid() = user_id OR auth.uid() = assigned_to);

CREATE POLICY "family_tasks_delete_own"
  ON family_schema.family_tasks FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Photos RLS Policies
-- --------------------------------------------------------------------------

-- Users can see their own photos or photos in their family groups
CREATE POLICY "photos_select"
  ON family_schema.photos FOR SELECT
  USING (
    auth.uid() = user_id
    OR (
      group_id IS NOT NULL
      AND family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "photos_insert_own"
  ON family_schema.photos FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      group_id IS NULL
      OR family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "photos_update_own"
  ON family_schema.photos FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "photos_delete_own"
  ON family_schema.photos FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Milestones RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "milestones_select"
  ON family_schema.milestones FOR SELECT
  USING (
    auth.uid() = user_id
    OR (
      group_id IS NOT NULL
      AND family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "milestones_insert_own"
  ON family_schema.milestones FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      group_id IS NULL
      OR family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "milestones_update_own"
  ON family_schema.milestones FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "milestones_delete_own"
  ON family_schema.milestones FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Family Goals RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "family_goals_select"
  ON family_schema.family_goals FOR SELECT
  USING (
    auth.uid() = user_id
    OR (
      group_id IS NOT NULL
      AND family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "family_goals_insert_own"
  ON family_schema.family_goals FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      group_id IS NULL
      OR family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "family_goals_update"
  ON family_schema.family_goals FOR UPDATE
  USING (
    auth.uid() = user_id
    OR (
      group_id IS NOT NULL
      AND family_schema.is_group_member(group_id, auth.uid())
    )
  );

CREATE POLICY "family_goals_delete_own"
  ON family_schema.family_goals FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Chat Messages RLS Policies
-- --------------------------------------------------------------------------

-- Group members can see messages in their groups
CREATE POLICY "chat_messages_select"
  ON family_schema.chat_messages FOR SELECT
  USING (
    family_schema.is_group_member(group_id, auth.uid())
  );

-- Group members can send messages
CREATE POLICY "chat_messages_insert"
  ON family_schema.chat_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND family_schema.is_group_member(group_id, auth.uid())
  );

-- Senders can update their own messages (e.g., edit)
CREATE POLICY "chat_messages_update_own"
  ON family_schema.chat_messages FOR UPDATE
  USING (auth.uid() = sender_id)
  WITH CHECK (auth.uid() = sender_id);

-- Senders can delete their own messages
CREATE POLICY "chat_messages_delete_own"
  ON family_schema.chat_messages FOR DELETE
  USING (auth.uid() = sender_id);
