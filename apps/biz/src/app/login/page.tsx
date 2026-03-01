"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@vida/ui";
import { createBrowserClient } from "@vida/auth/client";

/* ── maBIZ Brand ───────────────────────────────────────────────────────────── */

function MaBizAuthLogo() {
  return (
    <div className="flex flex-col items-center">
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
