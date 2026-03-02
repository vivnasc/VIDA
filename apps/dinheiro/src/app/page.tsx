import { createServerClient } from "@vida/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIDA.DINHEIRO - Tuas financas, teus sonhos",
  description:
    "Controla receitas e despesas, cria orcamentos inteligentes, define metas de poupanca e acompanha o teu xitique. Comeca gratis.",
};

/* ── Inline SVG Icons ── */

interface IconProps {
  className?: string;
}

function IconWallet({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
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
    title: "Controlo de receitas e despesas",
    description: "Regista tudo o que entra e sai. V\u00EA para onde vai o teu dinheiro com categorias autom\u00E1ticas.",
  },
  {
    title: "Or\u00E7amentos inteligentes",
    description: "Define limites por categoria. Recebe alertas antes de ultrapassar o or\u00E7amento.",
  },
  {
    title: "Metas de poupan\u00E7a",
    description: "Sonha em grande. Acompanha o progresso das tuas metas de poupan\u00E7a dia a dia.",
  },
  {
    title: "Xitique digital",
    description: "Organiza poupan\u00E7as em grupo com transpar\u00EAncia total. O xitique da tua fam\u00EDlia, simplificado.",
  },
  {
    title: "Relat\u00F3rios e gr\u00E1ficos claros",
    description: "Entende as tuas finan\u00E7as com gr\u00E1ficos simples. Toma decis\u00F5es informadas.",
  },
  {
    title: "Gest\u00E3o de d\u00EDvidas",
    description: "Acompanha d\u00EDvidas e empr\u00E9stimos. Nunca mais esque\u00E7as quem te deve ou a quem deves.",
  },
];

/* ── Page ── */

export default async function DinheiroLanding() {
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
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <IconWallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--color-text-primary)]">
              VIDA<span className="text-emerald-500">.DINHEIRO</span>
            </span>
          </div>
          <Link
            href="/login"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Entrar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2 mb-8 border border-emerald-200">
          <IconWallet className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-emerald-700">Parte do ecossistema VIDA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-tight">
          Tuas finan&ccedil;as,
          <br />
          <span className="text-emerald-500">teus sonhos.</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
          Controla o teu dinheiro sem complica&ccedil;&otilde;es. Or&ccedil;amentos, metas, xitique e relat&oacute;rios &mdash; tudo num s&oacute; lugar.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:shadow-xl"
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
                <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
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
