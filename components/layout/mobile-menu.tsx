"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Latest", href: "/articles" },
  { label: "Topics", href: "/topics" },
  { label: "Videos", href: "/videos" },
  { label: "Guides", href: "/guides" },
  { label: "Apps", href: "/apps" },
  { label: "About", href: "/about" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Search", href: "/search" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  
  // Handle Body Scroll and Focus Trapping
  React.useEffect(() => {
    if (!isOpen) return;

    // Capture the trigger ref to restore focus later
    const triggerElement = triggerRef.current;

    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Focus management & keyboard trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Initial focus on the close button or first element to reset focus flow inside drawer
    setTimeout(() => {
      const closeButton = menuRef.current?.querySelector('button[aria-label="Close Menu"]') as HTMLElement;
      closeButton?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger when closed
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden flex items-center ml-1 sm:ml-2">
      <Button 
        ref={triggerRef}
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)} 
        aria-label="Open Menu"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="text-neutral-500 hover:text-neutral-900 -mr-2"
      >
        <Icon icon={Menu} size="lg" />
      </Button>
      
      {/* Overlay & Drawer */}
      <div 
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300",
          isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        )}
      >
        {/* Backdrop Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col border-l border-neutral-100 transform transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-100 shrink-0">
            <span className="font-sans text-xl font-bold tracking-tight">THRYVE</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              aria-label="Close Menu" 
              className="text-neutral-500 hover:text-neutral-900 -mr-2"
            >
              <Icon icon={X} size="lg" />
            </Button>
          </div>
          
          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
            <nav className="flex flex-col space-y-3 sm:space-y-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname && pathname.startsWith(item.href));
                return (
                  <Link 
                    key={item.label} 
                    href={item.href} 
                    className={cn(
                      "font-serif text-2xl sm:text-3xl font-medium transition-colors flex items-center py-1 min-h-[44px]",
                      isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    {isActive && (
                      <span className="ml-3 h-2 w-2 rounded-full bg-neutral-900" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </nav>
            
            {/* Drawer Footer */}
            <div className="mt-auto pt-8 sm:pt-10">
              <div className="border-t border-neutral-100 pt-6 sm:pt-8 pb-4 space-y-5 sm:space-y-6">
                <Link href="/newsletter" onClick={() => setIsOpen(false)}>
                  <Button fullWidth size="lg">Subscribe</Button>
                </Link>
                <div className="flex items-center gap-3 sm:gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500 justify-center">
                  <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-neutral-900 transition-colors py-2 inline-block">About</Link>
                  <span className="select-none">·</span>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-neutral-900 transition-colors py-2 inline-block">Contact</Link>
                  <span className="select-none">·</span>
                  <Link href="/terms-of-service" onClick={() => setIsOpen(false)} className="hover:text-neutral-900 transition-colors py-2 inline-block">Terms</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
