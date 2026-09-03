"use client";

import * as React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { MobileMenu } from "@/components/layout/mobile-menu";

const MAIN_NAV = [
  { label: "Home", href: "/", hideOnTablet: false },
  { label: "Latest", href: "/articles", hideOnTablet: false },
  { label: "Topics", href: "/topics", hideOnTablet: false },
  { label: "Videos", href: "/videos", hideOnTablet: true },
  { label: "Guides", href: "/guides", hideOnTablet: true },
  { label: "Apps", href: "/apps", hideOnTablet: true },
  { label: "About", href: "/about", hideOnTablet: true },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-neutral-900 focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium outline-none"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 w-full border-b border-neutral-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: Logo & Main Navigation */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="font-sans text-xl font-bold tracking-tight text-neutral-900 shrink-0">
              THRYVE
            </Link>
            
            <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
              {MAIN_NAV.map((item) => {
                const isActive = item.href === "/" 
                  ? pathname === "/" 
                  : (pathname && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-widest transition-colors",
                      isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900",
                      item.hideOnTablet && "hidden lg:block"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions & Mobile Trigger */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/search">
              <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-900" aria-label="Search">
                <Icon icon={Search} size="base" />
              </Button>
            </Link>
            
            <Link href="/newsletter" className="hidden sm:inline-flex ml-1 lg:ml-4">
              <Button variant="primary" size="sm">
                Subscribe
              </Button>
            </Link>
            
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
