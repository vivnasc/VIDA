import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister, Analytics } from "@vida/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VIDA.DINHEIRO - Tuas finanças, teus sonhos",
    template: "%s | VIDA.DINHEIRO",
  },
  description:
    "Gestão financeira pessoal inteligente. Controla receitas, despesas, orçamentos e metas financeiras.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VIDA.DINHEIRO",
  },
  openGraph: {
    type: "website",
    title: "VIDA.DINHEIRO",
    description: "Tuas finanças, teus sonhos",
    siteName: "VIDA.DINHEIRO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10B981",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans">
        <Analytics domain="dinheiro.vida.mz" />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
