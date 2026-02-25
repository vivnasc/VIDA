"use client";

import { useState } from "react";
import {
  Syringe,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  AlertTriangle,
  Shield,
} from "lucide-react";

/* ─── Mock Data ─── */
const familyMembers = [
  { id: "1", name: "João Silva", avatar: "JS" },
  { id: "2", name: "Maria Silva", avatar: "MS" },
  { id: "3", name: "Tomás Silva", avatar: "TS" },
  { id: "4", name: "Sofia Silva", avatar: "SS" },
];

const vaccinationRecords: Record<string, Array<{
  id: string;
  name: string;
  date: string;
  dose: string;
  location: string;
  nextDose?: string;
  completed: boolean;
}>> = {
  "1": [
    { id: "v1", name: "COVID-19 (Pfizer)", date: "15 Set 2024", dose: "4.a dose (reforço)", location: "Centro de Vacinação Lisboa", completed: true },
    { id: "v2", name: "Gripe Sazonal", date: "10 Out 2025", dose: "Dose anual", location: "Farmácia Central", completed: true },
    { id: "v3", name: "Tétano/Difteria (Td)", date: "5 Mar 2020", dose: "Reforço", location: "Centro de Saúde Almada", nextDose: "Mar 2030", completed: true },
    { id: "v4", name: "Hepatite B", date: "12 Fev 2000", dose: "3.a dose", location: "Centro de Saúde Almada", completed: true },
  ],
  "2": [
    { id: "v5", name: "COVID-19 (Pfizer)", date: "20 Set 2024", dose: "4.a dose (reforço)", location: "Centro de Vacinação Lisboa", completed: true },
    { id: "v6", name: "Gripe Sazonal", date: "10 Out 2025", dose: "Dose anual", location: "Farmácia Central", completed: true },
    { id: "v7", name: "HPV (Gardasil 9)", date: "8 Jun 2005", dose: "3.a dose", location: "Centro de Saúde Almada", completed: true },
  ],
  "3": [
    { id: "v8", name: "DTPa (Difteria/Tétano/Pertussis)", date: "12 Abr 2023", dose: "5.a dose", location: "Centro de Saúde Almada", completed: true },
    { id: "v9", name: "VIP (Poliomielite)", date: "12 Abr 2023", dose: "4.a dose", location: "Centro de Saúde Almada", completed: true },
    { id: "v10", name: "VASPR (Sarampo/Papeira/Rubéola)", date: "18 Jun 2023", dose: "2.a dose", location: "Centro de Saúde Almada", completed: true },
    { id: "v11", name: "Tétano", date: "", dose: "Reforço 10 anos", location: "", nextDose: "Abr 2033", completed: false },
  ],
  "4": [
    { id: "v12", name: "DTPa (Difteria/Tétano/Pertussis)", date: "15 Mar 2023", dose: "4.a dose", location: "Centro de Saúde Almada", completed: true },
    { id: "v13", name: "VIP (Poliomielite)", date: "15 Mar 2023", dose: "3.a dose", location: "Centro de Saúde Almada", completed: true },
    { id: "v14", name: "VASPR (Sarampo/Papeira/Rubéola)", date: "20 Set 2022", dose: "1.a dose", location: "Centro de Saúde Almada", nextDose: "5 anos", completed: true },
    { id: "v15", name: "Hepatite A", date: "", dose: "1.a dose", location: "", nextDose: "Em breve", completed: false },
  ],
};

const upcomingVaccinations = [
  { id: "u1", member: "Tomás Silva", vaccine: "Tétano (Reforço)", dueDate: "Abr 2033", urgency: "low" as const },
  { id: "u2", member: "Sofia Silva", vaccine: "VASPR 2.a dose", dueDate: "Set 2027", urgency: "low" as const },
  { id: "u3", member: "Sofia Silva", vaccine: "Hepatite A 1.a dose", dueDate: "Em breve", urgency: "high" as const },
];

export default function VacinasPage() {
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]!.id);
  const records = vaccinationRecords[selectedMember] || [];
  const completedRecords = records.filter((r) => r.completed);
  const pendingRecords = records.filter((r) => !r.completed);

  return (
    <>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Vacinas</h1>
            <p className="text-xs text-gray-500">Boletim de vacinas familiar</p>
          </div>
          <button className="rounded-full bg-primary-500 p-2 text-white shadow-sm transition-colors hover:bg-primary-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Member Selector */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {familyMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member.id)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedMember === member.id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  selectedMember === member.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {member.avatar}
              </span>
              {member.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-4 py-6">
        {/* ─── Vaccination Card ─── */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900">Boletim de Vacinas</h2>
          </div>

          {/* Completed Vaccines */}
          <div className="space-y-2">
            {completedRecords.map((record) => (
              <div key={record.id} className="card flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{record.name}</p>
                  <p className="text-xs text-gray-500">{record.dose}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {record.date}
                    </span>
                    {record.location && (
                      <span className="truncate">{record.location}</span>
                    )}
                  </div>
                  {record.nextDose && (
                    <p className="mt-1 text-xs text-blue-600">
                      Próxima dose: {record.nextDose}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pending Vaccines */}
          {pendingRecords.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-amber-700">Pendentes</h3>
              {pendingRecords.map((record) => (
                <div
                  key={record.id}
                  className="card flex items-start gap-3 border-l-4 border-l-amber-400 bg-amber-50/30"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{record.name}</p>
                    <p className="text-xs text-gray-500">{record.dose}</p>
                    {record.nextDose && (
                      <p className="mt-1 text-xs text-amber-600">
                        Prevista: {record.nextDose}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ─── Upcoming Vaccinations (All Family) ─── */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Próximas Vacinas (Família)</h2>
          <div className="space-y-2">
            {upcomingVaccinations.map((vac) => (
              <div
                key={vac.id}
                className={`card flex items-center gap-3 ${
                  vac.urgency === "high"
                    ? "border-l-4 border-l-red-400"
                    : ""
                }`}
              >
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                    vac.urgency === "high"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Syringe className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{vac.vaccine}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {vac.member}
                    </span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {vac.dueDate}
                    </span>
                  </div>
                </div>
                {vac.urgency === "high" && (
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Add Record Button */}
        <button className="card flex w-full items-center justify-center gap-2 border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-primary-300 hover:text-primary-500">
          <Plus className="h-5 w-5" />
          Registar Vacina
        </button>
      </main>

      {/* FAB */}
      <button className="fab">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}
