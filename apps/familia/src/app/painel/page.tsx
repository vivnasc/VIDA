"use client";

import { useState, useEffect } from "react";
import { getGreeting } from "@vida/utils";
import Link from "next/link";
import {
  Heart,
  Bell,
  Settings,
  Calendar,
  Pill,
  CheckSquare,
  Wallet,
  CalendarPlus,
  ListPlus,
  MessageSquare,
  AlertTriangle,
  Phone,
  Eye,
  BadgeDollarSign,
  ChevronRight,
  Quote,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

/* ─── Family Members ─── */

interface FamilyMember {
  id: string;
  name: string;
  initial: string;
  role: string;
  color: string;
  online: boolean;
}

const familyMembers: FamilyMember[] = [
  { id: "1", name: "Carlos", initial: "C", role: "Pai", color: "bg-blue-500", online: true },
  { id: "2", name: "Maria", initial: "M", role: "Mae", color: "bg-rose-500", online: true },
  { id: "3", name: "Tomas", initial: "T", role: "Filho", color: "bg-emerald-500", online: false },
  { id: "4", name: "Sofia", initial: "S", role: "Filha", color: "bg-purple-500", online: true },
  { id: "5", name: "Breno", initial: "B", role: "Filho", color: "bg-amber-500", online: false },
  { id: "6", name: "Avo Rosa", initial: "R", role: "Avo", color: "bg-pink-500", online: false },
];

/* ─── Today's Overview ─── */

interface TodayItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  detail: string;
}

const todayItems: TodayItem[] = [
  {
    id: "events",
    icon: Calendar,
    iconColor: "text-familia-500",
    iconBg: "bg-familia-50 dark:bg-familia-500/10",
    label: "Eventos hoje",
    value: "3",
    detail: "Jantar familiar 19h, Reuniao 14h, Yoga 8h",
  },
  {
    id: "meds",
    icon: Pill,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    label: "Medicamentos",
    value: "2",
    detail: "Vitamina D (Tomas), Anti-histaminico (Sofia)",
  },
  {
    id: "tasks",
    icon: CheckSquare,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    label: "Tarefas pendentes",
    value: "5",
    detail: "2 para hoje, 3 atrasadas",
  },
  {
    id: "budget",
    icon: Wallet,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    label: "Orcamento restante",
    value: "12,500 MZN",
    detail: "45% do orcamento mensal disponivel",
  },
];

/* ─── Quick Actions ─── */

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
}

const quickActions: QuickAction[] = [
  { label: "Novo Evento", icon: CalendarPlus, href: "/calendario?new=true", color: "text-familia-600", bgColor: "bg-familia-50 dark:bg-familia-500/10" },
  { label: "Nova Tarefa", icon: ListPlus, href: "/tarefas?new=true", color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-500/10" },
  { label: "Chat", icon: MessageSquare, href: "/chat", color: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-500/10" },
  { label: "Emergencia", icon: Phone, href: "tel:112", color: "text-rose-600", bgColor: "bg-rose-50 dark:bg-rose-500/10" },
  { label: "Ver Calendario", icon: Eye, href: "/calendario", color: "text-emerald-600", bgColor: "bg-emerald-50 dark:bg-emerald-500/10" },
  { label: "Ver Financas", icon: BadgeDollarSign, href: "#", color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-500/10" },
];

/* ─── Alerts ─── */

interface Alert {
  id: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  message: string;
  icon: React.ComponentType<{ className?: string }>;
}

const alerts: Alert[] = [
  {
    id: "a1",
    category: "Financeiro",
    categoryColor: "text-emerald-700 dark:text-emerald-400",
    categoryBg: "bg-emerald-100 dark:bg-emerald-500/20",
    message: "Orcamento alimentacao a 85%",
    icon: Wallet,
  },
  {
    id: "a2",
    category: "Saude",
    categoryColor: "text-rose-700 dark:text-rose-400",
    categoryBg: "bg-rose-100 dark:bg-rose-500/20",
    message: "Consulta Tomas amanha 10:00",
    icon: Pill,
  },
  {
    id: "a3",
    category: "Casa",
    categoryColor: "text-blue-700 dark:text-blue-400",
    categoryBg: "bg-blue-100 dark:bg-blue-500/20",
    message: "Stock arroz baixo",
    icon: AlertTriangle,
  },
  {
    id: "a4",
    category: "Familia",
    categoryColor: "text-familia-700 dark:text-familia-400",
    categoryBg: "bg-familia-100 dark:bg-familia-500/20",
    message: "Aniversario Maria em 3 dias",
    icon: Heart,
  },
];

/* ─── Weekly Chart Data ─── */

const weeklyData = [
  { day: "Seg", events: 2, tasks: 3 },
  { day: "Ter", events: 1, tasks: 5 },
  { day: "Qua", events: 3, tasks: 2 },
  { day: "Qui", events: 0, tasks: 4 },
  { day: "Sex", events: 2, tasks: 1 },
  { day: "Sab", events: 4, tasks: 2 },
  { day: "Dom", events: 1, tasks: 0 },
];

/* ─── Quote ─── */

const familyQuotes = [
  "A familia nao e uma coisa importante. E tudo.",
  "O amor de uma familia e o maior presente da vida.",
  "Juntos somos mais fortes, juntos somos familia.",
  "A felicidade so e real quando partilhada em familia.",
];

export default function HomePage() {
  const [greeting, setGreeting] = useState("Bom dia");
  const [currentQuote, setCurrentQuote] = useState(familyQuotes[0]);

  useEffect(() => {
    setGreeting(getGreeting());
    const randomQuote = familyQuotes[Math.floor(Math.random() * familyQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const maxWeeklyValue = Math.max(...weeklyData.map((d) => d.events + d.tasks));

  return (
    <div className="min-h-screen bg-background pb-24 dark:bg-background-dark">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur-lg dark:border-border-dark/50 dark:bg-surface-dark/80 pt-safe">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-orange">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-on-surface dark:text-on-surface-dark">
              VIDA
              <span className="text-familia-500">.FAMILIA</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark">
              <Bell className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-familia-500 ring-2 ring-white dark:ring-surface-dark" />
            </button>
            <Link
              href="/definicoes"
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark"
            >
              <Settings className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="mx-auto max-w-lg px-4 pt-6 space-y-6">
        {/* ─── Welcome Section ─── */}
        <section>
          <h1 className="text-2xl font-bold text-on-surface dark:text-on-surface-dark">
            {greeting}, Familia Silva!
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aqui esta o resumo da vossa familia para hoje
          </p>
        </section>

        {/* ─── Family Member Avatars (horizontal scroll) ─── */}
        <section>
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
            {familyMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-1 shrink-0">
                <div className="relative">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${member.color} text-white text-lg font-bold shadow-sm`}
                  >
                    {member.initial}
                  </div>
                  {member.online && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-background-dark" />
                  )}
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">{member.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Hoje (Today) Section ─── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Hoje
            </h2>
            <span className="text-xs font-medium text-familia-500">
              {new Date().toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {todayItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="card flex flex-col gap-3 transition-all hover:shadow-soft-lg"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}
                    >
                      <Icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <span className="text-2xl font-bold text-on-surface dark:text-on-surface-dark">
                      {item.value}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-on-surface dark:text-on-surface-dark">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Quick Actions Grid ─── */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Acoes rapidas
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-3 transition-all hover:shadow-soft active:scale-[0.97] dark:border-border-dark dark:bg-surface-dark"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.bgColor} transition-transform group-hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <span className="text-center text-[11px] font-medium leading-tight text-on-surface dark:text-on-surface-dark">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── Alertas Section ─── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Alertas
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <Bell className="h-3 w-3" />
              {alerts.length}
            </span>
          </div>
          <div className="space-y-2">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${alert.categoryBg}`}
                  >
                    <Icon className={`h-4 w-4 ${alert.categoryColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${alert.categoryBg} ${alert.categoryColor}`}
                    >
                      {alert.category}
                    </span>
                    <p className="mt-0.5 text-sm text-on-surface dark:text-on-surface-dark">
                      {alert.message}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Weekly Overview Mini-Chart ─── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Resumo semanal
            </h2>
            <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-familia-500" />
                Eventos
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Tarefas
              </span>
            </div>
          </div>
          <div className="card">
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyData.map((d) => {
                const totalHeight = maxWeeklyValue > 0 ? ((d.events + d.tasks) / maxWeeklyValue) * 100 : 0;
                const eventsHeight = maxWeeklyValue > 0 ? (d.events / maxWeeklyValue) * 100 : 0;
                return (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                    <div className="flex w-full flex-col items-center" style={{ height: "80px" }}>
                      <div className="flex w-6 flex-col-reverse rounded-t-md overflow-hidden" style={{ height: `${totalHeight}%`, minHeight: totalHeight > 0 ? "4px" : "0" }}>
                        <div
                          className="w-full bg-familia-500 rounded-b-sm"
                          style={{ height: `${maxWeeklyValue > 0 ? (d.events / (d.events + d.tasks || 1)) * 100 : 0}%`, minHeight: d.events > 0 ? "2px" : "0" }}
                        />
                        <div
                          className="w-full bg-blue-500 rounded-t-sm"
                          style={{ height: `${maxWeeklyValue > 0 ? (d.tasks / (d.events + d.tasks || 1)) * 100 : 0}%`, minHeight: d.tasks > 0 ? "2px" : "0" }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground">{d.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 dark:border-border-dark/50">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span>Semana produtiva!</span>
              </div>
              <span className="text-xs font-semibold text-familia-500">
                {weeklyData.reduce((s, d) => s + d.tasks, 0)} tarefas esta semana
              </span>
            </div>
          </div>
        </section>

        {/* ─── Motivational Family Quote ─── */}
        <section className="pb-4">
          <div className="card bg-gradient-to-br from-familia-50 to-amber-50 dark:from-familia-500/10 dark:to-amber-500/10 border-familia-200/50 dark:border-familia-500/20">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-familia-100 dark:bg-familia-500/20">
                <Quote className="h-5 w-5 text-familia-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium italic text-on-surface dark:text-on-surface-dark leading-relaxed">
                  &ldquo;{currentQuote}&rdquo;
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-familia-500" />
                  <span className="text-[11px] font-medium text-familia-600 dark:text-familia-400">
                    Frase do dia para a Familia Silva
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Bottom Navigation ─── */}
      <BottomNav />
    </div>
  );
}
