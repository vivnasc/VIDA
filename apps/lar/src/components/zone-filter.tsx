"use client";

interface ZoneFilterProps {
  selectedZone: string | null;
  onSelectZone: (zone: string | null) => void;
}

const zones = [
  { id: "Cozinha", label: "Cozinha", emoji: "" },
  { id: "Sala", label: "Sala", emoji: "" },
  { id: "Quarto", label: "Quarto", emoji: "" },
  { id: "Casa de Banho", label: "Casa de Banho", emoji: "" },
  { id: "Exterior", label: "Exterior", emoji: "" },
  { id: "Garagem", label: "Garagem", emoji: "" },
  { id: "Despensa", label: "Despensa", emoji: "" },
];

export function ZoneFilter({ selectedZone, onSelectZone }: ZoneFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
      {/* All filter */}
      <button
        onClick={() => onSelectZone(null)}
        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          selectedZone === null
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Todas
      </button>

      {/* Zone chips */}
      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() =>
            onSelectZone(selectedZone === zone.id ? null : zone.id)
          }
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selectedZone === zone.id
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {zone.label}
        </button>
      ))}
    </div>
  );
}
