"use client";

import { AlertTriangle, TrendingDown, Clock } from "lucide-react";

interface StockAlertProps {
  product: string;
  current: number;
  minimum: number;
  unit?: string;
  daysLeft?: number;
}

export function StockAlert({
  product,
  current,
  minimum,
  unit = "un",
  daysLeft,
}: StockAlertProps) {
  const ratio = current / minimum;
  const isLow = ratio <= 1;
  const isCritical = ratio <= 0.5;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border ${
        isCritical
          ? "bg-red-50 border-red-200"
          : isLow
            ? "bg-amber-50 border-amber-200"
            : "bg-gray-50 border-gray-200"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isCritical ? "bg-red-100" : "bg-amber-100"
        }`}
      >
        {isCritical ? (
          <AlertTriangle className="w-4.5 h-4.5 text-red-600" />
        ) : (
          <TrendingDown className="w-4.5 h-4.5 text-amber-600" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{product}</p>
        <p
          className={`text-xs ${isCritical ? "text-red-600" : "text-amber-600"}`}
        >
          {current} {unit} restante{current !== 1 ? "s" : ""} (mín: {minimum})
        </p>
      </div>

      {daysLeft !== undefined && (
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
          <Clock className="w-3 h-3" />
          <span>{daysLeft}d</span>
        </div>
      )}
    </div>
  );
}
