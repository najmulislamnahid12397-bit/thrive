import React from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  layout?: "full" | "wide" | "column";
  priority?: boolean;
  className?: string;
}

export function EditorialImage({ src, alt, caption, credit, layout = "wide", priority = false, className }: EditorialImageProps) {
  // Determine container width based on layout
  let containerClasses = "w-full mx-auto";
  let aspectClasses = "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]";

  if (layout === "full") {
    containerClasses = "w-full";
  } else if (layout === "wide") {
    containerClasses = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";
  } else if (layout === "column") {
    containerClasses = "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8";
    aspectClasses = "aspect-[4/3] md:aspect-[16/9]";
  }

  const markdownComponents = {
    a: ({ node, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) => (
      <a className="text-neutral-900 underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-900 transition-colors font-medium" {...props} />
    ),
    p: ({ node, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { node?: unknown }) => <span {...props} />,
  };

  return (
    <figure className={cn("w-full", className)}>
      <div className={cn(containerClasses)}>
        <div className={cn("relative w-full overflow-hidden bg-neutral-100", aspectClasses, layout === "full" ? "" : "sm:rounded-xl")}>
          {src ? (
            <Image
              src={src}
              alt={alt || "Editorial image"}
              fill
              className="object-cover"
              priority={priority}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-neutral-400">
              <span className="text-xs uppercase tracking-widest font-mono">Image placeholder</span>
            </div>
          )}
        </div>
        
        {(caption || credit) && (
          <figcaption className={cn(
            "mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-4 text-xs sm:text-sm text-neutral-500 font-sans max-w-3xl mx-auto",
            layout === "full" ? "px-4 sm:px-6 lg:px-8" : "px-1 sm:px-0"
          )}>
            {caption ? (
              <div className="flex-1 leading-relaxed">
                <Markdown components={markdownComponents}>{caption}</Markdown>
              </div>
            ) : <div className="flex-1" />}
            
            {credit && (
              <div className="text-neutral-400 text-[10px] sm:text-xs tracking-wider uppercase sm:text-right shrink-0 pt-0.5 font-medium">
                Photo: {credit}
              </div>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
