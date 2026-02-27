/**
 * Types for the BIZ.MZ (Business) app.
 * Covers businesses, products, sales, customers, debts, staff,
 * suppliers, appointments, licenses, equipment, and education.
 */

import type { BaseRecord, UUID, ISODateTime, ISODate, Currency } from "./common";

// ─── Business ──────────────────────────────────────────────────────────────

export type BusinessTemplate =
  | "salao"
  | "loja_roupa"
  | "bottle_store"
  | "banca"
  | "restaurante"
  | "taxista"
  | "mecanico"
  | "alfaiate"
  | "construcao"
  | "electronica"
  | "estetica"
  | "generico";

export interface Business extends BaseRecord {
  user_id: UUID;
  name: string;
  template: BusinessTemplate;
  address?: string | null;
  phone?: string | null;
  logo_url?: string | null;
  currency: Currency;
  tax_id?: string | null;
  is_active: boolean;
}

// ─── Product / Service ─────────────────────────────────────────────────────

export interface Product extends BaseRecord {
  business_id: UUID;
  name: string;
  sku?: string | null;
  category?: string | null;
  cost_price: number;
  sell_price: number;
  quantity: number;
  unit?: string | null;
  min_stock: number;
  max_stock?: number | null;
  supplier_id?: UUID | null;
  barcode?: string | null;
  expiry_date?: ISODate | null;
  location?: string | null;
  photo_url?: string | null;
  is_service: boolean;
  duration_minutes?: number | null;
  is_active: boolean;
}

export interface ProductVariant extends BaseRecord {
  product_id: UUID;
  variant_type: string;
  variant_value: string;
  quantity: number;
  sku?: string | null;
}

// ─── Sale ──────────────────────────────────────────────────────────────────

export type PaymentMethod = "cash" | "mpesa" | "emola" | "transfer" | "card" | "fiado";

export type SaleStatus = "completed" | "pending" | "cancelled";

export interface Sale extends BaseRecord {
  business_id: UUID;
  customer_id?: UUID | null;
  staff_id?: UUID | null;
  total_amount: number;
  payment_method: PaymentMethod;
  discount?: number | null;
  notes?: string | null;
  status: SaleStatus;
  date: ISODate;
}

export interface SaleItem extends BaseRecord {
  sale_id: UUID;
  product_id: UUID;
  quantity: number;
  unit_price: number;
  discount?: number | null;
  total: number;
}

// ─── Daily Cash Register ───────────────────────────────────────────────────

export type CashRegisterStatus = "open" | "closed";

export interface CashRegister extends BaseRecord {
  business_id: UUID;
  date: ISODate;
  opening_amount: number;
  expected_closing: number;
  actual_closing?: number | null;
  difference?: number | null;
  total_cash: number;
  total_mpesa: number;
  total_transfer: number;
  total_card: number;
  total_fiado: number;
  total_expenses: number;
  status: CashRegisterStatus;
  opened_at: ISODateTime;
  closed_at?: ISODateTime | null;
  notes?: string | null;
}

// ─── Business Customer ─────────────────────────────────────────────────────

export type CustomerCategory = "vip" | "fiel" | "regular" | "nova";

export interface BusinessCustomer extends BaseRecord {
  business_id: UUID;
  name: string;
  phone?: string | null;
  email?: string | null;
  category: CustomerCategory;
  total_spent: number;
  visit_count: number;
  last_visit?: ISODate | null;
  loyalty_points: number;
  credit_limit: number;
  current_debt: number;
  preferences?: string | null;
  notes?: string | null;
  date_of_birth?: ISODate | null;
}

// ─── Customer Debt (Fiado) ─────────────────────────────────────────────────

export type FiadoStatus = "active" | "partial" | "paid" | "overdue" | "critical";

export interface CustomerDebt extends BaseRecord {
  customer_id: UUID;
  sale_id?: UUID | null;
  amount: number;
  paid_amount: number;
  due_date?: ISODate | null;
  status: FiadoStatus;
  notes?: string | null;
}

export interface FiadoPayment extends BaseRecord {
  debt_id: UUID;
  amount: number;
  payment_method: PaymentMethod;
  date: ISODate;
  notes?: string | null;
}

// ─── Staff Member ──────────────────────────────────────────────────────────

export interface StaffMember extends BaseRecord {
  business_id: UUID;
  name: string;
  phone?: string | null;
  role: string;
  salary_base: number;
  commission_rate: number;
  work_schedule?: string | null;
  specialties?: string[] | null;
  start_date: ISODate;
  is_active: boolean;
}

export interface StaffCommission extends BaseRecord {
  staff_id: UUID;
  sale_id: UUID;
  amount: number;
  period: string;
  status: "pending" | "paid";
}

// ─── Supplier ──────────────────────────────────────────────────────────────

export interface Supplier extends BaseRecord {
  business_id: UUID;
  name: string;
  phone?: string | null;
  products_supplied?: string | null;
  payment_terms?: string | null;
  delivery_time?: string | null;
  moq?: string | null;
  rating: number;
  notes?: string | null;
  visit_day?: string | null;
  last_order_date?: ISODate | null;
}

export type PurchaseOrderStatus = "pending" | "ordered" | "received" | "cancelled";

export interface PurchaseOrder extends BaseRecord {
  business_id: UUID;
  supplier_id: UUID;
  items: string;
  total_cost: number;
  status: PurchaseOrderStatus;
  order_date: ISODate;
  expected_delivery?: ISODate | null;
  received_date?: ISODate | null;
}

// ─── Business Expense ──────────────────────────────────────────────────────

export interface BusinessExpense extends BaseRecord {
  business_id: UUID;
  category: string;
  amount: number;
  description?: string | null;
  date: ISODate;
  receipt_url?: string | null;
  is_recurring: boolean;
}

// ─── Appointment (Salão/Serviços) ──────────────────────────────────────────

export type AppointmentStatus = "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show";

export interface BusinessAppointment extends BaseRecord {
  business_id: UUID;
  customer_id?: UUID | null;
  staff_id?: UUID | null;
  service_id?: UUID | null;
  date: ISODate;
  time_start: string;
  time_end?: string | null;
  status: AppointmentStatus;
  notes?: string | null;
}

// ─── License & Compliance ──────────────────────────────────────────────────

export type LicenseStatus = "valid" | "expiring" | "expired" | "pending";

export interface BusinessLicense extends BaseRecord {
  business_id: UUID;
  name: string;
  issuer: string;
  cost: number;
  issue_date?: ISODate | null;
  expiry_date?: ISODate | null;
  document_url?: string | null;
  status: LicenseStatus;
}

// ─── Equipment ─────────────────────────────────────────────────────────────

export interface BusinessEquipment extends BaseRecord {
  business_id: UUID;
  name: string;
  type?: string | null;
  brand?: string | null;
  purchase_date?: ISODate | null;
  cost: number;
  maintenance_schedule?: string | null;
  last_maintenance?: ISODate | null;
  notes?: string | null;
}

// ─── Education ─────────────────────────────────────────────────────────────

export interface BusinessEducationModule extends BaseRecord {
  business_type: BusinessTemplate | "universal";
  module_name: string;
  level: "basico" | "vendas" | "crescimento" | "digital" | "mocambique";
  lessons: number;
}

export interface BusinessEducationProgress extends BaseRecord {
  user_id: UUID;
  module_id: UUID;
  lesson_id: string;
  completed: boolean;
  score?: number | null;
  xp_earned: number;
  completed_at?: ISODateTime | null;
}

// ─── Promotion ─────────────────────────────────────────────────────────────

export type PromotionType = "percentage" | "fixed" | "bogo" | "combo";

export interface BusinessPromotion extends BaseRecord {
  business_id: UUID;
  name: string;
  type: PromotionType;
  discount_value: number;
  start_date: ISODate;
  end_date?: ISODate | null;
  conditions?: string | null;
  is_active: boolean;
}
