/**
 * Common shared types used across the VIDA ecosystem.
 */

// ─── Base Types ─────────────────────────────────────────────────────────────

/** UUID string type alias for clarity */
export type UUID = string;

/** ISO 8601 date-time string */
export type ISODateTime = string;

/** ISO 8601 date string (date only) */
export type ISODate = string;

/** Base fields present on all database records */
export interface BaseRecord {
  id: UUID;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

// ─── Currency & Tier ────────────────────────────────────────────────────────

export type Currency = "MZN" | "USD" | "EUR" | "ZAR" | "GBP";

export type AppTier = "FREE" | "PRO" | "VIP";

export type AppSlug = "familia" | "dinheiro" | "lar" | "saude" | "biz";

// ─── User & Profile ─────────────────────────────────────────────────────────

export interface User extends BaseRecord {
  email: string;
  phone?: string | null;
  email_confirmed_at?: ISODateTime | null;
  phone_confirmed_at?: ISODateTime | null;
  last_sign_in_at?: ISODateTime | null;
}

export interface Profile extends BaseRecord {
  user_id: UUID;
  full_name: string;
  display_name?: string | null;
  avatar_url?: string | null;
  date_of_birth?: ISODate | null;
  gender?: "male" | "female" | "other" | "prefer_not_to_say" | null;
  phone?: string | null;
  locale: string;
  timezone: string;
  preferred_currency: Currency;
  tier: AppTier;
  onboarding_completed: boolean;
  notification_preferences: NotificationPreferences;
}

export interface NotificationPreferences {
  push_enabled: boolean;
  email_enabled: boolean;
  sms_enabled: boolean;
  reminder_time?: string | null;
  quiet_hours_start?: string | null;
  quiet_hours_end?: string | null;
}

// ─── Family ─────────────────────────────────────────────────────────────────

export type FamilyRole = "admin" | "parent" | "member" | "child" | "guest";

export interface FamilyGroup extends BaseRecord {
  name: string;
  description?: string | null;
  avatar_url?: string | null;
  invite_code: string;
  created_by: UUID;
  max_members: number;
  settings: FamilyGroupSettings;
}

export interface FamilyGroupSettings {
  default_currency: Currency;
  allow_guest_access: boolean;
  require_approval_for_expenses: boolean;
  shared_calendar_enabled: boolean;
}

export interface FamilyMember extends BaseRecord {
  family_group_id: UUID;
  user_id: UUID;
  role: FamilyRole;
  nickname?: string | null;
  joined_at: ISODateTime;
  is_active: boolean;
}
