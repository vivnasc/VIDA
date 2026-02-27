"use client";

import { useState } from "react";
import {
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Filter,
  MessageSquare,
} from "lucide-react";
import { FiadoCard } from "@/components/fiado-card";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getActiveDebts, type DebtWithCustomer } from "@/lib/supabase";

type FilterStatus = "all" | "ok" | "attention" | "critical";
type DerivedStatus = "ok" | "attention" | "critical";

const COLLECTION_MESSAGES = [
  "Oi [nome], lembra que tens [valor] em aberto. Quando puderes passar?",
  "Olá [nome], espero que estejas bem! Só para lembrar do teu saldo de [valor]. Obrigado!",
  "Oi [nome], teu crédito está quase no limite. Podes regularizar antes de nova compra?",
];

function deriveStatus(debt: DebtWithCustomer): DerivedStatus {
  if (debt.status === "overdue" || debt.status === "critical") return "critical";
  if (debt.due_date) {
    const due = new Date(debt.due_date);
    const now = new Date();
    const daysUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (daysUntilDue < 0) return "critical";
    if (daysUntilDue < 7) return "attention";
  }
  return "ok";
}

export default function FiadoPage() {
  const { business } = useBusiness();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const { data: debts, loading } = useQuery<DebtWithCustomer[]>(
    (supabase) => getActiveDebts(supabase, business!.id),
    [business?.id],
  );

  const debtList = debts ?? [];

  const enrichedDebts = debtList.map((d) => ({
    id: d.id,
    customer: d.customer?.name ?? "Desconhecido",
    amount: d.amount,
    paidAmount: d.paid_amount,
    dueDate: d.due_date
      ? new Date(d.due_date).toLocaleDateString("pt-MZ", { day: "numeric", month: "short" })
      : undefined,
    status: deriveStatus(d),
    phone: d.customer?.phone ?? "",
  }));

  const filtered = enrichedDebts.filter((f) => {
    if (searchQuery && !f.customer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter !== "all" && f.status !== filter) return false;
    return true;
  });

  const totalFiado = enrichedDebts.reduce((s, f) => s + f.amount, 0);
  const totalClients = enrichedDebts.length;
  const criticalCount = enrichedDebts.filter((f) => f.status === "critical").length;
  const overdueAmount = enrichedDebts.filter((f) => f.status === "critical").reduce((s, f) => s + f.amount, 0);

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Fiado / Crédito</h1>
          <button className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar devedor..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex gap-2">
          {[
            { key: "all" as FilterStatus, label: "Todos" },
            { key: "critical" as FilterStatus, label: "Crítico", icon: AlertTriangle },
            { key: "attention" as FilterStatus, label: "Atenção", icon: Clock },
            { key: "ok" as FilterStatus, label: "OK", icon: CheckCircle },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === key
                  ? "bg-violet-500 text-white"
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
            <BookOpen className="w-5 h-5 text-violet-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Total Fiado</p>
            <p className="text-lg font-bold text-violet-600">
              {totalFiado.toLocaleString("pt-MZ")}
            </p>
            <p className="text-2xs text-violet-400">{totalClients} clientes</p>
          </div>
          <div className="card p-3 text-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Em Atraso</p>
            <p className="text-lg font-bold text-red-600">
              {overdueAmount.toLocaleString("pt-MZ")}
            </p>
            <p className="text-2xs text-red-400">{criticalCount} clientes</p>
          </div>
        </div>

        {criticalCount > 0 && (
          <div className="card p-4 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-violet-800 mb-1">
                  Sugestão de Cobrança
                </p>
                <p className="text-sm text-violet-700 leading-relaxed">
                  &ldquo;{COLLECTION_MESSAGES[0]}&rdquo;
                </p>
                <p className="text-2xs text-violet-500 mt-1">
                  Toca para copiar e enviar via WhatsApp
                </p>
              </div>
            </div>
          </div>
        )}

        <section>
          <h3 className="text-sm font-semibold mb-2">
            Devedores ({filtered.length})
          </h3>
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((entry) => (
                <FiadoCard
                  key={entry.id}
                  customer={entry.customer}
                  amount={entry.amount}
                  limit={entry.amount}
                  lastPayment={undefined}
                  dueDate={entry.dueDate}
                  status={entry.status}
                />
              ))}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                {loading ? "A carregar..." : "Nenhum fiado encontrado"}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
