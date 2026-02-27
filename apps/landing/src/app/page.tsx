import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIDA - Tua vida, organizada. Tua família, feliz.",
};

/* ──────────────────────────────────────────────
   Inline SVG Icons
   ────────────────────────────────────────────── */

function IconHeart({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function IconWallet({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function IconActivity({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const apps = [
  {
    name: "VIDA.FAMILIA",
    tagline: "O coracao da tua familia, digital",
    nameDisplay: "VIDA.FAM\u00CDLIA",
    taglineDisplay: "O cora\u00E7\u00E3o da tua fam\u00EDlia, digital",
    color: "#FF6B35",
    bgLight: "#FFF3ED",
    icon: IconHeart,
    features: [
      "Calend\u00E1rio familiar partilhado",
      "Lista de tarefas em conjunto",
      "Mem\u00F3rias e fotos organizadas",
      "Chat familiar privado",
    ],
  },
  {
    name: "VIDA.DINHEIRO",
    tagline: "Tuas financas, teus sonhos",
    nameDisplay: "VIDA.DINHEIRO",
    taglineDisplay: "Tuas finan\u00E7as, teus sonhos",
    color: "#10B981",
    bgLight: "#ECFDF5",
    icon: IconWallet,
    features: [
      "Controlo de receitas e despesas",
      "Or\u00E7amentos inteligentes",
      "Metas de poupan\u00E7a",
      "Relat\u00F3rios e gr\u00E1ficos claros",
    ],
  },
  {
    name: "VIDA.LAR",
    tagline: "Tua casa, sem stress",
    nameDisplay: "VIDA.LAR",
    taglineDisplay: "Tua casa, sem stress",
    color: "#3B82F6",
    bgLight: "#EFF6FF",
    icon: IconHome,
    features: [
      "Gest\u00E3o de manuten\u00E7\u00E3o da casa",
      "Invent\u00E1rio dom\u00E9stico",
      "Lembretes de contas e servi\u00E7os",
      "Projectos de melhoria",
    ],
  },
  {
    name: "VIDA.SAUDE",
    tagline: "Tua familia, sempre saudavel",
    nameDisplay: "VIDA.SA\u00DADE",
    taglineDisplay: "Tua fam\u00EDlia, sempre saud\u00E1vel",
    color: "#F43F5E",
    bgLight: "#FFF1F2",
    icon: IconActivity,
    features: [
      "Hist\u00F3rico m\u00E9dico familiar",
      "Lembretes de consultas e vacinas",
      "Acompanhamento de medicamentos",
      "Dicas de sa\u00FAde personalizadas",
    ],
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
   Page Component
   ────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-familia-500 to-familia-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-[var(--color-text-primary)]">
                VIDA
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <a
                href="#apps"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Apps
              </a>
              <a
                href="#precos"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Pre&ccedil;os
              </a>
            </div>
            <a
              href="#precos"
              className="bg-familia-500 hover:bg-familia-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Come&ccedil;ar
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-familia-200/30 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-dinheiro-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-lar-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-soft mb-8 border border-[var(--color-border)]">
              <IconStar className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                O ecossistema que a tua fam&iacute;lia merece
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-tight">
              Tua vida, organizada.
              <br />
              <span className="bg-gradient-to-r from-familia-500 via-dinheiro-500 to-lar-500 bg-clip-text text-transparent">
                Tua fam&iacute;lia, feliz.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Quatro apps. Um ecossistema. Tudo o que precisas para organizar as
              finan&ccedil;as, a casa, a sa&uacute;de e os momentos em
              fam&iacute;lia &mdash; num s&oacute; lugar.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#precos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-familia-500 hover:bg-familia-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-soft-lg transition-all hover:shadow-xl"
              >
                Come&ccedil;ar Gr&aacute;tis
                <IconArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#apps"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-muted text-[var(--color-text-primary)] font-semibold text-lg px-8 py-4 rounded-2xl border border-[var(--color-border)] transition-colors"
              >
                Conhecer as Apps
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-dinheiro-500" />
                <span>Sem cart&atilde;o de cr&eacute;dito</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-dinheiro-500" />
                <span>Configura em 2 minutos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-dinheiro-500" />
                <span>Cancela quando quiseres</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Apps Section ── */}
      <section id="apps" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
              Um ecossistema, quatro super-poderes
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Cada app resolve um desafio da vida familiar. Juntas, transformam a
              tua rotina.
            </p>
          </div>

          {/* App Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <div
                  key={app.name}
                  className="group relative bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                >
                  {/* Colored top accent */}
                  <div
                    className="absolute top-0 left-8 right-8 h-1 rounded-b-full"
                    style={{ backgroundColor: app.color }}
                  />

                  {/* Icon + Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: app.bgLight }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: app.color }}
                      >
                        {app.nameDisplay}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {app.taglineDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mt-6">
                    {app.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: app.bgLight }}
                        >
                          <IconCheck
                            className="w-3 h-3"
                            // @ts-expect-error -- style prop on SVG
                            style={{ color: app.color }}
                          />
                        </div>
                        <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section
        id="precos"
        className="py-20 sm:py-28 bg-gradient-to-b from-transparent via-familia-50/50 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
              Planos simples, sem surpresas
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Come&ccedil;a gr&aacute;tis. Muda de plano quando a tua
              fam&iacute;lia crescer.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl border p-8 flex flex-col ${
                  plan.highlighted
                    ? "border-familia-300 shadow-soft-lg ring-2 ring-familia-100 scale-[1.02]"
                    : "border-[var(--color-border)] shadow-soft"
                }`}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-familia-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      Mais Popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6 mb-8">
                  <span className="text-4xl font-extrabold text-[var(--color-text-primary)]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[var(--color-text-muted)] text-sm ml-1">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <IconCheck
                        className={`w-4 h-4 flex-shrink-0 ${
                          plan.highlighted
                            ? "text-familia-500"
                            : "text-dinheiro-500"
                        }`}
                      />
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href="#"
                  className={`block w-full text-center font-semibold py-3.5 rounded-xl transition-colors ${
                    plan.highlighted
                      ? "bg-familia-500 hover:bg-familia-600 text-white"
                      : "bg-muted hover:bg-familia-50 text-[var(--color-text-primary)] border border-[var(--color-border)]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-familia-500 via-familia-600 to-saude-600 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Pronto para organizar a tua vida?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Junta-te a milhares de fam&iacute;lias que j&aacute; usam o VIDA
                para simplificar o dia-a-dia.
              </p>
              <a
                href="#precos"
                className="mt-8 inline-flex items-center gap-2 bg-white text-familia-600 font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Come&ccedil;ar Gr&aacute;tis Agora
                <IconArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--color-border)] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo + tagline */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-familia-500 to-familia-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">V</span>
                </div>
                <span className="text-lg font-bold text-[var(--color-text-primary)]">
                  VIDA
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Parte do ecossistema VIDA
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
                Pol&iacute;tica de Privacidade
              </a>
              <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">
                Contacto
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-[var(--color-text-muted)]">
              &copy; {new Date().getFullYear()} VIDA. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
