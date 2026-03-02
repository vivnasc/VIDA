"use client";

import { useState } from "react";
import {
  Home,
  BookOpen,
  PieChart,
  Plus,
  MoreHorizontal,
  Package,
  Users,
  UserCheck,
  Truck,
  BarChart3,
  GraduationCap,
  FileText,
  Settings,
  Wrench,
  X,
  Gift,
  Bot,
  ShoppingBag as CatalogIcon,
  FileBarChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddSaleModal } from "@/components/add-sale-modal";

const NAV_ITEMS = [
  {
    label: "Início",
    icon: Home,
    href: "/",
  },
  {
    label: "Caixa",
    icon: BookOpen,
    href: "/caixa",
  },
  // FAB placeholder
  {
    label: "",
    icon: Plus,
    href: "#fab",
  },
  {
    label: "Stock",
    icon: Package,
    href: "/stock",
  },
  {
    label: "Mais",
    icon: MoreHorizontal,
    href: "#more",
  },
];

const MORE_MENU_ITEMS = [
  { label: "Clientes", icon: Users, href: "/clientes", color: "bg-blue-500" },
  { label: "Fiado", icon: BookOpen, href: "/fiado", color: "bg-violet-500" },
  { label: "Staff", icon: UserCheck, href: "/staff", color: "bg-teal-500" },
  { label: "Fornecedores", icon: Truck, href: "/fornecedores", color: "bg-orange-500" },
  { label: "Relatórios", icon: BarChart3, href: "/relatorios", color: "bg-purple-500" },
  { label: "Licenças", icon: FileText, href: "/licencas", color: "bg-rose-500" },
  { label: "Educação", icon: GraduationCap, href: "/educacao", color: "bg-emerald-500" },
  { label: "Chatbot", icon: Bot, href: "/chatbot", color: "bg-blue-500" },
  { label: "Catálogo", icon: CatalogIcon, href: "/catalogo", color: "bg-amber-500" },
  { label: "Exportar", icon: FileBarChart, href: "/relatorios/gerar", color: "bg-purple-600" },
  { label: "Convidar", icon: Gift, href: "/referral", color: "bg-primary-500" },
  { label: "Definições", icon: Settings, href: "#settings", color: "bg-gray-500" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const isMoreActive = MORE_MENU_ITEMS.some(
    (item) => item.href !== "#settings" && pathname.startsWith(item.href),
  );

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-2 pb-[var(--safe-bottom)]">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {NAV_ITEMS.map((item) => {
            // FAB button (center)
            if (item.href === "#fab") {
              return (
                <button
                  key="fab"
                  onClick={() => setShowAddModal(true)}
                  className="relative -mt-6 w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 active:scale-95 transition-transform"
                >
                  <Plus className="w-7 h-7 text-white" />
                </button>
              );
            }

            // "Mais" button
            if (item.href === "#more") {
              return (
                <button
                  key="more"
                  onClick={() => setShowMore(!showMore)}
                  className={`flex flex-col items-center justify-center gap-0.5 w-16 py-1 rounded-xl transition-colors ${
                    isMoreActive || showMore
                      ? "text-primary-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <div
                    className={`p-1 rounded-lg transition-colors ${
                      isMoreActive || showMore ? "bg-primary-50" : ""
                    }`}
                  >
                    <MoreHorizontal
                      className={`w-5 h-5 ${
                        isMoreActive || showMore
                          ? "text-primary-600"
                          : "text-gray-400"
                      }`}
                      strokeWidth={isMoreActive || showMore ? 2.5 : 2}
                    />
                  </div>
                  <span
                    className={`text-2xs font-medium ${
                      isMoreActive || showMore
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  >
                    Mais
                  </span>
                </button>
              );
            }

            // Regular nav items
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowMore(false)}
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

      {/* More Menu Overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowMore(false)}
          />

          <div className="absolute bottom-20 left-4 right-4 max-w-lg mx-auto bg-[var(--color-surface)] rounded-2xl shadow-xl border border-[var(--color-border)] overflow-hidden animate-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
              <h3 className="text-sm font-bold">Mais opções</h3>
              <button
                onClick={() => setShowMore(false)}
                className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1 p-3">
              {MORE_MENU_ITEMS.map((item) => {
                const isActive =
                  item.href !== "#settings" && pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href === "#settings" ? "/" : item.href}
                    onClick={() => setShowMore(false)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-colors ${
                      isActive
                        ? "bg-primary-50"
                        : "hover:bg-gray-50 active:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className={`text-2xs font-medium ${
                        isActive
                          ? "text-primary-600"
                          : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add Sale Modal */}
      {showAddModal && (
        <AddSaleModal onClose={() => setShowAddModal(false)} />
      )}
    </>
  );
}
