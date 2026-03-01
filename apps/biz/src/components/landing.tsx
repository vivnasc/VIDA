"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Package,
  CreditCard,
  Users,
  BarChart3,
  Smartphone,
  ArrowRight,
  Check,
  X,
  Zap,
  Shield,
  Wifi,
  ChevronRight,
  Star,
} from "lucide-react";

/* ─── maBIZ Brand Colors ───────────────────────────────────────────────────── */

const BRAND = {
  green: "#1A5C35",
  greenDark: "#14472A",
  gold: "#C5975B",
};

/* ─── maBIZ Isometric Cube Mark ────────────────────────────────────────────── */

function MaBizMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Top face: M chevron */}
      <path d="M9 34 L27 17 L49 30 L72 17 L91 34 L50 55 Z" fill={BRAND.green} />
      {/* Left face: gold */}
      <path d="M7 37 L48 58 L48 93 L7 72 Z" fill={BRAND.gold} />
      {/* Right face: dark green with B notch */}
      <path d="M52 58 L93 37 L93 47 L82 51 L82 57 L93 61 L93 72 L52 93 Z" fill={BRAND.greenDark} />
    </svg>
  );
}

/* ─── maBIZ Full Logo (Cube + Text + Swoosh) ───────────────────────────────── */

function MaBizLogo({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  const styles = {
    sm: { mark: 24, text: "text-lg", swoosh: { w: 52, h: 5 }, gap: "gap-1.5" },
    md: { mark: 32, text: "text-2xl", swoosh: { w: 68, h: 6 }, gap: "gap-2" },
    lg: { mark: 40, text: "text-3xl", swoosh: { w: 84, h: 7 }, gap: "gap-2.5" },
    xl: { mark: 56, text: "text-5xl", swoosh: { w: 120, h: 8 }, gap: "gap-3" },
  };
  const s = styles[size];

  return (
    <div className={`inline-flex items-center ${s.gap}`}>
      <MaBizMark size={s.mark} />
      <div className="inline-flex flex-col items-start">
        <span className={`${s.text} font-black tracking-tight leading-none`}>
          <span style={{ color: BRAND.gold }}>ma</span>
          <span style={{ color: BRAND.green }}>BIZ</span>
        </span>
        <svg width={s.swoosh.w} height={s.swoosh.h} viewBox="0 0 60 6" className="-mt-0.5">
          <path d="M0 4 Q15 0 30 3 Q45 6 60 2" stroke={BRAND.green} strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Features data ─────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: ShoppingBag,
    title: "Ponto de Venda",
    description: "Regista vendas em segundos. Cash, M-Pesa, transferência. Tudo num toque.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Package,
    title: "Controlo de Stock",
    description: "Sabe exactamente o que tens. Alertas automáticos quando stock está baixo.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: CreditCard,
    title: "Controlo de Dívidas",
    description: "Sabe quem te deve e quanto. Histórico completo. Nunca mais perdes dinheiro.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: Users,
    title: "Gestão de Staff",
    description: "Equipa organizada. Salários, turnos e desempenho de cada membro.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    description: "Vê o lucro real do teu negócio. Diário, semanal, mensal. Decisões com dados.",
    color: "bg-rose-100 text-rose-700",
  },
  {
    icon: Smartphone,
    title: "Funciona Offline",
    description: "Sem internet? Sem problema. maBIZ funciona offline e sincroniza depois.",
    color: "bg-teal-100 text-teal-700",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Cria a tua conta",
    description: "Registo gratuito em 30 segundos. Sem cartão de crédito.",
  },
  {
    number: "2",
    title: "Configura o negócio",
    description: "Escolhe o tipo de negócio e adiciona os teus serviços ou produtos.",
  },
  {
    number: "3",
    title: "Começa a vender",
    description: "Regista vendas, controla stock e vê o teu negócio crescer.",
  },
];

const SELLING_POINTS = [
  { icon: Zap, text: "Configuração em 2 minutos" },
  { icon: Shield, text: "Dados seguros na cloud" },
  { icon: Wifi, text: "Funciona sem internet" },
  { icon: Smartphone, text: "Instala como app no telemóvel" },
];

/* ─── Landing Page ──────────────────────────────────────────────────────────── */

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Header / Nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <MaBizLogo size="md" />
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/login?mode=register"
              className="text-sm font-semibold text-white bg-[#1A5C35] hover:bg-[#14472A] px-4 py-2 rounded-xl transition-colors"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E7A42]/5 via-transparent to-amber-50/30" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-emerald-100">
            <Zap className="w-3.5 h-3.5" />
            Feito para empreendedores moçambicanos
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Teu negócio,{" "}
            <span className="text-[#1A5C35]">organizado</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            Vendas, stock, dívidas, staff — tudo o que precisas para gerir o teu
            negócio, no teu telemóvel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              href="/login?mode=register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold text-white bg-[#1A5C35] hover:bg-[#14472A] px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]"
            >
              Começar grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#funcionalidades"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-8 py-3.5 rounded-xl transition-colors active:scale-[0.98]"
            >
              Ver funcionalidades
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {SELLING_POINTS.map((point) => (
              <div key={point.text} className="flex items-center gap-1.5 text-xs text-gray-500">
                <point.icon className="w-3.5 h-3.5 text-[#1A5C35]" />
                {point.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Conheces esta realidade?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              A maioria dos pequenos negócios em Moçambique perde dinheiro por falta de organização.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-2xl mb-3">📝</div>
              <h3 className="font-semibold text-gray-900 mb-1">Cadernos perdidos</h3>
              <p className="text-sm text-gray-500">
                Vendas anotadas em papel que se perdem. Contas que não batem.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-2xl mb-3">💸</div>
              <h3 className="font-semibold text-gray-900 mb-1">Dívidas esquecidas</h3>
              <p className="text-sm text-gray-500">
                Clientes que devem e ninguém lembra. Dinheiro que nunca volta.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-2xl mb-3">📦</div>
              <h3 className="font-semibold text-gray-900 mb-1">Stock sem controlo</h3>
              <p className="text-sm text-gray-500">
                Produtos que acabam sem aviso. Clientes que vão à concorrência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section id="funcionalidades" className="scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Tudo o que precisas, num só lugar
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Ferramentas pensadas para a realidade do empreendedor moçambicano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
              >
                <div className={`w-11 h-11 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1E7A42] to-[#14532D] text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">
              Começa em 3 passos
            </h2>
            <p className="text-emerald-200 max-w-md mx-auto">
              Sem complicações. Sem papelada. Sem custos escondidos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-black">
                  {step.number}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-emerald-200 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <section id="precos" className="bg-gray-50 border-y border-gray-100 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Planos para cada fase do teu negócio
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Começa grátis. Cresce quando estiveres pronto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* ── Grátis ── */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Grátis</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-gray-900">0</span>
                <span className="text-sm text-gray-500">MZN/mês</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">Para quem está a começar</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  { text: "Até 5 vendas/mês", ok: true },
                  { text: "Controlo de stock básico", ok: true },
                  { text: "Controlo de dívidas", ok: true },
                  { text: "1 utilizador", ok: true },
                  { text: "Relatórios avançados", ok: false },
                  { text: "Multi-utilizador", ok: false },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-sm">
                    {item.ok ? (
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={item.ok ? "text-gray-700" : "text-gray-400"}>{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login?mode=register"
                className="block w-full text-center font-semibold text-[#1A5C35] bg-emerald-50 hover:bg-emerald-100 py-3 rounded-xl transition-colors active:scale-[0.98]"
              >
                Começar grátis
              </Link>
            </div>

            {/* ── Pro (destaque) ── */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#1E7A42] shadow-xl shadow-emerald-500/10 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 bg-[#1A5C35] text-white text-xs font-bold px-3 py-1 rounded-full">
                  <Star className="w-3 h-3" />
                  Popular
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Pro</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-gray-900">499</span>
                <span className="text-sm text-gray-500">MZN/mês</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">Para negócios em crescimento</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  { text: "Vendas ilimitadas", ok: true },
                  { text: "Stock com alertas", ok: true },
                  { text: "Controlo de dívidas completo", ok: true },
                  { text: "Até 3 utilizadores", ok: true },
                  { text: "Relatórios avançados", ok: true },
                  { text: "Suporte prioritário", ok: true },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login?mode=register"
                className="block w-full text-center font-bold text-white bg-[#1A5C35] hover:bg-[#14472A] py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Experimentar 1 semana grátis
              </Link>
            </div>

            {/* ── Negócio ── */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Negócio</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-gray-900">1.499</span>
                <span className="text-sm text-gray-500">MZN/mês</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">Para equipas e multi-loja</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  { text: "Tudo do Pro", ok: true },
                  { text: "Utilizadores ilimitados", ok: true },
                  { text: "Multi-loja", ok: true },
                  { text: "Exportação de dados", ok: true },
                  { text: "API e integrações", ok: true },
                  { text: "Gestor de conta dedicado", ok: true },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login?mode=register"
                className="block w-full text-center font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl transition-colors active:scale-[0.98]"
              >
                Falar com vendas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section>
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="flex justify-center">
            <MaBizLogo size="lg" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mt-6 mb-3">
            Organiza o teu negócio hoje
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            Junta-te aos empreendedores moçambicanos que já estão a usar maBIZ para crescer.
          </p>
          <Link
            href="/login?mode=register"
            className="inline-flex items-center gap-2 text-base font-bold text-white bg-[#1A5C35] hover:bg-[#14472A] px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl active:scale-[0.98]"
          >
            Começar agora
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <MaBizLogo size="sm" />
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} maBIZ. Teu negócio, organizado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
