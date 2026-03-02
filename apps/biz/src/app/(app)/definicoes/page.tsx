"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  User,
  Store,
  Bell,
  Shield,
  Palette,
  LogOut,
  ChevronRight,
  Phone,
  MapPin,
  Mail,
  Crown,
  Check,
  Moon,
  Sun,
  Globe,
  HelpCircle,
  MessageCircle,
  FileText,
  Trash2,
} from "lucide-react";

interface BusinessSettings {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  notifications: {
    stockLow: boolean;
    fiadoOverdue: boolean;
    dailySummary: boolean;
    appointments: boolean;
  };
}

const SETTINGS_KEY = "mabiz-settings";

function getSettings(): BusinessSettings {
  if (typeof window === "undefined") return {
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    currency: "MZN",
    notifications: { stockLow: true, fiadoOverdue: true, dailySummary: false, appointments: true },
  };
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) return JSON.parse(stored);
  return {
    businessName: localStorage.getItem("mabiz-business-name") || "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    currency: "MZN",
    notifications: { stockLow: true, fiadoOverdue: true, dailySummary: false, appointments: true },
  };
}

export default function DefinicoesPage() {
  const [settings, setSettings] = useState<BusinessSettings>(getSettings());
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const save = (s: BusinessSettings) => {
    setSettings(s);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    if (s.businessName) localStorage.setItem("mabiz-business-name", s.businessName);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateNotif = (key: keyof BusinessSettings["notifications"], val: boolean) => {
    save({ ...settings, notifications: { ...settings.notifications, [key]: val } });
  };

  const MENU_SECTIONS = [
    {
      id: "negocio",
      label: "Dados do negócio",
      desc: "Nome, endereço, contacto",
      icon: Store,
      color: "bg-blue-500",
    },
    {
      id: "notificacoes",
      label: "Notificações",
      desc: "Alertas e lembretes",
      icon: Bell,
      color: "bg-amber-500",
    },
    {
      id: "plano",
      label: "O meu plano",
      desc: "Grátis, Pro ou Negócio",
      icon: Crown,
      color: "bg-purple-500",
    },
    {
      id: "ajuda",
      label: "Ajuda e suporte",
      desc: "FAQ, contactar suporte",
      icon: HelpCircle,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-gray-600" />
          <h1 className="text-xl font-bold">Definições</h1>
        </div>
      </header>

      <main className="px-4 mt-4 space-y-4">
        {/* Profile card */}
        <div className="card p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">{settings.businessName || "Meu Negócio"}</p>
            <p className="text-2xs text-[var(--color-text-muted)]">
              {settings.email || "Toque para editar perfil"}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>

        {/* Menu sections */}
        {activeSection === null && (
          <div className="space-y-2">
            {MENU_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="w-full card p-4 flex items-center gap-3 text-left"
              >
                <div className={`w-10 h-10 ${section.color} rounded-xl flex items-center justify-center`}>
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{section.label}</p>
                  <p className="text-2xs text-[var(--color-text-muted)]">{section.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}

            {/* Logout */}
            <button className="w-full card p-4 flex items-center gap-3 text-left mt-4">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600">Terminar sessão</p>
                <p className="text-2xs text-[var(--color-text-muted)]">Sair da conta</p>
              </div>
            </button>

            <p className="text-center text-2xs text-gray-300 pt-4">
              maBIZ v1.0.0 • mabiz.co.mz
            </p>
          </div>
        )}

        {/* Business details section */}
        {activeSection === "negocio" && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="text-xs text-blue-500 font-medium"
            >
              &larr; Voltar
            </button>

            <div className="card p-4 space-y-3">
              <p className="text-xs font-bold text-[var(--color-text-muted)]">Dados do negócio</p>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Nome do negócio</label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Nome do proprietário</label>
                <input
                  type="text"
                  value={settings.ownerName}
                  onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="+258 84 000 0000"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="email@exemplo.com"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Endereço</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="Mercado, Banca, Rua..."
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <button
                onClick={() => save(settings)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  saved ? "bg-emerald-500 text-white" : "bg-primary-500 text-white"
                }`}
              >
                {saved ? "Guardado!" : "Guardar alterações"}
              </button>
            </div>
          </div>
        )}

        {/* Notifications section */}
        {activeSection === "notificacoes" && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="text-xs text-blue-500 font-medium"
            >
              &larr; Voltar
            </button>

            <div className="card p-4 space-y-4">
              <p className="text-xs font-bold text-[var(--color-text-muted)]">Notificações</p>
              {[
                { key: "stockLow" as const, label: "Stock em baixo", desc: "Alerta quando produtos ficam abaixo do mínimo" },
                { key: "fiadoOverdue" as const, label: "Fiado vencido", desc: "Lembrete de dívidas por cobrar" },
                { key: "dailySummary" as const, label: "Resumo diário", desc: "Receber resumo do dia às 20h" },
                { key: "appointments" as const, label: "Marcações", desc: "Lembrete de marcações do dia" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-2xs text-[var(--color-text-muted)]">{n.desc}</p>
                  </div>
                  <button
                    onClick={() => updateNotif(n.key, !settings.notifications[n.key])}
                    className={`w-12 h-7 rounded-full transition-colors flex items-center ${
                      settings.notifications[n.key] ? "bg-primary-500 justify-end" : "bg-gray-200 justify-start"
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm mx-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plan section */}
        {activeSection === "plano" && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="text-xs text-blue-500 font-medium"
            >
              &larr; Voltar
            </button>

            <div className="card p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="text-center">
                <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-purple-700">Plano Grátis</p>
                <p className="text-2xs text-purple-500 mt-1">20 transacções/mês</p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { name: "Grátis", price: "0 MZN/mês", features: ["20 transacções", "15 produtos", "10 clientes"], current: true },
                { name: "Pro", price: "499 MZN/mês", features: ["Transacções ilimitadas", "Relatórios PDF", "WhatsApp Bot", "Sem anúncios"], current: false },
                { name: "Negócio", price: "1.499 MZN/mês", features: ["Tudo do Pro", "Multi-loja", "API acesso", "Suporte prioritário"], current: false },
              ].map((plan) => (
                <div key={plan.name} className={`card p-4 ${plan.current ? "border-2 border-purple-400" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold">{plan.name}</p>
                    <p className="text-sm font-bold text-purple-600">{plan.price}</p>
                  </div>
                  <div className="space-y-1">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-2xs text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  {!plan.current && (
                    <button className="w-full mt-3 py-2 bg-purple-500 text-white rounded-lg text-xs font-semibold">
                      Escolher {plan.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help section */}
        {activeSection === "ajuda" && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection(null)}
              className="text-xs text-blue-500 font-medium"
            >
              &larr; Voltar
            </button>

            <div className="space-y-2">
              {[
                { q: "Como registo uma venda?", a: "Carrega no botão + (verde) na barra inferior. Escolhe os produtos, o cliente e o método de pagamento." },
                { q: "Como adiciono um produto ao stock?", a: "Vai a Stock > botão + no canto superior. Preenche o nome, preço de custo, preço de venda e quantidade." },
                { q: "Como funciona o fiado?", a: "Quando registas uma venda com pagamento 'Fiado', a dívida é automaticamente registada. Vai à secção Fiado para gerir cobranças." },
                { q: "Posso usar offline?", a: "Sim! O maBIZ funciona offline. Os dados sincronizam automaticamente quando voltas a ter internet." },
                { q: "Como exporto relatórios?", a: "Vai a Mais > Exportar. Escolhe o tipo de relatório, período, e carrega em 'Descarregar'." },
              ].map((faq, i) => (
                <details key={i} className="card p-4 group">
                  <summary className="text-sm font-medium cursor-pointer list-none flex items-center justify-between">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 text-gray-300 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-xs text-gray-500 mt-2">{faq.a}</p>
                </details>
              ))}
            </div>

            <div className="card p-4 text-center space-y-2">
              <p className="text-xs text-gray-500">Precisa de mais ajuda?</p>
              <a
                href="https://wa.me/258840000000?text=Preciso de ajuda com o maBIZ"
                className="flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com suporte via WhatsApp
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
