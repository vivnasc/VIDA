"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Star,
  Users,
  Crown,
  Heart,
  UserPlus,
  Phone,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useBusiness } from "@/hooks/use-business";
import { createBrowserClient } from "@vida/auth/client";
import { getCustomers } from "@/lib/supabase";

interface Customer {
  id: string;
  name: string;
  phone: string;
  category: "vip" | "fiel" | "regular" | "nova";
  totalSpent: number;
  visits: number;
  lastVisit: string;
  favoriteService?: string;
  loyaltyPoints: number;
  debt: number;
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: "1", name: "Maria João", phone: "+258 84 123 4567", category: "vip", totalSpent: 45000, visits: 28, lastVisit: "2026-02-25", favoriteService: "Tranças", loyaltyPoints: 280, debt: 0 },
  { id: "2", name: "Ana Silva", phone: "+258 82 987 6543", category: "fiel", totalSpent: 22000, visits: 15, lastVisit: "2026-02-27", favoriteService: "Unhas gel", loyaltyPoints: 150, debt: 0 },
  { id: "3", name: "Sofia Manuel", phone: "+258 84 555 1234", category: "regular", totalSpent: 12000, visits: 8, lastVisit: "2026-02-20", favoriteService: "Corte", loyaltyPoints: 80, debt: 650 },
  { id: "4", name: "Beatriz Costa", phone: "+258 86 111 2222", category: "vip", totalSpent: 38000, visits: 22, lastVisit: "2026-02-27", favoriteService: "Alisamento", loyaltyPoints: 220, debt: 0 },
  { id: "5", name: "Carla Tembe", phone: "+258 84 333 4444", category: "regular", totalSpent: 8500, visits: 6, lastVisit: "2026-02-15", favoriteService: "Makeup", loyaltyPoints: 60, debt: 1200 },
  { id: "6", name: "Lurdes Machel", phone: "+258 82 666 7777", category: "nova", totalSpent: 2400, visits: 3, lastVisit: "2026-02-10", favoriteService: "Sobrancelhas", loyaltyPoints: 30, debt: 0 },
  { id: "7", name: "Graça Mondlane", phone: "+258 84 888 9999", category: "fiel", totalSpent: 18000, visits: 12, lastVisit: "2026-02-22", favoriteService: "Hidratação", loyaltyPoints: 120, debt: 800 },
];

type FilterCategory = "all" | "vip" | "fiel" | "regular" | "nova";

const CATEGORY_CONFIG = {
  vip: { label: "VIP", icon: Crown, color: "text-amber-600", bg: "bg-amber-100", border: "border-amber-200" },
  fiel: { label: "Fiel", icon: Star, color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200" },
  regular: { label: "Regular", icon: Heart, color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200" },
  nova: { label: "Nova", icon: UserPlus, color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-200" },
};

export default function ClientesPage() {
  const { business } = useBusiness();
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterCategory>("all");

  useEffect(() => {
    if (!business?.id) return;
    const supabase = createBrowserClient();
    getCustomers(supabase, business.id)
      .then((data) => {
        const mapped: Customer[] = data.map((c: any) => ({
          id: c.id,
          name: c.name ?? "",
          phone: c.phone ?? "",
          category: c.category ?? "regular",
          totalSpent: Number(c.total_spent) || 0,
          visits: Number(c.visit_count) || 0,
          lastVisit: c.last_visit ?? c.updated_at ?? "",
          favoriteService: undefined,
          loyaltyPoints: 0,
          debt: Number(c.current_debt) || 0,
        }));
        if (mapped.length > 0) setCustomers(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [business?.id]);

  const filtered = customers.filter((c) => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter !== "all" && c.category !== filter) return false;
    return true;
  });

  const totalCustomers = customers.length;
  const vipCount = customers.filter((c) => c.category === "vip").length;
  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Clientes</h1>
          <button className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar cliente..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {[
            { key: "all" as FilterCategory, label: "Todos" },
            { key: "vip" as FilterCategory, label: "VIP", icon: Crown },
            { key: "fiel" as FilterCategory, label: "Fiel", icon: Star },
            { key: "regular" as FilterCategory, label: "Regular", icon: Heart },
            { key: "nova" as FilterCategory, label: "Nova", icon: UserPlus },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
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
        {/* Summary */}
        <div className="flex gap-3">
          <div className="flex-1 card p-3 text-center">
            <Users className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Total</p>
            <p className="text-sm font-bold">{totalCustomers}</p>
          </div>
          <div className="flex-1 card p-3 text-center">
            <Crown className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">VIP</p>
            <p className="text-sm font-bold text-amber-600">{vipCount}</p>
          </div>
          <div className="flex-1 card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Receita Total</p>
            <p className="text-sm font-bold text-emerald-600">
              {(totalRevenue / 1000).toFixed(0)}k
            </p>
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-2">
          {filtered.map((customer) => {
            const config = CATEGORY_CONFIG[customer.category];
            const CategoryIcon = config.icon;
            const formattedDate = new Date(customer.lastVisit + "T00:00:00").toLocaleDateString("pt-MZ", { day: "numeric", month: "short" });

            return (
              <div key={customer.id} className="card p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-sm font-bold">{customer.name[0]}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{customer.name}</p>
                      <span className={`text-2xs font-medium px-1.5 py-0.5 rounded-md ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {customer.visits} visitas
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {formattedDate}
                      </span>
                      {customer.favoriteService && (
                        <>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {customer.favoriteService}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold">
                      {customer.totalSpent.toLocaleString("pt-MZ")}
                    </p>
                    {customer.debt > 0 && (
                      <p className="text-2xs text-violet-600 font-medium">
                        Fiado: {customer.debt.toLocaleString("pt-MZ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Nenhum cliente encontrado
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
