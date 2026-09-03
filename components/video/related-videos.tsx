import * as React from "react";
import Link from "next/link";
import { ArrowRight, Video as VideoIcon } from "lucide-react";
import { Video } from "@/lib/types/video";
import { VideoCard } from "@/components/video/video-card";
import { cn } from "@/lib/utils";

export interface RelatedVideosProps {
  /**
   * 3 to 6 videos related to the current video.
   */
  videos: Video[];
  /**
   * Optional custom section heading.
   */
  heading?: string;
  /**
   * Video category or topic context.
   */
  category?: string;
  /**
   * Mobile presentation mode:
   * - "scroll": Mobile horizontal touch-scrolling rail with snap alignment (default).
   * - "stack": Standard vertical stacking on mobile.
   */
  mobileLayout?: "scroll" | "stack";
  /**
   * Visual theme ("light" | "dark").
   */
  theme?: "light" | "dark";
  /**
   * Additional wrapper class names.
   */
  className?: string;
}

/**
 * Reusable RelatedVideos section.
 * Displays 3–6 companion video documentaries related to the current production.
 * Supports:
 * - Desktop grid (3 or 4 columns based on count)
 * - Tablet layout (2 columns)
 * - Mobile stacking / scrolling (horizontal swipe rail or vertical stack)
 * Uses the existing VideoCard component without duplicating card logic.
 */
export function RelatedVideos({
  videos,
  heading,
  category,
  mobileLayout = "scroll",
  theme = "light",
  className,
}: RelatedVideosProps) {
  if (!videos || videos.length === 0) return null;

  // Support 3 to 6 videos
  const displayVideos = videos.slice(0, 6);
  const count = displayVideos.length;
  const isDark = theme === "dark";

  const defaultHeading = category
    ? `Related Visual Investigations in ${category}`
    : "Recommended Video Documentaries";

  // Determine optimal desktop grid columns based on count
  const gridDesktopClass =
    count === 4
      ? "lg:grid-cols-4"
      : count >= 5
      ? "lg:grid-cols-3 xl:grid-cols-3"
      : "lg:grid-cols-3";

  return (
    <section
      aria-labelledby="related-videos-heading"
      className={cn("space-y-6", className)}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div
            className={cn(
              "flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest mb-1",
              isDark ? "text-neutral-400" : "text-neutral-400"
            )}
          >
            <VideoIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>More Visual Journalism</span>
          </div>
          <h2
            id="related-videos-heading"
            className={cn(
              "font-serif text-2xl sm:text-3xl font-normal tracking-tight",
              isDark ? "text-white" : "text-neutral-900"
            )}
          >
            {heading || defaultHeading}
          </h2>
        </div>

        <Link
          href="/videos"
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:underline shrink-0",
            isDark
              ? "text-neutral-200 hover:text-white"
              : "text-neutral-900 hover:text-neutral-600"
          )}
        >
          <span>Explore All Videos</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Video Cards Grid & Responsive Layout */}
      {mobileLayout === "scroll" ? (
        /* Mobile Horizontal Scroll Rail + Tablet 2-Col + Desktop 3/4-Col Grid */
        <div
          className={cn(
            "flex overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 gap-5 sm:gap-6 lg:gap-8 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-2",
            gridDesktopClass
          )}
        >
          {displayVideos.map((video) => (
            <div
              key={video.id || video.slug}
              className="w-[82vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
            >
              <VideoCard
                video={video}
                variant="default"
                theme={theme}
                showDescription={true}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Standard Responsive Stacking: Mobile 1-Col + Tablet 2-Col + Desktop 3/4-Col Grid */
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8",
            gridDesktopClass
          )}
        >
          {displayVideos.map((video) => (
            <VideoCard
              key={video.id || video.slug}
              video={video}
              variant="default"
              theme={theme}
              showDescription={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedVideos;
