"use client";

interface SaleItemProps {
  description: string;
  customer?: string;
  amount: number;
  paymentMethod: string;
  date: string;
  staff?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PAYMENT_COLORS: Record<string, string> = {
  cash: "bg-emerald-100 text-emerald-700",
  mpesa: "bg-red-100 text-red-700",
  emola: "bg-orange-100 text-orange-700",
  transfer: "bg-blue-100 text-blue-700",
  card: "bg-purple-100 text-purple-700",
  fiado: "bg-violet-100 text-violet-700",
};

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Cash",
  mpesa: "M-Pesa",
  emola: "e-Mola",
  transfer: "Transf.",
  card: "Cartão",
  fiado: "Fiado",
};

export function SaleItem({
  description,
  customer,
  amount,
  paymentMethod,
  date,
  staff,
  icon: Icon,
}: SaleItemProps) {
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "pt-MZ",
    { day: "numeric", month: "short" },
  );

  const isFiado = paymentMethod === "fiado";
  const amountColor = isFiado ? "text-violet-500" : "text-emerald-600";

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer">
      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {customer && (
            <>
              <span className="text-xs text-[var(--color-text-muted)]">
                {customer}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
            </>
          )}
          <span className="text-xs text-[var(--color-text-muted)]">
            {formattedDate}
          </span>
          {staff && (
            <>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-xs text-[var(--color-text-muted)]">
                {staff}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-semibold ${amountColor}`}>
          +{amount.toLocaleString("pt-MZ")}{" "}
          <span className="text-xs font-normal">MZN</span>
        </p>
        <span
          className={`inline-block mt-0.5 text-2xs px-1.5 py-0.5 rounded-md font-medium ${
            PAYMENT_COLORS[paymentMethod] || "bg-gray-100 text-gray-500"
          }`}
        >
          {PAYMENT_LABELS[paymentMethod] || paymentMethod}
        </span>
      </div>
    </div>
  );
}
