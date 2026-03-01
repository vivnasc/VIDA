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
          <svg width={64} height={64} viewBox="0 0 100 100" fill="none" className="mx-auto mb-3">
            <path d="M9 34 L27 17 L49 30 L72 17 L91 34 L50 55 Z" fill="white" opacity="0.9" />
            <path d="M7 37 L48 58 L48 93 L7 72 Z" fill="#C5975B" />
            <path d="M52 58 L93 37 L93 47 L82 51 L82 57 L93 61 L93 72 L52 93 Z" fill="white" opacity="0.2" />
          </svg>
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
