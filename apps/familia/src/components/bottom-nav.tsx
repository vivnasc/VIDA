"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Calendar,
  CheckSquare,
  Camera,
  MoreHorizontal,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/calendario", label: "Calendario", icon: Calendar },
  { href: "/tarefas", label: "Tarefas", icon: CheckSquare },
  { href: "/fotos", label: "Fotos", icon: Camera },
  { href: "/mais", label: "Mais", icon: MoreHorizontal },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/90 backdrop-blur-lg dark:border-border-dark dark:bg-surface-dark/90 pb-safe">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 transition-all ${
                isActive
                  ? "text-familia-500"
                  : "text-muted-foreground hover:text-on-surface dark:hover:text-on-surface-dark"
              }`}
            >
              <div
                className={`relative flex items-center justify-center rounded-lg p-1 transition-all ${
                  isActive ? "bg-familia-50 dark:bg-familia-500/10" : ""
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-all ${
                    isActive ? "stroke-[2.5]" : "stroke-[1.5]"
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-familia-500" />
                )}
              </div>
              <span
                className={`text-[10px] leading-tight ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
