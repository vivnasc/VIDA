"use client";

/**
 * React hooks for authentication in the VIDA ecosystem.
 * These hooks provide easy access to user, session, and auth methods.
 */

import { useCallback, useEffect, useState } from "react";
import type { Session, User, AuthError } from "@supabase/supabase-js";
import { createBrowserClient } from "./client";

// ─── useUser ────────────────────────────────────────────────────────────────

/**
 * Returns the currently authenticated user, or null if not signed in.
 * Automatically updates when the auth state changes.
 *
 * @returns An object with the user, loading state, and any error
 *
 * @example
 * const { user, loading } = useUser();
 * if (loading) return <Skeleton />;
 * if (!user) return <LoginPrompt />;
 * return <p>Olá, {user.email}</p>;
 */
export function useUser(): {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user: currentUser }, error: authError }) => {
      setUser(currentUser);
      setError(authError);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setError(null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}

// ─── useSession ─────────────────────────────────────────────────────────────

/**
 * Returns the current auth session, or null if not signed in.
 * Automatically updates when the session changes.
 *
 * @returns An object with the session and loading state
 *
 * @example
 * const { session, loading } = useSession();
 * if (session) {
 *   console.log("Token:", session.access_token);
 * }
 */
export function useSession(): {
  session: Session | null;
  loading: boolean;
} {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setLoading(false);
    });

    // Listen for session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

// ─── useAuth ────────────────────────────────────────────────────────────────

export interface AuthMethods {
  /** Sign in with email and password */
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  /** Create a new account with email and password */
  signup: (
    email: string,
    password: string,
    metadata?: Record<string, unknown>,
  ) => Promise<{ error: AuthError | null }>;
  /** Sign out the current user */
  logout: () => Promise<{ error: AuthError | null }>;
  /** Sign in with a magic link sent to the email */
  loginWithMagicLink: (email: string) => Promise<{ error: AuthError | null }>;
  /** Sign in with an OAuth provider */
  loginWithOAuth: (
    provider: "google" | "apple" | "facebook",
  ) => Promise<{ error: AuthError | null }>;
  /** Reset password by sending a recovery email */
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  /** Whether an auth operation is currently in progress */
  loading: boolean;
}

/**
 * Returns authentication methods for login, signup, and logout.
 *
 * @returns An object with auth methods and loading state
 *
 * @example
 * const { login, signup, logout, loading } = useAuth();
 *
 * const handleLogin = async () => {
 *   const { error } = await login(email, password);
 *   if (error) showError(error.message);
 * };
 */
export function useAuth(): AuthMethods {
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const supabase = createBrowserClient();
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signup = useCallback(
    async (
      email: string,
      password: string,
      metadata?: Record<string, unknown>,
    ) => {
      setLoading(true);
      try {
        const supabase = createBrowserClient();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: metadata,
          },
        });
        return { error };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signOut();
      return { error };
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithMagicLink = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithOAuth = useCallback(
    async (provider: "google" | "apple" | "facebook") => {
      setLoading(true);
      try {
        const supabase = createBrowserClient();
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        return { error };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    login,
    signup,
    logout,
    loginWithMagicLink,
    loginWithOAuth,
    resetPassword,
    loading,
  };
}
