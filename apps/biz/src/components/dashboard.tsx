"use client";

import { useMemo, useState } from "react";
import {
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Banknote,
  Smartphone,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Package,
  Users,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  Activity,
  Star,
  ShoppingBag,
  Scissors,
  Clock,
  UserCheck,
  Bell,
  Wallet,
} from "lucide-react";
import { SaleItem } from "@/components/sale-item";
import { NotificationsPanel } from "@/components/notifications-panel";
import { AddExpenseModal } from "@/components/add-expense-modal";
import { StockAlert } from "@/components/stock-alert";
import { BottomNav } from "@/components/bottom-nav";
import { useBusiness, useDashboard } from "@/hooks/use-business";
import { ReferralCard } from "@/components/referral-card";
import { AdBanner } from "@/components/ad-banner";
import { PlanBadge, TransactionLimitBar } from "@/components/freemium-gate";

const DAILY_TIPS = [
  {
    tip: "Separa SEMPRE o dinheiro do negócio do dinheiro pessoal. É o erro #1 dos empreendedores.",
    category: "Gestão",
  },
  {
    tip: "Fiado sem controlo é dinheiro perdido. Regista tudo e define limites claros.",
    category: "Fiado",
  },
  {
    tip: "Conhece os teus custos fixos! Só assim sabes quanto precisas vender por dia.",
    category: "Finanças",
  },
];

export default function DashboardPage() {
  const { business, loading: bizLoading } = useBusiness();
  const { data: dashboard, loading: dashLoading } = useDashboard(business?.id);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("pt-MZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  // Use real data or defaults
  const todaySales = dashboard?.today.sales ?? 0;
  const todayExpenses = dashboard?.today.expenses ?? 0;
  const todayProfit = dashboard?.today.profit ?? 0;
  const todayCash = dashboard?.today.cash ?? 0;
  const todayMpesa = dashboard?.today.mpesa ?? 0;
  const todayTransfer = dashboard?.today.transfer ?? 0;
  const todayCustomers = dashboard?.today.customerCount ?? 0;

  const monthSales = dashboard?.month.sales ?? 0;
  const monthExpenses = dashboard?.month.expenses ?? 0;
  const monthProfit = dashboard?.month.profit ?? 0;

  const totalFiado = dashboard?.fiado.totalDebt ?? 0;
  const fiadoClients = dashboard?.fiado.count ?? 0;

  const totalStaff = dashboard?.staff.total ?? 0;
  const lowStockAlerts = dashboard?.stock.lowStockItems ?? [];

  const recentSales = dashboard?.today.recentSales ?? [];

  // Health score calculation
  const healthScore = useMemo(() => {
    if (!dashboard) return 0;
    let score = 50; // base
    if (monthSales > 0) score += 15;
    if (monthProfit > 0) score += 15;
    if (todaySales > 0) score += 10;
    if (lowStockAlerts.length === 0) score += 5;
    if (fiadoClients === 0) score += 5;
    return Math.min(score, 100);
  }, [dashboard, monthSales, monthProfit, todaySales, lowStockAlerts.length, fiadoClients]);

  const healthColor = healthScore >= 70 ? "text-emerald-600" : healthScore >= 40 ? "text-amber-600" : "text-red-500";
  const healthLabel = healthScore >= 70 ? "Saudável" : healthScore >= 40 ? "Atenção" : "Crítico";

  const dailyTip = DAILY_TIPS[new Date().getDay() % DAILY_TIPS.length]!;

  const loading = bizLoading || dashLoading;

  return (
    <div className="min-h-screen pb-4">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary-500 to-primary-700 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-100 text-sm">
              {business ? `Olá, ${business.name}` : "Olá, bem-vindo"}
            </p>
            <img
              src="/logos/mabiz-full.png"
              alt="maBIZ"
              className="h-7 w-auto brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-2">
            <PlanBadge />
            <button
              onClick={() => setShowNotifications(true)}
              className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-2xs flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Today's Revenue Card */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-primary-100 text-xs">Receita Hoje</p>
            <span className="text-2xs bg-white/20 px-2 py-0.5 rounded-full">
              {currentDate}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            {loading ? (
              <div className="h-9 w-32 bg-white/20 rounded-lg animate-pulse" />
            ) : (
              <>
                <p className="text-3xl font-bold">
                  {todaySales.toLocaleString("pt-MZ")}
                </p>
                <span className="text-primary-200 text-sm">MZN</span>
              </>
            )}
          </div>

          {/* Payment breakdown */}
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1">
              <Banknote className="w-3 h-3 text-emerald-300" />
              <span className="text-xs">{todayCash.toLocaleString("pt-MZ")}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1">
              <Smartphone className="w-3 h-3 text-red-300" />
              <span className="text-xs">{todayMpesa.toLocaleString("pt-MZ")}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1">
              <Landmark className="w-3 h-3 text-blue-300" />
              <span className="text-xs">{todayTransfer.toLocaleString("pt-MZ")}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-2 space-y-6">
        {/* Quick Stats Row */}
        <section>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            <div className="card flex-shrink-0 w-28 p-3 space-y-1">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xs text-[var(--color-text-muted)]">Lucro Hoje</p>
              <p className="text-sm font-bold text-emerald-600">
                {todayProfit.toLocaleString("pt-MZ")}
              </p>
            </div>

            <button
              onClick={() => setShowExpenseModal(true)}
              className="card flex-shrink-0 w-28 p-3 space-y-1 text-left"
            >
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              </div>
              <p className="text-2xs text-[var(--color-text-muted)]">Despesas</p>
              <p className="text-sm font-bold text-red-500">
                {todayExpenses.toLocaleString("pt-MZ")}
              </p>
            </button>

            <div className="card flex-shrink-0 w-28 p-3 space-y-1">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xs text-[var(--color-text-muted)]">Clientes</p>
              <p className="text-sm font-bold">{todayCustomers}</p>
            </div>

            <div className="card flex-shrink-0 w-28 p-3 space-y-1">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-violet-600" />
              </div>
              <p className="text-2xs text-[var(--color-text-muted)]">Fiado</p>
              <p className="text-sm font-bold text-violet-600">
                {totalFiado.toLocaleString("pt-MZ")}
              </p>
            </div>
          </div>
        </section>

        {/* Business Health Score */}
        {!loading && dashboard && (
          <section className="card p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none" stroke="#E5E7EB" strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke={healthScore >= 70 ? "#10B981" : healthScore >= 40 ? "#F59E0B" : "#EF4444"}
                    strokeWidth="8"
                    strokeDasharray={`${healthScore * 2.51} ${251 - healthScore * 2.51}`}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-sm font-bold ${healthColor}`}>
                    {healthScore}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-[var(--color-text-secondary)]" />
                  <h3 className="text-sm font-semibold">Saúde do Negócio</h3>
                </div>
                <p className={`text-xs font-bold ${healthColor}`}>{healthLabel}</p>
                <p className="text-2xs text-[var(--color-text-muted)] mt-0.5">
                  Baseado em vendas, despesas, stock e fiado
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Transaction Limit Bar (free plan only) */}
        <TransactionLimitBar />

        {/* Ad Banner (free plan only) */}
        <AdBanner placement="dashboard" />

        {/* Dica do Dia */}
        <section className="card p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-bold text-amber-800">Dica do Dia</p>
                <span className="text-2xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-md font-medium">
                  {dailyTip.category}
                </span>
              </div>
              <p className="text-sm text-amber-700 leading-relaxed">
                {dailyTip.tip}
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Summary */}
        {monthSales > 0 && (
          <section className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm">Resumo Mensal</h2>
              {monthProfit > 0 && (
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  Lucro
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs text-[var(--color-text-muted)]">Vendas</p>
                <p className="text-sm font-bold text-emerald-600">
                  {monthSales >= 1000 ? `${(monthSales / 1000).toFixed(0)}k` : monthSales.toLocaleString("pt-MZ")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[var(--color-text-muted)]">Despesas</p>
                <p className="text-sm font-bold text-red-500">
                  {monthExpenses >= 1000 ? `${(monthExpenses / 1000).toFixed(0)}k` : monthExpenses.toLocaleString("pt-MZ")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[var(--color-text-muted)]">Lucro</p>
                <p className="text-sm font-bold text-primary-600">
                  {monthProfit >= 1000 ? `${(monthProfit / 1000).toFixed(0)}k` : monthProfit.toLocaleString("pt-MZ")}
                </p>
              </div>
            </div>

            {/* Visual bar */}
            {monthSales > 0 && (
              <>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(0, Math.min(100, (monthProfit / monthSales) * 100))}%` }}
                  />
                </div>
                <p className="text-2xs text-[var(--color-text-muted)] text-center mt-1">
                  Margem: {Math.round((monthProfit / monthSales) * 100)}%
                </p>
              </>
            )}
          </section>
        )}

        {/* Stock Alerts */}
        {lowStockAlerts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h2 className="font-semibold text-sm">Alertas de Stock</h2>
              </div>
              <a
                href="/stock"
                className="flex items-center gap-1 text-xs text-primary-600 font-medium"
              >
                Ver tudo
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-2">
              {lowStockAlerts.map((alert) => (
                <StockAlert
                  key={alert.name}
                  product={alert.name}
                  current={Number(alert.quantity)}
                  minimum={Number(alert.min_stock)}
                  unit={alert.unit ?? "un"}
                />
              ))}
            </div>
          </section>
        )}

        {/* Fiado Summary */}
        {(totalFiado > 0 || fiadoClients > 0) && (
          <section className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-500" />
                <h2 className="font-semibold text-sm">Fiado</h2>
              </div>
              <a
                href="/fiado"
                className="flex items-center gap-1 text-xs text-primary-600 font-medium"
              >
                Ver tudo
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-violet-50 rounded-xl p-3 text-center">
                <p className="text-2xs text-violet-600">Total</p>
                <p className="text-sm font-bold text-violet-600">
                  {totalFiado.toLocaleString("pt-MZ")}
                </p>
                <p className="text-2xs text-violet-400">MZN</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-2xs text-blue-600">Clientes</p>
                <p className="text-sm font-bold text-blue-600">{fiadoClients}</p>
                <p className="text-2xs text-blue-400">activos</p>
              </div>
            </div>
          </section>
        )}

        {/* Staff */}
        {totalStaff > 0 && (
          <section className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-teal-500" />
                <h2 className="font-semibold text-sm">Staff</h2>
              </div>
              <a
                href="/staff"
                className="flex items-center gap-1 text-xs text-primary-600 font-medium"
              >
                Ver tudo
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)]">Equipa</span>
                  <span className="font-semibold">{totalStaff} membros</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recent Sales */}
        {recentSales.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Vendas de Hoje</h2>
              <a
                href="/caixa"
                className="text-xs text-primary-600 font-medium"
              >
                Ver caixa
              </a>
            </div>
            <div className="card divide-y divide-[var(--color-border)]">
              {recentSales.slice(0, 5).map((sale) => (
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
          </section>
        )}

        {/* Empty state when no data */}
        {!loading && !dashboard && (
          <section className="card p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="font-semibold mb-1">Começa a registar vendas</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Os dados do dashboard aparecem quando registares as tuas primeiras vendas.
            </p>
            <a
              href="/caixa"
              className="inline-flex items-center gap-2 btn-primary text-sm"
            >
              Ir para Caixa
              <ChevronRight className="w-4 h-4" />
            </a>
          </section>
        )}

        {/* Referral Card */}
        <ReferralCard businessName={business?.name} compact />

        {/* Trend indicator */}
        {monthProfit > 0 && (
          <section className="card p-4 bg-gradient-to-r from-primary-50 to-emerald-50 border-primary-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-primary-800">
                  Negócio em crescimento!
                </p>
                <p className="text-xs text-primary-600">
                  Lucro mensal de {monthProfit.toLocaleString("pt-MZ")} MZN
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <BottomNav />

      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}

      {showExpenseModal && (
        <AddExpenseModal onClose={() => setShowExpenseModal(false)} />
      )}
    </div>
  );
}
