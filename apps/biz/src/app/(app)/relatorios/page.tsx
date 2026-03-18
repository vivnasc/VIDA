"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  Star,
  FileBarChart,
} from "lucide-react";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getDashboardData, getProducts, getCustomers, type DashboardData } from "@/lib/supabase";
import type { Product, BusinessCustomer } from "@vida/database/types/business";

type Period = "semanal" | "mensal" | "trimestral" | "anual";

export default function RelatoriosPage() {
  const { business } = useBusiness();
  const [period, setPeriod] = useState<Period>("mensal");

  const { data: dashboard } = useQuery<DashboardData>(
    (supabase) => getDashboardData(supabase, business!.id),
    [business?.id],
  );
  const { data: products } = useQuery<Product[]>(
    (supabase) => getProducts(supabase, business!.id),
    [business?.id],
  );
  const { data: customers } = useQuery<BusinessCustomer[]>(
    (supabase) => getCustomers(supabase, business!.id),
    [business?.id],
  );

  const monthSales = dashboard?.month.sales ?? 0;
  const monthExpenses = dashboard?.month.expenses ?? 0;
  const monthProfit = monthSales - monthExpenses;
  const profitMargin = monthSales > 0 ? Math.round((monthProfit / monthSales) * 100) : 0;
  const totalTransactions = dashboard?.today.recentSales.length ?? 0;
  const customerCount = customers?.length ?? 0;
  const avgSaleValue = totalTransactions > 0 ? Math.round(dashboard!.today.sales / totalTransactions) : 0;

  const topProducts = (products ?? [])
    .map((p) => ({
      name: p.name,
      revenue: p.sell_price * (p.quantity > 0 ? 1 : 0),
      margin: p.sell_price > 0 ? Math.round(((p.sell_price - p.cost_price) / p.sell_price) * 100) : 0,
    }))
    .sort((a, b) => b.margin - a.margin)
    .slice(0, 5);

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
              Margem: {profitMargin}%{avgSaleValue > 0 ? ` • Média/venda: ${avgSaleValue.toLocaleString("pt-MZ")} MZN` : ""}
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
            <p className="text-2xs text-[var(--color-text-muted)]">Fiado</p>
            <p className="text-lg font-bold text-violet-600">{(dashboard?.fiado.totalDebt ?? 0).toLocaleString("pt-MZ")}</p>
          </div>
        </div>

        {/* Top Products */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary-500" />
            Produtos/Serviços Mais Vendidos
          </h3>
          <div className="space-y-3">
            {topProducts.length > 0 ? topProducts.map((product, index) => {
              const maxMargin = topProducts[0]!.margin || 1;
              const barWidth = (product.margin / maxMargin) * 100;
              const medals = ["🥇", "🥈", "🥉"];

              return (
                <div key={product.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">
                      {index < 3 ? medals[index] : `${index + 1}.`} {product.name}
                    </span>
                    <span className="font-semibold text-primary-600">
                      Margem {product.margin}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-400 rounded-full"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            }) : (
              <p className="text-sm text-[var(--color-text-muted)] text-center py-2">Sem dados de produtos</p>
            )}
          </div>
        </section>

        {/* Summary Cards */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-500" />
            Resumo de Hoje
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-2xs text-emerald-600">Vendas Hoje</p>
              <p className="font-bold text-emerald-700">{(dashboard?.today.sales ?? 0).toLocaleString("pt-MZ")} MZN</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-2xs text-red-600">Despesas Hoje</p>
              <p className="font-bold text-red-700">{(dashboard?.today.expenses ?? 0).toLocaleString("pt-MZ")} MZN</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-2xs text-blue-600">Cash</p>
              <p className="font-bold text-blue-700">{(dashboard?.today.cash ?? 0).toLocaleString("pt-MZ")} MZN</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <p className="text-2xs text-purple-600">M-Pesa</p>
              <p className="font-bold text-purple-700">{(dashboard?.today.mpesa ?? 0).toLocaleString("pt-MZ")} MZN</p>
            </div>
          </div>
        </section>

        {/* Stock Alerts */}
        {(dashboard?.stock.lowStockItems.length ?? 0) > 0 && (
          <section className="card p-4 bg-amber-50 border-amber-200">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-amber-800">
              <Package className="w-4 h-4" />
              Alertas de Stock
            </h3>
            <div className="space-y-1.5">
              {dashboard!.stock.lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">{item.name}</span>
                  <span className="font-medium text-amber-800">{item.quantity} {item.unit ?? "un"} restante(s)</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Business Question Answers */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3">Perguntas Respondidas</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-xs text-emerald-600 font-medium mb-1">
                Quanto ganhei REALMENTE este mês?
              </p>
              <p className="font-bold text-emerald-700">
                {monthProfit.toLocaleString("pt-MZ")} MZN {profitMargin > 0 ? `(margem ${profitMargin}%)` : ""}
              </p>
            </div>
            {topProducts.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">
                  Qual produto/serviço dá mais margem?
                </p>
                <p className="font-bold text-blue-700">
                  {topProducts[0]!.name} — margem {topProducts[0]!.margin}%
                </p>
              </div>
            )}
            <div className="bg-purple-50 rounded-xl p-3">
              <p className="text-xs text-purple-600 font-medium mb-1">
                Total de clientes registados
              </p>
              <p className="font-bold text-purple-700">
                {customerCount} clientes • {(dashboard?.fiado.count ?? 0)} com fiado em aberto
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
