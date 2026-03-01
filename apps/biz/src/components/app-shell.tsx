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
          <div className="text-4xl font-black tracking-tight mb-2">
            <span className="text-[#C5975B]">ma</span>
            <span className="text-white">BIZ</span>
          </div>
          <svg width="100" height="8" viewBox="0 0 60 6" className="mx-auto mb-1">
            <path d="M0 4 Q15 0 30 3 Q45 6 60 2" stroke="white" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
          </svg>
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
