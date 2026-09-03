import React from "react";
import { cn } from "@/lib/utils";
import { H4 } from "@/components/ui/typography";

export type CalloutIntent = "info" | "warning" | "neutral";

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  intent?: CalloutIntent;
  className?: string;
}

export function Callout({ children, title, intent = "neutral", className }: CalloutProps) {
  let bgColor = "bg-neutral-50";
  let borderColor = "border-neutral-200";
  
  if (intent === "info") {
    bgColor = "bg-blue-50/50";
    borderColor = "border-blue-200";
  } else if (intent === "warning") {
    bgColor = "bg-amber-50/50";
    borderColor = "border-amber-200";
  }

  return (
    <aside className={cn("my-6 sm:my-8 md:my-10 p-5 sm:p-6 md:p-8 rounded-xl border font-sans", bgColor, borderColor, className)}>
      {title && (
        <H4 className="mb-2.5 sm:mb-3 text-neutral-900 font-bold">
          {title}
        </H4>
      )}
      <div className="text-base sm:text-lg text-neutral-800 leading-relaxed mb-0">
        {children}
      </div>
    </aside>
  );
}
