"use client";

import { useState } from "react";
import {
  Pill,
  Clock,
  Check,
  X,
  Sun,
  Sunset,
  Moon,
  Star,
  Plus,
  AlertTriangle,
  TrendingUp,
  Package,
  ChevronRight,
} from "lucide-react";

/* ─── Mock Data ─── */
type Period = "Manhã" | "Tarde" | "Noite" | "Antes de dormir";

interface ScheduleMedication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  member: string;
  taken: boolean;
  streak: number;
  period: Period;
}

const todaySchedule: ScheduleMedication[] = [
  { id: "1", name: "Lisinopril", dosage: "10mg", time: "08:00", member: "João", taken: true, streak: 14, period: "Manhã" },
  { id: "2", name: "Metformina", dosage: "500mg", time: "08:00", member: "João", taken: true, streak: 30, period: "Manhã" },
  { id: "3", name: "Anticoncepcional", dosage: "1 comp.", time: "09:00", member: "Maria", taken: false, streak: 45, period: "Manhã" },
  { id: "4", name: "Metformina", dosage: "500mg", time: "13:00", member: "João", taken: false, streak: 30, period: "Tarde" },
  { id: "5", name: "Ventolin", dosage: "2 inalações", time: "15:00", member: "Tomás", taken: false, streak: 7, period: "Tarde" },
  { id: "6", name: "Lisinopril", dosage: "10mg", time: "20:00", member: "João", taken: false, streak: 14, period: "Noite" },
  { id: "7", name: "Metformina", dosage: "500mg", time: "20:00", member: "João", taken: false, streak: 30, period: "Noite" },
  { id: "8", name: "Melatonina", dosage: "3mg", time: "22:00", member: "João", taken: false, streak: 5, period: "Antes de dormir" },
];

const activeMedications = [
  { id: "1", name: "Lisinopril", dosage: "10mg", member: "João", frequency: "2x/dia", stock: 5, totalStock: 30 },
  { id: "2", name: "Metformina", dosage: "500mg", member: "João", frequency: "3x/dia", stock: 22, totalStock: 90 },
  { id: "3", name: "Anticoncepcional", dosage: "1 comp.", member: "Maria", frequency: "1x/dia", stock: 18, totalStock: 28 },
  { id: "4", name: "Ventolin", dosage: "Inalador", member: "Tomás", frequency: "SOS", stock: 80, totalStock: 200 },
  { id: "5", name: "Melatonina", dosage: "3mg", member: "João", frequency: "1x/dia", stock: 12, totalStock: 30 },
];

const periodIcons: Record<Period, typeof Sun> = {
  "Manhã": Sun,
  "Tarde": Sunset,
  "Noite": Moon,
  "Antes de dormir": Star,
};

const periodColors: Record<Period, string> = {
  "Manhã": "bg-amber-50 text-amber-600 border-amber-200",
  "Tarde": "bg-orange-50 text-orange-600 border-orange-200",
  "Noite": "bg-indigo-50 text-indigo-600 border-indigo-200",
  "Antes de dormir": "bg-purple-50 text-purple-600 border-purple-200",
};

export default function MedicacaoPage() {
  const [schedule, setSchedule] = useState(todaySchedule);
  const [activeTab, setActiveTab] = useState<"hoje" | "medicamentos">("hoje");

  const handleTake = (id: string) => {
    setSchedule((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: true } : m))
    );
  };

  const handleSkip = (id: string) => {
    setSchedule((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: false } : m))
    );
  };

  const periods = Array.from(new Set(schedule.map((m) => m.period))) as Period[];

  return (
    <>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Medicação</h1>
            <p className="text-xs text-gray-500">Gestão de medicamentos da família</p>
          </div>
          <button className="rounded-full bg-primary-500 p-2 text-white shadow-sm transition-colors hover:bg-primary-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          <button
            onClick={() => setActiveTab("hoje")}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "hoje"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Hoje
          </button>
          <button
            onClick={() => setActiveTab("medicamentos")}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "medicamentos"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Medicamentos
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-4 py-6">
        {activeTab === "hoje" ? (
          <>
            {/* ─── Today's Schedule ─── */}
            {periods.map((period) => {
              const PeriodIcon = periodIcons[period];
              const meds = schedule.filter((m) => m.period === period);

              return (
                <section key={period}>
                  <div className={`mb-2 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold ${periodColors[period]}`}>
                    <PeriodIcon className="h-3.5 w-3.5" />
                    {period}
                  </div>

                  <div className="space-y-2">
                    {meds.map((med) => (
                      <div
                        key={med.id}
                        className={`card flex items-center gap-3 transition-all ${
                          med.taken ? "opacity-60" : ""
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                            med.taken
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-primary-50 text-primary-500"
                          }`}
                        >
                          {med.taken ? <Check className="h-5 w-5" /> : <Pill className="h-5 w-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-medium ${med.taken ? "text-gray-400 line-through" : "text-gray-900"}`}>
                              {med.name}
                            </p>
                            <span className="text-xs text-gray-400">{med.dosage}</span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-0.5">
                              <Clock className="h-3 w-3" />
                              {med.time}
                            </span>
                            <span>&middot;</span>
                            <span>{med.member}</span>
                            <span className="flex items-center gap-0.5 text-emerald-600">
                              <TrendingUp className="h-3 w-3" />
                              {med.streak} dias
                            </span>
                          </div>
                        </div>
                        {!med.taken && (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleTake(med.id)}
                              className="rounded-lg bg-emerald-50 p-2 text-emerald-600 transition-colors hover:bg-emerald-100"
                              title="Tomar"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleSkip(med.id)}
                              className="rounded-lg bg-gray-50 p-2 text-gray-400 transition-colors hover:bg-gray-100"
                              title="Saltar"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        ) : (
          <>
            {/* ─── Active Medications List ─── */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Medicamentos Ativos</h2>
              <div className="space-y-3">
                {activeMedications.map((med) => {
                  const stockPercent = (med.stock / med.totalStock) * 100;
                  const isLowStock = stockPercent < 20;

                  return (
                    <div key={med.id} className="card space-y-2 transition-shadow hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{med.name}</p>
                            <span className="text-xs text-gray-400">{med.dosage}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {med.member} &middot; {med.frequency}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-300" />
                      </div>

                      {/* Stock Level */}
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
                        <span className={`text-xs font-medium ${isLowStock ? "text-red-600" : "text-gray-500"}`}>
                          {med.stock} un.
                        </span>
                        {isLowStock && (
                          <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ─── Refill Reminders ─── */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Reabastecimento</h2>
              <div className="space-y-2">
                {activeMedications
                  .filter((m) => (m.stock / m.totalStock) * 100 < 30)
                  .map((med) => (
                    <div
                      key={med.id}
                      className="card flex items-center gap-3 border-l-4 border-l-amber-400 bg-amber-50/50"
                    >
                      <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {med.name} ({med.member})
                        </p>
                        <p className="text-xs text-gray-500">
                          Restam {med.stock} unidades - reabastecer em breve
                        </p>
                      </div>
                      <button className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-200">
                        Lembrar
                      </button>
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* FAB */}
      <button className="fab">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}
