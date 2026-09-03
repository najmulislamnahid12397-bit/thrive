"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ArticleReadingProgressProps {
  /**
   * Optional custom CSS classes for the container or bar
   */
  className?: string;
  barClassName?: string;
  /**
   * Optional height in pixels or Tailwind classes (default is 2px for subtlety)
   */
  height?: number | string;
}

export function ArticleReadingProgress({
  className,
  barClassName,
}: ArticleReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const totalDocHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const maxScroll = totalDocHeight - viewportHeight;

      if (maxScroll > 0) {
        const currentProgress = (scrollY / maxScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    const handleResize = () => {
      calculateProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial calculation
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[2.5px] w-full bg-transparent pointer-events-none transition-opacity duration-300",
        className
      )}
    >
      <div
        className={cn(
          "h-full bg-neutral-900 transition-[width] duration-100 ease-out",
          barClassName
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ArticleReadingProgress;
