"use client";

import { useState } from "react";
import {
  Plus,
  Plane,
  Home,
  Car,
  Shield,
  Target,
  Calendar,
  TrendingUp,
  CheckCircle2,
  PartyPopper,
  Coins,
} from "lucide-react";

/* ─── Types ─── */

interface FamilyGoal {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  current: number;
  target: number;
  deadline: string;
  monthlyContribution: number;
  completed: boolean;
  coverColor: string;
}

/* ─── Mock Data ─── */

const goals: FamilyGoal[] = [
  {
    id: "g1",
    title: "Viagem a Portugal",
    icon: Plane,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-500/10",
    current: 45000,
    target: 120000,
    deadline: "Dezembro 2026",
    monthlyContribution: 5000,
    completed: false,
    coverColor: "from-blue-400 to-blue-600",
  },
  {
    id: "g2",
    title: "Casa Nova",
    icon: Home,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    current: 500000,
    target: 5000000,
    deadline: "2030",
    monthlyContribution: 25000,
    completed: false,
    coverColor: "from-emerald-400 to-emerald-600",
  },
  {
    id: "g3",
    title: "Carro Familiar",
    icon: Car,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    current: 200000,
    target: 800000,
    deadline: "Junho 2027",
    monthlyContribution: 15000,
    completed: false,
    coverColor: "from-amber-400 to-amber-600",
  },
  {
    id: "g4",
    title: "Fundo de Emergencia",
    icon: Shield,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 dark:bg-rose-500/10",
    current: 80000,
    target: 150000,
    deadline: "Marco 2026",
    monthlyContribution: 10000,
    completed: false,
    coverColor: "from-rose-400 to-rose-600",
  },
];

const completedGoals: FamilyGoal[] = [
  {
    id: "cg1",
    title: "Televisao Nova",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    current: 35000,
    target: 35000,
    deadline: "Concluido",
    monthlyContribution: 0,
    completed: true,
    coverColor: "from-emerald-400 to-emerald-600",
  },
  {
    id: "cg2",
    title: "Material Escolar 2025",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    current: 15000,
    target: 15000,
    deadline: "Concluido",
    monthlyContribution: 0,
    completed: true,
    coverColor: "from-purple-400 to-purple-600",
  },
];

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-MZ") + " MZN";
}

export default function MetasPage() {
  const [showCompleted, setShowCompleted] = useState(false);

  const totalSaved = goals.reduce((sum, g) => sum + g.current, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const totalMonthly = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);

  return (
    <div className="space-y-6">
      {/* ─── Summary Stats ─── */}
      <div className="card bg-gradient-to-br from-familia-500 to-familia-600 border-none text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Total poupado</p>
            <p className="text-xl font-bold">{formatCurrency(totalSaved)}</p>
          </div>
        </div>
        <div className="mb-2 flex items-center justify-between text-xs text-white/70">
          <span>Progresso global</span>
          <span>{((totalSaved / totalTarget) * 100).toFixed(1)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${(totalSaved / totalTarget) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-white/70">Meta total: {formatCurrency(totalTarget)}</span>
          <span className="flex items-center gap-1 text-white/90 font-medium">
            <Coins className="h-3 w-3" />
            {formatCurrency(totalMonthly)}/mes
          </span>
        </div>
      </div>

      {/* ─── Active Goals ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Metas activas
        </h3>
        <div className="space-y-3">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const percentage = (goal.current / goal.target) * 100;
            return (
              <div
                key={goal.id}
                className="card transition-all hover:shadow-soft-lg"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${goal.coverColor}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                        {goal.title}
                      </h4>
                      <span className="shrink-0 ml-2 rounded-full bg-familia-50 px-2 py-0.5 text-[11px] font-bold text-familia-600 dark:bg-familia-500/10 dark:text-familia-400">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-2.5 rounded-full bg-muted dark:bg-muted-dark">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${goal.coverColor} transition-all`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>

                    {/* Values */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-on-surface dark:text-on-surface-dark">
                        {formatCurrency(goal.current)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / {formatCurrency(goal.target)}
                      </span>
                    </div>

                    {/* Deadline and contribution */}
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {goal.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {formatCurrency(goal.monthlyContribution)}/mes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Monthly Contribution Suggestions ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Sugestoes mensais
        </h3>
        <div className="card border-dashed border-familia-300 dark:border-familia-500/30 bg-familia-50/50 dark:bg-familia-500/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-familia-100 dark:bg-familia-500/20">
              <Coins className="h-4 w-4 text-familia-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                Contribuicao mensal recomendada
              </p>
              <p className="text-xs text-muted-foreground">
                Baseado nas tuas metas e prazos
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{goal.title}</span>
                <span className="font-semibold text-on-surface dark:text-on-surface-dark">
                  {formatCurrency(goal.monthlyContribution)}
                </span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 dark:border-border-dark">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-on-surface dark:text-on-surface-dark">Total</span>
                <span className="font-bold text-familia-500">{formatCurrency(totalMonthly)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Completed Goals ─── */}
      <section>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="mb-3 flex w-full items-center justify-between"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Metas concluidas ({completedGoals.length})
          </h3>
          <PartyPopper className="h-4 w-4 text-amber-500" />
        </button>

        {showCompleted && (
          <div className="space-y-2">
            {completedGoals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                    {goal.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(goal.target)} - Concluido!</p>
                </div>
                <PartyPopper className="h-5 w-5 shrink-0 text-amber-500" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── FAB: Add Goal ─── */}
      <button className="fab" aria-label="Adicionar meta">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
