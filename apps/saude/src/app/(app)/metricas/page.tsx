"use client";

import { useState } from "react";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Plus,
  Scale,
  Heart,
  Droplets,
  Target,
  Calculator,
  ChevronDown,
  ChevronUp,
  Minus,
} from "lucide-react";

/* ─── Types ─── */
interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
}

interface HealthMetric {
  id: string;
  name: string;
  icon: typeof Activity;
  color: string;
  bgColor: string;
  latestValue: string;
  unit: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
  isGoodTrend: boolean;
  history: { month: string; value: number }[];
  normalRange: string;
}

interface Goal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
}

/* ─── Mock Data ─── */
const familyMembers: FamilyMember[] = [
  { id: "1", name: "Joao", avatar: "JS" },
  { id: "2", name: "Maria", avatar: "MS" },
  { id: "3", name: "Tomas", avatar: "TS" },
  { id: "4", name: "Sofia", avatar: "SS" },
];

const metricsByPerson: Record<string, HealthMetric[]> = {
  "1": [
    {
      id: "peso",
      name: "Peso",
      icon: Scale,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      latestValue: "82.5",
      unit: "kg",
      trend: "down",
      trendValue: "-1.2 kg",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 85 },
        { month: "Out", value: 84.2 },
        { month: "Nov", value: 83.8 },
        { month: "Dez", value: 84.1 },
        { month: "Jan", value: 83.4 },
        { month: "Fev", value: 82.5 },
      ],
      normalRange: "70-85 kg",
    },
    {
      id: "pressao",
      name: "Pressao Arterial",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      latestValue: "135/88",
      unit: "mmHg",
      trend: "down",
      trendValue: "-5 mmHg",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 145 },
        { month: "Out", value: 142 },
        { month: "Nov", value: 140 },
        { month: "Dez", value: 138 },
        { month: "Jan", value: 137 },
        { month: "Fev", value: 135 },
      ],
      normalRange: "<130/85 mmHg",
    },
    {
      id: "glicemia",
      name: "Glicemia",
      icon: Droplets,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      latestValue: "118",
      unit: "mg/dL",
      trend: "stable",
      trendValue: "+2 mg/dL",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 125 },
        { month: "Out", value: 120 },
        { month: "Nov", value: 115 },
        { month: "Dez", value: 122 },
        { month: "Jan", value: 116 },
        { month: "Fev", value: 118 },
      ],
      normalRange: "70-100 mg/dL (jejum)",
    },
    {
      id: "colesterol",
      name: "Colesterol",
      icon: Activity,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      latestValue: "210",
      unit: "mg/dL",
      trend: "down",
      trendValue: "-15 mg/dL",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 235 },
        { month: "Out", value: 230 },
        { month: "Nov", value: 225 },
        { month: "Dez", value: 220 },
        { month: "Jan", value: 218 },
        { month: "Fev", value: 210 },
      ],
      normalRange: "<200 mg/dL",
    },
    {
      id: "imc",
      name: "IMC",
      icon: Calculator,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      latestValue: "26.8",
      unit: "",
      trend: "down",
      trendValue: "-0.4",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 27.6 },
        { month: "Out", value: 27.3 },
        { month: "Nov", value: 27.2 },
        { month: "Dez", value: 27.3 },
        { month: "Jan", value: 27.1 },
        { month: "Fev", value: 26.8 },
      ],
      normalRange: "18.5-24.9",
    },
  ],
  "2": [
    {
      id: "peso",
      name: "Peso",
      icon: Scale,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      latestValue: "62.0",
      unit: "kg",
      trend: "stable",
      trendValue: "0 kg",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 62 },
        { month: "Out", value: 62.3 },
        { month: "Nov", value: 61.8 },
        { month: "Dez", value: 62.5 },
        { month: "Jan", value: 62.1 },
        { month: "Fev", value: 62.0 },
      ],
      normalRange: "55-68 kg",
    },
    {
      id: "pressao",
      name: "Pressao Arterial",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      latestValue: "118/75",
      unit: "mmHg",
      trend: "stable",
      trendValue: "+1 mmHg",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 120 },
        { month: "Out", value: 118 },
        { month: "Nov", value: 119 },
        { month: "Dez", value: 117 },
        { month: "Jan", value: 119 },
        { month: "Fev", value: 118 },
      ],
      normalRange: "<130/85 mmHg",
    },
    {
      id: "imc",
      name: "IMC",
      icon: Calculator,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      latestValue: "22.1",
      unit: "",
      trend: "stable",
      trendValue: "0",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 22.1 },
        { month: "Out", value: 22.2 },
        { month: "Nov", value: 22.0 },
        { month: "Dez", value: 22.3 },
        { month: "Jan", value: 22.1 },
        { month: "Fev", value: 22.1 },
      ],
      normalRange: "18.5-24.9",
    },
  ],
  "3": [
    {
      id: "peso",
      name: "Peso",
      icon: Scale,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      latestValue: "28.5",
      unit: "kg",
      trend: "up",
      trendValue: "+0.8 kg",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 26.5 },
        { month: "Out", value: 27.0 },
        { month: "Nov", value: 27.3 },
        { month: "Dez", value: 27.8 },
        { month: "Jan", value: 28.1 },
        { month: "Fev", value: 28.5 },
      ],
      normalRange: "25-32 kg (8 anos)",
    },
  ],
  "4": [
    {
      id: "peso",
      name: "Peso",
      icon: Scale,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      latestValue: "18.2",
      unit: "kg",
      trend: "up",
      trendValue: "+0.5 kg",
      isGoodTrend: true,
      history: [
        { month: "Set", value: 17.0 },
        { month: "Out", value: 17.3 },
        { month: "Nov", value: 17.5 },
        { month: "Dez", value: 17.8 },
        { month: "Jan", value: 18.0 },
        { month: "Fev", value: 18.2 },
      ],
      normalRange: "16-21 kg (5 anos)",
    },
  ],
};

const goalsByPerson: Record<string, Goal[]> = {
  "1": [
    { id: "1", label: "Peso alvo", current: 82.5, target: 78, unit: "kg" },
    { id: "2", label: "Pressao alvo", current: 135, target: 130, unit: "mmHg" },
    { id: "3", label: "Glicemia alvo", current: 118, target: 100, unit: "mg/dL" },
  ],
  "2": [
    { id: "1", label: "Manter peso", current: 62, target: 62, unit: "kg" },
  ],
};

/* ─── BMI Calculator ─── */
function getBmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Abaixo do peso", color: "text-blue-600" };
  if (bmi < 25) return { label: "Peso normal", color: "text-emerald-600" };
  if (bmi < 30) return { label: "Excesso de peso", color: "text-amber-600" };
  return { label: "Obesidade", color: "text-red-600" };
}

export default function MetricasPage() {
  const [selectedMember, setSelectedMember] = useState("1");
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [showBmiCalc, setShowBmiCalc] = useState(false);
  const [bmiWeight, setBmiWeight] = useState("82.5");
  const [bmiHeight, setBmiHeight] = useState("175");

  const metrics = metricsByPerson[selectedMember] || [];
  const goals = goalsByPerson[selectedMember] || [];

  const calculatedBmi = bmiWeight && bmiHeight
    ? (parseFloat(bmiWeight) / Math.pow(parseFloat(bmiHeight) / 100, 2)).toFixed(1)
    : null;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Metricas de Saude</h1>
            <p className="text-xs text-gray-500">Acompanhamento familiar</p>
          </div>
          <button className="rounded-full bg-primary-500 p-2 text-white shadow-sm transition-colors hover:bg-primary-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Family Member Tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {familyMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                selectedMember === member.id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-2xs font-bold ${
                selectedMember === member.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {member.avatar}
              </span>
              {member.name}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-4 py-6">
        {/* Metric Cards */}
        <section className="space-y-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isExpanded = expandedMetric === metric.id;
            const maxVal = Math.max(...metric.history.map((h) => h.value));
            const minVal = Math.min(...metric.history.map((h) => h.value));
            const range = maxVal - minVal || 1;

            return (
              <div key={metric.id} className="card space-y-3">
                <button
                  onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
                  className="w-full flex items-center gap-3"
                >
                  <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${metric.bgColor} ${metric.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm text-gray-500">{metric.name}</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-xl font-bold text-gray-900">{metric.latestValue}</p>
                      <span className="text-xs text-gray-400">{metric.unit}</span>
                    </div>
                  </div>

                  {/* Trend + Mini Sparkline */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Mini Sparkline */}
                    <svg width="48" height="24" className="flex-shrink-0">
                      <polyline
                        points={metric.history
                          .map(
                            (h, i) =>
                              `${(i / (metric.history.length - 1)) * 44 + 2},${
                                22 - ((h.value - minVal) / range) * 18
                              }`
                          )
                          .join(" ")}
                        fill="none"
                        stroke={metric.isGoodTrend ? "#10b981" : "#ef4444"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div className={`flex items-center gap-0.5 text-xs font-medium ${
                      metric.isGoodTrend ? "text-emerald-600" : "text-red-600"
                    }`}>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : metric.trend === "down" ? (
                        <TrendingDown className="h-3.5 w-3.5" />
                      ) : (
                        <Minus className="h-3.5 w-3.5" />
                      )}
                      {metric.trendValue}
                    </div>
                  </div>
                </button>

                {/* Expanded: Full Chart */}
                {isExpanded && (
                  <div className="border-t border-gray-100 pt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">Ultimos 6 meses</p>
                      <p className="text-xs text-gray-400">Normal: {metric.normalRange}</p>
                    </div>

                    {/* Line Chart */}
                    <div className="relative h-40">
                      <svg width="100%" height="100%" viewBox="0 0 300 140" preserveAspectRatio="none">
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line
                            key={i}
                            x1="40"
                            y1={10 + i * 30}
                            x2="290"
                            y2={10 + i * 30}
                            stroke="#f3f4f6"
                            strokeWidth="1"
                          />
                        ))}
                        {/* Line */}
                        <polyline
                          points={metric.history
                            .map(
                              (h, i) =>
                                `${40 + (i / (metric.history.length - 1)) * 250},${
                                  130 - ((h.value - minVal) / range) * 110
                                }`
                            )
                            .join(" ")}
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Dots */}
                        {metric.history.map((h, i) => (
                          <circle
                            key={i}
                            cx={40 + (i / (metric.history.length - 1)) * 250}
                            cy={130 - ((h.value - minVal) / range) * 110}
                            r="4"
                            fill="#f43f5e"
                            stroke="white"
                            strokeWidth="2"
                          />
                        ))}
                        {/* Labels */}
                        {metric.history.map((h, i) => (
                          <text
                            key={`label-${i}`}
                            x={40 + (i / (metric.history.length - 1)) * 250}
                            y="138"
                            textAnchor="middle"
                            fill="#9ca3af"
                            fontSize="10"
                          >
                            {h.month}
                          </text>
                        ))}
                        {/* Y-axis values */}
                        <text x="35" y="15" textAnchor="end" fill="#9ca3af" fontSize="9">{maxVal}</text>
                        <text x="35" y="135" textAnchor="end" fill="#9ca3af" fontSize="9">{minVal}</text>
                      </svg>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-primary-50 text-primary-600 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors">
                      <Plus className="h-4 w-4" />
                      Adicionar Medicao
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Goals Section */}
        {goals.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-gray-900">Objectivos</h2>
            </div>
            <div className="space-y-3">
              {goals.map((goal) => {
                const progress = Math.min(
                  100,
                  goal.target > goal.current
                    ? ((goal.current - (goal.current - (goal.target - goal.current))) / goal.target) * 100
                    : ((goal.target / goal.current) * 100)
                );
                const isAchieved = goal.current === goal.target;

                return (
                  <div key={goal.id} className="card">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{goal.label}</p>
                      <p className={`text-sm font-bold ${isAchieved ? "text-emerald-600" : "text-gray-700"}`}>
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isAchieved ? "bg-emerald-500" : "bg-primary-500"
                        }`}
                        style={{ width: `${Math.min(100, progress)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* BMI Calculator */}
        <section>
          <button
            onClick={() => setShowBmiCalc(!showBmiCalc)}
            className="flex items-center justify-between w-full mb-3"
          >
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-gray-900">Calculadora IMC</h2>
            </div>
            {showBmiCalc ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {showBmiCalc && (
            <div className="card space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Peso (kg)</label>
                  <input
                    type="number"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Altura (cm)</label>
                  <input
                    type="number"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                  />
                </div>
              </div>

              {calculatedBmi && (
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">O seu IMC</p>
                  <p className="text-3xl font-bold text-gray-900">{calculatedBmi}</p>
                  <p className={`text-sm font-medium mt-1 ${getBmiCategory(parseFloat(calculatedBmi)).color}`}>
                    {getBmiCategory(parseFloat(calculatedBmi)).label}
                  </p>
                  <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full flex">
                      <div className="bg-blue-400 flex-[18.5]" />
                      <div className="bg-emerald-400 flex-[6.5]" />
                      <div className="bg-amber-400 flex-[5]" />
                      <div className="bg-red-400 flex-[10]" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-2xs text-gray-400">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Add Measurement */}
        <button className="card flex w-full items-center justify-center gap-2 border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-primary-300 hover:text-primary-500">
          <Plus className="h-5 w-5" />
          Adicionar Medicao
        </button>
      </main>
    </>
  );
}
