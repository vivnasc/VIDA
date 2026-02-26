-- ============================================================================
-- VIDA Ecosystem - Migration 00004: Home Schema Tables
-- ============================================================================
-- Household management tables for VIDA Home:
--   zones, inventory_items, shopping_lists, shopping_list_items,
--   domestic_employees, employee_tasks, meal_plans, maintenance_tasks, routines
-- Includes ENUM types, foreign keys, constraints, indexes, and RLS policies
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUM Types
-- ----------------------------------------------------------------------------

CREATE TYPE home_schema.shopping_list_status AS ENUM (
  'active',
  'completed',
  'archived'
);

-- ============================================================================
-- TABLE: zones
-- ============================================================================

CREATE TABLE home_schema.zones (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  icon            TEXT,
  description     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.zones IS 'Household zones/rooms for organization';

-- Indexes
CREATE INDEX idx_zones_user_id ON home_schema.zones (user_id);

-- ============================================================================
-- TABLE: inventory_items
-- ============================================================================

CREATE TABLE home_schema.inventory_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  category        TEXT,
  zone_id         UUID REFERENCES home_schema.zones(id) ON DELETE SET NULL,
  quantity         DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit            TEXT,
  expiry_date     DATE,
  barcode         TEXT,
  photo_url       TEXT,
  notes           TEXT,
  min_stock_level DECIMAL(10, 2),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.inventory_items IS 'Household inventory with stock tracking';

-- Indexes
CREATE INDEX idx_inventory_items_user_id ON home_schema.inventory_items (user_id);
CREATE INDEX idx_inventory_items_zone_id ON home_schema.inventory_items (zone_id);
CREATE INDEX idx_inventory_items_category ON home_schema.inventory_items (category);
CREATE INDEX idx_inventory_items_expiry ON home_schema.inventory_items (expiry_date)
  WHERE expiry_date IS NOT NULL;
CREATE INDEX idx_inventory_items_barcode ON home_schema.inventory_items (barcode)
  WHERE barcode IS NOT NULL;

-- Updated_at trigger
CREATE TRIGGER set_inventory_items_updated_at
  BEFORE UPDATE ON home_schema.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: shopping_lists
-- ============================================================================

CREATE TABLE home_schema.shopping_lists (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  status          home_schema.shopping_list_status NOT NULL DEFAULT 'active',
  budget_limit    DECIMAL(15, 2),
  total_spent     DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.shopping_lists IS 'Shopping lists with budget tracking';

-- Indexes
CREATE INDEX idx_shopping_lists_user_id ON home_schema.shopping_lists (user_id);
CREATE INDEX idx_shopping_lists_user_status ON home_schema.shopping_lists (user_id, status);

-- Updated_at trigger
CREATE TRIGGER set_shopping_lists_updated_at
  BEFORE UPDATE ON home_schema.shopping_lists
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: shopping_list_items
-- ============================================================================

CREATE TABLE home_schema.shopping_list_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id         UUID NOT NULL REFERENCES home_schema.shopping_lists(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  quantity        DECIMAL(10, 2) NOT NULL DEFAULT 1,
  unit            TEXT,
  estimated_price DECIMAL(15, 2),
  actual_price    DECIMAL(15, 2),
  is_checked      BOOLEAN NOT NULL DEFAULT false,
  category        TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.shopping_list_items IS 'Individual items within a shopping list';

-- Indexes
CREATE INDEX idx_shopping_list_items_list_id ON home_schema.shopping_list_items (list_id);
CREATE INDEX idx_shopping_list_items_checked ON home_schema.shopping_list_items (list_id, is_checked);

-- ============================================================================
-- TABLE: domestic_employees
-- ============================================================================

CREATE TABLE home_schema.domestic_employees (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  role                TEXT NOT NULL,
  phone               TEXT,
  salary              DECIMAL(15, 2),
  payment_frequency   TEXT,
  start_date          DATE,
  is_active           BOOLEAN NOT NULL DEFAULT true,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.domestic_employees IS 'Domestic employee records (empregada, gardener, guard, etc.)';

-- Indexes
CREATE INDEX idx_domestic_employees_user_id ON home_schema.domestic_employees (user_id);
CREATE INDEX idx_domestic_employees_user_active ON home_schema.domestic_employees (user_id, is_active);

-- Updated_at trigger
CREATE TRIGGER set_domestic_employees_updated_at
  BEFORE UPDATE ON home_schema.domestic_employees
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: employee_tasks
-- ============================================================================

CREATE TABLE home_schema.employee_tasks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id     UUID NOT NULL REFERENCES home_schema.domestic_employees(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  zone_id         UUID REFERENCES home_schema.zones(id) ON DELETE SET NULL,
  day_of_week     INT CHECK (day_of_week >= 0 AND day_of_week <= 6),
  is_completed    BOOLEAN NOT NULL DEFAULT false,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.employee_tasks IS 'Task assignments for domestic employees';

-- Indexes
CREATE INDEX idx_employee_tasks_employee_id ON home_schema.employee_tasks (employee_id);
CREATE INDEX idx_employee_tasks_zone_id ON home_schema.employee_tasks (zone_id);
CREATE INDEX idx_employee_tasks_day ON home_schema.employee_tasks (day_of_week);

-- ============================================================================
-- TABLE: meal_plans
-- ============================================================================

CREATE TABLE home_schema.meal_plans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_start      DATE NOT NULL,
  meals           JSONB NOT NULL DEFAULT '{}',
  preferences     JSONB DEFAULT '{}',
  created_by_ai   BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.meal_plans IS 'Weekly meal plans with AI generation support';

-- Indexes
CREATE INDEX idx_meal_plans_user_id ON home_schema.meal_plans (user_id);
CREATE INDEX idx_meal_plans_week ON home_schema.meal_plans (user_id, week_start);

-- Updated_at trigger
CREATE TRIGGER set_meal_plans_updated_at
  BEFORE UPDATE ON home_schema.meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: maintenance_tasks
-- ============================================================================

CREATE TABLE home_schema.maintenance_tasks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  zone_id         UUID REFERENCES home_schema.zones(id) ON DELETE SET NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  frequency       TEXT,
  last_done       DATE,
  next_due        DATE,
  provider_name   TEXT,
  provider_phone  TEXT,
  estimated_cost  DECIMAL(15, 2),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.maintenance_tasks IS 'Recurring home maintenance tasks and service providers';

-- Indexes
CREATE INDEX idx_maintenance_tasks_user_id ON home_schema.maintenance_tasks (user_id);
CREATE INDEX idx_maintenance_tasks_zone_id ON home_schema.maintenance_tasks (zone_id);
CREATE INDEX idx_maintenance_tasks_next_due ON home_schema.maintenance_tasks (next_due)
  WHERE next_due IS NOT NULL;

-- Updated_at trigger
CREATE TRIGGER set_maintenance_tasks_updated_at
  BEFORE UPDATE ON home_schema.maintenance_tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: routines
-- ============================================================================

CREATE TABLE home_schema.routines (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  schedule        JSONB NOT NULL DEFAULT '{}',
  tasks           JSONB NOT NULL DEFAULT '[]',
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE home_schema.routines IS 'Household routines with scheduled tasks';

-- Indexes
CREATE INDEX idx_routines_user_id ON home_schema.routines (user_id);
CREATE INDEX idx_routines_user_active ON home_schema.routines (user_id, is_active);

-- Updated_at trigger
CREATE TRIGGER set_routines_updated_at
  BEFORE UPDATE ON home_schema.routines
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all home_schema tables
ALTER TABLE home_schema.zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.shopping_list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.domestic_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.employee_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.maintenance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_schema.routines ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- Zones RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "zones_select_own"
  ON home_schema.zones FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "zones_insert_own"
  ON home_schema.zones FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "zones_update_own"
  ON home_schema.zones FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "zones_delete_own"
  ON home_schema.zones FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Inventory Items RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "inventory_items_select_own"
  ON home_schema.inventory_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "inventory_items_insert_own"
  ON home_schema.inventory_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "inventory_items_update_own"
  ON home_schema.inventory_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "inventory_items_delete_own"
  ON home_schema.inventory_items FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Shopping Lists RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "shopping_lists_select_own"
  ON home_schema.shopping_lists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "shopping_lists_insert_own"
  ON home_schema.shopping_lists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "shopping_lists_update_own"
  ON home_schema.shopping_lists FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "shopping_lists_delete_own"
  ON home_schema.shopping_lists FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Shopping List Items RLS Policies
-- (Access via parent shopping list ownership)
-- --------------------------------------------------------------------------

CREATE POLICY "shopping_list_items_select_own"
  ON home_schema.shopping_list_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM home_schema.shopping_lists sl
      WHERE sl.id = list_id AND sl.user_id = auth.uid()
    )
  );

CREATE POLICY "shopping_list_items_insert_own"
  ON home_schema.shopping_list_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM home_schema.shopping_lists sl
      WHERE sl.id = list_id AND sl.user_id = auth.uid()
    )
  );

CREATE POLICY "shopping_list_items_update_own"
  ON home_schema.shopping_list_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM home_schema.shopping_lists sl
      WHERE sl.id = list_id AND sl.user_id = auth.uid()
    )
  );

CREATE POLICY "shopping_list_items_delete_own"
  ON home_schema.shopping_list_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM home_schema.shopping_lists sl
      WHERE sl.id = list_id AND sl.user_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- Domestic Employees RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "domestic_employees_select_own"
  ON home_schema.domestic_employees FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "domestic_employees_insert_own"
  ON home_schema.domestic_employees FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "domestic_employees_update_own"
  ON home_schema.domestic_employees FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "domestic_employees_delete_own"
  ON home_schema.domestic_employees FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Employee Tasks RLS Policies
-- (Access via parent employee ownership)
-- --------------------------------------------------------------------------

CREATE POLICY "employee_tasks_select_own"
  ON home_schema.employee_tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM home_schema.domestic_employees de
      WHERE de.id = employee_id AND de.user_id = auth.uid()
    )
  );

CREATE POLICY "employee_tasks_insert_own"
  ON home_schema.employee_tasks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM home_schema.domestic_employees de
      WHERE de.id = employee_id AND de.user_id = auth.uid()
    )
  );

CREATE POLICY "employee_tasks_update_own"
  ON home_schema.employee_tasks FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM home_schema.domestic_employees de
      WHERE de.id = employee_id AND de.user_id = auth.uid()
    )
  );

CREATE POLICY "employee_tasks_delete_own"
  ON home_schema.employee_tasks FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM home_schema.domestic_employees de
      WHERE de.id = employee_id AND de.user_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- Meal Plans RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "meal_plans_select_own"
  ON home_schema.meal_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "meal_plans_insert_own"
  ON home_schema.meal_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "meal_plans_update_own"
  ON home_schema.meal_plans FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "meal_plans_delete_own"
  ON home_schema.meal_plans FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Maintenance Tasks RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "maintenance_tasks_select_own"
  ON home_schema.maintenance_tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "maintenance_tasks_insert_own"
  ON home_schema.maintenance_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "maintenance_tasks_update_own"
  ON home_schema.maintenance_tasks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "maintenance_tasks_delete_own"
  ON home_schema.maintenance_tasks FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Routines RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "routines_select_own"
  ON home_schema.routines FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "routines_insert_own"
  ON home_schema.routines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "routines_update_own"
  ON home_schema.routines FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "routines_delete_own"
  ON home_schema.routines FOR DELETE
  USING (auth.uid() = user_id);
