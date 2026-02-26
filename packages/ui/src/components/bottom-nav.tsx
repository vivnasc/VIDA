"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface BottomNavItem {
  /** Lucide icon component to render */
  icon: React.ElementType;
  /** Label text displayed below the icon */
  label: string;
  /** Navigation target URL */
  href: string;
  /** Whether this item is currently active */
  active?: boolean;
}

export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Navigation items to display */
  items: BottomNavItem[];
  /** Active app color for highlighting (CSS color value) */
  activeColor?: string;
  /**
   * Custom link component to use instead of <a>.
   * Useful for Next.js Link or other router-aware components.
   */
  linkComponent?: React.ElementType;
}

const BottomNav = React.forwardRef<HTMLElement, BottomNavProps>(
  (
    {
      className,
      items,
      activeColor = "#FF6B35",
      linkComponent: LinkComponent = "a",
      ...props
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md",
          "pb-safe-bottom",
          className,
        )}
        role="navigation"
        aria-label="Navegação principal"
        {...props}
      >
        <div className="flex h-16 items-center justify-around px-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <LinkComponent
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-xs transition-colors",
                  item.active
                    ? "font-medium"
                    : "text-muted-foreground hover:text-on-surface",
                )}
                style={item.active ? { color: activeColor } : undefined}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="truncate">{item.label}</span>
              </LinkComponent>
            );
          })}
        </div>
      </nav>
    );
  },
);

BottomNav.displayName = "BottomNav";

export { BottomNav };
