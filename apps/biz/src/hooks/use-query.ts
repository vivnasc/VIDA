"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createBrowserClient } from "@vida/auth/client";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Generic typed data-fetching hook for Supabase queries.
 *
 * @example
 * const { data, loading, error, reload } = useQuery(
 *   (supabase) => getProducts(supabase, businessId),
 *   [businessId],
 * );
 */
export function useQuery<T>(
  queryFn: (supabase: SupabaseClient) => Promise<T>,
  deps: unknown[],
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    // Skip if any dependency is falsy (e.g. businessId not loaded yet)
    if (deps.some((d) => d === null || d === undefined || d === "")) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const supabase = createBrowserClient();
      const result = await queryFn(supabase);
      if (mountedRef.current) {
        setData(result);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dados");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { data, loading, error, reload: load };
}

/**
 * Mutation hook for Supabase write operations.
 *
 * @example
 * const { mutate, loading, error } = useMutation(
 *   (supabase, input: CreateSaleInput) => createSale(supabase, input),
 * );
 * await mutate({ business_id: "...", total_amount: 1500, payment_method: "cash" });
 */
export function useMutation<TInput, TResult>(
  mutationFn: (supabase: SupabaseClient, input: TInput) => Promise<TResult>,
): {
  mutate: (input: TInput) => Promise<TResult>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (input: TInput): Promise<TResult> => {
      try {
        setLoading(true);
        setError(null);
        const supabase = createBrowserClient();
        return await mutationFn(supabase, input);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao guardar";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn],
  );

  return { mutate, loading, error };
}
