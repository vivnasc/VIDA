"use client";

import { useState } from "react";
import { Plus, AlertCircle, Calendar, Phone } from "lucide-react";
import { MaintenanceItem } from "@/components/maintenance-item";
import { ZoneFilter } from "@/components/zone-filter";

interface MaintenanceTask {
  id: string;
  title: string;
  zone: string;
  nextDue: string;
  priority: "high" | "medium" | "low";
  provider?: {
    name: string;
    phone: string;
  };
  overdue: boolean;
  description?: string;
}

const mockTasks: MaintenanceTask[] = [
  {
    id: "1",
    title: "Revisão da caldeira",
    zone: "Cozinha",
    nextDue: "2026-02-20",
    priority: "high",
    provider: { name: "TecniGás", phone: "+351 912 345 678" },
    overdue: true,
    description: "Revisão anual obrigatória",
  },
  {
    id: "2",
    title: "Limpeza do ar condicionado",
    zone: "Sala",
    nextDue: "2026-02-22",
    priority: "high",
    overdue: true,
    description: "Filtros e gás",
  },
  {
    id: "3",
    title: "Desentupir ralo",
    zone: "Casa de Banho",
    nextDue: "2026-03-01",
    priority: "medium",
    overdue: false,
  },
  {
    id: "4",
    title: "Pintura exterior",
    zone: "Exterior",
    nextDue: "2026-04-15",
    priority: "low",
    provider: { name: "PintoCor", phone: "+351 913 456 789" },
    overdue: false,
    description: "Fachada principal e varanda",
  },
  {
    id: "5",
    title: "Verificação elétrica",
    zone: "Garagem",
    nextDue: "2026-03-10",
    priority: "medium",
    provider: { name: "ElectroFix", phone: "+351 914 567 890" },
    overdue: false,
    description: "Quadro elétrico e tomadas",
  },
  {
    id: "6",
    title: "Limpar calhas",
    zone: "Exterior",
    nextDue: "2026-03-20",
    priority: "low",
    overdue: false,
  },
  {
    id: "7",
    title: "Reparar torneira",
    zone: "Cozinha",
    nextDue: "2026-03-05",
    priority: "medium",
    overdue: false,
    description: "Torneira a pingar",
  },
];

export default function ManutencaoPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const filteredTasks = mockTasks.filter(
    (task) => !selectedZone || task.zone === selectedZone
  );

  const overdueTasks = filteredTasks.filter((t) => t.overdue);
  const upcomingTasks = filteredTasks.filter((t) => !t.overdue);

  // Unique providers
  const providers = mockTasks
    .filter((t) => t.provider)
    .reduce(
      (acc, t) => {
        if (t.provider && !acc.find((p) => p.name === t.provider!.name)) {
          acc.push(t.provider);
        }
        return acc;
      },
      [] as { name: string; phone: string }[]
    );

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <h1 className="text-xl font-bold text-white">Manutenção</h1>
          <p className="text-blue-100 text-sm mt-0.5">
            {overdueTasks.length > 0
              ? `${overdueTasks.length} tarefa${overdueTasks.length > 1 ? "s" : ""} atrasada${overdueTasks.length > 1 ? "s" : ""}`
              : "Tudo em dia"}
          </p>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-5">
        {/* Zone Filter */}
        <ZoneFilter
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
        />

        {/* Overdue Tasks */}
        {overdueTasks.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Atrasadas ({overdueTasks.length})
            </h2>
            <div className="space-y-3">
              {overdueTasks.map((task) => (
                <MaintenanceItem key={task.id} task={task} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Tasks */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            Próximas ({upcomingTasks.length})
          </h2>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <MaintenanceItem key={task.id} task={task} />
            ))}
          </div>
        </section>

        {/* Service Providers */}
        {providers.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              Contactos de serviço
            </h2>
            <div className="app-card divide-y divide-gray-100">
              {providers.map((provider) => (
                <div
                  key={provider.name}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {provider.name}
                    </p>
                    <p className="text-xs text-gray-500">{provider.phone}</p>
                  </div>
                  <a
                    href={`tel:${provider.phone}`}
                    className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              Nenhuma tarefa de manutenção
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Adiciona tarefas para manter a tua casa em dia
            </p>
          </div>
        )}
      </main>

      {/* FAB - Add Task */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 active:bg-blue-700 transition-colors z-30">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
