"use client";

import { FeedbackButton } from "@vida/ui";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20">
      <main>{children}</main>
      <FeedbackButton appName="VIDA.DINHEIRO" appColor="#10B981" />
      <BottomNav />
    </div>
  );
}
