/**
 * Referral system for maBIZ.
 * Generates unique referral codes, tracks shares, and manages rewards.
 * All data stored in localStorage for anonymous operation.
 */

const REFERRAL_STORAGE_KEY = "mabiz-referral";
const REFERRAL_STATS_KEY = "mabiz-referral-stats";

export interface ReferralData {
  code: string;
  createdAt: string;
  sharedCount: number;
  activatedCount: number;
  rewardDays: number; // bonus free days earned
}

export interface ReferralStats {
  totalShares: number;
  totalActivations: number;
  totalRewardDays: number;
  lastShareDate: string | null;
}

/** Generate a unique 6-char referral code */
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/** Get or create referral data for current user */
export function getReferralData(): ReferralData {
  if (typeof window === "undefined") {
    return { code: "", createdAt: "", sharedCount: 0, activatedCount: 0, rewardDays: 0 };
  }

  const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as ReferralData;
  }

  const data: ReferralData = {
    code: generateCode(),
    createdAt: new Date().toISOString(),
    sharedCount: 0,
    activatedCount: 0,
    rewardDays: 0,
  };
  localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(data));
  return data;
}

/** Record a share event */
export function recordShare(): ReferralData {
  const data = getReferralData();
  data.sharedCount += 1;
  localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(data));

  // Update stats
  const stats = getReferralStats();
  stats.totalShares += 1;
  stats.lastShareDate = new Date().toISOString();
  localStorage.setItem(REFERRAL_STATS_KEY, JSON.stringify(stats));

  return data;
}

/** Simulate activation (in real app, this would be server-side) */
export function recordActivation(): ReferralData {
  const data = getReferralData();
  data.activatedCount += 1;
  data.rewardDays += 7; // 7 days free per activation
  localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(data));
  return data;
}

/** Get referral statistics */
export function getReferralStats(): ReferralStats {
  if (typeof window === "undefined") {
    return { totalShares: 0, totalActivations: 0, totalRewardDays: 0, lastShareDate: null };
  }

  const stored = localStorage.getItem(REFERRAL_STATS_KEY);
  if (stored) {
    return JSON.parse(stored) as ReferralStats;
  }

  return { totalShares: 0, totalActivations: 0, totalRewardDays: 0, lastShareDate: null };
}

/** Generate share text for WhatsApp/SMS */
export function getShareText(code: string, businessName?: string): string {
  const name = businessName ? ` (${businessName})` : "";
  return `Estou a usar o maBIZ${name} para organizar o meu negócio! Vendas, stock, fiados — tudo no telemóvel. Experimenta grátis com o meu código: ${code}. Descarrega aqui: https://mabiz.co.mz/?ref=${code}`;
}

/** Generate WhatsApp share URL */
export function getWhatsAppShareUrl(code: string, businessName?: string): string {
  const text = encodeURIComponent(getShareText(code, businessName));
  return `https://wa.me/?text=${text}`;
}

/** Generate SMS share URL */
export function getSmsShareUrl(code: string, businessName?: string): string {
  const text = encodeURIComponent(getShareText(code, businessName));
  return `sms:?body=${text}`;
}

/** Check if referred (URL has ref param) and store referrer code */
export function checkAndStoreReferral(): string | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const refCode = params.get("ref");
  if (refCode) {
    localStorage.setItem("mabiz-referred-by", refCode);
    return refCode;
  }
  return localStorage.getItem("mabiz-referred-by");
}

/** Calculate reward tier */
export function getRewardTier(activations: number): {
  tier: string;
  label: string;
  nextTier: number;
  color: string;
} {
  if (activations >= 20) return { tier: "gold", label: "Embaixador Ouro", nextTier: 0, color: "text-yellow-600" };
  if (activations >= 10) return { tier: "silver", label: "Embaixador Prata", nextTier: 20, color: "text-gray-500" };
  if (activations >= 3) return { tier: "bronze", label: "Embaixador Bronze", nextTier: 10, color: "text-amber-700" };
  return { tier: "starter", label: "Iniciante", nextTier: 3, color: "text-emerald-600" };
}
