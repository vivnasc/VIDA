"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Filter,
  MessageSquare,
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { FiadoCard } from "@/components/fiado-card";
import { useBusiness } from "@/hooks/use-business";
import { createBrowserClient } from "@vida/auth/client";
import { getActiveDebts } from "@/lib/supabase";

interface FiadoEntry {
  id: string;
  customer: string;
  amount: number;
  limit: number;
  lastPayment?: string;
  dueDate?: string;
  status: "ok" | "attention" | "critical";
  paymentHistory: number;
  phone: string;
}

const MOCK_FIADOS: FiadoEntry[] = [
  { id: "1", customer: "João Macamo", amount: 2100, limit: 2500, dueDate: "13 Fev", status: "critical", paymentHistory: 2, phone: "+258 84 111 2222" },
  { id: "2", customer: "Maria João", amount: 1800, limit: 3000, lastPayment: "20 Fev — 500 MZN", dueDate: "28 Fev", status: "ok", paymentHistory: 5, phone: "+258 84 123 4567" },
  { id: "3", customer: "Mário Tembe", amount: 650, limit: 1000, lastPayment: "20 Fev — 500 MZN", dueDate: "28 Fev", status: "ok", paymentHistory: 4, phone: "+258 82 333 4444" },
  { id: "4", customer: "Sofia Manuel", amount: 950, limit: 1200, dueDate: "5 Mar", status: "attention", paymentHistory: 3, phone: "+258 84 555 1234" },
  { id: "5", customer: "Carlos Sitoe", amount: 1400, limit: 1500, lastPayment: "15 Fev — 200 MZN", dueDate: "1 Mar", status: "attention", paymentHistory: 3, phone: "+258 86 666 7777" },
  { id: "6", customer: "Ana Mondlane", amount: 350, limit: 2000, lastPayment: "25 Fev — 1.000 MZN", dueDate: "15 Mar", status: "ok", paymentHistory: 5, phone: "+258 82 888 9999" },
  { id: "7", customer: "Pedro Cossa", amount: 1200, limit: 1200, dueDate: "20 Fev", status: "critical", paymentHistory: 1, phone: "+258 84 000 1111" },
];

type FilterStatus = "all" | "ok" | "attention" | "critical";

const COLLECTION_MESSAGES = [
  "Oi [nome], lembra que tens [valor] em aberto. Quando puderes passar? 🙏",
  "Olá [nome], espero que estejas bem! Só para lembrar do teu saldo de [valor]. Obrigado! 😊",
  "Oi [nome], teu crédito está quase no limite. Podes regularizar antes de nova compra? 🙏",
];

function deriveStatus(debt: any): "ok" | "attention" | "critical" {
  if (debt.status === "overdue") return "critical";
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
  const [fiados, setFiados] = useState<FiadoEntry[]>(MOCK_FIADOS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    if (!business?.id) return;
    const supabase = createBrowserClient();
    getActiveDebts(supabase, business.id)
      .then((data) => {
        const mapped: FiadoEntry[] = data.map((d: any) => ({
          id: d.id,
          customer: d.customer?.name ?? "Desconhecido",
          amount: Number(d.amount) || 0,
          limit: Number(d.amount) || 0,
          lastPayment: undefined,
          dueDate: d.due_date
            ? new Date(d.due_date).toLocaleDateString("pt-MZ", { day: "numeric", month: "short" })
            : undefined,
          status: deriveStatus(d),
          paymentHistory: 0,
          phone: d.customer?.phone ?? "",
        }));
        if (mapped.length > 0) setFiados(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [business?.id]);

  const filtered = fiados.filter((f) => {
    if (searchQuery && !f.customer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter !== "all" && f.status !== filter) return false;
    return true;
  });

  const totalFiado = fiados.reduce((s, f) => s + f.amount, 0);
  const totalClients = fiados.length;
  const criticalCount = fiados.filter((f) => f.status === "critical").length;
  const overdueAmount = fiados.filter((f) => f.status === "critical").reduce((s, f) => s + f.amount, 0);

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
        {/* Summary */}
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

        {/* Collection Message Suggestion */}
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

        {/* Fiado List */}
        <section>
          <h3 className="text-sm font-semibold mb-2">
            Devedores ({filtered.length})
          </h3>
          <div className="space-y-3">
            {filtered.map((entry) => (
              <FiadoCard
                key={entry.id}
                customer={entry.customer}
                amount={entry.amount}
                limit={entry.limit}
                lastPayment={entry.lastPayment}
                dueDate={entry.dueDate}
                status={entry.status}
              />
            ))}
          </div>
        </section>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Nenhum fiado encontrado
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
