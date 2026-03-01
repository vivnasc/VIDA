"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PwaPrompts } from "./pwa-prompts";

interface AppShellProps {
  children: ReactNode;
}

/**
 * App shell that handles:
 * - Onboarding redirect for new users
 * - PWA install/update prompts
 * - Splash screen on first load
 */
export function AppShell({ children }: AppShellProps) {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Brief splash for PWA feel (only on initial load)
    const hasLoaded = sessionStorage.getItem("mabiz-loaded");
    if (hasLoaded) {
      setShowSplash(false);
      setIsReady(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      setIsReady(true);
      sessionStorage.setItem("mabiz-loaded", "1");
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#1A5C35] to-[#14472A] flex items-center justify-center z-[100]">
        <div className="text-center animate-in">
          {/* Isometric M/B cube mark */}
          <svg width="72" height="72" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
            <path d="M4 16 L24 6 L24 38 L4 28Z" fill="#C5975B" />
            <path d="M4 16 L24 6 L24 38 L4 28Z" fill="black" opacity="0.05" />
            <path d="M24 6 L44 16 L44 28 L24 38Z" fill="#14472A" />
            <path d="M4 16 L14 11 L24 16 L14 21Z" fill="#1A5C35" />
            <path d="M24 16 L34 11 L44 16 L34 21Z" fill="#1A5C35" opacity="0.85" />
            <path d="M14 21 L24 16 L34 21 L24 26Z" fill="#1A5C35" opacity="0.7" />
            <path d="M4 16 L14 11 L14 21 L4 26Z" fill="#C5975B" opacity="0.8" />
            <path d="M44 16 L34 11 L34 21 L44 26Z" fill="#14472A" opacity="0.8" />
          </svg>
          <div className="text-3xl font-black tracking-tight mb-1">
            <span className="text-[#C5975B]">ma</span>
            <span className="text-white">BIZ</span>
          </div>
          <p className="text-emerald-200 text-sm">Teu negócio, organizado</p>
          <div className="mt-6 w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <>
      <PwaPrompts />
      {children}
    </>
  );
}
