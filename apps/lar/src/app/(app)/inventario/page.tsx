"use client";

import { useState } from "react";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { InventoryCard } from "@/components/inventory-card";
import { ZoneFilter } from "@/components/zone-filter";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  zone: string;
  category: string;
  expiryDate?: string;
  lowStock: boolean;
  photo?: string;
}

const mockItems: InventoryItem[] = [
  {
    id: "1",
    name: "Leite meio-gordo",
    quantity: 1,
    unit: "L",
    zone: "Cozinha",
    category: "Laticínios",
    expiryDate: "2026-03-01",
    lowStock: true,
  },
  {
    id: "2",
    name: "Arroz agulha",
    quantity: 2,
    unit: "kg",
    zone: "Despensa",
    category: "Cereais",
    lowStock: false,
  },
  {
    id: "3",
    name: "Iogurtes naturais",
    quantity: 4,
    unit: "un",
    zone: "Cozinha",
    category: "Laticínios",
    expiryDate: "2026-02-27",
    lowStock: false,
  },
  {
    id: "4",
    name: "Peito de frango",
    quantity: 1,
    unit: "kg",
    zone: "Cozinha",
    category: "Carnes",
    expiryDate: "2026-02-26",
    lowStock: false,
  },
  {
    id: "5",
    name: "Detergente roupa",
    quantity: 1,
    unit: "L",
    zone: "Casa de Banho",
    category: "Limpeza",
    lowStock: true,
  },
  {
    id: "6",
    name: "Azeite virgem extra",
    quantity: 2,
    unit: "L",
    zone: "Despensa",
    category: "Óleos",
    lowStock: false,
  },
  {
    id: "7",
    name: "Ovos",
    quantity: 2,
    unit: "un",
    zone: "Cozinha",
    category: "Ovos",
    expiryDate: "2026-03-10",
    lowStock: true,
  },
  {
    id: "8",
    name: "Pão de forma",
    quantity: 1,
    unit: "un",
    zone: "Cozinha",
    category: "Padaria",
    expiryDate: "2026-02-28",
    lowStock: false,
  },
  {
    id: "9",
    name: "Toalhas de papel",
    quantity: 3,
    unit: "rolos",
    zone: "Cozinha",
    category: "Limpeza",
    lowStock: false,
  },
  {
    id: "10",
    name: "Lâmpada LED",
    quantity: 2,
    unit: "un",
    zone: "Garagem",
    category: "Casa",
    lowStock: false,
  },
];

export default function InventarioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesZone = !selectedZone || item.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const lowStockItems = filteredItems.filter((item) => item.lowStock);
  const normalItems = filteredItems.filter((item) => !item.lowStock);

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <h1 className="text-xl font-bold text-white mb-3">Inventário</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
            <input
              type="text"
              placeholder="Pesquisar itens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white/20 text-white placeholder:text-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                showFilters ? "bg-white/30" : "hover:bg-white/10"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Zone Filters */}
        <ZoneFilter
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />

        {/* Low Stock Warning */}
        {lowStockItems.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Stock baixo ({lowStockItems.length})
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {lowStockItems.map((item) => (
                <InventoryCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* All Items */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Todos os itens ({normalItems.length})
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {normalItems.map((item) => (
              <InventoryCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Nenhum item encontrado</p>
            <p className="text-gray-400 text-xs mt-1">
              Tenta ajustar a pesquisa ou os filtros
            </p>
          </div>
        )}
      </main>

      {/* FAB - Add Item */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 active:bg-blue-700 transition-colors z-30">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

function Package(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
