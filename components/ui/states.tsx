import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, AlertTriangle, FileX, SearchX, type LucideIcon } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { H4, Body } from "@/components/ui/typography";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

/**
 * Base Skeleton
 * A minimal, rectangular placeholder block for loading states.
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse bg-neutral-200/60 rounded-none", className)}
      {...props}
    />
  );
}

/**
 * Loading Spinner
 * Standard editorial spinner using Lucide.
 */
export function LoadingSpinner({ size = "base", className }: { size?: "xs" | "sm" | "base" | "lg" | "xl"; className?: string }) {
  return (
    <div role="status" aria-label="Loading" className="inline-flex">
      <Icon 
        icon={Loader2} 
        size={size} 
        className={cn("animate-spin text-neutral-900", className)} 
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Loading Card
 * A pre-composed skeleton structure for article/video cards.
 */
export function LoadingCard({ className }: { className?: string }) {
  return (
    <Card className={cn("border-none shadow-none", className)} aria-busy="true" aria-label="Loading content">
      <Skeleton className="aspect-[4/3] sm:aspect-video w-full" />
      <CardContent>
        <Skeleton className="h-3 w-16 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-4/5 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <CardFooter>
          <Skeleton className="h-3 w-32" />
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export interface StateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Empty State
 * Used when lists, search results, or tables return no items.
 */
export function EmptyState({ title, description, icon = SearchX, action, className }: StateProps) {
  return (
    <div role="status" className={cn("flex flex-col items-center justify-center py-16 px-4 text-center bg-neutral-50 border border-neutral-100", className)}>
      {icon && <Icon icon={icon} size="xl" className="mb-4 text-neutral-400" />}
      <H4 className="mb-2">{title}</H4>
      <Body className="text-neutral-500 max-w-sm mb-6">{description}</Body>
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * Error State
 * Used when a fetch fails or an operation crashes.
 */
export function ErrorState({ title = "Something went wrong", description = "We encountered an issue loading this content.", icon = AlertTriangle, action, className }: Partial<StateProps>) {
  return (
    <div role="alert" className={cn("flex flex-col items-center justify-center py-16 px-4 text-center bg-red-50/30 border border-red-100", className)}>
      {icon && <Icon icon={icon} size="xl" className="mb-4 text-red-700" />}
      <H4 className="mb-2 text-red-900">{title}</H4>
      <Body className="text-red-700/80 max-w-sm mb-6">{description}</Body>
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * Not Found State
 * Used for 404 pages or when a specific requested entity (article, video) is missing.
 */
export function NotFoundState({ title = "Content not found", description = "The article or page you are looking for does not exist or has been moved.", icon = FileX, action, className }: Partial<StateProps>) {
  return (
    <div role="status" className={cn("flex flex-col items-center justify-center py-24 px-4 text-center", className)}>
      {icon && <Icon icon={icon} size="xl" className="mb-4 text-neutral-300" />}
      <H4 className="mb-2">{title}</H4>
      <Body className="text-neutral-500 max-w-sm mb-8">{description}</Body>
      {action && <div>{action}</div>}
    </div>
  );
}
