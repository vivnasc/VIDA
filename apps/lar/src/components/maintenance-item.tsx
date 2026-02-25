"use client";

import {
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  ChevronRight,
} from "lucide-react";

interface MaintenanceTaskData {
  id: string;
  title: string;
  zone: string;
  nextDue: string;
  priority: "high" | "medium" | "low";
  provider?: {
    name: string;
    phone: string;
  };
  overdue: boolean;
  description?: string;
}

interface MaintenanceItemProps {
  task: MaintenanceTaskData;
}

const priorityConfig = {
  high: {
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    label: "Alta",
  },
  medium: {
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    label: "Média",
  },
  low: {
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    label: "Baixa",
  },
};

const zoneColors: Record<string, string> = {
  Cozinha: "bg-blue-100 text-blue-700",
  Sala: "bg-purple-100 text-purple-700",
  Quarto: "bg-pink-100 text-pink-700",
  "Casa de Banho": "bg-cyan-100 text-cyan-700",
  Exterior: "bg-green-100 text-green-700",
  Garagem: "bg-gray-200 text-gray-700",
  Despensa: "bg-amber-100 text-amber-700",
};

export function MaintenanceItem({ task }: MaintenanceItemProps) {
  const priority = priorityConfig[task.priority];
  const zoneColor = zoneColors[task.zone] ?? "bg-gray-100 text-gray-600";

  const formattedDate = new Date(task.nextDue).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`app-card ${
        task.overdue ? "ring-1 ring-red-200 bg-red-50/50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Priority indicator */}
        <div className="flex flex-col items-center gap-1 pt-0.5">
          <span
            className={`w-3 h-3 ${priority.dot} rounded-full ${
              task.overdue ? "animate-pulse" : ""
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-gray-900">
              {task.title}
            </h3>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {/* Zone */}
            <span className={`app-badge ${zoneColor}`}>
              <MapPin className="w-2.5 h-2.5 mr-0.5" />
              {task.zone}
            </span>

            {/* Priority */}
            <span className={`app-badge ${priority.color}`}>
              {priority.label}
            </span>

            {/* Due date */}
            <span
              className={`app-badge ${
                task.overdue
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {task.overdue ? (
                <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
              ) : (
                <Calendar className="w-2.5 h-2.5 mr-0.5" />
              )}
              {task.overdue ? "Atrasada - " : ""}
              {formattedDate}
            </span>
          </div>

          {/* Provider */}
          {task.provider && (
            <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">
                  {task.provider.name}
                </span>
              </div>
              <a
                href={`tel:${task.provider.phone}`}
                className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700"
              >
                <Phone className="w-3 h-3" />
                Ligar
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
