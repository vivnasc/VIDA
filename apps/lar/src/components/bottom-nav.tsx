"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Package,
  ShoppingCart,
  Plus,
  MoreHorizontal,
  UtensilsCrossed,
  Users,
  Wrench,
  Map,
  Zap,
  FileText,
  Settings,
  X,
} from "lucide-react";

interface BottomNavProps {
  active: string;
}

const mainNavItems = [
  {
    id: "inicio",
    label: "Inicio",
    icon: Home,
    href: "/painel",
  },
  {
    id: "inventario",
    label: "Inventario",
    icon: Package,
    href: "/inventario",
  },
  {
    id: "compras",
    label: "Compras",
    icon: ShoppingCart,
    href: "/compras",
  },
];

const moreMenuItems = [
  { id: "refeicoes", label: "Refeicoes", icon: UtensilsCrossed, href: "/refeicoes" },
  { id: "empregados", label: "Empregados", icon: Users, href: "/empregados" },
  { id: "manutencao", label: "Manutencao", icon: Wrench, href: "/manutencao" },
  { id: "zonas", label: "Zonas", icon: Map, href: "/zonas" },
  { id: "servicos", label: "Servicos", icon: Zap, href: "/servicos" },
  { id: "documentos", label: "Documentos", icon: FileText, href: "/documentos" },
  { id: "definicoes", label: "Definicoes", icon: Settings, href: "#" },
];

export function BottomNav({ active }: BottomNavProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showFab, setShowFab] = useState(false);

  const isMoreActive = moreMenuItems.some((item) => item.id === active);

  return (
    <>
      {/* More Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 pb-safe-bottom">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 className="text-base font-bold text-gray-900">Mais opcoes</h3>
              <button
                onClick={() => setShowMenu(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1 px-4 pb-6">
              {moreMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setShowMenu(false)}
                    className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
                    <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FAB Overlay */}
      {showFab && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowFab(false)}
          />
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-2 z-50 min-w-[200px]">
            <Link
              href="/inventario"
              onClick={() => setShowFab(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Package className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Adicionar Item</span>
            </Link>
            <Link
              href="/compras"
              onClick={() => setShowFab(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Nova Lista</span>
            </Link>
            <Link
              href="/refeicoes"
              onClick={() => setShowFab(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <UtensilsCrossed className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Plano Refeicoes</span>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around bottom-nav-safe pt-2">
          {mainNavItems.map((item) => {
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

          {/* FAB Center Button */}
          <button
            onClick={() => setShowFab(!showFab)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[3.5rem]"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 -mt-4">
              <Plus className={`w-5 h-5 text-white transition-transform ${showFab ? "rotate-45" : ""}`} />
            </div>
          </button>

          {/* More Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[3.5rem] transition-colors ${
              isMoreActive
                ? "text-blue-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <MoreHorizontal
              className={`w-5 h-5 ${
                isMoreActive ? "stroke-[2.5]" : "stroke-[1.5]"
              }`}
            />
            <span
              className={`text-2xs ${
                isMoreActive ? "font-semibold" : "font-medium"
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
