"use client";

import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20">
      <main>{children}</main>
      <BottomNav />
    </div>
  );
}
