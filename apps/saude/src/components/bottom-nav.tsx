"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Users,
  Pill,
  Calendar,
  MoreHorizontal,
} from "lucide-react";

const navItems = [
  { label: "Início", icon: Home, href: "/" },
  { label: "Perfis", icon: Users, href: "/(app)/perfis" },
  { label: "Medicação", icon: Pill, href: "/(app)/medicacao" },
  { label: "Consultas", icon: Calendar, href: "/(app)/consultas" },
  { label: "Mais", icon: MoreHorizontal, href: "#" },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/") return pathname === "/";
    // Remove route group prefix for matching
    const cleanHref = href.replace("(app)/", "");
    return pathname.startsWith(cleanHref);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 pb-safe backdrop-blur-lg">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors ${
                active
                  ? "text-primary-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-primary-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
