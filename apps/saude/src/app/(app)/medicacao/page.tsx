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
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  DollarSign,
  User,
  MapPin,
  RefreshCw,
  BarChart3,
} from "lucide-react";

/* ─── Mock Data ─── */
type Period = "Manha" | "Tarde" | "Noite" | "Antes de dormir";

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

interface ActiveMedication {
  id: string;
  name: string;
  dosage: string;
  member: string;
  frequency: string;
  stock: number;
  totalStock: number;
  adherence: number;
  costPerMonth: number;
  pharmacy: string;
  doctor: string;
  interactions: string[];
  refillDate: string;
}

const todaySchedule: ScheduleMedication[] = [
  { id: "1", name: "Lisinopril", dosage: "10mg", time: "08:00", member: "Joao", taken: true, streak: 14, period: "Manha" },
  { id: "2", name: "Metformina", dosage: "500mg", time: "08:00", member: "Joao", taken: true, streak: 30, period: "Manha" },
  { id: "3", name: "Anticoncepcional", dosage: "1 comp.", time: "09:00", member: "Maria", taken: false, streak: 45, period: "Manha" },
  { id: "4", name: "Metformina", dosage: "500mg", time: "13:00", member: "Joao", taken: false, streak: 30, period: "Tarde" },
  { id: "5", name: "Ventolin", dosage: "2 inalacoes", time: "15:00", member: "Tomas", taken: false, streak: 7, period: "Tarde" },
  { id: "6", name: "Lisinopril", dosage: "10mg", time: "20:00", member: "Joao", taken: false, streak: 14, period: "Noite" },
  { id: "7", name: "Metformina", dosage: "500mg", time: "20:00", member: "Joao", taken: false, streak: 30, period: "Noite" },
  { id: "8", name: "Melatonina", dosage: "3mg", time: "22:00", member: "Joao", taken: false, streak: 5, period: "Antes de dormir" },
];

const activeMedications: ActiveMedication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    member: "Joao",
    frequency: "2x/dia",
    stock: 5,
    totalStock: 30,
    adherence: 93,
    costPerMonth: 850,
    pharmacy: "Farmacia Central Maputo",
    doctor: "Dr. Antonio Ferreira",
    interactions: ["Evitar com ibuprofeno", "Cuidado com suplementos de potassio"],
    refillDate: "2026-02-28",
  },
  {
    id: "2",
    name: "Metformina",
    dosage: "500mg",
    member: "Joao",
    frequency: "3x/dia",
    stock: 22,
    totalStock: 90,
    adherence: 88,
    costPerMonth: 1200,
    pharmacy: "Farmacia Central Maputo",
    doctor: "Dr. Antonio Ferreira",
    interactions: ["Reduzir alcool", "Tomar com refeicoes"],
    refillDate: "2026-03-15",
  },
  {
    id: "3",
    name: "Anticoncepcional",
    dosage: "1 comp.",
    member: "Maria",
    frequency: "1x/dia",
    stock: 18,
    totalStock: 28,
    adherence: 97,
    costPerMonth: 650,
    pharmacy: "Farmacia Polana",
    doctor: "Dra. Carla Santos",
    interactions: [],
    refillDate: "2026-03-08",
  },
  {
    id: "4",
    name: "Ventolin",
    dosage: "Inalador",
    member: "Tomas",
    frequency: "SOS",
    stock: 80,
    totalStock: 200,
    adherence: 100,
    costPerMonth: 450,
    pharmacy: "Farmacia Central Maputo",
    doctor: "Dr. Pedro Costa",
    interactions: [],
    refillDate: "2026-05-01",
  },
  {
    id: "5",
    name: "Melatonina",
    dosage: "3mg",
    member: "Joao",
    frequency: "1x/dia",
    stock: 12,
    totalStock: 30,
    adherence: 75,
    costPerMonth: 350,
    pharmacy: "Farmacia Central Maputo",
    doctor: "Dr. Antonio Ferreira",
    interactions: ["Nao combinar com benzodiazepinas"],
    refillDate: "2026-03-10",
  },
];

const periodIcons: Record<Period, typeof Sun> = {
  "Manha": Sun,
  "Tarde": Sunset,
  "Noite": Moon,
  "Antes de dormir": Star,
};

const periodColors: Record<Period, string> = {
  "Manha": "bg-amber-50 text-amber-600 border-amber-200",
  "Tarde": "bg-orange-50 text-orange-600 border-orange-200",
  "Noite": "bg-indigo-50 text-indigo-600 border-indigo-200",
  "Antes de dormir": "bg-purple-50 text-purple-600 border-purple-200",
};

/* ─── Visual Daily Schedule Data ─── */
interface DailySlot {
  period: Period;
  label: string;
  icon: typeof Sun;
  meds: { name: string; dosage: string; member: string; taken: boolean }[];
}

const dailySlots: DailySlot[] = [
  {
    period: "Manha",
    label: "Manha (06:00-12:00)",
    icon: Sun,
    meds: [
      { name: "Lisinopril", dosage: "10mg", member: "Joao", taken: true },
      { name: "Metformina", dosage: "500mg", member: "Joao", taken: true },
      { name: "Anticoncepcional", dosage: "1 comp.", member: "Maria", taken: false },
    ],
  },
  {
    period: "Tarde",
    label: "Tarde (12:00-18:00)",
    icon: Sunset,
    meds: [
      { name: "Metformina", dosage: "500mg", member: "Joao", taken: false },
      { name: "Ventolin", dosage: "2 inal.", member: "Tomas", taken: false },
    ],
  },
  {
    period: "Noite",
    label: "Noite (18:00-22:00)",
    icon: Moon,
    meds: [
      { name: "Lisinopril", dosage: "10mg", member: "Joao", taken: false },
      { name: "Metformina", dosage: "500mg", member: "Joao", taken: false },
    ],
  },
  {
    period: "Antes de dormir",
    label: "Antes de dormir (22:00+)",
    icon: Star,
    meds: [
      { name: "Melatonina", dosage: "3mg", member: "Joao", taken: false },
    ],
  },
];

export default function MedicacaoPage() {
  const [schedule, setSchedule] = useState(todaySchedule);
  const [activeTab, setActiveTab] = useState<"hoje" | "medicamentos" | "horario">("hoje");
  const [expandedMedId, setExpandedMedId] = useState<string | null>(null);

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
  const totalMonthlyCost = activeMedications.reduce((sum, m) => sum + m.costPerMonth, 0);

  return (
    <>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Medicacao</h1>
            <p className="text-xs text-gray-500">Gestao de medicamentos da familia</p>
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
          <button
            onClick={() => setActiveTab("horario")}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "horario"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Horario
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
        ) : activeTab === "medicamentos" ? (
          <>
            {/* Monthly Cost Summary */}
            <div className="card bg-gradient-to-r from-primary-50 to-rose-50 border border-primary-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Custo Mensal Total</p>
                  <p className="text-xl font-bold text-gray-900">{totalMonthlyCost.toLocaleString("pt-MZ")} MT</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* ─── Active Medications List ─── */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Medicamentos Activos</h2>
              <div className="space-y-3">
                {activeMedications.map((med) => {
                  const stockPercent = (med.stock / med.totalStock) * 100;
                  const isLowStock = stockPercent < 20;
                  const isExpanded = expandedMedId === med.id;
                  const daysUntilRefill = Math.ceil(
                    (new Date(med.refillDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );

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
                            {med.interactions.length > 0 && (
                              <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full text-2xs font-semibold">
                                <ShieldAlert className="h-2.5 w-2.5" />
                                Interaccoes
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {med.member} &middot; {med.frequency}
                          </p>
                        </div>
                        <button
                          onClick={() => setExpandedMedId(isExpanded ? null : med.id)}
                          className="flex-shrink-0"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-300" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-300" />
                          )}
                        </button>
                      </div>

                      {/* Adherence */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-2xs text-gray-500 flex items-center gap-1">
                              <BarChart3 className="h-3 w-3" />
                              Adesao
                            </span>
                            <span className={`text-2xs font-bold ${
                              med.adherence >= 90 ? "text-emerald-600" : med.adherence >= 70 ? "text-amber-600" : "text-red-600"
                            }`}>
                              {med.adherence}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={`h-full rounded-full transition-all ${
                                med.adherence >= 90 ? "bg-emerald-500" : med.adherence >= 70 ? "bg-amber-500" : "bg-red-500"
                              }`}
                              style={{ width: `${med.adherence}%` }}
                            />
                          </div>
                        </div>
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

                      {/* Refill Alert */}
                      {daysUntilRefill <= 7 && daysUntilRefill >= 0 && (
                        <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-1.5">
                          <RefreshCw className="h-3.5 w-3.5 text-amber-600" />
                          <span className="text-xs text-amber-700 font-medium">
                            Reabastecer em {daysUntilRefill} dia{daysUntilRefill !== 1 ? "s" : ""}
                          </span>
                        </div>
                      )}

                      {/* Cost per Month */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400 flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Custo mensal
                        </span>
                        <span className="font-medium text-gray-700">{med.costPerMonth.toLocaleString("pt-MZ")} MT</span>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 pt-3 space-y-3">
                          {/* Interactions Warning */}
                          {med.interactions.length > 0 && (
                            <div className="bg-amber-50 rounded-xl p-3">
                              <p className="text-xs font-semibold text-amber-700 flex items-center gap-1.5 mb-2">
                                <ShieldAlert className="h-4 w-4" />
                                Interaccoes e Avisos
                              </p>
                              <div className="space-y-1">
                                {med.interactions.map((interaction, idx) => (
                                  <p key={idx} className="text-xs text-amber-600 flex items-start gap-1.5">
                                    <span className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                                    {interaction}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Pharmacy & Doctor */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-50 rounded-lg px-3 py-2">
                              <p className="text-2xs text-gray-400 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Farmacia
                              </p>
                              <p className="text-xs font-medium text-gray-700 mt-0.5">{med.pharmacy}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg px-3 py-2">
                              <p className="text-2xs text-gray-400 flex items-center gap-1">
                                <User className="h-3 w-3" />
                                Medico
                              </p>
                              <p className="text-xs font-medium text-gray-700 mt-0.5">{med.doctor}</p>
                            </div>
                          </div>

                          {/* Refill Info */}
                          <div className="bg-gray-50 rounded-lg px-3 py-2 flex items-center justify-between">
                            <div>
                              <p className="text-2xs text-gray-400">Proximo Reabastecimento</p>
                              <p className="text-xs font-medium text-gray-700">
                                {new Date(med.refillDate).toLocaleDateString("pt-PT")}
                              </p>
                            </div>
                            <button className="bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary-100 transition-colors">
                              Lembrar
                            </button>
                          </div>
                        </div>
                      )}
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
        ) : (
          <>
            {/* ─── Visual Daily Schedule ─── */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Horario Diario Visual</h2>
              <div className="space-y-4">
                {dailySlots.map((slot) => {
                  const SlotIcon = slot.icon;
                  const takenCount = slot.meds.filter((m) => m.taken).length;
                  const totalCount = slot.meds.length;

                  return (
                    <div key={slot.period} className="card space-y-3">
                      <div className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${periodColors[slot.period]}`}>
                        <SlotIcon className="h-4 w-4" />
                        {slot.label}
                        <span className="ml-2 opacity-70">{takenCount}/{totalCount}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {slot.meds.map((med, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                              med.taken
                                ? "bg-emerald-50/50 border-emerald-200 opacity-70"
                                : "bg-white border-gray-100"
                            }`}
                          >
                            <div
                              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                                med.taken
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-primary-50 text-primary-500"
                              }`}
                            >
                              {med.taken ? <Check className="h-4 w-4" /> : <Pill className="h-4 w-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${med.taken ? "text-gray-400 line-through" : "text-gray-900"}`}>
                                {med.name}
                              </p>
                              <p className="text-xs text-gray-400">{med.dosage} &middot; {med.member}</p>
                            </div>
                            {med.taken && (
                              <span className="text-2xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Tomado
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
