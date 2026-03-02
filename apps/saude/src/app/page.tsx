import { createServerClient } from "@vida/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIDA.SAUDE - Tua familia, sempre saudavel",
  description:
    "Historico medico familiar, lembretes de consultas e vacinas, acompanhamento de medicamentos. Comeca gratis.",
};

/* ── Inline SVG Icons ── */

interface IconProps {
  className?: string;
}

function IconActivity({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
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
    title: "Hist\u00F3rico m\u00E9dico familiar",
    description: "Toda a informa\u00E7\u00E3o m\u00E9dica da fam\u00EDlia num s\u00F3 lugar. Alergias, condi\u00E7\u00F5es e tratamentos.",
  },
  {
    title: "Lembretes de consultas",
    description: "Nunca mais percas uma consulta. Recebe notifica\u00E7\u00F5es para toda a fam\u00EDlia.",
  },
  {
    title: "Acompanhamento de medicamentos",
    description: "Controla hor\u00E1rios, doses e stock. Alertas quando a medica\u00E7\u00E3o est\u00E1 a acabar.",
  },
  {
    title: "Registo de vacinas",
    description: "Caderneta de vacinas digital para cada membro. Lembretes de refor\u00E7os autom\u00E1ticos.",
  },
  {
    title: "M\u00E9tricas de sa\u00FAde",
    description: "Acompanha peso, tens\u00E3o, glicemia e outras m\u00E9tricas. V\u00EA a evolu\u00E7\u00E3o ao longo do tempo.",
  },
  {
    title: "Emerg\u00EAncia familiar",
    description: "Informa\u00E7\u00E3o cr\u00EDtica acess\u00EDvel rapidamente. Contactos de emerg\u00EAncia e tipo sangu\u00EDneo.",
  },
];

/* ── Page ── */

export default async function SaudeLanding() {
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
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center">
              <IconActivity className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[var(--color-text-primary)]">
              VIDA<span className="text-rose-500">.SA&Uacute;DE</span>
            </span>
          </div>
          <Link
            href="/login"
            className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Entrar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-rose-50 rounded-full px-4 py-2 mb-8 border border-rose-200">
          <IconActivity className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-medium text-rose-700">Parte do ecossistema VIDA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-tight">
          Tua fam&iacute;lia,
          <br />
          <span className="text-rose-500">sempre saud&aacute;vel.</span>
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
          Hist&oacute;rico m&eacute;dico, medicamentos, consultas e vacinas &mdash; a sa&uacute;de de toda a fam&iacute;lia organizada e acess&iacute;vel.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all hover:shadow-xl"
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
                <div className="mt-0.5 w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <IconCheck className="w-3.5 h-3.5 text-rose-500" />
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
