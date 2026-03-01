import Script from "next/script";

interface AnalyticsProps {
  /** The domain registered in Plausible (e.g. "familia.vida.mz") */
  domain: string;
}

/**
 * Plausible Analytics - lightweight, privacy-friendly analytics.
 * No cookies, GDPR compliant, < 1KB script.
 *
 * Setup: Register domains at https://plausible.io or self-host.
 * Set NEXT_PUBLIC_PLAUSIBLE_ENABLED=true to activate in production.
 */
function Analytics({ domain }: AnalyticsProps) {
  if (process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED !== "true") {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

export { Analytics };
export type { AnalyticsProps };
