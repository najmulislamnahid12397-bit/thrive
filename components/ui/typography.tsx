import React from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function DisplayXL({ children, className, ...props }: TypographyProps) {
  return <h1 className={cn("font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.1] tracking-tight text-neutral-900 break-words hyphens-auto", className)} {...props}>{children}</h1>;
}

export function DisplayLarge({ children, className, ...props }: TypographyProps) {
  return <h1 className={cn("font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.08] sm:leading-[1.05] tracking-tight text-neutral-900 break-words hyphens-auto", className)} {...props}>{children}</h1>;
}

export function DisplayMedium({ children, className, ...props }: TypographyProps) {
  return <h2 className={cn("font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] sm:leading-[1.1] tracking-tight text-neutral-900 break-words hyphens-auto", className)} {...props}>{children}</h2>;
}

export function H1({ children, className, ...props }: TypographyProps) {
  return <h1 className={cn("font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] sm:leading-[1.15] tracking-tight font-medium text-neutral-900 break-words", className)} {...props}>{children}</h1>;
}

export function H2({ children, className, ...props }: TypographyProps) {
  return <h2 className={cn("font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.25] sm:leading-[1.2] tracking-tight font-medium text-neutral-900 break-words", className)} {...props}>{children}</h2>;
}

export function H3({ children, className, ...props }: TypographyProps) {
  return <h3 className={cn("font-serif text-lg sm:text-xl md:text-2xl leading-[1.3] font-medium text-neutral-900 break-words", className)} {...props}>{children}</h3>;
}

export function H4({ children, className, ...props }: TypographyProps) {
  return <h4 className={cn("font-serif text-base sm:text-lg md:text-xl leading-[1.4] font-medium text-neutral-900 break-words", className)} {...props}>{children}</h4>;
}

export function BodyLarge({ children, className, ...props }: TypographyProps) {
  return <p className={cn("font-sans text-base sm:text-lg md:text-xl leading-relaxed text-neutral-700", className)} {...props}>{children}</p>;
}

export function Body({ children, className, ...props }: TypographyProps) {
  return <p className={cn("font-sans text-sm sm:text-base leading-relaxed text-neutral-700", className)} {...props}>{children}</p>;
}

export function BodySmall({ children, className, ...props }: TypographyProps) {
  return <p className={cn("font-sans text-sm leading-relaxed text-neutral-600", className)} {...props}>{children}</p>;
}

export function Caption({ children, className, ...props }: TypographyProps) {
  return <span className={cn("font-sans text-xs leading-normal text-neutral-500", className)} {...props}>{children}</span>;
}
