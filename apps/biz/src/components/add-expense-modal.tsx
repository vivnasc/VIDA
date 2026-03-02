"use client";

import { useState } from "react";
import { X, Wallet, Tag, FileText, Calendar } from "lucide-react";

const EXPENSE_CATEGORIES = [
  { key: "aluguel", label: "Aluguel", icon: "🏠" },
  { key: "salarios", label: "Salários", icon: "👥" },
  { key: "produtos", label: "Produtos/Stock", icon: "📦" },
  { key: "transporte", label: "Transporte", icon: "🚗" },
  { key: "agua_luz", label: "Água & Luz", icon: "💡" },
  { key: "telecomunicacoes", label: "Telecomunicações", icon: "📱" },
  { key: "limpeza", label: "Limpeza", icon: "🧹" },
  { key: "manutencao", label: "Manutenção", icon: "🔧" },
  { key: "marketing", label: "Marketing", icon: "📢" },
  { key: "impostos", label: "Impostos/Taxas", icon: "📋" },
  { key: "outro", label: "Outro", icon: "💰" },
];

interface AddExpenseModalProps {
  onClose: () => void;
  onSubmit?: (expense: {
    category: string;
    amount: number;
    description: string;
  }) => void;
}

export function AddExpenseModal({ onClose, onSubmit }: AddExpenseModalProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (!category || !amount) return;
    setSubmitting(true);

    setTimeout(() => {
      onSubmit?.({
        category,
        amount: parseFloat(amount),
        description,
      });
      setSubmitting(false);
      setDone(true);
      setTimeout(() => onClose(), 800);
    }, 500);
  };

  const selectedCat = EXPENSE_CATEGORIES.find((c) => c.key === category);

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full bg-[var(--color-surface)] rounded-t-3xl p-4 pb-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Wallet className="w-5 h-5 text-red-500" />
            Nova despesa
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Amount */}
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
                className="w-full pl-14 pr-3 py-3 bg-gray-50 rounded-xl text-xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                autoFocus
              />
            </div>
          </div>

          {/* Category selection */}
          <div>
            <label className="text-2xs text-gray-500 mb-2 block">Categoria</label>
            <div className="grid grid-cols-4 gap-2">
              {EXPENSE_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 transition-all ${
                    category === cat.key
                      ? "border-red-400 bg-red-50"
                      : "border-[var(--color-border)]"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-2xs font-medium text-gray-600 leading-tight text-center">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Descrição (opcional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Compra de stock no Museu"
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Summary */}
          {category && amount && (
            <div className="card p-3 bg-red-50 border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedCat?.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{selectedCat?.label}</p>
                    {description && (
                      <p className="text-2xs text-gray-500">{description}</p>
                    )}
                  </div>
                </div>
                <p className="text-base font-bold text-red-600">
                  -{parseFloat(amount).toLocaleString("pt-MZ")} MZN
                </p>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!category || !amount || submitting}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
              done
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {done ? "Despesa registada!" : submitting ? "A registar..." : "Registar despesa"}
          </button>
        </div>
      </div>
    </div>
  );
}
