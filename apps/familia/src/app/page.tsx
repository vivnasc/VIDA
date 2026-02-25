"use client";

import { useState, useEffect } from "react";
import { getGreeting } from "@vida/utils";
import {
  Heart,
  Bell,
  Settings,
  Clock,
  MessageSquare,
  CheckCircle2,
  ImagePlus,
  ArrowRight,
} from "lucide-react";
import { FamilyDashboard } from "@/components/family-dashboard";
import { QuickActions } from "@/components/quick-actions";
import { BottomNav } from "@/components/bottom-nav";

/* ─── Activity Feed ─── */

interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  detail: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const recentActivity: ActivityItem[] = [
  {
    id: "1",
    user: "Mae",
    avatar: "M",
    action: "adicionou um evento",
    detail: "Jantar de aniversario do Avo",
    time: "Há 15 min",
    icon: Clock,
    iconColor: "text-familia-500",
  },
  {
    id: "2",
    user: "Pai",
    avatar: "P",
    action: "completou uma tarefa",
    detail: "Pagar conta de electricidade",
    time: "Há 1 hora",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
  {
    id: "3",
    user: "Ana",
    avatar: "A",
    action: "partilhou 3 fotos",
    detail: "Album: Fim de semana",
    time: "Há 2 horas",
    icon: ImagePlus,
    iconColor: "text-purple-500",
  },
  {
    id: "4",
    user: "Joao",
    avatar: "J",
    action: "comentou",
    detail: "Boa ideia para o passeio!",
    time: "Há 3 horas",
    icon: MessageSquare,
    iconColor: "text-blue-500",
  },
];

export default function HomePage() {
  const [greeting, setGreeting] = useState("Bom dia");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

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
            <button className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark">
              <Settings className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="mx-auto max-w-lg px-4 pt-6">
        {/* ─── Greeting ─── */}
        <section className="mb-6">
          <h1 className="text-2xl font-bold text-on-surface dark:text-on-surface-dark">
            {greeting}! 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aqui esta o resumo da tua familia
          </p>
        </section>

        {/* ─── Quick Actions ─── */}
        <div className="mb-6">
          <QuickActions />
        </div>

        {/* ─── Family Dashboard ─── */}
        <div className="mb-6">
          <FamilyDashboard />
        </div>

        {/* ─── Recent Activity ─── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Actividade recente
            </h2>
            <button className="flex items-center gap-1 text-xs font-medium text-familia-500 hover:text-familia-600">
              Ver tudo
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-2">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-xl border border-border bg-white p-3 transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark"
                >
                  {/* Avatar */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-familia-100 text-sm font-bold text-familia-600 dark:bg-familia-500/20 dark:text-familia-400">
                    {activity.avatar}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-on-surface dark:text-on-surface-dark">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {activity.detail}
                    </p>
                  </div>

                  {/* Time & Icon */}
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                    <span className="text-2xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ─── Bottom Navigation ─── */}
      <BottomNav />
    </div>
  );
}
