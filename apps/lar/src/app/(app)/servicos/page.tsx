"use client";

import { useState } from "react";
import {
  Zap,
  Droplets,
  Flame,
  Wifi,
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
  Calendar,
  Fuel,
  ChevronDown,
  ChevronUp,
  BarChart3,
} from "lucide-react";

/* ─── Types ─── */
interface UtilityService {
  id: string;
  name: string;
  provider: string;
  icon: typeof Zap;
  color: string;
  bgColor: string;
  currentCost: number;
  previousCost: number;
  lastReading: string;
  unit: string;
  currentUsage: number;
  monthlyHistory: { month: string; cost: number }[];
}

interface Anomaly {
  id: string;
  service: string;
  message: string;
  severity: "warning" | "critical";
}

/* ─── Mock Data ─── */
const utilities: UtilityService[] = [
  {
    id: "1",
    name: "Electricidade",
    provider: "EDM",
    icon: Zap,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    currentCost: 4200,
    previousCost: 3800,
    lastReading: "2026-02-20",
    unit: "kWh",
    currentUsage: 320,
    monthlyHistory: [
      { month: "Set", cost: 3200 },
      { month: "Out", cost: 3500 },
      { month: "Nov", cost: 3400 },
      { month: "Dez", cost: 4100 },
      { month: "Jan", cost: 3800 },
      { month: "Fev", cost: 4200 },
    ],
  },
  {
    id: "2",
    name: "Água",
    provider: "FIPAG",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    currentCost: 1800,
    previousCost: 1300,
    lastReading: "2026-02-18",
    unit: "m³",
    currentUsage: 22,
    monthlyHistory: [
      { month: "Set", cost: 1100 },
      { month: "Out", cost: 1200 },
      { month: "Nov", cost: 1150 },
      { month: "Dez", cost: 1400 },
      { month: "Jan", cost: 1300 },
      { month: "Fev", cost: 1800 },
    ],
  },
  {
    id: "3",
    name: "Gás",
    provider: "Matola Gás",
    icon: Flame,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    currentCost: 950,
    previousCost: 900,
    lastReading: "2026-02-15",
    unit: "kg",
    currentUsage: 13,
    monthlyHistory: [
      { month: "Set", cost: 850 },
      { month: "Out", cost: 900 },
      { month: "Nov", cost: 880 },
      { month: "Dez", cost: 920 },
      { month: "Jan", cost: 900 },
      { month: "Fev", cost: 950 },
    ],
  },
  {
    id: "4",
    name: "Internet",
    provider: "Vodacom Fibra",
    icon: Wifi,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    currentCost: 3500,
    previousCost: 3500,
    lastReading: "2026-02-01",
    unit: "Mbps",
    currentUsage: 100,
    monthlyHistory: [
      { month: "Set", cost: 3500 },
      { month: "Out", cost: 3500 },
      { month: "Nov", cost: 3500 },
      { month: "Dez", cost: 3500 },
      { month: "Jan", cost: 3500 },
      { month: "Fev", cost: 3500 },
    ],
  },
  {
    id: "5",
    name: "Segurança",
    provider: "G4S",
    icon: Shield,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    currentCost: 5000,
    previousCost: 5000,
    lastReading: "2026-02-01",
    unit: "mensal",
    currentUsage: 1,
    monthlyHistory: [
      { month: "Set", cost: 5000 },
      { month: "Out", cost: 5000 },
      { month: "Nov", cost: 5000 },
      { month: "Dez", cost: 5000 },
      { month: "Jan", cost: 5000 },
      { month: "Fev", cost: 5000 },
    ],
  },
];

const anomalies: Anomaly[] = [
  {
    id: "1",
    service: "Água",
    message: "Consumo de água 40% acima do normal",
    severity: "critical",
  },
  {
    id: "2",
    service: "Electricidade",
    message: "Consumo eléctrico 10% acima da média dos últimos 3 meses",
    severity: "warning",
  },
];

/* ─── Mozambique-specific ─── */
const generatorFuel = {
  currentLiters: 35,
  tankCapacity: 100,
  lastRefill: "2026-02-10",
  costPerLiter: 85,
  avgDailyUsage: 5,
};

const waterTank = {
  currentLevel: 65,
  capacity: 5000,
  unit: "L",
  lastFilled: "2026-02-22",
};

export default function ServicosPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalMonthlyCost = utilities.reduce((sum, u) => sum + u.currentCost, 0);
  const previousTotal = utilities.reduce((sum, u) => sum + u.previousCost, 0);
  const totalTrend = ((totalMonthlyCost - previousTotal) / previousTotal) * 100;

  const getTrendInfo = (current: number, previous: number) => {
    const diff = ((current - previous) / previous) * 100;
    if (diff > 0) return { direction: "up" as const, value: `+${diff.toFixed(0)}%`, color: "text-red-500" };
    if (diff < 0) return { direction: "down" as const, value: `${diff.toFixed(0)}%`, color: "text-emerald-500" };
    return { direction: "neutral" as const, value: "0%", color: "text-gray-400" };
  };

  const maxCost = Math.max(...utilities.flatMap((u) => u.monthlyHistory.map((h) => h.cost)));

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-white">Serviços e Utilidades</h1>
              <p className="text-blue-100 text-sm">Controlo de consumo mensal</p>
            </div>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Total Cost */}
          <div className="bg-white/15 rounded-xl px-4 py-3">
            <p className="text-blue-100 text-xs uppercase tracking-wider">Custo Total Mensal</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-white font-bold text-2xl">{totalMonthlyCost.toLocaleString("pt-MZ")} MT</p>
              <span
                className={`text-xs font-medium mb-1 ${
                  totalTrend > 0 ? "text-red-200" : "text-emerald-200"
                }`}
              >
                {totalTrend > 0 ? "+" : ""}
                {totalTrend.toFixed(1)}% vs mês anterior
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Anomaly Alerts */}
        {anomalies.length > 0 && (
          <section className="space-y-2">
            {anomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  anomaly.severity === "critical"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-amber-50 border-amber-200 text-amber-700"
                }`}
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{anomaly.message}</p>
                  <p className="text-xs opacity-75">{anomaly.service}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Utility Cards */}
        {utilities.map((utility) => {
          const trend = getTrendInfo(utility.currentCost, utility.previousCost);
          const Icon = utility.icon;
          const isExpanded = expandedId === utility.id;

          return (
            <div key={utility.id} className="app-card space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${utility.bgColor} ${utility.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{utility.name}</h3>
                    <span className="text-2xs text-gray-400">{utility.provider}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(utility.lastReading).toLocaleDateString("pt-PT", { day: "numeric", month: "short" })}
                    </span>
                    <span className="text-xs text-gray-400">
                      {utility.currentUsage} {utility.unit}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">{utility.currentCost.toLocaleString("pt-MZ")} MT</p>
                  <div className={`flex items-center gap-0.5 justify-end text-xs font-medium ${trend.color}`}>
                    {trend.direction === "up" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : trend.direction === "down" ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                    {trend.value}
                  </div>
                </div>
              </div>

              {/* Expand to show chart */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : utility.id)}
                className="w-full flex items-center justify-center gap-1 text-xs text-blue-500 font-medium py-1 hover:text-blue-600 transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                {isExpanded ? "Ocultar gráfico" : "Ver histórico"}
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {/* Mini Bar Chart (last 6 months) */}
              {isExpanded && (
                <div className="border-t border-gray-100 pt-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Últimos 6 meses
                  </h4>
                  <div className="flex items-end gap-2 h-32">
                    {utility.monthlyHistory.map((month, idx) => {
                      const heightPercent = (month.cost / maxCost) * 100;
                      const isLatest = idx === utility.monthlyHistory.length - 1;
                      return (
                        <div key={month.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-2xs text-gray-500 font-medium">
                            {month.cost.toLocaleString("pt-MZ")}
                          </span>
                          <div className="w-full flex-1 flex items-end">
                            <div
                              className={`w-full rounded-t-md transition-all ${
                                isLatest ? "bg-blue-500" : "bg-blue-200"
                              }`}
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <span className="text-2xs text-gray-400">{month.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Mozambique-specific: Generator Fuel */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recursos Específicos
          </h2>

          <div className="app-card space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Fuel className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">Gerador - Combustível</h3>
                <p className="text-xs text-gray-500">
                  Último abastecimento: {new Date(generatorFuel.lastRefill).toLocaleDateString("pt-PT")}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900">{generatorFuel.currentLiters}L</p>
                <p className="text-2xs text-gray-400">de {generatorFuel.tankCapacity}L</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Nível do tanque</span>
                <span>{Math.round((generatorFuel.currentLiters / generatorFuel.tankCapacity) * 100)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    generatorFuel.currentLiters / generatorFuel.tankCapacity < 0.25
                      ? "bg-red-500"
                      : generatorFuel.currentLiters / generatorFuel.tankCapacity < 0.5
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${(generatorFuel.currentLiters / generatorFuel.tankCapacity) * 100}%`,
                  }}
                />
              </div>
              <p className="text-2xs text-gray-400 mt-1">
                Estimativa: ~{Math.round(generatorFuel.currentLiters / generatorFuel.avgDailyUsage)} dias restantes |{" "}
                {generatorFuel.costPerLiter} MT/L
              </p>
            </div>
          </div>

          {/* Water Tank */}
          <div className="app-card space-y-3 mt-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">Tanque de Água</h3>
                <p className="text-xs text-gray-500">
                  Último enchimento: {new Date(waterTank.lastFilled).toLocaleDateString("pt-PT")}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-gray-900">{waterTank.currentLevel}%</p>
                <p className="text-2xs text-gray-400">{waterTank.capacity} {waterTank.unit}</p>
              </div>
            </div>
            <div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    waterTank.currentLevel < 25
                      ? "bg-red-500"
                      : waterTank.currentLevel < 50
                      ? "bg-amber-500"
                      : "bg-cyan-500"
                  }`}
                  style={{ width: `${waterTank.currentLevel}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Add Reading Button */}
        <button className="w-full app-card flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 py-4 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Adicionar Leitura</span>
        </button>
      </main>
    </div>
  );
}
