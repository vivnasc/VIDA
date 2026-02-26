"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface DataPoint {
  date: string;
  value: number;
  label?: string;
}

interface HealthMetricChartProps {
  title: string;
  unit: string;
  data: DataPoint[];
  color?: string;
  type?: "line" | "area";
  showTrend?: boolean;
  normalRange?: { min: number; max: number };
}

export function HealthMetricChart({
  title,
  unit,
  data,
  color = "#F43F5E",
  type = "area",
  showTrend = true,
  normalRange,
}: HealthMetricChartProps) {
  if (data.length === 0) {
    return (
      <div className="card py-8 text-center">
        <p className="text-sm text-gray-400">Sem dados disponíveis</p>
      </div>
    );
  }

  const latestValue = data[data.length - 1]?.value ?? 0;
  const previousValue = data.length > 1 ? data[data.length - 2]?.value ?? 0 : latestValue;
  const trend = latestValue - previousValue;
  const trendPercent = previousValue !== 0 ? ((trend / previousValue) * 100).toFixed(1) : "0";

  const isInNormalRange =
    normalRange
      ? latestValue >= normalRange.min && latestValue <= normalRange.max
      : null;

  return (
    <div className="card space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">{latestValue}</span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>

        {showTrend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              trend > 0
                ? "bg-red-50 text-red-600"
                : trend < 0
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : trend < 0 ? (
              <TrendingDown className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            {trend > 0 ? "+" : ""}
            {trendPercent}%
          </div>
        )}
      </div>

      {/* Normal Range Indicator */}
      {normalRange && isInNormalRange !== null && (
        <div
          className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
            isInNormalRange
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {isInNormalRange
            ? "Dentro do intervalo normal"
            : `Fora do intervalo normal (${normalRange.min}-${normalRange.max} ${unit})`}
        </div>
      )}

      {/* Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value} ${unit}`, title]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${title})`}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value} ${unit}`, title]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, r: 3 }}
                activeDot={{ fill: color, r: 5 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
