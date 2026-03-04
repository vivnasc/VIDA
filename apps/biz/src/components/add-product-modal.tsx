"use client";

import { useState } from "react";
import { X, Loader2, Check, Package } from "lucide-react";
import { createBrowserClient } from "@vida/auth/client";
import { useBusiness } from "@/hooks/use-business";
import { createProduct } from "@/lib/supabase";

interface AddProductModalProps {
  onClose: () => void;
}

export function AddProductModal({ onClose }: AddProductModalProps) {
  const { business } = useBusiness();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("un");
  const [minStock, setMinStock] = useState("5");
  const [isService, setIsService] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const margin = sellPrice && costPrice
    ? Math.round(((parseFloat(sellPrice) - parseFloat(costPrice)) / parseFloat(sellPrice)) * 100)
    : 0;

  const handleSubmit = async () => {
    if (!name || !sellPrice || !business) return;
    setSubmitting(true);
    try {
      const supabase = createBrowserClient();
      await createProduct(supabase, {
        business_id: business.id,
        name,
        category: category || undefined,
        cost_price: parseFloat(costPrice) || 0,
        sell_price: parseFloat(sellPrice),
        quantity: parseInt(quantity) || 0,
        unit,
        min_stock: parseInt(minStock) || 5,
        is_service: isService,
      });
      setDone(true);
      setTimeout(() => { onClose(); window.location.reload(); }, 600);
    } catch (err) {
      console.error("Erro:", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full bg-[var(--color-surface)] rounded-t-3xl p-4 pb-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Package className="w-5 h-5 text-primary-500" /> Novo produto
          </h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Nome *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Arroz 5kg" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" autoFocus />
          </div>
          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Categoria</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ex: Secos, Bebidas" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-2xs text-gray-500 mb-1 block">Preço de custo (MZN)</label>
              <input type="number" inputMode="decimal" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="text-2xs text-gray-500 mb-1 block">Preço de venda (MZN) *</label>
              <input type="number" inputMode="decimal" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          {margin > 0 && (
            <p className="text-xs text-emerald-600 font-medium">Margem: {margin}%</p>
          )}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-2xs text-gray-500 mb-1 block">Quantidade</label>
              <input type="number" inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="text-2xs text-gray-500 mb-1 block">Unidade</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="un">un</option>
                <option value="kg">kg</option>
                <option value="litro">litro</option>
                <option value="metro">metro</option>
                <option value="caixa">caixa</option>
              </select>
            </div>
            <div>
              <label className="text-2xs text-gray-500 mb-1 block">Stock mín.</label>
              <input type="number" inputMode="numeric" value={minStock} onChange={(e) => setMinStock(e.target.value)} placeholder="5" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isService} onChange={(e) => setIsService(e.target.checked)} className="w-4 h-4 rounded text-primary-500" />
            <span className="text-sm">É um serviço (não tem stock físico)</span>
          </label>
          <button onClick={handleSubmit} disabled={!name || !sellPrice || submitting} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${done ? "bg-emerald-500 text-white" : "bg-primary-500 text-white disabled:opacity-40"}`}>
            {done ? <><Check className="w-4 h-4" />Produto adicionado!</> : submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A guardar...</> : "Adicionar produto"}
          </button>
        </div>
      </div>
    </div>
  );
}
