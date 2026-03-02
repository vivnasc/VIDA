import { createServerClient } from "@vida/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIDA.LAR - Tua casa, sem stress",
  description:
    "Gestao de inventario, listas de compras, manutencao da casa, planos de refeicoes e muito mais. Comeca gratis.",
};

/* ── Inline SVG Icons ── */

interface IconProps {
  className?: string;
}

function IconHome({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconArrowRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* ── Data ── */

const features = [
  {
    title: "Invent\u00E1rio dom\u00E9stico",
    description: "Sabe exactamente o que tens em casa. Controla stock, validades e localiza\u00E7\u00E3o de cada item.",
  },
  {
    title: "Listas de compras inteligentes",
    description: "Cria listas baseadas no que est\u00E1 a acabar. Partilha com a fam\u00EDlia em tempo real.",
  },
  {
    title: "Manuten\u00E7\u00E3o da casa",
    description: "Lembretes para manuten\u00E7\u00E3o preventiva. Nunca mais esque\u00E7as de trocar filtros ou rever a caldeira.",
  },
  {
    title: "Plano de refei\u00E7\u00F5es",
    description: "Planeia as refei\u00E7\u00F5es da semana. Gera listas de compras autom\u00E1ticas a partir do menu.",
  },
  {
    title: "Gest\u00E3o de servi\u00E7os",
    description: "Acompanha contas de \u00E1gua, luz, g\u00E1s e internet. V\u00EA tend\u00EAncias e evita surpresas.",
  },
  {
    title: "Zonas da casa",
    description: "Organiza a casa por divis\u00F5es. Atribui tarefas e itens a cada zona.",
  },
];

/* ── Page ── */

export default async function LarLanding() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/painel");
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <IconHome className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--color-text-primary)]">
              VIDA<span className="text-blue-500">.LAR</span>
            </span>
          </div>
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Entrar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-8 border border-blue-200">
          <IconHome className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700">Parte do ecossistema VIDA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-tight">
          Tua casa,
          <br />
          <span className="text-blue-500">sem stress.</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
          Invent&aacute;rio, compras, manuten&ccedil;&atilde;o e refei&ccedil;&otilde;es &mdash; tudo organizado para que a tua casa funcione sem esfor&ccedil;o.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:shadow-xl"
          >
            Come&ccedil;ar Gr&aacute;tis
            <IconArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <IconCheck className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-primary)]">{f.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
          <span>&copy; 2025 VIDA. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[var(--color-text-primary)] transition-colors">Termos</Link>
            <Link href="/privacy" className="hover:text-[var(--color-text-primary)] transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
