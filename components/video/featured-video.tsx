import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { Video } from "@/lib/types/video";
import { VideoThumbnail } from "@/components/video/video-thumbnail";
import { VideoMeta } from "@/components/video/video-meta";
import { CategoryBadge } from "@/components/ui/editorial";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FeaturedVideoProps {
  video: Video;
  className?: string;
  theme?: "light" | "dark";
  priority?: boolean;
  badge?: string;
  ctaText?: string;
}

export function FeaturedVideo({
  video,
  className,
  theme = "light",
  priority = true,
  badge,
  ctaText = "Watch Video",
}: FeaturedVideoProps) {
  const isDark = theme === "dark";
  const titleId = `featured-video-title-${video.id || video.slug}`;
  const displayBadge = badge || (video.featured ? "Featured" : undefined);
  const description = video.description || video.shortDescription;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative overflow-hidden border transition-all duration-300",
        isDark
          ? "bg-neutral-900 border-neutral-800 text-white"
          : "bg-white border-neutral-200 text-neutral-900 shadow-sm",
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Media Stage (7 cols on desktop) */}
        <div className="lg:col-span-7 relative bg-neutral-950 flex flex-col justify-center">
          <Link
            href={`/videos/${video.slug}`}
            className="block relative w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 z-10"
            aria-label={`Watch ${video.title} (${video.duration || ""})`}
          >
            <VideoThumbnail
              src={video.thumbnail}
              alt={video.thumbnailAlt || `Featured video: ${video.title}`}
              duration={video.duration}
              category={video.category}
              badge={displayBadge}
              featured={true}
              aspectRatio="video"
              priority={priority}
              size="full"
              className="w-full"
            />
          </Link>
        </div>

        {/* Right Column: Editorial Dossier (5 cols on desktop) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between">
          <div className="space-y-4 sm:space-y-5">
            {/* Category & Topic Meta */}
            <div className="flex flex-wrap items-center gap-2.5">
              {video.category && (
                <CategoryBadge
                  variant="solid"
                  className={cn(
                    isDark
                      ? "bg-white text-neutral-900 border-none"
                      : "bg-neutral-900 text-white border-none",
                    "text-xs px-2.5 py-1 font-semibold tracking-wide"
                  )}
                >
                  {video.category}
                </CategoryBadge>
              )}
              {video.topics && video.topics.length > 0 && (
                <span
                  className={cn(
                    "text-xs font-mono tracking-wider uppercase",
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  )}
                >
                  {video.topics[0]}
                </span>
              )}
            </div>

            {/* Large Editorial Headline */}
            <h2
              id={titleId}
              className={cn(
                "font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight leading-[1.15] transition-colors duration-200",
                isDark
                  ? "text-white group-hover:text-neutral-300"
                  : "text-neutral-900 group-hover:text-neutral-600"
              )}
            >
              <Link
                href={`/videos/${video.slug}`}
                className="focus:outline-none focus-visible:underline decoration-neutral-400 underline-offset-4"
              >
                {video.title}
              </Link>
            </h2>

            {/* Synopsis / Description */}
            {description && (
              <p
                className={cn(
                  "text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3 sm:line-clamp-4 max-w-2xl font-sans",
                  isDark ? "text-neutral-300" : "text-neutral-600"
                )}
              >
                {description}
              </p>
            )}

            {/* Presenter / Author Meta (if provided) */}
            {video.author && (
              <div className="pt-2 flex items-center gap-3">
                {video.author.avatar ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800">
                    <Image
                      src={video.author.avatar}
                      alt={video.author.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : null}
                <div className="min-w-0">
                  <div
                    className={cn(
                      "text-xs sm:text-sm font-semibold font-sans truncate",
                      isDark ? "text-neutral-200" : "text-neutral-900"
                    )}
                  >
                    {video.author.name}
                  </div>
                  {video.author.role && (
                    <div
                      className={cn(
                        "text-[10px] sm:text-xs font-mono tracking-wider uppercase truncate",
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      )}
                    >
                      {video.author.role}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions & Publication Details */}
          <div
            className={cn(
              "pt-6 mt-6 sm:mt-8 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4",
              isDark ? "border-neutral-800" : "border-neutral-100"
            )}
          >
            <VideoMeta
              video={video}
              variant="inline"
              showCategory={false}
              showAuthor={false}
              showPublishedDate={true}
              showUpdatedDate={true}
              showDuration={true}
              showViews={true}
              theme={isDark ? "dark" : "light"}
            />

            <Link
              href={`/videos/${video.slug}`}
              className={cn(
                buttonVariants({ variant: isDark ? "secondary" : "primary", size: "sm" }),
                "gap-2 shrink-0 rounded-none font-mono uppercase tracking-wider text-xs inline-flex items-center justify-center py-2.5 px-4"
              )}
            >
              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              {ctaText}
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
