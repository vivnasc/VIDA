"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Droplets,
  AlertCircle,
  Activity,
  Calendar,
  ChevronRight,
  Shield,
  Search,
} from "lucide-react";

/* ─── Mock Data ─── */
const familyProfiles = [
  {
    id: "1",
    name: "João Silva",
    avatar: "JS",
    role: "Tu",
    bloodType: "A+",
    allergies: ["Penicilina", "Pólen"],
    conditions: ["Hipertensão", "Diabetes Tipo 2"],
    lastCheckup: "15 Jan 2026",
    insurance: "Médis",
    age: 42,
  },
  {
    id: "2",
    name: "Maria Silva",
    avatar: "MS",
    role: "Cônjuge",
    bloodType: "O-",
    allergies: ["Marisco"],
    conditions: [],
    lastCheckup: "3 Dez 2025",
    insurance: "Médis",
    age: 39,
  },
  {
    id: "3",
    name: "Tomás Silva",
    avatar: "TS",
    role: "Filho",
    bloodType: "A+",
    allergies: [],
    conditions: ["Asma leve"],
    lastCheckup: "20 Jun 2025",
    insurance: "Médis",
    age: 8,
  },
  {
    id: "4",
    name: "Sofia Silva",
    avatar: "SS",
    role: "Filha",
    bloodType: "O+",
    allergies: ["Lactose"],
    conditions: [],
    lastCheckup: "10 Nov 2025",
    insurance: "Médis",
    age: 5,
  },
];

export default function PerfisPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfiles = familyProfiles.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Perfis de Saúde</h1>
            <p className="text-xs text-gray-500">{familyProfiles.length} membros da família</p>
          </div>
          <button className="rounded-full bg-primary-500 p-2 text-white shadow-sm transition-colors hover:bg-primary-600">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Procurar membro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 py-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="card space-y-3 transition-shadow hover:shadow-md"
          >
            {/* Profile Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                {profile.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    {profile.role}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{profile.age} anos</p>
              </div>
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-300" />
            </div>

            {/* Health Summary */}
            <div className="flex flex-wrap gap-2">
              {/* Blood Type */}
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                <Droplets className="h-3 w-3" />
                {profile.bloodType}
              </span>

              {/* Allergies */}
              {profile.allergies.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                  <AlertCircle className="h-3 w-3" />
                  {profile.allergies.length} alergia{profile.allergies.length > 1 ? "s" : ""}
                </span>
              )}

              {/* Conditions */}
              {profile.conditions.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  <Activity className="h-3 w-3" />
                  {profile.conditions.length} condição{profile.conditions.length > 1 ? "ões" : ""}
                </span>
              )}

              {/* Insurance */}
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                <Shield className="h-3 w-3" />
                {profile.insurance}
              </span>
            </div>

            {/* Last Checkup */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Último check-up: {profile.lastCheckup}</span>
            </div>

            {/* Details */}
            {(profile.allergies.length > 0 || profile.conditions.length > 0) && (
              <div className="border-t border-gray-50 pt-2">
                {profile.allergies.length > 0 && (
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Alergias:</span>{" "}
                    {profile.allergies.join(", ")}
                  </p>
                )}
                {profile.conditions.length > 0 && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Condições:</span>{" "}
                    {profile.conditions.join(", ")}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredProfiles.length === 0 && (
          <div className="py-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">Nenhum perfil encontrado</p>
          </div>
        )}

        {/* Add Profile Button */}
        <button className="card flex w-full items-center justify-center gap-2 border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-primary-300 hover:text-primary-500">
          <Plus className="h-5 w-5" />
          Adicionar Perfil
        </button>
      </main>
    </>
  );
}
