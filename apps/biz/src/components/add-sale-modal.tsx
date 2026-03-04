"use client";

import { useState, useCallback } from "react";
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
  Check,
  Loader2,
  type LucideIcon,
} from "lucide-react";

import { createBrowserClient } from "@vida/auth/client";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getCustomers, getProducts, createSale } from "@/lib/supabase";
import { getTemplate } from "@/lib/templates";
import type { Product, BusinessCustomer } from "@vida/database/types/business";

interface AddSaleModalProps {
  onClose: () => void;
  templateId?: string;
}

type PaymentMethod = "cash" | "mpesa" | "emola" | "transfer" | "card" | "fiado";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const PAYMENT_METHODS: { key: PaymentMethod; label: string; icon: LucideIcon; color: string }[] = [
  { key: "cash", label: "Cash", icon: Banknote, color: "bg-emerald-500" },
  { key: "mpesa", label: "M-Pesa", icon: Smartphone, color: "bg-red-500" },
  { key: "transfer", label: "Transferência", icon: Landmark, color: "bg-blue-500" },
  { key: "card", label: "Cartão", icon: CreditCard, color: "bg-purple-500" },
  { key: "fiado", label: "Fiado", icon: BookOpen, color: "bg-violet-500" },
];

export function AddSaleModal({ onClose, templateId = "salao" }: AddSaleModalProps) {
  const { business } = useBusiness();
  const template = getTemplate(templateId);

  const { data: customers } = useQuery<BusinessCustomer[]>(
    (supabase) => getCustomers(supabase, business!.id),
    [business?.id],
  );

  const { data: dbProducts } = useQuery<Product[]>(
    (supabase) => getProducts(supabase, business!.id),
    [business?.id],
  );

  const quickProducts = dbProducts && dbProducts.length > 0
    ? dbProducts.map((p) => ({ name: p.name, price: Number(p.sell_price) }))
    : template.services.map((s) => ({ name: s.name, price: s.defaultPrice }));

  const customerList = customers ?? [];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [selectedCustomer, setSelectedCustomer] = useState<BusinessCustomer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomers, setShowCustomers] = useState(false);
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountValue = discount ? parseFloat(discount) : 0;
  const total = Math.max(0, subtotal - discountValue);

  const addToCart = (product: { name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.name === name ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const handleSubmit = useCallback(async () => {
    if (!business || cart.length === 0 || submitting) return;
    setSubmitting(true);
    try {
      const supabase = createBrowserClient();
      await createSale(supabase, {
        business_id: business.id,
        customer_id: selectedCustomer?.id,
        total_amount: total,
        payment_method: paymentMethod as "cash" | "mpesa" | "transfer" | "card" | "fiado",
        discount: discountValue > 0 ? discountValue : undefined,
        notes: [
          ...cart.map((c) => `${c.quantity}x ${c.name}`),
          notes ? `Nota: ${notes}` : "",
        ].filter(Boolean).join(" | ") || undefined,
      });
      setDone(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);
    } catch (err) {
      console.error("Erro ao registar venda:", err);
      setSubmitting(false);
    }
  }, [business, cart, selectedCustomer, total, paymentMethod, discountValue, notes, submitting, onClose]);

  const filteredProducts = quickProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredCustomers = customerList.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={handleClose}
      />
      <div
        className={`relative w-full max-w-lg bg-[var(--color-surface)] rounded-t-3xl max-h-[92vh] overflow-y-auto transition-transform duration-300 ease-out ${isClosing ? "translate-y-full" : "translate-y-0 animate-in"}`}
      >
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-[var(--color-surface)] z-10 rounded-t-3xl">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-4 pb-4 sticky top-6 bg-[var(--color-surface)] z-10">
          <h2 className="text-lg font-bold">Nova Venda</h2>
          <button onClick={handleClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 pb-8 space-y-5">
          {/* Quick Product Grid */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Produtos / Serviços</label>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Pesquisar produto..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {filteredProducts.map((product) => (
                <button key={product.name} onClick={() => addToCart(product)} className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-gray-50 hover:bg-primary-50 active:bg-primary-100 transition-colors">
                  <span className="text-2xs font-medium text-center leading-tight truncate w-full">{product.name}</span>
                  <span className="text-xs font-bold text-primary-600">{product.price.toLocaleString("pt-MZ")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          {cart.length > 0 && (
            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Carrinho ({cart.length})</label>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                    <span className="text-sm font-medium flex-1">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.name, -1)} className="w-7 h-7 bg-gray-200 rounded-lg flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, 1)} className="w-7 h-7 bg-primary-500 text-white rounded-lg flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                      <span className="text-sm font-semibold text-primary-600 w-20 text-right">{(item.price * item.quantity).toLocaleString("pt-MZ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Selector */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Cliente (opcional)</label>
            <button onClick={() => setShowCustomers(!showCustomers)} className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-xl text-sm">
              <span className={selectedCustomer ? "font-medium" : "text-gray-400"}>{selectedCustomer?.name || "Selecionar cliente..."}</span>
              <User className="w-4 h-4 text-gray-400" />
            </button>
            {showCustomers && (
              <div className="mt-2 bg-gray-50 rounded-xl overflow-hidden animate-in max-h-40 overflow-y-auto">
                {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                  <button key={customer.id} onClick={() => { setSelectedCustomer(customer); setShowCustomers(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 transition-colors ${selectedCustomer?.id === customer.id ? "bg-primary-50 text-primary-700 font-medium" : ""}`}>
                    {customer.name}
                    {customer.phone && <span className="text-2xs text-gray-400 ml-2">{customer.phone}</span>}
                  </button>
                )) : (
                  <p className="px-4 py-2.5 text-sm text-gray-400">Sem clientes registados</p>
                )}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Método de Pagamento</label>
            <div className="flex gap-2 flex-wrap">
              {PAYMENT_METHODS.map((method) => (
                <button key={method.key} onClick={() => setPaymentMethod(method.key)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${paymentMethod === method.key ? `${method.color} text-white` : "bg-gray-100 text-gray-600"}`}>
                  <method.icon className="w-4 h-4" />{method.label}
                </button>
              ))}
            </div>
            {paymentMethod === "fiado" && !selectedCustomer && (
              <p className="text-xs text-red-500 mt-1.5">Selecciona um cliente para vender a fiado</p>
            )}
          </div>

          {/* Advanced */}
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-[var(--color-text-muted)]">
            {showAdvanced ? <><ChevronUp className="w-3.5 h-3.5" />Menos opções</> : <><ChevronDown className="w-3.5 h-3.5" />Mais opções</>}
          </button>
          {showAdvanced && (
            <div className="space-y-4 animate-in">
              <div>
                <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Desconto (MZN)</label>
                <input type="number" inputMode="decimal" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="0" className="w-full py-2.5 px-4 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StickyNote className="w-4 h-4 text-[var(--color-text-secondary)]" />
                  <label className="text-xs font-medium text-[var(--color-text-secondary)]">Notas</label>
                </div>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas sobre a venda..." rows={2} className="w-full py-2.5 px-4 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              </div>
            </div>
          )}

          {/* Total & Submit */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm text-[var(--color-text-secondary)]">Subtotal</span>
              <span className="text-sm font-medium">{subtotal.toLocaleString("pt-MZ")} MZN</span>
            </div>
            {discountValue > 0 && (
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-red-500">Desconto</span>
                <span className="text-sm font-medium text-red-500">-{discountValue.toLocaleString("pt-MZ")} MZN</span>
              </div>
            )}
            <div className="flex items-center justify-between px-1 pt-2 border-t border-[var(--color-border)]">
              <span className="text-base font-bold">Total</span>
              <span className="text-xl font-bold text-primary-600">{total.toLocaleString("pt-MZ")} MZN</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={cart.length === 0 || submitting || (paymentMethod === "fiado" && !selectedCustomer)}
              className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${
                done ? "bg-emerald-500" : cart.length === 0 || (paymentMethod === "fiado" && !selectedCustomer) ? "bg-gray-300 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600 shadow-primary-500/25"
              }`}
            >
              {done ? <><Check className="w-4 h-4" />Venda registada!</> : submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A registar...</> : <>Registar Venda — {total.toLocaleString("pt-MZ")} MZN</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
