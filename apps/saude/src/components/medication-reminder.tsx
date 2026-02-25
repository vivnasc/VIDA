"use client";

import { useState } from "react";
import { Pill, Clock, Check, X, AlertCircle } from "lucide-react";

interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  time: string;
  member: string;
}

interface MedicationReminderProps {
  period: string;
  medications: MedicationItem[];
  onTake?: (id: string) => void;
  onSkip?: (id: string) => void;
}

export function MedicationReminder({
  period,
  medications,
  onTake,
  onSkip,
}: MedicationReminderProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, "taken" | "skipped">>({});

  const handleTake = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: "taken" }));
    onTake?.(id);
  };

  const handleSkip = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: "skipped" }));
    onSkip?.(id);
  };

  const completedCount = Object.keys(checkedItems).length;
  const isAllDone = completedCount === medications.length;

  // Determine if current period is active based on time
  const now = new Date();
  const hour = now.getHours();
  const isCurrentPeriod =
    (period === "Manhã" && hour >= 6 && hour < 12) ||
    (period === "Tarde" && hour >= 12 && hour < 18) ||
    (period === "Noite" && hour >= 18 && hour < 22) ||
    (period === "Antes de dormir" && (hour >= 22 || hour < 6));

  return (
    <div
      className={`card space-y-3 ${
        isCurrentPeriod ? "border-2 border-primary-200 bg-primary-50/30" : ""
      } ${isAllDone ? "opacity-60" : ""}`}
    >
      {/* Period Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">{period}</h3>
          {isCurrentPeriod && !isAllDone && (
            <span className="flex items-center gap-1 rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-medium text-primary-700">
              <AlertCircle className="h-3 w-3" />
              Agora
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400">
          {completedCount}/{medications.length}
        </span>
      </div>

      {/* Medication Items */}
      <div className="space-y-2">
        {medications.map((med) => {
          const state = checkedItems[med.id];
          const isTaken = state === "taken";
          const isSkipped = state === "skipped";
          const isDone = isTaken || isSkipped;

          return (
            <div
              key={med.id}
              className={`flex items-center gap-3 rounded-xl p-2 transition-all ${
                isDone ? "bg-gray-50" : "bg-white"
              }`}
            >
              {/* Status Icon */}
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  isTaken
                    ? "bg-emerald-100 text-emerald-600"
                    : isSkipped
                    ? "bg-gray-200 text-gray-400"
                    : "bg-primary-50 text-primary-500"
                }`}
              >
                {isTaken ? (
                  <Check className="h-4 w-4" />
                ) : isSkipped ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Pill className="h-4 w-4" />
                )}
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium ${
                    isDone ? "text-gray-400 line-through" : "text-gray-900"
                  }`}
                >
                  {med.name} - {med.dosage}
                </p>
                <p className="text-xs text-gray-500">
                  <Clock className="mr-0.5 inline h-3 w-3" />
                  {med.time} &middot; {med.member}
                </p>
              </div>

              {/* Actions */}
              {!isDone && (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleTake(med.id)}
                    className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 transition-colors hover:bg-emerald-100"
                    title="Tomar"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleSkip(med.id)}
                    className="rounded-lg bg-gray-50 p-1.5 text-gray-400 transition-colors hover:bg-gray-100"
                    title="Saltar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
