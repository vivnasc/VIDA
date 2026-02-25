"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Button, type ButtonProps } from "./button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lucide icon component to display */
  icon?: React.ElementType;
  /** Title text */
  title: string;
  /** Descriptive text explaining the empty state */
  description?: string;
  /** Label for the action button */
  actionLabel?: string;
  /** Click handler for the action button */
  onAction?: () => void;
  /** Variant for the action button */
  actionVariant?: ButtonProps["variant"];
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon: Icon,
      title,
      description,
      actionLabel,
      onAction,
      actionVariant = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center px-6 py-12 text-center",
          className,
        )}
        {...props}
      >
        {Icon && (
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        {description && (
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {actionLabel && onAction && (
          <Button
            variant={actionVariant}
            onClick={onAction}
            className="mt-6"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
