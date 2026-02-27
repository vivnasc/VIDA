"use client";

import { useState } from "react";
import {
  X,
  Smartphone,
  Landmark,
  Banknote,
  CreditCard,
  BookOpen,
  Search,
  Plus,
  Minus,
  User,
  ChevronDown,
  ChevronUp,
  StickyNote,
  type LucideIcon,
} from "lucide-react";

import { getTemplate, type ServiceDefinition } from "@/lib/templates";

interface AddSaleModalProps {
  onClose: () => void;
  templateId?: string;
}

type PaymentMethod = "cash" | "mpesa" | "emola" | "transfer" | "card" | "fiado";

interface QuickProduct {
  name: string;
  price: number;
}

const PAYMENT_METHODS: { key: PaymentMethod; label: string; icon: LucideIcon; color: string }[] = [
  { key: "cash", label: "Cash", icon: Banknote, color: "bg-emerald-500" },
  { key: "mpesa", label: "M-Pesa", icon: Smartphone, color: "bg-red-500" },
  { key: "transfer", label: "Transferência", icon: Landmark, color: "bg-blue-500" },
  { key: "card", label: "Cartão", icon: CreditCard, color: "bg-purple-500" },
  { key: "fiado", label: "Fiado", icon: BookOpen, color: "bg-violet-500" },
];

const MOCK_CUSTOMERS = [
  "Maria João",
  "Ana Silva",
  "Sofia Manuel",
  "Beatriz Costa",
  "Carla Tembe",
];

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export function AddSaleModal({ onClose, templateId = "salao" }: AddSaleModalProps) {
  const template = getTemplate(templateId);
  const templateProducts: QuickProduct[] = template.services.map((s) => ({
    name: s.name,
    price: s.defaultPrice,
  }));

  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomers, setShowCustomers] = useState(false);
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountValue = discount ? parseFloat(discount) : 0;
  const total = Math.max(0, subtotal - discountValue);

  const addToCart = (product: QuickProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const filteredProducts = templateProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredCustomers = MOCK_CUSTOMERS.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-lg bg-[var(--color-surface)] rounded-t-3xl max-h-[92vh] overflow-y-auto transition-transform duration-300 ease-out ${
          isClosing ? "translate-y-full" : "translate-y-0 animate-in"
        }`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-[var(--color-surface)] z-10 rounded-t-3xl">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 sticky top-6 bg-[var(--color-surface)] z-10">
          <h2 className="text-lg font-bold">Nova Venda</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 pb-8 space-y-5">
          {/* Quick Product Grid */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Produtos / Serviços
            </label>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar produto..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {filteredProducts.map((product) => (
                <button
                  key={product.name}
                  onClick={() => addToCart(product)}
                  className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-gray-50 hover:bg-primary-50 active:bg-primary-100 transition-colors"
                >
                  <span className="text-2xs font-medium text-center leading-tight truncate w-full">
                    {product.name}
                  </span>
                  <span className="text-xs font-bold text-primary-600">
                    {product.price.toLocaleString("pt-MZ")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          {cart.length > 0 && (
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                Carrinho ({cart.length})
              </label>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2"
                  >
                    <span className="text-sm font-medium flex-1">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.name, -1)}
                        className="w-7 h-7 bg-gray-200 rounded-lg flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.name, 1)}
                        className="w-7 h-7 bg-primary-500 text-white rounded-lg flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-primary-600 w-20 text-right">
                        {(item.price * item.quantity).toLocaleString("pt-MZ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Selector */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Cliente (opcional)
            </label>
            <button
              onClick={() => setShowCustomers(!showCustomers)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-xl text-sm"
            >
              <span className={selectedCustomer ? "font-medium" : "text-gray-400"}>
                {selectedCustomer || "Selecionar cliente..."}
              </span>
              <User className="w-4 h-4 text-gray-400" />
            </button>
            {showCustomers && (
              <div className="mt-2 bg-gray-50 rounded-xl overflow-hidden animate-in">
                {filteredCustomers.map((customer) => (
                  <button
                    key={customer}
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowCustomers(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors ${
                      selectedCustomer === customer
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : ""
                    }`}
                  >
                    {customer}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
              Método de Pagamento
            </label>
            <div className="flex gap-2 flex-wrap">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.key}
                  onClick={() => setPaymentMethod(method.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    paymentMethod === method.key
                      ? `${method.color} text-white`
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <method.icon className="w-4 h-4" />
                  {method.label}
                </button>
              ))}
            </div>
            {paymentMethod === "fiado" && !selectedCustomer && (
              <p className="text-xs text-red-500 mt-1.5">
                Selecciona um cliente para vender a fiado
              </p>
            )}
          </div>

          {/* Advanced Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Menos opções
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Mais opções
              </>
            )}
          </button>

          {showAdvanced && (
            <div className="space-y-4 animate-in">
              {/* Discount */}
              <div>
                <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                  Desconto (MZN)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                  className="w-full py-2.5 px-4 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StickyNote className="w-4 h-4 text-[var(--color-text-secondary)]" />
                  <label className="text-xs font-medium text-[var(--color-text-secondary)]">
                    Notas
                  </label>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notas sobre a venda..."
                  rows={2}
                  className="w-full py-2.5 px-4 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Total & Submit */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm text-[var(--color-text-secondary)]">
                Subtotal
              </span>
              <span className="text-sm font-medium">
                {subtotal.toLocaleString("pt-MZ")} MZN
              </span>
            </div>
            {discountValue > 0 && (
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-red-500">Desconto</span>
                <span className="text-sm font-medium text-red-500">
                  -{discountValue.toLocaleString("pt-MZ")} MZN
                </span>
              </div>
            )}
            <div className="flex items-center justify-between px-1 pt-2 border-t border-[var(--color-border)]">
              <span className="text-base font-bold">Total</span>
              <span className="text-xl font-bold text-primary-600">
                {total.toLocaleString("pt-MZ")} MZN
              </span>
            </div>

            <button
              disabled={cart.length === 0}
              className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-lg ${
                cart.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 shadow-primary-500/25"
              }`}
            >
              Registar Venda — {total.toLocaleString("pt-MZ")} MZN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
