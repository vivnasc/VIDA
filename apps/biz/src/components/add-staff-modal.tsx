"use client";

import { useState } from "react";
import { X, Loader2, Check, UserCheck } from "lucide-react";
import { createBrowserClient } from "@vida/auth/client";
import { useBusiness } from "@/hooks/use-business";
import { createStaffMember } from "@/lib/supabase";

interface AddStaffModalProps { onClose: () => void; }

export function AddStaffModal({ onClose }: AddStaffModalProps) {
  const { business } = useBusiness();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [commission, setCommission] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!name || !role || !business) return;
    setSubmitting(true);
    try {
      const supabase = createBrowserClient();
      await createStaffMember(supabase, {
        business_id: business.id,
        name,
        phone: phone || undefined,
        role,
        salary_base: salary ? parseFloat(salary) : undefined,
        commission_rate: commission ? parseFloat(commission) : undefined,
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
            <UserCheck className="w-5 h-5 text-teal-500" /> Novo membro
          </h3>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Nome *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" autoFocus />
          </div>
          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Função *</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Ex: Cabeleireira, Vendedor" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="text-2xs text-gray-500 mb-1 block">Telefone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+258 84 000 0000" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-2xs text-gray-500 mb-1 block">Salário base (MZN)</label>
              <input type="number" inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="text-2xs text-gray-500 mb-1 block">Comissão (%)</label>
              <input type="number" inputMode="decimal" value={commission} onChange={(e) => setCommission(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <button onClick={handleSubmit} disabled={!name || !role || submitting} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${done ? "bg-emerald-500 text-white" : "bg-teal-500 text-white disabled:opacity-40"}`}>
            {done ? <><Check className="w-4 h-4" />Membro adicionado!</> : submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A guardar...</> : "Adicionar membro"}
          </button>
        </div>
      </div>
    </div>
  );
}
