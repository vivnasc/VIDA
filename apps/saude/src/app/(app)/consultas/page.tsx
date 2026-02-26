"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  MapPin,
  Clock,
  Stethoscope,
  FileText,
  ChevronRight,
  User,
  CheckCircle2,
} from "lucide-react";

/* ─── Mock Data ─── */
const upcomingAppointments = [
  {
    id: "1",
    provider: "Dr. António Ferreira",
    specialty: "Medicina Dentária",
    date: "28 Fev 2026",
    time: "10:00",
    location: "Clínica Dental Plus, Lisboa",
    member: "João Silva",
    status: "confirmed" as const,
    notes: "",
  },
  {
    id: "2",
    provider: "Dra. Carla Santos",
    specialty: "Ginecologia e Obstetrícia",
    date: "5 Mar 2026",
    time: "14:30",
    location: "Hospital da Luz, Lisboa",
    member: "Maria Silva",
    status: "confirmed" as const,
    notes: "",
  },
  {
    id: "3",
    provider: "Dr. Pedro Costa",
    specialty: "Pediatria",
    date: "12 Mar 2026",
    time: "11:00",
    location: "Centro de Saúde Almada",
    member: "Tomás Silva",
    status: "pending" as const,
    notes: "",
  },
  {
    id: "4",
    provider: "Dra. Ana Rodrigues",
    specialty: "Endocrinologia",
    date: "20 Mar 2026",
    time: "09:00",
    location: "CUF Descobertas, Lisboa",
    member: "João Silva",
    status: "pending" as const,
    notes: "",
  },
];

const pastAppointments = [
  {
    id: "p1",
    provider: "Dr. Miguel Nunes",
    specialty: "Medicina Geral",
    date: "10 Jan 2026",
    time: "16:00",
    location: "Centro de Saúde Almada",
    member: "João Silva",
    status: "completed" as const,
    notes: "Check-up anual. Resultados analíticos normais. Manter medicação atual. Próxima consulta em 6 meses.",
  },
  {
    id: "p2",
    provider: "Dra. Sofia Martins",
    specialty: "Oftalmologia",
    date: "18 Dez 2025",
    time: "10:30",
    location: "Clínica OcularVis, Lisboa",
    member: "Maria Silva",
    status: "completed" as const,
    notes: "Exame de rotina. Ligeira miopia no olho esquerdo. Receita atualizada.",
  },
  {
    id: "p3",
    provider: "Dr. Pedro Costa",
    specialty: "Pediatria",
    date: "20 Nov 2025",
    time: "14:00",
    location: "Centro de Saúde Almada",
    member: "Tomás Silva",
    status: "completed" as const,
    notes: "Consulta de rotina. Crescimento adequado. Asma controlada.",
  },
];

const statusConfig = {
  confirmed: { label: "Confirmada", className: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Pendente", className: "bg-amber-50 text-amber-700" },
  completed: { label: "Realizada", className: "bg-blue-50 text-blue-700" },
  cancelled: { label: "Cancelada", className: "bg-red-50 text-red-700" },
};

export default function ConsultasPage() {
  const [activeTab, setActiveTab] = useState<"proximas" | "historico">("proximas");
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);

  return (
    <>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Consultas</h1>
            <p className="text-xs text-gray-500">
              {upcomingAppointments.length} consulta{upcomingAppointments.length !== 1 ? "s" : ""} agendada{upcomingAppointments.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="rounded-full bg-primary-500 p-2 text-white shadow-sm transition-colors hover:bg-primary-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-3">
          <button
            onClick={() => setActiveTab("proximas")}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "proximas"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Próximas
          </button>
          <button
            onClick={() => setActiveTab("historico")}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "historico"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Histórico
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 py-6">
        {activeTab === "proximas" ? (
          <>
            {/* ─── Upcoming Timeline ─── */}
            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute bottom-0 left-[22px] top-0 w-0.5 bg-gray-100" />

              {upcomingAppointments.map((appt, index) => {
                const status = statusConfig[appt.status];

                return (
                  <div key={appt.id} className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary-200 bg-white">
                      <Stethoscope className="h-5 w-5 text-primary-500" />
                    </div>

                    <div className="card flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{appt.provider}</p>
                          <p className="text-xs text-primary-600">{appt.specialty}</p>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${status.className}`}>
                          {status.label}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          <span>{appt.date}</span>
                          <Clock className="ml-2 h-3 w-3" />
                          <span>{appt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          <span>{appt.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3 w-3" />
                          <span>{appt.member}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* ─── Past Appointments ─── */}
            <div className="space-y-3">
              {pastAppointments.map((appt) => {
                const status = statusConfig[appt.status];
                const isExpanded = expandedNotes === appt.id;

                return (
                  <div key={appt.id} className="card space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{appt.provider}</p>
                          <p className="text-xs text-gray-500">{appt.specialty}</p>
                        </div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${status.className}`}>
                        {status.label}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {appt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {appt.member}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {appt.location}
                      </span>
                    </div>

                    {appt.notes && (
                      <button
                        onClick={() =>
                          setExpandedNotes(isExpanded ? null : appt.id)
                        }
                        className="flex w-full items-center gap-1.5 border-t border-gray-50 pt-2 text-xs font-medium text-primary-500 hover:text-primary-600"
                      >
                        <FileText className="h-3 w-3" />
                        {isExpanded ? "Esconder notas" : "Ver notas"}
                        <ChevronRight
                          className={`h-3 w-3 transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    )}

                    {isExpanded && appt.notes && (
                      <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                        {appt.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* FAB */}
      <button className="fab">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}
