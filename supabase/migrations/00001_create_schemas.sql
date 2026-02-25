-- ============================================================================
-- VIDA Ecosystem - Migration 00001: Create Schemas
-- ============================================================================
-- Creates the four domain schemas for the VIDA ecosystem:
--   money_schema  - Financial management (VIDA Money)
--   home_schema   - Household management (VIDA Home)
--   health_schema - Health & wellness tracking (VIDA Health)
--   family_schema - Family coordination (VIDA Family)
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS money_schema;
CREATE SCHEMA IF NOT EXISTS home_schema;
CREATE SCHEMA IF NOT EXISTS health_schema;
CREATE SCHEMA IF NOT EXISTS family_schema;

-- Grant usage on schemas to authenticated and service_role users
GRANT USAGE ON SCHEMA money_schema TO authenticated, service_role;
GRANT USAGE ON SCHEMA home_schema TO authenticated, service_role;
GRANT USAGE ON SCHEMA health_schema TO authenticated, service_role;
GRANT USAGE ON SCHEMA family_schema TO authenticated, service_role;

-- Grant default privileges so future tables are accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA money_schema
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA money_schema
  GRANT ALL ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA home_schema
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA home_schema
  GRANT ALL ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA health_schema
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA health_schema
  GRANT ALL ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA family_schema
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA family_schema
  GRANT ALL ON TABLES TO service_role;

-- Grant usage on sequences created in schemas
ALTER DEFAULT PRIVILEGES IN SCHEMA money_schema
  GRANT USAGE ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA home_schema
  GRANT USAGE ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA health_schema
  GRANT USAGE ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA family_schema
  GRANT USAGE ON SEQUENCES TO authenticated;
