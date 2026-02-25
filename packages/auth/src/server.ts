/**
 * Server-side Supabase client for the VIDA ecosystem.
 * Use this in Next.js Server Components, Server Actions, and Route Handlers.
 */

import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client for server-side usage in Next.js.
 * Reads and writes auth tokens via Next.js cookies.
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * @returns A Supabase client configured for server-side usage
 * @throws If required environment variables are not set
 *
 * @example
 * // In a Server Component
 * import { createServerClient } from "@vida/auth/server";
 *
 * export default async function Page() {
 *   const supabase = await createServerClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 *   return <div>Hello {user?.email}</div>;
 * }
 *
 * @example
 * // In a Server Action
 * "use server";
 * import { createServerClient } from "@vida/auth/server";
 *
 * export async function updateProfile(formData: FormData) {
 *   const supabase = await createServerClient();
 *   // ...
 * }
 */
export async function createServerClient(): Promise<SupabaseClient> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    );
  }

  const cookieStore = await cookies();

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}
