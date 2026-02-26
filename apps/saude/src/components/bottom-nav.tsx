"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Pill,
  Calendar,
  Plus,
  MoreHorizontal,
  Users,
  Syringe,
  Activity,
  Shield,
  AlertTriangle,
  Settings,
  X,
} from "lucide-react";

const mainNavItems = [
  { label: "Inicio", icon: Home, href: "/" },
  { label: "Medicacao", icon: Pill, href: "/medicacao" },
  { label: "Consultas", icon: Calendar, href: "/consultas" },
];

const moreMenuItems = [
  { id: "perfis", label: "Perfis", icon: Users, href: "/perfis" },
  { id: "vacinas", label: "Vacinas", icon: Syringe, href: "/vacinas" },
  { id: "metricas", label: "Metricas", icon: Activity, href: "/metricas" },
  { id: "seguro", label: "Seguro", icon: Shield, href: "/seguro" },
  { id: "emergencia", label: "Emergencia", icon: AlertTriangle, href: "/emergencia" },
  { id: "definicoes", label: "Definicoes", icon: Settings, href: "#" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [showFab, setShowFab] = useState(false);

  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isMoreActive = moreMenuItems.some((item) => isActive(item.href));

  return (
    <>
      {/* More Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 pb-safe">
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
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setShowMenu(false)}
                    className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl transition-colors ${
                      active
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${active ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
                    <span className={`text-xs ${active ? "font-semibold" : "font-medium"}`}>
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
              href="/medicacao"
              onClick={() => setShowFab(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Pill className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">Adicionar Medicacao</span>
            </Link>
            <Link
              href="/consultas"
              onClick={() => setShowFab(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Nova Consulta</span>
            </Link>
            <Link
              href="/metricas"
              onClick={() => setShowFab(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Activity className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">Registar Metrica</span>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 pb-safe backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {mainNavItems.map((item) => {
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

          {/* FAB Center Button */}
          <button
            onClick={() => setShowFab(!showFab)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5"
          >
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 -mt-4">
              <Plus className={`w-5 h-5 text-white transition-transform ${showFab ? "rotate-45" : ""}`} />
            </div>
          </button>

          {/* More Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors ${
              isMoreActive
                ? "text-primary-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <MoreHorizontal className={`h-5 w-5 ${isMoreActive ? "stroke-[2.5]" : ""}`} />
            <span className="text-[10px] font-medium">Mais</span>
            {isMoreActive && (
              <span className="mt-0.5 h-1 w-1 rounded-full bg-primary-500" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
