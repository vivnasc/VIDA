"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Utensils,
  Car,
  Zap,
  Home,
  ShoppingCart,
  GraduationCap,
  Heart,
  Smartphone,
  Gamepad2,
  Shirt,
  AlertTriangle,
  RotateCcw,
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import { BudgetProgress } from "@/components/budget-progress";

interface BudgetCategory {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  icon: React.ComponentType<{ className?: string }>;
  hasRollover: boolean;
  rolloverAmount?: number;
}

const MOCK_BUDGETS: BudgetCategory[] = [
  { id: "1", category: "Alimentação", budgeted: 15000, spent: 11200, icon: Utensils, hasRollover: false },
  { id: "2", category: "Transporte", budgeted: 8000, spent: 6400, icon: Car, hasRollover: true, rolloverAmount: 1200 },
  { id: "3", category: "Contas & Serviços", budgeted: 10000, spent: 7800, icon: Zap, hasRollover: false },
  { id: "4", category: "Casa & Renda", budgeted: 20000, spent: 20000, icon: Home, hasRollover: false },
  { id: "5", category: "Educação", budgeted: 10000, spent: 8500, icon: GraduationCap, hasRollover: true, rolloverAmount: 500 },
  { id: "6", category: "Saúde", budgeted: 5000, spent: 950, icon: Heart, hasRollover: false },
  { id: "7", category: "Comunicação", budgeted: 3000, spent: 2400, icon: Smartphone, hasRollover: false },
  { id: "8", category: "Lazer", budgeted: 5000, spent: 6200, icon: Gamepad2, hasRollover: false },
  { id: "9", category: "Roupa", budgeted: 4000, spent: 1500, icon: Shirt, hasRollover: true, rolloverAmount: 2000 },
  { id: "10", category: "Compras", budgeted: 3000, spent: 800, icon: ShoppingCart, hasRollover: false },
];

export default function OrcamentoPage() {
  const [currentMonth] = useState("Fevereiro 2026");

  const totalBudgeted = MOCK_BUDGETS.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = MOCK_BUDGETS.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudgeted - totalSpent;
  const overallPercent = Math.min((totalSpent / totalBudgeted) * 100, 100);
  const overBudgetCategories = MOCK_BUDGETS.filter((b) => b.spent > b.budgeted);

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <h1 className="text-xl font-bold mb-4">Orçamento</h1>

        {/* Month Selector */}
        <div className="flex items-center justify-center gap-4">
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold min-w-[140px] text-center">
            {currentMonth}
          </span>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-6">
        {/* Overview Card */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">Visão Geral</h2>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                remaining >= 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {remaining >= 0 ? "No limite" : "Acima do orçamento"}
            </span>
          </div>

          {/* Circular-style visual */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={overallPercent > 90 ? "#EF4444" : overallPercent > 75 ? "#F59E0B" : "#10B981"}
                  strokeWidth="10"
                  strokeDasharray={`${overallPercent * 2.51} ${251 - overallPercent * 2.51}`}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">
                  {Math.round(overallPercent)}%
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Orçamentado</span>
                <span className="font-semibold">
                  {totalBudgeted.toLocaleString("pt-MZ")} MZN
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Gasto</span>
                <span className="font-semibold text-red-500">
                  {totalSpent.toLocaleString("pt-MZ")} MZN
                </span>
              </div>
              <hr className="border-[var(--color-border)]" />
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Restante</span>
                <span
                  className={`font-bold ${
                    remaining >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {remaining.toLocaleString("pt-MZ")} MZN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Over Budget Alert */}
        {overBudgetCategories.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">
                {overBudgetCategories.length} categoria{overBudgetCategories.length > 1 ? "s" : ""} acima do orçamento
              </p>
              <p className="text-xs text-red-600 mt-0.5">
                {overBudgetCategories.map((b) => b.category).join(", ")}
              </p>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-3 text-center">
            <TrendingDown className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Maior gasto</p>
            <p className="text-xs font-bold mt-0.5">Casa & Renda</p>
          </div>
          <div className="card p-3 text-center">
            <PiggyBank className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Mais poupado</p>
            <p className="text-xs font-bold mt-0.5">Saúde</p>
          </div>
          <div className="card p-3 text-center">
            <RotateCcw className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Rollover</p>
            <p className="text-xs font-bold mt-0.5">3.700 MZN</p>
          </div>
        </div>

        {/* Budget Category Cards */}
        <section>
          <h2 className="font-semibold mb-3">Categorias</h2>
          <div className="space-y-3">
            {MOCK_BUDGETS.map((budget) => (
              <BudgetProgress
                key={budget.id}
                category={budget.category}
                budgeted={budget.budgeted}
                spent={budget.spent}
                icon={budget.icon}
                hasRollover={budget.hasRollover}
                rolloverAmount={budget.rolloverAmount}
              />
            ))}
          </div>
        </section>
      </main>

      {/* FAB to add budget category */}
      <button className="fab">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
