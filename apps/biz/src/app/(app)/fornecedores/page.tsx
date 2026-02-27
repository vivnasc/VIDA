"use client";

import { useState } from "react";
import {
  Truck,
  Plus,
  Search,
  Star,
  Phone,
  Calendar,
  Package,
  Clock,
  ChevronRight,
  AlertTriangle,
  Filter,
} from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  phone: string;
  products: string;
  paymentTerms: string;
  deliveryTime: string;
  visitDay?: string;
  rating: number;
  lastOrder?: string;
  notes?: string;
}

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: "1", name: "Beauty World", phone: "+258 84 100 2000",
    products: "Cremes, extensões, vernizes", paymentTerms: "50% adiantado",
    deliveryTime: "2-3 dias", visitDay: "Terças", rating: 5,
    lastOrder: "2026-02-20", notes: "Liga 1 dia antes para confirmar stock",
  },
  {
    id: "2", name: "HairPro Moçambique", phone: "+258 82 300 4000",
    products: "Extensões, cabelo sintético", paymentTerms: "Pronto pagamento",
    deliveryTime: "1-2 dias", visitDay: "Quintas", rating: 4,
    lastOrder: "2026-02-15",
  },
  {
    id: "3", name: "Cosmética Maputo", phone: "+258 86 500 6000",
    products: "Shampoos, tinturas, base makeup", paymentTerms: "30 dias",
    deliveryTime: "3-5 dias", rating: 4,
    lastOrder: "2026-02-10",
  },
  {
    id: "4", name: "NailArt Supply", phone: "+258 84 700 8000",
    products: "Verniz gel, UV lamp, acessórios unhas", paymentTerms: "Pronto pagamento M-Pesa",
    deliveryTime: "Imediato (loja)", rating: 5,
    lastOrder: "2026-02-25",
  },
];

export default function FornecedoresPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_SUPPLIERS.filter((s) =>
    !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.products.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
        {/* Upcoming Visits */}
        {MOCK_SUPPLIERS.filter((s) => s.visitDay).length > 0 && (
          <section className="card p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <h3 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendário de Visitas
            </h3>
            <div className="space-y-1.5">
              {MOCK_SUPPLIERS.filter((s) => s.visitDay).map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <span className="text-orange-700">{s.visitDay}</span>
                  <span className="font-medium text-orange-800">{s.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Supplier List */}
        <div className="space-y-3">
          {filtered.map((supplier) => {
            const formattedDate = supplier.lastOrder
              ? new Date(supplier.lastOrder + "T00:00:00").toLocaleDateString("pt-MZ", { day: "numeric", month: "short" })
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
                      {supplier.products}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                    <Clock className="w-3 h-3" />
                    <span>Entrega: {supplier.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                    <Package className="w-3 h-3" />
                    <span>{supplier.paymentTerms}</span>
                  </div>
                  {supplier.visitDay && (
                    <div className="flex items-center gap-1.5 text-orange-600 font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>Visita: {supplier.visitDay}</span>
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
                    💡 {supplier.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Nenhum fornecedor encontrado
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
