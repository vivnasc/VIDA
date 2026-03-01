"use client";

import Link from "next/link";
import {
  ShoppingBag,
  Package,
  BookOpen,
  Users,
  BarChart3,
  Smartphone,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Wifi,
  ChevronRight,
} from "lucide-react";

/* ─── maBIZ Logo (inline SVG) ──────────────────────────────────────────────── */

function MaBizLogo({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="192" height="192" rx="38" fill="#1E7A42" />
      <rect x="8" y="8" width="176" height="176" rx="32" fill="#22C55E" opacity="0.15" />
      <circle cx="70" cy="82" r="30" fill="#DCFCE7" />
      <text
        x="70"
        y="90"
        textAnchor="middle"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#166534"
      >
        ma
      </text>
      <text
        x="126"
        y="93"
        textAnchor="middle"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="36"
        fontWeight="900"
        fill="white"
        letterSpacing="-1"
      >
        BIZ
      </text>
      <rect x="40" y="124" width="112" height="2.5" rx="1.25" fill="white" opacity="0.3" />
      <text
        x="96"
        y="150"
        textAnchor="middle"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="white"
        opacity="0.7"
      >
        TEU NEGOCIO
      </text>
    </svg>
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
    icon: BookOpen,
    title: "Gestão de Fiado",
    description: "Controla quem te deve. Histórico completo. Nunca mais esqueces um fiado.",
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
          <div className="flex items-center gap-2.5">
            <MaBizLogo size={36} />
            <span className="text-lg font-black tracking-tight text-gray-900">
              <span className="text-[#1E7A42]/60">ma</span>BIZ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/login?mode=register"
              className="text-sm font-semibold text-white bg-[#1E7A42] hover:bg-[#166534] px-4 py-2 rounded-xl transition-colors"
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
            <span className="text-[#1E7A42]">organizado</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            Vendas, stock, fiados, staff — tudo o que precisas para gerir o teu
            negócio, no teu telemóvel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
              href="/login?mode=register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold text-white bg-[#1E7A42] hover:bg-[#166534] px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]"
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
                <point.icon className="w-3.5 h-3.5 text-[#1E7A42]" />
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
              <h3 className="font-semibold text-gray-900 mb-1">Fiados esquecidos</h3>
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

      {/* ── Pricing / Value ──────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-amber-100">
                Lançamento
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">Gratuito</h3>
              <p className="text-gray-500 text-sm mb-6">
                Para sempre no plano básico. Sem surpresas.
              </p>

              <ul className="text-left space-y-3 mb-8">
                {[
                  "Vendas ilimitadas",
                  "Controlo de stock",
                  "Gestão de fiados",
                  "Relatórios básicos",
                  "Funciona offline",
                  "Suporte por WhatsApp",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/login?mode=register"
                className="block w-full text-center font-bold text-white bg-[#1E7A42] hover:bg-[#166534] py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Criar conta grátis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section>
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <MaBizLogo size={56} />
          <h2 className="text-2xl font-black text-gray-900 mt-6 mb-3">
            Organiza o teu negócio hoje
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">
            Junta-te aos empreendedores moçambicanos que já estão a usar maBIZ para crescer.
          </p>
          <Link
            href="/login?mode=register"
            className="inline-flex items-center gap-2 text-base font-bold text-white bg-[#1E7A42] hover:bg-[#166534] px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl active:scale-[0.98]"
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
            <div className="flex items-center gap-2">
              <MaBizLogo size={28} />
              <span className="text-sm font-bold text-gray-900">
                <span className="text-[#1E7A42]/60">ma</span>BIZ
              </span>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} maBIZ. Teu negócio, organizado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
