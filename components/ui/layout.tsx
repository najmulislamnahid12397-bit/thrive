import * as React from "react";
import { cn } from "@/lib/utils";
import { Overline } from "@/components/ui/editorial";
import { H2, Body } from "@/components/ui/typography";

// Standard horizontal padding for all responsive containers (optimized for 320px-430px mobile viewports up to desktop)
const paddingX = "px-4 sm:px-6 md:px-12 lg:px-16";

/**
 * Main Page Container
 * Used for standard content sections, max-width capped at 80rem (1280px).
 */
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(`mx-auto w-full max-w-7xl ${paddingX}`, className)}>
      {children}
    </div>
  );
}

/**
 * Wide Container
 * Used for high-impact visual sections, hero images, and large galleries.
 * Max-width capped at 100rem (1600px).
 */
export function ContainerWide({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(`mx-auto w-full max-w-[100rem] ${paddingX}`, className)}>
      {children}
    </div>
  );
}

/**
 * Reading Container
 * Used for long-form article body text to maintain optimal reading line length (~65-75 characters).
 * Max-width capped at 48rem (768px).
 */
export function ContainerReading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(`mx-auto w-full max-w-3xl ${paddingX}`, className)}>
      {children}
    </div>
  );
}

/**
 * Full Width Container
 * Stretches entirely edge-to-edge. Use sparingly for bleeds.
 */
export function ContainerFull({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
}

/**
 * Standard Vertical Section
 * Generous top and bottom padding for defining major page sections.
 */
export function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-10 sm:py-16 md:py-24 lg:py-32", className)}>
      {children}
    </section>
  );
}

/**
 * Tight Vertical Section
 * Reduced vertical padding for closely related sections.
 */
export function SectionTight({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-6 sm:py-8 md:py-12 lg:py-16", className)}>
      {children}
    </section>
  );
}

/**
 * Section Header
 * An editorial standard header for introducing page sections.
 * Supports an eyebrow (overline), title, description, and an optional action area.
 */
export function SectionHeader({
  title,
  description,
  overline,
  action,
  className
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  overline?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-12", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div className="max-w-2xl">
          {overline && <Overline className="block mb-4 text-neutral-500">{overline}</Overline>}
          <H2>{title}</H2>
          {description && <Body className="mt-4 text-neutral-600">{description}</Body>}
        </div>
        {action && (
          <div className="shrink-0 mt-2 md:mt-0">
            {action}
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
}

/**
 * Divider
 * An editorial thematic break with correct spacing and color.
 */
export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-t border-neutral-200", className)} />;
}

/**
 * 12-Column Editorial Grid
 * Standard editorial grid: 4 cols on mobile, 8 on tablet, 12 on desktop.
 */
export function Grid12({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 lg:gap-8", className)}>
      {children}
    </div>
  );
}

/**
 * Simple 2-Column Grid
 * 1 col on mobile, 2 cols on tablet and desktop.
 */
export function Grid2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8", className)}>
      {children}
    </div>
  );
}

/**
 * Simple 3-Column Grid
 * 1 col on mobile, 3 cols on desktop.
 */
export function Grid3({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8", className)}>
      {children}
    </div>
  );
}

/**
 * Content Grid
 * Flexible, responsive grid designed primarily for repeating card lists.
 * Defaults to 1 col on mobile, 2 on tablet, 3 on desktop.
 */
export function ContentGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16", className)}>
      {children}
    </div>
  );
}

/**
 * Stack
 * A vertical layout primitive for distributing elements with consistent spacing.
 */
export function Stack({ children, className, gap = "base" }: { children: React.ReactNode; className?: string; gap?: "none" | "sm" | "base" | "lg" | "xl" }) {
  const gapMap = {
    none: "gap-0",
    sm: "gap-2 md:gap-4",
    base: "gap-6 md:gap-8",
    lg: "gap-12 md:gap-16",
    xl: "gap-24 md:gap-32",
  };
  
  return (
    <div className={cn("flex flex-col", gapMap[gap], className)}>
      {children}
    </div>
  );
}

/**
 * Cluster
 * A horizontal layout primitive for grouping items that flow naturally and wrap when needed.
 */
export function Cluster({ children, className, align = "center", justify = "start" }: { children: React.ReactNode; className?: string; align?: "start" | "center" | "end"; justify?: "start" | "center" | "end" | "between" }) {
  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  return (
    <div className={cn("flex flex-row flex-wrap gap-4", alignMap[align], justifyMap[justify], className)}>
      {children}
    </div>
  );
}

/**
 * Aspect Ratio
 * Forces a container to maintain a specific ratio (e.g. "16/9", "4/3", "1/1").
 */
export function AspectRatio({ children, ratio = "16/9", className }: { children: React.ReactNode; ratio?: "16/9" | "4/3" | "1/1" | "3/2" | "2/3" | "3/4" | "21/9"; className?: string }) {
  const ratioMap = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
    "2/3": "aspect-[2/3]",
    "3/4": "aspect-[3/4]",
    "21/9": "aspect-[21/9]",
  };
  
  return (
    <div className={cn("relative w-full overflow-hidden", ratioMap[ratio], className)}>
      {children}
    </div>
  );
}
