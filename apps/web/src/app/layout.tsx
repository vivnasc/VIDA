import type { Metadata, Viewport } from "next";
import { Analytics } from "@vida/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VIDA - Tua vida, organizada.",
    template: "%s | VIDA",
  },
  description:
    "O ecossistema digital que organiza a tua vida familiar. Financas, casa, saude e familia — tudo num so lugar.",
  formatDetection: {
    telephone: true,
    date: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[#0A0A0F] text-white font-sans antialiased">
        <Analytics domain="vida.app" />
        {children}
      </body>
    </html>
  );
}
