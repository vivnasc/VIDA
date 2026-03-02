"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Bot,
  Settings,
  Copy,
  Check,
  ExternalLink,
  Zap,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Smartphone,
  Send,
  Sparkles,
  Eye,
} from "lucide-react";

interface ChatbotConfig {
  enabled: boolean;
  businessName: string;
  greeting: string;
  location: string;
  phone: string;
  hours: string;
  showPrices: boolean;
  showStock: boolean;
  takeOrders: boolean;
  autoReply: boolean;
  language: "pt" | "changana" | "both";
  platform: "telegram" | "whatsapp" | "both";
}

const DEFAULT_CONFIG: ChatbotConfig = {
  enabled: false,
  businessName: "",
  greeting: "Olá! Bem-vindo ao nosso negócio. Como posso ajudar?",
  location: "",
  phone: "",
  hours: "08:00 - 18:00, Seg-Sáb",
  showPrices: true,
  showStock: false,
  takeOrders: true,
  autoReply: true,
  language: "pt",
  platform: "telegram",
};

const CHATBOT_KEY = "mabiz-chatbot-config";

function getConfig(): ChatbotConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  const stored = localStorage.getItem(CHATBOT_KEY);
  if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
  return DEFAULT_CONFIG;
}

function saveConfig(config: ChatbotConfig) {
  localStorage.setItem(CHATBOT_KEY, JSON.stringify(config));
}

// Simulate bot responses based on config
function generatePreview(config: ChatbotConfig): { from: "bot" | "user"; text: string }[] {
  const msgs: { from: "bot" | "user"; text: string }[] = [];

  msgs.push({ from: "bot", text: config.greeting || DEFAULT_CONFIG.greeting });
  msgs.push({ from: "user", text: "Que produtos tens?" });

  if (config.showPrices) {
    msgs.push({
      from: "bot",
      text: `Aqui estão alguns dos nossos produtos:\n\n• Arroz (kg) — 80 MZN\n• Feijão (kg) — 120 MZN\n• Óleo (litro) — 150 MZN\n• Açúcar (kg) — 70 MZN\n\nQueres encomendar algum?`,
    });
  } else {
    msgs.push({
      from: "bot",
      text: "Temos vários produtos disponíveis! Para saber preços e disponibilidade, visita-nos ou liga para " + (config.phone || "+258 84 000 0000"),
    });
  }

  if (config.takeOrders) {
    msgs.push({ from: "user", text: "Quero 2kg de arroz e 1 litro de óleo" });
    msgs.push({
      from: "bot",
      text: `Encomenda registada!\n\n• 2kg Arroz — 160 MZN\n• 1L Óleo — 150 MZN\n\nTotal: 310 MZN\n\nPodes levantar em ${config.location || "nossa loja"} ou combinamos entrega. Obrigado!`,
    });
  }

  msgs.push({ from: "user", text: "Que horas abrem?" });
  msgs.push({
    from: "bot",
    text: `Horário: ${config.hours || "08:00 - 18:00, Seg-Sáb"}\n${config.location ? `Localização: ${config.location}` : ""}`,
  });

  return msgs;
}

export default function ChatbotPage() {
  const [config, setConfig] = useState<ChatbotConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<"config" | "preview" | "deploy">("config");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const updateConfig = (partial: Partial<ChatbotConfig>) => {
    const updated = { ...config, ...partial };
    setConfig(updated);
    saveConfig(updated);
  };

  const handleCopyBotScript = () => {
    const script = `# Chatbot maBIZ — ${config.businessName}
# Plataforma: ${config.platform === "telegram" ? "Telegram Bot" : config.platform === "whatsapp" ? "WhatsApp Business" : "Ambos"}
# Gerado em: ${new Date().toLocaleDateString("pt-MZ")}

SAUDAÇÃO: ${config.greeting}
HORÁRIO: ${config.hours}
LOCAL: ${config.location}
TELEFONE: ${config.phone}
MOSTRAR_PREÇOS: ${config.showPrices ? "SIM" : "NÃO"}
ACEITAR_ENCOMENDAS: ${config.takeOrders ? "SIM" : "NÃO"}
IDIOMA: ${config.language === "pt" ? "Português" : config.language === "changana" ? "Changana" : "Português + Changana"}`;

    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSave = () => {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const preview = generatePreview(config);

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Chatbot</h1>
            <p className="text-blue-100 text-sm">
              Atende os teus clientes automaticamente
            </p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 -mt-3">
        <div className="bg-[var(--color-surface)] rounded-xl shadow-sm border border-[var(--color-border)] p-1 flex gap-1">
          {[
            { key: "config" as const, label: "Configurar", icon: Settings },
            { key: "preview" as const, label: "Pré-visualizar", icon: Eye },
            { key: "deploy" as const, label: "Activar", icon: Zap },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : "text-gray-500"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-4 mt-4 space-y-4">
        {/* ─── CONFIG TAB ─── */}
        {activeTab === "config" && (
          <div className="space-y-4">
            {/* Enable toggle */}
            <div className="card p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Chatbot activo</p>
                <p className="text-2xs text-[var(--color-text-muted)]">
                  Quando activado, responde automaticamente
                </p>
              </div>
              <button onClick={() => updateConfig({ enabled: !config.enabled })}>
                {config.enabled ? (
                  <ToggleRight className="w-10 h-10 text-blue-500" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-gray-300" />
                )}
              </button>
            </div>

            {/* Business info */}
            <div className="card p-4 space-y-3">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Informações do negócio</p>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Nome do negócio</label>
                <input
                  type="text"
                  value={config.businessName}
                  onChange={(e) => updateConfig({ businessName: e.target.value })}
                  placeholder="Ex: Mercearia da Maria"
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={config.location}
                    onChange={(e) => updateConfig({ location: e.target.value })}
                    placeholder="Ex: Mercado Xipamanine, Banca 23"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="tel"
                    value={config.phone}
                    onChange={(e) => updateConfig({ phone: e.target.value })}
                    placeholder="+258 84 000 0000"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-2xs text-gray-500 mb-1 block">Horário</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={config.hours}
                    onChange={(e) => updateConfig({ hours: e.target.value })}
                    placeholder="08:00 - 18:00, Seg-Sáb"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Greeting */}
            <div className="card p-4 space-y-2">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Mensagem de boas-vindas</p>
              <textarea
                value={config.greeting}
                onChange={(e) => updateConfig({ greeting: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Olá! Bem-vindo ao nosso negócio..."
              />
            </div>

            {/* Features toggles */}
            <div className="card p-4 space-y-3">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Funcionalidades do bot</p>
              {[
                { key: "showPrices" as const, label: "Mostrar preços", desc: "Clientes podem ver preços dos produtos", icon: ShoppingBag },
                { key: "takeOrders" as const, label: "Aceitar encomendas", desc: "Clientes podem fazer pedidos via chat", icon: Send },
                { key: "showStock" as const, label: "Mostrar disponibilidade", desc: "Indica se produto está em stock", icon: Sparkles },
                { key: "autoReply" as const, label: "Resposta automática", desc: "Responde sem intervenção manual", icon: Zap },
              ].map((feat) => (
                <div key={feat.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <feat.icon className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{feat.label}</p>
                      <p className="text-2xs text-[var(--color-text-muted)]">{feat.desc}</p>
                    </div>
                  </div>
                  <button onClick={() => updateConfig({ [feat.key]: !config[feat.key] })}>
                    {config[feat.key] ? (
                      <ToggleRight className="w-8 h-8 text-blue-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Platform */}
            <div className="card p-4 space-y-2">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Plataforma</p>
              <div className="flex gap-2">
                {[
                  { key: "telegram" as const, label: "Telegram", icon: Send },
                  { key: "whatsapp" as const, label: "WhatsApp", icon: MessageCircle },
                  { key: "both" as const, label: "Ambos", icon: Smartphone },
                ].map((p) => (
                  <button
                    key={p.key}
                    onClick={() => updateConfig({ platform: p.key })}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                      config.platform === p.key
                        ? "border-blue-500 bg-blue-50"
                        : "border-[var(--color-border)]"
                    }`}
                  >
                    <p.icon className={`w-5 h-5 ${config.platform === p.key ? "text-blue-500" : "text-gray-400"}`} />
                    <span className={`text-xs font-medium ${config.platform === p.key ? "text-blue-700" : "text-gray-500"}`}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                saved ? "bg-emerald-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {saved ? "Configuração guardada!" : "Guardar configuração"}
            </button>
          </div>
        )}

        {/* ─── PREVIEW TAB ─── */}
        {activeTab === "preview" && (
          <div className="space-y-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              Pré-visualização de como os teus clientes vão interagir com o bot
            </p>

            {/* Chat preview */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              {/* Chat header */}
              <div className="bg-blue-500 text-white px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{config.businessName || "Meu Negócio"}</p>
                  <p className="text-2xs text-blue-100">Online — responde em segundos</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                {preview.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                        msg.from === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-4 bg-amber-50 border-amber-100">
              <p className="text-xs text-amber-700">
                Esta é uma pré-visualização. O bot real usará os produtos e preços do teu maBIZ.
              </p>
            </div>
          </div>
        )}

        {/* ─── DEPLOY TAB ─── */}
        {activeTab === "deploy" && (
          <div className="space-y-4">
            {/* Telegram instructions */}
            <div className="card p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-500" />
                <p className="text-sm font-bold">Telegram Bot</p>
                <span className="text-2xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                  Grátis
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { n: "1", text: "Abre o Telegram e procura @BotFather" },
                  { n: "2", text: "Envia /newbot e segue as instruções" },
                  { n: "3", text: "Copia o token que o BotFather te dá" },
                  { n: "4", text: "Cola o token aqui em baixo para ligar ao maBIZ" },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-2xs font-bold text-blue-700">{step.n}</span>
                    </div>
                    <p className="text-sm text-gray-700">{step.text}</p>
                  </div>
                ))}
              </div>

              <input
                type="text"
                placeholder="Cole o token do BotFather aqui"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="w-full py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold">
                Ligar bot ao maBIZ
              </button>
            </div>

            {/* WhatsApp instructions */}
            <div className="card p-4 space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <p className="text-sm font-bold">WhatsApp Business</p>
                <span className="text-2xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium">
                  Pro
                </span>
              </div>

              <p className="text-xs text-gray-500">
                A integração com WhatsApp Business API requer o plano Pro.
                Com WhatsApp, os teus clientes podem encomendar directamente
                pela app que já usam todos os dias.
              </p>

              <div className="space-y-2">
                {[
                  "Respostas automáticas 24/7",
                  "Catálogo de produtos no chat",
                  "Encomendas com confirmação automática",
                  "Lembretes de fiado via WhatsApp",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-600">{feat}</span>
                  </div>
                ))}
              </div>

              <a
                href="#upgrade"
                className="block w-full text-center py-2.5 rounded-xl bg-green-500 text-white text-sm font-semibold"
              >
                Activar WhatsApp (Pro)
              </a>
            </div>

            {/* Export config */}
            <div className="card p-4 space-y-2">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Exportar configuração</p>
              <p className="text-2xs text-gray-500">
                Copia a configuração do teu chatbot para usar com ferramentas externas
              </p>
              <button
                onClick={handleCopyBotScript}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                  copied ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar configuração"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
