"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { createBrowserClient } from "@/lib/auth/client";
import type { Business, BusinessTemplate } from "@/lib/types/business";
import {
  getActiveBusiness,
  getDashboardData,
  createBusiness,
  type DashboardData,
} from "@/lib/supabase";

/**
 * Hook to load and manage the user's active business.
 * Returns null if user hasn't created a business yet (needs onboarding).
 */
export function useBusiness() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const loadBusiness = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createBrowserClient();
      const biz = await getActiveBusiness(supabase);
      if (mountedRef.current) setBusiness(biz);
    } catch {
      if (mountedRef.current) setBusiness(null);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadBusiness();
    return () => { mountedRef.current = false; };
  }, [loadBusiness]);

  const create = useCallback(
    async (input: {
      name: string;
      template: BusinessTemplate;
      address?: string;
      phone?: string;
    }): Promise<Business> => {
      try {
        setError(null);
        const supabase = createBrowserClient();
        const biz = await createBusiness(supabase, input);
        setBusiness(biz);
        return biz;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro ao criar negócio";
        setError(msg);
        throw err;
      }
    },
    [],
  );

  return { business, loading, error, create, reload: loadBusiness };
}

/**
 * Hook to load dashboard aggregated data for a business.
 * Only fetches when businessId is provided.
 */
export function useDashboard(businessId: string | undefined) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const supabase = createBrowserClient();
      const dashboard = await getDashboardData(supabase, businessId);
      if (mountedRef.current) setData(dashboard);
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "Erro ao carregar dashboard");
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => { mountedRef.current = false; };
  }, [load]);

  return { data, loading, error, reload: load };
}
