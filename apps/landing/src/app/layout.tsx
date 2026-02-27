import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIDA - Tua vida, organizada. Tua família, feliz.",
  description:
    "O ecossistema digital que organiza a tua vida familiar. Finanças, casa, saúde e família — tudo num só lugar. Começa grátis.",
  keywords: [
    "VIDA",
    "gestão familiar",
    "finanças pessoais",
    "organização",
    "Moçambique",
    "família",
    "casa",
    "saúde",
  ],
  openGraph: {
    type: "website",
    title: "VIDA - Tua vida, organizada. Tua família, feliz.",
    description:
      "O ecossistema digital que organiza a tua vida familiar. Finanças, casa, saúde e família — tudo num só lugar.",
    siteName: "VIDA",
    locale: "pt_MZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIDA - Tua vida, organizada. Tua família, feliz.",
    description:
      "O ecossistema digital que organiza a tua vida familiar. Começa grátis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6B35",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
