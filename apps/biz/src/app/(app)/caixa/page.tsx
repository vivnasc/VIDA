"use client";

import { useState } from "react";
import {
  Plus,
  Banknote,
  Smartphone,
  Landmark,
  CreditCard,
  BookOpen,
  Lock,
  Unlock,
  ArrowDownRight,
  Scissors,
  ShoppingBag,
  Zap,
  Coffee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SaleItem } from "@/components/sale-item";
import { AddSaleModal } from "@/components/add-sale-modal";

type FilterPayment = "all" | "cash" | "mpesa" | "transfer" | "card" | "fiado";

const MOCK_SALES = [
  { id: "1", description: "Tranças", customer: "Maria João", amount: 1500, paymentMethod: "mpesa", date: "2026-02-27", staff: "Fátima", icon: Scissors },
  { id: "2", description: "Unhas gel", customer: "Ana Silva", amount: 600, paymentMethod: "cash", date: "2026-02-27", staff: "Manicure", icon: Scissors },
  { id: "3", description: "Corte + escova", customer: "Sofia Manuel", amount: 800, paymentMethod: "cash", date: "2026-02-27", staff: "Cab. B", icon: Scissors },
  { id: "4", description: "Alisamento", customer: "Beatriz Costa", amount: 2500, paymentMethod: "transfer", date: "2026-02-27", staff: "Fátima", icon: Scissors },
  { id: "5", description: "Makeup", customer: "Carla Tembe", amount: 1200, paymentMethod: "cash", date: "2026-02-27", staff: "Dona", icon: Scissors },
];

const MOCK_EXPENSES = [
  { id: "e1", description: "Produtos usados", amount: 380, icon: ShoppingBag },
  { id: "e2", description: "Electricidade", amount: 200, icon: Zap },
  { id: "e3", description: "Lanche staff", amount: 150, icon: Coffee },
];

export default function CaixaPage() {
  const [filter, setFilter] = useState<FilterPayment>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [caixaOpen] = useState(true);
  const [currentDate] = useState("27 Fevereiro 2026");

  const openingAmount = 1000;
  const totalCash = 2600;
  const totalMpesa = 1500;
  const totalTransfer = 2500;
  const totalCard = 0;
  const totalFiado = 0;
  const totalSales = totalCash + totalMpesa + totalTransfer + totalCard + totalFiado;
  const totalExpenses = MOCK_EXPENSES.reduce((s, e) => s + e.amount, 0);
  const profit = totalSales - totalExpenses;

  const expectedClosing = openingAmount + totalCash;
  const actualClosing = 3580;
  const difference = actualClosing - expectedClosing;

  const filteredSales = filter === "all"
    ? MOCK_SALES
    : MOCK_SALES.filter((s) => s.paymentMethod === filter);

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
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

        {/* Date Selector */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold min-w-[160px] text-center">
            {currentDate}
          </span>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Payment Filter */}
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
        {/* Revenue Breakdown */}
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

        {/* Summary Cards */}
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

        {/* Expenses */}
        <section>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <ArrowDownRight className="w-4 h-4 text-red-500" />
            Despesas do Dia
          </h3>
          <div className="card divide-y divide-[var(--color-border)]">
            {MOCK_EXPENSES.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 p-3">
                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                  <exp.icon className="w-4 h-4 text-red-500" />
                </div>
                <span className="flex-1 text-sm">{exp.description}</span>
                <span className="text-sm font-semibold text-red-500">
                  -{exp.amount.toLocaleString("pt-MZ")} MZN
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Sales List */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Vendas ({filteredSales.length})</h3>
          <div className="card divide-y divide-[var(--color-border)]">
            {filteredSales.map((sale) => (
              <SaleItem
                key={sale.id}
                description={sale.description}
                customer={sale.customer}
                amount={sale.amount}
                paymentMethod={sale.paymentMethod}
                date={sale.date}
                staff={sale.staff}
                icon={sale.icon}
              />
            ))}
          </div>
        </section>

        {/* Close Caixa Summary */}
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
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Real em caixa</span>
              <span className="font-medium">{actualClosing.toLocaleString("pt-MZ")} MZN</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-semibold">Diferença</span>
              <span className={`font-bold ${difference >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                {difference >= 0 ? "+" : ""}{difference.toLocaleString("pt-MZ")} MZN
                {difference < 0 && " ⚠️"}
              </span>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 transition-colors">
            Fechar Caixa do Dia
          </button>
        </section>
      </main>

      {/* FAB */}
      <button onClick={() => setShowAddModal(true)} className="fab">
        <Plus className="w-6 h-6" />
      </button>

      {showAddModal && (
        <AddSaleModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
