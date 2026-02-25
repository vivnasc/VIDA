"use client";

import { Coffee, Sun, Moon, Plus } from "lucide-react";

interface Meal {
  type: "breakfast" | "lunch" | "dinner";
  label: string;
  description?: string;
}

interface MealDayCardProps {
  dayName: string;
  date: string;
  meals: Meal[];
}

const mealIcons = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
};

const mealLabels = {
  breakfast: "Café da manhã",
  lunch: "Almoço",
  dinner: "Jantar",
};

const mealColors = {
  breakfast: { bg: "bg-amber-100", text: "text-amber-600", icon: "text-amber-500" },
  lunch: { bg: "bg-orange-100", text: "text-orange-600", icon: "text-orange-500" },
  dinner: { bg: "bg-indigo-100", text: "text-indigo-600", icon: "text-indigo-500" },
};

export function MealDayCard({ dayName, date, meals }: MealDayCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
  });

  return (
    <div className="app-card">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-900">{dayName}</h3>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>

      <div className="space-y-2.5">
        {meals.map((meal) => {
          const Icon = mealIcons[meal.type];
          const colors = mealColors[meal.type];

          return (
            <div
              key={meal.type}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                meal.description
                  ? "bg-white border border-gray-100"
                  : "bg-gray-50 border border-dashed border-gray-200"
              }`}
            >
              <div
                className={`w-9 h-9 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xs text-gray-400 uppercase tracking-wider font-medium">
                  {mealLabels[meal.type]}
                </p>
                {meal.description ? (
                  <p className="text-sm text-gray-900 truncate">
                    {meal.description}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Sem plano definido
                  </p>
                )}
              </div>
              {!meal.description && (
                <button className="w-7 h-7 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors flex-shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
