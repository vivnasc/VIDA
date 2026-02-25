-- ============================================================================
-- VIDA Ecosystem - Migration 00005: Health Schema Tables
-- ============================================================================
-- Health & wellness tracking tables for VIDA Health:
--   medical_profiles, medications, medication_logs, appointments,
--   vaccinations, health_providers, health_metrics, insurance_claims
-- Includes ENUM types, foreign keys, constraints, indexes, and RLS policies
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUM Types
-- ----------------------------------------------------------------------------

CREATE TYPE health_schema.appointment_status AS ENUM (
  'scheduled',
  'completed',
  'cancelled'
);

CREATE TYPE health_schema.insurance_claim_status AS ENUM (
  'submitted',
  'approved',
  'denied',
  'reimbursed'
);

-- ============================================================================
-- TABLE: medical_profiles
-- ============================================================================

CREATE TABLE health_schema.medical_profiles (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  family_member_name      TEXT NOT NULL,
  relationship            TEXT,
  blood_type              TEXT,
  allergies               TEXT[],
  chronic_conditions      TEXT[],
  surgeries               JSONB DEFAULT '[]',
  emergency_contact_name  TEXT,
  emergency_contact_phone TEXT,
  insurance_provider      TEXT,
  insurance_number        TEXT,
  notes                   TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE health_schema.medical_profiles IS 'Medical profiles for user and family members';

-- Indexes
CREATE INDEX idx_medical_profiles_user_id ON health_schema.medical_profiles (user_id);

-- Updated_at trigger
CREATE TRIGGER set_medical_profiles_updated_at
  BEFORE UPDATE ON health_schema.medical_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: medications
-- ============================================================================

CREATE TABLE health_schema.medications (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  profile_id          UUID NOT NULL REFERENCES health_schema.medical_profiles(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  dosage              TEXT,
  frequency           TEXT,
  time_of_day         TEXT[],
  start_date          DATE,
  end_date            DATE,
  is_active           BOOLEAN NOT NULL DEFAULT true,
  stock_quantity      INT,
  refill_reminder     BOOLEAN NOT NULL DEFAULT false,
  prescribing_doctor  TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT chk_medication_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

COMMENT ON TABLE health_schema.medications IS 'Medication tracking with dosage and schedule';

-- Indexes
CREATE INDEX idx_medications_user_id ON health_schema.medications (user_id);
CREATE INDEX idx_medications_profile_id ON health_schema.medications (profile_id);
CREATE INDEX idx_medications_user_active ON health_schema.medications (user_id, is_active);

-- Updated_at trigger
CREATE TRIGGER set_medications_updated_at
  BEFORE UPDATE ON health_schema.medications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: medication_logs
-- ============================================================================

CREATE TABLE health_schema.medication_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medication_id   UUID NOT NULL REFERENCES health_schema.medications(id) ON DELETE CASCADE,
  taken_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  was_taken       BOOLEAN NOT NULL DEFAULT true,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE health_schema.medication_logs IS 'Log of medication intake events';

-- Indexes
CREATE INDEX idx_medication_logs_medication_id ON health_schema.medication_logs (medication_id);
CREATE INDEX idx_medication_logs_taken_at ON health_schema.medication_logs (taken_at DESC);

-- ============================================================================
-- TABLE: appointments
-- ============================================================================

CREATE TABLE health_schema.appointments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  profile_id          UUID REFERENCES health_schema.medical_profiles(id) ON DELETE SET NULL,
  provider_name       TEXT NOT NULL,
  specialty           TEXT,
  date_time           TIMESTAMPTZ NOT NULL,
  location            TEXT,
  notes               TEXT,
  reminder_before     INT DEFAULT 60,
  is_recurring        BOOLEAN NOT NULL DEFAULT false,
  recurring_config    JSONB,
  status              health_schema.appointment_status NOT NULL DEFAULT 'scheduled',
  cost                DECIMAL(15, 2),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE health_schema.appointments IS 'Medical appointments with reminders and recurrence';

-- Indexes
CREATE INDEX idx_appointments_user_id ON health_schema.appointments (user_id);
CREATE INDEX idx_appointments_profile_id ON health_schema.appointments (profile_id);
CREATE INDEX idx_appointments_date ON health_schema.appointments (date_time);
CREATE INDEX idx_appointments_user_status ON health_schema.appointments (user_id, status);
CREATE INDEX idx_appointments_upcoming ON health_schema.appointments (user_id, date_time)
  WHERE status = 'scheduled';

-- Updated_at trigger
CREATE TRIGGER set_appointments_updated_at
  BEFORE UPDATE ON health_schema.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: vaccinations
-- ============================================================================

CREATE TABLE health_schema.vaccinations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  profile_id          UUID REFERENCES health_schema.medical_profiles(id) ON DELETE SET NULL,
  vaccine_name        TEXT NOT NULL,
  dose_number         INT,
  date_administered   DATE NOT NULL,
  next_dose_date      DATE,
  administered_by     TEXT,
  location            TEXT,
  batch_number        TEXT,
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE health_schema.vaccinations IS 'Vaccination records with dose tracking';

-- Indexes
CREATE INDEX idx_vaccinations_user_id ON health_schema.vaccinations (user_id);
CREATE INDEX idx_vaccinations_profile_id ON health_schema.vaccinations (profile_id);
CREATE INDEX idx_vaccinations_next_dose ON health_schema.vaccinations (next_dose_date)
  WHERE next_dose_date IS NOT NULL;

-- ============================================================================
-- TABLE: health_providers
-- ============================================================================

CREATE TABLE health_schema.health_providers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  specialty       TEXT,
  phone           TEXT,
  email           TEXT,
  address         TEXT,
  notes           TEXT,
  rating          INT CHECK (rating >= 1 AND rating <= 5),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE health_schema.health_providers IS 'Healthcare provider directory';

-- Indexes
CREATE INDEX idx_health_providers_user_id ON health_schema.health_providers (user_id);
CREATE INDEX idx_health_providers_specialty ON health_schema.health_providers (specialty);

-- Updated_at trigger
CREATE TRIGGER set_health_providers_updated_at
  BEFORE UPDATE ON health_schema.health_providers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- TABLE: health_metrics
-- ============================================================================

CREATE TABLE health_schema.health_metrics (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  profile_id      UUID REFERENCES health_schema.medical_profiles(id) ON DELETE SET NULL,
  metric_type     TEXT NOT NULL,
  value           DECIMAL(10, 2) NOT NULL,
  unit            TEXT,
  measured_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE health_schema.health_metrics IS 'Health measurements (weight, blood pressure, glucose, etc.)';

-- Indexes
CREATE INDEX idx_health_metrics_user_id ON health_schema.health_metrics (user_id);
CREATE INDEX idx_health_metrics_profile_id ON health_schema.health_metrics (profile_id);
CREATE INDEX idx_health_metrics_type ON health_schema.health_metrics (user_id, metric_type);
CREATE INDEX idx_health_metrics_measured ON health_schema.health_metrics (measured_at DESC);

-- ============================================================================
-- TABLE: insurance_claims
-- ============================================================================

CREATE TABLE health_schema.insurance_claims (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  profile_id      UUID REFERENCES health_schema.medical_profiles(id) ON DELETE SET NULL,
  provider        TEXT NOT NULL,
  claim_number    TEXT,
  amount          DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
  status          health_schema.insurance_claim_status NOT NULL DEFAULT 'submitted',
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at     TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE health_schema.insurance_claims IS 'Insurance claim tracking and status';

-- Indexes
CREATE INDEX idx_insurance_claims_user_id ON health_schema.insurance_claims (user_id);
CREATE INDEX idx_insurance_claims_profile_id ON health_schema.insurance_claims (profile_id);
CREATE INDEX idx_insurance_claims_status ON health_schema.insurance_claims (user_id, status);

-- Updated_at trigger
CREATE TRIGGER set_insurance_claims_updated_at
  BEFORE UPDATE ON health_schema.insurance_claims
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all health_schema tables
ALTER TABLE health_schema.medical_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_schema.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_schema.medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_schema.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_schema.vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_schema.health_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_schema.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_schema.insurance_claims ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- Medical Profiles RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "medical_profiles_select_own"
  ON health_schema.medical_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "medical_profiles_insert_own"
  ON health_schema.medical_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "medical_profiles_update_own"
  ON health_schema.medical_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "medical_profiles_delete_own"
  ON health_schema.medical_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Medications RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "medications_select_own"
  ON health_schema.medications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "medications_insert_own"
  ON health_schema.medications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "medications_update_own"
  ON health_schema.medications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "medications_delete_own"
  ON health_schema.medications FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Medication Logs RLS Policies
-- (Access via parent medication ownership)
-- --------------------------------------------------------------------------

CREATE POLICY "medication_logs_select_own"
  ON health_schema.medication_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM health_schema.medications m
      WHERE m.id = medication_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY "medication_logs_insert_own"
  ON health_schema.medication_logs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM health_schema.medications m
      WHERE m.id = medication_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY "medication_logs_update_own"
  ON health_schema.medication_logs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM health_schema.medications m
      WHERE m.id = medication_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY "medication_logs_delete_own"
  ON health_schema.medication_logs FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM health_schema.medications m
      WHERE m.id = medication_id AND m.user_id = auth.uid()
    )
  );

-- --------------------------------------------------------------------------
-- Appointments RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "appointments_select_own"
  ON health_schema.appointments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "appointments_insert_own"
  ON health_schema.appointments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "appointments_update_own"
  ON health_schema.appointments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "appointments_delete_own"
  ON health_schema.appointments FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Vaccinations RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "vaccinations_select_own"
  ON health_schema.vaccinations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "vaccinations_insert_own"
  ON health_schema.vaccinations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "vaccinations_update_own"
  ON health_schema.vaccinations FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "vaccinations_delete_own"
  ON health_schema.vaccinations FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Health Providers RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "health_providers_select_own"
  ON health_schema.health_providers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "health_providers_insert_own"
  ON health_schema.health_providers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "health_providers_update_own"
  ON health_schema.health_providers FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "health_providers_delete_own"
  ON health_schema.health_providers FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Health Metrics RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "health_metrics_select_own"
  ON health_schema.health_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "health_metrics_insert_own"
  ON health_schema.health_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "health_metrics_update_own"
  ON health_schema.health_metrics FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "health_metrics_delete_own"
  ON health_schema.health_metrics FOR DELETE
  USING (auth.uid() = user_id);

-- --------------------------------------------------------------------------
-- Insurance Claims RLS Policies
-- --------------------------------------------------------------------------

CREATE POLICY "insurance_claims_select_own"
  ON health_schema.insurance_claims FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "insurance_claims_insert_own"
  ON health_schema.insurance_claims FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "insurance_claims_update_own"
  ON health_schema.insurance_claims FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "insurance_claims_delete_own"
  ON health_schema.insurance_claims FOR DELETE
  USING (auth.uid() = user_id);
