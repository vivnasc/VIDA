"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getProducts } from "@/lib/supabase";
import type { Product } from "@vida/database/types/business";
import { AddProductModal } from "@/components/add-product-modal";

type FilterType = "all" | "low" | "ok" | "high_margin";

export default function StockPage() {
  const { business } = useBusiness();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [showAdd, setShowAdd] = useState(false);

  const { data: products, loading } = useQuery<Product[]>(
    (supabase) => getProducts(supabase, business!.id),
    [business?.id],
  );

  const productList = products ?? [];

  const filteredProducts = productList.filter((p) => {
    const margin = p.sell_price > 0
      ? Math.round(((p.sell_price - p.cost_price) / p.sell_price) * 100)
      : 0;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter === "low" && p.quantity >= p.min_stock) return false;
    if (filter === "high_margin" && margin < 80) return false;
    return true;
  });

  const totalValue = productList.reduce((s, p) => s + p.sell_price * p.quantity, 0);
  const totalCost = productList.reduce((s, p) => s + p.cost_price * p.quantity, 0);
  const lowStockCount = productList.filter((p) => p.quantity < p.min_stock).length;
  const totalItems = productList.reduce((s, p) => s + p.quantity, 0);

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Stock / Inventário</h1>
          <button onClick={() => setShowAdd(true)} className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar produto..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex gap-2">
          {[
            { key: "all" as FilterType, label: "Todos" },
            { key: "low" as FilterType, label: "Stock Baixo", icon: AlertTriangle },
            { key: "high_margin" as FilterType, label: "Alta Margem", icon: TrendingUp },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === key
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {Icon && <Icon className="w-3 h-3" />}
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-3 text-center">
            <Package className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Total Itens</p>
            <p className="text-sm font-bold">{totalItems}</p>
          </div>
          <div className="card p-3 text-center">
            <BarChart3 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Valor Stock</p>
            <p className="text-sm font-bold text-emerald-600">
              {(totalValue / 1000).toFixed(0)}k MZN
            </p>
          </div>
          <div className="card p-3 text-center">
            <TrendingUp className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Custo Total</p>
            <p className="text-sm font-bold text-blue-600">
              {(totalCost / 1000).toFixed(0)}k MZN
            </p>
          </div>
          <div className="card p-3 text-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Stock Baixo</p>
            <p className="text-sm font-bold text-amber-600">{lowStockCount}</p>
          </div>
        </div>

        <section>
          <h3 className="text-sm font-semibold mb-2">
            Produtos ({filteredProducts.length})
          </h3>
          {filteredProducts.length > 0 ? (
            <div className="space-y-2">
              {filteredProducts.map((product) => {
                const isLow = product.quantity < product.min_stock;
                const isCritical = product.quantity < product.min_stock * 0.5;
                const margin = product.sell_price > 0
                  ? Math.round(((product.sell_price - product.cost_price) / product.sell_price) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className={`card p-3 ${
                      isCritical
                        ? "border-red-200 bg-red-50/50"
                        : isLow
                          ? "border-amber-200 bg-amber-50/50"
                          : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {product.name}
                        </p>
                        <p className="text-2xs text-[var(--color-text-muted)]">
                          {product.category}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-2xs text-[var(--color-text-muted)]">Qty</p>
                          <p className={`text-sm font-bold ${
                            isCritical ? "text-red-600" : isLow ? "text-amber-600" : ""
                          }`}>
                            {product.quantity} {product.unit ?? "un"}
                          </p>
                        </div>
                        <div>
                          <p className="text-2xs text-[var(--color-text-muted)]">Preço</p>
                          <p className="text-sm font-medium">
                            {product.sell_price.toLocaleString("pt-MZ")}
                          </p>
                        </div>
                        <div>
                          <p className="text-2xs text-[var(--color-text-muted)]">Margem</p>
                          <p className="text-sm font-medium text-emerald-600">
                            {margin}%
                          </p>
                        </div>
                      </div>
                      {isLow && (
                        <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${
                          isCritical
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {isCritical ? "Crítico" : "Baixo"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                {loading ? "A carregar..." : "Nenhum produto encontrado"}
              </p>
            </div>
          )}
        </section>
      </main>

      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
