"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { MealDayCard } from "@/components/meal-day-card";

interface Meal {
  type: "breakfast" | "lunch" | "dinner";
  label: string;
  description?: string;
}

interface DayPlan {
  date: string;
  dayName: string;
  dayShort: string;
  meals: Meal[];
}

const weekDays: DayPlan[] = [
  {
    date: "2026-02-23",
    dayName: "Segunda-feira",
    dayShort: "Seg",
    meals: [
      {
        type: "breakfast",
        label: "Café da manhã",
        description: "Torradas com manteiga e café",
      },
      {
        type: "lunch",
        label: "Almoço",
        description: "Frango grelhado com arroz e salada",
      },
      {
        type: "dinner",
        label: "Jantar",
        description: "Sopa de legumes e pão",
      },
    ],
  },
  {
    date: "2026-02-24",
    dayName: "Terça-feira",
    dayShort: "Ter",
    meals: [
      {
        type: "breakfast",
        label: "Café da manhã",
        description: "Iogurte com granola e fruta",
      },
      {
        type: "lunch",
        label: "Almoço",
        description: "Massa à bolonhesa",
      },
      { type: "dinner", label: "Jantar", description: "Omelete com salada" },
    ],
  },
  {
    date: "2026-02-25",
    dayName: "Quarta-feira",
    dayShort: "Qua",
    meals: [
      {
        type: "breakfast",
        label: "Café da manhã",
        description: "Pão com queijo e sumo de laranja",
      },
      { type: "lunch", label: "Almoço", description: "Bacalhau à Brás" },
      {
        type: "dinner",
        label: "Jantar",
        description: "Salada César com frango",
      },
    ],
  },
  {
    date: "2026-02-26",
    dayName: "Quinta-feira",
    dayShort: "Qui",
    meals: [
      { type: "breakfast", label: "Café da manhã" },
      { type: "lunch", label: "Almoço" },
      { type: "dinner", label: "Jantar" },
    ],
  },
  {
    date: "2026-02-27",
    dayName: "Sexta-feira",
    dayShort: "Sex",
    meals: [
      { type: "breakfast", label: "Café da manhã" },
      { type: "lunch", label: "Almoço" },
      { type: "dinner", label: "Jantar" },
    ],
  },
  {
    date: "2026-02-28",
    dayName: "Sábado",
    dayShort: "Sáb",
    meals: [
      { type: "breakfast", label: "Café da manhã" },
      { type: "lunch", label: "Almoço" },
      { type: "dinner", label: "Jantar" },
    ],
  },
  {
    date: "2026-03-01",
    dayName: "Domingo",
    dayShort: "Dom",
    meals: [
      { type: "breakfast", label: "Café da manhã" },
      { type: "lunch", label: "Almoço" },
      { type: "dinner", label: "Jantar" },
    ],
  },
];

export default function RefeicoesPage() {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday (today)

  const currentDay = weekDays[selectedDay];
  const plannedMeals = weekDays.reduce(
    (count, day) =>
      count + day.meals.filter((m) => m.description).length,
    0
  );
  const totalMeals = weekDays.length * 3;

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-white">Plano de Refeições</h1>
            <Link
              href="/compras"
              className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Lista de compras
            </Link>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-blue-100 mb-1">
              <span>Semana planeada</span>
              <span>
                {plannedMeals}/{totalMeals} refeições
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{
                  width: `${(plannedMeals / totalMeals) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Week Day Selector */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              disabled={selectedDay === 0}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <div className="flex-1 flex gap-1">
              {weekDays.map((day, idx) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(idx)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                    idx === selectedDay
                      ? "bg-white text-blue-600"
                      : day.meals.every((m) => m.description)
                      ? "bg-white/20 text-white"
                      : "bg-transparent text-blue-200 hover:bg-white/10"
                  }`}
                >
                  {day.dayShort}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setSelectedDay(Math.min(weekDays.length - 1, selectedDay + 1))
              }
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              disabled={selectedDay === weekDays.length - 1}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Current Day */}
        {currentDay && (
          <MealDayCard
            dayName={currentDay.dayName}
            date={currentDay.date}
            meals={currentDay.meals}
          />
        )}

        {/* AI Suggestion */}
        <button className="w-full app-card flex items-center gap-3 hover:shadow-soft-lg transition-shadow active:scale-[0.98]">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">
              Sugerir com IA
            </p>
            <p className="text-xs text-gray-500">
              Preenche o plano com base no teu inventário e preferências
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-auto" />
        </button>

        {/* Week Overview */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Visão da semana
          </h2>
          <div className="space-y-3">
            {weekDays.map((day, idx) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(idx)}
                className={`w-full text-left app-card flex items-center gap-3 transition-all ${
                  idx === selectedDay
                    ? "ring-2 ring-blue-500 ring-offset-1"
                    : ""
                }`}
              >
                <div
                  className={`w-10 text-center flex-shrink-0 ${
                    idx === selectedDay
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  <p className="text-xs font-medium">{day.dayShort}</p>
                  <p className="text-lg font-bold">
                    {new Date(day.date).getDate()}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2">
                    {day.meals.map((meal) => (
                      <div
                        key={meal.type}
                        className={`flex-1 text-center py-1 rounded-lg text-2xs ${
                          meal.description
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {meal.type === "breakfast"
                          ? "Peq."
                          : meal.type === "lunch"
                          ? "Alm."
                          : "Jan."}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
