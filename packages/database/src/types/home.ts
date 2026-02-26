/**
 * Types for the VIDA Lar (Home) app.
 * Covers inventory, shopping lists, maintenance, employees, meals, routines, and zones.
 */

import type { BaseRecord, UUID, ISODateTime, ISODate, Currency } from "./common";

// ─── Zone (Room / Area) ─────────────────────────────────────────────────────

export interface Zone extends BaseRecord {
  family_group_id: UUID;
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  sort_order: number;
}

// ─── Inventory Item ─────────────────────────────────────────────────────────

export type InventoryCondition = "new" | "good" | "fair" | "poor" | "broken";

export interface InventoryItem extends BaseRecord {
  family_group_id: UUID;
  zone_id?: UUID | null;
  name: string;
  description?: string | null;
  category: string;
  quantity: number;
  unit?: string | null;
  purchase_date?: ISODate | null;
  purchase_price?: number | null;
  currency?: Currency | null;
  warranty_expiry?: ISODate | null;
  condition: InventoryCondition;
  photo_url?: string | null;
  barcode?: string | null;
  notes?: string | null;
  tags?: string[] | null;
}

// ─── Shopping List ──────────────────────────────────────────────────────────

export interface ShoppingList extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  name: string;
  description?: string | null;
  is_completed: boolean;
  completed_at?: ISODateTime | null;
  estimated_total?: number | null;
  actual_total?: number | null;
  currency: Currency;
  store?: string | null;
  scheduled_date?: ISODate | null;
}

export interface ShoppingListItem extends BaseRecord {
  shopping_list_id: UUID;
  name: string;
  quantity: number;
  unit?: string | null;
  category?: string | null;
  estimated_price?: number | null;
  actual_price?: number | null;
  is_checked: boolean;
  checked_by?: UUID | null;
  checked_at?: ISODateTime | null;
  notes?: string | null;
  sort_order: number;
}

// ─── Maintenance Task ───────────────────────────────────────────────────────

export type MaintenancePriority = "low" | "medium" | "high" | "urgent";

export type MaintenanceStatus = "pending" | "in_progress" | "completed" | "cancelled" | "overdue";

export interface MaintenanceTask extends BaseRecord {
  family_group_id: UUID;
  zone_id?: UUID | null;
  title: string;
  description?: string | null;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  assigned_to?: UUID | null;
  due_date?: ISODate | null;
  completed_at?: ISODateTime | null;
  completed_by?: UUID | null;
  estimated_cost?: number | null;
  actual_cost?: number | null;
  currency?: Currency | null;
  is_recurring: boolean;
  recurring_frequency?: "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly" | null;
  last_completed_at?: ISODateTime | null;
  photo_urls?: string[] | null;
  vendor?: string | null;
  vendor_phone?: string | null;
  notes?: string | null;
}

// ─── Domestic Employee ──────────────────────────────────────────────────────

export type EmploymentType = "full_time" | "part_time" | "contract" | "temporary";

export type EmployeeRole = "housekeeper" | "gardener" | "driver" | "nanny" | "cook" | "security" | "other";

export interface DomesticEmployee extends BaseRecord {
  family_group_id: UUID;
  full_name: string;
  role: EmployeeRole;
  employment_type: EmploymentType;
  phone?: string | null;
  email?: string | null;
  id_number?: string | null;
  photo_url?: string | null;
  start_date: ISODate;
  end_date?: ISODate | null;
  salary: number;
  salary_currency: Currency;
  payment_frequency: "weekly" | "biweekly" | "monthly";
  work_schedule?: WorkSchedule | null;
  emergency_contact?: EmergencyContact | null;
  notes?: string | null;
  is_active: boolean;
}

export interface WorkSchedule {
  monday?: { start: string; end: string } | null;
  tuesday?: { start: string; end: string } | null;
  wednesday?: { start: string; end: string } | null;
  thursday?: { start: string; end: string } | null;
  friday?: { start: string; end: string } | null;
  saturday?: { start: string; end: string } | null;
  sunday?: { start: string; end: string } | null;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// ─── Meal Plan ──────────────────────────────────────────────────────────────

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface MealPlan extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  date: ISODate;
  meal_type: MealType;
  name: string;
  description?: string | null;
  recipe_url?: string | null;
  servings?: number | null;
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
  ingredients?: MealIngredient[] | null;
  notes?: string | null;
  photo_url?: string | null;
}

export interface MealIngredient {
  name: string;
  quantity: number;
  unit: string;
  is_optional?: boolean;
}

// ─── Routine ────────────────────────────────────────────────────────────────

export type RoutineFrequency = "daily" | "weekdays" | "weekends" | "weekly" | "custom";

export interface Routine extends BaseRecord {
  family_group_id: UUID;
  created_by: UUID;
  title: string;
  description?: string | null;
  frequency: RoutineFrequency;
  custom_days?: number[] | null;
  time?: string | null;
  assigned_to?: UUID | null;
  zone_id?: UUID | null;
  is_active: boolean;
  icon?: string | null;
  color?: string | null;
  streak_count: number;
  last_completed_at?: ISODateTime | null;
}
