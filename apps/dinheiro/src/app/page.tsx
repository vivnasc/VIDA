"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Smartphone,
  Landmark,
  Banknote,
  Home,
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  MoreHorizontal,
} from "lucide-react";
import { BalanceCard } from "@/components/balance-card";
import { TransactionItem } from "@/components/transaction-item";
import { BudgetProgress } from "@/components/budget-progress";
import { BottomNav } from "@/components/bottom-nav";

const MOCK_ACCOUNTS = [
  {
    id: "1",
    name: "M-Pesa",
    icon: Smartphone,
    balance: 12450.0,
    currency: "MZN",
    color: "bg-red-500",
  },
  {
    id: "2",
    name: "Banco",
    icon: Landmark,
    balance: 45800.0,
    currency: "MZN",
    color: "bg-blue-500",
  },
  {
    id: "3",
    name: "Dinheiro",
    icon: Banknote,
    balance: 3200.0,
    currency: "MZN",
    color: "bg-amber-500",
  },
];

const MOCK_TRANSACTIONS = [
  {
    id: "1",
    description: "Salário",
    category: "Rendimento",
    amount: 65000,
    type: "income" as const,
    date: "2026-02-25",
    account: "Banco",
    icon: Wallet,
  },
  {
    id: "2",
    description: "Shoprite",
    category: "Alimentação",
    amount: -4500,
    type: "expense" as const,
    date: "2026-02-24",
    account: "M-Pesa",
    icon: ShoppingCart,
  },
  {
    id: "3",
    description: "Restaurante Polana",
    category: "Alimentação",
    amount: -1800,
    type: "expense" as const,
    date: "2026-02-23",
    account: "M-Pesa",
    icon: Utensils,
  },
  {
    id: "4",
    description: "Combustível",
    category: "Transporte",
    amount: -3200,
    type: "expense" as const,
    date: "2026-02-22",
    account: "Banco",
    icon: Car,
  },
  {
    id: "5",
    description: "Electricidade EDM",
    category: "Contas",
    amount: -2100,
    type: "expense" as const,
    date: "2026-02-21",
    account: "M-Pesa",
    icon: Zap,
  },
];

const MOCK_BUDGETS = [
  {
    category: "Alimentação",
    budgeted: 15000,
    spent: 11200,
    icon: Utensils,
  },
  {
    category: "Transporte",
    budgeted: 8000,
    spent: 6400,
    icon: Car,
  },
  {
    category: "Contas",
    budgeted: 10000,
    spent: 7800,
    icon: Zap,
  },
  {
    category: "Casa",
    budgeted: 20000,
    spent: 20000,
    icon: Home,
  },
];

export default function DashboardPage() {
  const [currentMonth] = useState("Fevereiro 2026");

  const totalBalance = MOCK_ACCOUNTS.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = 65000;
  const totalExpenses = 11600;
  const incomePercent = (totalIncome / (totalIncome + totalExpenses)) * 100;

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary-500 to-primary-700 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-100 text-sm">Olá, bem-vindo</p>
            <h1 className="text-xl font-bold">VIDA.DINHEIRO</h1>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <BalanceCard
          totalBalance={totalBalance}
          currency="MZN"
          trend={+5.2}
          period={currentMonth}
        />
      </header>

      <main className="px-4 -mt-2 space-y-6">
        {/* Quick Account Cards */}
        <section>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            {MOCK_ACCOUNTS.map((account) => (
              <div
                key={account.id}
                className="card flex-shrink-0 w-36 p-3 space-y-2"
              >
                <div
                  className={`w-8 h-8 ${account.color} rounded-lg flex items-center justify-center`}
                >
                  <account.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {account.name}
                </p>
                <p className="text-sm font-bold">
                  {account.balance.toLocaleString("pt-MZ")} <span className="text-xs font-normal text-[var(--color-text-muted)]">{account.currency}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Income vs Expense Summary */}
        <section className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm">Resumo do Mês</h2>
            <span className="text-xs text-[var(--color-text-muted)]">
              {currentMonth}
            </span>
          </div>

          {/* Visual bar */}
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${incomePercent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Receitas
                </p>
                <p className="text-sm font-bold text-emerald-600">
                  +{totalIncome.toLocaleString("pt-MZ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Despesas
                </p>
                <p className="text-sm font-bold text-red-500">
                  -{totalExpenses.toLocaleString("pt-MZ")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Progress */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Orçamento</h2>
            <button className="text-xs text-primary-600 font-medium">
              Ver tudo
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_BUDGETS.map((budget) => (
              <BudgetProgress
                key={budget.category}
                category={budget.category}
                budgeted={budget.budgeted}
                spent={budget.spent}
                icon={budget.icon}
              />
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Transacções Recentes</h2>
            <button className="text-xs text-primary-600 font-medium">
              Ver todas
            </button>
          </div>
          <div className="card divide-y divide-[var(--color-border)]">
            {MOCK_TRANSACTIONS.map((tx) => (
              <TransactionItem
                key={tx.id}
                description={tx.description}
                category={tx.category}
                amount={tx.amount}
                type={tx.type}
                date={tx.date}
                account={tx.account}
                icon={tx.icon}
              />
            ))}
          </div>
        </section>

        {/* Trend indicator */}
        <section className="card p-4 bg-gradient-to-r from-primary-50 to-emerald-50 border-primary-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-800">
                Estás a poupar bem!
              </p>
              <p className="text-xs text-primary-600">
                Poupaste 82% mais que o mês passado
              </p>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
