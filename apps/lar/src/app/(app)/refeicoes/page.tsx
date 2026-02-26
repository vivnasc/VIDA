"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingCart,
  Printer,
  Share2,
  Leaf,
  WheatOff,
  Heart,
  Brain,
  DollarSign,
  ListChecks,
  Apple,
  Flame as Fire,
  Droplets,
  Beef,
} from "lucide-react";
import Link from "next/link";
import { MealDayCard } from "@/components/meal-day-card";

interface Meal {
  type: "breakfast" | "lunch" | "dinner";
  label: string;
  description?: string;
  cost?: number;
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
        label: "Cafe da manha",
        description: "Torradas com manteiga e cafe",
        cost: 85,
      },
      {
        type: "lunch",
        label: "Almoco",
        description: "Frango grelhado com arroz e salada",
        cost: 350,
      },
      {
        type: "dinner",
        label: "Jantar",
        description: "Sopa de legumes e pao",
        cost: 180,
      },
    ],
  },
  {
    date: "2026-02-24",
    dayName: "Terca-feira",
    dayShort: "Ter",
    meals: [
      {
        type: "breakfast",
        label: "Cafe da manha",
        description: "Iogurte com granola e fruta",
        cost: 120,
      },
      {
        type: "lunch",
        label: "Almoco",
        description: "Massa a bolonhesa",
        cost: 280,
      },
      {
        type: "dinner",
        label: "Jantar",
        description: "Omelete com salada",
        cost: 150,
      },
    ],
  },
  {
    date: "2026-02-25",
    dayName: "Quarta-feira",
    dayShort: "Qua",
    meals: [
      {
        type: "breakfast",
        label: "Cafe da manha",
        description: "Pao com queijo e sumo de laranja",
        cost: 95,
      },
      {
        type: "lunch",
        label: "Almoco",
        description: "Bacalhau a Bras",
        cost: 420,
      },
      {
        type: "dinner",
        label: "Jantar",
        description: "Salada Cesar com frango",
        cost: 250,
      },
    ],
  },
  {
    date: "2026-02-26",
    dayName: "Quinta-feira",
    dayShort: "Qui",
    meals: [
      { type: "breakfast", label: "Cafe da manha" },
      { type: "lunch", label: "Almoco" },
      { type: "dinner", label: "Jantar" },
    ],
  },
  {
    date: "2026-02-27",
    dayName: "Sexta-feira",
    dayShort: "Sex",
    meals: [
      { type: "breakfast", label: "Cafe da manha" },
      { type: "lunch", label: "Almoco" },
      { type: "dinner", label: "Jantar" },
    ],
  },
  {
    date: "2026-02-28",
    dayName: "Sabado",
    dayShort: "Sab",
    meals: [
      { type: "breakfast", label: "Cafe da manha" },
      { type: "lunch", label: "Almoco" },
      { type: "dinner", label: "Jantar" },
    ],
  },
  {
    date: "2026-03-01",
    dayName: "Domingo",
    dayShort: "Dom",
    meals: [
      { type: "breakfast", label: "Cafe da manha" },
      { type: "lunch", label: "Almoco" },
      { type: "dinner", label: "Jantar" },
    ],
  },
];

/* ─── Dietary Preferences ─── */
interface DietaryPref {
  id: string;
  label: string;
  icon: typeof Leaf;
  color: string;
  active: boolean;
}

const initialPreferences: DietaryPref[] = [
  { id: "tea", label: "TEA-friendly", icon: Brain, color: "bg-purple-100 text-purple-700 border-purple-300", active: true },
  { id: "gluten", label: "Sem Gluten", icon: WheatOff, color: "bg-amber-100 text-amber-700 border-amber-300", active: false },
  { id: "veg", label: "Vegetariano", icon: Leaf, color: "bg-green-100 text-green-700 border-green-300", active: false },
  { id: "lactose", label: "Sem Lactose", icon: Droplets, color: "bg-blue-100 text-blue-700 border-blue-300", active: true },
  { id: "lowsodium", label: "Baixo Sodio", icon: Heart, color: "bg-red-100 text-red-700 border-red-300", active: false },
];

/* ─── Weekly Nutrition Summary ─── */
const nutritionSummary = {
  calories: { value: 12600, target: 14000, unit: "kcal" },
  protein: { value: 420, target: 490, unit: "g" },
  carbs: { value: 1260, target: 1400, unit: "g" },
  fat: { value: 350, target: 420, unit: "g" },
};

export default function RefeicoesPage() {
  const [selectedDay, setSelectedDay] = useState(3); // Thursday (today)
  const [preferences, setPreferences] = useState(initialPreferences);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const currentDay = weekDays[selectedDay];
  const plannedMeals = weekDays.reduce(
    (count, day) =>
      count + day.meals.filter((m) => m.description).length,
    0
  );
  const totalMeals = weekDays.length * 3;

  // Calculate weekly cost
  const weeklyCost = weekDays.reduce(
    (sum, day) =>
      sum + day.meals.reduce((daySum, meal) => daySum + (meal.cost || 0), 0),
    0
  );

  // Calculate daily cost for current day
  const dailyCost = currentDay?.meals.reduce((sum, meal) => sum + (meal.cost || 0), 0) || 0;

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-white">Plano de Refeicoes</h1>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                title="Imprimir"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
              <button
                className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                title="Partilhar"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <Link
                href="/compras"
                className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-blue-100 mb-1">
              <span>Semana planeada</span>
              <span>
                {plannedMeals}/{totalMeals} refeicoes
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

          {/* Cost Summary */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-blue-100 text-2xs uppercase tracking-wider">Custo Semanal</p>
              <p className="text-white font-bold">{weeklyCost.toLocaleString("pt-MZ")} MT</p>
            </div>
            <div className="flex-1 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-blue-100 text-2xs uppercase tracking-wider">Hoje</p>
              <p className="text-white font-bold">{dailyCost > 0 ? `${dailyCost.toLocaleString("pt-MZ")} MT` : "---"}</p>
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
          <div>
            <MealDayCard
              dayName={currentDay.dayName}
              date={currentDay.date}
              meals={currentDay.meals}
            />
            {/* Cost per meal */}
            {currentDay.meals.some((m) => m.cost) && (
              <div className="mt-2 flex items-center gap-2 px-1">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                <div className="flex gap-3">
                  {currentDay.meals.map((meal) => (
                    <span key={meal.type} className="text-xs text-gray-500">
                      {meal.type === "breakfast" ? "Peq." : meal.type === "lunch" ? "Alm." : "Jan."}:{" "}
                      <span className="font-medium">{meal.cost ? `${meal.cost} MT` : "---"}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Generate Button */}
        <button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-all active:scale-[0.98]">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold">Gerar com IA</p>
            <p className="text-xs text-white/80">
              Cria um plano semanal com base no inventario, preferencias e orcamento
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/60 flex-shrink-0" />
        </button>

        {/* Generate Shopping List */}
        <button className="w-full app-card flex items-center gap-3 hover:shadow-md transition-all active:scale-[0.98] border-2 border-blue-100">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <ListChecks className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-semibold text-gray-900">Gerar Lista de Compras</p>
            <p className="text-xs text-gray-500">
              Cria lista automática a partir do plano de refeicoes
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>

        {/* Dietary Preferences */}
        <section>
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="flex items-center justify-between w-full mb-3"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Preferencias Alimentares
            </h2>
            <span className="text-xs text-blue-500 font-medium">
              {showPreferences ? "Ocultar" : "Editar"}
            </span>
          </button>

          <div className="flex flex-wrap gap-2">
            {preferences.map((pref) => {
              const Icon = pref.icon;
              return (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    pref.active
                      ? pref.color
                      : "bg-gray-50 text-gray-400 border-gray-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {pref.label}
                  {pref.active && (
                    <span className="w-1.5 h-1.5 bg-current rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Weekly Nutrition Summary */}
        <section>
          <button
            onClick={() => setShowNutrition(!showNutrition)}
            className="flex items-center justify-between w-full mb-3"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Resumo Nutricional Semanal
            </h2>
            <span className="text-xs text-blue-500 font-medium">
              {showNutrition ? "Ocultar" : "Ver"}
            </span>
          </button>

          {showNutrition && (
            <div className="app-card space-y-3">
              {/* Calories */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 flex items-center gap-1.5">
                    <Fire className="w-3.5 h-3.5 text-orange-500" />
                    Calorias
                  </span>
                  <span className="text-xs font-medium text-gray-700">
                    {nutritionSummary.calories.value.toLocaleString()} / {nutritionSummary.calories.target.toLocaleString()} {nutritionSummary.calories.unit}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-400 rounded-full"
                    style={{ width: `${(nutritionSummary.calories.value / nutritionSummary.calories.target) * 100}%` }}
                  />
                </div>
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center bg-red-50 rounded-xl py-3">
                  <Beef className="w-4 h-4 text-red-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Proteina</p>
                  <p className="text-sm font-bold text-gray-900">{nutritionSummary.protein.value}g</p>
                  <p className="text-2xs text-gray-400">de {nutritionSummary.protein.target}g</p>
                </div>
                <div className="text-center bg-amber-50 rounded-xl py-3">
                  <Apple className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Carboidratos</p>
                  <p className="text-sm font-bold text-gray-900">{nutritionSummary.carbs.value}g</p>
                  <p className="text-2xs text-gray-400">de {nutritionSummary.carbs.target}g</p>
                </div>
                <div className="text-center bg-blue-50 rounded-xl py-3">
                  <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Gordura</p>
                  <p className="text-sm font-bold text-gray-900">{nutritionSummary.fat.value}g</p>
                  <p className="text-2xs text-gray-400">de {nutritionSummary.fat.target}g</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Week Overview */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Visao da semana
          </h2>
          <div className="space-y-3">
            {weekDays.map((day, idx) => {
              const dayCost = day.meals.reduce((sum, m) => sum + (m.cost || 0), 0);
              return (
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
                  {dayCost > 0 && (
                    <span className="text-xs text-gray-400 font-medium flex-shrink-0">
                      {dayCost} MT
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Print / Share Meal Plan */}
        <div className="flex gap-3">
          <button className="flex-1 app-card flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-blue-500 transition-colors">
            <Printer className="w-4 h-4" />
            <span className="text-sm font-medium">Imprimir Plano</span>
          </button>
          <button className="flex-1 app-card flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-blue-500 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Partilhar Plano</span>
          </button>
        </div>
      </main>
    </div>
  );
}
