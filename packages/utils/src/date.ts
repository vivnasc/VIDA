/**
 * Date formatting and utility functions for the VIDA ecosystem.
 * Uses Portuguese (Mozambique) locale by default.
 */

const DEFAULT_LOCALE = "pt-MZ";

/**
 * Formats a date in a human-readable format.
 *
 * @param date - The date to format (Date object or ISO string)
 * @param options - Optional Intl.DateTimeFormat options
 * @returns Formatted date string (e.g., "25 de fevereiro de 2026")
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(d);
}

/**
 * Formats a date with time included.
 *
 * @param date - The date to format (Date object or ISO string)
 * @returns Formatted date-time string (e.g., "25 de fev. de 2026, 14:30")
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/**
 * Formats a date as a relative time string (e.g., "há 5 minutos", "amanhã").
 *
 * @param date - The date to format (Date object or ISO string)
 * @param baseDate - The reference date to calculate relative time from (defaults to now)
 * @returns A relative time string in Portuguese
 */
export function formatRelative(
  date: Date | string,
  baseDate: Date = new Date(),
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = d.getTime() - baseDate.getTime();
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  const rtf = new Intl.RelativeTimeFormat(DEFAULT_LOCALE, {
    numeric: "auto",
  });

  if (Math.abs(diffSeconds) < 60) {
    return rtf.format(diffSeconds, "second");
  }
  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, "minute");
  }
  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, "hour");
  }
  if (Math.abs(diffDays) < 7) {
    return rtf.format(diffDays, "day");
  }
  if (Math.abs(diffWeeks) < 5) {
    return rtf.format(diffWeeks, "week");
  }
  if (Math.abs(diffMonths) < 12) {
    return rtf.format(diffMonths, "month");
  }
  return rtf.format(diffYears, "year");
}

/**
 * Checks if a given date is today.
 *
 * @param date - The date to check (Date object or ISO string)
 * @returns True if the date is today
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

/**
 * Checks if a given date falls within the current week (Monday to Sunday).
 *
 * @param date - The date to check (Date object or ISO string)
 * @returns True if the date is within this week
 */
export function isThisWeek(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  // Get Monday of the current week
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  // Get Sunday of the current week
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return d >= monday && d <= sunday;
}

/**
 * Checks if a given date falls within the current month.
 *
 * @param date - The date to check (Date object or ISO string)
 * @returns True if the date is within this month
 */
export function isThisMonth(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

/**
 * Returns a Portuguese greeting based on the current time of day.
 *
 * - 05:00 - 11:59 -> "Bom dia"
 * - 12:00 - 17:59 -> "Boa tarde"
 * - 18:00 - 04:59 -> "Boa noite"
 *
 * @param date - Optional date to determine time of day (defaults to now)
 * @returns A greeting string in Portuguese
 */
export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return "Bom dia";
  }
  if (hour >= 12 && hour < 18) {
    return "Boa tarde";
  }
  return "Boa noite";
}
