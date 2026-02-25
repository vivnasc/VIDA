"use client";

import {
  Home,
  ArrowLeftRight,
  PieChart,
  Target,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Início",
    icon: Home,
    href: "/",
  },
  {
    label: "Transacções",
    icon: ArrowLeftRight,
    href: "/transacoes",
  },
  {
    label: "Orçamento",
    icon: PieChart,
    href: "/orcamento",
  },
  {
    label: "Metas",
    icon: Target,
    href: "/metas",
  },
  {
    label: "Mais",
    icon: MoreHorizontal,
    href: "/contas",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-2 pb-[var(--safe-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 py-1 rounded-xl transition-colors ${
                isActive
                  ? "text-primary-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? "bg-primary-50" : ""
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-primary-600" : "text-gray-400"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-2xs font-medium ${
                  isActive ? "text-primary-600" : "text-gray-400"
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
