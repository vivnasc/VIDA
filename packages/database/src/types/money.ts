/**
 * Types for the VIDA Dinheiro (Money) app.
 * Covers accounts, transactions, budgets, goals, xitique, and debts.
 */

import type { BaseRecord, UUID, ISODateTime, ISODate, Currency } from "./common";

// ─── Account ────────────────────────────────────────────────────────────────

export type AccountType =
  | "checking"
  | "savings"
  | "cash"
  | "mobile_money"
  | "credit_card"
  | "investment"
  | "other";

export interface Account extends BaseRecord {
  user_id: UUID;
  family_group_id?: UUID | null;
  name: string;
  type: AccountType;
  currency: Currency;
  balance: number;
  icon?: string | null;
  color?: string | null;
  institution?: string | null;
  is_shared: boolean;
  is_active: boolean;
  include_in_total: boolean;
}

// ─── Category ───────────────────────────────────────────────────────────────

export type CategoryType = "income" | "expense" | "transfer";

export interface Category extends BaseRecord {
  user_id?: UUID | null;
  family_group_id?: UUID | null;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  parent_id?: UUID | null;
  is_system: boolean;
  is_active: boolean;
  sort_order: number;
}

// ─── Transaction ────────────────────────────────────────────────────────────

export type TransactionType = "income" | "expense" | "transfer";

export type TransactionStatus = "pending" | "completed" | "cancelled" | "recurring";

export interface Transaction extends BaseRecord {
  user_id: UUID;
  family_group_id?: UUID | null;
  account_id: UUID;
  category_id?: UUID | null;
  type: TransactionType;
  amount: number;
  currency: Currency;
  description?: string | null;
  notes?: string | null;
  date: ISODate;
  status: TransactionStatus;
  is_recurring: boolean;
  recurring_rule?: RecurringRule | null;
  transfer_account_id?: UUID | null;
  tags?: string[] | null;
  receipt_url?: string | null;
  location?: string | null;
  created_by: UUID;
}

export interface RecurringRule {
  frequency: "daily" | "weekly" | "biweekly" | "monthly" | "yearly";
  interval: number;
  day_of_month?: number | null;
  day_of_week?: number | null;
  end_date?: ISODate | null;
  occurrences?: number | null;
}

// ─── Budget ─────────────────────────────────────────────────────────────────

export type BudgetPeriod = "weekly" | "monthly" | "yearly";

export interface Budget extends BaseRecord {
  user_id: UUID;
  family_group_id?: UUID | null;
  category_id?: UUID | null;
  name: string;
  amount: number;
  currency: Currency;
  spent: number;
  period: BudgetPeriod;
  start_date: ISODate;
  end_date?: ISODate | null;
  is_active: boolean;
  notifications_enabled: boolean;
  alert_threshold: number;
}

// ─── Goal ───────────────────────────────────────────────────────────────────

export type GoalStatus = "active" | "completed" | "paused" | "cancelled";

export interface Goal extends BaseRecord {
  user_id: UUID;
  family_group_id?: UUID | null;
  name: string;
  description?: string | null;
  target_amount: number;
  current_amount: number;
  currency: Currency;
  icon?: string | null;
  color?: string | null;
  target_date?: ISODate | null;
  status: GoalStatus;
  auto_save_enabled: boolean;
  auto_save_amount?: number | null;
  auto_save_frequency?: "daily" | "weekly" | "monthly" | null;
}

// ─── Fund (Savings Pots) ────────────────────────────────────────────────────

export interface Fund extends BaseRecord {
  user_id: UUID;
  family_group_id?: UUID | null;
  name: string;
  description?: string | null;
  target_amount?: number | null;
  current_amount: number;
  currency: Currency;
  icon?: string | null;
  color?: string | null;
  is_locked: boolean;
  lock_until?: ISODate | null;
}

// ─── Xitique (Traditional Savings Group) ────────────────────────────────────

export type XitiqueStatus = "active" | "completed" | "paused";

export interface XitiqueGroup extends BaseRecord {
  name: string;
  description?: string | null;
  family_group_id?: UUID | null;
  created_by: UUID;
  contribution_amount: number;
  currency: Currency;
  frequency: "weekly" | "biweekly" | "monthly";
  max_members: number;
  current_round: number;
  total_rounds: number;
  status: XitiqueStatus;
  next_payout_date?: ISODate | null;
  next_recipient_id?: UUID | null;
  rules?: string | null;
  members: XitiqueMember[];
}

export interface XitiqueMember {
  user_id: UUID;
  display_name: string;
  order: number;
  has_received: boolean;
  received_at?: ISODateTime | null;
  is_active: boolean;
}

// ─── Debt Record ────────────────────────────────────────────────────────────

export type DebtDirection = "owed_to_me" | "i_owe";

export type DebtStatus = "active" | "partially_paid" | "paid" | "forgiven" | "overdue";

export interface DebtRecord extends BaseRecord {
  user_id: UUID;
  family_group_id?: UUID | null;
  counterparty_name: string;
  counterparty_user_id?: UUID | null;
  direction: DebtDirection;
  original_amount: number;
  remaining_amount: number;
  currency: Currency;
  description?: string | null;
  due_date?: ISODate | null;
  status: DebtStatus;
  payments: DebtPayment[];
}

export interface DebtPayment {
  id: UUID;
  amount: number;
  date: ISODate;
  notes?: string | null;
}
