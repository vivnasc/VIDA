"use client";

import { useEffect, useState, useCallback } from "react";

interface ServiceWorkerState {
  isInstalled: boolean;
  hasUpdate: boolean;
  isOffline: boolean;
  version: string | null;
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isInstalled: false,
    hasUpdate: false,
    isOffline: !navigator.onLine,
    version: null,
  });

  const applyUpdate = useCallback(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage("SKIP_WAITING");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Listen for online/offline
    const handleOnline = () => setState((s) => ({ ...s, isOffline: false }));
    const handleOffline = () => setState((s) => ({ ...s, isOffline: true }));
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Listen for SW messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SW_UPDATED") {
        setState((s) => ({ ...s, hasUpdate: true, version: event.data.version }));
      }
      if (event.data?.type === "SW_VERSION") {
        setState((s) => ({ ...s, version: event.data.version }));
      }
    };
    navigator.serviceWorker.addEventListener("message", handleMessage);

    // Register SW
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then((registration) => {
        setState((s) => ({ ...s, isInstalled: true }));

        // Check for updates every 30 minutes
        const interval = setInterval(() => {
          registration.update();
        }, 30 * 60 * 1000);

        // Detect waiting SW (update available)
        if (registration.waiting) {
          setState((s) => ({ ...s, hasUpdate: true }));
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              setState((s) => ({ ...s, hasUpdate: true }));
            }
          });
        });

        // Get version
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage("GET_VERSION");
        }

        return () => clearInterval(interval);
      })
      .catch((error) => {
        console.warn("SW registration failed:", error);
      });

    // Listen for controller change (new SW activated)
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, []);

  return { ...state, applyUpdate };
}
