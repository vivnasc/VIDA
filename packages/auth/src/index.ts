/**
 * @vida/auth - Shared authentication utilities for the VIDA ecosystem.
 *
 * This package provides Supabase auth integration for both client and server
 * environments in Next.js applications.
 *
 * @example
 * // Client-side
 * import { createBrowserClient } from "@vida/auth/client";
 * import { useUser, useAuth } from "@vida/auth/hooks";
 *
 * // Server-side
 * import { createServerClient } from "@vida/auth/server";
 *
 * // Middleware
 * import { updateSession, createMiddleware } from "@vida/auth/middleware";
 */

export { createBrowserClient } from "./client";
export { createServerClient } from "./server";
export { updateSession, createMiddleware } from "./middleware";
export { useUser, useSession, useAuth } from "./hooks";
export type { AuthMethods } from "./hooks";
