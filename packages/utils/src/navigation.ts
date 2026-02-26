export interface VidaApp {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  url: string;
}

export const VIDA_APPS: VidaApp[] = [
  {
    id: "familia",
    name: "VIDA.FAM\u00cdLIA",
    tagline: "O cora\u00e7\u00e3o da tua fam\u00edlia, digital",
    icon: "Heart",
    color: "#FF6B35",
    url: process.env.NEXT_PUBLIC_FAMILIA_URL || "http://localhost:3000",
  },
  {
    id: "dinheiro",
    name: "VIDA.DINHEIRO",
    tagline: "Teu dinheiro, tuas regras",
    icon: "Wallet",
    color: "#10B981",
    url: process.env.NEXT_PUBLIC_DINHEIRO_URL || "http://localhost:3001",
  },
  {
    id: "lar",
    name: "VIDA.LAR",
    tagline: "Tua casa gerida por IA",
    icon: "Home",
    color: "#3B82F6",
    url: process.env.NEXT_PUBLIC_LAR_URL || "http://localhost:3002",
  },
  {
    id: "saude",
    name: "VIDA.SA\u00daDE",
    tagline: "Tua sa\u00fade e da tua fam\u00edlia, organizada",
    icon: "HeartPulse",
    color: "#F43F5E",
    url: process.env.NEXT_PUBLIC_SAUDE_URL || "http://localhost:3003",
  },
];

export function getAppUrl(appId: string): string {
  const app = VIDA_APPS.find((a) => a.id === appId);
  return app?.url || "/";
}
