-- ============================================================================
-- maBIZ - Combined Setup Migration
-- ============================================================================
-- Run this ONCE in Supabase Dashboard > SQL Editor
-- Creates: handle_updated_at(), profiles table, and full biz_schema
-- ============================================================================

-- ─── Step 1: Helper Functions ───────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

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

-- ─── Step 2: Profiles Table ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
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

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- ─── Step 3: biz_schema ────────────────────────────────────────────────────

CREATE SCHEMA IF NOT EXISTS biz_schema;

GRANT USAGE ON SCHEMA biz_schema TO authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA biz_schema
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA biz_schema
  GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA biz_schema
  GRANT USAGE ON SEQUENCES TO authenticated;

-- ─── ENUM Types ─────────────────────────────────────────────────────────────

CREATE TYPE biz_schema.business_template AS ENUM (
  'salao', 'loja_roupa', 'bottle_store', 'banca', 'restaurante',
  'taxista', 'mecanico', 'alfaiate', 'construcao', 'electronica',
  'estetica', 'generico'
);

CREATE TYPE biz_schema.payment_method AS ENUM (
  'cash', 'mpesa', 'emola', 'transfer', 'card', 'fiado'
);

CREATE TYPE biz_schema.sale_status AS ENUM (
  'completed', 'pending', 'cancelled'
);

CREATE TYPE biz_schema.cash_register_status AS ENUM (
  'open', 'closed'
);

CREATE TYPE biz_schema.customer_category AS ENUM (
  'vip', 'fiel', 'regular', 'nova'
);

CREATE TYPE biz_schema.fiado_status AS ENUM (
  'active', 'partial', 'paid', 'overdue', 'critical'
);

CREATE TYPE biz_schema.purchase_order_status AS ENUM (
  'pending', 'ordered', 'received', 'cancelled'
);

CREATE TYPE biz_schema.appointment_status AS ENUM (
  'scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'
);

CREATE TYPE biz_schema.license_status AS ENUM (
  'valid', 'expiring', 'expired', 'pending'
);

CREATE TYPE biz_schema.commission_status AS ENUM (
  'pending', 'paid'
);

CREATE TYPE biz_schema.promotion_type AS ENUM (
  'percentage', 'fixed', 'bogo', 'combo'
);

CREATE TYPE biz_schema.education_level AS ENUM (
  'basico', 'vendas', 'crescimento', 'digital', 'mocambique'
);

-- ─── TABLE: businesses ──────────────────────────────────────────────────────

CREATE TABLE biz_schema.businesses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  template        biz_schema.business_template NOT NULL DEFAULT 'generico',
  address         TEXT,
  phone           TEXT,
  logo_url        TEXT,
  currency        TEXT NOT NULL DEFAULT 'MZN',
  tax_id          TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_businesses_user_id ON biz_schema.businesses (user_id);
CREATE INDEX idx_businesses_user_active ON biz_schema.businesses (user_id, is_active);

CREATE TRIGGER set_businesses_updated_at
  BEFORE UPDATE ON biz_schema.businesses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: products ────────────────────────────────────────────────────────

CREATE TABLE biz_schema.products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  sku             TEXT,
  category        TEXT,
  cost_price      DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  sell_price      DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  quantity        INT NOT NULL DEFAULT 0,
  unit            TEXT,
  min_stock       INT NOT NULL DEFAULT 0,
  max_stock       INT,
  supplier_id     UUID,
  barcode         TEXT,
  expiry_date     DATE,
  location        TEXT,
  photo_url       TEXT,
  is_service      BOOLEAN NOT NULL DEFAULT false,
  duration_minutes INT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_business_id ON biz_schema.products (business_id);
CREATE INDEX idx_products_business_active ON biz_schema.products (business_id, is_active);
CREATE INDEX idx_products_category ON biz_schema.products (business_id, category);
CREATE INDEX idx_products_low_stock ON biz_schema.products (business_id, quantity, min_stock)
  WHERE is_active = true AND is_service = false;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON biz_schema.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: customers ───────────────────────────────────────────────────────

CREATE TABLE biz_schema.customers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  phone           TEXT,
  email           TEXT,
  category        biz_schema.customer_category NOT NULL DEFAULT 'nova',
  total_spent     DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  visit_count     INT NOT NULL DEFAULT 0,
  last_visit      DATE,
  loyalty_points  INT NOT NULL DEFAULT 0,
  credit_limit    DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  current_debt    DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  preferences     TEXT,
  notes           TEXT,
  date_of_birth   DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_customers_business_id ON biz_schema.customers (business_id);
CREATE INDEX idx_customers_phone ON biz_schema.customers (business_id, phone);
CREATE INDEX idx_customers_category ON biz_schema.customers (business_id, category);
CREATE INDEX idx_customers_debt ON biz_schema.customers (business_id, current_debt)
  WHERE current_debt > 0;

CREATE TRIGGER set_customers_updated_at
  BEFORE UPDATE ON biz_schema.customers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: staff_members ───────────────────────────────────────────────────

CREATE TABLE biz_schema.staff_members (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  phone           TEXT,
  role            TEXT NOT NULL,
  salary_base     DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  commission_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  work_schedule   TEXT,
  specialties     TEXT[],
  start_date      DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_staff_business_id ON biz_schema.staff_members (business_id);
CREATE INDEX idx_staff_business_active ON biz_schema.staff_members (business_id, is_active);

CREATE TRIGGER set_staff_updated_at
  BEFORE UPDATE ON biz_schema.staff_members
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: sales ───────────────────────────────────────────────────────────

CREATE TABLE biz_schema.sales (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  customer_id     UUID REFERENCES biz_schema.customers(id) ON DELETE SET NULL,
  staff_id        UUID REFERENCES biz_schema.staff_members(id) ON DELETE SET NULL,
  total_amount    DECIMAL(15, 2) NOT NULL CHECK (total_amount >= 0),
  payment_method  biz_schema.payment_method NOT NULL,
  discount        DECIMAL(15, 2) DEFAULT 0.00,
  notes           TEXT,
  status          biz_schema.sale_status NOT NULL DEFAULT 'completed',
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sales_business_id ON biz_schema.sales (business_id);
CREATE INDEX idx_sales_date ON biz_schema.sales (business_id, date DESC);
CREATE INDEX idx_sales_customer ON biz_schema.sales (customer_id);
CREATE INDEX idx_sales_staff ON biz_schema.sales (staff_id);
CREATE INDEX idx_sales_payment ON biz_schema.sales (business_id, payment_method);
CREATE INDEX idx_sales_status ON biz_schema.sales (business_id, status);

CREATE TRIGGER set_sales_updated_at
  BEFORE UPDATE ON biz_schema.sales
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: sale_items ──────────────────────────────────────────────────────

CREATE TABLE biz_schema.sale_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id         UUID NOT NULL REFERENCES biz_schema.sales(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES biz_schema.products(id) ON DELETE RESTRICT,
  quantity        INT NOT NULL CHECK (quantity > 0),
  unit_price      DECIMAL(15, 2) NOT NULL,
  discount        DECIMAL(15, 2) DEFAULT 0.00,
  total           DECIMAL(15, 2) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sale_items_sale_id ON biz_schema.sale_items (sale_id);
CREATE INDEX idx_sale_items_product ON biz_schema.sale_items (product_id);

-- ─── TABLE: cash_registers ──────────────────────────────────────────────────

CREATE TABLE biz_schema.cash_registers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id       UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  date              DATE NOT NULL,
  opening_amount    DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  expected_closing  DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  actual_closing    DECIMAL(15, 2),
  difference        DECIMAL(15, 2),
  total_cash        DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  total_mpesa       DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  total_transfer    DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  total_card        DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  total_fiado       DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  total_expenses    DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  status            biz_schema.cash_register_status NOT NULL DEFAULT 'open',
  opened_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at         TIMESTAMPTZ,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_business_date UNIQUE (business_id, date)
);

CREATE INDEX idx_cash_registers_business ON biz_schema.cash_registers (business_id, date DESC);

CREATE TRIGGER set_cash_registers_updated_at
  BEFORE UPDATE ON biz_schema.cash_registers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: customer_debts (Fiado) ──────────────────────────────────────────

CREATE TABLE biz_schema.customer_debts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id     UUID NOT NULL REFERENCES biz_schema.customers(id) ON DELETE CASCADE,
  sale_id         UUID REFERENCES biz_schema.sales(id) ON DELETE SET NULL,
  amount          DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
  paid_amount     DECIMAL(15, 2) NOT NULL DEFAULT 0.00 CHECK (paid_amount >= 0),
  due_date        DATE,
  status          biz_schema.fiado_status NOT NULL DEFAULT 'active',
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_debts_customer ON biz_schema.customer_debts (customer_id);
CREATE INDEX idx_debts_status ON biz_schema.customer_debts (status)
  WHERE status != 'paid';
CREATE INDEX idx_debts_due_date ON biz_schema.customer_debts (due_date)
  WHERE status != 'paid';

CREATE TRIGGER set_debts_updated_at
  BEFORE UPDATE ON biz_schema.customer_debts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: fiado_payments ──────────────────────────────────────────────────

CREATE TABLE biz_schema.fiado_payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debt_id         UUID NOT NULL REFERENCES biz_schema.customer_debts(id) ON DELETE CASCADE,
  amount          DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
  payment_method  biz_schema.payment_method NOT NULL DEFAULT 'cash',
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_fiado_payments_debt ON biz_schema.fiado_payments (debt_id);

-- ─── TABLE: staff_commissions ───────────────────────────────────────────────

CREATE TABLE biz_schema.staff_commissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id        UUID NOT NULL REFERENCES biz_schema.staff_members(id) ON DELETE CASCADE,
  sale_id         UUID NOT NULL REFERENCES biz_schema.sales(id) ON DELETE CASCADE,
  amount          DECIMAL(15, 2) NOT NULL CHECK (amount >= 0),
  period          TEXT NOT NULL,
  status          biz_schema.commission_status NOT NULL DEFAULT 'pending',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_commissions_staff ON biz_schema.staff_commissions (staff_id);
CREATE INDEX idx_commissions_period ON biz_schema.staff_commissions (staff_id, period);

CREATE TRIGGER set_commissions_updated_at
  BEFORE UPDATE ON biz_schema.staff_commissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: suppliers ───────────────────────────────────────────────────────

CREATE TABLE biz_schema.suppliers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  phone           TEXT,
  products_supplied TEXT,
  payment_terms   TEXT,
  delivery_time   TEXT,
  moq             TEXT,
  rating          INT NOT NULL DEFAULT 3 CHECK (rating >= 1 AND rating <= 5),
  notes           TEXT,
  visit_day       TEXT,
  last_order_date DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_suppliers_business ON biz_schema.suppliers (business_id);

CREATE TRIGGER set_suppliers_updated_at
  BEFORE UPDATE ON biz_schema.suppliers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: purchase_orders ─────────────────────────────────────────────────

CREATE TABLE biz_schema.purchase_orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id       UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  supplier_id       UUID NOT NULL REFERENCES biz_schema.suppliers(id) ON DELETE CASCADE,
  items             JSONB NOT NULL DEFAULT '[]',
  total_cost        DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  status            biz_schema.purchase_order_status NOT NULL DEFAULT 'pending',
  order_date        DATE NOT NULL DEFAULT CURRENT_DATE,
  expected_delivery DATE,
  received_date     DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_business ON biz_schema.purchase_orders (business_id);
CREATE INDEX idx_orders_supplier ON biz_schema.purchase_orders (supplier_id);

CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON biz_schema.purchase_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: business_expenses ───────────────────────────────────────────────

CREATE TABLE biz_schema.business_expenses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  category        TEXT NOT NULL,
  amount          DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
  description     TEXT,
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  receipt_url     TEXT,
  is_recurring    BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_expenses_business ON biz_schema.business_expenses (business_id, date DESC);
CREATE INDEX idx_expenses_category ON biz_schema.business_expenses (business_id, category);

CREATE TRIGGER set_expenses_updated_at
  BEFORE UPDATE ON biz_schema.business_expenses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: appointments ────────────────────────────────────────────────────

CREATE TABLE biz_schema.appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  customer_id     UUID REFERENCES biz_schema.customers(id) ON DELETE SET NULL,
  staff_id        UUID REFERENCES biz_schema.staff_members(id) ON DELETE SET NULL,
  service_id      UUID REFERENCES biz_schema.products(id) ON DELETE SET NULL,
  date            DATE NOT NULL,
  time_start      TIME NOT NULL,
  time_end        TIME,
  status          biz_schema.appointment_status NOT NULL DEFAULT 'scheduled',
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointments_business_date ON biz_schema.appointments (business_id, date);
CREATE INDEX idx_appointments_staff ON biz_schema.appointments (staff_id, date);
CREATE INDEX idx_appointments_customer ON biz_schema.appointments (customer_id);

CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON biz_schema.appointments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: licenses ────────────────────────────────────────────────────────

CREATE TABLE biz_schema.licenses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  issuer          TEXT NOT NULL,
  cost            DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  issue_date      DATE,
  expiry_date     DATE,
  document_url    TEXT,
  status          biz_schema.license_status NOT NULL DEFAULT 'pending',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_licenses_business ON biz_schema.licenses (business_id);
CREATE INDEX idx_licenses_expiry ON biz_schema.licenses (expiry_date)
  WHERE status != 'expired';

CREATE TRIGGER set_licenses_updated_at
  BEFORE UPDATE ON biz_schema.licenses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: equipment ───────────────────────────────────────────────────────

CREATE TABLE biz_schema.equipment (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id           UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  name                  TEXT NOT NULL,
  type                  TEXT,
  brand                 TEXT,
  purchase_date         DATE,
  cost                  DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  maintenance_schedule  TEXT,
  last_maintenance      DATE,
  notes                 TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_equipment_business ON biz_schema.equipment (business_id);

CREATE TRIGGER set_equipment_updated_at
  BEFORE UPDATE ON biz_schema.equipment
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── TABLE: promotions ──────────────────────────────────────────────────────

CREATE TABLE biz_schema.promotions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID NOT NULL REFERENCES biz_schema.businesses(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  type            biz_schema.promotion_type NOT NULL,
  discount_value  DECIMAL(15, 2) NOT NULL,
  start_date      DATE NOT NULL,
  end_date        DATE,
  conditions      TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_promotions_business ON biz_schema.promotions (business_id, is_active);

CREATE TRIGGER set_promotions_updated_at
  BEFORE UPDATE ON biz_schema.promotions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION biz_schema.user_owns_business(biz_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM biz_schema.businesses
    WHERE id = biz_id AND user_id = auth.uid()
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Enable RLS
ALTER TABLE biz_schema.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.cash_registers ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.customer_debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.fiado_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.staff_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.business_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE biz_schema.promotions ENABLE ROW LEVEL SECURITY;

-- Businesses (direct user_id)
CREATE POLICY "biz_select_own" ON biz_schema.businesses
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "biz_insert_own" ON biz_schema.businesses
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "biz_update_own" ON biz_schema.businesses
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "biz_delete_own" ON biz_schema.businesses
  FOR DELETE USING (auth.uid() = user_id);

-- Products
CREATE POLICY "products_select" ON biz_schema.products
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "products_insert" ON biz_schema.products
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "products_update" ON biz_schema.products
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "products_delete" ON biz_schema.products
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Customers
CREATE POLICY "customers_select" ON biz_schema.customers
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "customers_insert" ON biz_schema.customers
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "customers_update" ON biz_schema.customers
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "customers_delete" ON biz_schema.customers
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Staff
CREATE POLICY "staff_select" ON biz_schema.staff_members
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "staff_insert" ON biz_schema.staff_members
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "staff_update" ON biz_schema.staff_members
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "staff_delete" ON biz_schema.staff_members
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Sales
CREATE POLICY "sales_select" ON biz_schema.sales
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "sales_insert" ON biz_schema.sales
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "sales_update" ON biz_schema.sales
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "sales_delete" ON biz_schema.sales
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Sale Items
CREATE POLICY "sale_items_select" ON biz_schema.sale_items
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM biz_schema.sales s
    WHERE s.id = sale_id AND biz_schema.user_owns_business(s.business_id)
  ));
CREATE POLICY "sale_items_insert" ON biz_schema.sale_items
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM biz_schema.sales s
    WHERE s.id = sale_id AND biz_schema.user_owns_business(s.business_id)
  ));
CREATE POLICY "sale_items_update" ON biz_schema.sale_items
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM biz_schema.sales s
    WHERE s.id = sale_id AND biz_schema.user_owns_business(s.business_id)
  ));
CREATE POLICY "sale_items_delete" ON biz_schema.sale_items
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM biz_schema.sales s
    WHERE s.id = sale_id AND biz_schema.user_owns_business(s.business_id)
  ));

-- Cash Registers
CREATE POLICY "cash_registers_select" ON biz_schema.cash_registers
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "cash_registers_insert" ON biz_schema.cash_registers
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "cash_registers_update" ON biz_schema.cash_registers
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "cash_registers_delete" ON biz_schema.cash_registers
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Customer Debts
CREATE POLICY "debts_select" ON biz_schema.customer_debts
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM biz_schema.customers c
    WHERE c.id = customer_id AND biz_schema.user_owns_business(c.business_id)
  ));
CREATE POLICY "debts_insert" ON biz_schema.customer_debts
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM biz_schema.customers c
    WHERE c.id = customer_id AND biz_schema.user_owns_business(c.business_id)
  ));
CREATE POLICY "debts_update" ON biz_schema.customer_debts
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM biz_schema.customers c
    WHERE c.id = customer_id AND biz_schema.user_owns_business(c.business_id)
  ));
CREATE POLICY "debts_delete" ON biz_schema.customer_debts
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM biz_schema.customers c
    WHERE c.id = customer_id AND biz_schema.user_owns_business(c.business_id)
  ));

-- Fiado Payments
CREATE POLICY "fiado_payments_select" ON biz_schema.fiado_payments
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM biz_schema.customer_debts d
    JOIN biz_schema.customers c ON c.id = d.customer_id
    WHERE d.id = debt_id AND biz_schema.user_owns_business(c.business_id)
  ));
CREATE POLICY "fiado_payments_insert" ON biz_schema.fiado_payments
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM biz_schema.customer_debts d
    JOIN biz_schema.customers c ON c.id = d.customer_id
    WHERE d.id = debt_id AND biz_schema.user_owns_business(c.business_id)
  ));
CREATE POLICY "fiado_payments_delete" ON biz_schema.fiado_payments
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM biz_schema.customer_debts d
    JOIN biz_schema.customers c ON c.id = d.customer_id
    WHERE d.id = debt_id AND biz_schema.user_owns_business(c.business_id)
  ));

-- Staff Commissions
CREATE POLICY "commissions_select" ON biz_schema.staff_commissions
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM biz_schema.staff_members sm
    WHERE sm.id = staff_id AND biz_schema.user_owns_business(sm.business_id)
  ));
CREATE POLICY "commissions_insert" ON biz_schema.staff_commissions
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM biz_schema.staff_members sm
    WHERE sm.id = staff_id AND biz_schema.user_owns_business(sm.business_id)
  ));
CREATE POLICY "commissions_update" ON biz_schema.staff_commissions
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM biz_schema.staff_members sm
    WHERE sm.id = staff_id AND biz_schema.user_owns_business(sm.business_id)
  ));

-- Suppliers
CREATE POLICY "suppliers_select" ON biz_schema.suppliers
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "suppliers_insert" ON biz_schema.suppliers
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "suppliers_update" ON biz_schema.suppliers
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "suppliers_delete" ON biz_schema.suppliers
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Purchase Orders
CREATE POLICY "orders_select" ON biz_schema.purchase_orders
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "orders_insert" ON biz_schema.purchase_orders
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "orders_update" ON biz_schema.purchase_orders
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "orders_delete" ON biz_schema.purchase_orders
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Business Expenses
CREATE POLICY "expenses_select" ON biz_schema.business_expenses
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "expenses_insert" ON biz_schema.business_expenses
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "expenses_update" ON biz_schema.business_expenses
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "expenses_delete" ON biz_schema.business_expenses
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Appointments
CREATE POLICY "appointments_select" ON biz_schema.appointments
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "appointments_insert" ON biz_schema.appointments
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "appointments_update" ON biz_schema.appointments
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "appointments_delete" ON biz_schema.appointments
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Licenses
CREATE POLICY "licenses_select" ON biz_schema.licenses
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "licenses_insert" ON biz_schema.licenses
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "licenses_update" ON biz_schema.licenses
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "licenses_delete" ON biz_schema.licenses
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Equipment
CREATE POLICY "equipment_select" ON biz_schema.equipment
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "equipment_insert" ON biz_schema.equipment
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "equipment_update" ON biz_schema.equipment
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "equipment_delete" ON biz_schema.equipment
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- Promotions
CREATE POLICY "promotions_select" ON biz_schema.promotions
  FOR SELECT USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "promotions_insert" ON biz_schema.promotions
  FOR INSERT WITH CHECK (biz_schema.user_owns_business(business_id));
CREATE POLICY "promotions_update" ON biz_schema.promotions
  FOR UPDATE USING (biz_schema.user_owns_business(business_id));
CREATE POLICY "promotions_delete" ON biz_schema.promotions
  FOR DELETE USING (biz_schema.user_owns_business(business_id));

-- ─── Expose biz_schema via PostgREST ───────────────────────────────────────
-- IMPORTANT: In Supabase Dashboard, go to:
-- Settings > API > Exposed schemas
-- Add "biz_schema" to the list alongside "public"
-- ============================================================================
