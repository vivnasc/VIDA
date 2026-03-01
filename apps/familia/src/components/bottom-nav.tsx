"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Calendar,
  MessageSquare,
  Plus,
  MoreHorizontal,
  CheckSquare,
  Camera,
  Target,
  Users,
  Clock,
  Settings,
  X,
} from "lucide-react";

/* ─── Bottom Nav Items ─── */

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/painel", label: "Inicio", icon: Home },
  { href: "/calendario", label: "Calendario", icon: Calendar },
];

const rightNavItems: NavItem[] = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
];

/* ─── More Menu Items ─── */

interface MoreMenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const moreMenuItems: MoreMenuItem[] = [
  { href: "/tarefas", label: "Tarefas", icon: CheckSquare, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-500/10" },
  { href: "/fotos", label: "Fotos", icon: Camera, color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-500/10" },
  { href: "/metas", label: "Metas", icon: Target, color: "text-amber-500", bgColor: "bg-amber-50 dark:bg-amber-500/10" },
  { href: "/membros", label: "Membros", icon: Users, color: "text-emerald-500", bgColor: "bg-emerald-50 dark:bg-emerald-500/10" },
  { href: "/marcos", label: "Marcos", icon: Clock, color: "text-rose-500", bgColor: "bg-rose-50 dark:bg-rose-500/10" },
  { href: "/definicoes", label: "Definicoes", icon: Settings, color: "text-zinc-500", bgColor: "bg-zinc-100 dark:bg-zinc-500/10" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const isActive = (href: string) => {
    if (href === "/painel") return pathname === "/painel";
    return pathname.startsWith(href);
  };

  const isMoreActive = moreMenuItems.some((item) => isActive(item.href));

  return (
    <>
      {/* ─── More Menu Overlay ─── */}
      {showMore && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setShowMore(false)} />
      )}

      {/* ─── More Menu Panel ─── */}
      {showMore && (
        <div className="fixed bottom-20 left-0 right-0 z-50 mx-auto max-w-lg px-4 pb-safe">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-xl dark:border-border-dark dark:bg-surface-dark">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                Mais opcoes
              </h3>
              <button
                onClick={() => setShowMore(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-muted dark:hover:bg-muted-dark"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {moreMenuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMore(false)}
                    className={`flex flex-col items-center gap-2 rounded-xl p-3 transition-all active:scale-[0.97] ${
                      active
                        ? "bg-familia-50 dark:bg-familia-500/10 ring-1 ring-familia-200 dark:ring-familia-500/30"
                        : "hover:bg-muted dark:hover:bg-muted-dark"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bgColor}`}>
                      <Icon className={`h-5 w-5 ${active ? "text-familia-500" : item.color}`} />
                    </div>
                    <span className={`text-[11px] font-medium ${active ? "text-familia-500" : "text-on-surface dark:text-on-surface-dark"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── Bottom Nav Bar ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/90 backdrop-blur-lg dark:border-border-dark dark:bg-surface-dark/90 pb-safe">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
          {/* Left nav items */}
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 transition-all ${
                  active
                    ? "text-familia-500"
                    : "text-muted-foreground hover:text-on-surface dark:hover:text-on-surface-dark"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center rounded-lg p-1 transition-all ${
                    active ? "bg-familia-50 dark:bg-familia-500/10" : ""
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-all ${
                      active ? "stroke-[2.5]" : "stroke-[1.5]"
                    }`}
                  />
                  {active && (
                    <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-familia-500" />
                  )}
                </div>
                <span
                  className={`text-[10px] leading-tight ${
                    active ? "font-semibold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Central FAB */}
          <div className="flex flex-col items-center justify-center">
            <button className="flex h-12 w-12 items-center justify-center rounded-full gradient-orange text-white shadow-lg shadow-familia-500/30 transition-all hover:shadow-xl active:scale-95 -mt-5">
              <Plus className="h-6 w-6" />
            </button>
          </div>

          {/* Right nav items */}
          {rightNavItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 transition-all ${
                  active
                    ? "text-familia-500"
                    : "text-muted-foreground hover:text-on-surface dark:hover:text-on-surface-dark"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center rounded-lg p-1 transition-all ${
                    active ? "bg-familia-50 dark:bg-familia-500/10" : ""
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-all ${
                      active ? "stroke-[2.5]" : "stroke-[1.5]"
                    }`}
                  />
                  {active && (
                    <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-familia-500" />
                  )}
                </div>
                <span
                  className={`text-[10px] leading-tight ${
                    active ? "font-semibold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 transition-all ${
              isMoreActive || showMore
                ? "text-familia-500"
                : "text-muted-foreground hover:text-on-surface dark:hover:text-on-surface-dark"
            }`}
          >
            <div
              className={`relative flex items-center justify-center rounded-lg p-1 transition-all ${
                isMoreActive || showMore ? "bg-familia-50 dark:bg-familia-500/10" : ""
              }`}
            >
              <MoreHorizontal
                className={`h-5 w-5 transition-all ${
                  isMoreActive || showMore ? "stroke-[2.5]" : "stroke-[1.5]"
                }`}
              />
              {isMoreActive && (
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-familia-500" />
              )}
            </div>
            <span
              className={`text-[10px] leading-tight ${
                isMoreActive || showMore ? "font-semibold" : "font-medium"
              }`}
            >
              Mais
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
