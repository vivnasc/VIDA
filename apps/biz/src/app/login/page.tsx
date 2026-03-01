"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@vida/ui";
import { createBrowserClient } from "@vida/auth/client";

/* ── maBIZ Brand ───────────────────────────────────────────────────────────── */

const BRAND = {
  green: "#1A5C35",
  greenDark: "#14472A",
  gold: "#C5975B",
};

function MaBizAuthLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Isometric M/B cube mark */}
      <svg width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 16 L24 6 L24 38 L4 28Z" fill={BRAND.gold} />
        <path d="M4 16 L24 6 L24 38 L4 28Z" fill="black" opacity="0.05" />
        <path d="M24 6 L44 16 L44 28 L24 38Z" fill={BRAND.greenDark} />
        <path d="M4 16 L14 11 L24 16 L14 21Z" fill={BRAND.green} />
        <path d="M24 16 L34 11 L44 16 L34 21Z" fill={BRAND.green} opacity="0.85" />
        <path d="M14 21 L24 16 L34 21 L24 26Z" fill={BRAND.green} opacity="0.7" />
        <path d="M4 16 L14 11 L14 21 L4 26Z" fill={BRAND.gold} opacity="0.8" />
        <path d="M44 16 L34 11 L34 21 L44 26Z" fill={BRAND.greenDark} opacity="0.8" />
      </svg>
      {/* maBIZ text */}
      <div>
        <h1 className="text-2xl font-black tracking-tight leading-none">
          <span style={{ color: BRAND.gold }}>ma</span>
          <span style={{ color: BRAND.green }}>BIZ</span>
        </h1>
        <svg width="72" height="6" viewBox="0 0 60 6" className="mx-auto -mt-0.5">
          <path d="M0 3 Q15 0 30 3 Q45 6 60 3" stroke={BRAND.green} strokeWidth="1.5" fill="none" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
      router.refresh();
    },
    [router, searchParams],
  );

  const handleRegister = useCallback(
    async (email: string, password: string, fullName: string, phone: string) => {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
          },
        },
      });
      if (error) throw new Error(error.message);
    },
    [],
  );

  const handleGoogleLogin = useCallback(async () => {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw new Error(error.message);
  }, []);

  const handleFacebookLogin = useCallback(async () => {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw new Error(error.message);
  }, []);

  const handleForgotPassword = useCallback(async (email: string) => {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    if (error) throw new Error(error.message);
  }, []);

  return (
    <AuthForm
      appName="maBIZ"
      appColor="#1E7A42"
      appTagline="Teu negócio, organizado"
      appLogo={<MaBizAuthLogo />}
      registerSubtitle="Cria a tua conta maBIZ"
      footerText=""
      onLogin={handleLogin}
      onRegister={handleRegister}
      onGoogleLogin={handleGoogleLogin}
      onFacebookLogin={handleFacebookLogin}
      onForgotPassword={handleForgotPassword}
    />
  );
}
