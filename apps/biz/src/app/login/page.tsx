"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@vida/ui";
import { createBrowserClient } from "@vida/auth/client";

/* ── maBIZ Logo for auth page ──────────────────────────────────────────────── */

function MaBizAuthLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width="56"
        height="56"
        viewBox="0 0 192 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="192" height="192" rx="38" fill="#1E7A42" />
        <rect x="8" y="8" width="176" height="176" rx="32" fill="#22C55E" opacity="0.15" />
        <circle cx="70" cy="82" r="30" fill="#DCFCE7" />
        <text
          x="70"
          y="90"
          textAnchor="middle"
          fontFamily="system-ui,-apple-system,sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="#166534"
        >
          ma
        </text>
        <text
          x="126"
          y="93"
          textAnchor="middle"
          fontFamily="system-ui,-apple-system,sans-serif"
          fontSize="36"
          fontWeight="900"
          fill="white"
          letterSpacing="-1"
        >
          BIZ
        </text>
        <rect x="40" y="124" width="112" height="2.5" rx="1.25" fill="white" opacity="0.3" />
        <text
          x="96"
          y="150"
          textAnchor="middle"
          fontFamily="system-ui,-apple-system,sans-serif"
          fontSize="11"
          fontWeight="600"
          fill="white"
          opacity="0.7"
        >
          TEU NEGOCIO
        </text>
      </svg>
      <h1 className="text-2xl font-black tracking-tight text-gray-900">
        <span className="text-[#1E7A42]/60">ma</span>BIZ
      </h1>
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
