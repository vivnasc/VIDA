import { createServerClient } from "@vida/auth/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VIDA.SAUDE - Tua familia, sempre saudavel",
  description:
    "Historico medico familiar, lembretes de consultas e vacinas, acompanhamento de medicamentos e metricas de saude. Comeca gratis.",
};

/* ── Inline SVG Icons ── */

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
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

function IconStethoscope({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" />
    </svg>
  );
}

function IconPill({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function IconSyringe({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 2 4 4" /><path d="m17 7 3-3" /><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" /><path d="m9 11 4 4" /><path d="m5 19-3 3" /><path d="m14 4 6 6" />
    </svg>
  );
}

function IconHeart({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function IconCalendar({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
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

function IconBarChart({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function IconShieldAlert({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 8v4" /><path d="M12 16h.01" />
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

function IconShieldCheck({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" />
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

/* ── Data ── */

const stats = [
  { value: "60%", label: "dos mo\u00E7ambicanos sem hist\u00F3rico m\u00E9dico" },
  { value: "3x", label: "melhor acompanhamento de sa\u00FAde" },
  { value: "100%", label: "da fam\u00EDlia coberta" },
  { value: "0 MT", label: "para come\u00E7ar" },
];

const problems = [
  "Hist\u00F3rico m\u00E9dico em pap\u00E9is que se perdem",
  "Consultas esquecidas e vacinas atrasadas",
  "Medica\u00E7\u00E3o tomada no hor\u00E1rio errado ou esquecida",
  "Informa\u00E7\u00E3o de emerg\u00EAncia inacess\u00EDvel quando mais se precisa",
  "Sa\u00FAde dos filhos sem acompanhamento organizado",
];

const solutions = [
  "Hist\u00F3rico m\u00E9dico digital de toda a fam\u00EDlia",
  "Lembretes autom\u00E1ticos de consultas e vacinas",
  "Alertas de medica\u00E7\u00E3o com hor\u00E1rios e doses certas",
  "Perfil de emerg\u00EAncia acess\u00EDvel com um toque",
  "Caderneta de sa\u00FAde individual para cada membro",
];

const steps = [
  { number: "01", title: "Cria os perfis de sa\u00FAde", description: "Adiciona cada membro da fam\u00EDlia com tipo sangu\u00EDneo, alergias, condi\u00E7\u00F5es e contactos de emerg\u00EAncia." },
  { number: "02", title: "Regista e agenda", description: "Adiciona consultas, vacinas e medica\u00E7\u00F5es. O VIDA.SA\u00DADE lembra-te de tudo automaticamente." },
  { number: "03", title: "Acompanha a evolu\u00E7\u00E3o", description: "V\u00EA m\u00E9tricas de sa\u00FAde, hist\u00F3rico de consultas e tend\u00EAncias. A sa\u00FAde da tua fam\u00EDlia, sempre vis\u00EDvel." },
];

const platformFeatures = [
  { icon: IconUsers, title: "Perfis familiares", description: "Um perfil de sa\u00FAde completo para cada membro: alergias, tipo sangu\u00EDneo, condi\u00E7\u00F5es cr\u00F3nicas e mais." },
  { icon: IconStethoscope, title: "Hist\u00F3rico de consultas", description: "Regista consultas, diagn\u00F3sticos e tratamentos. Toda a informa\u00E7\u00E3o pronta para a pr\u00F3xima visita ao m\u00E9dico." },
  { icon: IconPill, title: "Controlo de medica\u00E7\u00E3o", description: "Hor\u00E1rios, doses e stock de cada medicamento. Alertas quando a medica\u00E7\u00E3o est\u00E1 a acabar." },
  { icon: IconSyringe, title: "Caderneta de vacinas", description: "Registo digital de todas as vacinas. Lembretes autom\u00E1ticos para refor\u00E7os e novas doses." },
  { icon: IconBarChart, title: "M\u00E9tricas de sa\u00FAde", description: "Acompanha peso, tens\u00E3o, glicemia e outras m\u00E9tricas. Gr\u00E1ficos que mostram a evolu\u00E7\u00E3o." },
  { icon: IconShieldAlert, title: "Perfil de emerg\u00EAncia", description: "Informa\u00E7\u00E3o cr\u00EDtica acess\u00EDvel rapidamente: alergias, tipo sangu\u00EDneo, contactos e condi\u00E7\u00F5es." },
  { icon: IconCalendar, title: "Agenda m\u00E9dica", description: "Calend\u00E1rio com todas as consultas, exames e procedimentos da fam\u00EDlia." },
  { icon: IconFileText, title: "Documentos m\u00E9dicos", description: "Guarda resultados de exames, receitas e relat\u00F3rios m\u00E9dicos num arquivo digital seguro." },
  { icon: IconBell, title: "Lembretes inteligentes", description: "Notifica\u00E7\u00F5es para medica\u00E7\u00E3o, consultas, vacinas e check-ups peri\u00F3dicos." },
  { icon: IconHeart, title: "Bem-estar familiar", description: "Dicas de sa\u00FAde e preven\u00E7\u00E3o adaptadas ao perfil de cada membro da fam\u00EDlia." },
];

const uniqueFeatures = [
  { badge: "FAMILIAR", title: "Sa\u00FAde de todos, num s\u00F3 lugar", description: "N\u00E3o \u00E9 s\u00F3 para ti \u2014 \u00E9 para toda a fam\u00EDlia. Do beb\u00E9 ao av\u00F4, cada membro tem o seu perfil completo com hist\u00F3rico, vacinas e medica\u00E7\u00E3o.", icon: IconUsers },
  { badge: "URGENTE", title: "Emerg\u00EAncia ao toque", description: "Em caso de emerg\u00EAncia, toda a informa\u00E7\u00E3o cr\u00EDtica est\u00E1 acess\u00EDvel num toque: alergias, tipo sangu\u00EDneo, medica\u00E7\u00E3o actual e contactos.", icon: IconZap },
  { badge: "PREVENTIVO", title: "Preven\u00E7\u00E3o que salva vidas", description: "Lembretes de vacinas, check-ups e rastreios. A melhor medicina \u00E9 a preven\u00E7\u00E3o \u2014 e o VIDA.SA\u00DADE garante que nunca falhas.", icon: IconShieldCheck },
];

/* ── Page ── */

export default async function SaudeLanding() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/painel");

  return (
    <div className="min-h-screen bg-[#0F0A0A]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0F0A0A]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center"><IconActivity className="w-4 h-4 text-white" /></div>
            <span className="text-xl font-bold text-white">VIDA<span className="text-rose-400">.SA&Uacute;DE</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm text-white/60 hover:text-white transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="text-sm text-white/60 hover:text-white transition-colors">Como Funciona</a>
          </div>
          <Link href="/login" className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">Come&ccedil;ar</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-rose-500/10 rounded-full px-4 py-2 mb-8 border border-rose-500/20">
              <IconActivity className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-300">Parte do ecossistema VIDA</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Tua fam&iacute;lia,<br /><span className="text-rose-400">sempre saud&aacute;vel.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Hist&oacute;rico m&eacute;dico, medicamentos, consultas e vacinas &mdash; a sa&uacute;de de toda a fam&iacute;lia organizada, acess&iacute;vel e segura.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all">
                Come&ccedil;ar Gr&aacute;tis <IconArrowRight className="w-5 h-5" />
              </Link>
              <a href="#funcionalidades" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-lg px-8 py-4 rounded-2xl border border-white/10 transition-colors">Ver Funcionalidades</a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-rose-400" /><span>Sem cart&atilde;o de cr&eacute;dito</span></div>
              <div className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-rose-400" /><span>Toda a fam&iacute;lia coberta</span></div>
              <div className="flex items-center gap-1.5"><IconCheck className="w-4 h-4 text-rose-400" /><span>Emerg&ecirc;ncia ao toque</span></div>
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
                <div className="text-3xl sm:text-4xl font-extrabold text-rose-400">{s.value}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white">A sa&uacute;de da tua fam&iacute;lia merece mais.<br /><span className="text-white/50">Mais organiza&ccedil;&atilde;o. Mais controlo. Mais paz.</span></h2>
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
            <div className="bg-white/[0.03] rounded-3xl border border-rose-500/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center"><IconCheck className="w-5 h-5 text-rose-400" /></div>
                <h3 className="text-lg font-bold text-rose-400">O que FUNCIONA com VIDA.SA&Uacute;DE</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0"><IconCheck className="w-3 h-3 text-rose-400" /></div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white">As 3 fases do cuidado familiar</h2>
            <p className="mt-4 text-lg text-white/50">De desorganizado a protegido em minutos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent -translate-x-8" />}
                <div className="bg-white/[0.03] rounded-3xl border border-white/10 p-8 h-full">
                  <div className="text-5xl font-extrabold text-rose-400/30 mb-4">{step.number}</div>
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
            <p className="mt-4 text-lg text-white/50">Tudo o que precisas para cuidar da sa&uacute;de da tua fam&iacute;lia, numa s&oacute; app.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 hover:border-rose-500/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-rose-400" /></div>
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
            <p className="mt-4 text-lg text-white/50">O que s&oacute; encontras no VIDA.SA&Uacute;DE.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {uniqueFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.badge} className="bg-white/[0.03] rounded-3xl border border-white/10 p-8 hover:border-rose-500/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center"><Icon className="w-6 h-6 text-rose-400" /></div>
                    <span className="text-[10px] font-bold tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full">{f.badge}</span>
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
          <div className="bg-gradient-to-br from-rose-600 to-rose-500 rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold">Pronto para cuidar da tua fam&iacute;lia?</h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">Come&ccedil;a hoje e tenha a sa&uacute;de de toda a fam&iacute;lia organizada e segura.</p>
              <Link href="/login" className="mt-8 inline-flex items-center gap-2 bg-white text-rose-600 font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
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
                <div className="w-7 h-7 rounded-lg bg-rose-500 flex items-center justify-center"><IconActivity className="w-3.5 h-3.5 text-white" /></div>
                <span className="text-lg font-bold text-white">VIDA<span className="text-rose-400">.SA&Uacute;DE</span></span>
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
