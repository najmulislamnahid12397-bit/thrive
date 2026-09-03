import * as React from "react";
import { cn } from "@/lib/utils";

export function CategoryBadge({ children, className, variant = "solid" }: { children: React.ReactNode; className?: string; variant?: "solid" | "outline" }) {
  return (
    <span className={cn(
      "inline-flex items-center text-[11px] md:text-xs font-bold uppercase tracking-widest rounded-none",
      variant === "solid" ? "bg-neutral-900 text-white px-2 py-1" : "border border-neutral-900 text-neutral-900 px-2 py-1",
      className
    )}>
      {children}
    </span>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer", className)}>
      <span className="text-neutral-300 mr-1" aria-hidden="true">#</span>
      {children}
    </span>
  );
}

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-sans text-[11px] font-bold uppercase tracking-wider text-neutral-900", className)}>
      {children}
    </span>
  );
}

export function Overline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-sans text-[11px] md:text-xs font-semibold uppercase tracking-widest text-neutral-500", className)}>
      {children}
    </span>
  );
}

export function Metadata({ children, className }: { children: React.ReactNode; className?: string }) {
  const validChildren = React.Children.toArray(children).filter(Boolean);
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 md:gap-x-3 text-[10px] sm:text-[11px]", className)}>
      {validChildren.map((child, index) => (
        <React.Fragment key={index}>
          <span className="inline-flex items-center">{child}</span>
          {index < validChildren.length - 1 && (
            <span className="text-neutral-300 select-none" aria-hidden="true">·</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function ReadingTime({ minutes, className }: { minutes: number | string; className?: string }) {
  return (
    <span className={cn("text-[10px] sm:text-[11px] font-medium text-neutral-500 uppercase tracking-widest whitespace-nowrap", className)}>
      {minutes} MIN READ
    </span>
  );
}

export function DateLabel({ date, className }: { date: string | Date; className?: string }) {
  const formattedDate = typeof date === "string" 
    ? date 
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
    
  return (
    <span className={cn("text-[10px] sm:text-[11px] font-medium text-neutral-500 uppercase tracking-widest whitespace-nowrap", className)}>
      {formattedDate}
    </span>
  );
}

export function AuthorMeta({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("text-[10px] sm:text-[11px] font-bold text-neutral-900 uppercase tracking-widest whitespace-nowrap", className)}>
      BY {name}
    </span>
  );
}
