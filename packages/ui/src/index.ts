/**
 * @vida/ui - Shared UI component library for the VIDA ecosystem.
 *
 * @example
 * import { Button, Card, CardContent, Input } from "@vida/ui";
 */

// Utility
export { cn } from "./lib/utils";

// Components
export { Button, buttonVariants } from "./components/button";
export type { ButtonProps } from "./components/button";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card";

export { Input } from "./components/input";
export type { InputProps } from "./components/input";

export { Badge, badgeVariants } from "./components/badge";
export type { BadgeProps } from "./components/badge";

export { Avatar, AvatarImage, AvatarFallback } from "./components/avatar";
export type { AvatarImageProps } from "./components/avatar";

export { BottomNav } from "./components/bottom-nav";
export type {
  BottomNavProps,
  BottomNavItem,
} from "./components/bottom-nav";

export { AppShell } from "./components/app-shell";
export type { AppShellProps, AppShellUser } from "./components/app-shell";

export { StatCard } from "./components/stat-card";
export type { StatCardProps } from "./components/stat-card";

export { EmptyState } from "./components/empty-state";
export type { EmptyStateProps } from "./components/empty-state";

export { AppSwitcher } from "./components/app-switcher";
export type { AppSwitcherProps, AppSwitcherApp } from "./components/app-switcher";

export { AuthForm } from "./components/auth-form";
export type { AuthFormProps } from "./components/auth-form";
