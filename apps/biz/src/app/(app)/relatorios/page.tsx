"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Package,
  Users,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Scissors,
  FileBarChart,
} from "lucide-react";

type Period = "semanal" | "mensal" | "trimestral" | "anual";

const MOCK_TOP_PRODUCTS = [
  { name: "Tranças", revenue: 42000, sales: 28, margin: 88 },
  { name: "Alisamento", revenue: 35000, sales: 14, margin: 86 },
  { name: "Unhas gel", revenue: 18000, sales: 30, margin: 87 },
  { name: "Corte + escova", revenue: 15200, sales: 19, margin: 81 },
  { name: "Makeup", revenue: 12000, sales: 10, margin: 83 },
];

const MOCK_PEAK_HOURS = [
  { hour: "09h-11h", percentage: 20, label: "Manhã" },
  { hour: "11h-13h", percentage: 15, label: "Meio-dia" },
  { hour: "14h-16h", percentage: 25, label: "Tarde" },
  { hour: "16h-18h", percentage: 30, label: "Fim tarde" },
  { hour: "18h-20h", percentage: 10, label: "Noite" },
];

const MOCK_BEST_DAYS = [
  { day: "Segunda", percentage: 10 },
  { day: "Terça", percentage: 8 },
  { day: "Quarta", percentage: 12 },
  { day: "Quinta", percentage: 15 },
  { day: "Sexta", percentage: 30 },
  { day: "Sábado", percentage: 25 },
];

export default function RelatoriosPage() {
  const [period, setPeriod] = useState<Period>("mensal");

  const monthSales = 145000;
  const monthExpenses = 52760;
  const monthProfit = monthSales - monthExpenses;
  const profitMargin = Math.round((monthProfit / monthSales) * 100);
  const avgSaleValue = 1640;
  const totalTransactions = 88;
  const customerCount = 45;
  const repeatRate = 68;

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Relatórios</h1>
          <Link
            href="/relatorios/gerar"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-500 text-white text-xs font-medium"
          >
            <FileBarChart className="w-3.5 h-3.5" />
            Exportar PDF
          </Link>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {(["semanal", "mensal", "trimestral", "anual"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                period === p
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Main Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center">
            <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-xs text-[var(--color-text-muted)]">Vendas</p>
            <p className="text-xl font-bold text-emerald-600">
              {(monthSales / 1000).toFixed(0)}k
            </p>
            <p className="text-2xs text-emerald-500">+12.5% vs mês anterior</p>
          </div>
          <div className="card p-4 text-center">
            <TrendingDown className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-xs text-[var(--color-text-muted)]">Despesas</p>
            <p className="text-xl font-bold text-red-500">
              {(monthExpenses / 1000).toFixed(0)}k
            </p>
            <p className="text-2xs text-red-400">-3.2% vs mês anterior</p>
          </div>
        </div>

        {/* Profit Card */}
        <div className="card p-4 bg-gradient-to-r from-primary-50 to-amber-50 border-primary-200">
          <div className="text-center">
            <p className="text-xs text-primary-600 font-medium">Lucro Líquido</p>
            <p className="text-2xl font-bold text-primary-700">
              {monthProfit.toLocaleString("pt-MZ")} MZN
            </p>
            <p className="text-xs text-primary-500">
              Margem: {profitMargin}% • Média/venda: {avgSaleValue.toLocaleString("pt-MZ")} MZN
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-3 text-center">
            <p className="text-2xs text-[var(--color-text-muted)]">Transacções</p>
            <p className="text-lg font-bold">{totalTransactions}</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xs text-[var(--color-text-muted)]">Clientes</p>
            <p className="text-lg font-bold">{customerCount}</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-2xs text-[var(--color-text-muted)]">Repetição</p>
            <p className="text-lg font-bold text-emerald-600">{repeatRate}%</p>
          </div>
        </div>

        {/* Top Products */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary-500" />
            Produtos/Serviços Mais Vendidos
          </h3>
          <div className="space-y-3">
            {MOCK_TOP_PRODUCTS.map((product, index) => {
              const maxRevenue = MOCK_TOP_PRODUCTS[0]!.revenue;
              const barWidth = (product.revenue / maxRevenue) * 100;
              const medals = ["🥇", "🥈", "🥉"];

              return (
                <div key={product.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">
                      {index < 3 ? medals[index] : `${index + 1}.`} {product.name}
                    </span>
                    <span className="font-semibold text-primary-600">
                      {(product.revenue / 1000).toFixed(0)}k MZN
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-400 rounded-full"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="text-2xs text-[var(--color-text-muted)] w-20 text-right">
                      {product.sales}x • {product.margin}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Peak Hours */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-500" />
            Horários Pico
          </h3>
          <div className="flex items-end gap-2 h-32">
            {MOCK_PEAK_HOURS.map((slot) => (
              <div key={slot.hour} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-2xs font-bold text-primary-600">
                  {slot.percentage}%
                </span>
                <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative" style={{ height: "100%" }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-primary-500 to-primary-300 rounded-t-lg transition-all"
                    style={{ height: `${slot.percentage * 3}%` }}
                  />
                </div>
                <span className="text-2xs text-[var(--color-text-muted)] text-center leading-tight">
                  {slot.hour}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Best Days */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-500" />
            Melhores Dias
          </h3>
          <div className="space-y-2">
            {MOCK_BEST_DAYS.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <span className="text-xs w-16 text-[var(--color-text-muted)]">
                  {day.day}
                </span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      day.percentage >= 25
                        ? "bg-emerald-500"
                        : day.percentage >= 15
                          ? "bg-primary-400"
                          : "bg-gray-300"
                    }`}
                    style={{ width: `${day.percentage * 3}%` }}
                  />
                </div>
                <span className="text-xs font-medium w-8 text-right">
                  {day.percentage}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Business Question Answers */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3">Perguntas Respondidas</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-xs text-emerald-600 font-medium mb-1">
                Quanto ganhei REALMENTE este mês?
              </p>
              <p className="font-bold text-emerald-700">
                {monthProfit.toLocaleString("pt-MZ")} MZN (margem {profitMargin}%)
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-blue-600 font-medium mb-1">
                Qual serviço dá mais lucro?
              </p>
              <p className="font-bold text-blue-700">
                Tranças — 42.000 MZN/mês (margem 88%)
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3">
              <p className="text-xs text-purple-600 font-medium mb-1">
                Quando vendo mais?
              </p>
              <p className="font-bold text-purple-700">
                Sextas (30%) e Sábados (25%), entre 16h-18h
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
