"use client";

import { AlertTriangle, Clock, ImageIcon } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  zone: string;
  category: string;
  expiryDate?: string;
  lowStock: boolean;
  photo?: string;
}

interface InventoryCardProps {
  item: InventoryItem;
}

function getExpiryStatus(expiryDate?: string) {
  if (!expiryDate) return null;

  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return { label: "Expirado", color: "bg-red-100 text-red-700", urgent: true };
  if (diffDays <= 2) return { label: `Expira em ${diffDays}d`, color: "bg-red-100 text-red-700", urgent: true };
  if (diffDays <= 5) return { label: `Expira em ${diffDays}d`, color: "bg-amber-100 text-amber-700", urgent: false };
  if (diffDays <= 14) return { label: `Expira em ${diffDays}d`, color: "bg-yellow-50 text-yellow-700", urgent: false };
  return null;
}

const zoneColors: Record<string, string> = {
  Cozinha: "bg-blue-100 text-blue-700",
  Sala: "bg-purple-100 text-purple-700",
  Quarto: "bg-pink-100 text-pink-700",
  "Casa de Banho": "bg-cyan-100 text-cyan-700",
  Exterior: "bg-green-100 text-green-700",
  Garagem: "bg-gray-200 text-gray-700",
  Despensa: "bg-amber-100 text-amber-700",
};

export function InventoryCard({ item }: InventoryCardProps) {
  const expiryStatus = getExpiryStatus(item.expiryDate);
  const zoneColor = zoneColors[item.zone] ?? "bg-gray-100 text-gray-600";

  return (
    <div
      className={`app-card flex flex-col gap-2 relative ${
        item.lowStock ? "ring-1 ring-red-200" : ""
      }`}
    >
      {/* Photo placeholder */}
      <div className="w-full h-20 bg-gray-100 rounded-xl flex items-center justify-center">
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <ImageIcon className="w-6 h-6 text-gray-300" />
        )}
      </div>

      {/* Item info */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          {/* Quantity badge */}
          <span
            className={`app-badge ${
              item.lowStock
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {item.quantity} {item.unit}
          </span>

          {/* Zone badge */}
          <span className={`app-badge ${zoneColor}`}>{item.zone}</span>
        </div>
      </div>

      {/* Expiry warning */}
      {expiryStatus && (
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-2xs ${expiryStatus.color}`}
        >
          {expiryStatus.urgent ? (
            <AlertTriangle className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          <span>{expiryStatus.label}</span>
        </div>
      )}

      {/* Low stock indicator */}
      {item.lowStock && (
        <div className="absolute top-2 right-2">
          <span className="w-2 h-2 bg-red-500 rounded-full block animate-pulse" />
        </div>
      )}
    </div>
  );
}
