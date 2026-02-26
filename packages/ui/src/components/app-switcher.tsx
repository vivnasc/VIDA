"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface AppSwitcherApp {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  url: string;
}

export interface AppSwitcherProps {
  /** The ID of the currently active app */
  currentApp: string;
  /** Array of available VIDA apps */
  apps: AppSwitcherApp[];
  /** Additional CSS classes */
  className?: string;
}

const APP_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Heart: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Wallet: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  ),
  Home: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  HeartPulse: ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  ),
};

function AppIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const IconComponent = APP_ICONS[icon];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

const AppSwitcher = React.forwardRef<HTMLDivElement, AppSwitcherProps>(
  ({ currentApp, apps, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleToggle = React.useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleClose = React.useCallback(() => {
      setIsOpen(false);
    }, []);

    // Close on escape key
    React.useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      }
      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [isOpen]);

    const currentAppData = apps.find((a) => a.id === currentApp);

    return (
      <div ref={ref} className={cn("fixed bottom-20 right-4 z-50", className)}>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
            onClick={handleClose}
            aria-hidden="true"
          />
        )}

        {/* App Grid Panel */}
        <div
          className={cn(
            "absolute bottom-16 right-0 w-72 origin-bottom-right rounded-2xl border border-border bg-surface p-4 shadow-2xl transition-all duration-200",
            isOpen
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0",
          )}
          role="dialog"
          aria-label="Switch between VIDA apps"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-muted">
            Apps VIDA
          </p>
          <div className="grid grid-cols-2 gap-3">
            {apps.map((app) => {
              const isCurrent = app.id === currentApp;
              return (
                <a
                  key={app.id}
                  href={app.url}
                  onClick={isCurrent ? (e) => { e.preventDefault(); handleClose(); } : undefined}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all duration-150",
                    isCurrent
                      ? "bg-background ring-2 shadow-sm"
                      : "hover:bg-background/60 active:scale-95",
                  )}
                  style={
                    isCurrent
                      ? { outlineColor: app.color, borderColor: app.color } as React.CSSProperties
                      : undefined
                  }
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-150 group-hover:scale-110",
                    )}
                    style={{ backgroundColor: `${app.color}15`, color: app.color }}
                  >
                    <AppIcon icon={app.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold leading-tight"
                      style={{ color: app.color }}
                    >
                      {app.name}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-text-muted">
                      {app.tagline}
                    </p>
                  </div>
                  {isCurrent && (
                    <span
                      className="mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase text-white"
                      style={{ backgroundColor: app.color }}
                    >
                      Actual
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* FAB Trigger */}
        <button
          onClick={handleToggle}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 active:scale-95",
            isOpen && "rotate-45",
          )}
          style={{
            backgroundColor: currentAppData?.color || "#FF6B35",
          }}
          aria-label={isOpen ? "Close app switcher" : "Open app switcher"}
          aria-expanded={isOpen}
        >
          <svg
            className="h-6 w-6 text-white transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>
      </div>
    );
  },
);

AppSwitcher.displayName = "AppSwitcher";

export { AppSwitcher };
