"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowLeft, Bell } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

const pageTitles: Record<string, string> = {
  "/calendario": "Calendario",
  "/tarefas": "Tarefas",
  "/fotos": "Fotos",
  "/mais": "Mais",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "VIDA.FAMILIA";

  return (
    <div className="min-h-screen bg-background pb-24 dark:bg-background-dark">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur-lg dark:border-border-dark/50 dark:bg-surface-dark/80 pt-safe">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark"
            >
              <ArrowLeft className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-orange">
                <Heart className="h-3.5 w-3.5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-on-surface dark:text-on-surface-dark">
                {title}
              </h1>
            </div>
          </div>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark">
            <Bell className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-familia-500 ring-2 ring-white dark:ring-surface-dark" />
          </button>
        </div>
      </header>

      {/* ─── Page Content ─── */}
      <main className="mx-auto max-w-lg px-4 pt-6">{children}</main>

      {/* ─── Bottom Navigation ─── */}
      <BottomNav />
    </div>
  );
}
