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
    const hasLoaded = sessionStorage.getItem("biz-mz-loaded");
    if (hasLoaded) {
      setShowSplash(false);
      setIsReady(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      setIsReady(true);
      sessionStorage.setItem("biz-mz-loaded", "1");
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center z-[100]">
        <div className="text-center animate-in">
          <div className="text-5xl font-black text-white mb-2 tracking-tight">BIZ.MZ</div>
          <p className="text-primary-200 text-sm">Teu negócio, organizado</p>
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
