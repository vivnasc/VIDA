"use client";

import { useState } from "react";
import {
  X,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Smartphone,
  Landmark,
  Banknote,
  PiggyBank,
  ShoppingCart,
  Utensils,
  Car,
  Zap,
  Home,
  GraduationCap,
  Heart,
  Gamepad2,
  Shirt,
  Wallet,
  Calendar,
  RefreshCw,
} from "lucide-react";

interface AddTransactionModalProps {
  onClose: () => void;
}

type TransactionType = "income" | "expense" | "transfer";

const CATEGORIES = {
  expense: [
    { name: "Alimentação", icon: Utensils },
    { name: "Transporte", icon: Car },
    { name: "Casa", icon: Home },
    { name: "Contas", icon: Zap },
    { name: "Educação", icon: GraduationCap },
    { name: "Saúde", icon: Heart },
    { name: "Lazer", icon: Gamepad2 },
    { name: "Roupa", icon: Shirt },
    { name: "Compras", icon: ShoppingCart },
  ],
  income: [
    { name: "Salário", icon: Wallet },
    { name: "Freelance", icon: Smartphone },
    { name: "Investimento", icon: PiggyBank },
    { name: "Outro", icon: ArrowUpRight },
  ],
  transfer: [
    { name: "Transferência", icon: ArrowLeftRight },
  ],
};

const ACCOUNTS = [
  { name: "M-Pesa", icon: Smartphone, color: "bg-red-500" },
  { name: "Banco", icon: Landmark, color: "bg-blue-500" },
  { name: "Dinheiro", icon: Banknote, color: "bg-amber-500" },
  { name: "Poupança", icon: PiggyBank, color: "bg-emerald-500" },
];

export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedToAccount, setSelectedToAccount] = useState<string | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]!);
  const [isRecurring, setIsRecurring] = useState(false);

  const currentCategories = CATEGORIES[type];

  const typeConfig = {
    income: {
      label: "Receita",
      icon: ArrowUpRight,
      color: "bg-emerald-500",
      activeColor: "bg-emerald-500 text-white",
    },
    expense: {
      label: "Despesa",
      icon: ArrowDownRight,
      color: "bg-red-500",
      activeColor: "bg-red-500 text-white",
    },
    transfer: {
      label: "Transferência",
      icon: ArrowLeftRight,
      color: "bg-indigo-500",
      activeColor: "bg-indigo-500 text-white",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Sheet */}
      <div className="relative w-full max-w-lg bg-[var(--color-surface)] rounded-t-3xl max-h-[90vh] overflow-y-auto animate-in">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4">
          <h2 className="text-lg font-bold">Nova Transacção</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 pb-8 space-y-5">
          {/* Type Selector */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Tipo
            </label>
            <div className="flex gap-2">
              {(Object.keys(typeConfig) as TransactionType[]).map((t) => {
                const config = typeConfig[t];
                const Icon = config.icon;
                const isSelected = type === t;
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setType(t);
                      setSelectedCategory(null);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isSelected
                        ? config.activeColor
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Valor (MZN)
            </label>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full text-3xl font-bold py-3 px-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-center"
              />
            </div>
          </div>

          {/* Account Selector */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              {type === "transfer" ? "Da conta" : "Conta"}
            </label>
            <div className="flex gap-2 flex-wrap">
              {ACCOUNTS.map((account) => (
                <button
                  key={account.name}
                  onClick={() => setSelectedAccount(account.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedAccount === account.name
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <account.icon className="w-4 h-4" />
                  {account.name}
                </button>
              ))}
            </div>
          </div>

          {/* To Account (Transfer only) */}
          {type === "transfer" && (
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                Para conta
              </label>
              <div className="flex gap-2 flex-wrap">
                {ACCOUNTS.filter((a) => a.name !== selectedAccount).map(
                  (account) => (
                    <button
                      key={account.name}
                      onClick={() => setSelectedToAccount(account.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedToAccount === account.name
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <account.icon className="w-4 h-4" />
                      {account.name}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Category Selector */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Categoria
            </label>
            <div className="flex gap-2 flex-wrap">
              {currentCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat.name
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicionar descrição..."
              className="w-full py-2.5 px-4 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Data
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Recurring Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[var(--color-text-secondary)]" />
              <span className="text-sm font-medium">Transacção recorrente</span>
            </div>
            <button
              onClick={() => setIsRecurring(!isRecurring)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isRecurring ? "bg-primary-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  isRecurring ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-colors ${
              type === "income"
                ? "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700"
                : type === "transfer"
                  ? "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700"
                  : "bg-red-500 hover:bg-red-600 active:bg-red-700"
            }`}
          >
            {type === "income"
              ? "Registar Receita"
              : type === "transfer"
                ? "Registar Transferência"
                : "Registar Despesa"}
          </button>
        </div>
      </div>
    </div>
  );
}
