"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@vida/ui";
import { createBrowserClient } from "@vida/auth/client";

/* ── maBIZ Brand ───────────────────────────────────────────────────────────── */

function MaBizAuthLogo() {
  return (
    <div className="flex flex-col items-center">
      <svg width={48} height={48} viewBox="0 0 100 100" fill="none" className="mb-2">
        <path d="M9 34 L27 17 L49 30 L72 17 L91 34 L50 55 Z" fill="#1A5C35" />
        <path d="M7 37 L48 58 L48 93 L7 72 Z" fill="#C5975B" />
        <path d="M52 58 L93 37 L93 47 L82 51 L82 57 L93 61 L93 72 L52 93 Z" fill="#14472A" />
      </svg>
      <h1 className="text-3xl font-black tracking-tight leading-none">
        <span style={{ color: "#C5975B" }}>ma</span>
        <span style={{ color: "#1A5C35" }}>BIZ</span>
      </h1>
      <svg width="84" height="7" viewBox="0 0 60 6" className="-mt-0.5">
        <path d="M0 4 Q15 0 30 3 Q45 6 60 2" stroke="#1A5C35" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
      </svg>
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
