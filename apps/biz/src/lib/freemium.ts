/**
 * Freemium system for maBIZ.
 * Manages free tier limits, subscription status, and trial periods.
 * Uses localStorage for anonymous, offline-first operation.
 */

const FREEMIUM_KEY = "mabiz-freemium";
const TRANSACTIONS_KEY = "mabiz-monthly-transactions";

export type PlanType = "free" | "trial" | "pro" | "business";

export interface FreemiumData {
  plan: PlanType;
  trialStartDate: string | null;
  trialEndDate: string | null;
  subscriptionDate: string | null;
  bonusDays: number; // from referrals
}

export interface TransactionCount {
  month: string; // YYYY-MM
  count: number;
}

// Free tier limits
export const FREE_LIMITS = {
  monthlyTransactions: 20,
  maxProducts: 15,
  maxCustomers: 10,
  hasReports: false,
  hasExport: false,
  hasMultiStore: false,
  showAds: true,
} as const;

export const PRO_LIMITS = {
  monthlyTransactions: Infinity,
  maxProducts: Infinity,
  maxCustomers: Infinity,
  hasReports: true,
  hasExport: true,
  hasMultiStore: false,
  showAds: false,
} as const;

/** Get current freemium data */
export function getFreemiumData(): FreemiumData {
  if (typeof window === "undefined") {
    return { plan: "free", trialStartDate: null, trialEndDate: null, subscriptionDate: null, bonusDays: 0 };
  }

  const stored = localStorage.getItem(FREEMIUM_KEY);
  if (stored) {
    return JSON.parse(stored) as FreemiumData;
  }

  // New user starts with 7-day trial
  const now = new Date();
  const trialEnd = new Date(now);
  trialEnd.setDate(trialEnd.getDate() + 7);

  const data: FreemiumData = {
    plan: "trial",
    trialStartDate: now.toISOString(),
    trialEndDate: trialEnd.toISOString(),
    subscriptionDate: null,
    bonusDays: 0,
  };
  localStorage.setItem(FREEMIUM_KEY, JSON.stringify(data));
  return data;
}

/** Check if trial has expired */
export function isTrialExpired(data: FreemiumData): boolean {
  if (data.plan !== "trial" || !data.trialEndDate) return false;
  const endDate = new Date(data.trialEndDate);
  // Add bonus days from referrals
  endDate.setDate(endDate.getDate() + data.bonusDays);
  return new Date() > endDate;
}

/** Get remaining trial days (including bonus) */
export function getTrialDaysRemaining(data: FreemiumData): number {
  if (data.plan !== "trial" || !data.trialEndDate) return 0;
  const endDate = new Date(data.trialEndDate);
  endDate.setDate(endDate.getDate() + data.bonusDays);
  const diff = endDate.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/** Get current month's transaction count */
export function getMonthlyTransactionCount(): TransactionCount {
  if (typeof window === "undefined") {
    return { month: "", count: 0 };
  }

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  if (stored) {
    const data = JSON.parse(stored) as TransactionCount;
    if (data.month === currentMonth) return data;
  }

  // New month, reset count
  const data: TransactionCount = { month: currentMonth, count: 0 };
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(data));
  return data;
}

/** Increment transaction count, returns true if within limit */
export function recordTransaction(): { allowed: boolean; count: number; limit: number } {
  const freemium = getFreemiumData();

  // Paid plans and active trials have unlimited transactions
  if (freemium.plan === "pro" || freemium.plan === "business") {
    return { allowed: true, count: 0, limit: Infinity };
  }

  if (freemium.plan === "trial" && !isTrialExpired(freemium)) {
    return { allowed: true, count: 0, limit: Infinity };
  }

  // Free plan — check limits
  const txn = getMonthlyTransactionCount();
  const limit = FREE_LIMITS.monthlyTransactions;

  if (txn.count >= limit) {
    return { allowed: false, count: txn.count, limit };
  }

  txn.count += 1;
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(txn));
  return { allowed: true, count: txn.count, limit };
}

/** Check if a feature is available on current plan */
export function canUseFeature(feature: keyof typeof FREE_LIMITS): boolean {
  const freemium = getFreemiumData();

  if (freemium.plan === "pro" || freemium.plan === "business") return true;
  if (freemium.plan === "trial" && !isTrialExpired(freemium)) return true;

  return !!FREE_LIMITS[feature];
}

/** Check if should show ads */
export function shouldShowAds(): boolean {
  const freemium = getFreemiumData();
  if (freemium.plan === "pro" || freemium.plan === "business") return false;
  if (freemium.plan === "trial" && !isTrialExpired(freemium)) return false;
  return true;
}

/** Add bonus days from referral */
export function addBonusDays(days: number): FreemiumData {
  const data = getFreemiumData();
  data.bonusDays += days;
  localStorage.setItem(FREEMIUM_KEY, JSON.stringify(data));
  return data;
}

/** Upgrade to a paid plan (simulated) */
export function upgradePlan(plan: "pro" | "business"): FreemiumData {
  const data = getFreemiumData();
  data.plan = plan;
  data.subscriptionDate = new Date().toISOString();
  localStorage.setItem(FREEMIUM_KEY, JSON.stringify(data));
  return data;
}

/** Downgrade to free (e.g., after trial expires without payment) */
export function downgradeToFree(): FreemiumData {
  const data = getFreemiumData();
  data.plan = "free";
  localStorage.setItem(FREEMIUM_KEY, JSON.stringify(data));
  return data;
}

/** Get plan display info */
export function getPlanInfo(plan: PlanType): { name: string; color: string; badge: string } {
  switch (plan) {
    case "business": return { name: "Negócio", color: "bg-violet-500", badge: "text-violet-600 bg-violet-50" };
    case "pro": return { name: "Pro", color: "bg-primary-500", badge: "text-primary-600 bg-primary-50" };
    case "trial": return { name: "Trial", color: "bg-amber-500", badge: "text-amber-600 bg-amber-50" };
    default: return { name: "Grátis", color: "bg-gray-400", badge: "text-gray-600 bg-gray-100" };
  }
}
