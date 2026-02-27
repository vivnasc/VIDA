"use client";

import { useState } from "react";
import {
  Truck,
  Plus,
  Search,
  Star,
  Calendar,
  Package,
  Clock,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getSuppliers } from "@/lib/supabase";
import type { Supplier } from "@/lib/types/business";

export default function FornecedoresPage() {
  const { business } = useBusiness();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: suppliers, loading } = useQuery<Supplier[]>(
    (supabase) => getSuppliers(supabase, business!.id),
    [business?.id],
  );

  const supplierList = suppliers ?? [];

  const filtered = supplierList.filter((s) =>
    !searchQuery ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.products_supplied ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const suppliersWithVisitDay = supplierList.filter((s) => s.visit_day);

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Fornecedores</h1>
          <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar fornecedor ou produto..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {suppliersWithVisitDay.length > 0 && (
          <section className="card p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <h3 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendário de Visitas
            </h3>
            <div className="space-y-1.5">
              {suppliersWithVisitDay.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <span className="text-orange-700">{s.visit_day}</span>
                  <span className="font-medium text-orange-800">{s.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((supplier) => {
              const formattedDate = supplier.last_order_date
                ? new Date(supplier.last_order_date + "T00:00:00").toLocaleDateString("pt-MZ", { day: "numeric", month: "short" })
                : null;

              return (
                <div key={supplier.id} className="card p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{supplier.name}</p>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          {Array.from({ length: supplier.rating }).map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        {supplier.products_supplied}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {supplier.delivery_time && (
                      <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                        <Clock className="w-3 h-3" />
                        <span>Entrega: {supplier.delivery_time}</span>
                      </div>
                    )}
                    {supplier.payment_terms && (
                      <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                        <Package className="w-3 h-3" />
                        <span>{supplier.payment_terms}</span>
                      </div>
                    )}
                    {supplier.visit_day && (
                      <div className="flex items-center gap-1.5 text-orange-600 font-medium">
                        <Calendar className="w-3 h-3" />
                        <span>Visita: {supplier.visit_day}</span>
                      </div>
                    )}
                    {formattedDate && (
                      <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                        <span>Último pedido: {formattedDate}</span>
                      </div>
                    )}
                  </div>

                  {supplier.notes && (
                    <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-2 py-1.5 mt-2">
                      {supplier.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              {loading ? "A carregar..." : "Nenhum fornecedor encontrado"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
