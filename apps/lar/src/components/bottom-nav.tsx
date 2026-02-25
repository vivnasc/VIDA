"use client";

import Link from "next/link";
import {
  Home,
  Package,
  ShoppingCart,
  UtensilsCrossed,
  MoreHorizontal,
} from "lucide-react";

interface BottomNavProps {
  active: string;
}

const navItems = [
  {
    id: "inicio",
    label: "Início",
    icon: Home,
    href: "/",
  },
  {
    id: "inventario",
    label: "Inventário",
    icon: Package,
    href: "/inventario",
  },
  {
    id: "compras",
    label: "Compras",
    icon: ShoppingCart,
    href: "/compras",
  },
  {
    id: "refeicoes",
    label: "Refeições",
    icon: UtensilsCrossed,
    href: "/refeicoes",
  },
  {
    id: "mais",
    label: "Mais",
    icon: MoreHorizontal,
    href: "/manutencao",
  },
];

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around bottom-nav-safe pt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[3.5rem] transition-colors ${
                isActive
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "stroke-[2.5]" : "stroke-[1.5]"
                }`}
              />
              <span
                className={`text-2xs ${
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
