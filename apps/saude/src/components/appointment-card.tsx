"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  User,
  Heart,
  Eye,
  Bone,
  Brain,
  Baby,
} from "lucide-react";

type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface AppointmentCardProps {
  provider: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  member?: string;
  status: AppointmentStatus;
  notes?: string;
  onClick?: () => void;
}

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  confirmed: { label: "Confirmada", className: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Pendente", className: "bg-amber-50 text-amber-700" },
  completed: { label: "Realizada", className: "bg-blue-50 text-blue-700" },
  cancelled: { label: "Cancelada", className: "bg-red-50 text-red-700" },
};

const specialtyIcons: Record<string, typeof Stethoscope> = {
  "Cardiologia": Heart,
  "Oftalmologia": Eye,
  "Ortopedia": Bone,
  "Neurologia": Brain,
  "Pediatria": Baby,
};

export function AppointmentCard({
  provider,
  specialty,
  date,
  time,
  location,
  member,
  status,
  notes,
  onClick,
}: AppointmentCardProps) {
  const statusStyle = statusConfig[status];
  const SpecialtyIcon = specialtyIcons[specialty] || Stethoscope;

  return (
    <div
      className="card space-y-2 transition-shadow hover:shadow-md"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <SpecialtyIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{provider}</p>
            <p className="text-xs text-primary-600">{specialty}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle.className}`}
        >
          {statusStyle.label}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
          <Clock className="ml-2 h-3 w-3" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        {member && (
          <div className="flex items-center gap-1.5">
            <User className="h-3 w-3" />
            <span>{member}</span>
          </div>
        )}
      </div>

      {/* Notes */}
      {notes && (
        <div className="rounded-lg bg-gray-50 p-2.5 text-xs text-gray-600">
          {notes}
        </div>
      )}
    </div>
  );
}
