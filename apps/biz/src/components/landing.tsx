"use client";

import Image from "next/image";
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
  GraduationCap,
  FileText,
  Landmark,
  TrendingUp,
  MapPin,
  Clock,
  Heart,
  Quote,
  BookOpen,
  BadgeCheck,
  Banknote,
} from "lucide-react";

/* ─── Features ─────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: ShoppingBag,
    title: "Ponto de Venda",
    description:
      "Regista vendas em segundos. Cash, M-Pesa, transferência — tudo num toque.",
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Package,
    title: "Controlo de Stock",
    description:
      "Sabe exactamente o que tens. Alertas automáticos quando stock está baixo.",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
  },
  {
    icon: CreditCard,
    title: "Controlo de Dívidas",
    description:
      "Sabe quem te deve e quanto. Histórico completo. Nunca mais perdes dinheiro.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
  {
    icon: Users,
    title: "Gestão de Staff",
    description:
      "Equipa organizada. Salários, turnos e desempenho de cada membro.",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description:
      "Vê o lucro real do teu negócio. Diário, semanal, mensal. Decisões com dados.",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
  },
  {
    icon: Smartphone,
    title: "Funciona Offline",
    description:
      "Sem internet? Sem problema. maBIZ funciona offline e sincroniza depois.",
    gradient: "from-teal-500 to-cyan-600",
    bg: "bg-teal-50",
  },
];

const ORIENTATION_ITEMS = [
  {
    icon: Landmark,
    title: "Pedido de Empréstimos",
    description:
      "Orientação passo-a-passo para preparar documentação e candidatar-te a microcrédito. Sabe que bancos e instituições oferecem as melhores condições.",
  },
  {
    icon: FileText,
    title: "Formalização do Negócio",
    description:
      "Guia completo para registar o teu negócio. NUIT, alvará, licenças — todos os passos explicados de forma simples.",
  },
  {
    icon: GraduationCap,
    title: "Educação Financeira",
    description:
      "Aprende a separar finanças pessoais do negócio, a calcular margem de lucro, a poupar e a investir no crescimento.",
  },
  {
    icon: BookOpen,
    title: "Dicas de Gestão",
    description:
      "Conteúdos práticos sobre marketing, atendimento ao cliente, gestão de inventário e muito mais. Aprende enquanto geres.",
  },
];

const STATS = [
  { value: "500+", label: "Negócios activos", icon: TrendingUp },
  { value: "10K+", label: "Vendas registadas", icon: ShoppingBag },
  { value: "24/7", label: "Disponível sempre", icon: Clock },
  { value: "100%", label: "Feito em Moçambique", icon: MapPin },
];

const TESTIMONIALS = [
  {
    name: "Amélia Machava",
    role: "Dona de mercearia, Maputo",
    text: "Antes usava caderno e perdia o controlo. Com o maBIZ sei exactamente quanto vendi, quem me deve e o que preciso comprar. Mudou o meu negócio!",
  },
  {
    name: "Carlos Sitoe",
    role: "Barbeiro, Matola",
    text: "A parte de orientação para empréstimos ajudou-me a preparar tudo para o microcrédito. Consegui o financiamento à primeira tentativa.",
  },
  {
    name: "Fátima Nhaca",
    role: "Vendedora de roupa, Beira",
    text: "Funciona mesmo sem internet! No mercado nem sempre tenho dados, mas o maBIZ continua a funcionar. Quando chego a casa sincroniza tudo.",
  },
];

/* ─── Landing Page ─────────────────────────────────────────────────────────── */

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ━━ Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2.5">
          <Image
            src="/logos/mabiz-full.png"
            alt="maBIZ"
            width={400}
            height={160}
            className="h-11 w-auto"
            priority
          />
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/login?mode=register"
              className="text-sm font-bold text-white bg-[#1A5C35] hover:bg-[#14472A] px-5 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 hover:shadow-lg active:scale-[0.97]"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* ━━ Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D3820] via-[#1A5C35] to-[#1E7A42]">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#C5975B] rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-emerald-100 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/10">
                <Heart className="w-3.5 h-3.5 text-[#C5975B]" />
                Feito para empreendedores moçambicanos
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-5">
                Teu negócio,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5975B] to-[#E8C496]">
                  organizado
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-emerald-100/80 max-w-lg mb-8 leading-relaxed">
                Vendas, stock, dívidas, staff e{" "}
                <strong className="text-white">orientação para crescer</strong>{" "}
                — tudo no teu telemóvel.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 lg:justify-start justify-center">
                <Link
                  href="/login?mode=register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-bold text-[#1A5C35] bg-white hover:bg-gray-50 px-8 py-4 rounded-2xl shadow-xl shadow-black/20 transition-all hover:shadow-2xl active:scale-[0.97]"
                >
                  Começar grátis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#funcionalidades"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-medium text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl transition-all border border-white/10 active:scale-[0.97]"
                >
                  Ver funcionalidades
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-start justify-center">
                {[
                  { icon: Zap, text: "Setup em 2 min" },
                  { icon: Shield, text: "Dados seguros" },
                  { icon: Wifi, text: "Funciona offline" },
                ].map((p) => (
                  <div key={p.text} className="flex items-center gap-1.5 text-xs text-emerald-200/70">
                    <p.icon className="w-3.5 h-3.5" />
                    {p.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: App mockup */}
            <div className="hidden lg:block relative">
              <div className="relative mx-auto w-[280px]">
                {/* Phone frame */}
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/50">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-10" />
                  <div className="bg-white rounded-[2.4rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-[#1A5C35] px-6 pt-10 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <Image
                          src="/logos/mabiz-full.png"
                          alt="maBIZ"
                          width={200}
                          height={80}
                          className="h-7 w-auto brightness-0 invert"
                        />
                        <div className="w-8 h-8 bg-white/20 rounded-full" />
                      </div>
                      <p className="text-emerald-100 text-xs">Olá, Amélia!</p>
                    </div>
                    {/* Dashboard content */}
                    <div className="px-4 py-3 space-y-3">
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100">
                        <p className="text-[10px] text-gray-500 mb-0.5">Vendas de hoje</p>
                        <p className="text-lg font-black text-gray-900">4.350 <span className="text-xs font-normal text-gray-500">MZN</span></p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp className="w-3 h-3 text-emerald-600" />
                          <span className="text-[10px] font-semibold text-emerald-600">+23% vs ontem</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 rounded-xl p-2.5 border border-blue-100">
                          <Package className="w-4 h-4 text-blue-600 mb-1" />
                          <p className="text-[10px] text-gray-500">Stock</p>
                          <p className="text-sm font-bold text-gray-900">142 itens</p>
                        </div>
                        <div className="bg-violet-50 rounded-xl p-2.5 border border-violet-100">
                          <CreditCard className="w-4 h-4 text-violet-600 mb-1" />
                          <p className="text-[10px] text-gray-500">Dívidas</p>
                          <p className="text-sm font-bold text-gray-900">2.100 MZN</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Vendas recentes</p>
                        {[
                          { item: "Arroz 25kg", val: "1.200 MZN", time: "14:32" },
                          { item: "Óleo 5L", val: "450 MZN", time: "14:15" },
                          { item: "Açúcar 2kg", val: "180 MZN", time: "13:50" },
                        ].map((s) => (
                          <div key={s.item} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                            <div>
                              <p className="text-xs font-medium text-gray-900">{s.item}</p>
                              <p className="text-[10px] text-gray-400">{s.time}</p>
                            </div>
                            <p className="text-xs font-bold text-emerald-700">{s.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -left-16 top-20 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 flex items-center gap-2 border border-gray-100">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-900">Venda registada!</p>
                    <p className="text-[9px] text-gray-500">1.200 MZN • M-Pesa</p>
                  </div>
                </div>
                <div className="absolute -right-12 bottom-32 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 flex items-center gap-2 border border-gray-100">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Banknote className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-900">Stock baixo</p>
                    <p className="text-[9px] text-gray-500">Farinha — 3 unidades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 60V30C240 5 480 0 720 15C960 30 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ━━ Stats bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 -mt-1">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 text-[#1A5C35] mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-black text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Problem ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full mb-4 border border-red-100">
              O PROBLEMA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Conheces esta realidade?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">
              A maioria dos pequenos negócios em Moçambique perde dinheiro por falta de organização.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                emoji: "📝",
                title: "Cadernos perdidos",
                desc: "Vendas anotadas em papel que se perdem. Contas que nunca batem. Lucro que desaparece.",
                color: "border-l-red-400",
              },
              {
                emoji: "💸",
                title: "Dívidas esquecidas",
                desc: "Clientes que devem e ninguém lembra. Dinheiro que nunca volta. Relações que se perdem.",
                color: "border-l-amber-400",
              },
              {
                emoji: "📦",
                title: "Stock sem controlo",
                desc: "Produtos que acabam sem aviso. Clientes que vão à concorrência. Oportunidades perdidas.",
                color: "border-l-orange-400",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-white rounded-2xl p-6 border border-gray-100 border-l-4 ${item.color} shadow-md hover:shadow-lg transition-shadow`}
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Features ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="funcionalidades" className="scroll-mt-16 mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-4 border border-emerald-100">
              FUNCIONALIDADES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Tudo o que precisas, num só lugar
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">
              Ferramentas pensadas para a realidade do empreendedor moçambicano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className={`group relative ${feature.bg} rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Orientação Empresarial (NEW) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="orientacao" className="scroll-mt-16 mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#C5975B]/10 via-amber-50 to-emerald-50 rounded-3xl border border-amber-200/50 p-8 sm:p-12">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5975B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-[#C5975B]/10 text-[#8B6B3D] text-xs font-bold px-4 py-2 rounded-full mb-4 border border-[#C5975B]/20">
                  <GraduationCap className="w-4 h-4" />
                  MAIS QUE UM APP DE VENDAS
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                  Orientação para{" "}
                  <span className="text-[#C5975B]">crescer</span>
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto text-lg">
                  O maBIZ não é só um sistema de vendas. É o teu parceiro de crescimento com orientação prática para formalizar e expandir o teu negócio.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ORIENTATION_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C5975B] to-[#A67C4A] rounded-xl flex items-center justify-center mb-4 shadow-md">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/login?mode=register"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#C5975B] hover:bg-[#A67C4A] px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:shadow-xl active:scale-[0.97]"
                >
                  Explorar orientação empresarial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ How it works ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="mt-24 bg-gradient-to-br from-[#0D3820] via-[#1A5C35] to-[#1E7A42] text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-emerald-200 bg-white/10 px-3 py-1 rounded-full mb-4">
              COMO FUNCIONA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Começa em 3 passos
            </h2>
            <p className="text-emerald-200/80 max-w-lg mx-auto text-lg">
              Sem complicações. Sem papelada. Sem custos escondidos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: "1", title: "Cria a tua conta", desc: "Registo gratuito em 30 segundos. Sem cartão de crédito." },
              { n: "2", title: "Configura o negócio", desc: "Escolhe o tipo de negócio e adiciona os teus produtos ou serviços." },
              { n: "3", title: "Começa a vender", desc: "Regista vendas, controla stock e vê o teu negócio crescer dia a dia." },
            ].map((step, i) => (
              <div key={step.n} className="text-center relative">
                {i < 2 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-white/15" />
                )}
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black border border-white/10">
                  {step.n}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-emerald-200/70 leading-relaxed max-w-[260px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Testimonials ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full mb-4 border border-violet-100">
              TESTEMUNHOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              O que dizem os nossos utilizadores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow relative"
              >
                <Quote className="w-8 h-8 text-emerald-100 absolute top-4 right-4" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#1A5C35] to-[#C5975B] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Pricing ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="precos" className="scroll-mt-16 mt-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-4 border border-emerald-100">
              PLANOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Planos para cada fase do teu negócio
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">
              Começa grátis. Cresce quando estiveres pronto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-md flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Grátis</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">0</span>
                <span className="text-sm text-gray-500">MZN/mês</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Para quem está a começar</p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  { text: "Até 5 vendas/mês", ok: true },
                  { text: "Controlo de stock básico", ok: true },
                  { text: "Controlo de dívidas", ok: true },
                  { text: "Orientação empresarial", ok: true },
                  { text: "1 utilizador", ok: true },
                  { text: "Relatórios avançados", ok: false },
                  { text: "Multi-utilizador", ok: false },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2.5 text-sm">
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
                className="block w-full text-center font-bold text-[#1A5C35] bg-emerald-50 hover:bg-emerald-100 py-3.5 rounded-xl transition-colors active:scale-[0.97] border border-emerald-100"
              >
                Começar grátis
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl p-7 border-2 border-[#1A5C35] shadow-xl shadow-emerald-500/10 flex flex-col relative scale-[1.02]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#1A5C35] to-[#1E7A42] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  <Star className="w-3 h-3" />
                  Mais popular
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 mt-1">Pro</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">499</span>
                <span className="text-sm text-gray-500">MZN/mês</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Para negócios em crescimento</p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Vendas ilimitadas",
                  "Stock com alertas",
                  "Controlo de dívidas completo",
                  "Orientação empresarial completa",
                  "Até 3 utilizadores",
                  "Relatórios avançados",
                  "Suporte prioritário",
                ].map((text) => (
                  <li key={text} className="flex items-center gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login?mode=register"
                className="block w-full text-center font-bold text-white bg-[#1A5C35] hover:bg-[#14472A] py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl active:scale-[0.97]"
              >
                Experimentar 1 semana grátis
              </Link>
            </div>

            {/* Business */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-md flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Negócio</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">1.499</span>
                <span className="text-sm text-gray-500">MZN/mês</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Para equipas e multi-loja</p>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Tudo do Pro",
                  "Utilizadores ilimitados",
                  "Multi-loja",
                  "Orientação + consultoria",
                  "Exportação de dados",
                  "API e integrações",
                  "Gestor de conta dedicado",
                ].map((text) => (
                  <li key={text} className="flex items-center gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login?mode=register"
                className="block w-full text-center font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 py-3.5 rounded-xl transition-colors active:scale-[0.97]"
              >
                Falar com vendas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ Final CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D3820] via-[#1A5C35] to-[#1E7A42]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-[#C5975B] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <Image
            src="/logos/mabiz-full.png"
            alt="maBIZ"
            width={400}
            height={160}
            className="h-16 w-auto mx-auto mb-6 brightness-0 invert"
          />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Organiza o teu negócio hoje
          </h2>
          <p className="text-emerald-200/80 max-w-md mx-auto mb-10 text-lg">
            Junta-te aos empreendedores moçambicanos que já estão a usar maBIZ para crescer.
          </p>
          <Link
            href="/login?mode=register"
            className="inline-flex items-center gap-2 text-lg font-bold text-[#1A5C35] bg-white hover:bg-gray-50 px-10 py-4 rounded-2xl shadow-xl shadow-black/20 transition-all hover:shadow-2xl active:scale-[0.97]"
          >
            Começar agora — é grátis
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ━━ Footer ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <Image
                src="/logos/mabiz-full.png"
                alt="maBIZ"
                width={400}
                height={160}
                className="h-10 w-auto brightness-0 invert mb-3"
              />
              <p className="text-sm text-gray-400 leading-relaxed">
                O sistema de gestão feito para empreendedores moçambicanos. Simples, acessível e poderoso.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3 text-gray-300">Produto</h4>
              <ul className="space-y-2">
                {["Funcionalidades", "Orientação Empresarial", "Preços"].map((item) => (
                  <li key={item}>
                    <Link href={`#${item === "Funcionalidades" ? "funcionalidades" : item === "Preços" ? "precos" : "orientacao"}`} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3 text-gray-300">Contacto</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-500">info@mabiz.co.mz</li>
                <li className="text-sm text-gray-500">+258 84 000 0000</li>
                <li className="text-sm text-gray-500">Maputo, Moçambique</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} maBIZ. Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-600">
              Teu negócio, organizado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
