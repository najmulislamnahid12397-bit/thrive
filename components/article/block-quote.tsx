import React from "react";
import { cn } from "@/lib/utils";

interface BlockQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
  className?: string;
}

export function BlockQuote({ children, author, role, className }: BlockQuoteProps) {
  return (
    <blockquote className={cn("my-6 sm:my-8 md:my-10 pl-4 sm:pl-5 md:pl-6 border-l-[3px] sm:border-l-4 border-neutral-300 italic", className)}>
      <p className="text-lg sm:text-xl md:text-2xl font-serif text-neutral-800 leading-relaxed mb-3 sm:mb-4 break-words">
        &ldquo;{children}&rdquo;
      </p>
      {(author || role) && (
        <footer className="text-xs sm:text-sm md:text-base font-sans not-italic font-medium text-neutral-600">
          — {author}
          {role && <span className="text-neutral-400 font-normal block sm:inline mt-0.5 sm:mt-0">, {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
