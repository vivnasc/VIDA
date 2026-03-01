"use client";

import { FeedbackButton } from "@vida/ui";
import { BottomNav } from "@/components/bottom-nav";
import { usePathname } from "next/navigation";

const routeToTab: Record<string, string> = {
  "/inventario": "inventario",
  "/compras": "compras",
  "/refeicoes": "refeicoes",
  "/manutencao": "manutencao",
  "/empregados": "empregados",
  "/zonas": "zonas",
  "/servicos": "servicos",
  "/documentos": "documentos",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const activeTab =
    Object.entries(routeToTab).find(([route]) =>
      pathname.startsWith(route)
    )?.[1] ?? "inicio";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {children}
      <FeedbackButton appName="VIDA.LAR" appColor="#3B82F6" />
      <BottomNav active={activeTab} />
    </div>
  );
}
