"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink, Star, ArrowRight } from "lucide-react";
import { shouldShowAds } from "@/lib/freemium";

interface AdBannerProps {
  placement?: "dashboard" | "page" | "modal";
}

/**
 * AdMob-style banner for free plan users.
 * In production, replace mock content with Google AdMob SDK.
 * For now shows internal promotion / upgrade CTA.
 */
export function AdBanner({ placement = "page" }: AdBannerProps) {
  const [showAd, setShowAd] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setShowAd(shouldShowAds());
  }, []);

  if (!showAd || dismissed) return null;

  // Internal promo ads — in production, replace with real AdMob
  const ads = [
    {
      text: "maBIZ Pro — Vendas ilimitadas, relatórios avançados",
      cta: "Experimentar",
      color: "from-primary-500 to-emerald-600",
      href: "#upgrade",
    },
    {
      text: "Educação financeira grátis no maBIZ",
      cta: "Aprender",
      color: "from-amber-500 to-orange-500",
      href: "/educacao",
    },
    {
      text: "Controla as tuas dívidas — nunca mais perdes dinheiro",
      cta: "Ver como",
      color: "from-violet-500 to-purple-600",
      href: "/fiado",
    },
  ];

  const ad = ads[Math.floor(Date.now() / 30000) % ads.length]!;

  if (placement === "dashboard") {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gray-200">
        <div className={`bg-gradient-to-r ${ad.color} p-3 flex items-center gap-3`}>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/70 mb-0.5">Publicidade</p>
            <p className="text-sm font-medium text-white truncate">{ad.text}</p>
          </div>
          <a
            href={ad.href}
            className="flex-shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg"
          >
            {ad.cta}
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3 text-white/70" />
          </button>
        </div>
      </div>
    );
  }

  // Standard banner (bottom of pages)
  return (
    <div className="fixed bottom-20 left-2 right-2 z-30 max-w-lg mx-auto animate-in">
      <div className={`bg-gradient-to-r ${ad.color} rounded-xl p-3 shadow-lg flex items-center gap-3`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-2xs text-white/50">AD</span>
          </div>
          <p className="text-sm font-medium text-white truncate">{ad.text}</p>
        </div>
        <a
          href={ad.href}
          className="flex-shrink-0 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
        >
          {ad.cta}
          <ArrowRight className="w-3 h-3" />
        </a>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center"
        >
          <X className="w-3 h-3 text-white/70" />
        </button>
      </div>
    </div>
  );
}

/**
 * Upgrade CTA that replaces ads for free users hitting limits.
 */
export function UpgradeBanner({ onClose }: { onClose?: () => void }) {
  return (
    <div className="card p-4 bg-gradient-to-r from-primary-50 to-emerald-50 border-primary-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Star className="w-5 h-5 text-primary-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-primary-800">
            Passa para o plano Pro
          </p>
          <p className="text-xs text-primary-600 mt-0.5">
            Vendas ilimitadas, relatórios avançados, sem publicidade.
            Apenas 499 MZN/mês.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <a
              href="#upgrade"
              className="text-xs font-bold text-white bg-primary-500 px-3 py-1.5 rounded-lg"
            >
              Activar Pro
            </a>
            {onClose && (
              <button
                onClick={onClose}
                className="text-xs text-primary-600 font-medium"
              >
                Agora não
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
