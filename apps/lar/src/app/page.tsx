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
  style?: React.CSSProperties;
}

function IconHome({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function IconCheck({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconArrowRight({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconX({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

function IconPackage({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
  );
}

function IconShoppingCart({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function IconWrench({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconUtensils({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" /><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" /><path d="m2.1 21.8 6.4-6.3" /><path d="m19 5-7 7" />
    </svg>
  );
}

function IconZap({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function IconLayoutGrid({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function IconUsers({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBell({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconFileText({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
    </svg>
  );
}

function IconDroplets({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 14.1c1.93 0 3.5-1.6 3.5-3.57 0-1.02-.5-1.99-1.5-2.81S12.86 5.98 12.56 4.5c-.3 1.48-1.23 2.73-2.49 3.22-.19.08-.38.16-.56.24" />
      <path d="M17.75 16.3c1.93 0 3.5-1.6 3.5-3.57 0-1.02-.5-1.99-1.5-2.81S17.75 8 17.75 6.5" />
    </svg>
  );
}

function IconClipboardList({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    </svg>
  );
}

function IconShield({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

/* ── Data ── */

const stats = [
  { value: "3h", label: "poupadas por semana em m\u00E9dia" },
  { value: "40%", label: "menos desperd\u00EDcio de comida" },
  { value: "0", label: "manuten\u00E7\u00F5es esquecidas" },
  { value: "0 MT", label: "para come\u00E7ar" },
];

const problems = [
  "Lista de compras esquecida em casa ou perdida",
  "Comida que estraga porque ningu\u00E9m sabe o que tem",
  "Fugas de \u00E1gua ou avarias que s\u00F3 se descobrem tarde",
  "Contas da casa que aparecem de surpresa",
  "Toda a gente pergunta \"o que \u00E9 para jantar?\"",
];

const solutions = [
  "Listas de compras partilhadas no telem\u00F3vel de todos",
  "Invent\u00E1rio com validades e alertas autom\u00E1ticos",
  "Calend\u00E1rio de manuten\u00E7\u00E3o preventiva com lembretes",
  "Todas as contas e servi\u00E7os registados e vis\u00EDveis",
  "Plano de refei\u00E7\u00F5es semanal que toda a fam\u00EDlia v\u00EA",
];

const steps = [
  { number: "01", title: "Configura a tua casa", description: "Define as zonas da casa, adiciona os teus primeiros itens ao invent\u00E1rio e regista os servi\u00E7os que usas." },
  { number: "02", title: "Planeia e organiza", description: "Cria listas de compras, planeia refei\u00E7\u00F5es e agenda a manuten\u00E7\u00E3o. Partilha tudo com a fam\u00EDlia." },
  { number: "03", title: "Vive sem stress", description: "A casa funciona como um rel\u00F3gio. Nada se esquece, nada se desperdi\u00E7a, nada surpreende." },
];

const platformFeatures = [
  { icon: IconPackage, title: "Invent\u00E1rio completo", description: "Sabe exactamente o que tens em casa. Stock, validades, localiza\u00E7\u00E3o e hist\u00F3rico de cada item." },
  { icon: IconShoppingCart, title: "Listas de compras", description: "Cria listas partilhadas. Risca itens em tempo real e gera listas a partir do que est\u00E1 a acabar." },
  { icon: IconWrench, title: "Manuten\u00E7\u00E3o preventiva", description: "Lembretes para trocar filtros, rever equipamentos e cuidar da casa antes que surjam problemas." },
  { icon: IconUtensils, title: "Plano de refei\u00E7\u00F5es", description: "Planeia o menu semanal. Gera lista de compras autom\u00E1tica a partir das receitas escolhidas." },
  { icon: IconDroplets, title: "Gest\u00E3o de servi\u00E7os", description: "Acompanha contas de \u00E1gua, luz, g\u00E1s e internet. V\u00EA tend\u00EAncias e evita surpresas." },
  { icon: IconLayoutGrid, title: "Zonas da casa", description: "Organiza por divis\u00F5es: cozinha, sala, quartos. Atribui tarefas e itens a cada zona." },
  { icon: IconUsers, title: "Gest\u00E3o de empregados", description: "Regista empregados dom\u00E9sticos, hor\u00E1rios, pagamentos e tarefas atribu\u00EDdas." },
  { icon: IconFileText, title: "Documentos da casa", description: "Guarda contratos, garantias, escrituras e manuais num arquivo digital organizado." },
  { icon: IconBell, title: "Alertas inteligentes", description: "Notifica\u00E7\u00F5es de validades a expirar, manuten\u00E7\u00F5es pendentes e contas a vencer." },
  { icon: IconClipboardList, title: "Tarefas dom\u00E9sticas", description: "Distribui tarefas entre a fam\u00EDlia com rotatividade autom\u00E1tica e acompanhamento." },
];

const uniqueFeatures = [
  { badge: "INTELIGENTE", title: "Listas que se criam sozinhas", description: "Quando um item do invent\u00E1rio chega ao m\u00EDnimo, \u00E9 adicionado automaticamente \u00E0 lista de compras. Nunca mais ficas sem arroz ou \u00F3leo.", icon: IconShoppingCart },
  { badge: "CONECTADO", title: "Integra\u00E7\u00E3o com VIDA.DINHEIRO", description: "As despesas do lar aparecem automaticamente no teu or\u00E7amento. V\u00EA quanto gastas em alimenta\u00E7\u00E3o, \u00E1gua e luz sem registar duas vezes.", icon: IconZap },
  { badge: "PREVENTIVO", title: "Manuten\u00E7\u00E3o que evita gastos", description: "O calend\u00E1rio de manuten\u00E7\u00E3o preventiva poupa-te dinheiro a longo prazo. Cuidar antes de estragar custa menos que reparar.", icon: IconShield },
];

/* ── Page ── */

export default async function LarLanding() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/painel");

  return (
    <div className="min-h-screen bg-[#0A0A12]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0A0A12]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><IconHome className="w-4 h-4 text-white" /></div>
            <span className="text-xl font-bold text-white">VIDA<span className="text-blue-400">.LAR</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm text-white/60 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="text-sm text-white/60 hover:text-white transition-colors">Como Funciona</a>
          </div>
          <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">Come&ccedil;ar</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-2 mb-8 border border-blue-500/20">
              <IconHome className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Parte do ecossistema VIDA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Tua casa,<br /><span className="text-blue-400">sem stress.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Invent&aacute;rio, compras, manuten&ccedil;&atilde;o e refei&ccedil;&otilde;es &mdash; tudo organizado para que a tua casa funcione como um rel&oacute;gio, sem esfor&ccedil;o.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all">
                Come&ccedil;ar Gr&aacute;tis <IconArrowRight className="w-5 h-5" />
              </Link>
              <a href="#funcionalidades" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-lg px-8 py-4 rounded-2xl border border-white/10 transition-colors">Ver Funcionalidades</a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-blue-400" /><span>Sem cart&atilde;o de cr&eacute;dito</span></div>
              <div className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-blue-400" /><span>Toda a fam&iacute;lia pode usar</span></div>
              <div className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-blue-400" /><span>Plano de refei&ccedil;&otilde;es inclu&iacute;do</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">{s.value}</div>
                <div className="mt-1 text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Uma casa organizada n&atilde;o acontece por acaso.<br /><span className="text-white/50">Mas tamb&eacute;m n&atilde;o precisa de ser dif&iacute;cil.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/[0.03] rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><IconX className="w-5 h-5 text-red-400" /></div>
                <h3 className="text-lg font-bold text-red-400">O que N&Atilde;O funciona</h3>
              </div>
              <ul className="space-y-4">
                {problems.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0"><IconX className="w-3 h-3 text-red-400" /></div>
                    <span className="text-white/60 text-sm leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/[0.03] rounded-3xl border border-blue-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><IconCheck className="w-5 h-5 text-blue-400" /></div>
                <h3 className="text-lg font-bold text-blue-400">O que FUNCIONA com VIDA.LAR</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0"><IconCheck className="w-3 h-3 text-blue-400" /></div>
                    <span className="text-white/70 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">As 3 fases do lar organizado</h2>
            <p className="mt-4 text-lg text-white/50">De ca&oacute;tico a perfeito em poucos passos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent -translate-x-8" />}
                <div className="bg-white/[0.03] rounded-3xl border border-white/10 p-8 h-full">
                  <div className="text-5xl font-extrabold text-blue-400/30 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section id="funcionalidades" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">A plataforma completa</h2>
            <p className="mt-4 text-lg text-white/50">Tudo o que precisas para gerir a tua casa, numa s&oacute; app.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 hover:border-blue-500/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-blue-400" /></div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Funcionalidades exclusivas</h2>
            <p className="mt-4 text-lg text-white/50">O que s&oacute; encontras no VIDA.LAR.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uniqueFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.badge} className="bg-white/[0.03] rounded-3xl border border-white/10 p-8 hover:border-blue-500/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center"><Icon className="w-6 h-6 text-blue-400" /></div>
                    <span className="text-[10px] font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{f.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold">Pronto para uma casa sem stress?</h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">Come&ccedil;a hoje e transforma a tua casa num lugar organizado e tranquilo.</p>
              <Link href="/login" className="mt-8 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                Come&ccedil;ar Gr&aacute;tis Agora <IconArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center"><IconHome className="w-3.5 h-3.5 text-white" /></div>
                <span className="text-lg font-bold text-white">VIDA<span className="text-blue-400">.LAR</span></span>
              </div>
              <p className="text-sm text-white/40">Parte do ecossistema VIDA</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/terms" className="hover:text-white transition-colors">Termos</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
            </div>
            <p className="text-sm text-white/30">&copy; 2025 VIDA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
