"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Clock, Calendar, Eye } from "lucide-react";
import { Video } from "@/lib/types/video";
import { VideoPlayer } from "./video-player";
import { CategoryBadge, DateLabel, AuthorMeta } from "@/components/ui/editorial";
import { VideoShare } from "./video-share";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export interface VideoTopSectionProps {
  /**
   * Complete video record containing metadata, author, and media sources.
   */
  video: Video;
  /**
   * Optional programmatic seek timestamp in seconds.
   */
  seekToTime?: number | null;
  /**
   * Playback time update callback.
   */
  onTimeUpdate?: (currentTime: number) => void;
  /**
   * Playback ended callback.
   */
  onEnded?: () => void;
  /**
   * Additional class names for the outer section.
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

/**
 * Top section of the Video Detail page (/videos/[slug]) adhering strictly to the broadsheet hierarchy:
 * 1. Breadcrumb
 * 2. Video player
 * 3. Category
 * 4. Title
 * 5. Description
 * 6. Author
 * 7. Date
 * 8. Duration
 * 9. Share actions
 */
export function VideoTopSection({
  video,
  seekToTime,
  onTimeUpdate,
  onEnded,
  className,
}: VideoTopSectionProps) {
  const publishedDate = React.useMemo(() => {
    if (!video.publishedAt) return null;
    const d = new Date(video.publishedAt);
    return !isNaN(d.getTime()) ? d : null;
  }, [video.publishedAt]);

  const updatedDate = React.useMemo(() => {
    if (!video.updatedAt) return null;
    const d = new Date(video.updatedAt);
    return !isNaN(d.getTime()) ? d : null;
  }, [video.updatedAt]);

  const descriptionText = video.description || video.shortDescription;

  return (
    <header className={cn("w-full bg-white text-neutral-900", className)} aria-label="Video Header">
      {/* ---------------------------------------------------------------------- */}
      {/* 1. Breadcrumb Navigation                                               */}
      {/* ---------------------------------------------------------------------- */}
      <nav
        aria-label="Breadcrumb"
        className="w-full border-b border-neutral-100 bg-neutral-50/60"
      >
        <Container className="py-2.5 sm:py-3">
          <ol className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-500 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <li className="shrink-0">
              <Link
                href="/"
                className="hover:text-neutral-900 transition-colors py-1 inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral-300 shrink-0">
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="shrink-0">
              <Link
                href="/videos"
                className="hover:text-neutral-900 transition-colors py-1 inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
              >
                Videos
              </Link>
            </li>
            {video.category && (
              <>
                <li aria-hidden="true" className="text-neutral-300 shrink-0">
                  <ChevronRight className="w-3 h-3" />
                </li>
                <li className="shrink-0">
                  <Link
                    href={`/topics/${encodeURIComponent(video.category.toLowerCase())}`}
                    className="hover:text-neutral-900 transition-colors py-1 inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
                  >
                    {video.category}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-neutral-300 shrink-0">
              <ChevronRight className="w-3 h-3" />
            </li>
            <li className="min-w-0">
              <span
                className="text-neutral-900 font-semibold truncate max-w-[170px] sm:max-w-xs md:max-w-md lg:max-w-lg inline-block align-bottom"
                aria-current="page"
                title={video.title}
              >
                {video.title}
              </span>
            </li>
          </ol>
        </Container>
      </nav>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. Video Player (High Visual Priority, Large with Comfortable Whitespace) */}
      {/* ---------------------------------------------------------------------- */}
      <section
        aria-label={`Video player for ${video.title}`}
        className="w-full bg-neutral-950/2 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12"
      >
        <div id="video-player-container" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Constrained container ensuring no horizontal overflow on mobile */}
          <div className="relative w-full max-w-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-neutral-950 ring-1 ring-neutral-900/10">
            <VideoPlayer
              slug={video.slug}
              src={video.videoUrl}
              poster={video.thumbnail}
              title={video.title}
              duration={video.duration}
              category={video.category}
              authorName={video.author?.name}
              chapters={video.chapters}
              seekToTime={seekToTime}
              onTimeUpdate={onTimeUpdate}
              onEnded={onEnded}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* Editorial Content Column: Category, Title, Description, Byline & Share */}
      {/* ---------------------------------------------------------------------- */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10 sm:pb-14">
        {/* ------------------------------------------------------------------ */}
        {/* 3. Category                                                        */}
        {/* ------------------------------------------------------------------ */}
        {video.category && (
          <div className="mb-3 sm:mb-4">
            <Link
              href={`/topics/${encodeURIComponent(video.category.toLowerCase())}`}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              aria-label={`Explore more stories in ${video.category}`}
            >
              <CategoryBadge
                variant="solid"
                className="bg-neutral-900 text-white hover:bg-neutral-800 text-[11px] sm:text-xs font-mono uppercase tracking-widest px-2.5 py-1 transition-colors"
              >
                {video.category}
              </CategoryBadge>
            </Link>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* 4. Title (Strong Editorial Broadsheet Hierarchy)                   */}
        {/* ------------------------------------------------------------------ */}
        <h1
          id="video-headline"
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.14] sm:leading-[1.08] text-neutral-900 break-words mb-4 sm:mb-6"
        >
          {video.title}
        </h1>

        {/* ------------------------------------------------------------------ */}
        {/* 5. Description (Readable Editorial Deck)                          */}
        {/* ------------------------------------------------------------------ */}
        {descriptionText && (
          <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed font-normal mb-8 sm:mb-10 max-w-3xl">
            {descriptionText}
          </p>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Editorial Byline & Metadata Bar: Author, Date, Duration & Share   */}
        {/* ------------------------------------------------------------------ */}
        <div className="pt-6 sm:pt-7 border-t border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Metadata Sequence: 6. Author -> 7. Date -> 8. Duration */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-4 sm:gap-x-6">
            {/* 6. Author */}
            {video.author && (
              <div className="flex items-center gap-3">
                {video.author.avatar ? (
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-neutral-100 shrink-0 ring-1 ring-neutral-200">
                    <Image
                      src={video.author.avatar}
                      alt={video.author.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {getInitials(video.author.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider block truncate">
                    BY {video.author.name}
                  </span>
                  {video.author.role && (
                    <span className="text-[11px] sm:text-xs text-neutral-500 font-mono tracking-wide block truncate">
                      {video.author.role}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Subtle Vertical Divider */}
            {(video.publishedAt || video.duration) && video.author && (
              <div
                className="hidden sm:block w-px h-8 bg-neutral-200"
                aria-hidden="true"
              />
            )}

            {/* 7. Date */}
            {publishedDate && (
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500">
                <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                <DateLabel date={publishedDate} />
                {updatedDate && (
                  <span className="text-neutral-400 text-[10px] sm:text-[11px] ml-1">
                    (UPDATED <DateLabel date={updatedDate} />)
                  </span>
                )}
              </div>
            )}

            {/* Subtle Divider between Date and Duration */}
            {publishedDate && video.duration && (
              <span className="text-neutral-300 select-none font-mono" aria-hidden="true">
                ·
              </span>
            )}

            {/* 8. Duration */}
            {video.duration && (
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-700 bg-neutral-100/90 px-2.5 py-1 rounded-sm">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" aria-hidden="true" />
                <span>{video.duration}</span>
              </div>
            )}

            {/* Optional views count */}
            {video.views && (
              <div className="hidden lg:inline-flex items-center gap-1 text-xs font-mono text-neutral-400 tracking-tight">
                <Eye className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                <span>{typeof video.views === "number" ? video.views.toLocaleString() : video.views} views</span>
              </div>
            )}
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* 9. Share Actions                                                   */}
          {/* ------------------------------------------------------------------ */}
          <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400">
              Share
            </span>
            <VideoShare
              title={video.title}
              url={`/videos/${video.slug}`}
              variant="hero"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
