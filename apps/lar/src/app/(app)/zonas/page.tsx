"use client";

import { useState } from "react";
import {
  ChefHat,
  Sofa,
  Bed,
  Baby,
  Bath,
  Sun,
  Car,
  Flower2,
  Archive,
  Monitor,
  Package,
  Calendar,
  User,
  Wrench,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

/* ─── Types ─── */
interface ZoneItem {
  name: string;
  quantity: number;
  category: string;
}

interface MaintenanceTask {
  id: string;
  task: string;
  dueDate: string;
  status: "pendente" | "em_andamento" | "concluída";
}

interface Zone {
  id: string;
  name: string;
  icon: typeof ChefHat;
  color: string;
  bgColor: string;
  borderColor: string;
  itemCount: number;
  lastCleaned: string;
  assignedEmployee: string;
  items: ZoneItem[];
  maintenance: MaintenanceTask[];
}

/* ─── Mock Data ─── */
const zones: Zone[] = [
  {
    id: "1",
    name: "Cozinha",
    icon: ChefHat,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-l-orange-400",
    itemCount: 42,
    lastCleaned: "2026-02-26",
    assignedEmployee: "Graça Mondlane",
    items: [
      { name: "Leite meio-gordo", quantity: 1, category: "Laticínios" },
      { name: "Arroz agulha", quantity: 2, category: "Cereais" },
      { name: "Azeite virgem extra", quantity: 2, category: "Óleos" },
      { name: "Ovos", quantity: 2, category: "Ovos" },
    ],
    maintenance: [
      { id: "m1", task: "Limpar exaustor", dueDate: "2026-03-01", status: "pendente" },
      { id: "m2", task: "Verificar gás", dueDate: "2026-02-28", status: "pendente" },
    ],
  },
  {
    id: "2",
    name: "Sala",
    icon: Sofa,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-l-blue-400",
    itemCount: 15,
    lastCleaned: "2026-02-25",
    assignedEmployee: "Graça Mondlane",
    items: [
      { name: "Almofadas decorativas", quantity: 4, category: "Decoração" },
      { name: "Controlo remoto TV", quantity: 2, category: "Electrónica" },
    ],
    maintenance: [
      { id: "m3", task: "Limpar estofos", dueDate: "2026-03-15", status: "pendente" },
    ],
  },
  {
    id: "3",
    name: "Quarto Principal",
    icon: Bed,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-l-indigo-400",
    itemCount: 18,
    lastCleaned: "2026-02-24",
    assignedEmployee: "Graça Mondlane",
    items: [
      { name: "Lençóis casal", quantity: 3, category: "Roupa de cama" },
      { name: "Almofadas", quantity: 4, category: "Roupa de cama" },
    ],
    maintenance: [
      { id: "m4", task: "Virar colchão", dueDate: "2026-03-10", status: "pendente" },
    ],
  },
  {
    id: "4",
    name: "Quarto Crianças",
    icon: Baby,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-l-pink-400",
    itemCount: 24,
    lastCleaned: "2026-02-25",
    assignedEmployee: "Graça Mondlane",
    items: [
      { name: "Brinquedos", quantity: 12, category: "Brinquedos" },
      { name: "Livros infantis", quantity: 8, category: "Livros" },
    ],
    maintenance: [],
  },
  {
    id: "5",
    name: "Casa de Banho",
    icon: Bath,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-l-cyan-400",
    itemCount: 20,
    lastCleaned: "2026-02-26",
    assignedEmployee: "Graça Mondlane",
    items: [
      { name: "Detergente roupa", quantity: 1, category: "Limpeza" },
      { name: "Toalhas de banho", quantity: 6, category: "Têxtil" },
    ],
    maintenance: [
      { id: "m5", task: "Limpar azulejos", dueDate: "2026-03-05", status: "em_andamento" },
    ],
  },
  {
    id: "6",
    name: "Varanda",
    icon: Sun,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-l-amber-400",
    itemCount: 8,
    lastCleaned: "2026-02-23",
    assignedEmployee: "Carlos Nhambe",
    items: [
      { name: "Vasos de plantas", quantity: 5, category: "Jardim" },
      { name: "Cadeiras", quantity: 4, category: "Mobiliário" },
    ],
    maintenance: [],
  },
  {
    id: "7",
    name: "Garagem",
    icon: Car,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-l-gray-400",
    itemCount: 12,
    lastCleaned: "2026-02-20",
    assignedEmployee: "Carlos Nhambe",
    items: [
      { name: "Lâmpada LED", quantity: 2, category: "Casa" },
      { name: "Ferramentas", quantity: 15, category: "Ferramentas" },
    ],
    maintenance: [
      { id: "m6", task: "Verificar portão automático", dueDate: "2026-03-01", status: "pendente" },
    ],
  },
  {
    id: "8",
    name: "Jardim",
    icon: Flower2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-l-green-400",
    itemCount: 6,
    lastCleaned: "2026-02-26",
    assignedEmployee: "Carlos Nhambe",
    items: [
      { name: "Mangueira", quantity: 1, category: "Jardim" },
      { name: "Adubo", quantity: 2, category: "Jardim" },
    ],
    maintenance: [
      { id: "m7", task: "Podar árvores", dueDate: "2026-03-20", status: "pendente" },
    ],
  },
  {
    id: "9",
    name: "Despensa",
    icon: Archive,
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-l-yellow-400",
    itemCount: 35,
    lastCleaned: "2026-02-22",
    assignedEmployee: "Graça Mondlane",
    items: [
      { name: "Arroz agulha", quantity: 2, category: "Cereais" },
      { name: "Azeite virgem extra", quantity: 2, category: "Óleos" },
      { name: "Enlatados", quantity: 8, category: "Conservas" },
    ],
    maintenance: [
      { id: "m8", task: "Verificar validades", dueDate: "2026-03-01", status: "pendente" },
    ],
  },
  {
    id: "10",
    name: "Escritório",
    icon: Monitor,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-l-violet-400",
    itemCount: 10,
    lastCleaned: "2026-02-24",
    assignedEmployee: "Graça Mondlane",
    items: [
      { name: "Computador portátil", quantity: 1, category: "Electrónica" },
      { name: "Impressora", quantity: 1, category: "Electrónica" },
    ],
    maintenance: [],
  },
];

const statusColors = {
  pendente: "bg-amber-100 text-amber-700",
  em_andamento: "bg-blue-100 text-blue-700",
  concluída: "bg-emerald-100 text-emerald-700",
};

const statusLabels = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
  concluída: "Concluída",
};

export default function ZonasPage() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const totalItems = zones.reduce((sum, z) => sum + z.itemCount, 0);
  const totalMaintenance = zones.reduce((sum, z) => sum + z.maintenance.filter((m) => m.status !== "concluída").length, 0);

  if (selectedZone) {
    const Icon = selectedZone.icon;
    return (
      <div>
        {/* Zone Detail Header */}
        <header className="bg-blue-500 pt-safe-top">
          <div className="px-4 pt-4 pb-4">
            <button
              onClick={() => setSelectedZone(null)}
              className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${selectedZone.bgColor} ${selectedZone.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{selectedZone.name}</h1>
                <p className="text-blue-100 text-sm">{selectedZone.itemCount} itens</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 pt-4 space-y-4">
          {/* Zone Info */}
          <div className="app-card grid grid-cols-2 gap-3">
            <div>
              <p className="text-2xs text-gray-400 uppercase tracking-wider">Última limpeza</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(selectedZone.lastCleaned).toLocaleDateString("pt-PT")}
              </p>
            </div>
            <div>
              <p className="text-2xs text-gray-400 uppercase tracking-wider">Responsável</p>
              <p className="text-sm font-medium text-gray-900">{selectedZone.assignedEmployee}</p>
            </div>
          </div>

          {/* Items in Zone */}
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Itens nesta zona ({selectedZone.items.length})
            </h2>
            <div className="space-y-2">
              {selectedZone.items.map((item, idx) => (
                <div key={idx} className="app-card flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{item.quantity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Maintenance Tasks */}
          {selectedZone.maintenance.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Manutenção
              </h2>
              <div className="space-y-2">
                {selectedZone.maintenance.map((task) => (
                  <div key={task.id} className="app-card flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString("pt-PT")}
                      </p>
                    </div>
                    <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>
                      {statusLabels[task.status]}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <h1 className="text-xl font-bold text-white mb-2">Zonas da Casa</h1>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-blue-100 text-2xs uppercase tracking-wider">Total Itens</p>
              <p className="text-white font-bold text-lg">{totalItems}</p>
            </div>
            <div className="flex-1 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-blue-100 text-2xs uppercase tracking-wider">Zonas</p>
              <p className="text-white font-bold text-lg">{zones.length}</p>
            </div>
            <div className="flex-1 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-blue-100 text-2xs uppercase tracking-wider">Manutenção</p>
              <p className="text-white font-bold text-lg">{totalMaintenance}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-3">
        {zones.map((zone) => {
          const Icon = zone.icon;
          const pendingMaint = zone.maintenance.filter((m) => m.status !== "concluída").length;
          const daysSinceCleaned = Math.floor(
            (new Date().getTime() - new Date(zone.lastCleaned).getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`w-full text-left app-card flex items-center gap-3 border-l-4 ${zone.borderColor} hover:shadow-md transition-all active:scale-[0.98]`}
            >
              <div className={`w-11 h-11 ${zone.bgColor} ${zone.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{zone.name}</h3>
                  {pendingMaint > 0 && (
                    <span className="bg-amber-100 text-amber-700 text-2xs font-medium px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Wrench className="w-2.5 h-2.5" />
                      {pendingMaint}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    {zone.itemCount} itens
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {daysSinceCleaned === 0
                      ? "Limpo hoje"
                      : `Há ${daysSinceCleaned} dia${daysSinceCleaned > 1 ? "s" : ""}`}
                  </span>
                </div>
                <span className="text-2xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <User className="w-3 h-3" />
                  {zone.assignedEmployee}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </button>
          );
        })}
      </main>
    </div>
  );
}
