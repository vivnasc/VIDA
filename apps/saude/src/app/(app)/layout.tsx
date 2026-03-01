"use client";

import { FeedbackButton } from "@vida/ui";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20">
      {children}
      <FeedbackButton appName="VIDA.SAÚDE" appColor="#F43F5E" />
      <BottomNav />
    </div>
  );
}
