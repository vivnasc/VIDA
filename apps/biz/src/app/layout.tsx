import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BIZ.MZ - Teu negócio, organizado",
    template: "%s | BIZ.MZ",
  },
  description:
    "Gestão de micro e pequenos negócios moçambicanos. Controla vendas, stock, fiados, staff e muito mais.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BIZ.MZ",
  },
  openGraph: {
    type: "website",
    title: "BIZ.MZ",
    description: "Teu negócio, organizado",
    siteName: "BIZ.MZ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F59E0B",
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
      <body className="font-sans">{children}</body>
    </html>
  );
}
