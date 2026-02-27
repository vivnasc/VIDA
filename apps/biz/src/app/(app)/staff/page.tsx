"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserCheck,
  Star,
  TrendingUp,
  Phone,
  Calendar,
  Plus,
  ChevronRight,
  Award,
  Clock,
  Briefcase,
} from "lucide-react";
import { useBusiness } from "@/hooks/use-business";
import { createBrowserClient } from "@vida/auth/client";
import { getStaff } from "@/lib/supabase";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  salaryBase: number;
  commissionRate: number;
  specialties: string[];
  monthAttendances: number;
  monthRevenue: number;
  monthCommission: number;
  rating: number;
  absences: number;
  startDate: string;
}

const MOCK_STAFF: StaffMember[] = [
  {
    id: "1", name: "Fátima Ngunga", role: "Cabeleireira", phone: "+258 84 111 2222",
    salaryBase: 8000, commissionRate: 20, specialties: ["Tranças", "Crochet", "Alisamento"],
    monthAttendances: 47, monthRevenue: 68500, monthCommission: 13700, rating: 4.8, absences: 0,
    startDate: "2024-03-15",
  },
  {
    id: "2", name: "Lurdes Machel", role: "Cabeleireira", phone: "+258 82 333 4444",
    salaryBase: 7000, commissionRate: 18, specialties: ["Corte", "Escova", "Hidratação"],
    monthAttendances: 35, monthRevenue: 42000, monthCommission: 7560, rating: 4.2, absences: 2,
    startDate: "2024-06-01",
  },
  {
    id: "3", name: "Teresa Sitoe", role: "Manicure", phone: "+258 86 555 6666",
    salaryBase: 6000, commissionRate: 15, specialties: ["Unhas gel", "Manicure", "Pedicure"],
    monthAttendances: 52, monthRevenue: 31200, monthCommission: 4680, rating: 4.6, absences: 1,
    startDate: "2024-09-10",
  },
  {
    id: "4", name: "Rosa Tembe", role: "Assistente", phone: "+258 84 777 8888",
    salaryBase: 5000, commissionRate: 0, specialties: ["Lavar cabelo", "Apoio geral"],
    monthAttendances: 26, monthRevenue: 0, monthCommission: 0, rating: 4.0, absences: 0,
    startDate: "2025-01-15",
  },
];

export default function StaffPage() {
  const { business } = useBusiness();
  const [staff, setStaff] = useState<StaffMember[]>(MOCK_STAFF);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!business?.id) return;
    const supabase = createBrowserClient();
    getStaff(supabase, business.id)
      .then((data) => {
        const mapped: StaffMember[] = data.map((s: any) => ({
          id: s.id,
          name: s.name ?? "",
          role: s.role ?? "",
          phone: s.phone ?? "",
          salaryBase: Number(s.salary_base) || 0,
          commissionRate: Number(s.commission_rate) || 0,
          specialties: [],
          monthAttendances: 0,
          monthRevenue: 0,
          monthCommission: 0,
          rating: 0,
          absences: 0,
          startDate: s.created_at ?? "",
        }));
        if (mapped.length > 0) setStaff(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [business?.id]);

  const totalStaffCost = staff.reduce(
    (s, m) => s + m.salaryBase + m.monthCommission,
    0,
  );
  const totalRevenue = staff.reduce((s, m) => s + m.monthRevenue, 0);
  const staffRatio = totalRevenue > 0 ? Math.round((totalStaffCost / totalRevenue) * 100) : 0;
  const topPerformer = staff.reduce((top, m) =>
    m.monthRevenue > top.monthRevenue ? m : top,
  );

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
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-3 text-center">
            <UserCheck className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Equipa</p>
            <p className="text-sm font-bold">{staff.length}</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Custo Mensal</p>
            <p className="text-sm font-bold text-red-500">
              {(totalStaffCost / 1000).toFixed(0)}k
            </p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Rácio</p>
            <p className={`text-sm font-bold ${staffRatio <= 40 ? "text-emerald-600" : "text-amber-600"}`}>
              {staffRatio}%
            </p>
            <p className="text-2xs text-[var(--color-text-muted)]">
              {staffRatio <= 40 ? "saudável" : "atenção"}
            </p>
          </div>
        </div>

        {/* Top Performer */}
        <div className="card p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-teal-600 font-medium">Estrela do Mês</p>
              <p className="text-sm font-bold text-teal-800">{topPerformer.name}</p>
              <p className="text-xs text-teal-600">
                {topPerformer.monthRevenue.toLocaleString("pt-MZ")} MZN em receita
                • {topPerformer.monthAttendances} atendimentos
              </p>
            </div>
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" />
              <span className="text-sm font-bold">{topPerformer.rating}</span>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Membros da Equipa</h3>
          <div className="space-y-3">
            {staff.map((member) => {
              const totalPay = member.salaryBase + member.monthCommission;

              return (
                <div key={member.id} className="card p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-teal-700">
                        {member.name[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{member.name}</p>
                        {member.id === topPerformer.id && (
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {member.role} • {member.specialties.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-medium">{member.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-2xs text-[var(--color-text-muted)]">Atend.</p>
                      <p className="text-sm font-bold">{member.monthAttendances}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-[var(--color-text-muted)]">Receita</p>
                      <p className="text-sm font-bold text-emerald-600">
                        {(member.monthRevenue / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-2xs text-[var(--color-text-muted)]">Total Pagar</p>
                      <p className="text-sm font-bold text-primary-600">
                        {(totalPay / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <div>
                      <p className="text-2xs text-[var(--color-text-muted)]">Faltas</p>
                      <p className={`text-sm font-bold ${member.absences === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                        {member.absences}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Staff Cost Report */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3">Relatório Mensal Staff</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Custo Staff Total</span>
              <span className="font-semibold">{totalStaffCost.toLocaleString("pt-MZ")} MZN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Receita Total Gerada</span>
              <span className="font-semibold text-emerald-600">{totalRevenue.toLocaleString("pt-MZ")} MZN</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[var(--color-border)]">
              <span className="font-semibold">Rácio Staff/Receita</span>
              <span className={`font-bold ${staffRatio <= 40 ? "text-emerald-600" : "text-amber-600"}`}>
                {staffRatio}% {staffRatio <= 40 ? "✅" : "⚠️"}
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
