import { createServerClient } from "@vida/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIDA - Tua vida, organizada. Tua familia, feliz.",
  description:
    "O ecossistema digital que organiza a tua vida familiar. Financas, casa, saude e familia — tudo num so lugar. Comeca gratis.",
};

/* ──────────────────────────────────────────────
   Inline SVG Icons
   ────────────────────────────────────────────── */

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

function IconHeart({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function IconWallet({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function IconHome({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function IconActivity({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const modules = [
  {
    name: "VIDA.FAMILIA",
    nameDisplay: "VIDA.FAM\u00CDLIA",
    tagline: "O cora\u00E7\u00E3o da tua fam\u00EDlia, digital",
    description: "Calend\u00E1rio partilhado, tarefas, chat familiar e mem\u00F3rias \u2014 tudo o que une a tua fam\u00EDlia num s\u00F3 lugar.",
    color: "#FF6B35",
    bgLight: "#FFF3ED",
    borderColor: "border-orange-200",
    textColor: "text-familia-500",
    icon: IconHeart,
    features: [
      "Calend\u00E1rio familiar",
      "Chat privado",
      "Fotos & Mem\u00F3rias",
      "Tarefas partilhadas",
    ],
    href: "#",
  },
  {
    name: "VIDA.DINHEIRO",
    nameDisplay: "VIDA.DINHEIRO",
    tagline: "Tuas finan\u00E7as, teus sonhos",
    description: "Controla receitas e despesas, cria or\u00E7amentos, define metas de poupan\u00E7a e organiza o xitique familiar.",
    color: "#10B981",
    bgLight: "#ECFDF5",
    borderColor: "border-emerald-200",
    textColor: "text-dinheiro-500",
    icon: IconWallet,
    features: [
      "Transa\u00E7\u00F5es",
      "Or\u00E7amentos",
      "Xitique digital",
      "Relat\u00F3rios",
    ],
    href: "#",
  },
  {
    name: "VIDA.LAR",
    nameDisplay: "VIDA.LAR",
    tagline: "Tua casa, sem stress",
    description: "Invent\u00E1rio dom\u00E9stico, listas de compras, plano de refei\u00E7\u00F5es e manuten\u00E7\u00E3o \u2014 a tua casa sob controlo.",
    color: "#3B82F6",
    bgLight: "#EFF6FF",
    borderColor: "border-blue-200",
    textColor: "text-lar-500",
    icon: IconHome,
    features: [
      "Invent\u00E1rio",
      "Compras",
      "Refei\u00E7\u00F5es",
      "Manuten\u00E7\u00E3o",
    ],
    href: "#",
  },
  {
    name: "VIDA.SAUDE",
    nameDisplay: "VIDA.SA\u00DADE",
    tagline: "Tua fam\u00EDlia, sempre saud\u00E1vel",
    description: "Hist\u00F3rico m\u00E9dico, medica\u00E7\u00E3o, consultas e vacinas \u2014 a sa\u00FAde de toda a fam\u00EDlia organizada.",
    color: "#F43F5E",
    bgLight: "#FFF1F2",
    borderColor: "border-rose-200",
    textColor: "text-saude-500",
    icon: IconActivity,
    features: [
      "Hist\u00F3rico m\u00E9dico",
      "Medica\u00E7\u00E3o",
      "Consultas",
      "Vacinas",
    ],
    href: "#",
  },
];

const pricingPlans = [
  {
    name: "GR\u00C1TIS",
    price: "0 MT",
    period: "",
    description: "Para come\u00E7ar a organizar a tua vida",
    features: [
      "Experimenta tudo",
      "Funcionalidades b\u00E1sicas",
      "Sem cart\u00E3o de cr\u00E9dito",
      "At\u00E9 2 membros da fam\u00EDlia",
    ],
    cta: "Come\u00E7ar Gr\u00E1tis",
    highlighted: false,
  },
  {
    name: "PRO",
    price: "900 MT",
    period: "/m\u00EAs",
    description: "Para fam\u00EDlias que querem mais",
    features: [
      "Tudo ilimitado",
      "IA avan\u00E7ada",
      "Suporte priorit\u00E1rio",
      "At\u00E9 8 membros da fam\u00EDlia",
      "Exporta\u00E7\u00E3o de dados",
    ],
    cta: "Escolher Pro",
    highlighted: true,
  },
  {
    name: "VIP",
    price: "2.000 MT",
    period: "/m\u00EAs",
    description: "A experi\u00EAncia completa",
    features: [
      "Tudo Pro +",
      "AI Concierge pessoal",
      "Consultoria mensal",
      "Membros ilimitados",
      "Funcionalidades beta",
      "Suporte 24/7",
    ],
    cta: "Ser VIP",
    highlighted: false,
  },
];

/* ──────────────────────────────────────────────
   Page Component (Server Component)
   ────────────────────────────────────────────── */

export default async function RootPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/painel");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-familia-500 via-dinheiro-500 to-lar-500 flex items-center justify-center shadow-lg shadow-familia-500/20">
                <span className="text-white font-black text-sm">V</span>
              </div>
              <span className="text-xl font-bold tracking-tight">VIDA</span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <a href="#ecossistema" className="text-sm text-white/50 hover:text-white transition-colors">
                Ecossistema
              </a>
              <a href="#modulos" className="text-sm text-white/50 hover:text-white transition-colors">
                M&oacute;dulos
              </a>
              <a href="#precos" className="text-sm text-white/50 hover:text-white transition-colors">
                Pre&ccedil;os
              </a>
            </div>
            <Link
              href="/login"
              className="bg-white text-[#0A0A0F] text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
            >
              Come&ccedil;ar
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-familia-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-dinheiro-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[300px] bg-lar-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 mb-8 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-white/60">
                4 apps &middot; 1 ecossistema &middot; Tudo gr&aacute;tis para come&ccedil;ar
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Tua vida,
              <br />
              <span className="bg-gradient-to-r from-familia-400 via-dinheiro-400 to-lar-400 bg-clip-text text-transparent">
                organizada.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Um ecossistema completo para organizar a fam&iacute;lia, as finan&ccedil;as, a casa e a sa&uacute;de &mdash; tudo conectado, tudo simples.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0F] font-semibold text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-white/10 transition-all hover:shadow-white/20 hover:scale-[1.02]"
              >
                Come&ccedil;ar Gr&aacute;tis
                <IconArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#ecossistema"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/70 hover:text-white font-semibold text-lg px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
              >
                Ver Ecossistema
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ecosystem Constellation ── */}
      <section id="ecossistema" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">O Ecossistema</h2>
            <p className="mt-4 text-lg text-white/40">
              Quatro m&oacute;dulos conectados &agrave; volta da tua vida familiar
            </p>
          </div>

          {/* Constellation Diagram */}
          <div className="relative mx-auto w-full max-w-lg aspect-square">
            {/* Connecting Lines SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
              <line x1="200" y1="200" x2="200" y2="50" stroke="url(#grad-familia)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="200" y1="200" x2="350" y2="200" stroke="url(#grad-dinheiro)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="200" y1="200" x2="200" y2="350" stroke="url(#grad-saude)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="200" y1="200" x2="50" y2="200" stroke="url(#grad-lar)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              {/* Orbital ring */}
              <circle cx="200" cy="200" r="145" stroke="white" strokeWidth="0.5" opacity="0.06" />
              <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="0.5" opacity="0.04" />
              <defs>
                <linearGradient id="grad-familia" x1="200" y1="200" x2="200" y2="50">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="#FF6B35" />
                </linearGradient>
                <linearGradient id="grad-dinheiro" x1="200" y1="200" x2="350" y2="200">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="grad-saude" x1="200" y1="200" x2="200" y2="350">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>
                <linearGradient id="grad-lar" x1="200" y1="200" x2="50" y2="200">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center - VIDA */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-familia-500 via-dinheiro-500 to-lar-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-sm">V</span>
                  </div>
                  <span className="text-[10px] font-bold text-white/60 mt-1 block tracking-widest">VIDA</span>
                </div>
              </div>
            </div>

            {/* Top - Familia */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1a1218] border border-familia-500/30 flex items-center justify-center shadow-lg shadow-familia-500/10">
                  <IconHeart className="w-7 h-7 sm:w-8 sm:h-8 text-familia-400" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-familia-400">FAM&Iacute;LIA</span>
                  <span className="block text-[10px] text-white/30">Fam&iacute;lia</span>
                </div>
              </div>
            </div>

            {/* Right - Dinheiro */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0f1a17] border border-dinheiro-500/30 flex items-center justify-center shadow-lg shadow-dinheiro-500/10">
                  <IconWallet className="w-7 h-7 sm:w-8 sm:h-8 text-dinheiro-400" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-dinheiro-400">DINHEIRO</span>
                  <span className="block text-[10px] text-white/30">Finan&ccedil;as</span>
                </div>
              </div>
            </div>

            {/* Bottom - Saude */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1a1115] border border-saude-500/30 flex items-center justify-center shadow-lg shadow-saude-500/10">
                  <IconActivity className="w-7 h-7 sm:w-8 sm:h-8 text-saude-400" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-saude-400">SA&Uacute;DE</span>
                  <span className="block text-[10px] text-white/30">Sa&uacute;de</span>
                </div>
              </div>
            </div>

            {/* Left - Lar */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0f1420] border border-lar-500/30 flex items-center justify-center shadow-lg shadow-lar-500/10">
                  <IconHome className="w-7 h-7 sm:w-8 sm:h-8 text-lar-400" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-lar-400">LAR</span>
                  <span className="block text-[10px] text-white/30">Casa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Module Cards Section ── */}
      <section id="modulos" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Os M&oacute;dulos</h2>
            <p className="mt-4 text-lg text-white/40">
              Cada m&oacute;dulo resolve um desafio da vida familiar. Juntos, transformam a tua rotina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.name}
                  className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                >
                  {/* Colored top accent */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full opacity-60"
                    style={{ backgroundColor: mod.color }}
                  />

                  {/* Icon + Name */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{ backgroundColor: `${mod.color}10`, borderColor: `${mod.color}20` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: mod.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: mod.color }}>
                        {mod.nameDisplay}
                      </h3>
                      <p className="text-sm text-white/40">{mod.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {mod.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mod.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                        style={{
                          color: mod.color,
                          backgroundColor: `${mod.color}08`,
                          borderColor: `${mod.color}15`,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: mod.color }}
                  >
                    Explorar
                    <IconArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section id="precos" className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-familia-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Planos simples, sem surpresas
            </h2>
            <p className="mt-4 text-lg text-white/40">
              Come&ccedil;a gr&aacute;tis. Muda de plano quando a tua fam&iacute;lia crescer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl border p-8 flex flex-col backdrop-blur-sm ${
                  plan.highlighted
                    ? "border-familia-500/30 bg-white/[0.04] shadow-2xl shadow-familia-500/5 scale-[1.02]"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-familia-500 to-dinheiro-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      Mais Popular
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-sm text-white/40 mt-1">{plan.description}</p>
                <div className="mt-6 mb-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-white/30 text-sm ml-1">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <IconCheck
                        className={`w-4 h-4 flex-shrink-0 ${
                          plan.highlighted ? "text-familia-400" : "text-dinheiro-400"
                        }`}
                      />
                      <span className="text-sm text-white/50">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`block w-full text-center font-semibold py-3.5 rounded-xl transition-all ${
                    plan.highlighted
                      ? "bg-white text-[#0A0A0F] hover:bg-white/90"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden border border-white/5 bg-white/[0.02]">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-familia-500/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-dinheiro-500/10 rounded-full blur-[80px]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Pronto para organizar a tua vida?
            </h2>
            <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
              Junta-te a fam&iacute;lias que j&aacute; usam o VIDA para simplificar o dia-a-dia.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 bg-white text-[#0A0A0F] font-semibold text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-white/10 hover:scale-[1.02] transition-all"
            >
              Come&ccedil;ar Gr&aacute;tis Agora
              <IconArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-familia-500 via-dinheiro-500 to-lar-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">V</span>
                </div>
                <span className="text-lg font-bold">VIDA</span>
              </div>
              <p className="text-sm text-white/30">
                Tua vida, organizada. Tua fam&iacute;lia, feliz.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/30">
              <Link href="/terms" className="hover:text-white/60 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/privacy" className="hover:text-white/60 transition-colors">
                Pol&iacute;tica de Privacidade
              </Link>
            </div>
            <p className="text-sm text-white/20">
              &copy; 2025 VIDA. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
