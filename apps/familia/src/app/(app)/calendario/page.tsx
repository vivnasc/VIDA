"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Heart,
  Wallet,
  Home,
  HeartPulse,
  Filter,
  X,
  CalendarPlus,
} from "lucide-react";

/* ─── Types ─── */

type EventSource = "familia" | "financeiro" | "casa" | "saude";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  location?: string;
  attendees: number;
  source: EventSource;
}

/* ─── Mock Data ─── */

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const MONTHS = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const sourceConfig: Record<EventSource, { label: string; color: string; dotColor: string; icon: React.ComponentType<{ className?: string }>; bg: string }> = {
  familia: { label: "Familia", color: "bg-familia-500", dotColor: "bg-familia-500", icon: Heart, bg: "bg-familia-50 dark:bg-familia-500/10" },
  financeiro: { label: "Financeiro", color: "bg-emerald-500", dotColor: "bg-emerald-500", icon: Wallet, bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  casa: { label: "Casa", color: "bg-blue-500", dotColor: "bg-blue-500", icon: Home, bg: "bg-blue-50 dark:bg-blue-500/10" },
  saude: { label: "Saude", color: "bg-rose-500", dotColor: "bg-rose-500", icon: HeartPulse, bg: "bg-rose-50 dark:bg-rose-500/10" },
};

const upcomingEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Jantar de aniversario do Avo",
    time: "Hoje, 19:00",
    location: "Casa da Avo",
    attendees: 8,
    source: "familia",
  },
  {
    id: "2",
    title: "Pagar electricidade",
    time: "Hoje, 12:00",
    location: "Banco",
    attendees: 1,
    source: "financeiro",
  },
  {
    id: "3",
    title: "Consulta pediatrica - Tomas",
    time: "Amanha, 10:00",
    location: "Clinica Central",
    attendees: 3,
    source: "saude",
  },
  {
    id: "4",
    title: "Reuniao escolar - Sofia",
    time: "Quinta, 14:30",
    location: "Escola Primaria",
    attendees: 2,
    source: "familia",
  },
  {
    id: "5",
    title: "Empregada domestica",
    time: "Sexta, 08:00",
    location: "Casa",
    attendees: 1,
    source: "casa",
  },
  {
    id: "6",
    title: "Dia de salario",
    time: "Dia 25",
    attendees: 1,
    source: "financeiro",
  },
  {
    id: "7",
    title: "Manutencao ar condicionado",
    time: "Sabado, 10:00",
    location: "Casa",
    attendees: 1,
    source: "casa",
  },
  {
    id: "8",
    title: "Passeio familiar ao parque",
    time: "Domingo, 09:00",
    location: "Parque dos Continuadores",
    attendees: 6,
    source: "familia",
  },
];

/* ─── Day event dots mapping (mock) ─── */

interface DayEvents {
  [day: number]: EventSource[];
}

const now = new Date();
const today = now.getDate();

const dayEventsMap: DayEvents = {
  [today]: ["familia", "financeiro"],
  [today + 1]: ["saude"],
  [today + 3]: ["familia"],
  [today + 4]: ["casa"],
  [today + 5]: ["financeiro", "casa"],
  [today + 7]: ["familia"],
};

export default function CalendarioPage() {
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [activeFilters, setActiveFilters] = useState<Set<EventSource>>(new Set(["familia", "financeiro", "casa", "saude"]));
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddTitle, setQuickAddTitle] = useState("");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isCurrentMonth =
    currentMonth === now.getMonth() && currentYear === now.getFullYear();

  const toggleFilter = (source: EventSource) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(source)) {
        next.delete(source);
      } else {
        next.add(source);
      }
      return next;
    });
  };

  const filteredEvents = upcomingEvents.filter((e) => activeFilters.has(e.source));

  return (
    <div className="space-y-6">
      {/* ─── Month Navigation ─── */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark"
        >
          <ChevronLeft className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
        </button>
        <h2 className="text-lg font-bold text-on-surface dark:text-on-surface-dark">
          {MONTHS[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={nextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark"
        >
          <ChevronRight className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
        </button>
      </div>

      {/* ─── Source Filter Chips ─── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {(Object.entries(sourceConfig) as [EventSource, typeof sourceConfig[EventSource]][]).map(([key, config]) => {
          const Icon = config.icon;
          const isActive = activeFilters.has(key);
          return (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? `${config.bg} text-on-surface dark:text-on-surface-dark ring-1 ring-inset ${key === "familia" ? "ring-familia-300 dark:ring-familia-500/40" : key === "financeiro" ? "ring-emerald-300 dark:ring-emerald-500/40" : key === "casa" ? "ring-blue-300 dark:ring-blue-500/40" : "ring-rose-300 dark:ring-rose-500/40"}`
                  : "bg-muted text-muted-foreground/50 dark:bg-muted-dark line-through"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${config.dotColor} ${!isActive ? "opacity-30" : ""}`} />
              <Icon className="h-3 w-3" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* ─── Calendar Grid ─── */}
      <div className="card">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-semibold text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = isCurrentMonth && day === today;
            const dayEvents = dayEventsMap[day] || [];
            const filteredDayEvents = dayEvents.filter((s) => activeFilters.has(s));

            return (
              <button
                key={day}
                className={`relative flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all ${
                  isToday
                    ? "bg-familia-500 text-white font-bold shadow-md ring-2 ring-familia-300 dark:ring-familia-600"
                    : "text-on-surface hover:bg-muted dark:text-on-surface-dark dark:hover:bg-muted-dark"
                }`}
                style={{ aspectRatio: "1" }}
              >
                <span>{day}</span>
                {/* Color-coded dots */}
                {filteredDayEvents.length > 0 && !isToday && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {filteredDayEvents.slice(0, 3).map((source, idx) => (
                      <span
                        key={idx}
                        className={`h-1 w-1 rounded-full ${sourceConfig[source].dotColor}`}
                      />
                    ))}
                  </div>
                )}
                {filteredDayEvents.length > 0 && isToday && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {filteredDayEvents.slice(0, 3).map((source, idx) => (
                      <span
                        key={idx}
                        className="h-1 w-1 rounded-full bg-white"
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── Today Highlight ─── */}
        <div className="mt-3 flex items-center justify-center gap-2 border-t border-border/50 pt-3 dark:border-border-dark/50">
          <span className="h-2.5 w-2.5 rounded-full bg-familia-500" />
          <span className="text-xs font-semibold text-familia-500">
            Hoje, {today} de {MONTHS[now.getMonth()]}
          </span>
        </div>
      </div>

      {/* ─── Quick Event Creation ─── */}
      {showQuickAdd && (
        <div className="card border-familia-200 dark:border-familia-500/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-on-surface dark:text-on-surface-dark flex items-center gap-2">
              <CalendarPlus className="h-4 w-4 text-familia-500" />
              Evento rapido
            </h3>
            <button onClick={() => setShowQuickAdd(false)}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={quickAddTitle}
              onChange={(e) => setQuickAddTitle(e.target.value)}
              placeholder="Nome do evento..."
              className="flex-1 rounded-xl border border-border bg-white px-3 py-2 text-sm text-on-surface placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-familia-500/30 dark:bg-surface-dark dark:border-border-dark dark:text-on-surface-dark"
            />
            <button className="btn-primary text-xs px-4">Criar</button>
          </div>
          <div className="mt-2 flex gap-2">
            {(Object.entries(sourceConfig) as [EventSource, typeof sourceConfig[EventSource]][]).map(([key, config]) => (
              <button
                key={key}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${config.bg} text-muted-foreground`}
              >
                <span className={`h-2 w-2 rounded-full ${config.dotColor}`} />
                {config.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!showQuickAdd && (
        <button
          onClick={() => setShowQuickAdd(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-familia-300 py-3 text-sm font-medium text-familia-500 transition-all hover:border-familia-500 hover:bg-familia-50 dark:border-familia-500/30 dark:hover:bg-familia-500/10"
        >
          <CalendarPlus className="h-4 w-4" />
          Adicionar evento rapido
        </button>
      )}

      {/* ─── Upcoming Events ─── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Proximos eventos
          </h3>
          <span className="text-xs font-medium text-familia-500">
            {filteredEvents.length} eventos
          </span>
        </div>
        <div className="space-y-3">
          {filteredEvents.map((event) => {
            const config = sourceConfig[event.source];
            const SourceIcon = config.icon;
            return (
              <div
                key={event.id}
                className="flex gap-3 rounded-xl border border-border bg-white p-3 transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark"
              >
                {/* Color indicator */}
                <div className={`w-1 shrink-0 rounded-full ${config.color}`} />

                {/* Source icon */}
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                  <SourceIcon className={`h-5 w-5 ${config.label === "Familia" ? "text-familia-500" : config.label === "Financeiro" ? "text-emerald-500" : config.label === "Casa" ? "text-blue-500" : "text-rose-500"}`} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                    {event.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendees} {event.attendees === 1 ? "pessoa" : "pessoas"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── FAB: Add Event ─── */}
      <button className="fab" aria-label="Adicionar evento">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
