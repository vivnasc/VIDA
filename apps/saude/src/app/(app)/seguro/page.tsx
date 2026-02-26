"use client";

import { useState } from "react";
import {
  Shield,
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  DollarSign,
  User,
  Check,
  Clock,
  X,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

/* ─── Types ─── */
interface InsurancePolicy {
  id: string;
  provider: string;
  planName: string;
  coverageType: string;
  annualLimit: number;
  amountUsed: number;
  monthlyPremium: number;
  policyNumber: string;
  startDate: string;
  endDate: string;
  coverageDetails: string[];
  familyMembers: string[];
}

type ClaimStatus = "submitted" | "approved" | "reimbursed" | "denied";

interface Claim {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: ClaimStatus;
  provider: string;
  member: string;
  reimbursedAmount?: number;
}

/* ─── Mock Data ─── */
const policies: InsurancePolicy[] = [
  {
    id: "1",
    provider: "Medis Mocambique",
    planName: "Plano Familia Premium",
    coverageType: "Saude Completa",
    annualLimit: 2000000,
    amountUsed: 450000,
    monthlyPremium: 15000,
    policyNumber: "MED-2024-001234",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    coverageDetails: [
      "Consultas medicas gerais e especialidade",
      "Internamento hospitalar",
      "Cirurgias programadas e urgentes",
      "Exames de diagnostico e analises",
      "Medicamentos (80% comparticipacao)",
      "Fisioterapia (ate 20 sessoes/ano)",
      "Tratamentos dentarios basicos",
      "Oftalmologia",
    ],
    familyMembers: ["Joao Silva", "Maria Silva", "Tomas Silva", "Sofia Silva"],
  },
  {
    id: "2",
    provider: "Seguradora Internacional",
    planName: "Plano Dental Plus",
    coverageType: "Dental",
    annualLimit: 500000,
    amountUsed: 85000,
    monthlyPremium: 3500,
    policyNumber: "SIM-2024-005678",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    coverageDetails: [
      "Limpezas e prevencao",
      "Tratamentos dentarios",
      "Ortodontia (parcial)",
      "Proteses dentarias",
    ],
    familyMembers: ["Joao Silva", "Maria Silva"],
  },
];

const claims: Claim[] = [
  {
    id: "1",
    description: "Consulta Cardiologia",
    amount: 8500,
    date: "2026-02-15",
    status: "reimbursed",
    provider: "Medis Mocambique",
    member: "Joao Silva",
    reimbursedAmount: 6800,
  },
  {
    id: "2",
    description: "Analises de sangue",
    amount: 12000,
    date: "2026-02-10",
    status: "approved",
    provider: "Medis Mocambique",
    member: "Joao Silva",
    reimbursedAmount: 9600,
  },
  {
    id: "3",
    description: "Consulta Pediatra",
    amount: 5000,
    date: "2026-02-05",
    status: "reimbursed",
    provider: "Medis Mocambique",
    member: "Tomas Silva",
    reimbursedAmount: 4000,
  },
  {
    id: "4",
    description: "Limpeza Dentaria",
    amount: 4500,
    date: "2026-01-20",
    status: "reimbursed",
    provider: "Seguradora Internacional",
    member: "Joao Silva",
    reimbursedAmount: 4500,
  },
  {
    id: "5",
    description: "Raio-X Torax",
    amount: 7500,
    date: "2026-01-15",
    status: "submitted",
    provider: "Medis Mocambique",
    member: "Maria Silva",
  },
  {
    id: "6",
    description: "Consulta Oftalmologia",
    amount: 6000,
    date: "2025-12-18",
    status: "denied",
    provider: "Medis Mocambique",
    member: "Maria Silva",
  },
];

const statusConfig: Record<ClaimStatus, { label: string; color: string; icon: typeof Check }> = {
  submitted: { label: "Submetido", color: "bg-blue-100 text-blue-700", icon: Clock },
  approved: { label: "Aprovado", color: "bg-emerald-100 text-emerald-700", icon: Check },
  reimbursed: { label: "Reembolsado", color: "bg-green-100 text-green-700", icon: DollarSign },
  denied: { label: "Recusado", color: "bg-red-100 text-red-700", icon: X },
};

export default function SeguroPage() {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"apolices" | "reclamacoes" | "resumo">("apolices");

  // Annual Summary calculations
  const totalSpent = claims.reduce((sum, c) => sum + c.amount, 0);
  const totalReimbursed = claims
    .filter((c) => c.status === "reimbursed" || c.status === "approved")
    .reduce((sum, c) => sum + (c.reimbursedAmount || 0), 0);
  const outOfPocket = totalSpent - totalReimbursed;
  const totalPremiums = policies.reduce((sum, p) => sum + p.monthlyPremium * 12, 0);

  // Family member coverage breakdown
  const memberBreakdown = ["Joao Silva", "Maria Silva", "Tomas Silva", "Sofia Silva"].map((name) => {
    const memberClaims = claims.filter((c) => c.member === name);
    const spent = memberClaims.reduce((sum, c) => sum + c.amount, 0);
    const reimbursed = memberClaims
      .filter((c) => c.status === "reimbursed" || c.status === "approved")
      .reduce((sum, c) => sum + (c.reimbursedAmount || 0), 0);
    return { name, spent, reimbursed, claims: memberClaims.length };
  });

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Seguro de Saude</h1>
            <p className="text-xs text-gray-500">{policies.length} apolice{policies.length > 1 ? "s" : ""} activa{policies.length > 1 ? "s" : ""}</p>
          </div>
          <button className="rounded-full bg-primary-500 p-2 text-white shadow-sm transition-colors hover:bg-primary-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          {[
            { id: "apolices" as const, label: "Apolices" },
            { id: "reclamacoes" as const, label: "Reclamacoes" },
            { id: "resumo" as const, label: "Resumo" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-4 py-6">
        {activeTab === "apolices" && (
          <>
            {policies.map((policy) => {
              const usagePercent = (policy.amountUsed / policy.annualLimit) * 100;
              const isExpanded = expandedPolicy === policy.id;

              return (
                <div key={policy.id} className="card space-y-3">
                  {/* Policy Header */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{policy.provider}</p>
                      <p className="text-xs text-gray-500">{policy.planName}</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      {policy.coverageType}
                    </span>
                  </div>

                  {/* Usage Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Utilizado</span>
                      <span className="font-medium text-gray-700">
                        {policy.amountUsed.toLocaleString("pt-MZ")} / {policy.annualLimit.toLocaleString("pt-MZ")} MT
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          usagePercent > 80
                            ? "bg-red-500"
                            : usagePercent > 50
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                    <p className="text-2xs text-gray-400 mt-1">{usagePercent.toFixed(0)}% utilizado | Restam {(policy.annualLimit - policy.amountUsed).toLocaleString("pt-MZ")} MT</p>
                  </div>

                  {/* Monthly Premium */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                    <span className="text-xs text-gray-500">Premio Mensal</span>
                    <span className="text-sm font-bold text-gray-900">{policy.monthlyPremium.toLocaleString("pt-MZ")} MT</span>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedPolicy(isExpanded ? null : policy.id)}
                    className="w-full flex items-center justify-center gap-1 text-xs text-primary-500 font-medium py-1 hover:text-primary-600 transition-colors"
                  >
                    {isExpanded ? "Ocultar detalhes" : "Ver detalhes da cobertura"}
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100 pt-3 space-y-3">
                      {/* Policy Details */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-gray-400">N. Apolice</p>
                          <p className="font-mono font-medium text-gray-900">{policy.policyNumber}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-gray-400">Validade</p>
                          <p className="font-medium text-gray-900">
                            {new Date(policy.endDate).toLocaleDateString("pt-PT")}
                          </p>
                        </div>
                      </div>

                      {/* Coverage Details */}
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                          Cobertura
                        </p>
                        <div className="space-y-1.5">
                          {policy.coverageDetails.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                              <span className="text-xs text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Family Members */}
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                          Membros Cobertos
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {policy.familyMembers.map((member) => (
                            <span
                              key={member}
                              className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full text-xs font-medium"
                            >
                              <User className="h-3 w-3" />
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {activeTab === "reclamacoes" && (
          <>
            {/* Add Claim */}
            <button className="card flex w-full items-center justify-center gap-2 border-2 border-dashed border-primary-200 py-4 text-sm font-medium text-primary-500 transition-colors hover:border-primary-400 hover:bg-primary-50">
              <Plus className="h-5 w-5" />
              Nova Reclamacao
            </button>

            {/* Claims List */}
            <section className="space-y-2">
              {claims.map((claim) => {
                const status = statusConfig[claim.status];
                const StatusIcon = status.icon;

                return (
                  <div key={claim.id} className="card flex items-center gap-3">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${status.color}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{claim.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(claim.date).toLocaleDateString("pt-PT")}
                        </span>
                        <span className="text-xs text-gray-400">{claim.member}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-900">{claim.amount.toLocaleString("pt-MZ")} MT</p>
                      <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-2xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                      {claim.reimbursedAmount && claim.status !== "denied" && (
                        <p className="text-2xs text-emerald-600 mt-0.5">
                          Reembolso: {claim.reimbursedAmount.toLocaleString("pt-MZ")} MT
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        )}

        {activeTab === "resumo" && (
          <>
            {/* Annual Summary */}
            <section className="card space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Resumo Anual 2026</h2>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-2xs text-gray-400 uppercase">Total Gasto</p>
                  <p className="text-lg font-bold text-gray-900">{totalSpent.toLocaleString("pt-MZ")} MT</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                  <TrendingUp className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                  <p className="text-2xs text-emerald-600 uppercase">Reembolsado</p>
                  <p className="text-lg font-bold text-emerald-700">{totalReimbursed.toLocaleString("pt-MZ")} MT</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-center">
                  <AlertCircle className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                  <p className="text-2xs text-amber-600 uppercase">Do Bolso</p>
                  <p className="text-lg font-bold text-amber-700">{outOfPocket.toLocaleString("pt-MZ")} MT</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <Shield className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-2xs text-blue-600 uppercase">Premios Anuais</p>
                  <p className="text-lg font-bold text-blue-700">{totalPremiums.toLocaleString("pt-MZ")} MT</p>
                </div>
              </div>
            </section>

            {/* Family Member Breakdown */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Por Membro da Familia</h2>
              <div className="space-y-3">
                {memberBreakdown.map((member) => (
                  <div key={member.name} className="card flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.claims} reclamacao{member.claims !== 1 ? "oes" : ""}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-gray-900">{member.spent.toLocaleString("pt-MZ")} MT</p>
                      {member.reimbursed > 0 && (
                        <p className="text-2xs text-emerald-600">
                          Reembolso: {member.reimbursed.toLocaleString("pt-MZ")} MT
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
