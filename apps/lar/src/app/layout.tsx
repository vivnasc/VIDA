import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister, Analytics } from "@vida/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIDA.LAR - Tua casa, sem stress",
  description:
    "Gestão inteligente da tua casa: inventário, compras, refeições e manutenção. Tudo num só lugar.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VIDA.LAR",
  },
  openGraph: {
    title: "VIDA.LAR - Tua casa, sem stress",
    description:
      "Gestão inteligente da tua casa: inventário, compras, refeições e manutenção.",
    type: "website",
    locale: "pt_PT",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="font-sans antialiased bg-blue-50/30 text-gray-900 min-h-screen">
        <Analytics domain="lar.vida.mz" />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
