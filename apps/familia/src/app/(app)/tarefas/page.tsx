"use client";

import { useState } from "react";
import {
  Plus,
  Check,
  Clock,
  Star,
  Filter,
  ChevronRight,
} from "lucide-react";

/* ─── Types ─── */

type TaskFilter = "todas" | "pendentes" | "concluidas";

interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeInitial: string;
  dueDate: string;
  points: number;
  completed: boolean;
  priority: "alta" | "media" | "baixa";
}

/* ─── Mock Data ─── */

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Comprar legumes no mercado",
    assignee: "Mae",
    assigneeInitial: "M",
    dueDate: "Hoje",
    points: 10,
    completed: false,
    priority: "alta",
  },
  {
    id: "2",
    title: "Pagar conta de electricidade",
    assignee: "Pai",
    assigneeInitial: "P",
    dueDate: "Hoje",
    points: 15,
    completed: true,
    priority: "alta",
  },
  {
    id: "3",
    title: "Limpar o quintal",
    assignee: "Joao",
    assigneeInitial: "J",
    dueDate: "Amanha",
    points: 20,
    completed: false,
    priority: "media",
  },
  {
    id: "4",
    title: "Ajudar Ana com trabalho de casa",
    assignee: "Mae",
    assigneeInitial: "M",
    dueDate: "Amanha",
    points: 10,
    completed: false,
    priority: "media",
  },
  {
    id: "5",
    title: "Levar carro a oficina",
    assignee: "Pai",
    assigneeInitial: "P",
    dueDate: "Quinta",
    points: 25,
    completed: false,
    priority: "baixa",
  },
  {
    id: "6",
    title: "Preparar mochila escolar",
    assignee: "Ana",
    assigneeInitial: "A",
    dueDate: "Hoje",
    points: 5,
    completed: true,
    priority: "media",
  },
  {
    id: "7",
    title: "Organizar fotos do passeio",
    assignee: "Joao",
    assigneeInitial: "J",
    dueDate: "Sexta",
    points: 15,
    completed: false,
    priority: "baixa",
  },
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

export default function TarefasPage() {
  const [filter, setFilter] = useState<TaskFilter>("todas");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pendentes") return !task.completed;
    if (filter === "concluidas") return task.completed;
    return true;
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
      </div>

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
          filteredTasks.map((task) => (
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
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-familia-100 text-[10px] font-bold text-familia-600 dark:bg-familia-500/20 dark:text-familia-400">
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
                </div>
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
          ))
        )}
      </div>

      {/* ─── FAB: Add Task ─── */}
      <button className="fab" aria-label="Adicionar tarefa">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
