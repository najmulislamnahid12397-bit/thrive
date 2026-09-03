"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
  CardLink,
  CardCategory,
} from "@/components/ui/card";
import { CategoryBadge } from "@/components/ui/editorial";
import { VideoThumbnail } from "@/components/video/video-thumbnail";
import { VideoMeta } from "@/components/video/video-meta";
import type { Video } from "@/lib/types/video";
import { useVideoProgress } from "@/lib/video-progress";

export interface VideoCardProps {
  video: Video;
  variant?: "default" | "featured" | "horizontal" | "compact";
  theme?: "light" | "dark";
  showDescription?: boolean;
  className?: string;
  priority?: boolean;
}

export function VideoCard({
  video,
  variant = "default",
  theme = "light",
  showDescription,
  className,
  priority = false,
}: VideoCardProps) {
  const isDark = theme === "dark";
  const storedProgress = useVideoProgress(video.slug);
  const progressPercent = storedProgress && storedProgress.percent > 0 ? storedProgress.percent : undefined;

  // Determine whether description should be rendered
  const shouldRenderDescription =
    showDescription !== undefined
      ? showDescription
      : variant === "featured"
      ? true
      : variant === "default"
      ? Boolean(video.shortDescription || video.description)
      : variant === "horizontal"
      ? Boolean(video.shortDescription)
      : false;

  const descriptionText =
    variant === "featured"
      ? video.description || video.shortDescription
      : video.shortDescription || video.description;

  // Build an accessible, descriptive label for screen readers
  const accessibleLabel = `Watch video: ${video.title}${
    video.duration ? `, Duration: ${video.duration}` : ""
  }${video.category ? `, Category: ${video.category}` : ""}`;

  return (
    <Card
      variant={
        variant === "featured"
          ? "featured"
          : variant === "horizontal" || variant === "compact"
          ? "horizontal"
          : "default"
      }
      className={cn(
        "border-none bg-transparent group",
        (variant === "horizontal" || variant === "compact") &&
          "items-start sm:items-center gap-3 sm:gap-4 md:gap-5",
        className
      )}
    >
      {/* Thumbnail with Play Icon & Duration */}
      <div
        className={cn(
          "shrink-0",
          variant === "horizontal"
            ? "w-28 sm:w-36 md:w-44 lg:w-48"
            : variant === "compact"
            ? "w-24 sm:w-28 md:w-32"
            : "w-full"
        )}
      >
        <VideoThumbnail
          src={video.thumbnail}
          alt={video.thumbnailAlt || `Thumbnail for ${video.title}`}
          duration={video.duration}
          featured={variant === "featured"}
          aspectRatio="video"
          priority={priority}
          size="full"
          progressPercent={progressPercent}
        />
      </div>

      {/* Content Block */}
      <CardContent
        className={cn(
          "flex flex-col min-w-0",
          variant === "horizontal" || variant === "compact"
            ? "mt-0 justify-center gap-1 sm:gap-1.5 flex-1"
            : "mt-3 gap-2"
        )}
      >
        {/* Category Badge */}
        {video.category && (
          <CardCategory
            className={cn(
              "z-20 relative",
              variant === "compact" ? "mb-0" : "mb-0.5"
            )}
          >
            <CategoryBadge
              variant="solid"
              className={cn(
                isDark
                  ? "bg-white text-neutral-900 border-none"
                  : "bg-neutral-900 text-white border-none",
                (variant === "horizontal" || variant === "compact") &&
                  "text-[9px] sm:text-[10px] px-1.5 py-0.5 font-semibold tracking-wider"
              )}
            >
              {video.category}
            </CategoryBadge>
          </CardCategory>
        )}

        {/* Video Title */}
        <CardTitle
          size={
            variant === "featured"
              ? "lg"
              : variant === "compact"
              ? "sm"
              : "default"
          }
          className={cn(
            "transition-colors duration-200",
            isDark
              ? "text-white group-hover:text-neutral-300"
              : "text-neutral-900 group-hover:text-neutral-600",
            variant === "compact" &&
              "text-xs sm:text-sm font-medium leading-snug line-clamp-2",
            variant === "horizontal" &&
              "text-sm sm:text-base md:text-lg font-medium leading-snug line-clamp-2",
            variant === "default" &&
              "text-base sm:text-lg md:text-xl font-medium leading-snug line-clamp-2",
            variant === "featured" &&
              "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] tracking-tight"
          )}
        >
          {video.title}
        </CardTitle>

        {/* Description (where appropriate) */}
        {shouldRenderDescription && descriptionText && (
          <>
            {variant === "featured" ? (
              <CardDescription
                className={cn(
                  "text-sm sm:text-base md:text-lg line-clamp-3 sm:line-clamp-4 leading-relaxed",
                  isDark ? "text-neutral-300" : "text-neutral-600"
                )}
              >
                {descriptionText}
              </CardDescription>
            ) : variant === "horizontal" ? (
              <p
                className={cn(
                  "hidden sm:block text-xs line-clamp-2 leading-relaxed",
                  isDark ? "text-neutral-400" : "text-neutral-600"
                )}
              >
                {descriptionText}
              </p>
            ) : (
              <p
                className={cn(
                  "text-xs sm:text-sm line-clamp-2 leading-relaxed",
                  isDark ? "text-neutral-400" : "text-neutral-600"
                )}
              >
                {descriptionText}
              </p>
            )}
          </>
        )}

        {/* Publication Date & Metadata Footer */}
        <CardFooter
          className={cn(
            "pt-1",
            (variant === "horizontal" || variant === "compact") && "pt-0.5"
          )}
        >
          <VideoMeta
            video={video}
            variant="compact"
            showCategory={false}
            showAuthor={true}
            showDuration={false}
            theme={isDark ? "dark" : "light"}
          />
        </CardFooter>
      </CardContent>

      {/* Accessible, keyboard-friendly link to /videos/[slug] */}
      <CardLink
        href={`/videos/${video.slug}`}
        aria-label={accessibleLabel}
        className={cn(
          "transition-shadow duration-200",
          isDark
            ? "focus-visible:ring-white focus-visible:ring-offset-neutral-900"
            : "focus-visible:ring-neutral-900 focus-visible:ring-offset-white"
        )}
      />
    </Card>
  );
}
