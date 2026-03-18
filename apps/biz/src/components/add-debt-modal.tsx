"use client";

import { useState } from "react";
import { X, BookOpen, Check, Loader2 } from "lucide-react";
import { createBrowserClient } from "@vida/auth/client";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getCustomers, createDebt } from "@/lib/supabase";
import type { BusinessCustomer } from "@vida/database/types/business";

interface AddDebtModalProps {
  onClose: () => void;
}

export function AddDebtModal({ onClose }: AddDebtModalProps) {
  const { business } = useBusiness();
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const { data: customers } = useQuery<BusinessCustomer[]>(
    (supabase) => getCustomers(supabase, business!.id),
    [business?.id],
  );

  const customerList = customers ?? [];

  const handleSubmit = async () => {
    if (!selectedCustomerId || !amount || submitting) return;
    setSubmitting(true);

    try {
      const supabase = createBrowserClient();
      await createDebt(supabase, {
        customer_id: selectedCustomerId,
        amount: parseFloat(amount),
        due_date: dueDate || undefined,
        notes: notes || undefined,
      });
      setDone(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);
    } catch (err) {
      console.error("Erro ao registar fiado:", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-[var(--color-surface)] rounded-t-3xl p-4 pb-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-500" />
            Novo Fiado
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Cliente</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Selecionar cliente...</option>
              {customerList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Valor (MZN)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">MZN</span>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full pl-14 pr-3 py-3 bg-gray-50 rounded-xl text-xl font-bold focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Data de vencimento (opcional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Notas (opcional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Compra de produtos fiado"
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedCustomerId || !amount || submitting}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
              done
                ? "bg-emerald-500 text-white"
                : "bg-violet-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {done ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Fiado registado!
              </span>
            ) : submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> A registar...
              </span>
            ) : (
              "Registar fiado"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
