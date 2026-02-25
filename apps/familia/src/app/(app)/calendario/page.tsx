"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

/* ─── Types ─── */

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  location?: string;
  attendees: number;
  color: string;
}

/* ─── Mock Data ─── */

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const MONTHS = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const upcomingEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Jantar de aniversario do Avo",
    time: "Hoje, 19:00",
    location: "Casa da Avo",
    attendees: 8,
    color: "bg-familia-500",
  },
  {
    id: "2",
    title: "Reuniao escolar - Ana",
    time: "Amanha, 14:30",
    location: "Escola Primaria",
    attendees: 2,
    color: "bg-blue-500",
  },
  {
    id: "3",
    title: "Consulta pediatrica - Joao",
    time: "Quinta, 10:00",
    location: "Clinica Central",
    attendees: 3,
    color: "bg-rose-500",
  },
  {
    id: "4",
    title: "Passeio familiar ao parque",
    time: "Sabado, 09:00",
    location: "Parque dos Continuadores",
    attendees: 5,
    color: "bg-emerald-500",
  },
];

export default function CalendarioPage() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Convert from Sunday-based (0) to Monday-based (0)
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

  const today = now.getDate();
  const isCurrentMonth =
    currentMonth === now.getMonth() && currentYear === now.getFullYear();

  // Placeholder: days with events
  const eventDays = new Set([today, today + 2, today + 5, today + 8]);

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
            const hasEvent = eventDays.has(day);

            return (
              <button
                key={day}
                className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-all ${
                  isToday
                    ? "bg-familia-500 text-white font-bold shadow-sm"
                    : "text-on-surface hover:bg-muted dark:text-on-surface-dark dark:hover:bg-muted-dark"
                }`}
              >
                {day}
                {hasEvent && !isToday && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-familia-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Upcoming Events ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Proximos eventos
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex gap-3 rounded-xl border border-border bg-white p-3 transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark"
            >
              {/* Color indicator */}
              <div className={`w-1 shrink-0 rounded-full ${event.color}`} />

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
                    {event.attendees} pessoas
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAB: Add Event ─── */}
      <button className="fab" aria-label="Adicionar evento">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
