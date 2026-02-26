-- ============================================================================
-- VIDA Ecosystem - Seed Data
-- ============================================================================
-- Default system categories for VIDA Money
-- These categories are Mozambique-specific with Portuguese labels
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Default Expense Categories
-- ----------------------------------------------------------------------------

INSERT INTO money_schema.categories (id, user_id, name, type, icon, color, parent_id, is_system) VALUES
  -- Food & Daily
  (gen_random_uuid(), NULL, 'Alimentacao', 'expense', 'utensils', '#FF6B6B', NULL, true),
  (gen_random_uuid(), NULL, 'Transporte', 'expense', 'bus', '#4ECDC4', NULL, true),
  (gen_random_uuid(), NULL, 'Chapa', 'expense', 'bus-alt', '#45B7D1', NULL, true),

  -- Housing & Utilities
  (gen_random_uuid(), NULL, 'Casa', 'expense', 'home', '#96CEB4', NULL, true),
  (gen_random_uuid(), NULL, 'Agua', 'expense', 'droplet', '#4FC3F7', NULL, true),
  (gen_random_uuid(), NULL, 'Luz', 'expense', 'bolt', '#FFD93D', NULL, true),
  (gen_random_uuid(), NULL, 'Gas', 'expense', 'fire', '#FF8A65', NULL, true),
  (gen_random_uuid(), NULL, 'Internet', 'expense', 'wifi', '#7C4DFF', NULL, true),
  (gen_random_uuid(), NULL, 'Seguranca', 'expense', 'shield', '#78909C', NULL, true),

  -- People & Services
  (gen_random_uuid(), NULL, 'Saude', 'expense', 'heartbeat', '#E91E63', NULL, true),
  (gen_random_uuid(), NULL, 'Educacao', 'expense', 'graduation-cap', '#3F51B5', NULL, true),
  (gen_random_uuid(), NULL, 'Empregada', 'expense', 'user-friends', '#8D6E63', NULL, true),

  -- Lifestyle
  (gen_random_uuid(), NULL, 'Lazer', 'expense', 'gamepad', '#AB47BC', NULL, true),
  (gen_random_uuid(), NULL, 'Roupa', 'expense', 'tshirt', '#26A69A', NULL, true),
  (gen_random_uuid(), NULL, 'Comunicacao', 'expense', 'phone', '#42A5F5', NULL, true),
  (gen_random_uuid(), NULL, 'Gasosa', 'expense', 'gas-pump', '#FFA726', NULL, true),

  -- Cultural & Traditional
  (gen_random_uuid(), NULL, 'Xitique', 'expense', 'users', '#EC407A', NULL, true),
  (gen_random_uuid(), NULL, 'Lobolo', 'expense', 'ring', '#D4AF37', NULL, true),
  (gen_random_uuid(), NULL, 'Ceremonias', 'expense', 'calendar-star', '#7E57C2', NULL, true);

-- ----------------------------------------------------------------------------
-- Default Income Categories
-- ----------------------------------------------------------------------------

INSERT INTO money_schema.categories (id, user_id, name, type, icon, color, parent_id, is_system) VALUES
  (gen_random_uuid(), NULL, 'Salario', 'income', 'wallet', '#4CAF50', NULL, true),
  (gen_random_uuid(), NULL, 'Freelance', 'income', 'laptop', '#66BB6A', NULL, true),
  (gen_random_uuid(), NULL, 'Negocio', 'income', 'store', '#43A047', NULL, true),
  (gen_random_uuid(), NULL, 'Investimentos', 'income', 'chart-line', '#2E7D32', NULL, true),
  (gen_random_uuid(), NULL, 'Presente', 'income', 'gift', '#81C784', NULL, true),
  (gen_random_uuid(), NULL, 'Reembolso', 'income', 'undo', '#A5D6A7', NULL, true);
