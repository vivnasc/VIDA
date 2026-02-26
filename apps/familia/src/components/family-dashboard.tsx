"use client";

import {
  Calendar,
  CheckSquare,
  Camera,
  Users,
  Heart,
  Wallet,
  Home,
  Activity,
  Bell,
  TrendingUp,
} from "lucide-react";

/* ─── Stat Cards ─── */

interface StatCard {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  trend?: string;
}

const stats: StatCard[] = [
  {
    label: "Proximos eventos",
    value: "3",
    icon: Calendar,
    color: "text-familia-500",
    bgColor: "bg-familia-50 dark:bg-familia-500/10",
    trend: "Esta semana",
  },
  {
    label: "Tarefas pendentes",
    value: "7",
    icon: CheckSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    trend: "2 para hoje",
  },
  {
    label: "Fotos esta semana",
    value: "24",
    icon: Camera,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    trend: "+8 novas",
  },
  {
    label: "Membros activos",
    value: "5",
    icon: Users,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    trend: "Todos online",
  },
];

/* ─── Today's Overview Items ─── */

interface OverviewItem {
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const overviewItems: OverviewItem[] = [
  {
    label: "Eventos de hoje",
    detail: "Jantar familiar as 19h",
    icon: Heart,
    color: "text-familia-500",
    bgColor: "bg-familia-50 dark:bg-familia-500/10",
  },
  {
    label: "Financas",
    detail: "Orcamento mensal: 85% utilizado",
    icon: Wallet,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    label: "Casa",
    detail: "Limpeza geral agendada para sabado",
    icon: Home,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    label: "Saude",
    detail: "Consulta pediatrica amanha",
    icon: Activity,
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-500/10",
  },
];

export function FamilyDashboard() {
  return (
    <div className="space-y-6">
      {/* ─── Stat Cards Grid ─── */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Resumo
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="card flex flex-col gap-3 transition-all hover:shadow-soft-lg"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  {stat.trend && (
                    <span className="text-2xs font-medium text-muted-foreground">
                      {stat.trend}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-on-surface dark:text-on-surface-dark">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Today's Overview ─── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Visao geral de hoje
          </h2>
          <button className="flex items-center gap-1 text-xs font-medium text-familia-500 hover:text-familia-600">
            <Bell className="h-3.5 w-3.5" />
            <span>2 alertas</span>
          </button>
        </div>
        <div className="space-y-2">
          {overviewItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 transition-all hover:shadow-soft active:scale-[0.99] dark:border-border-dark dark:bg-surface-dark"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bgColor}`}
                >
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                    {item.label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <TrendingUp className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
