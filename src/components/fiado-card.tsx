"use client";

import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface FiadoCardProps {
  customer: string;
  amount: number;
  limit: number;
  lastPayment?: string;
  dueDate?: string;
  status: "ok" | "attention" | "critical";
}

export function FiadoCard({
  customer,
  amount,
  limit,
  lastPayment,
  dueDate,
  status,
}: FiadoCardProps) {
  const percentage = (amount / limit) * 100;

  const statusConfig = {
    ok: {
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      barColor: "bg-emerald-500",
      label: "OK",
    },
    attention: {
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      barColor: "bg-amber-500",
      label: "Atenção",
    },
    critical: {
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      barColor: "bg-red-500",
      label: "Crítico",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="card p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center`}
          >
            <span className="text-xs font-bold">{customer[0]}</span>
          </div>
          <div>
            <p className="text-sm font-semibold">{customer}</p>
            {dueDate && (
              <p className="text-2xs text-[var(--color-text-muted)]">
                Vence: {dueDate}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className={`text-sm font-bold ${config.color}`}>
            {amount.toLocaleString("pt-MZ")} MZN
          </p>
          <div className="flex items-center gap-1 justify-end">
            <StatusIcon className={`w-3 h-3 ${config.color}`} />
            <span className={`text-2xs font-medium ${config.color}`}>
              {config.label}
            </span>
          </div>
        </div>
      </div>

      {/* Credit usage bar */}
      <div>
        <div className="flex items-center justify-between text-2xs text-[var(--color-text-muted)] mb-1">
          <span>Crédito usado</span>
          <span>{Math.round(percentage)}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${config.barColor} rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-2xs text-[var(--color-text-muted)] mt-0.5">
          <span>0</span>
          <span>Limite: {limit.toLocaleString("pt-MZ")}</span>
        </div>
      </div>

      {lastPayment && (
        <p className="text-2xs text-[var(--color-text-muted)]">
          Último pagamento: {lastPayment}
        </p>
      )}
    </div>
  );
}
