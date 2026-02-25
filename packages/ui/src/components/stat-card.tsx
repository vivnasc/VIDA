"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Descriptive label for the stat */
  label: string;
  /** The main value to display */
  value: string;
  /** Percentage change (positive or negative) */
  change?: number;
  /** Lucide icon component to display */
  icon?: React.ElementType;
  /** Color for the icon background (CSS color value) */
  iconColor?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, change, icon: Icon, iconColor, ...props }, ref) => {
    const isPositive = change !== undefined && change >= 0;
    const changeText =
      change !== undefined
        ? `${isPositive ? "+" : ""}${change.toFixed(1)}%`
        : null;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-surface p-4 shadow-soft transition-shadow hover:shadow-soft-lg",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-on-surface">
              {value}
            </p>
            {changeText !== null && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  isPositive ? "text-dinheiro" : "text-saude",
                )}
              >
                {changeText}
                <span className="ml-1 text-muted-foreground">vs mês anterior</span>
              </p>
            )}
          </div>
          {Icon && (
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: iconColor
                  ? `${iconColor}15`
                  : "rgba(255, 107, 53, 0.08)",
                color: iconColor || "#FF6B35",
              }}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    );
  },
);

StatCard.displayName = "StatCard";

export { StatCard };
