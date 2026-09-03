import React from "react";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
  className?: string;
}

export function PullQuote({ children, author, role, className }: PullQuoteProps) {
  return (
    <aside className={cn("my-8 sm:my-12 lg:my-16 py-6 sm:py-8 md:py-10 px-4 sm:px-6 text-center border-y border-neutral-200/80", className)}>
      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-neutral-900 leading-snug mb-4 sm:mb-5 max-w-2xl mx-auto break-words">
        <span className="text-neutral-400">&ldquo;</span>
        {children}
        <span className="text-neutral-400">&rdquo;</span>
      </p>
      {(author || role) && (
        <footer className="text-sm sm:text-base md:text-lg font-sans not-italic font-medium text-neutral-600">
          — {author}
          {role && <span className="text-neutral-400 font-normal block sm:inline mt-1 sm:mt-0">, {role}</span>}
        </footer>
      )}
    </aside>
  );
}
