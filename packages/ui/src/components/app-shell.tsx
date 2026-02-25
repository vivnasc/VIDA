"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { type BottomNavItem, BottomNav } from "./bottom-nav";

export interface AppShellUser {
  name: string;
  avatarUrl?: string;
  initials?: string;
}

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Name of the app displayed in the header */
  appName: string;
  /** Brand color for the app (CSS color value) */
  appColor: string;
  /** Current user info displayed in the header */
  user?: AppShellUser;
  /** Navigation items for the bottom nav */
  navItems?: BottomNavItem[];
  /** Custom link component for navigation (e.g., Next.js Link) */
  linkComponent?: React.ElementType;
  /** Optional header actions slot */
  headerActions?: React.ReactNode;
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      className,
      appName,
      appColor,
      user,
      navItems = [],
      linkComponent,
      headerActions,
      children,
      ...props
    },
    ref,
  ) => {
    const initials =
      user?.initials ||
      user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) ||
      "?";

    return (
      <div
        ref={ref}
        className={cn("flex min-h-screen flex-col bg-background", className)}
        {...props}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md pt-safe-top">
          <div className="flex h-14 items-center justify-between px-4">
            <h1
              className="text-lg font-bold tracking-tight"
              style={{ color: appColor }}
            >
              {appName}
            </h1>
            <div className="flex items-center gap-3">
              {headerActions}
              {user && (
                <Avatar className="h-8 w-8">
                  {user.avatarUrl && (
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                  )}
                  <AvatarFallback
                    className="text-xs text-white"
                    style={{ backgroundColor: appColor }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-4 pb-20">{children}</main>

        {/* Bottom Navigation */}
        {navItems.length > 0 && (
          <BottomNav
            items={navItems}
            activeColor={appColor}
            linkComponent={linkComponent}
          />
        )}
      </div>
    );
  },
);

AppShell.displayName = "AppShell";

export { AppShell };
