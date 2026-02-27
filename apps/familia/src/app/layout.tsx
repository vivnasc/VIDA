import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister, Analytics } from "@vida/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VIDA.FAMILIA",
    template: "%s | VIDA.FAMILIA",
  },
  description: "O coracao da tua familia, digital",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VIDA.FAMILIA",
  },
  formatDetection: {
    telephone: true,
    date: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6B35",
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased dark:bg-background-dark">
        <Analytics domain="familia.vida.mz" />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
