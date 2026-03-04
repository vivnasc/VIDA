import { createServerClient } from "@vida/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIDA.FAMILIA - O coracao da tua familia, digital",
  description:
    "Calendario familiar partilhado, chat privado, galeria de memorias, tarefas em conjunto e muito mais. Comeca gratis.",
};

/* ── Inline SVG Icons ── */

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

function IconX({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function IconCalendar({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function IconMessageCircle({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function IconCamera({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function IconClipboardList({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function IconUsers({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconTarget({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconTrophy({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function IconBell({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconSettings({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
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

function IconZap({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function IconLock({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/* ── Data ── */

const stats = [
  { value: "85%", label: "das fam\u00EDlias sem calend\u00E1rio partilhado" },
  { value: "4 apps", label: "integradas num ecossistema" },
  { value: "100%", label: "privado e seguro" },
  { value: "0 MT", label: "para come\u00E7ar" },
];

const problems = [
  "Calend\u00E1rios separados que nunca est\u00E3o sincronizados",
  "Fotos da fam\u00EDlia espalhadas em 5 telem\u00F3veis diferentes",
  "Comunica\u00E7\u00E3o familiar perdida entre grupos de WhatsApp",
  "Tarefas dom\u00E9sticas sem responsabilidade clara",
  "Momentos importantes esquecidos ou sem registo",
];

const solutions = [
  "Um calend\u00E1rio partilhado que toda a fam\u00EDlia v\u00EA e edita",
  "Galeria de mem\u00F3rias organizada por momentos e datas",
  "Chat familiar privado, sem distra\u00E7\u00F5es externas",
  "Tarefas atribu\u00EDdas com responsabilidade e acompanhamento",
  "Marcos familiares celebrados e guardados para sempre",
];

const steps = [
  {
    number: "01",
    title: "Cria a tua fam\u00EDlia",
    description: "Regista-te e convida os membros da tua fam\u00EDlia. Cada um recebe acesso ao espa\u00E7o familiar partilhado.",
  },
  {
    number: "02",
    title: "Organiza e comunica",
    description: "Adiciona eventos ao calend\u00E1rio, cria tarefas partilhadas e usa o chat para manter todos ligados.",
  },
  {
    number: "03",
    title: "Celebra e cresce",
    description: "Guarda fotos, regista marcos e acompanha metas familiares. A vossa hist\u00F3ria, preservada e organizada.",
  },
];

const platformFeatures = [
  {
    icon: IconCalendar,
    title: "Calend\u00E1rio familiar",
    description: "Eventos, anivers\u00E1rios, reuni\u00F5es e compromissos de toda a fam\u00EDlia sincronizados em tempo real.",
  },
  {
    icon: IconMessageCircle,
    title: "Chat familiar privado",
    description: "Comunica\u00E7\u00E3o privada e segura. Sem an\u00FAncios, sem dados vendidos, s\u00F3 a tua fam\u00EDlia.",
  },
  {
    icon: IconCamera,
    title: "Galeria de mem\u00F3rias",
    description: "Fotos e v\u00EDdeos organizados por momentos, datas e membros. As mem\u00F3rias da fam\u00EDlia num s\u00F3 lugar.",
  },
  {
    icon: IconClipboardList,
    title: "Tarefas em fam\u00EDlia",
    description: "Distribui tarefas, define prazos e acompanha quem fez o qu\u00EA. Responsabilidade partilhada.",
  },
  {
    icon: IconUsers,
    title: "Gest\u00E3o de membros",
    description: "Adiciona membros, define pap\u00E9is e permiss\u00F5es. Desde os av\u00F3s at\u00E9 aos mais novos.",
  },
  {
    icon: IconTarget,
    title: "Metas familiares",
    description: "Define objectivos em fam\u00EDlia: poupan\u00E7a para f\u00E9rias, leitura conjunta, h\u00E1bitos saud\u00E1veis.",
  },
  {
    icon: IconTrophy,
    title: "Marcos e conquistas",
    description: "Regista os momentos especiais: primeiro dia de escola, anivers\u00E1rios, forma\u00E7\u00F5es e conquistas.",
  },
  {
    icon: IconBell,
    title: "Notifica\u00E7\u00F5es inteligentes",
    description: "Lembretes de eventos, anivers\u00E1rios e tarefas. Ningu\u00E9m na fam\u00EDlia fica para tr\u00E1s.",
  },
  {
    icon: IconSettings,
    title: "Defini\u00E7\u00F5es flex\u00EDveis",
    description: "Configura o espa\u00E7o familiar ao teu gosto: temas, notifica\u00E7\u00F5es, privacidade e acessos.",
  },
  {
    icon: IconShield,
    title: "Privacidade total",
    description: "Dados encriptados, sem partilha com terceiros. O que \u00E9 da fam\u00EDlia, fica na fam\u00EDlia.",
  },
];

const uniqueFeatures = [
  {
    badge: "CENTRAL",
    title: "O hub de toda a fam\u00EDlia",
    description: "O VIDA.FAM\u00CDLIA liga tudo: o calend\u00E1rio sincroniza com consultas do SA\u00DADE, as despesas integram com o DINHEIRO, e as tarefas conectam com o LAR. Uma fam\u00EDlia, um ecossistema.",
    icon: IconZap,
  },
  {
    badge: "PRIVADO",
    title: "Alternativa privada ao WhatsApp",
    description: "Chat familiar sem an\u00FAncios, sem algoritmos, sem dados vendidos. Conversas, fotos e documentos partilhados num espa\u00E7o 100% privado da tua fam\u00EDlia.",
    icon: IconLock,
  },
  {
    badge: "\u00DANICO",
    title: "Mem\u00F3rias que duram para sempre",
    description: "N\u00E3o s\u00E3o s\u00F3 fotos \u2014 s\u00E3o mem\u00F3rias organizadas por marcos, datas e membros. O di\u00E1rio digital da tua fam\u00EDlia que os teus filhos v\u00E3o agradecer um dia.",
    icon: IconHeart,
  },
];

/* ── Page ── */

export default async function FamiliaLanding() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/painel");
  }

  return (
    <div className="min-h-screen bg-[#0F0A06]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0F0A06]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <IconHeart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              VIDA<span className="text-orange-400">.FAM&Iacute;LIA</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm text-white/60 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="text-sm text-white/60 hover:text-white transition-colors">Como Funciona</a>
          </div>
          <Link
            href="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Come&ccedil;ar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 rounded-full px-4 py-2 mb-8 border border-orange-500/20">
              <IconHeart className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">O cora&ccedil;&atilde;o do ecossistema VIDA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              O cora&ccedil;&atilde;o da tua fam&iacute;lia,
              <br />
              <span className="text-orange-400">digital.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Calend&aacute;rio partilhado, chat privado, mem&oacute;rias organizadas e tarefas em conjunto &mdash; o ponto de encontro digital da tua fam&iacute;lia.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all"
              >
                Come&ccedil;ar Gr&aacute;tis
                <IconArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#funcionalidades"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-lg px-8 py-4 rounded-2xl border border-white/10 transition-colors"
              >
                Ver Funcionalidades
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-orange-400" />
                <span>Sem cart&atilde;o de cr&eacute;dito</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-orange-400" />
                <span>Chat 100% privado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconCheck className="w-4 h-4 text-orange-400" />
                <span>Toda a fam&iacute;lia junta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-orange-400">{stat.value}</div>
                <div className="mt-1 text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              A fam&iacute;lia &eacute; o mais importante.<br />
              <span className="text-white/50">Merece ferramentas &agrave; altura.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/[0.03] rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <IconX className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-red-400">O que N&Atilde;O funciona</h3>
              </div>
              <ul className="space-y-4">
                {problems.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <IconX className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-white/60 text-sm leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/[0.03] rounded-3xl border border-orange-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <IconCheck className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-orange-400">O que FUNCIONA com VIDA.FAM&Iacute;LIA</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <IconCheck className="w-3 h-3 text-orange-400" />
                    </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white">As 3 fases da fam&iacute;lia conectada</h2>
            <p className="mt-4 text-lg text-white/50">De desconectados a unidos em minutos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent -translate-x-8" />
                )}
                <div className="bg-white/[0.03] rounded-3xl border border-white/10 p-8 h-full">
                  <div className="text-5xl font-extrabold text-orange-400/30 mb-4">{step.number}</div>
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
            <p className="mt-4 text-lg text-white/50">
              Tudo o que a tua fam&iacute;lia precisa para se manter unida e organizada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 hover:border-orange-500/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
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
            <p className="mt-4 text-lg text-white/50">
              O que s&oacute; encontras no VIDA.FAM&Iacute;LIA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uniqueFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.badge} className="bg-white/[0.03] rounded-3xl border border-white/10 p-8 hover:border-orange-500/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
                      {f.badge}
                    </span>
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
          <div className="bg-gradient-to-br from-orange-600 to-orange-500 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold">Pronto para unir a tua fam&iacute;lia?</h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Come&ccedil;a hoje e cria o espa&ccedil;o digital que a tua fam&iacute;lia merece.
              </p>
              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-2 bg-white text-orange-600 font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Come&ccedil;ar Gr&aacute;tis Agora
                <IconArrowRight className="w-5 h-5" />
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
                <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center">
                  <IconHeart className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">VIDA<span className="text-orange-400">.FAM&Iacute;LIA</span></span>
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
