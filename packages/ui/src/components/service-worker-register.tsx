"use client";

import { useEffect } from "react";

/**
 * Registers the service worker and handles auto-updates.
 * On each new deployment, the SW file changes → browser detects update →
 * new SW activates immediately via skipWaiting + clients.claim.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        // Check for updates every 60 seconds
        const interval = setInterval(() => {
          registration.update();
        }, 60_000);

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            // New SW is active and there was a previous one → reload for fresh content
            if (
              newWorker.state === "activated" &&
              navigator.serviceWorker.controller
            ) {
              window.location.reload();
            }
          });
        });

        return () => clearInterval(interval);
      });

    // When a new SW takes over, reload to get fresh content
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  return null;
}
