"use client";

import { ReferralCard } from "@/components/referral-card";
import { useBusiness } from "@/hooks/use-business";

export default function ReferralPage() {
  const { business } = useBusiness();

  return (
    <div className="min-h-screen pb-4">
      <header className="bg-gradient-to-br from-primary-500 to-emerald-600 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-xl font-bold">Convidar Amigos</h1>
        <p className="text-emerald-100 text-sm mt-1">
          Partilha o maBIZ e ganha dias grátis
        </p>
      </header>

      <main className="px-4 -mt-2 space-y-4">
        <ReferralCard businessName={business?.name} />
      </main>
    </div>
  );
}
