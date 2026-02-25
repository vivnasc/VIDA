"use client";

import { usePathname } from "next/navigation";
import { Home, Users, Pill, Calendar, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Início", icon: Home, href: "/" },
  { label: "Perfis", icon: Users, href: "/(app)/perfis" },
  { label: "Medicação", icon: Pill, href: "/(app)/medicacao" },
  { label: "Consultas", icon: Calendar, href: "/(app)/consultas" },
  { label: "Mais", icon: MoreHorizontal, href: "#" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace("(app)/", ""));
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-20">
      {children}

      {/* ─── Bottom Navigation ─── */}
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
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
