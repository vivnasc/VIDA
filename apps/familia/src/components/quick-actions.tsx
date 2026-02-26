"use client";

import {
  CalendarPlus,
  ListPlus,
  ImagePlus,
  CalendarDays,
} from "lucide-react";

interface QuickAction {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
}

const quickActions: QuickAction[] = [
  {
    label: "Novo Evento",
    icon: CalendarPlus,
    href: "/calendario?new=true",
    color: "text-familia-600",
    bgColor: "bg-familia-50 dark:bg-familia-500/10",
  },
  {
    label: "Nova Tarefa",
    icon: ListPlus,
    href: "/tarefas?new=true",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    label: "Partilhar Foto",
    icon: ImagePlus,
    href: "/fotos?upload=true",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    label: "Ver Calendario",
    icon: CalendarDays,
    href: "/calendario",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
  },
];

export function QuickActions() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Acoes rapidas
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <a
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
            </a>
          );
        })}
      </div>
    </section>
  );
}
