"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Plus,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Scissors,
  AlertCircle,
} from "lucide-react";

type AppointmentStatus = "pendente" | "confirmado" | "concluido" | "cancelado";

interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: AppointmentStatus;
  notes?: string;
}

const STATUS_CONFIG: Record<AppointmentStatus, { label: string; color: string; bg: string }> = {
  pendente: { label: "Pendente", color: "text-amber-700", bg: "bg-amber-50" },
  confirmado: { label: "Confirmado", color: "text-blue-700", bg: "bg-blue-50" },
  concluido: { label: "Concluído", color: "text-emerald-700", bg: "bg-emerald-50" },
  cancelado: { label: "Cancelado", color: "text-red-700", bg: "bg-red-50" },
};

const HOURS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
];

const MOCK_SERVICES = [
  { name: "Tranças", duration: 120, price: 1500 },
  { name: "Alisamento", duration: 90, price: 2500 },
  { name: "Corte + Escova", duration: 45, price: 800 },
  { name: "Unhas gel", duration: 60, price: 600 },
  { name: "Manicure simples", duration: 30, price: 300 },
  { name: "Makeup", duration: 60, price: 1200 },
];

function getWeekDays(baseDate: Date): Date[] {
  const start = new Date(baseDate);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function formatDateISO(d: Date): string {
  return d.toISOString().split("T")[0]!;
}

const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export default function AgendamentosPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekBase, setWeekBase] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      customerName: "Ana Silva",
      customerPhone: "+258 84 123 4567",
      service: "Tranças",
      date: formatDateISO(new Date()),
      time: "09:00",
      duration: 120,
      price: 1500,
      status: "confirmado",
    },
    {
      id: "2",
      customerName: "Maria João",
      customerPhone: "+258 85 987 6543",
      service: "Unhas gel",
      date: formatDateISO(new Date()),
      time: "14:00",
      duration: 60,
      price: 600,
      status: "pendente",
    },
    {
      id: "3",
      customerName: "Fatima Ramos",
      customerPhone: "+258 84 555 1234",
      service: "Alisamento",
      date: formatDateISO(new Date()),
      time: "11:00",
      duration: 90,
      price: 2500,
      status: "confirmado",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    service: "",
    time: "",
    notes: "",
  });

  const weekDays = getWeekDays(weekBase);
  const selectedDateISO = formatDateISO(selectedDate);
  const todayISO = formatDateISO(new Date());

  const dayAppointments = appointments
    .filter((a) => a.date === selectedDateISO && a.status !== "cancelado")
    .sort((a, b) => a.time.localeCompare(b.time));

  const totalRevenue = dayAppointments.reduce((sum, a) => sum + a.price, 0);

  const handleAddAppointment = () => {
    const service = MOCK_SERVICES.find((s) => s.name === formData.service);
    if (!formData.customerName || !formData.service || !formData.time || !service) return;

    const newAppt: Appointment = {
      id: generateId(),
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      service: formData.service,
      date: selectedDateISO,
      time: formData.time,
      duration: service.duration,
      price: service.price,
      status: "pendente",
      notes: formData.notes || undefined,
    };

    setAppointments([...appointments, newAppt]);
    setFormData({ customerName: "", customerPhone: "", service: "", time: "", notes: "" });
    setShowForm(false);
  };

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleCancel = (id: string) => {
    handleStatusChange(id, "cancelado");
  };

  const navigateWeek = (dir: number) => {
    const d = new Date(weekBase);
    d.setDate(d.getDate() + dir * 7);
    setWeekBase(d);
  };

  const busyTimes = dayAppointments.map((a) => a.time);
  const availableHours = HOURS.filter((h) => !busyTimes.includes(h));

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-br from-pink-500 to-rose-500 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Marcações</h1>
            <p className="text-pink-100 text-sm">Agenda do teu negócio</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xs text-pink-100">Hoje</p>
            <p className="text-lg font-bold">{dayAppointments.length}</p>
            <p className="text-2xs text-pink-100">marcações</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xs text-pink-100">Receita esperada</p>
            <p className="text-lg font-bold">{totalRevenue.toLocaleString("pt-MZ")}</p>
            <p className="text-2xs text-pink-100">MZN</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xs text-pink-100">Livres</p>
            <p className="text-lg font-bold">{availableHours.length}</p>
            <p className="text-2xs text-pink-100">horários</p>
          </div>
        </div>
      </header>

      <main className="px-4 mt-4 space-y-4">
        {/* Week calendar */}
        <div className="card p-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => navigateWeek(-1)} className="p-1">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <p className="text-xs font-medium text-[var(--color-text-muted)]">
              {weekDays[0]!.toLocaleDateString("pt-MZ", { month: "long", year: "numeric" })}
            </p>
            <button onClick={() => navigateWeek(1)} className="p-1">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((d) => {
              const iso = formatDateISO(d);
              const isSelected = iso === selectedDateISO;
              const isToday = iso === todayISO;
              const hasAppts = appointments.some((a) => a.date === iso && a.status !== "cancelado");

              return (
                <button
                  key={iso}
                  onClick={() => setSelectedDate(d)}
                  className={`flex flex-col items-center py-2 rounded-xl transition-all ${
                    isSelected
                      ? "bg-pink-500 text-white"
                      : isToday
                        ? "bg-pink-50 text-pink-600"
                        : "text-gray-600"
                  }`}
                >
                  <span className="text-2xs">{DAYS_PT[d.getDay()]}</span>
                  <span className={`text-sm font-bold ${isSelected ? "" : ""}`}>
                    {d.getDate()}
                  </span>
                  {hasAppts && !isSelected && (
                    <div className="w-1 h-1 rounded-full bg-pink-400 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day's appointments */}
        <div>
          <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">
            {selectedDate.toLocaleDateString("pt-MZ", { weekday: "long", day: "numeric", month: "long" })}
          </p>

          {dayAppointments.length === 0 ? (
            <div className="card p-8 text-center">
              <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Sem marcações neste dia</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 px-4 py-2 bg-pink-500 text-white text-xs rounded-xl font-medium"
              >
                Adicionar marcação
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {dayAppointments.map((appt) => {
                const statusCfg = STATUS_CONFIG[appt.status];
                const endHour = (() => {
                  const [h, m] = appt.time.split(":").map(Number);
                  const totalMin = h! * 60 + m! + appt.duration;
                  return `${String(Math.floor(totalMin / 60)).padStart(2, "0")}:${String(totalMin % 60).padStart(2, "0")}`;
                })();

                return (
                  <div key={appt.id} className="card p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                          <Scissors className="w-5 h-5 text-pink-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{appt.service}</p>
                          <p className="text-2xs text-[var(--color-text-muted)]">
                            {appt.time} — {endHour} ({appt.duration}min)
                          </p>
                        </div>
                      </div>
                      <span className={`text-2xs px-2 py-0.5 rounded-full font-medium ${statusCfg.color} ${statusCfg.bg}`}>
                        {statusCfg.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {appt.customerName}
                      </span>
                      {appt.customerPhone && (
                        <a href={`tel:${appt.customerPhone}`} className="flex items-center gap-1 text-blue-500">
                          <Phone className="w-3 h-3" /> Ligar
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-pink-600">{appt.price.toLocaleString("pt-MZ")} MZN</p>
                      <div className="flex gap-1">
                        {appt.status === "pendente" && (
                          <button
                            onClick={() => handleStatusChange(appt.id, "confirmado")}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-2xs font-medium"
                          >
                            Confirmar
                          </button>
                        )}
                        {appt.status === "confirmado" && (
                          <button
                            onClick={() => handleStatusChange(appt.id, "concluido")}
                            className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-2xs font-medium"
                          >
                            Concluído
                          </button>
                        )}
                        {appt.status !== "cancelado" && appt.status !== "concluido" && (
                          <button
                            onClick={() => handleCancel(appt.id)}
                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-2xs font-medium"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add appointment modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowForm(false)} />
          <div className="relative w-full bg-[var(--color-surface)] rounded-t-3xl p-4 pb-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold">Nova marcação</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Nome do cliente</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Ex: Maria Silva"
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Telefone</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="+258 84 000 0000"
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Serviço</label>
                <div className="grid grid-cols-2 gap-2">
                  {MOCK_SERVICES.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setFormData({ ...formData, service: s.name })}
                      className={`p-2 rounded-xl border-2 text-left transition-all ${
                        formData.service === s.name
                          ? "border-pink-500 bg-pink-50"
                          : "border-[var(--color-border)]"
                      }`}
                    >
                      <p className="text-xs font-medium">{s.name}</p>
                      <p className="text-2xs text-gray-400">{s.duration}min • {s.price} MZN</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Horário</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableHours.map((h) => (
                    <button
                      key={h}
                      onClick={() => setFormData({ ...formData, time: h })}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        formData.time === h
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Notas (opcional)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex: Cliente quer cor castanha"
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                onClick={handleAddAppointment}
                disabled={!formData.customerName || !formData.service || !formData.time}
                className="w-full py-3 rounded-xl bg-pink-500 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                Confirmar marcação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
