/**
 * Supabase query functions for maBIZ.
 * All queries target biz_schema tables.
 * All functions are typed using @vida/database types.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Business,
  BusinessTemplate,
  Product,
  Sale,
  PaymentMethod,
  CashRegister,
  BusinessCustomer,
  CustomerDebt,
  FiadoPayment,
  StaffMember,
  Supplier,
  BusinessExpense,
  BusinessLicense,
} from "@vida/database/types/business";

// ─── Helpers ───────────────────────────────────────────────────────

function biz(supabase: SupabaseClient) {
  return supabase.schema("biz_schema");
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0]!;
}

function monthRange(year: number, month: number) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end =
    month === 12
      ? `${year + 1}-01-01`
      : `${year}-${String(month + 1).padStart(2, "0")}-01`;
  return { start, end };
}

// ─── Business ──────────────────────────────────────────────────────

export async function getActiveBusiness(
  supabase: SupabaseClient,
): Promise<Business> {
  const { data, error } = await biz(supabase)
    .from("businesses")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();
  if (error) throw error;
  return data as Business;
}

export async function createBusiness(
  supabase: SupabaseClient,
  input: {
    name: string;
    template: BusinessTemplate;
    address?: string;
    phone?: string;
    currency?: string;
  },
): Promise<Business> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await biz(supabase)
    .from("businesses")
    .insert({ ...input, user_id: user.id })
    .select()
    .single();
  if (error) throw error;
  return data as Business;
}

// ─── Sales ─────────────────────────────────────────────────────────

export type SaleWithRelations = Sale & {
  customer: { name: string } | null;
  staff: { name: string } | null;
};

export async function getTodaySales(
  supabase: SupabaseClient,
  businessId: string,
): Promise<SaleWithRelations[]> {
  const { data, error } = await biz(supabase)
    .from("sales")
    .select("*, customer:customers(name), staff:staff_members(name)")
    .eq("business_id", businessId)
    .eq("date", todayISO())
    .neq("status", "cancelled")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as SaleWithRelations[];
}

export async function createSale(
  supabase: SupabaseClient,
  input: {
    business_id: string;
    customer_id?: string;
    staff_id?: string;
    total_amount: number;
    payment_method: PaymentMethod;
    discount?: number;
    notes?: string;
    date?: string;
  },
): Promise<Sale> {
  const { data, error } = await biz(supabase)
    .from("sales")
    .insert({ ...input, date: input.date ?? todayISO() })
    .select()
    .single();
  if (error) throw error;
  return data as Sale;
}

// ─── Expenses ──────────────────────────────────────────────────────

export async function getTodayExpenses(
  supabase: SupabaseClient,
  businessId: string,
): Promise<BusinessExpense[]> {
  const { data, error } = await biz(supabase)
    .from("business_expenses")
    .select("*")
    .eq("business_id", businessId)
    .eq("date", todayISO())
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BusinessExpense[];
}

export async function createExpense(
  supabase: SupabaseClient,
  input: {
    business_id: string;
    category: string;
    amount: number;
    description?: string;
    date?: string;
  },
): Promise<BusinessExpense> {
  const { data, error } = await biz(supabase)
    .from("business_expenses")
    .insert({ ...input, date: input.date ?? todayISO() })
    .select()
    .single();
  if (error) throw error;
  return data as BusinessExpense;
}

// ─── Cash Register ─────────────────────────────────────────────────

export async function getTodayCashRegister(
  supabase: SupabaseClient,
  businessId: string,
): Promise<CashRegister | null> {
  const { data, error } = await biz(supabase)
    .from("cash_registers")
    .select("*")
    .eq("business_id", businessId)
    .eq("date", todayISO())
    .maybeSingle();
  if (error) throw error;
  return data as CashRegister | null;
}

export async function openCashRegister(
  supabase: SupabaseClient,
  businessId: string,
  openingAmount: number,
): Promise<CashRegister> {
  const { data, error } = await biz(supabase)
    .from("cash_registers")
    .insert({ business_id: businessId, date: todayISO(), opening_amount: openingAmount })
    .select()
    .single();
  if (error) throw error;
  return data as CashRegister;
}

export async function closeCashRegister(
  supabase: SupabaseClient,
  registerId: string,
  actualClosing: number,
): Promise<CashRegister> {
  const { data, error } = await biz(supabase)
    .from("cash_registers")
    .update({ actual_closing: actualClosing, status: "closed", closed_at: new Date().toISOString() })
    .eq("id", registerId)
    .select()
    .single();
  if (error) throw error;
  return data as CashRegister;
}

// ─── Products / Stock ──────────────────────────────────────────────

export async function getProducts(
  supabase: SupabaseClient,
  businessId: string,
): Promise<Product[]> {
  const { data, error } = await biz(supabase)
    .from("products")
    .select("*")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("name");
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function createProduct(
  supabase: SupabaseClient,
  input: {
    business_id: string;
    name: string;
    category?: string;
    cost_price: number;
    sell_price: number;
    quantity?: number;
    unit?: string;
    min_stock?: number;
    is_service?: boolean;
    duration_minutes?: number;
  },
): Promise<Product> {
  const { data, error } = await biz(supabase)
    .from("products")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as Product;
}

export async function updateProductStock(
  supabase: SupabaseClient,
  productId: string,
  quantity: number,
): Promise<Product> {
  const { data, error } = await biz(supabase)
    .from("products")
    .update({ quantity })
    .eq("id", productId)
    .select()
    .single();
  if (error) throw error;
  return data as Product;
}

// ─── Customers ─────────────────────────────────────────────────────

export async function getCustomers(
  supabase: SupabaseClient,
  businessId: string,
): Promise<BusinessCustomer[]> {
  const { data, error } = await biz(supabase)
    .from("customers")
    .select("*")
    .eq("business_id", businessId)
    .order("name");
  if (error) throw error;
  return (data ?? []) as BusinessCustomer[];
}

export async function createCustomer(
  supabase: SupabaseClient,
  input: {
    business_id: string;
    name: string;
    phone?: string;
    email?: string;
    credit_limit?: number;
  },
): Promise<BusinessCustomer> {
  const { data, error } = await biz(supabase)
    .from("customers")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as BusinessCustomer;
}

// ─── Fiado (Customer Debts) ────────────────────────────────────────

export type DebtWithCustomer = CustomerDebt & {
  customer: { name: string; phone: string | null; business_id: string };
};

export async function getActiveDebts(
  supabase: SupabaseClient,
  businessId: string,
): Promise<DebtWithCustomer[]> {
  const { data, error } = await biz(supabase)
    .from("customer_debts")
    .select("*, customer:customers!inner(name, phone, business_id)")
    .neq("status", "paid")
    .eq("customer.business_id", businessId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DebtWithCustomer[];
}

export async function createDebt(
  supabase: SupabaseClient,
  input: {
    customer_id: string;
    sale_id?: string;
    amount: number;
    due_date?: string;
    notes?: string;
  },
): Promise<CustomerDebt> {
  const { data, error } = await biz(supabase)
    .from("customer_debts")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as CustomerDebt;
}

export async function recordFiadoPayment(
  supabase: SupabaseClient,
  input: {
    debt_id: string;
    amount: number;
    payment_method?: PaymentMethod;
    notes?: string;
  },
): Promise<FiadoPayment> {
  const { data, error } = await biz(supabase)
    .from("fiado_payments")
    .insert({
      ...input,
      payment_method: input.payment_method ?? "cash",
      date: todayISO(),
    })
    .select()
    .single();
  if (error) throw error;
  return data as FiadoPayment;
}

// ─── Staff ─────────────────────────────────────────────────────────

export async function getStaff(
  supabase: SupabaseClient,
  businessId: string,
): Promise<StaffMember[]> {
  const { data, error } = await biz(supabase)
    .from("staff_members")
    .select("*")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("name");
  if (error) throw error;
  return (data ?? []) as StaffMember[];
}

export async function createStaffMember(
  supabase: SupabaseClient,
  input: {
    business_id: string;
    name: string;
    phone?: string;
    role: string;
    salary_base?: number;
    commission_rate?: number;
  },
): Promise<StaffMember> {
  const { data, error } = await biz(supabase)
    .from("staff_members")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as StaffMember;
}

// ─── Suppliers ─────────────────────────────────────────────────────

export async function getSuppliers(
  supabase: SupabaseClient,
  businessId: string,
): Promise<Supplier[]> {
  const { data, error } = await biz(supabase)
    .from("suppliers")
    .select("*")
    .eq("business_id", businessId)
    .order("name");
  if (error) throw error;
  return (data ?? []) as Supplier[];
}

export async function createSupplier(
  supabase: SupabaseClient,
  input: {
    business_id: string;
    name: string;
    phone?: string;
    products_supplied?: string;
    payment_terms?: string;
  },
): Promise<Supplier> {
  const { data, error } = await biz(supabase)
    .from("suppliers")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as Supplier;
}

// ─── Licenses ──────────────────────────────────────────────────────

export async function getLicenses(
  supabase: SupabaseClient,
  businessId: string,
): Promise<BusinessLicense[]> {
  const { data, error } = await biz(supabase)
    .from("licenses")
    .select("*")
    .eq("business_id", businessId)
    .order("expiry_date");
  if (error) throw error;
  return (data ?? []) as BusinessLicense[];
}

// ─── Dashboard ─────────────────────────────────────────────────────

export interface DashboardData {
  today: {
    sales: number;
    expenses: number;
    profit: number;
    cash: number;
    mpesa: number;
    transfer: number;
    card: number;
    fiado: number;
    customerCount: number;
    recentSales: SaleWithRelations[];
  };
  month: {
    sales: number;
    expenses: number;
    profit: number;
  };
  fiado: {
    totalDebt: number;
    count: number;
  };
  stock: {
    lowStockItems: Product[];
  };
  staff: {
    total: number;
  };
}

export async function getDashboardData(
  supabase: SupabaseClient,
  businessId: string,
): Promise<DashboardData> {
  const today = todayISO();
  const now = new Date();
  const { start: startOfMonth, end: endOfMonth } = monthRange(
    now.getFullYear(),
    now.getMonth() + 1,
  );

  const [
    todaySalesResult,
    todayExpensesResult,
    monthSalesResult,
    monthExpensesResult,
    productsResult,
    debtCustomersResult,
    staffResult,
  ] = await Promise.all([
    biz(supabase)
      .from("sales")
      .select("*, customer:customers(name), staff:staff_members(name)")
      .eq("business_id", businessId)
      .eq("date", today)
      .neq("status", "cancelled"),
    biz(supabase)
      .from("business_expenses")
      .select("amount")
      .eq("business_id", businessId)
      .eq("date", today),
    biz(supabase)
      .from("sales")
      .select("total_amount")
      .eq("business_id", businessId)
      .neq("status", "cancelled")
      .gte("date", startOfMonth)
      .lt("date", endOfMonth),
    biz(supabase)
      .from("business_expenses")
      .select("amount")
      .eq("business_id", businessId)
      .gte("date", startOfMonth)
      .lt("date", endOfMonth),
    biz(supabase)
      .from("products")
      .select("*")
      .eq("business_id", businessId)
      .eq("is_active", true)
      .eq("is_service", false),
    biz(supabase)
      .from("customers")
      .select("current_debt")
      .eq("business_id", businessId)
      .gt("current_debt", 0),
    biz(supabase)
      .from("staff_members")
      .select("id")
      .eq("business_id", businessId)
      .eq("is_active", true),
  ]);

  const todaySales = (todaySalesResult.data ?? []) as SaleWithRelations[];
  const todayExpenses = (todayExpensesResult.data ?? []) as { amount: number }[];
  const monthSalesArr = (monthSalesResult.data ?? []) as { total_amount: number }[];
  const monthExpensesArr = (monthExpensesResult.data ?? []) as { amount: number }[];
  const debtCustomers = (debtCustomersResult.data ?? []) as { current_debt: number }[];
  const allProducts = (productsResult.data ?? []) as Product[];

  const sumField = <T>(items: T[], key: keyof T) =>
    items.reduce((acc, item) => acc + Number(item[key] ?? 0), 0);

  const sumByMethod = (sales: SaleWithRelations[], method: string) =>
    sales
      .filter((s) => s.payment_method === method)
      .reduce((acc, s) => acc + Number(s.total_amount), 0);

  const todayTotalSales = sumField(todaySales, "total_amount");
  const todayTotalExpenses = sumField(todayExpenses, "amount");
  const monthTotalSales = sumField(monthSalesArr, "total_amount");
  const monthTotalExpenses = sumField(monthExpensesArr, "amount");

  return {
    today: {
      sales: todayTotalSales,
      expenses: todayTotalExpenses,
      profit: todayTotalSales - todayTotalExpenses,
      cash: sumByMethod(todaySales, "cash"),
      mpesa: sumByMethod(todaySales, "mpesa"),
      transfer: sumByMethod(todaySales, "transfer"),
      card: sumByMethod(todaySales, "card"),
      fiado: sumByMethod(todaySales, "fiado"),
      customerCount: todaySales.length,
      recentSales: todaySales,
    },
    month: {
      sales: monthTotalSales,
      expenses: monthTotalExpenses,
      profit: monthTotalSales - monthTotalExpenses,
    },
    fiado: {
      totalDebt: sumField(debtCustomers, "current_debt"),
      count: debtCustomers.length,
    },
    stock: {
      lowStockItems: allProducts.filter((p) => p.quantity <= p.min_stock),
    },
    staff: {
      total: (staffResult.data ?? []).length,
    },
  };
}
