"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  variant?: "bar" | "inline";
  className?: string;
}

export function Breadcrumbs({ items, variant = "bar", className }: BreadcrumbsProps = {}) {
  const pathname = usePathname() || "";
  
  // Suppress default top bar on home page, article detail pages, video detail pages, and topic hub pages (which render their own hero breadcrumbs)
  if (!items) {
    if (
      pathname === "/" ||
      pathname.startsWith("/articles/") ||
      (pathname.startsWith("/videos/") && pathname !== "/videos") ||
      (pathname.startsWith("/topics/") && pathname !== "/topics")
    ) {
      return null;
    }
  }
  
  let resolvedItems: BreadcrumbItem[] = [];

  if (items && items.length > 0) {
    resolvedItems = items;
  } else {
    const segments = pathname.split("/").filter(Boolean);
    const formatSegment = (segment: string) => {
      return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    resolvedItems = [
      { label: "Home", href: "/" },
      ...segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        return {
          label: formatSegment(segment),
          href: isLast ? undefined : `/${segments.slice(0, index + 1).join("/")}`,
        };
      }),
    ];
  }

  const breadcrumbContent = (
    <nav aria-label="Breadcrumb" className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <ol className="flex items-center gap-1.5 sm:gap-2 min-w-max text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-neutral-500">
        {resolvedItems.map((item, index) => {
          const isLast = index === resolvedItems.length - 1 || !item.href;
          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="text-neutral-900 truncate max-w-[200px] md:max-w-[400px]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href || "#"} className="hover:text-neutral-900 transition-colors py-1 inline-flex items-center">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  if (variant === "inline") {
    return <div className={cn("w-full", className)}>{breadcrumbContent}</div>;
  }

  return (
    <div className={cn("w-full bg-white border-b border-neutral-100/50", className)}>
      <Container className="py-2.5">
        {breadcrumbContent}
      </Container>
    </div>
  );
}

