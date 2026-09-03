"use client";

import * as React from "react";
import {
  FileText,
  Search,
  Copy,
  Check,
  Play,
  Volume2,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  ArrowDown,
  Download,
} from "lucide-react";
import { VideoTranscript as VideoTranscriptModel } from "@/lib/types/video";
import { cn } from "@/lib/utils";

/**
 * Individual transcript dialogue segment representation.
 */
export interface TranscriptCue {
  id?: string;
  timestamp: string;
  speaker: string;
  text: string;
  startTime?: number;
}

export type VideoTranscriptItem = VideoTranscriptModel | TranscriptCue;

/**
 * Default local transcript dataset matching Thryve's broadsheet editorial standard:
 * 00:00 Dr. Sarah Chen - Introduction
 * 02:45 Dr. Robert Vance - The problem
 * 06:40 Dr. Sarah Chen - Research evidence
 * 07:55 Dr. Robert Vance - Clinical calibration
 * 10:35 Dr. Sarah Chen - Regulatory accountability
 * 13:18 Dr. Robert Vance - Practical solutions
 */
export const DEFAULT_TRANSCRIPT: TranscriptCue[] = [
  {
    id: "cue-1",
    timestamp: "00:00",
    startTime: 0,
    speaker: "Dr. Sarah Chen",
    text: "Welcome back to our clinical investigation series. Today, we're dissecting the systemic friction between diagnostic speed and longitudinal patient outcome data.",
  },
  {
    id: "cue-2",
    timestamp: "02:45",
    startTime: 165,
    speaker: "Dr. Robert Vance",
    text: "The core tension isn't whether computational screening improves throughput—it undeniably does. The critical issue is false-positive cascade effects that overload secondary diagnostic infrastructure.",
  },
  {
    id: "cue-3",
    timestamp: "06:40",
    startTime: 400,
    speaker: "Dr. Sarah Chen",
    text: "In the multi-center retrospective published last quarter, the sensitivity rate reached ninety-four point six percent. But what happens when the model identifies indeterminate lesions that subject patients to invasive procedures they never actually needed?",
  },
  {
    id: "cue-4",
    timestamp: "07:55",
    startTime: 475,
    speaker: "Dr. Robert Vance",
    text: "That is precisely where human calibration remains paramount. Our institutional protocols mandate that any automated flag must meet a pre-test probability threshold evaluated by an attending clinician before surgical consultation is initiated.",
  },
  {
    id: "cue-5",
    timestamp: "10:35",
    startTime: 635,
    speaker: "Dr. Sarah Chen",
    text: "Ultimately, the regulatory challenge isn't algorithmic precision—it's establishing transparent chain-of-custody for diagnostic conclusions when lives hang in the balance.",
  },
  {
    id: "cue-6",
    timestamp: "13:18",
    startTime: 798,
    speaker: "Dr. Robert Vance",
    text: "When clinical teams pair computational triaging with multi-disciplinary peer review panels, diagnostic turnaround drops by thirty-eight percent while patient morbidity markers improve across every tracked cohort.",
  },
];

export interface VideoTranscriptProps {
  /**
   * List of transcript dialogue cues. Defaults to local clinical transcript if omitted.
   */
  transcript?: VideoTranscriptItem[];
  /**
   * Current video playback time in seconds (for highlighting the active line).
   */
  currentTime?: number;
  /**
   * Callback fired when seeking to a specific second in the video.
   */
  onSeek?: (seconds: number) => void;
  /**
   * Optional function to retrieve the HTML5 video element for direct seeking.
   */
  getVideoElement?: () => HTMLVideoElement | null;
  /**
   * Optional HTML id of the <video> element to seek automatically.
   */
  videoId?: string;
  /**
   * Optional CSS selector for the <video> element.
   */
  videoSelector?: string;
  /**
   * Layout presentation variant:
   * - "below": Expansive broadsheet reading layout ideal beneath video players.
   * - "beside": Compact scrollable sidebar rail designed to sit alongside video content.
   */
  layout?: "below" | "beside";
  /**
   * Whether the transcript panel is collapsible (default: true).
   */
  collapsible?: boolean;
  /**
   * Initial collapsed state when collapsible is enabled (default: false).
   */
  defaultCollapsed?: boolean;
  /**
   * Controlled collapsed state.
   */
  isCollapsed?: boolean;
  /**
   * Callback when collapsed state changes.
   */
  onToggleCollapse?: (collapsed: boolean) => void;
  /**
   * Panel title displayed in header (default: "Recorded Dialogue Transcript").
   */
  title?: string;
  /**
   * Whether to show the header bar (default: true).
   */
  showHeader?: boolean;
  /**
   * Whether to display the text search filter (default: true).
   */
  showSearch?: boolean;
  /**
   * Whether to display the speaker filter selector (default: true).
   */
  showSpeakerFilter?: boolean;
  /**
   * Whether to show copy/export actions (default: true).
   */
  showActions?: boolean;
  /**
   * Maximum scroll container height (e.g. "max-h-[480px]").
   */
  maxHeight?: string;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

/**
 * Converts a timestamp string (e.g. "02:45" or "01:13:18") into total seconds.
 */
function parseTimestampToSeconds(val: string | number | undefined): number {
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
 * Generate a deterministic consistent speaker avatar color/initial.
 */
function getSpeakerInitials(speaker: string): string {
  if (!speaker) return "SP";
  const parts = speaker.replace(/^Dr\.\s+/i, "").split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return speaker.slice(0, 2).toUpperCase();
}

/**
 * Reusable VideoTranscript component.
 *
 * Displays:
 * - timestamp (clickable to seek video)
 * - speaker (with distinct badge and filtering)
 * - transcript text (with search highlighting and high-contrast typography)
 *
 * Supports collapsible behavior, local default data, responsive design,
 * accessible keyboard navigation, and seamless HTML5 video synchronization.
 */
export function VideoTranscript({
  transcript = DEFAULT_TRANSCRIPT,
  currentTime: propCurrentTime,
  onSeek,
  getVideoElement,
  videoId,
  videoSelector,
  layout = "below",
  collapsible = true,
  defaultCollapsed = false,
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse,
  title = "Recorded Dialogue Transcript",
  showHeader = true,
  showSearch = true,
  showSpeakerFilter = true,
  showActions = true,
  maxHeight,
  className,
}: VideoTranscriptProps) {
  // Ensure we have transcript cues, falling back to default local data if empty
  const rawItems = React.useMemo(() => {
    return transcript && transcript.length > 0 ? transcript : DEFAULT_TRANSCRIPT;
  }, [transcript]);

  // Normalize items with computed start times in seconds
  const items: TranscriptCue[] = React.useMemo(() => {
    return rawItems.map((item, index) => {
      const startTime =
        typeof item.startTime === "number"
          ? item.startTime
          : parseTimestampToSeconds(item.timestamp);
      return {
        id: ("id" in item && typeof item.id === "string" ? item.id : `cue-${index}-${item.timestamp}`),
        timestamp: item.timestamp,
        speaker: item.speaker || "Speaker",
        text: item.text || "",
        startTime,
      };
    });
  }, [rawItems]);

  // Collapsible state handling (uncontrolled vs controlled)
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  const isCollapsed =
    typeof controlledIsCollapsed === "boolean" ? controlledIsCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    if (!collapsible) return;
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onToggleCollapse?.(next);
  };

  // State for search and filter
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSpeaker, setSelectedSpeaker] = React.useState<string>("all");
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  // Local live video time state if currentTime is unmanaged by parent
  const [liveCurrentTime, setLiveCurrentTime] = React.useState<number | null>(null);

  // References for scrolling
  const listContainerRef = React.useRef<HTMLDivElement | null>(null);
  const activeCueRef = React.useRef<HTMLLIElement | null>(null);

  // Extract distinct speakers for filter selector
  const speakers = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.speaker) set.add(item.speaker);
    });
    return Array.from(set);
  }, [items]);

  // Resolve HTML5 video element safely
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

  // Synchronize with HTML5 <video> timeupdate if external currentTime not provided
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

  const effectiveTime =
    typeof propCurrentTime === "number" ? propCurrentTime : liveCurrentTime ?? 0;

  // Determine currently active cue index based on effective playback time
  const activeCueIndex = React.useMemo(() => {
    if (effectiveTime < 0 || items.length === 0) return -1;
    for (let i = items.length - 1; i >= 0; i--) {
      const cueTime = items[i].startTime ?? 0;
      if (effectiveTime >= cueTime) {
        return i;
      }
    }
    return 0;
  }, [effectiveTime, items]);

  // Auto-scroll the active cue into view if enabled and not collapsed
  React.useEffect(() => {
    if (!autoScroll || isCollapsed) return;
    if (activeCueRef.current && listContainerRef.current) {
      const container = listContainerRef.current;
      const element = activeCueRef.current;

      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const elemTop = element.offsetTop - container.offsetTop;
      const elemBottom = elemTop + element.clientHeight;

      if (elemTop < containerTop || elemBottom > containerBottom) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeCueIndex, autoScroll, isCollapsed]);

  // Filter transcript cues by search query and speaker filter
  const filteredItems = React.useMemo(() => {
    let result = items;

    if (selectedSpeaker !== "all") {
      result = result.filter((item) => item.speaker === selectedSpeaker);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.text.toLowerCase().includes(q) ||
          item.speaker.toLowerCase().includes(q) ||
          item.timestamp.toLowerCase().includes(q)
      );
    }

    return result;
  }, [items, selectedSpeaker, searchQuery]);

  // Handle timestamp click: seek video and notify parent
  const handleSeek = (seconds: number) => {
    try {
      const target = resolveVideoElement();
      if (target) {
        target.currentTime = seconds;
        if (target.paused) {
          target.play().catch(() => {
            // Autoplay permissions safely swallowed
          });
        }
      }
    } catch (err) {
      console.debug("VideoTranscript seek notice", err);
    }

    onSeek?.(seconds);
  };

  // Copy full transcript or filtered dialogue
  const handleCopyTranscript = async () => {
    if (!items || items.length === 0) return;
    const exportItems = filteredItems.length > 0 ? filteredItems : items;
    const fullText = exportItems
      .map((t) => `[${t.timestamp}] ${t.speaker}:\n${t.text}`)
      .join("\n\n");

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback silently
    }
  };

  // Download transcript as text file
  const handleDownloadTranscript = () => {
    if (!items || items.length === 0) return;
    const fullText = items
      .map((t) => `[${t.timestamp}] ${t.speaker}:\n${t.text}`)
      .join("\n\n");

    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video-transcript.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Highlight matching search tokens in text
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-amber-100 text-neutral-900 font-semibold px-0.5 rounded-xs"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Dynamic max-height based on layout
  const scrollHeightClass =
    maxHeight ||
    (layout === "beside"
      ? "h-[540px] max-h-[70vh]"
      : "max-h-[460px] sm:max-h-[520px]");

  return (
    <section
      aria-label={title}
      className={cn(
        "w-full text-neutral-900 border border-neutral-200 bg-white shadow-xs transition-all",
        layout === "beside" && "flex flex-col h-full",
        className
      )}
    >
      {/* 1. Header Bar with Title and Collapsible Trigger */}
      {showHeader && (
        <header className="border-b border-neutral-200 bg-neutral-50/80 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileText className="w-4 h-4 text-neutral-800 shrink-0" aria-hidden="true" />
            <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 truncate">
              {title}
            </h3>
            <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-neutral-200/80 text-neutral-700 rounded-xs shrink-0">
              {items.length} cues
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Action Tools (when expanded) */}
            {!isCollapsed && showActions && (
              <div className="flex items-center gap-1 mr-1">
                {/* Copy full transcript */}
                <button
                  type="button"
                  onClick={handleCopyTranscript}
                  aria-label="Copy transcript text to clipboard"
                  className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700 font-bold hidden sm:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>

                {/* Download transcript */}
                <button
                  type="button"
                  onClick={handleDownloadTranscript}
                  aria-label="Download transcript as text file"
                  title="Download transcript as text file"
                  className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
                  <span className="text-[11px]">TXT</span>
                </button>
              </div>
            )}

            {/* Collapsible toggle button */}
            {collapsible && (
              <button
                type="button"
                onClick={toggleCollapse}
                aria-expanded={!isCollapsed}
                aria-controls="transcript-content-panel"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <span>{isCollapsed ? "Expand" : "Collapse"}</span>
                {isCollapsed ? (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </header>
      )}

      {/* Collapsible Content Area */}
      {!isCollapsed && (
        <div id="transcript-content-panel" className="flex flex-col flex-1">
          {/* 2. Sub-Toolbar: Search input, Speaker dropdown, Auto-scroll switch */}
          {(showSearch || showSpeakerFilter) && (
            <div className="border-b border-neutral-200 bg-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[200px]">
                {/* Search Bar */}
                {showSearch && (
                  <div className="relative flex-1 min-w-[160px] max-w-sm">
                    <Search
                      className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Search dialogue & timestamps..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search transcript text"
                      className="w-full pl-8 pr-7 py-1.5 text-xs bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 rounded-none transition-colors focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search query"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                {/* Speaker Filter Selector */}
                {showSpeakerFilter && speakers.length > 1 && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Filter className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                    <label htmlFor="speaker-select" className="sr-only">
                      Filter by speaker
                    </label>
                    <select
                      id="speaker-select"
                      value={selectedSpeaker}
                      onChange={(e) => setSelectedSpeaker(e.target.value)}
                      className="text-xs bg-neutral-50 border border-neutral-200 py-1.5 px-2 text-neutral-800 rounded-none focus:bg-white focus:border-neutral-900 focus:outline-none font-sans"
                    >
                      <option value="all">All Speakers ({speakers.length})</option>
                      {speakers.map((sp) => (
                        <option key={sp} value={sp}>
                          {sp}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Auto-scroll toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setAutoScroll(!autoScroll)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono transition-colors border",
                    autoScroll
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                  )}
                  aria-pressed={autoScroll}
                  aria-label="Toggle auto-scroll with video playback"
                >
                  <ArrowDown className="w-3 h-3" aria-hidden="true" />
                  <span className="hidden sm:inline">Auto-scroll</span>
                </button>

                {searchQuery && (
                  <span
                    className="text-[11px] font-mono text-neutral-500"
                    aria-live="polite"
                  >
                    {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 3. Main Transcript Dialogue List */}
          <div
            ref={listContainerRef}
            tabIndex={0}
            aria-label="Transcript dialogue lines"
            className={cn(
              "overflow-y-auto px-4 sm:px-6 py-4 focus:outline-none",
              scrollHeightClass
            )}
          >
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-500 font-mono space-y-2">
                <p>No dialogue lines found matching your filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSpeaker("all");
                  }}
                  className="text-neutral-900 underline font-sans text-xs"
                >
                  Reset search and speaker filter
                </button>
              </div>
            ) : (
              <ol role="list" className="space-y-3 divide-y divide-neutral-100">
                {filteredItems.map((cue, idx) => {
                  const rawIndex = items.findIndex((it) => it.id === cue.id);
                  const isCurrent = rawIndex === activeCueIndex;
                  const cueSeconds = cue.startTime ?? parseTimestampToSeconds(cue.timestamp);
                  const initials = getSpeakerInitials(cue.speaker);

                  return (
                    <li
                      key={cue.id || idx}
                      ref={isCurrent ? activeCueRef : undefined}
                      className={cn(
                        "pt-3 first:pt-0 transition-all rounded-none",
                        isCurrent
                          ? "bg-neutral-100/90 border-l-4 border-neutral-900 pl-3 sm:pl-4 py-2.5 -ml-1 sm:-ml-2 pr-2"
                          : "hover:bg-neutral-50/80 p-2 sm:p-2.5"
                      )}
                    >
                      <article>
                        {/* Speaker & Timestamp Top Row */}
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          {/* Speaker Tag */}
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={cn(
                                "w-6 h-6 rounded-full inline-flex items-center justify-center font-mono text-[10px] font-bold shrink-0 uppercase tracking-tighter border",
                                isCurrent
                                  ? "bg-neutral-900 text-white border-neutral-900"
                                  : "bg-neutral-100 text-neutral-700 border-neutral-200"
                              )}
                              aria-hidden="true"
                            >
                              {initials}
                            </span>
                            <span
                              className={cn(
                                "font-sans text-xs font-bold tracking-tight truncate",
                                isCurrent ? "text-neutral-950" : "text-neutral-800"
                              )}
                            >
                              {cue.speaker}
                            </span>
                          </div>

                          {/* Clickable Timestamp Seek Button */}
                          <button
                            type="button"
                            onClick={() => handleSeek(cueSeconds)}
                            aria-label={`Jump to timestamp ${cue.timestamp} spoken by ${cue.speaker}`}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2 py-1 font-mono text-xs tabular-nums transition-colors cursor-pointer",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
                              isCurrent
                                ? "bg-neutral-900 text-white font-bold shadow-xs"
                                : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900 border border-neutral-200/70"
                            )}
                          >
                            {isCurrent ? (
                              <Volume2
                                className="w-3 h-3 text-white animate-pulse"
                                aria-hidden="true"
                              />
                            ) : (
                              <Play
                                className="w-2.5 h-2.5 fill-current opacity-70 group-hover:opacity-100"
                                aria-hidden="true"
                              />
                            )}
                            <time dateTime={`PT${cueSeconds}S`}>{cue.timestamp}</time>
                          </button>
                        </div>

                        {/* Transcript Dialogue Paragraph */}
                        <p
                          className={cn(
                            "font-sans text-sm sm:text-base leading-relaxed break-words text-left pl-8",
                            isCurrent
                              ? "text-neutral-950 font-medium"
                              : "text-neutral-700"
                          )}
                        >
                          {renderHighlightedText(cue.text, searchQuery)}
                        </p>
                      </article>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          {/* 4. Editorial Broadsheet Footer Indicator */}
          <footer className="border-t border-neutral-100 bg-neutral-50 px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>
              Synchronized with editorial master record
            </span>
            <span className="hidden sm:inline-block">
              Jump to timestamp anytime to resume playback
            </span>
          </footer>
        </div>
      )}
    </section>
  );
}

/**
 * Backward compatibility alias for existing imports
 */
export const VideoTranscriptViewer = VideoTranscript;
