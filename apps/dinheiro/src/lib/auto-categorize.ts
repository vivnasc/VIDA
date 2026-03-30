/**
 * Auto-Categorization Engine
 *
 * Learns from the user's past categorization patterns and
 * applies rules to automatically categorize new transactions.
 *
 * Strategy:
 * 1. Exact description match → highest confidence
 * 2. Pattern/keyword match → medium confidence
 * 3. Amount range + type heuristics → low confidence
 * 4. Default fallback
 */

export interface CategorizationRule {
  /** Pattern to match against description */
  pattern: string;
  /** Whether to use regex or simple contains */
  isRegex: boolean;
  /** The category to assign */
  category: string;
  /** Confidence 0-1 */
  confidence: number;
  /** How many times this rule was confirmed by user */
  confirmCount: number;
  /** Source: "system" (built-in) or "learned" (from user behavior) */
  source: "system" | "learned";
}

export interface CategorizationResult {
  category: string;
  confidence: number;
  reason: string;
}

// ─── Built-in Rules (Mozambican Context) ─────────────────────────────────────

const SYSTEM_RULES: CategorizationRule[] = [
  // Supermarkets
  { pattern: "shoprite", isRegex: false, category: "Alimentação", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "spar", isRegex: false, category: "Alimentação", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "game", isRegex: false, category: "Compras", confidence: 0.7, confirmCount: 0, source: "system" },
  { pattern: "pingo doce", isRegex: false, category: "Alimentação", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "supermercado", isRegex: false, category: "Alimentação", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "mercado", isRegex: false, category: "Alimentação", confidence: 0.85, confirmCount: 0, source: "system" },
  { pattern: "padaria", isRegex: false, category: "Alimentação", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "talho", isRegex: false, category: "Alimentação", confidence: 0.9, confirmCount: 0, source: "system" },

  // Restaurants
  { pattern: "restaurante", isRegex: false, category: "Restaurantes", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "kfc", isRegex: false, category: "Restaurantes", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "galitos", isRegex: false, category: "Restaurantes", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "nandos", isRegex: false, category: "Restaurantes", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "steers", isRegex: false, category: "Restaurantes", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "pizza", isRegex: false, category: "Restaurantes", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "café", isRegex: false, category: "Restaurantes", confidence: 0.8, confirmCount: 0, source: "system" },
  { pattern: "cafe", isRegex: false, category: "Restaurantes", confidence: 0.8, confirmCount: 0, source: "system" },

  // Fuel
  { pattern: "petromoc", isRegex: false, category: "Combustível", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "galp", isRegex: false, category: "Combustível", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "puma energy", isRegex: false, category: "Combustível", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "total energies", isRegex: false, category: "Combustível", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "engen", isRegex: false, category: "Combustível", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "combustível", isRegex: false, category: "Combustível", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "gasolina", isRegex: false, category: "Combustível", confidence: 0.95, confirmCount: 0, source: "system" },

  // Transport
  { pattern: "uber", isRegex: false, category: "Transporte", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "bolt", isRegex: false, category: "Transporte", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "chapa", isRegex: false, category: "Transporte", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "taxi", isRegex: false, category: "Transporte", confidence: 0.9, confirmCount: 0, source: "system" },

  // Utilities
  { pattern: "edm", isRegex: false, category: "Contas", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "fipag", isRegex: false, category: "Contas", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "electricidade", isRegex: false, category: "Contas", confidence: 0.95, confirmCount: 0, source: "system" },

  // Telecom
  { pattern: "vodacom", isRegex: false, category: "Comunicação", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "movitel", isRegex: false, category: "Comunicação", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "tmcel", isRegex: false, category: "Comunicação", confidence: 0.9, confirmCount: 0, source: "system" },

  // Streaming
  { pattern: "netflix", isRegex: false, category: "Subscrições", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "spotify", isRegex: false, category: "Subscrições", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "youtube", isRegex: false, category: "Subscrições", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "dstv", isRegex: false, category: "Subscrições", confidence: 0.95, confirmCount: 0, source: "system" },

  // Health
  { pattern: "farmácia", isRegex: false, category: "Saúde", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "farmacia", isRegex: false, category: "Saúde", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "hospital", isRegex: false, category: "Saúde", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "clínica", isRegex: false, category: "Saúde", confidence: 0.9, confirmCount: 0, source: "system" },
  { pattern: "clinica", isRegex: false, category: "Saúde", confidence: 0.9, confirmCount: 0, source: "system" },

  // Income
  { pattern: "salário", isRegex: false, category: "Salário", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "salario", isRegex: false, category: "Salário", confidence: 0.95, confirmCount: 0, source: "system" },
  { pattern: "vencimento", isRegex: false, category: "Salário", confidence: 0.95, confirmCount: 0, source: "system" },

  // Housing
  { pattern: "renda", isRegex: false, category: "Casa", confidence: 0.85, confirmCount: 0, source: "system" },
  { pattern: "aluguer", isRegex: false, category: "Casa", confidence: 0.9, confirmCount: 0, source: "system" },

  // Banking
  { pattern: "comissão", isRegex: false, category: "Taxas Bancárias", confidence: 0.85, confirmCount: 0, source: "system" },
  { pattern: "taxa de manutenção", isRegex: false, category: "Taxas Bancárias", confidence: 0.9, confirmCount: 0, source: "system" },
];

// ─── Categorization Engine ───────────────────────────────────────────────────

/**
 * Auto-categorize a transaction based on description.
 * Uses system rules + user-learned rules.
 */
export function autoCategorize(
  description: string,
  type: "income" | "expense" | "transfer",
  amount?: number,
  userRules: CategorizationRule[] = []
): CategorizationResult {
  const normalized = description.toLowerCase().trim();

  // 1. Check user-learned rules first (higher priority)
  for (const rule of userRules) {
    const match = rule.isRegex
      ? new RegExp(rule.pattern, "i").test(normalized)
      : normalized.includes(rule.pattern.toLowerCase());

    if (match) {
      // Boost confidence based on user confirmations
      const boostedConfidence = Math.min(rule.confidence + rule.confirmCount * 0.02, 1.0);
      return {
        category: rule.category,
        confidence: boostedConfidence,
        reason: `Aprendido: "${rule.pattern}" → ${rule.category}`,
      };
    }
  }

  // 2. Check system rules
  let bestMatch: CategorizationResult | null = null;

  for (const rule of SYSTEM_RULES) {
    const match = rule.isRegex
      ? new RegExp(rule.pattern, "i").test(normalized)
      : normalized.includes(rule.pattern.toLowerCase());

    if (match && (!bestMatch || rule.confidence > bestMatch.confidence)) {
      bestMatch = {
        category: rule.category,
        confidence: rule.confidence,
        reason: `Padrão reconhecido: "${rule.pattern}"`,
      };
    }
  }

  if (bestMatch) return bestMatch;

  // 3. Amount-based heuristics
  if (type === "income" && amount) {
    if (amount > 20000) {
      return {
        category: "Salário",
        confidence: 0.4,
        reason: "Valor alto de rendimento (possível salário)",
      };
    }
  }

  // 4. Default
  const defaults: Record<string, string> = {
    income: "Outro Rendimento",
    expense: "Outros",
    transfer: "Transferência",
  };

  return {
    category: defaults[type] || "Outros",
    confidence: 0.1,
    reason: "Sem padrão reconhecido",
  };
}

/**
 * Create a learned rule from user correction.
 * When a user changes a category suggestion, we learn from it.
 */
export function createLearnedRule(
  description: string,
  correctCategory: string,
  existingRules: CategorizationRule[]
): CategorizationRule {
  // Check if we already have a rule for this pattern
  const normalized = description.toLowerCase().trim();
  const existing = existingRules.find(
    (r) => r.pattern.toLowerCase() === normalized && r.source === "learned"
  );

  if (existing) {
    // Update existing rule
    existing.category = correctCategory;
    existing.confirmCount++;
    existing.confidence = Math.min(existing.confidence + 0.05, 0.98);
    return existing;
  }

  // Create new rule
  // Extract the most meaningful part of the description
  const keywords = normalized
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 3)
    .join(" ");

  return {
    pattern: keywords || normalized,
    isRegex: false,
    category: correctCategory,
    confidence: 0.7,
    confirmCount: 1,
    source: "learned",
  };
}

/**
 * Get category suggestions for a partial description (as user types).
 */
export function suggestCategories(
  partialDescription: string,
  type: "income" | "expense" | "transfer",
  userRules: CategorizationRule[] = [],
  limit = 3
): CategorizationResult[] {
  if (partialDescription.length < 2) return [];

  const normalized = partialDescription.toLowerCase().trim();
  const results: CategorizationResult[] = [];
  const seen = new Set<string>();

  const allRules = [...userRules, ...SYSTEM_RULES];

  for (const rule of allRules) {
    if (seen.size >= limit) break;

    const match = normalized.includes(rule.pattern.toLowerCase()) ||
      rule.pattern.toLowerCase().includes(normalized);

    if (match && !seen.has(rule.category)) {
      seen.add(rule.category);
      results.push({
        category: rule.category,
        confidence: rule.confidence * 0.8, // Reduce confidence for partial matches
        reason: rule.source === "learned" ? "Baseado no teu histórico" : "Sugestão automática",
      });
    }
  }

  return results;
}
