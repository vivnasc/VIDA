/**
 * @vida/utils - Shared utility functions for the VIDA ecosystem.
 *
 * @example
 * import { formatMZN, getGreeting, APP_NAMES } from "@vida/utils";
 */

// Currency utilities
export {
  formatCurrency,
  formatMZN,
  formatUSD,
  formatEUR,
  formatZAR,
  parseCurrency,
  convertCurrency,
  SUPPORTED_CURRENCIES,
} from "./currency";
export type { CurrencyCode, CurrencyInfo, CurrencyRates } from "./currency";

// Date utilities
export {
  formatDate,
  formatDateTime,
  formatRelative,
  isToday,
  isThisWeek,
  isThisMonth,
  getGreeting,
} from "./date";

// Constants
export {
  APP_NAMES,
  TIERS,
  SUPPORTED_CURRENCY_CODES,
  DEFAULT_CURRENCY,
  MOZAMBIQUE_CATEGORIES,
} from "./constants";
export type {
  AppDefinition,
  TierName,
  Tier,
  MozambiqueCategory,
} from "./constants";

// Navigation
export { VIDA_APPS, getAppUrl } from "./navigation";
export type { VidaApp } from "./navigation";
