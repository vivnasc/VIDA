"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Heart,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Info,
  CreditCard,
  LogOut,
  ChevronRight,
  Camera,
  Edit3,
  Wallet,
  Home,
  HeartPulse,
  Users,
  Smartphone,
  Crown,
  Shield,
} from "lucide-react";

/* ─── Types ─── */

interface SettingsItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  action: "navigate" | "toggle" | "select" | "danger";
  href?: string;
  value?: string;
}

/* ─── App Switcher Data ─── */

const vidaApps = [
  { id: "dinheiro", name: "VIDA.DINHEIRO", icon: Wallet, color: "from-emerald-400 to-emerald-600", description: "Financas familiares" },
  { id: "lar", name: "VIDA.LAR", icon: Home, color: "from-blue-400 to-blue-600", description: "Gestao da casa" },
  { id: "saude", name: "VIDA.SAUDE", icon: HeartPulse, color: "from-rose-400 to-rose-600", description: "Saude da familia" },
];

export default function DefinicoesPage() {
  const [isDark, setIsDark] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="space-y-6">
      {/* ─── User Profile Section ─── */}
      <section className="card">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
              C
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-familia-500 text-white shadow-sm">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-on-surface dark:text-on-surface-dark">
              Carlos Silva
            </h2>
            <p className="text-sm text-muted-foreground">carlos@email.com</p>
            <div className="mt-1 flex items-center gap-1">
              <Crown className="h-3 w-3 text-amber-500" />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Administrador</span>
            </div>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-muted dark:hover:bg-muted-dark">
            <Edit3 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* ─── Familia Settings ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Familia
        </h3>
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-orange">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-on-surface dark:text-on-surface-dark">
                Familia Silva
              </h4>
              <p className="text-xs text-muted-foreground">O coracao da nossa familia digital</p>
            </div>
            <button className="text-xs text-familia-500 font-medium">Editar</button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>7 membros</span>
            <span className="text-muted-foreground/30">|</span>
            <span>Criada em Jan 2024</span>
          </div>
        </div>
      </section>

      {/* ─── App Switcher ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Apps VIDA
        </h3>
        <div className="space-y-2">
          {vidaApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-white p-3 text-left transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${app.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                    {app.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{app.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Notifications ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Preferencias
        </h3>
        <div className="card space-y-1 p-0 overflow-hidden">
          {/* Notifications toggle */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                <Bell className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">Notificacoes</p>
                <p className="text-xs text-muted-foreground">Alertas e lembretes</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                notificationsEnabled ? "bg-familia-500" : "bg-muted-foreground/30"
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                  notificationsEnabled ? "left-[calc(100%-1.625rem)]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div className="border-t border-border/50 dark:border-border-dark/50" />

          {/* Theme toggle */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10">
                {isDark ? <Moon className="h-4 w-4 text-purple-500" /> : <Sun className="h-4 w-4 text-purple-500" />}
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">Tema</p>
                <p className="text-xs text-muted-foreground">{isDark ? "Escuro" : "Claro"}</p>
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                isDark ? "bg-familia-500" : "bg-muted-foreground/30"
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                  isDark ? "left-[calc(100%-1.625rem)]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div className="border-t border-border/50 dark:border-border-dark/50" />

          {/* Language */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10">
                <Globe className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">Idioma</p>
                <p className="text-xs text-muted-foreground">Portugues</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>PT</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Security & Privacy ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Seguranca
        </h3>
        <div className="card space-y-1 p-0 overflow-hidden">
          <button className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/50 dark:hover:bg-muted-dark/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-500/10">
                <Lock className="h-4 w-4 text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">Privacidade e seguranca</p>
                <p className="text-xs text-muted-foreground">Dados, permissoes, encriptacao</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
          </button>

          <div className="border-t border-border/50 dark:border-border-dark/50" />

          <button className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/50 dark:hover:bg-muted-dark/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/10">
                <Shield className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">Gestao de dados</p>
                <p className="text-xs text-muted-foreground">Exportar, importar, eliminar</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
          </button>
        </div>
      </section>

      {/* ─── Subscription ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Subscricao
        </h3>
        <div className="card border-familia-200 dark:border-familia-500/20 bg-gradient-to-br from-familia-50/50 to-amber-50/50 dark:from-familia-500/5 dark:to-amber-500/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-familia-100 dark:bg-familia-500/20">
              <CreditCard className="h-5 w-5 text-familia-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-on-surface dark:text-on-surface-dark">Plano Gratuito</p>
                <span className="rounded-full bg-familia-100 px-2 py-0.5 text-[10px] font-bold text-familia-600 dark:bg-familia-500/20 dark:text-familia-400">
                  FREE
                </span>
              </div>
              <p className="text-xs text-muted-foreground">5 membros, funcionalidades basicas</p>
            </div>
          </div>
          <button className="btn-primary w-full text-sm">
            <Crown className="h-4 w-4" />
            Actualizar para Pro
          </button>
        </div>
      </section>

      {/* ─── About ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Sobre
        </h3>
        <div className="card space-y-1 p-0 overflow-hidden">
          <button className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/50 dark:hover:bg-muted-dark/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-familia-50 dark:bg-familia-500/10">
                <Info className="h-4 w-4 text-familia-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">Sobre o VIDA</p>
                <p className="text-xs text-muted-foreground">A plataforma para familias mocambicanas</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
          </button>

          <div className="border-t border-border/50 dark:border-border-dark/50" />

          <button className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/50 dark:hover:bg-muted-dark/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-500/10">
                <Smartphone className="h-4 w-4 text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface dark:text-on-surface-dark">Versao</p>
                <p className="text-xs text-muted-foreground">VIDA.FAMILIA v1.2.0</p>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* ─── Sign Out ─── */}
      <section className="pb-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-rose-200 bg-rose-50 py-3 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-100 active:scale-[0.98] dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
          <LogOut className="h-4 w-4" />
          Terminar sessao
        </button>
      </section>
    </div>
  );
}
