/**
 * Next.js middleware helpers for Supabase auth in the VIDA ecosystem.
 *
 * Provides two approaches:
 * 1. `updateSession(request)` - Lower-level function for custom middleware logic
 * 2. `createMiddleware()` - Higher-level factory that returns a ready-to-use middleware
 */

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Creates a Supabase server client bound to the given request/response,
 * and refreshes the session. Returns the user and the response object
 * (which may contain updated cookies).
 */
async function createSupabaseMiddlewareClient(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    );
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Refresh the session - this will update cookies if the token is refreshed.
  // IMPORTANT: Do not remove this. It is required to refresh the session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, supabaseResponse };
}

// ─── updateSession ───────────────────────────────────────────────────────────

/**
 * Updates the Supabase auth session by refreshing tokens in the middleware.
 * This ensures that the user's session stays active across server requests.
 *
 * Environment variables required:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse with updated auth cookies
 *
 * @example
 * // middleware.ts at your app root
 * import { updateSession } from "@vida/auth/middleware";
 * import type { NextRequest } from "next/server";
 *
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request);
 * }
 *
 * export const config = {
 *   matcher: [
 *     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
 *   ],
 * };
 */
export async function updateSession(
  request: NextRequest,
): Promise<NextResponse> {
  const { user, supabaseResponse } =
    await createSupabaseMiddlewareClient(request);

  // Redirect unauthenticated users to login page for protected routes
  const isProtectedRoute =
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/signup") &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/api/auth") &&
    request.nextUrl.pathname !== "/";

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// ─── createMiddleware ────────────────────────────────────────────────────────

/**
 * Creates a production-ready Next.js middleware function that:
 * - Refreshes the Supabase auth session on every request
 * - Redirects unauthenticated users to /login for protected routes
 * - Redirects authenticated users away from /login to /
 * - Preserves the original URL as a `redirect` query parameter
 *
 * @returns A Next.js middleware function
 *
 * @example
 * // middleware.ts at your app root
 * import { createMiddleware } from "@vida/auth/middleware";
 *
 * export default createMiddleware();
 *
 * export const config = {
 *   matcher: [
 *     "/((?!login|_next/static|_next/image|favicon.ico|manifest.json|icons).*)",
 *   ],
 * };
 */
export function createMiddleware() {
  return async function middleware(request: NextRequest): Promise<NextResponse> {
    const { user, supabaseResponse } =
      await createSupabaseMiddlewareClient(request);

    const pathname = request.nextUrl.pathname;

    // Public routes that never require authentication
    const isPublicRoute =
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/auth") ||
      pathname.startsWith("/api/auth");

    // If user is authenticated and on the login page, redirect to dashboard
    if (user && pathname.startsWith("/login")) {
      const redirectTo = request.nextUrl.searchParams.get("redirect") || "/painel";
      const url = request.nextUrl.clone();
      url.pathname = redirectTo;
      url.searchParams.delete("redirect");
      return NextResponse.redirect(url);
    }

    // If user is not authenticated and on a protected route, redirect to login
    if (!user && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      if (pathname !== "/") {
        url.searchParams.set("redirect", pathname);
      }
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  };
}
