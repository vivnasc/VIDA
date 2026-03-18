"use client";

import { useState } from "react";
import { X, Banknote, Smartphone, Landmark, Check, Loader2 } from "lucide-react";
import { createBrowserClient } from "@vida/auth/client";
import { recordFiadoPayment } from "@/lib/supabase";

type PaymentMethod = "cash" | "mpesa" | "transfer";

interface RecordPaymentModalProps {
  debtId: string;
  customerName: string;
  remainingAmount: number;
  onClose: () => void;
}

export function RecordPaymentModal({
  debtId,
  customerName,
  remainingAmount,
  onClose,
}: RecordPaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0 || submitting) return;
    setSubmitting(true);

    try {
      const supabase = createBrowserClient();
      await recordFiadoPayment(supabase, {
        debt_id: debtId,
        amount: parseFloat(amount),
        payment_method: method,
        notes: notes || undefined,
      });
      setDone(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);
    } catch (err) {
      console.error("Erro ao registar pagamento:", err);
      setSubmitting(false);
    }
  };

  const METHODS: { key: PaymentMethod; label: string; icon: typeof Banknote }[] = [
    { key: "cash", label: "Cash", icon: Banknote },
    { key: "mpesa", label: "M-Pesa", icon: Smartphone },
    { key: "transfer", label: "Transferência", icon: Landmark },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-[var(--color-surface)] rounded-t-3xl p-4 pb-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-500" />
            Registar Pagamento
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="card p-3 bg-violet-50 border-violet-100">
            <p className="text-sm font-medium">{customerName}</p>
            <p className="text-xs text-violet-600">
              Em aberto: {remainingAmount.toLocaleString("pt-MZ")} MZN
            </p>
          </div>

          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Valor do pagamento (MZN)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">MZN</span>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                max={remainingAmount}
                className="w-full pl-14 pr-3 py-3 bg-gray-50 rounded-xl text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
            </div>
            <button
              onClick={() => setAmount(String(remainingAmount))}
              className="text-xs text-emerald-600 mt-1 underline"
            >
              Pagar tudo ({remainingAmount.toLocaleString("pt-MZ")} MZN)
            </button>
          </div>

          <div>
            <label className="text-2xs text-gray-500 mb-2 block">Método de pagamento</label>
            <div className="flex gap-2">
              {METHODS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setMethod(key)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                    method === key
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-2xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Notas (opcional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Pagamento parcial"
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0 || submitting}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
              done
                ? "bg-emerald-500 text-white"
                : "bg-emerald-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {done ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Pagamento registado!
              </span>
            ) : submitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> A registar...
              </span>
            ) : (
              "Registar pagamento"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
