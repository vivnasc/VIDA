"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  Gift,
  Users,
  Copy,
  Check,
  ChevronRight,
  MessageCircle,
  Send,
  Award,
  Zap,
} from "lucide-react";
import {
  getReferralData,
  recordShare,
  getWhatsAppShareUrl,
  getSmsShareUrl,
  getRewardTier,
  type ReferralData,
} from "@/lib/referral";

interface ReferralCardProps {
  businessName?: string;
  compact?: boolean;
}

export function ReferralCard({ businessName, compact = false }: ReferralCardProps) {
  const [data, setData] = useState<ReferralData | null>(null);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    setData(getReferralData());
  }, []);

  if (!data) return null;

  const tier = getRewardTier(data.activatedCount);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(data.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = data.code;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (method: "whatsapp" | "sms" | "native") => {
    const updated = recordShare();
    setData(updated);

    if (method === "whatsapp") {
      window.open(getWhatsAppShareUrl(data.code, businessName), "_blank");
    } else if (method === "sms") {
      window.location.href = getSmsShareUrl(data.code, businessName);
    } else if (method === "native" && navigator.share) {
      navigator.share({
        title: "maBIZ - Teu negócio, organizado",
        text: `Experimenta o maBIZ para organizar o teu negócio! Usa o meu código: ${data.code}`,
        url: `https://mabiz.co.mz/?ref=${data.code}`,
      }).catch(() => {});
    }
    setShowShareOptions(false);
  };

  // Compact version for dashboard
  if (compact) {
    return (
      <div className="card p-4 bg-gradient-to-r from-primary-50 to-emerald-50 border-primary-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-primary-800">
              Convida amigos, ganha 7 dias grátis
            </p>
            <p className="text-xs text-primary-600">
              Código: <span className="font-mono font-bold">{data.code}</span>
            </p>
          </div>
          <button
            onClick={() => setShowShareOptions(true)}
            className="flex-shrink-0 w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center"
          >
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Quick share overlay */}
        {showShareOptions && (
          <div className="mt-3 pt-3 border-t border-primary-200 flex gap-2">
            <button
              onClick={() => handleShare("whatsapp")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-green-500 text-white text-xs font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            <button
              onClick={() => handleShare("sms")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium"
            >
              <Send className="w-3.5 h-3.5" />
              SMS
            </button>
            <button
              onClick={handleCopyCode}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-200 text-gray-700 text-xs font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full version for dedicated page
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="card p-6 bg-gradient-to-br from-primary-500 to-emerald-600 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-1">Convida e ganha!</h2>
        <p className="text-emerald-100 text-sm">
          Por cada amigo que activar o maBIZ, ganhas 7 dias grátis no plano Pro
        </p>
      </div>

      {/* Referral Code */}
      <div className="card p-4">
        <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">
          O teu código de convite
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 font-mono text-2xl font-bold tracking-widest text-center">
            {data.code}
          </div>
          <button
            onClick={handleCopyCode}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              copied ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="card p-4 space-y-2">
        <p className="text-xs font-medium text-[var(--color-text-muted)] mb-1">
          Partilhar via
        </p>
        <button
          onClick={() => handleShare("whatsapp")}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
        >
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-green-800">WhatsApp</p>
            <p className="text-xs text-green-600">Partilha com os teus contactos</p>
          </div>
          <ChevronRight className="w-4 h-4 text-green-400" />
        </button>

        <button
          onClick={() => handleShare("sms")}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-blue-800">SMS</p>
            <p className="text-xs text-blue-600">Envia por mensagem</p>
          </div>
          <ChevronRight className="w-4 h-4 text-blue-400" />
        </button>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={() => handleShare("native")}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-800">Outras opções</p>
              <p className="text-xs text-gray-600">Facebook, Telegram, etc.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Award className={`w-4 h-4 ${tier.color}`} />
          <p className="text-sm font-semibold">As tuas estatísticas</p>
          <span className={`text-2xs px-2 py-0.5 rounded-full font-medium ${tier.color} bg-opacity-10`}>
            {tier.label}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center bg-gray-50 rounded-xl p-3">
            <Share2 className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{data.sharedCount}</p>
            <p className="text-2xs text-[var(--color-text-muted)]">Partilhas</p>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-3">
            <Users className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{data.activatedCount}</p>
            <p className="text-2xs text-[var(--color-text-muted)]">Activações</p>
          </div>
          <div className="text-center bg-gray-50 rounded-xl p-3">
            <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{data.rewardDays}</p>
            <p className="text-2xs text-[var(--color-text-muted)]">Dias ganhos</p>
          </div>
        </div>

        {tier.nextTier > 0 && (
          <p className="text-2xs text-[var(--color-text-muted)] text-center mt-2">
            Faltam {tier.nextTier - data.activatedCount} activações para {
              tier.tier === "starter" ? "Bronze" : tier.tier === "bronze" ? "Prata" : "Ouro"
            }
          </p>
        )}
      </div>

      {/* How it works */}
      <div className="card p-4">
        <p className="text-sm font-semibold mb-3">Como funciona?</p>
        <div className="space-y-3">
          {[
            { n: "1", text: "Partilha o teu código com amigos empreendedores" },
            { n: "2", text: "O teu amigo regista-se e usa o teu código" },
            { n: "3", text: "Ambos ganham 7 dias grátis no plano Pro!" },
          ].map((step) => (
            <div key={step.n} className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary-700">{step.n}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
