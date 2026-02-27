"use client";

import {
  FileText,
  Plus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Calendar,
  Landmark,
  ChevronRight,
} from "lucide-react";

interface License {
  id: string;
  name: string;
  issuer: string;
  cost: number;
  issueDate?: string;
  expiryDate?: string;
  status: "valid" | "expiring" | "expired" | "pending";
  daysLeft?: number;
}

const MOCK_LICENSES: License[] = [
  {
    id: "1", name: "Alvará Comercial", issuer: "Município de Maputo",
    cost: 1200, issueDate: "2026-01-15", expiryDate: "2027-01-15",
    status: "valid", daysLeft: 322,
  },
  {
    id: "2", name: "Licença Sanitária", issuer: "Ministério da Saúde",
    cost: 800, issueDate: "2025-06-01", expiryDate: "2026-06-01",
    status: "valid", daysLeft: 94,
  },
  {
    id: "3", name: "Registo INSS", issuer: "INSS",
    cost: 0, issueDate: "2024-03-15",
    status: "valid",
  },
  {
    id: "4", name: "Licença de Publicidade", issuer: "Município de Maputo",
    cost: 500, expiryDate: "2026-03-30",
    status: "expiring", daysLeft: 31,
  },
  {
    id: "5", name: "Certificação Cosméticos", issuer: "INNOQ",
    cost: 1500,
    status: "pending",
  },
];

const MOCK_TAX_CALENDAR = [
  { month: "Março", obligation: "IRPC — Declaração anual", deadline: "31 Março" },
  { month: "Março", obligation: "INSS — Contribuição mensal", deadline: "15 Março" },
  { month: "Abril", obligation: "IVA — Declaração trimestral", deadline: "30 Abril" },
];

const STATUS_CONFIG = {
  valid: { label: "Válida", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  expiring: { label: "A Expirar", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  expired: { label: "Expirada", icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  pending: { label: "Pendente", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
};

export default function LicencasPage() {
  const validCount = MOCK_LICENSES.filter((l) => l.status === "valid").length;
  const expiringCount = MOCK_LICENSES.filter((l) => l.status === "expiring").length;
  const totalCost = MOCK_LICENSES.reduce((s, l) => s + l.cost, 0);

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Licenças & Compliance</h1>
          <button className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-3 text-center">
            <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">Válidas</p>
            <p className="text-lg font-bold text-emerald-600">{validCount}</p>
          </div>
          <div className="card p-3 text-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-xs text-[var(--color-text-muted)]">A Expirar</p>
            <p className="text-lg font-bold text-amber-600">{expiringCount}</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-xs text-[var(--color-text-muted)]">Custo Anual</p>
            <p className="text-sm font-bold">{totalCost.toLocaleString("pt-MZ")}</p>
            <p className="text-2xs text-[var(--color-text-muted)]">MZN</p>
          </div>
        </div>

        {/* Expiring Alert */}
        {expiringCount > 0 && (
          <div className="card p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800">Atenção!</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  {expiringCount} licença(s) a expirar nos próximos 60 dias. Renova antes para evitar multas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Licenses List */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Licenças & Documentos</h3>
          <div className="space-y-3">
            {MOCK_LICENSES.map((license) => {
              const config = STATUS_CONFIG[license.status];
              const StatusIcon = config.icon;

              return (
                <div key={license.id} className={`card p-4 ${config.border}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <FileText className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold truncate">{license.name}</p>
                        <span className={`text-2xs font-medium px-1.5 py-0.5 rounded-md ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {license.issuer}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--color-text-muted)]">
                        {license.cost > 0 && (
                          <span>{license.cost.toLocaleString("pt-MZ")} MZN/ano</span>
                        )}
                        {license.expiryDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Expira: {new Date(license.expiryDate + "T00:00:00").toLocaleDateString("pt-MZ", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      {license.daysLeft !== undefined && license.status === "expiring" && (
                        <p className="text-xs text-amber-600 font-medium mt-1">
                          ⚠️ {license.daysLeft} dias restantes — reserva {license.cost.toLocaleString("pt-MZ")} MZN
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tax Calendar */}
        <section className="card p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-primary-500" />
            Calendário Fiscal
          </h3>
          <div className="space-y-2">
            {MOCK_TAX_CALENDAR.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-[var(--color-border)] last:border-0">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.obligation}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Prazo: {item.deadline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
