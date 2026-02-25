/**
 * Browser-side Supabase client for the VIDA ecosystem.
 * Use this in client components and browser-only code.
 */

import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * Creates or returns an existing Supabase client for browser usage.
 * Uses a singleton pattern to avoid creating multiple instances.
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * @returns A Supabase client configured for browser usage
 * @throws If required environment variables are not set
 *
 * @example
 * import { createBrowserClient } from "@vida/auth/client";
 *
 * const supabase = createBrowserClient();
 * const { data } = await supabase.from("profiles").select("*");
 */
export function createBrowserClient(): SupabaseClient {
  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    );
  }

  browserClient = createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);

  return browserClient;
}
