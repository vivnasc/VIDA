/**
 * Shared constants for the VIDA ecosystem.
 * Defines app metadata, pricing tiers, and Mozambique-specific categories.
 */

import type { CurrencyCode } from "./currency";

// ─── App Definitions ────────────────────────────────────────────────────────

export interface AppDefinition {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  icon: string;
}

export const APP_NAMES: Record<string, AppDefinition> = {
  familia: {
    slug: "familia",
    name: "VIDA Família",
    tagline: "A sua família, conectada",
    color: "#FF6B35",
    icon: "Heart",
  },
  dinheiro: {
    slug: "dinheiro",
    name: "VIDA Dinheiro",
    tagline: "O seu dinheiro, organizado",
    color: "#10B981",
    icon: "Wallet",
  },
  lar: {
    slug: "lar",
    name: "VIDA Lar",
    tagline: "A sua casa, em ordem",
    color: "#3B82F6",
    icon: "Home",
  },
  saude: {
    slug: "saude",
    name: "VIDA Saúde",
    tagline: "A sua saúde, em dia",
    color: "#F43F5E",
    icon: "Activity",
  },
  biz: {
    slug: "biz",
    name: "BIZ.MZ",
    tagline: "Teu negócio, organizado",
    color: "#F59E0B",
    icon: "Briefcase",
  },
} as const;

// ─── Pricing Tiers ──────────────────────────────────────────────────────────

export type TierName = "FREE" | "PRO" | "VIP";

export interface Tier {
  name: TierName;
  displayName: string;
  priceMZN: number;
  priceUSD: number;
  features: string[];
}

export const TIERS: Record<TierName, Tier> = {
  FREE: {
    name: "FREE",
    displayName: "Grátis",
    priceMZN: 0,
    priceUSD: 0,
    features: [
      "1 grupo familiar",
      "Funcionalidades básicas",
      "Até 5 membros",
      "Suporte comunitário",
    ],
  },
  PRO: {
    name: "PRO",
    displayName: "Pro",
    priceMZN: 499,
    priceUSD: 7.99,
    features: [
      "Até 3 grupos familiares",
      "Todas as funcionalidades",
      "Até 15 membros",
      "Suporte prioritário",
      "Relatórios avançados",
      "Exportação de dados",
    ],
  },
  VIP: {
    name: "VIP",
    displayName: "VIP",
    priceMZN: 999,
    priceUSD: 14.99,
    features: [
      "Grupos familiares ilimitados",
      "Todas as funcionalidades",
      "Membros ilimitados",
      "Suporte dedicado",
      "Relatórios premium",
      "API access",
      "Backup automático",
      "Personalização avançada",
    ],
  },
} as const;

// ─── Supported Currencies ───────────────────────────────────────────────────

export const SUPPORTED_CURRENCY_CODES: CurrencyCode[] = [
  "MZN",
  "USD",
  "EUR",
  "ZAR",
  "GBP",
];

export const DEFAULT_CURRENCY: CurrencyCode = "MZN";

// ─── Mozambique-specific Categories ─────────────────────────────────────────

export interface MozambiqueCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const MOZAMBIQUE_CATEGORIES: Record<string, MozambiqueCategory> = {
  xitique: {
    slug: "xitique",
    name: "Xitique",
    description:
      "Sistema tradicional de poupança rotativa entre membros de um grupo de confiança",
    icon: "Users",
  },
  gasosa: {
    slug: "gasosa",
    name: "Gasosa",
    description:
      "Pagamentos informais e gratificações do dia-a-dia",
    icon: "Banknote",
  },
  lobolo: {
    slug: "lobolo",
    name: "Lobolo",
    description:
      "Cerimónia tradicional de casamento e os custos associados",
    icon: "Gem",
  },
  cerimonias: {
    slug: "cerimonias",
    name: "Cerimónias",
    description:
      "Despesas com cerimónias tradicionais, religiosas e culturais",
    icon: "PartyPopper",
  },
  chapa: {
    slug: "chapa",
    name: "Chapa",
    description:
      "Despesas de transporte público (minibus) do dia-a-dia",
    icon: "Bus",
  },
} as const;
