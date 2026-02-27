"use client";

import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Star,
  Lock,
  CheckCircle,
  ChevronRight,
  Play,
  Clock,
  Zap,
  Target,
  TrendingUp,
  Smartphone,
  Award,
} from "lucide-react";

interface Module {
  id: string;
  name: string;
  level: string;
  lessons: number;
  completed: number;
  xp: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  locked: boolean;
}

const MOCK_MODULES: Module[] = [
  { id: "1", name: "Separar dinheiro pessoal de negócio", level: "Básico", lessons: 5, completed: 5, xp: 100, icon: BookOpen, color: "bg-emerald-500", locked: false },
  { id: "2", name: "Como precificar correctamente", level: "Básico", lessons: 4, completed: 3, xp: 80, icon: Target, color: "bg-blue-500", locked: false },
  { id: "3", name: "Controlo de stock — porquê importa", level: "Básico", lessons: 3, completed: 0, xp: 60, icon: BookOpen, color: "bg-purple-500", locked: false },
  { id: "4", name: "Gestão de fluxo de caixa", level: "Básico", lessons: 4, completed: 0, xp: 80, icon: TrendingUp, color: "bg-amber-500", locked: false },
  { id: "5", name: "Como negociar com fornecedores", level: "Vendas", lessons: 3, completed: 0, xp: 60, icon: Zap, color: "bg-red-500", locked: false },
  { id: "6", name: "Fidelização de clientes", level: "Vendas", lessons: 4, completed: 0, xp: 80, icon: Star, color: "bg-pink-500", locked: false },
  { id: "7", name: "Quando contratar ajuda", level: "Crescimento", lessons: 3, completed: 0, xp: 60, icon: TrendingUp, color: "bg-teal-500", locked: true },
  { id: "8", name: "Vender no Facebook/Instagram", level: "Digital", lessons: 5, completed: 0, xp: 100, icon: Smartphone, color: "bg-indigo-500", locked: true },
  { id: "9", name: "Licenças necessárias em Moçambique", level: "Moçambique", lessons: 3, completed: 0, xp: 60, icon: Award, color: "bg-orange-500", locked: false },
];

type FilterLevel = "all" | "basico" | "vendas" | "crescimento" | "digital" | "mocambique";

export default function EducacaoPage() {
  const [filter, setFilter] = useState<FilterLevel>("all");

  const totalXP = MOCK_MODULES.reduce(
    (s, m) => s + (m.completed === m.lessons ? m.xp : Math.round((m.completed / m.lessons) * m.xp)),
    0,
  );
  const completedModules = MOCK_MODULES.filter((m) => m.completed === m.lessons).length;
  const totalModules = MOCK_MODULES.length;

  const filtered = MOCK_MODULES.filter((m) => {
    if (filter === "all") return true;
    return m.level.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter;
  });

  const level = totalXP >= 500 ? "Mestre" : totalXP >= 300 ? "Avançado" : totalXP >= 100 ? "Intermediário" : "Iniciante";

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Educação</h1>
          <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span className="text-sm font-bold">{totalXP} XP</span>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-7 h-7 text-yellow-300" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{level}</p>
              <p className="text-xs text-emerald-100">
                {completedModules}/{totalModules} módulos completos
              </p>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{ width: `${(completedModules / totalModules) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4 -mt-2">
        {/* Level Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
          {[
            { key: "all" as FilterLevel, label: "Todos" },
            { key: "basico" as FilterLevel, label: "Básico" },
            { key: "vendas" as FilterLevel, label: "Vendas" },
            { key: "crescimento" as FilterLevel, label: "Crescimento" },
            { key: "digital" as FilterLevel, label: "Digital" },
            { key: "mocambique" as FilterLevel, label: "Moçambique" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                filter === key
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Modules List */}
        <div className="space-y-3">
          {filtered.map((module) => {
            const progress = module.lessons > 0 ? (module.completed / module.lessons) * 100 : 0;
            const isComplete = module.completed === module.lessons;
            const isStarted = module.completed > 0 && !isComplete;

            return (
              <div
                key={module.id}
                className={`card p-4 ${module.locked ? "opacity-60" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 ${module.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    {module.locked ? (
                      <Lock className="w-5 h-5 text-white" />
                    ) : isComplete ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <module.icon className="w-5 h-5 text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold truncate">{module.name}</p>
                    </div>
                    <div className="flex items-center gap-2 text-2xs text-[var(--color-text-muted)]">
                      <span>{module.level}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{module.lessons} lições</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5 text-amber-500" />
                        {module.xp} XP
                      </span>
                    </div>

                    {/* Progress bar */}
                    {!module.locked && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isComplete ? "bg-emerald-500" : "bg-primary-400"
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-2xs text-[var(--color-text-muted)] mt-0.5">
                          {module.completed}/{module.lessons} completas
                        </p>
                      </div>
                    )}
                  </div>

                  {!module.locked && (
                    <button className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isComplete
                        ? "bg-emerald-100"
                        : "bg-primary-100"
                    }`}>
                      {isComplete ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Play className="w-4 h-4 text-primary-600" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gamification hint */}
        <section className="card p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">
                Aprende e ganha!
              </p>
              <p className="text-xs text-amber-600">
                Completa módulos para ganhar XP, badges e certificados
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
