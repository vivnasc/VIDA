/**
 * Currency formatting and conversion utilities for the VIDA ecosystem.
 * Supports Mozambican Metical (MZN) as primary currency alongside
 * USD, EUR, ZAR, and GBP.
 */

export type CurrencyCode = "MZN" | "USD" | "EUR" | "ZAR" | "GBP";

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  locale: string;
  decimalPlaces: number;
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  MZN: {
    code: "MZN",
    name: "Metical moçambicano",
    symbol: "MT",
    locale: "pt-MZ",
    decimalPlaces: 2,
  },
  USD: {
    code: "USD",
    name: "Dólar americano",
    symbol: "$",
    locale: "en-US",
    decimalPlaces: 2,
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    locale: "pt-PT",
    decimalPlaces: 2,
  },
  ZAR: {
    code: "ZAR",
    name: "Rand sul-africano",
    symbol: "R",
    locale: "en-ZA",
    decimalPlaces: 2,
  },
  GBP: {
    code: "GBP",
    name: "Libra esterlina",
    symbol: "£",
    locale: "en-GB",
    decimalPlaces: 2,
  },
} as const;

/**
 * Formats a numeric amount as a currency string.
 *
 * @param amount - The numeric value to format
 * @param currencyCode - ISO 4217 currency code
 * @param options - Additional Intl.NumberFormat options
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1500.5, "MZN") // "1.500,50 MT"
 * formatCurrency(99.99, "USD")  // "$99.99"
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  options?: Partial<Intl.NumberFormatOptions>,
): string {
  const currencyInfo = SUPPORTED_CURRENCIES[currencyCode];
  if (!currencyInfo) {
    throw new Error(`Unsupported currency: ${currencyCode}`);
  }

  return new Intl.NumberFormat(currencyInfo.locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: currencyInfo.decimalPlaces,
    maximumFractionDigits: currencyInfo.decimalPlaces,
    ...options,
  }).format(amount);
}

/**
 * Formats a numeric amount as Mozambican Metical (MZN).
 *
 * @param amount - The numeric value to format
 * @returns Formatted MZN string (e.g., "1.500,50 MT")
 */
export function formatMZN(amount: number): string {
  return formatCurrency(amount, "MZN");
}

/**
 * Formats a numeric amount as US Dollar (USD).
 *
 * @param amount - The numeric value to format
 * @returns Formatted USD string (e.g., "$1,500.50")
 */
export function formatUSD(amount: number): string {
  return formatCurrency(amount, "USD");
}

/**
 * Formats a numeric amount as Euro (EUR).
 *
 * @param amount - The numeric value to format
 * @returns Formatted EUR string (e.g., "1.500,50 €")
 */
export function formatEUR(amount: number): string {
  return formatCurrency(amount, "EUR");
}

/**
 * Formats a numeric amount as South African Rand (ZAR).
 *
 * @param amount - The numeric value to format
 * @returns Formatted ZAR string (e.g., "R 1,500.50")
 */
export function formatZAR(amount: number): string {
  return formatCurrency(amount, "ZAR");
}

/**
 * Parses a currency string back into a numeric value.
 * Handles various locale-specific formats including comma/period decimal separators.
 *
 * @param value - The currency string to parse
 * @returns The numeric value, or NaN if parsing fails
 *
 * @example
 * parseCurrency("1.500,50 MT") // 1500.50
 * parseCurrency("$1,500.50")   // 1500.50
 * parseCurrency("R 1 500,50")  // 1500.50
 */
export function parseCurrency(value: string): number {
  if (!value || typeof value !== "string") {
    return NaN;
  }

  // Remove all currency symbols and non-numeric characters except digits, commas, periods, and minus
  let cleaned = value.replace(/[^\d.,-]/g, "").trim();

  if (cleaned === "") {
    return NaN;
  }

  // Determine if comma is used as decimal separator
  // Heuristic: if the last separator is a comma and has 1-2 digits after it, treat as decimal
  const lastCommaIndex = cleaned.lastIndexOf(",");
  const lastDotIndex = cleaned.lastIndexOf(".");

  if (lastCommaIndex > lastDotIndex) {
    // Comma is likely the decimal separator (e.g., "1.500,50")
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (lastDotIndex > lastCommaIndex) {
    // Period is likely the decimal separator (e.g., "1,500.50")
    cleaned = cleaned.replace(/,/g, "");
  } else {
    // No ambiguity or no separators
    cleaned = cleaned.replace(/,/g, "");
  }

  const result = parseFloat(cleaned);
  return isNaN(result) ? NaN : result;
}

export type CurrencyRates = Partial<Record<CurrencyCode, number>>;

/**
 * Converts an amount from one currency to another using provided exchange rates.
 * Rates should be relative to a common base (e.g., 1 USD = X of target currency).
 *
 * @param amount - The amount to convert
 * @param from - Source currency code
 * @param to - Target currency code
 * @param rates - Exchange rates object where keys are currency codes and values are rates relative to a base
 * @returns The converted amount
 * @throws If rates for either currency are not provided
 *
 * @example
 * const rates = { MZN: 63.5, USD: 1, EUR: 0.92, ZAR: 18.5, GBP: 0.79 };
 * convertCurrency(100, "USD", "MZN", rates) // 6350
 * convertCurrency(6350, "MZN", "USD", rates) // 100
 */
export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates: CurrencyRates,
): number {
  if (from === to) {
    return amount;
  }

  const fromRate = rates[from];
  const toRate = rates[to];

  if (fromRate === undefined || fromRate === 0) {
    throw new Error(`Exchange rate not available for currency: ${from}`);
  }

  if (toRate === undefined) {
    throw new Error(`Exchange rate not available for currency: ${to}`);
  }

  // Convert to base first, then to target
  const baseAmount = amount / fromRate;
  return Math.round(baseAmount * toRate * 100) / 100;
}
