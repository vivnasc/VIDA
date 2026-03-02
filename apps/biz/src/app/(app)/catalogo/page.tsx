"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  MessageCircle,
  Eye,
  EyeOff,
  Palette,
  ShoppingBag,
  MapPin,
  Phone,
  Clock,
  Star,
  Edit3,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface CatalogConfig {
  enabled: boolean;
  showPrices: boolean;
  showStock: boolean;
  showLocation: boolean;
  showPhone: boolean;
  showHours: boolean;
  accentColor: string;
  coverMessage: string;
}

const CATALOG_KEY = "mabiz-catalog-config";
const COLORS = ["#1A5C35", "#2563eb", "#7c3aed", "#dc2626", "#d97706", "#0d9488"];

function getConfig(): CatalogConfig {
  if (typeof window === "undefined") return { enabled: true, showPrices: true, showStock: false, showLocation: true, showPhone: true, showHours: true, accentColor: "#1A5C35", coverMessage: "Veja os nossos produtos e serviços!" };
  const stored = localStorage.getItem(CATALOG_KEY);
  if (stored) return JSON.parse(stored);
  return { enabled: true, showPrices: true, showStock: false, showLocation: true, showPhone: true, showHours: true, accentColor: "#1A5C35", coverMessage: "Veja os nossos produtos e serviços!" };
}

// Mock products for preview
const MOCK_PRODUCTS = [
  { name: "Arroz (kg)", price: 80, stock: 45, category: "Secos" },
  { name: "Feijão (kg)", price: 120, stock: 30, category: "Secos" },
  { name: "Óleo (litro)", price: 150, stock: 12, category: "Secos" },
  { name: "Açúcar (kg)", price: 70, stock: 38, category: "Secos" },
  { name: "Coca-Cola", price: 30, stock: 60, category: "Bebidas" },
  { name: "Água 1.5L", price: 30, stock: 48, category: "Bebidas" },
  { name: "Pão", price: 10, stock: 100, category: "Frescos" },
  { name: "Ovos (dúzia)", price: 120, stock: 15, category: "Frescos" },
];

export default function CatalogoPage() {
  const [config, setConfig] = useState<CatalogConfig>(getConfig());
  const [activeTab, setActiveTab] = useState<"config" | "preview">("config");
  const [copied, setCopied] = useState(false);

  const updateConfig = (partial: Partial<CatalogConfig>) => {
    const updated = { ...config, ...partial };
    setConfig(updated);
    localStorage.setItem(CATALOG_KEY, JSON.stringify(updated));
  };

  const catalogUrl = typeof window !== "undefined"
    ? `${window.location.origin}/c/${localStorage.getItem("mabiz-business-id") || "demo"}`
    : "https://mabiz.co.mz/c/demo";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(catalogUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareWhatsApp = () => {
    const text = `${config.coverMessage}\n\nVê o nosso catálogo: ${catalogUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const categories = [...new Set(MOCK_PRODUCTS.map((p) => p.category))];

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-br from-amber-500 to-orange-500 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Catálogo Digital</h1>
            <p className="text-amber-100 text-sm">
              Partilha os teus produtos com clientes
            </p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 -mt-3">
        <div className="bg-[var(--color-surface)] rounded-xl shadow-sm border border-[var(--color-border)] p-1 flex gap-1">
          <button
            onClick={() => setActiveTab("config")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === "config" ? "bg-amber-500 text-white" : "text-gray-500"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Configurar
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === "preview" ? "bg-amber-500 text-white" : "text-gray-500"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Pré-visualizar
          </button>
        </div>
      </div>

      <main className="px-4 mt-4 space-y-4">
        {/* ─── CONFIG ─── */}
        {activeTab === "config" && (
          <div className="space-y-4">
            {/* Share link */}
            <div className="card p-4 space-y-3">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Link do catálogo</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600 truncate font-mono">
                  {catalogUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`px-3 rounded-lg transition-colors ${
                    copied ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-500 text-white text-xs font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Partilhar no WhatsApp
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Copiar link
                </button>
              </div>
            </div>

            {/* Cover message */}
            <div className="card p-4 space-y-2">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Mensagem de capa</p>
              <textarea
                value={config.coverMessage}
                onChange={(e) => updateConfig({ coverMessage: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                placeholder="Mensagem que aparece no topo do catálogo"
              />
            </div>

            {/* Display options */}
            <div className="card p-4 space-y-3">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">O que mostrar</p>
              {[
                { key: "showPrices" as const, label: "Preços", icon: ShoppingBag },
                { key: "showStock" as const, label: "Disponibilidade", icon: Eye },
                { key: "showLocation" as const, label: "Localização", icon: MapPin },
                { key: "showPhone" as const, label: "Telefone", icon: Phone },
                { key: "showHours" as const, label: "Horário", icon: Clock },
              ].map((opt) => (
                <div key={opt.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <opt.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{opt.label}</span>
                  </div>
                  <button onClick={() => updateConfig({ [opt.key]: !config[opt.key] })}>
                    {config[opt.key] ? (
                      <ToggleRight className="w-8 h-8 text-amber-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-gray-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Color picker */}
            <div className="card p-4 space-y-2">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">Cor do catálogo</p>
              <div className="flex gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateConfig({ accentColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      config.accentColor === color ? "border-gray-800 scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {config.accentColor === color && (
                      <Check className="w-4 h-4 text-white mx-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── PREVIEW ─── */}
        {activeTab === "preview" && (
          <div className="space-y-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              Pré-visualização do catálogo que os teus clientes vão ver
            </p>

            <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-lg">
              {/* Catalog header */}
              <div className="p-5 text-white text-center" style={{ backgroundColor: config.accentColor }}>
                <h2 className="text-lg font-bold">
                  {localStorage.getItem("mabiz-business-name") || "Meu Negócio"}
                </h2>
                <p className="text-sm opacity-80 mt-1">{config.coverMessage}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs opacity-70">
                  {config.showHours && (
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 08:00-18:00</span>
                  )}
                  {config.showLocation && (
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Maputo</span>
                  )}
                </div>
              </div>

              {/* Products */}
              <div className="bg-white p-4 space-y-4">
                {categories.map((cat) => (
                  <div key={cat}>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{cat}</p>
                    <div className="space-y-2">
                      {MOCK_PRODUCTS.filter((p) => p.category === cat).map((product) => (
                        <div key={product.name} className="flex items-center justify-between py-2 border-b border-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{product.name}</p>
                            {config.showStock && (
                              <p className="text-2xs text-gray-400">
                                {product.stock > 10 ? "Em stock" : product.stock > 0 ? `Últimas ${product.stock} unidades` : "Esgotado"}
                              </p>
                            )}
                          </div>
                          {config.showPrices && (
                            <span className="text-sm font-bold" style={{ color: config.accentColor }}>
                              {product.price} MZN
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {config.showPhone && (
                  <div className="pt-3 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">Para encomendar:</p>
                    <p className="text-sm font-semibold" style={{ color: config.accentColor }}>
                      +258 84 000 0000
                    </p>
                  </div>
                )}

                <p className="text-2xs text-gray-300 text-center pt-2">
                  Catálogo por maBIZ
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
