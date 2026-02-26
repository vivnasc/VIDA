"use client";

import {
  Pill,
  Clock,
  TrendingUp,
  Package,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

interface MedicationCardProps {
  name: string;
  dosage: string;
  frequency: string;
  member?: string;
  adherence?: number; // percentage 0-100
  stock?: number;
  totalStock?: number;
  nextDose?: string;
  onClick?: () => void;
}

export function MedicationCard({
  name,
  dosage,
  frequency,
  member,
  adherence,
  stock,
  totalStock,
  nextDose,
  onClick,
}: MedicationCardProps) {
  const stockPercent =
    stock !== undefined && totalStock ? (stock / totalStock) * 100 : null;
  const isLowStock = stockPercent !== null && stockPercent < 20;

  return (
    <div
      className="card space-y-3 transition-shadow hover:shadow-md"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
          <Pill className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900">{name}</p>
            <span className="text-xs text-gray-400">{dosage}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-0.5">
              <Clock className="h-3 w-3" />
              {frequency}
            </span>
            {member && (
              <>
                <span>&middot;</span>
                <span>{member}</span>
              </>
            )}
          </div>
        </div>
        {onClick && (
          <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-300" />
        )}
      </div>

      {/* Adherence Indicator */}
      {adherence !== undefined && (
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${
                  adherence >= 80
                    ? "bg-emerald-500"
                    : adherence >= 50
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${adherence}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-600">{adherence}%</span>
        </div>
      )}

      {/* Stock Level */}
      {stockPercent !== null && (
        <div className="flex items-center gap-2">
          <Package className="h-3.5 w-3.5 text-gray-400" />
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${
                  isLowStock ? "bg-red-500" : "bg-emerald-500"
                }`}
                style={{ width: `${stockPercent}%` }}
              />
            </div>
          </div>
          <span
            className={`text-xs font-medium ${
              isLowStock ? "text-red-600" : "text-gray-500"
            }`}
          >
            {stock} un.
          </span>
          {isLowStock && (
            <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
          )}
        </div>
      )}

      {/* Next Dose */}
      {nextDose && (
        <p className="text-xs text-gray-500">
          <span className="font-medium">Próxima toma:</span> {nextDose}
        </p>
      )}
    </div>
  );
}
