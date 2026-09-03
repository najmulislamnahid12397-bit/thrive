"use client";

import * as React from "react";
import { Play, ListOrdered, Volume2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Standard chapter item representation.
 * Supports flexible property names for seamless reusability across datasets.
 */
export interface ChapterItem {
  id?: string;
  title: string;
  /** Start time in seconds (e.g. 0, 165, 452, 798) */
  startTime?: number;
  /** Formatted timestamp string (e.g. "00:00", "02:45", "07:32", "13:18") */
  formattedTime?: string;
  /** Alternate property name for timestamp */
  timestamp?: string;
  /** Generic time property (number of seconds or timestamp string) */
  time?: string | number;
  /** Optional summary or description of the chapter */
  description?: string;
}

/**
 * Default sample chapters matching the broadsheet editorial investigation format:
 * 00:00 Introduction
 * 02:45 The problem
 * 07:32 What the research shows
 * 13:18 Practical solutions
 */
export const DEFAULT_CHAPTERS: ChapterItem[] = [
  {
    id: "ch-1",
    title: "Introduction",
    startTime: 0,
    formattedTime: "00:00",
    description: "Executive orientation and structural thesis.",
  },
  {
    id: "ch-2",
    title: "The problem",
    startTime: 165,
    formattedTime: "02:45",
    description: "Clinical diagnostic bottlenecks and longitudinal variance.",
  },
  {
    id: "ch-3",
    title: "What the research shows",
    startTime: 452,
    formattedTime: "07:32",
    description: "Multi-cohort empirical data from randomized double-blind trials.",
  },
  {
    id: "ch-4",
    title: "Practical solutions",
    startTime: 798,
    formattedTime: "13:18",
    description: "Evidence-based preventative interventions and protocol updates.",
  },
];

export interface VideoChaptersProps {
  /**
   * List of chapters to display. Defaults to the canonical 4-part structure if omitted.
   */
  chapters?: ChapterItem[];
  /**
   * Current playback time in seconds (for highlighting active chapter).
   */
  currentTime?: number;
  /**
   * Optional manual override for active chapter index.
   */
  activeChapterIndex?: number;
  /**
   * Callback fired when a chapter row is selected with the start time in seconds.
   */
  onSeek?: (seconds: number) => void;
  /**
   * Callback fired when a chapter row is clicked with chapter data and index.
   */
  onChapterClick?: (chapter: ChapterItem, index: number) => void;
  /**
   * Optional getter function returning the target HTML5 <video> element.
   */
  getVideoElement?: () => HTMLVideoElement | null;
  /**
   * Optional HTML id of the <video> element to automatically seek on click.
   */
  videoId?: string;
  /**
   * Optional CSS selector for the <video> element (e.g. "#main-video" or "video").
   */
  videoSelector?: string;
  /**
   * Whether to automatically trigger video.play() after seeking (default: true).
   */
  autoPlayOnSeek?: boolean;
  /**
   * Header title displayed above the chapters list (e.g. "Chapters", "Program Breakdown").
   */
  title?: string;
  /**
   * Whether to show the header section (default: true).
   */
  showHeader?: boolean;
  /**
   * Whether to render chapter descriptions if present (default: true).
   */
  showDescriptions?: boolean;
  /**
   * Visual layout variant:
   * - "default": Broadsheet card layout with clear borders, dividers, and active highlight.
   * - "minimal": Plain typographical list matching the exact "00:00 Title" example.
   * - "timeline": Connected sequential node timeline with vertical guide rail.
   */
  variant?: "default" | "minimal" | "timeline";
  /**
   * Custom container CSS class names.
   */
  className?: string;
  /**
   * Custom CSS class names applied to each chapter row button.
   */
  rowClassName?: string;
}

/**
 * Converts a timestamp string (e.g. "02:45" or "01:13:18") or number into total seconds.
 */
export function parseTimestampToSeconds(val: string | number | undefined): number {
  if (typeof val === "number") return Math.max(0, val);
  if (!val || typeof val !== "string") return 0;

  const clean = val.trim();
  const parts = clean.split(":").map((p) => parseInt(p, 10));
  if (parts.some((n) => isNaN(n))) return 0;

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    return parts[0];
  }
  return 0;
}

/**
 * Formats total seconds into MM:SS or HH:MM:SS format with leading zeros.
 */
export function formatSecondsToTimestamp(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00";
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  if (hrs > 0) {
    const formattedHrs = hrs < 10 ? `0${hrs}` : `${hrs}`;
    return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
  }

  return `${formattedMins}:${formattedSecs}`;
}

/**
 * Extracts the display timestamp string for a chapter.
 */
function getDisplayTimestamp(chapter: ChapterItem): string {
  if (chapter.formattedTime) return chapter.formattedTime;
  if (chapter.timestamp) return chapter.timestamp;
  if (typeof chapter.time === "string") return chapter.time;
  if (typeof chapter.time === "number") return formatSecondsToTimestamp(chapter.time);
  if (typeof chapter.startTime === "number") return formatSecondsToTimestamp(chapter.startTime);
  return "00:00";
}

/**
 * Extracts the start time in seconds for a chapter.
 */
function getChapterStartTime(chapter: ChapterItem): number {
  if (typeof chapter.startTime === "number") return chapter.startTime;
  if (typeof chapter.time === "number") return chapter.time;
  if (typeof chapter.timestamp === "string") return parseTimestampToSeconds(chapter.timestamp);
  if (typeof chapter.formattedTime === "string") return parseTimestampToSeconds(chapter.formattedTime);
  if (typeof chapter.time === "string") return parseTimestampToSeconds(chapter.time);
  return 0;
}

/**
 * Reusable VideoChapters component.
 *
 * Displays:
 * - timestamp (e.g. 00:00, 02:45, 07:32, 13:18)
 * - chapter title
 *
 * Features:
 * - Full accessibility: semantic <nav> and <ol> list, descriptive button aria-labels,
 *   active state semantics (aria-current), and keyboard navigation (Enter/Space).
 * - Visually clean broadsheet editorial typography matching Thryve design system.
 * - Responsive: touch-friendly >= 44px targets, responsive columns, and flexible wrapping.
 * - Clickable chapter rows: updates HTML5 <video> currentTime directly if a player exists,
 *   and notifies parent via onSeek/onChapterClick callbacks.
 */
export function VideoChapters({
  chapters = DEFAULT_CHAPTERS,
  currentTime: propCurrentTime,
  activeChapterIndex,
  onSeek,
  onChapterClick,
  getVideoElement,
  videoId,
  videoSelector,
  autoPlayOnSeek = true,
  title = "Program Chapters",
  showHeader = true,
  showDescriptions = true,
  variant = "default",
  className,
  rowClassName,
}: VideoChaptersProps) {
  // Use provided chapters or fallback to canonical default chapters
  const items = React.useMemo(() => {
    return chapters && chapters.length > 0 ? chapters : DEFAULT_CHAPTERS;
  }, [chapters]);

  // Local state for tracking current time when listening to an unmanaged HTML5 video element
  const [liveCurrentTime, setLiveCurrentTime] = React.useState<number | null>(null);
  // Local state for tracking clicked chapter if no external time tracking is provided
  const [selectedChapterIndex, setSelectedChapterIndex] = React.useState<number>(0);

  // Helper to locate the active video element
  const resolveVideoElement = React.useCallback((): HTMLVideoElement | null => {
    if (typeof window === "undefined") return null;
    if (typeof getVideoElement === "function") {
      const el = getVideoElement();
      if (el) return el;
    }
    if (videoId) {
      const el = document.getElementById(videoId);
      if (el instanceof HTMLVideoElement) return el;
    }
    if (videoSelector) {
      const el = document.querySelector(videoSelector);
      if (el instanceof HTMLVideoElement) return el;
    }
    const el = document.querySelector("video");
    if (el instanceof HTMLVideoElement) return el;
    return null;
  }, [getVideoElement, videoId, videoSelector]);

  // Synchronize with HTML5 <video> element's timeupdate event if available and currentTime not managed by parent
  React.useEffect(() => {
    if (typeof propCurrentTime === "number") return;

    const target = resolveVideoElement();
    if (!target) return;

    const handleTimeUpdate = () => {
      setLiveCurrentTime(target.currentTime);
    };

    target.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      target.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [resolveVideoElement, propCurrentTime]);

  // Determine active chapter index based on currentTime
  const computedActiveIndex = React.useMemo(() => {
    if (typeof activeChapterIndex === "number") {
      return activeChapterIndex;
    }

    const effectiveTime =
      typeof propCurrentTime === "number" ? propCurrentTime : liveCurrentTime;

    if (typeof effectiveTime === "number" && effectiveTime >= 0) {
      for (let i = items.length - 1; i >= 0; i--) {
        const itemSecs = getChapterStartTime(items[i]);
        if (effectiveTime >= itemSecs) {
          return i;
        }
      }
      return 0;
    }

    return selectedChapterIndex;
  }, [activeChapterIndex, propCurrentTime, liveCurrentTime, items, selectedChapterIndex]);

  /**
   * Handle chapter row click: seeks HTML5 video element and dispatches callbacks.
   */
  const handleChapterClick = (chapter: ChapterItem, index: number) => {
    const seconds = getChapterStartTime(chapter);
    setSelectedChapterIndex(index);

    // Update HTML5 <video> element directly if present in DOM
    try {
      const targetVideo = resolveVideoElement();
      if (targetVideo) {
        targetVideo.currentTime = seconds;
        if (autoPlayOnSeek && targetVideo.paused) {
          targetVideo.play().catch(() => {
            // Autoplay restrictions safely caught
          });
        }
      }
    } catch (err) {
      console.debug("VideoChapters: HTML5 video seek notice", err);
    }

    // Trigger external callbacks
    onSeek?.(seconds);
    onChapterClick?.(chapter, index);
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className={cn(
        "w-full text-neutral-900 transition-colors",
        variant === "default" && "border border-neutral-200 bg-white p-4 sm:p-6 shadow-xs",
        variant === "minimal" && "bg-transparent p-0",
        variant === "timeline" && "border-l-2 border-neutral-200 pl-4 sm:pl-6 py-2 bg-transparent",
        className
      )}
    >
      {/* Optional Editorial Header */}
      {showHeader && (
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-neutral-800" aria-hidden="true" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-900">
              {title}
            </h3>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-neutral-100 text-neutral-600 rounded-sm">
              {items.length}
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline-block">
            Click to jump to section
          </span>
        </div>
      )}

      {/* Accessible Ordered Chapter List */}
      <ol
        role="list"
        className={cn(
          "w-full",
          variant === "minimal" ? "divide-y divide-neutral-100" : "space-y-2"
        )}
      >
        {items.map((chapter, idx) => {
          const isActive = idx === computedActiveIndex;
          const displayTime = getDisplayTimestamp(chapter);
          const hasDesc = showDescriptions && Boolean(chapter.description);

          return (
            <li key={chapter.id || `chapter-${idx}`} className="w-full">
              <button
                type="button"
                onClick={() => handleChapterClick(chapter, idx)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Jump to chapter ${idx + 1}: ${chapter.title} at timestamp ${displayTime}${
                  isActive ? ", currently playing" : ""
                }`}
                className={cn(
                  "w-full text-left transition-all duration-150 rounded-none group cursor-pointer",
                  "flex items-start gap-3 sm:gap-4 min-h-[44px]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                  // Minimal variant styling: clean text row
                  variant === "minimal" && [
                    "py-3 px-1.5 sm:px-2 hover:bg-neutral-50",
                    isActive && "bg-neutral-100/90 text-neutral-900 font-medium",
                  ],
                  // Default variant styling: clean broadsheet card rows
                  variant === "default" && [
                    "p-3 sm:p-3.5 border",
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                      : "bg-neutral-50/70 hover:bg-neutral-100 border-neutral-200/80 text-neutral-900",
                  ],
                  // Timeline variant styling
                  variant === "timeline" && [
                    "relative py-2.5 px-3 hover:bg-neutral-50 -ml-4 sm:-ml-6 pl-4 sm:pl-6 border-l-2",
                    isActive
                      ? "border-neutral-900 bg-neutral-50 font-semibold"
                      : "border-transparent text-neutral-700",
                  ],
                  rowClassName
                )}
              >
                {/* 1. Timestamp (clean monospaced, tabular numbers) */}
                <div className="shrink-0 pt-0.5">
                  <span
                    className={cn(
                      "font-mono text-xs sm:text-sm font-bold tracking-tight tabular-nums inline-flex items-center gap-1.5 transition-colors",
                      variant === "minimal" && [
                        "w-14 sm:w-16",
                        isActive
                          ? "text-neutral-900 font-bold"
                          : "text-neutral-500 group-hover:text-neutral-900",
                      ],
                      variant === "default" && [
                        "px-2 py-0.5 rounded-xs",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-neutral-200/90 text-neutral-700 group-hover:bg-neutral-900 group-hover:text-white",
                      ],
                      variant === "timeline" && [
                        "w-12 sm:w-14",
                        isActive ? "text-neutral-900 font-bold" : "text-neutral-500",
                      ]
                    )}
                  >
                    {isActive ? (
                      <Volume2
                        className="w-3 h-3 animate-pulse shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Play
                        className="w-2.5 h-2.5 fill-current opacity-70 group-hover:opacity-100 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span>{displayTime}</span>
                  </span>
                </div>

                {/* 2. Chapter Title and Optional Summary */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "font-sans text-sm sm:text-base leading-snug break-words transition-colors",
                        variant === "default" && [
                          isActive ? "text-white font-semibold" : "text-neutral-900 font-medium group-hover:text-black",
                        ],
                        variant !== "default" && [
                          isActive ? "text-neutral-950 font-semibold" : "text-neutral-800 font-normal group-hover:text-neutral-950",
                        ]
                      )}
                    >
                      {chapter.title}
                    </span>

                    {/* Active State Visual Indicator */}
                    {isActive && (
                      <span
                        className={cn(
                          "hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded-xs",
                          variant === "default"
                            ? "bg-white/20 text-white"
                            : "bg-neutral-900 text-white"
                        )}
                        aria-hidden="true"
                      >
                        <Check className="w-2.5 h-2.5" />
                        Playing
                      </span>
                    )}
                  </div>

                  {/* Optional Chapter Description */}
                  {hasDesc && (
                    <p
                      className={cn(
                        "text-xs mt-1 leading-relaxed line-clamp-2 transition-colors",
                        variant === "default" && [
                          isActive ? "text-neutral-300" : "text-neutral-500",
                        ],
                        variant !== "default" && "text-neutral-500"
                      )}
                    >
                      {chapter.description}
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
