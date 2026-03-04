"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Star,
  Users,
  Crown,
  Heart,
  UserPlus,
  Filter,
} from "lucide-react";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getCustomers } from "@/lib/supabase";
import type { BusinessCustomer, CustomerCategory } from "@vida/database/types/business";
import { AddCustomerModal } from "@/components/add-customer-modal";

type FilterCategory = "all" | CustomerCategory;

const CATEGORY_CONFIG: Record<CustomerCategory, { label: string; icon: typeof Crown; color: string; bg: string }> = {
  vip: { label: "VIP", icon: Crown, color: "text-amber-600", bg: "bg-amber-100" },
  fiel: { label: "Fiel", icon: Star, color: "text-blue-600", bg: "bg-blue-100" },
  regular: { label: "Regular", icon: Heart, color: "text-emerald-600", bg: "bg-emerald-100" },
  nova: { label: "Nova", icon: UserPlus, color: "text-purple-600", bg: "bg-purple-100" },
};

export default function ClientesPage() {
  const { business } = useBusiness();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [showAdd, setShowAdd] = useState(false);

  const { data: customers, loading } = useQuery<BusinessCustomer[]>(
    (supabase) => getCustomers(supabase, business!.id),
    [business?.id],
  );

  const customerList = customers ?? [];

  const filtered = customerList.filter((c) => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter !== "all" && c.category !== filter) return false;
    return true;
  });

  const totalCustomers = customerList.length;
  const vipCount = customerList.filter((c) => c.category === "vip").length;
  const totalRevenue = customerList.reduce((s, c) => s + c.total_spent, 0);

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Clientes</h1>
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

        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((customer) => {
              const config = CATEGORY_CONFIG[customer.category];
              const formattedDate = customer.last_visit
                ? new Date(customer.last_visit + "T00:00:00").toLocaleDateString("pt-MZ", { day: "numeric", month: "short" })
                : null;

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
                          {customer.visit_count} visitas
                        </span>
                        {formattedDate && (
                          <>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-xs text-[var(--color-text-muted)]">
                              {formattedDate}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold">
                        {customer.total_spent.toLocaleString("pt-MZ")}
                      </p>
                      {customer.current_debt > 0 && (
                        <p className="text-2xs text-violet-600 font-medium">
                          Fiado: {customer.current_debt.toLocaleString("pt-MZ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              {loading ? "A carregar..." : "Nenhum cliente encontrado"}
            </p>
          </div>
        )}
      </main>

      {showAdd && <AddCustomerModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
