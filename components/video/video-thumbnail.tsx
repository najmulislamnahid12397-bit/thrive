"use client";

import * as React from "react";
import Image from "next/image";
import { Play, Film } from "lucide-react";
import { cn } from "@/lib/utils";

export type VideoAspectRatio = "video" | "cinematic" | "standard" | "square";

export interface VideoThumbnailProps {
  /**
   * Thumbnail image URL (mock images).
   */
  src?: string;
  /**
   * Accessible image description.
   */
  alt: string;
  /**
   * Formatted duration string (e.g. "14:20"). Rendered in bottom-right badge.
   */
  duration?: string;
  /**
   * Optional category label (e.g. "Neuroscience", "Public Health"). Rendered in top-left badge.
   */
  category?: string;
  /**
   * Optional custom editorial badge override (e.g. "Featured Broadcast", "Special Investigation").
   */
  badge?: string;
  /**
   * Whether this thumbnail is in featured mode.
   * Promotes play icon to hero size, enhances contrast vignette, and enables live pulse indicator.
   */
  featured?: boolean;
  /**
   * Aspect ratio preset. Default is "video" (16:9).
   * Ensures consistent aspect ratio between regular, featured, and related videos.
   */
  aspectRatio?: VideoAspectRatio;
  /**
   * Whether to show the play icon overlay. Default is true.
   */
  showPlayIcon?: boolean;
  /**
   * Explicit play icon size override. If not set, automatically determined by featured/size.
   */
  playSize?: "default" | "sm" | "md" | "lg" | "hero";
  /**
   * Optional preset width constraint ("sm", "md", "lg", "full"). Default is "full".
   */
  size?: "sm" | "md" | "lg" | "full";
  /**
   * Optional watch progress percentage (0 to 100).
   */
  progressPercent?: number;
  /**
   * Next.js Image priority attribute for above-the-fold media. Default is false.
   */
  priority?: boolean;
  /**
   * Custom responsive sizes attribute override for Next.js Image.
   */
  sizes?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
  /**
   * Additional CSS classes applied directly to the Next.js Image element.
   */
  imageClassName?: string;
}

const ASPECT_RATIO_CLASSES: Record<VideoAspectRatio, string> = {
  video: "aspect-video", // 16:9 - Default consistent standard across regular, featured, and related videos
  cinematic: "aspect-[21/9]", // 21:9 ultra-wide
  standard: "aspect-[4/3]", // 4:3 documentary standard
  square: "aspect-square", // 1:1
};

export function VideoThumbnail({
  src,
  alt,
  duration,
  category,
  badge,
  featured = false,
  aspectRatio = "video",
  showPlayIcon = true,
  playSize,
  size = "full",
  progressPercent,
  priority = false,
  sizes,
  className,
  imageClassName,
}: VideoThumbnailProps) {
  const [imageError, setImageError] = React.useState(false);

  // Compute responsive sizes if not explicitly provided
  const computedSizes = React.useMemo(() => {
    if (sizes) return sizes;
    if (featured) {
      return "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px";
    }
    switch (size) {
      case "sm":
        return "(max-width: 640px) 112px, 140px";
      case "md":
        return "(max-width: 640px) 160px, (max-width: 1024px) 220px, 260px";
      case "lg":
        return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px";
      case "full":
      default:
        return "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw";
    }
  }, [sizes, featured, size]);

  // Compute active play icon scale
  const effectivePlaySize = React.useMemo(() => {
    if (playSize) return playSize;
    if (featured) return "hero";
    if (size === "sm") return "sm";
    if (size === "md") return "md";
    if (size === "lg") return "lg";
    return "default";
  }, [playSize, featured, size]);

  const hasValidSrc = typeof src === "string" && src.trim().length > 0 && !imageError;
  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio] || ASPECT_RATIO_CLASSES.video;

  const displayBadgeText = badge || (featured && !category ? "Featured Broadcast" : undefined);

  return (
    <div
      className={cn(
        // The container enforces exact aspect ratio & dimensions to guarantee zero layout shifts
        "group/thumb relative overflow-hidden shrink-0 select-none bg-neutral-900",
        aspectClass,
        size === "sm" && "w-24 sm:w-28 md:w-32",
        size === "md" && "w-36 sm:w-44 md:w-52",
        size === "lg" && "w-64 sm:w-80 md:w-96",
        size === "full" && "w-full",
        className
      )}
    >
      {/* 1. Responsive Image / Fallback Container */}
      {hasValidSrc ? (
        <Image
          src={src}
          alt={alt || "Video preview thumbnail"}
          fill
          sizes={computedSizes}
          priority={priority}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={cn(
            "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover/thumb:scale-[1.03] opacity-90 group-hover:opacity-100 group-hover/thumb:opacity-100",
            imageClassName
          )}
        />
      ) : (
        /* Zero-shift Editorial Fallback Slate */
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center text-neutral-500 p-4">
          <Film className="w-8 h-8 opacity-40 mb-1.5 stroke-[1.5]" aria-hidden="true" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-medium">
            Thryve Video
          </span>
        </div>
      )}

      {/* 2. Editorial Gradient Vignette for Consistent Legibility */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-300",
          featured
            ? "bg-gradient-to-t from-black/85 via-black/30 to-black/50 group-hover:opacity-90 group-hover/thumb:opacity-90"
            : "bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:opacity-85 group-hover/thumb:opacity-85"
        )}
      />

      {/* 3. Optional Category or Editorial Badge (Top-Left) */}
      {(displayBadgeText || category) && (
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          {displayBadgeText ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/85 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-emerald-400 uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              {displayBadgeText}
            </span>
          ) : category ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/85 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-white/95 uppercase shadow-sm">
              {featured && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              )}
              {category}
            </span>
          ) : null}
        </div>
      )}

      {/* 4. Play Icon Badge (Center) */}
      {showPlayIcon && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className={cn(
              "rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border transition-all duration-300 ease-out group-hover:scale-105 group-hover/thumb:scale-105 group-hover:bg-black/85 group-hover/thumb:bg-black/85 shadow-md",
              effectivePlaySize === "hero"
                ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shadow-2xl border-white/40 bg-black/70 group-hover:border-white"
                : effectivePlaySize === "lg"
                ? "w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 shadow-xl border-white/30"
                : effectivePlaySize === "md"
                ? "w-10 h-10 sm:w-12 sm:h-12 border-white/20"
                : effectivePlaySize === "sm"
                ? "w-7 h-7 sm:w-8 sm:h-8 border-white/20"
                : "w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 border-white/20"
            )}
          >
            <Play
              className={cn(
                "fill-white text-white transition-transform duration-300",
                effectivePlaySize === "hero"
                  ? "w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 ml-1 sm:ml-1.5"
                  : effectivePlaySize === "lg"
                  ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ml-0.5 sm:ml-1"
                  : effectivePlaySize === "md"
                  ? "w-4 h-4 sm:w-5 sm:h-5 ml-0.5"
                  : effectivePlaySize === "sm"
                  ? "w-3 h-3 ml-0.5"
                  : "w-4 h-4 sm:w-5 sm:h-5 ml-0.5"
              )}
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* 5. Duration Pill (Bottom-Right) */}
      {duration && (
        <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 z-10 bg-black/85 backdrop-blur-md border border-white/15 px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[10px] sm:text-[11px] font-mono font-semibold text-white tracking-wider pointer-events-none shadow-sm tabular-nums">
          {duration}
        </div>
      )}

      {/* 6. Optional Watch Progress Bar (Bottom Edge) */}
      {progressPercent !== undefined && progressPercent > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-white/20 z-10 pointer-events-none overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      )}
    </div>
  );
}
