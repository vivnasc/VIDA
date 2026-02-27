"use client";

import {
  UserCheck,
  Star,
  Plus,
  Award,
} from "lucide-react";
import { useBusiness } from "@/hooks/use-business";
import { useQuery } from "@/hooks/use-query";
import { getStaff } from "@/lib/supabase";
import type { StaffMember } from "@/lib/types/business";

export default function StaffPage() {
  const { business } = useBusiness();

  const { data: staff, loading } = useQuery<StaffMember[]>(
    (supabase) => getStaff(supabase, business!.id),
    [business?.id],
  );

  const staffList = staff ?? [];

  const totalStaffCost = staffList.reduce((s, m) => s + m.salary_base, 0);
  const staffCount = staffList.length;

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Staff / Equipa</h1>
          <button className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-3 text-center">
            <UserCheck className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Equipa</p>
            <p className="text-sm font-bold">{staffCount}</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Custo Base Mensal</p>
            <p className="text-sm font-bold text-red-500">
              {totalStaffCost > 0 ? `${(totalStaffCost / 1000).toFixed(0)}k` : "0"} MZN
            </p>
          </div>
        </div>

        <section>
          <h3 className="text-sm font-semibold mb-2">Membros da Equipa</h3>
          {staffList.length > 0 ? (
            <div className="space-y-3">
              {staffList.map((member) => (
                <div key={member.id} className="card p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-teal-700">
                        {member.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{member.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {member.role}
                        {member.specialties && member.specialties.length > 0 && (
                          <> &middot; {member.specialties.join(", ")}</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-2xs text-[var(--color-text-muted)]">Salário Base</p>
                      <p className="text-sm font-bold">
                        {(member.salary_base / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-2xs text-[var(--color-text-muted)]">Comissão</p>
                      <p className="text-sm font-bold text-emerald-600">
                        {member.commission_rate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-2xs text-[var(--color-text-muted)]">Telefone</p>
                      <p className="text-xs font-medium truncate">
                        {member.phone ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                {loading ? "A carregar..." : "Nenhum membro da equipa registado"}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
