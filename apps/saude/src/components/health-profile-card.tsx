"use client";

import {
  Droplets,
  AlertCircle,
  Activity,
  Shield,
  ChevronRight,
} from "lucide-react";

interface HealthProfileCardProps {
  name: string;
  avatar: string;
  role?: string;
  age?: number;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  insurance?: string;
  onClick?: () => void;
}

export function HealthProfileCard({
  name,
  avatar,
  role,
  age,
  bloodType,
  allergies,
  conditions,
  insurance,
  onClick,
}: HealthProfileCardProps) {
  return (
    <div
      className="card space-y-3 transition-shadow hover:shadow-md"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
          {avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {role && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                {role}
              </span>
            )}
          </div>
          {age !== undefined && (
            <p className="text-xs text-gray-500">{age} anos</p>
          )}
        </div>
        {onClick && (
          <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-300" />
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {/* Blood Type */}
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
          <Droplets className="h-3 w-3" />
          {bloodType}
        </span>

        {/* Allergies */}
        {allergies.length > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            <AlertCircle className="h-3 w-3" />
            {allergies.length} alergia{allergies.length > 1 ? "s" : ""}
          </span>
        )}

        {/* Conditions */}
        {conditions.length > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            <Activity className="h-3 w-3" />
            {conditions.length} condição{conditions.length > 1 ? "ões" : ""}
          </span>
        )}

        {/* Insurance */}
        {insurance && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            <Shield className="h-3 w-3" />
            {insurance}
          </span>
        )}
      </div>

      {/* Details */}
      {(allergies.length > 0 || conditions.length > 0) && (
        <div className="border-t border-gray-50 pt-2">
          {allergies.length > 0 && (
            <p className="text-xs text-gray-500">
              <span className="font-medium text-gray-700">Alergias:</span>{" "}
              {allergies.join(", ")}
            </p>
          )}
          {conditions.length > 0 && (
            <p className="mt-0.5 text-xs text-gray-500">
              <span className="font-medium text-gray-700">Condições:</span>{" "}
              {conditions.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
