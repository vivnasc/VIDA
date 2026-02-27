"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Banknote,
  Smartphone,
  Landmark,
  BookOpen,
  Lock,
  Unlock,
  ArrowDownRight,
  Scissors,
  ShoppingBag,
} from "lucide-react";
import { SaleItem } from "@/components/sale-item";
import { AddSaleModal } from "@/components/add-sale-modal";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import {
  getTodaySales,
  getTodayExpenses,
  getTodayCashRegister,
  type SaleWithRelations,
} from "@/lib/supabase";
import type { BusinessExpense, CashRegister } from "@vida/database/types/business";

type FilterPayment = "all" | "cash" | "mpesa" | "transfer" | "card" | "fiado";

export default function CaixaPage() {
  const { business } = useBusiness();
  const [filter, setFilter] = useState<FilterPayment>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: sales, loading: salesLoading, reload: reloadSales } = useQuery<SaleWithRelations[]>(
    (supabase) => getTodaySales(supabase, business!.id),
    [business?.id],
  );
  const { data: expenses } = useQuery<BusinessExpense[]>(
    (supabase) => getTodayExpenses(supabase, business!.id),
    [business?.id],
  );
  const { data: cashRegister } = useQuery<CashRegister | null>(
    (supabase) => getTodayCashRegister(supabase, business!.id),
    [business?.id],
  );

  const loading = salesLoading;

  const currentDate = useMemo(() =>
    new Date().toLocaleDateString("pt-MZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  []);

  const salesList = sales ?? [];
  const expensesList = expenses ?? [];

  const sumByMethod = (method: string) =>
    salesList
      .filter((s) => s.payment_method === method)
      .reduce((sum, s) => sum + Number(s.total_amount), 0);

  const totalCash = sumByMethod("cash");
  const totalMpesa = sumByMethod("mpesa");
  const totalTransfer = sumByMethod("transfer");
  const totalFiado = sumByMethod("fiado");
  const totalSales = salesList.reduce((sum, s) => sum + Number(s.total_amount), 0);
  const totalExpenses = expensesList.reduce((sum, e) => sum + Number(e.amount), 0);
  const profit = totalSales - totalExpenses;

  const openingAmount = Number(cashRegister?.opening_amount ?? 0);
  const caixaOpen = cashRegister?.status === "open" || !cashRegister;
  const expectedClosing = openingAmount + totalCash;

  const filteredSales = filter === "all"
    ? salesList
    : salesList.filter((s) => s.payment_method === filter);

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Caixa Diário</h1>
          <div className="flex items-center gap-2">
            {caixaOpen ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                <Unlock className="w-3 h-3" />
                Aberta
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                <Lock className="w-3 h-3" />
                Fechada
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-sm font-semibold min-w-[160px] text-center">
            {currentDate}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { key: "all" as FilterPayment, label: "Tudo" },
            { key: "cash" as FilterPayment, label: "Cash", icon: Banknote },
            { key: "mpesa" as FilterPayment, label: "M-Pesa", icon: Smartphone },
            { key: "transfer" as FilterPayment, label: "Transf.", icon: Landmark },
            { key: "fiado" as FilterPayment, label: "Fiado", icon: BookOpen },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                filter === key
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Banknote className="w-4 h-4 text-emerald-600" />
              <span className="text-xs text-[var(--color-text-muted)]">Cash</span>
            </div>
            <p className="text-sm font-bold text-emerald-600">
              {totalCash.toLocaleString("pt-MZ")} MZN
            </p>
          </div>
          <div className="card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-red-500" />
              <span className="text-xs text-[var(--color-text-muted)]">M-Pesa</span>
            </div>
            <p className="text-sm font-bold text-red-500">
              {totalMpesa.toLocaleString("pt-MZ")} MZN
            </p>
          </div>
          <div className="card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-[var(--color-text-muted)]">Transferência</span>
            </div>
            <p className="text-sm font-bold text-blue-600">
              {totalTransfer.toLocaleString("pt-MZ")} MZN
            </p>
          </div>
          <div className="card p-3">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-violet-600" />
              <span className="text-xs text-[var(--color-text-muted)]">Fiado</span>
            </div>
            <p className="text-sm font-bold text-violet-600">
              {totalFiado.toLocaleString("pt-MZ")} MZN
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Total Vendas</p>
            <p className="text-sm font-bold text-emerald-600">
              +{totalSales.toLocaleString("pt-MZ")}
            </p>
          </div>
          <div className="flex-1 card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Despesas</p>
            <p className="text-sm font-bold text-red-500">
              -{totalExpenses.toLocaleString("pt-MZ")}
            </p>
          </div>
          <div className="flex-1 card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Lucro</p>
            <p className={`text-sm font-bold ${profit >= 0 ? "text-primary-600" : "text-red-500"}`}>
              {profit.toLocaleString("pt-MZ")}
            </p>
          </div>
        </div>

        {expensesList.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              Despesas do Dia
            </h3>
            <div className="card divide-y divide-[var(--color-border)]">
              {expensesList.map((exp) => (
                <div key={exp.id} className="flex items-center gap-3 p-3">
                  <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="flex-1 text-sm">{exp.description || exp.category}</span>
                  <span className="text-sm font-semibold text-red-500">
                    -{Number(exp.amount).toLocaleString("pt-MZ")} MZN
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-sm font-semibold mb-2">Vendas ({filteredSales.length})</h3>
          {filteredSales.length > 0 ? (
            <div className="card divide-y divide-[var(--color-border)]">
              {filteredSales.map((sale) => (
                <SaleItem
                  key={sale.id}
                  description={sale.notes ?? "Venda"}
                  customer={sale.customer?.name ?? "Cliente"}
                  amount={Number(sale.total_amount)}
                  paymentMethod={sale.payment_method}
                  date={sale.date}
                  staff={sale.staff?.name ?? "—"}
                  icon={Scissors}
                />
              ))}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                {loading ? "A carregar..." : "Nenhuma venda registada hoje"}
              </p>
            </div>
          )}
        </section>

        <section className="card p-4 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
          <h3 className="text-sm font-bold mb-3">Fechar Caixa</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Dinheiro inicial</span>
              <span className="font-medium">{openingAmount.toLocaleString("pt-MZ")} MZN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Esperado em caixa</span>
              <span className="font-medium">{expectedClosing.toLocaleString("pt-MZ")} MZN</span>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 transition-colors">
            Fechar Caixa do Dia
          </button>
        </section>
      </main>

      <button onClick={() => setShowAddModal(true)} className="fab">
        <Plus className="w-6 h-6" />
      </button>

      {showAddModal && (
        <AddSaleModal onClose={() => { setShowAddModal(false); reloadSales(); }} />
      )}
    </div>
  );
}
