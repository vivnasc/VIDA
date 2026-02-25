"use client";

import { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Plus,
  ListPlus,
  CalendarDays,
  Wrench,
  AlertTriangle,
  Clock,
  ChevronRight,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/bottom-nav";

interface StatCard {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendDown?: boolean;
  color: string;
  bgColor: string;
}

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
}

interface Alert {
  id: string;
  type: "expiry" | "low-stock";
  title: string;
  description: string;
  urgency: "high" | "medium" | "low";
}

interface RoutineTask {
  id: string;
  title: string;
  time: string;
  done: boolean;
  zone: string;
}

const stats: StatCard[] = [
  {
    label: "Itens no inventário",
    value: "142",
    icon: <Package className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "A expirar em breve",
    value: "7",
    icon: <AlertTriangle className="w-5 h-5" />,
    trend: "+3 esta semana",
    trendDown: true,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    label: "Lista de compras",
    value: "23",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    label: "Tarefas domésticas",
    value: "5",
    icon: <Wrench className="w-5 h-5" />,
    trend: "2 atrasadas",
    trendDown: true,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const quickActions: QuickAction[] = [
  {
    label: "Adicionar Item",
    icon: <Plus className="w-5 h-5" />,
    href: "/inventario",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Nova Lista",
    icon: <ListPlus className="w-5 h-5" />,
    href: "/compras",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    label: "Plano Refeições",
    icon: <CalendarDays className="w-5 h-5" />,
    href: "/refeicoes",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    label: "Manutenção",
    icon: <Wrench className="w-5 h-5" />,
    href: "/manutencao",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const initialAlerts: Alert[] = [
  {
    id: "1",
    type: "expiry",
    title: "Iogurtes naturais",
    description: "Expiram em 2 dias",
    urgency: "high",
  },
  {
    id: "2",
    type: "expiry",
    title: "Peito de frango",
    description: "Expira amanhã",
    urgency: "high",
  },
  {
    id: "3",
    type: "low-stock",
    title: "Leite meio-gordo",
    description: "Resta 1 unidade",
    urgency: "medium",
  },
  {
    id: "4",
    type: "expiry",
    title: "Pão de forma",
    description: "Expira em 3 dias",
    urgency: "medium",
  },
  {
    id: "5",
    type: "low-stock",
    title: "Ovos",
    description: "Restam 2 unidades",
    urgency: "low",
  },
];

const initialTasks: RoutineTask[] = [
  {
    id: "1",
    title: "Pôr a máquina de roupa",
    time: "08:00",
    done: false,
    zone: "Casa de Banho",
  },
  {
    id: "2",
    title: "Aspirar a sala",
    time: "10:00",
    done: false,
    zone: "Sala",
  },
  {
    id: "3",
    title: "Regar as plantas",
    time: "18:00",
    done: false,
    zone: "Exterior",
  },
  {
    id: "4",
    title: "Preparar jantar",
    time: "19:30",
    done: false,
    zone: "Cozinha",
  },
];

export default function DashboardPage() {
  const [alerts] = useState<Alert[]>(initialAlerts);
  const [tasks, setTasks] = useState<RoutineTask[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const urgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "low":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-bold text-white">VIDA.LAR</h1>
              <p className="text-blue-100 text-sm">Tua casa gerida por IA</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-3 space-y-6">
        {/* Stat Cards */}
        <section className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="app-card flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                  {stat.icon}
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
              {stat.trend && (
                <div className="flex items-center gap-1">
                  {stat.trendDown && (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className="text-2xs text-red-500">{stat.trend}</span>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Ações rápidas
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`${action.bgColor} ${action.color} w-12 h-12 rounded-xl flex items-center justify-center`}
                >
                  {action.icon}
                </div>
                <span className="text-xs text-gray-600 text-center leading-tight">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Alerts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Alertas
            </h2>
            <Link
              href="/inventario"
              className="text-xs text-blue-500 font-medium flex items-center gap-0.5"
            >
              Ver tudo <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${urgencyColor(alert.urgency)}`}
              >
                <div className="flex-shrink-0">
                  {alert.type === "expiry" ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{alert.title}</p>
                  <p className="text-xs opacity-80">{alert.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-50" />
              </div>
            ))}
          </div>
        </section>

        {/* Today's Routine */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Rotina de hoje
            </h2>
            <span className="text-xs text-gray-400">
              {tasks.filter((t) => t.done).length}/{tasks.length} concluídas
            </span>
          </div>
          <div className="app-card divide-y divide-gray-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    task.done
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {task.done && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      task.done ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xs text-gray-400">{task.time}</span>
                    <span className="text-2xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                      {task.zone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav active="inicio" />
    </div>
  );
}
