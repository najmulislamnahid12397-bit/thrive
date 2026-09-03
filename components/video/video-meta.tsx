"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Calendar, Tag as TagIcon } from "lucide-react";
import { Video, VideoAuthor } from "@/lib/types/video";
import { CategoryBadge, DateLabel, AuthorMeta, Metadata } from "@/components/ui/editorial";
import { cn } from "@/lib/utils";

export type VideoMetaVariant = "inline" | "compact" | "featured" | "detail";

export interface VideoMetaAuthor {
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
}

export interface VideoMetaProps {
  /**
   * Video object containing metadata fields.
   */
  video?: Partial<Video>;

  /**
   * Explicit metadata values or overrides.
   */
  category?: string;
  author?: VideoAuthor | VideoMetaAuthor | string;
  publishedAt?: string | Date;
  updatedAt?: string | Date;
  duration?: string;
  views?: string | number;
  title?: string;
  description?: string;
  topics?: string[];

  /**
   * Presentation layout variant:
   * - "inline": Single-line horizontal metadata row with bullet separators.
   * - "compact": Compact editorial block (author, dates, duration, views) for video cards and sidebars.
   * - "featured": High-contrast broadsheet editorial dossier for hero cards and featured showcases.
   * - "detail": Comprehensive editorial dossier for video detail pages (/videos/[slug]) with title, author dossier, summary, and topics.
   *
   * Defaults to "detail" if video title/description are present and no variant is specified, otherwise "compact".
   */
  variant?: VideoMetaVariant;

  /**
   * Color theme: "light" (default) or "dark" (for dark video cards or theater mode).
   */
  theme?: "light" | "dark";

  /**
   * Fine-grained visibility toggles.
   */
  showCategory?: boolean;
  showAuthor?: boolean;
  showAuthorAvatar?: boolean;
  showAuthorRole?: boolean;
  showPublishedDate?: boolean;
  showUpdatedDate?: boolean;
  showDuration?: boolean;
  showViews?: boolean;

  /**
   * Whether category badge links to /topics/[category]. Default: true.
   */
  linkCategory?: boolean;

  /**
   * Custom CSS classes.
   */
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function VideoMeta({
  video,
  category: propCategory,
  author: propAuthor,
  publishedAt: propPublishedAt,
  updatedAt: propUpdatedAt,
  duration: propDuration,
  views: propViews,
  title: propTitle,
  description: propDescription,
  topics: propTopics,
  variant,
  theme = "light",
  showCategory = true,
  showAuthor = true,
  showAuthorAvatar = true,
  showAuthorRole = true,
  showPublishedDate = true,
  showUpdatedDate = true,
  showDuration = true,
  showViews = true,
  linkCategory = true,
  className,
}: VideoMetaProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Normalize data between direct props and video object
  const category = propCategory ?? video?.category;
  const rawAuthor = propAuthor ?? video?.author;
  const author: VideoMetaAuthor | null =
    typeof rawAuthor === "string"
      ? { name: rawAuthor }
      : rawAuthor
      ? {
          name: rawAuthor.name,
          role: rawAuthor.role,
          avatar: rawAuthor.avatar,
          bio: rawAuthor.bio,
        }
      : null;

  const publishedAt = propPublishedAt ?? video?.publishedAt;
  const updatedAt = propUpdatedAt ?? video?.updatedAt;
  const duration = propDuration ?? video?.duration;
  const views = propViews ?? video?.views;
  const title = propTitle ?? video?.title;
  const description = propDescription ?? video?.description;
  const topics = propTopics ?? video?.topics;

  const isDark = theme === "dark";

  // Parse dates safely
  const parsedPublished = React.useMemo(() => {
    if (!publishedAt) return null;
    const d = publishedAt instanceof Date ? publishedAt : new Date(publishedAt);
    return !isNaN(d.getTime()) ? d : null;
  }, [publishedAt]);

  const parsedUpdated = React.useMemo(() => {
    if (!updatedAt) return null;
    const d = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
    return !isNaN(d.getTime()) ? d : null;
  }, [updatedAt]);

  // Determine effective variant
  const effectiveVariant: VideoMetaVariant =
    variant ?? (title && description ? "detail" : "compact");

  const authorName = author?.name;
  const authorRole = author?.role;
  const authorAvatar = author?.avatar;
  const authorBio = author?.bio;

  const isLongDescription = Boolean(description && description.length > 280);

  // --------------------------------------------------------------------------
  // Variant: INLINE (Single-line horizontal metadata string)
  // --------------------------------------------------------------------------
  if (effectiveVariant === "inline") {
    return (
      <div
        role="group"
        aria-label="Video metadata"
        className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs", className)}
      >
        {showCategory && category && (
          linkCategory ? (
            <Link
              href={`/topics/${encodeURIComponent(category.toLowerCase())}`}
              className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
            >
              <CategoryBadge
                variant={isDark ? "outline" : "solid"}
                className={cn(
                  "text-[9px] sm:text-[10px] px-1.5 py-0.5",
                  isDark
                    ? "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                )}
              >
                {category}
              </CategoryBadge>
            </Link>
          ) : (
            <CategoryBadge
              variant={isDark ? "outline" : "solid"}
              className={cn(
                "text-[9px] sm:text-[10px] px-1.5 py-0.5",
                isDark ? "border-neutral-700 text-neutral-300" : "bg-neutral-900 text-white"
              )}
            >
              {category}
            </CategoryBadge>
          )
        )}

        <Metadata className={isDark ? "text-neutral-400" : "text-neutral-500"}>
          {showAuthor && authorName && (
            <AuthorMeta
              name={authorName}
              className={isDark ? "text-neutral-200" : "text-neutral-900"}
            />
          )}

          {showPublishedDate && parsedPublished && (
            <DateLabel
              date={parsedPublished}
              className={isDark ? "text-neutral-400" : "text-neutral-500"}
            />
          )}

          {showUpdatedDate && parsedUpdated && (
            <span className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-[10px] sm:text-[11px]">
              <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>UPDATED</span>
              <DateLabel
                date={parsedUpdated}
                className={isDark ? "text-neutral-300" : "text-neutral-600"}
              />
            </span>
          )}

          {showDuration && duration && (
            <span className={cn("inline-flex items-center gap-1 font-mono tracking-tight", isDark ? "text-neutral-300" : "text-neutral-600")}>
              <Clock className="w-3 h-3 opacity-70" aria-hidden="true" />
              <span>{duration}</span>
            </span>
          )}

          {showViews && views && (
            <span className={cn("inline-flex items-center gap-1 font-mono tracking-tight", isDark ? "text-neutral-400" : "text-neutral-500")}>
              <Eye className="w-3 h-3 opacity-70" aria-hidden="true" />
              <span>{typeof views === "number" ? views.toLocaleString() : views}</span>
            </span>
          )}
        </Metadata>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: COMPACT (Optimized for Video Cards & Standard Previews)
  // --------------------------------------------------------------------------
  if (effectiveVariant === "compact") {
    return (
      <div
        role="group"
        aria-label="Video metadata"
        className={cn("space-y-1.5 min-w-0 text-left", className)}
      >
        {showCategory && category && (
          <div className="mb-0.5">
            {linkCategory ? (
              <Link
                href={`/topics/${encodeURIComponent(category.toLowerCase())}`}
                className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
              >
                <CategoryBadge
                  variant={isDark ? "outline" : "solid"}
                  className={cn(
                    "text-[9px] sm:text-[10px] px-1.5 py-0.5",
                    isDark
                      ? "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  )}
                >
                  {category}
                </CategoryBadge>
              </Link>
            ) : (
              <CategoryBadge
                variant={isDark ? "outline" : "solid"}
                className={cn(
                  "text-[9px] sm:text-[10px] px-1.5 py-0.5",
                  isDark ? "border-neutral-700 text-neutral-300" : "bg-neutral-900 text-white"
                )}
              >
                {category}
              </CategoryBadge>
            )}
          </div>
        )}

        <Metadata className={cn("text-[10px] sm:text-[11px]", isDark ? "text-neutral-400" : "text-neutral-500")}>
          {showAuthor && authorName && (
            <AuthorMeta
              name={authorName}
              className={cn(
                "text-[10px] sm:text-[11px]",
                isDark ? "text-neutral-200" : "text-neutral-900"
              )}
            />
          )}

          {showPublishedDate && parsedPublished && (
            <DateLabel
              date={parsedPublished}
              className={cn(
                "text-[10px] sm:text-[11px]",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            />
          )}

          {showUpdatedDate && parsedUpdated && (
            <span className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-[10px] sm:text-[11px]">
              <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>UPDATED</span>
              <DateLabel
                date={parsedUpdated}
                className={isDark ? "text-neutral-400" : "text-neutral-500"}
              />
            </span>
          )}

          {showDuration && duration && (
            <span className={cn("inline-flex items-center gap-1 font-mono tracking-tight", isDark ? "text-neutral-300" : "text-neutral-600")}>
              <Clock className="w-3 h-3 opacity-70" aria-hidden="true" />
              <span>{duration}</span>
            </span>
          )}

          {showViews && views && (
            <span className={cn("inline-flex items-center gap-1 font-mono tracking-tight", isDark ? "text-neutral-400" : "text-neutral-500")}>
              <Eye className="w-3 h-3 opacity-70" aria-hidden="true" />
              <span>{typeof views === "number" ? views.toLocaleString() : views}</span>
            </span>
          )}
        </Metadata>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: FEATURED (High-contrast Broadsheet Showcase for FeaturedVideo)
  // --------------------------------------------------------------------------
  if (effectiveVariant === "featured") {
    return (
      <div
        role="group"
        aria-label="Featured video metadata"
        className={cn("space-y-4", className)}
      >
        {/* Category Badge */}
        {showCategory && category && (
          <div>
            {linkCategory ? (
              <Link
                href={`/topics/${encodeURIComponent(category.toLowerCase())}`}
                className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <CategoryBadge
                  variant={isDark ? "outline" : "solid"}
                  className={cn(
                    "text-xs px-2.5 py-1 tracking-widest",
                    isDark
                      ? "border-neutral-700 text-neutral-100 hover:border-neutral-400"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  )}
                >
                  {category}
                </CategoryBadge>
              </Link>
            ) : (
              <CategoryBadge
                variant={isDark ? "outline" : "solid"}
                className={cn(
                  "text-xs px-2.5 py-1 tracking-widest",
                  isDark ? "border-neutral-700 text-neutral-100" : "bg-neutral-900 text-white"
                )}
              >
                {category}
              </CategoryBadge>
            )}
          </div>
        )}

        {/* Presenter / Author Meta Row */}
        {showAuthor && authorName && (
          <div className="flex items-center gap-3 pt-1">
            {showAuthorAvatar && (
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800">
                {authorAvatar ? (
                  <Image
                    src={authorAvatar}
                    alt={authorName}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    {getInitials(authorName)}
                  </div>
                )}
              </div>
            )}
            <div className="min-w-0">
              <AuthorMeta
                name={authorName}
                className={cn(
                  "text-xs sm:text-sm font-semibold truncate block",
                  isDark ? "text-neutral-200" : "text-neutral-900"
                )}
              />
              {showAuthorRole && authorRole && (
                <div
                  className={cn(
                    "text-[10px] sm:text-xs font-mono tracking-wider uppercase truncate",
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  )}
                >
                  {authorRole}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Metadata Strip: Published Date, Updated Date, Duration */}
        <div
          className={cn(
            "pt-4 border-t flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs",
            isDark ? "border-neutral-800 text-neutral-400" : "border-neutral-200 text-neutral-500"
          )}
        >
          <Metadata className={isDark ? "text-neutral-400" : "text-neutral-500"}>
            {showPublishedDate && parsedPublished && (
              <DateLabel
                date={parsedPublished}
                className={isDark ? "text-neutral-400" : "text-neutral-500"}
              />
            )}

            {showUpdatedDate && parsedUpdated && (
              <span className="inline-flex items-center gap-1 font-mono uppercase tracking-wider text-[10px] sm:text-[11px]">
                <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>UPDATED</span>
                <DateLabel
                  date={parsedUpdated}
                  className={isDark ? "text-neutral-300" : "text-neutral-600"}
                />
              </span>
            )}

            {showDuration && duration && (
              <span className={cn("inline-flex items-center gap-1 font-mono tracking-tight", isDark ? "text-neutral-300" : "text-neutral-600")}>
                <Clock className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                <span>{duration}</span>
              </span>
            )}

            {showViews && views && (
              <span className={cn("inline-flex items-center gap-1 font-mono tracking-tight", isDark ? "text-neutral-400" : "text-neutral-500")}>
                <Eye className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                <span>{typeof views === "number" ? views.toLocaleString() : views} views</span>
              </span>
            )}
          </Metadata>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: DETAIL (Full Broadsheet Dossier for Video Detail Page /videos/[slug])
  // --------------------------------------------------------------------------
  return (
    <section className={cn("space-y-6 sm:space-y-8", className)} aria-label="Video details and overview">
      {/* 1. Category & Date/Duration Header */}
      <div className="flex flex-wrap items-center gap-3">
        {showCategory && category && (
          <Link
            href={`/topics/${encodeURIComponent(category.toLowerCase())}`}
            className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <CategoryBadge
              variant="solid"
              className="bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              {category}
            </CategoryBadge>
          </Link>
        )}

        <span className="text-neutral-300 select-none" aria-hidden="true">·</span>

        <Metadata className="text-xs font-mono text-neutral-500">
          {showPublishedDate && parsedPublished && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <DateLabel date={parsedPublished} />
            </span>
          )}

          {showUpdatedDate && parsedUpdated && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] tracking-wider uppercase">
              <span className="text-neutral-400">UPDATED</span>
              <DateLabel date={parsedUpdated} className="text-neutral-600" />
            </span>
          )}

          {showDuration && duration && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {duration}
            </span>
          )}

          {showViews && views && (
            <span className="inline-flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              {typeof views === "number" ? views.toLocaleString() : views} views
            </span>
          )}
        </Metadata>
      </div>

      {/* 2. Main Video Headline */}
      {title && (
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-tight text-neutral-900">
          {title}
        </h1>
      )}

      {/* 3. Presenter / Author Bio Dossier */}
      {showAuthor && authorName && (
        <div className="flex items-center gap-4 py-4 border-y border-neutral-200">
          {showAuthorAvatar && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
              {authorAvatar ? (
                <Image
                  src={authorAvatar}
                  alt={`Portrait of ${authorName}`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white font-mono text-xs font-bold">
                  {getInitials(authorName)}
                </div>
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <AuthorMeta
              name={authorName}
              className="text-sm font-bold text-neutral-900 leading-snug block"
            />
            {showAuthorRole && authorRole && (
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mt-0.5">
                {authorRole}
              </div>
            )}
            {authorBio && (
              <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                {authorBio}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 4. Executive Summary */}
      {description && (
        <div className="space-y-3">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400">
            Executive Summary
          </h2>
          <div
            className={cn(
              "font-sans text-base sm:text-lg text-neutral-700 leading-relaxed",
              !isExpanded && isLongDescription && "line-clamp-3"
            )}
          >
            {description}
          </div>
          {isLongDescription && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-900 hover:text-neutral-600 underline underline-offset-4 focus:outline-none"
            >
              {isExpanded ? "Collapse Summary" : "Read Full Summary"}
            </button>
          )}
        </div>
      )}

      {/* 5. Topic Tags */}
      {topics && topics.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="font-mono text-xs text-neutral-400 inline-flex items-center gap-1 mr-1">
            <TagIcon className="w-3 h-3" /> Topics:
          </span>
          {topics.map((t) => (
            <Link
              key={t}
              href={`/topics/${encodeURIComponent(t.toLowerCase())}`}
              className="text-xs font-mono px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors uppercase tracking-wider"
            >
              #{t}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
