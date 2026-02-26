"use client";

import { useState } from "react";
import {
  Heart,
  Pill,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Activity,
  Stethoscope,
  Phone,
  Home,
  Users,
  MoreHorizontal,
  Check,
  X,
  Bell,
} from "lucide-react";
import Link from "next/link";

/* ─── Mock Data ─── */
const familyMembers = [
  {
    id: "1",
    name: "João Silva",
    avatar: "JS",
    role: "Tu",
    nextAppointment: "Dentista - 28 Fev",
    activeMedications: 2,
    alerts: 1,
  },
  {
    id: "2",
    name: "Maria Silva",
    avatar: "MS",
    role: "Cônjuge",
    nextAppointment: "Ginecologista - 5 Mar",
    activeMedications: 1,
    alerts: 0,
  },
  {
    id: "3",
    name: "Tomás Silva",
    avatar: "TS",
    role: "Filho",
    nextAppointment: "Pediatra - 12 Mar",
    activeMedications: 0,
    alerts: 2,
  },
];

const todayMedications = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    time: "08:00",
    member: "João Silva",
    taken: true,
    period: "Manhã",
  },
  {
    id: "2",
    name: "Metformina",
    dosage: "500mg",
    time: "08:00",
    member: "João Silva",
    taken: true,
    period: "Manhã",
  },
  {
    id: "3",
    name: "Anticoncepcional",
    dosage: "1 comprimido",
    time: "09:00",
    member: "Maria Silva",
    taken: false,
    period: "Manhã",
  },
  {
    id: "4",
    name: "Metformina",
    dosage: "500mg",
    time: "13:00",
    member: "João Silva",
    taken: false,
    period: "Tarde",
  },
  {
    id: "5",
    name: "Lisinopril",
    dosage: "10mg",
    time: "20:00",
    member: "João Silva",
    taken: false,
    period: "Noite",
  },
];

const upcomingAppointments = [
  {
    id: "1",
    provider: "Dr. António Ferreira",
    specialty: "Dentista",
    datetime: "28 Fev, 10:00",
    location: "Clínica Dental Plus",
    member: "João Silva",
  },
  {
    id: "2",
    provider: "Dra. Carla Santos",
    specialty: "Ginecologista",
    datetime: "5 Mar, 14:30",
    location: "Hospital da Luz",
    member: "Maria Silva",
  },
  {
    id: "3",
    provider: "Dr. Pedro Costa",
    specialty: "Pediatra",
    datetime: "12 Mar, 11:00",
    location: "Centro de Saúde Almada",
    member: "Tomás Silva",
  },
];

const healthAlerts = [
  {
    id: "1",
    type: "stock",
    message: "Lisinopril - restam apenas 5 comprimidos",
    severity: "warning" as const,
    member: "João Silva",
  },
  {
    id: "2",
    type: "missed",
    message: "Vacina Tétano em atraso (Tomás)",
    severity: "error" as const,
    member: "Tomás Silva",
  },
  {
    id: "3",
    type: "checkup",
    message: "Check-up anual em atraso (Tomás)",
    severity: "warning" as const,
    member: "Tomás Silva",
  },
];

const quickActions = [
  {
    label: "Nova Consulta",
    icon: Stethoscope,
    href: "/(app)/consultas",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Adicionar Medicação",
    icon: Pill,
    href: "/(app)/medicacao",
    color: "bg-purple-50 text-purple-600",
  },
  {
    label: "Registar Métrica",
    icon: Activity,
    href: "#",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Emergência",
    icon: Phone,
    href: "tel:112",
    color: "bg-red-50 text-red-600",
  },
];

const navItems = [
  { label: "Início", icon: Home, href: "/", active: true },
  { label: "Perfis", icon: Users, href: "/(app)/perfis", active: false },
  { label: "Medicação", icon: Pill, href: "/(app)/medicacao", active: false },
  { label: "Consultas", icon: Calendar, href: "/(app)/consultas", active: false },
  { label: "Mais", icon: MoreHorizontal, href: "#", active: false },
];

export default function SaudeDashboard() {
  const [medications, setMedications] = useState(todayMedications);

  const handleTakeMedication = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: true } : med))
    );
  };

  const handleSkipMedication = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: false } : med))
    );
  };

  const takenCount = medications.filter((m) => m.taken).length;
  const totalCount = medications.length;

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              VIDA.<span className="text-primary-500">SAÚDE</span>
            </h1>
            <p className="text-xs text-gray-500">Tua saúde e da tua família, organizada</p>
          </div>
          <button className="relative rounded-full bg-primary-50 p-2 text-primary-600 transition-colors hover:bg-primary-100">
            <Bell className="h-5 w-5" />
            {healthAlerts.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                {healthAlerts.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-4 py-6">
        {/* ─── Medication Progress ─── */}
        <section className="gradient-rose rounded-2xl p-4 text-white shadow-lg shadow-primary-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Medicação de hoje</p>
              <p className="mt-1 text-2xl font-bold">
                {takenCount}/{totalCount} tomadas
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Heart className="h-7 w-7" />
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${totalCount > 0 ? (takenCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </section>

        {/* ─── Family Health Overview ─── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Família</h2>
            <Link href="/(app)/perfis" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="card flex items-center gap-3 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                  {member.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                      {member.role}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {member.nextAppointment}
                    </span>
                    {member.activeMedications > 0 && (
                      <span className="flex items-center gap-1">
                        <Pill className="h-3 w-3" />
                        {member.activeMedications} med.
                      </span>
                    )}
                  </div>
                </div>
                {member.alerts > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-600">
                    {member.alerts}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-300" />
              </div>
            ))}
          </div>
        </section>

        {/* ─── Today's Medications ─── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Medicação Hoje</h2>
            <Link href="/(app)/medicacao" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              Ver tudo
            </Link>
          </div>
          <div className="space-y-2">
            {medications.map((med) => (
              <div
                key={med.id}
                className={`card flex items-center gap-3 transition-all ${
                  med.taken ? "opacity-60" : ""
                }`}
              >
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                    med.taken
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-primary-50 text-primary-500"
                  }`}
                >
                  {med.taken ? <Check className="h-4 w-4" /> : <Pill className="h-4 w-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${med.taken ? "text-gray-400 line-through" : "text-gray-900"}`}>
                    {med.name} - {med.dosage}
                  </p>
                  <p className="text-xs text-gray-500">
                    {med.time} &middot; {med.member}
                  </p>
                </div>
                {!med.taken && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleTakeMedication(med.id)}
                      className="rounded-lg bg-emerald-50 p-1.5 text-emerald-600 transition-colors hover:bg-emerald-100"
                      title="Tomar"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSkipMedication(med.id)}
                      className="rounded-lg bg-gray-50 p-1.5 text-gray-400 transition-colors hover:bg-gray-100"
                      title="Saltar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─── Upcoming Appointments ─── */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Próximas Consultas</h2>
            <Link href="/(app)/consultas" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              Ver todas
            </Link>
          </div>
          <div className="space-y-2">
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="card flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{appt.provider}</p>
                  <p className="text-xs text-gray-500">
                    {appt.specialty} &middot; {appt.datetime}
                  </p>
                  <p className="text-xs text-gray-400">{appt.location}</p>
                </div>
                <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-600">
                  {appt.member.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Health Alerts ─── */}
        {healthAlerts.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-900">Alertas de Saúde</h2>
            </div>
            <div className="space-y-2">
              {healthAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`card flex items-center gap-3 border-l-4 ${
                    alert.severity === "error"
                      ? "border-l-red-500 bg-red-50/50"
                      : "border-l-amber-500 bg-amber-50/50"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      alert.severity === "error"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.member}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-300" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── Quick Actions ─── */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="card flex flex-col items-center gap-2 py-5 text-center transition-shadow hover:shadow-md"
              >
                <div className={`rounded-xl p-2.5 ${action.color}`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-gray-700">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ─── Bottom Navigation ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 pb-safe backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors ${
                item.active
                  ? "text-primary-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
