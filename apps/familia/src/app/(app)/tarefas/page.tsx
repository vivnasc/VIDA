"use client";

import { useState } from "react";
import {
  Plus,
  Check,
  Clock,
  Star,
  Filter,
  ChevronRight,
  Home,
  GraduationCap,
  User,
  Users,
  Trophy,
  Repeat,
  Flame,
  Medal,
  ChevronDown,
} from "lucide-react";

/* ─── Types ─── */

type TaskFilter = "todas" | "pendentes" | "concluidas";
type TaskCategory = "casa" | "escola" | "pessoal" | "familia";

interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeInitial: string;
  assigneeColor: string;
  dueDate: string;
  points: number;
  completed: boolean;
  priority: "alta" | "media" | "baixa";
  category: TaskCategory;
  rating?: number;
  recurring?: boolean;
}

interface LeaderboardEntry {
  name: string;
  initial: string;
  color: string;
  points: number;
  tasksCompleted: number;
}

/* ─── Mock Data ─── */

const categoryConfig: Record<TaskCategory, { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  casa: { label: "Casa", icon: Home, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  escola: { label: "Escola", icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
  pessoal: { label: "Pessoal", icon: User, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  familia: { label: "Familia", icon: Users, color: "text-familia-500", bg: "bg-familia-50 dark:bg-familia-500/10" },
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Comprar legumes no mercado",
    assignee: "Maria",
    assigneeInitial: "M",
    assigneeColor: "bg-rose-500",
    dueDate: "Hoje",
    points: 10,
    completed: false,
    priority: "alta",
    category: "casa",
  },
  {
    id: "2",
    title: "Pagar conta de electricidade",
    assignee: "Carlos",
    assigneeInitial: "C",
    assigneeColor: "bg-blue-500",
    dueDate: "Hoje",
    points: 15,
    completed: true,
    priority: "alta",
    category: "familia",
    rating: 5,
  },
  {
    id: "3",
    title: "Limpar o quintal",
    assignee: "Tomas",
    assigneeInitial: "T",
    assigneeColor: "bg-emerald-500",
    dueDate: "Amanha",
    points: 20,
    completed: false,
    priority: "media",
    category: "casa",
  },
  {
    id: "4",
    title: "Trabalho de casa de matematica",
    assignee: "Sofia",
    assigneeInitial: "S",
    assigneeColor: "bg-purple-500",
    dueDate: "Amanha",
    points: 15,
    completed: false,
    priority: "media",
    category: "escola",
  },
  {
    id: "5",
    title: "Levar carro a oficina",
    assignee: "Carlos",
    assigneeInitial: "C",
    assigneeColor: "bg-blue-500",
    dueDate: "Quinta",
    points: 25,
    completed: false,
    priority: "baixa",
    category: "pessoal",
  },
  {
    id: "6",
    title: "Preparar mochila escolar",
    assignee: "Sofia",
    assigneeInitial: "S",
    assigneeColor: "bg-purple-500",
    dueDate: "Hoje",
    points: 5,
    completed: true,
    priority: "media",
    category: "escola",
    rating: 4,
  },
  {
    id: "7",
    title: "Organizar fotos do passeio",
    assignee: "Maria",
    assigneeInitial: "M",
    assigneeColor: "bg-rose-500",
    dueDate: "Sexta",
    points: 15,
    completed: false,
    priority: "baixa",
    category: "familia",
  },
];

const recurringTasks = [
  { id: "r1", title: "Arrumar o quarto", frequency: "Diario", assignee: "Tomas", assigneeInitial: "T", assigneeColor: "bg-emerald-500", points: 5, category: "casa" as TaskCategory },
  { id: "r2", title: "Lavar a louca", frequency: "Diario", assignee: "Sofia", assigneeInitial: "S", assigneeColor: "bg-purple-500", points: 5, category: "casa" as TaskCategory },
  { id: "r3", title: "Regar as plantas", frequency: "2x por semana", assignee: "Breno", assigneeInitial: "B", assigneeColor: "bg-amber-500", points: 10, category: "casa" as TaskCategory },
  { id: "r4", title: "Verificar contas", frequency: "Semanal", assignee: "Carlos", assigneeInitial: "C", assigneeColor: "bg-blue-500", points: 15, category: "familia" as TaskCategory },
];

const leaderboard: LeaderboardEntry[] = [
  { name: "Sofia", initial: "S", color: "bg-purple-500", points: 185, tasksCompleted: 24 },
  { name: "Carlos", initial: "C", color: "bg-blue-500", points: 160, tasksCompleted: 18 },
  { name: "Maria", initial: "M", color: "bg-rose-500", points: 145, tasksCompleted: 20 },
  { name: "Tomas", initial: "T", color: "bg-emerald-500", points: 95, tasksCompleted: 15 },
  { name: "Breno", initial: "B", color: "bg-amber-500", points: 45, tasksCompleted: 8 },
];

const filterLabels: Record<TaskFilter, string> = {
  todas: "Todas",
  pendentes: "Pendentes",
  concluidas: "Concluidas",
};

const priorityColors: Record<string, string> = {
  alta: "border-l-rose-500",
  media: "border-l-amber-500",
  baixa: "border-l-blue-500",
};

const medals = ["text-amber-400", "text-zinc-400", "text-amber-600"];

export default function TarefasPage() {
  const [filter, setFilter] = useState<TaskFilter>("todas");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | "todas">("todas");
  const [showRecurring, setShowRecurring] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filter === "todas" ? true : filter === "pendentes" ? !task.completed : task.completed;
    const categoryMatch = selectedCategory === "todas" || task.category === selectedCategory;
    return statusMatch && categoryMatch;
  });

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalPoints = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.points, 0);

  return (
    <div className="space-y-6">
      {/* ─── Stats bar ─── */}
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-xl bg-familia-50 p-3 dark:bg-familia-500/10">
          <p className="text-xs text-muted-foreground">Concluidas</p>
          <p className="text-lg font-bold text-familia-600 dark:text-familia-400">
            {completedCount}/{tasks.length}
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
          <p className="text-xs text-muted-foreground">Pontos ganhos</p>
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {totalPoints} pts
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Flame className="h-4 w-4" />5
          </p>
        </div>
      </div>

      {/* ─── Gamification Leaderboard ─── */}
      <section>
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="mb-3 flex w-full items-center justify-between"
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Trophy className="h-4 w-4 text-amber-500" />
            Ranking Familiar
          </h2>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showLeaderboard ? "rotate-180" : ""}`} />
        </button>

        {showLeaderboard && (
          <div className="card">
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.name}
                  className={`flex items-center gap-3 rounded-xl p-2 ${
                    index === 0 ? "bg-amber-50 dark:bg-amber-500/10" : ""
                  }`}
                >
                  {/* Position */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                    {index < 3 ? (
                      <Medal className={`h-5 w-5 ${medals[index]}`} />
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${entry.color} text-xs font-bold text-white`}
                  >
                    {entry.initial}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                      {entry.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{entry.tasksCompleted} tarefas</p>
                  </div>

                  {/* Points */}
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 dark:bg-amber-500/10">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {entry.points}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ─── Filter Tabs ─── */}
      <div className="flex items-center gap-2">
        {(Object.keys(filterLabels) as TaskFilter[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === key
                ? "bg-familia-500 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:bg-muted-dark dark:hover:bg-muted-dark/80"
            }`}
          >
            {filterLabels[key]}
          </button>
        ))}
        <div className="flex-1" />
        <button className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark">
          <Filter className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* ─── Category Filter ─── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => setSelectedCategory("todas")}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            selectedCategory === "todas"
              ? "bg-familia-500 text-white shadow-sm"
              : "bg-muted text-muted-foreground dark:bg-muted-dark"
          }`}
        >
          Todas
        </button>
        {(Object.entries(categoryConfig) as [TaskCategory, typeof categoryConfig[TaskCategory]][]).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === key
                  ? "bg-familia-500 text-white shadow-sm"
                  : "bg-muted text-muted-foreground dark:bg-muted-dark"
              }`}
            >
              <Icon className="h-3 w-3" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* ─── Task List ─── */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Check className="mb-3 h-12 w-12 text-muted-foreground/30" />
            <p className="text-sm font-medium text-muted-foreground">
              {filter === "concluidas"
                ? "Nenhuma tarefa concluida ainda"
                : "Todas as tarefas estao concluidas!"}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const catConfig = categoryConfig[task.category];
            const CatIcon = catConfig.icon;
            return (
              <div
                key={task.id}
                className={`flex items-center gap-3 rounded-xl border border-l-4 border-border bg-white p-3 transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark ${
                  priorityColors[task.priority]
                } ${task.completed ? "opacity-60" : ""}`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                    task.completed
                      ? "border-familia-500 bg-familia-500 text-white"
                      : "border-muted-foreground/30 hover:border-familia-500"
                  }`}
                >
                  {task.completed && <Check className="h-3.5 w-3.5" />}
                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      task.completed
                        ? "text-muted-foreground line-through"
                        : "text-on-surface dark:text-on-surface-dark"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    {/* Assignee avatar */}
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${task.assigneeColor} text-[10px] font-bold text-white`}>
                      {task.assigneeInitial}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {task.assignee}
                    </span>
                    <span className="text-muted-foreground/30">|</span>
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {task.dueDate}
                    </span>
                    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${catConfig.bg} ${catConfig.color}`}>
                      <CatIcon className="h-2.5 w-2.5" />
                      {catConfig.label}
                    </span>
                  </div>

                  {/* Star Rating for completed tasks */}
                  {task.completed && task.rating && (
                    <div className="mt-1.5 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < task.rating!
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/20"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Points badge */}
                <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 dark:bg-amber-500/10">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {task.points}
                  </span>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
              </div>
            );
          })
        )}
      </div>

      {/* ─── Recurring Tasks Section ─── */}
      <section>
        <button
          onClick={() => setShowRecurring(!showRecurring)}
          className="mb-3 flex w-full items-center justify-between"
        >
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <Repeat className="h-4 w-4 text-blue-500" />
            Tarefas recorrentes
          </h2>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showRecurring ? "rotate-180" : ""}`} />
        </button>

        {showRecurring && (
          <div className="space-y-2">
            {recurringTasks.map((task) => {
              const catConfig = categoryConfig[task.category];
              const CatIcon = catConfig.icon;
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-3 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 p-3 dark:border-blue-500/30 dark:bg-blue-500/5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                    <Repeat className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">
                      {task.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full ${task.assigneeColor} text-[10px] font-bold text-white`}>
                        {task.assigneeInitial}
                      </div>
                      <span className="text-xs text-muted-foreground">{task.frequency}</span>
                      <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${catConfig.bg} ${catConfig.color}`}>
                        <CatIcon className="h-2.5 w-2.5" />
                        {catConfig.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 dark:bg-amber-500/10">
                    <Star className="h-3 w-3 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{task.points}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── FAB: Add Task ─── */}
      <button className="fab" aria-label="Adicionar tarefa">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
