"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Gauge,
  Settings,
  Captions,
  CaptionsOff,
  Check,
  ChevronRight,
  Sliders,
  Sparkles,
  Repeat,
  RotateCcw as RestartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoChapter } from "@/lib/types/video";
import {
  saveVideoProgress,
  clearVideoProgress,
  useVideoProgress,
  VideoWatchProgress,
} from "@/lib/video-progress";

export interface CaptionCue {
  startTime: number;
  endTime: number;
  text: string;
}

export interface VideoPlayerProps {
  /**
   * Unique video slug for local progress storage.
   */
  slug?: string;
  /**
   * Whether to persist and restore watch progress locally. Default: true.
   */
  saveProgress?: boolean;
  /**
   * Video streaming or MP4 URL. Falls back to a high-definition open media source if not provided.
   */
  src?: string;
  /**
   * High-resolution poster/thumbnail image URL to display before playback.
   */
  poster?: string;
  /**
   * Descriptive editorial title of the broadcast.
   */
  title?: string;
  /**
   * Optional pre-formatted duration string (e.g. "14:30") or numeric seconds.
   */
  duration?: string | number;
  /**
   * Discipline or editorial category (e.g. "Health", "Neuroscience").
   */
  category?: string;
  /**
   * Author or investigator name.
   */
  authorName?: string;
  /**
   * Interactive chapter marks along the timeline.
   */
  chapters?: VideoChapter[];
  /**
   * Optional list of timed caption cues.
   */
  captions?: CaptionCue[];
  /**
   * Callback fired when playback time updates.
   */
  onTimeUpdate?: (currentTime: number) => void;
  /**
   * Callback fired when playback finishes.
   */
  onEnded?: () => void;
  /**
   * Programmatic seek trigger (e.g. from an external transcript or chapter click).
   */
  seekToTime?: number | null;
  /**
   * Whether to autoplay the video once loaded (default: false).
   */
  autoPlay?: boolean;
  /**
   * Additional container CSS classes.
   */
  className?: string;
}

// Fallback high-definition open media sample if no src is provided
const DEFAULT_FALLBACK_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// Playback rate options
const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

// Video resolution options
const RESOLUTIONS = [
  { label: "Auto (1080p HD)", value: "auto" },
  { label: "1080p HD", value: "1080p" },
  { label: "720p", value: "720p" },
  { label: "480p", value: "480p" },
];

/**
 * Format raw seconds into standard MM:SS or HH:MM:SS format
 */
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  if (hrs > 0) {
    const formattedHrs = hrs < 10 ? `0${hrs}` : `${hrs}`;
    return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
  }

  return `${formattedMins}:${formattedSecs}`;
}

export function VideoPlayer({
  slug,
  saveProgress = true,
  src,
  poster,
  title = "Broadcast Investigation",
  duration: initialDurationHint,
  category,
  authorName,
  chapters = [],
  captions: customCaptions,
  onTimeUpdate,
  onEnded,
  seekToTime,
  autoPlay = false,
  className,
}: VideoPlayerProps) {
  const videoSrc = src || DEFAULT_FALLBACK_VIDEO;

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveTimeRef = useRef<number>(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(() => {
    if (typeof initialDurationHint === "number") return initialDurationHint;
    if (typeof initialDurationHint === "string" && initialDurationHint.includes(":")) {
      const parts = initialDurationHint.split(":").map(Number);
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
  });
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);

  // Local watch-progress state subscribed to localStorage via useSyncExternalStore
  const storedProgress = useVideoProgress(saveProgress ? slug : undefined);
  const savedProgress = storedProgress && storedProgress.currentTime > 2 ? storedProgress : null;

  // Audio state
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(0.85);

  // Player configurations
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [resolution, setResolution] = useState<string>("auto");
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [ambientGlow, setAmbientGlow] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Captions & Subtitles state
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(false);

  // UI popovers and overlay state
  const [showControls, setShowControls] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<"none" | "settings" | "speed" | "quality">("none");
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverChapter, setHoverChapter] = useState<string | null>(null);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  // Synchronize external programmatic seek requests (e.g. from transcript/chapter lists)
  useEffect(() => {
    if (seekToTime !== null && seekToTime !== undefined && videoRef.current) {
      videoRef.current.currentTime = seekToTime;
      setCurrentTime(seekToTime);
      setHasStarted(true);
      videoRef.current.play().catch(() => {});
      if (slug && saveProgress) {
        saveVideoProgress(slug, seekToTime, videoRef.current.duration || duration);
      }
    }
  }, [seekToTime, slug, saveProgress, duration]);

  // Handle Fullscreen state synchronization
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Sync volume with HTML5 video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Dynamic simulated or provided captions syncing
  const activeCaption = React.useMemo(() => {
    if (!captionsEnabled) return "";

    // If custom captions are provided, match currentTime
    if (customCaptions && customCaptions.length > 0) {
      const match = customCaptions.find(
        (c) => currentTime >= c.startTime && currentTime <= c.endTime
      );
      return match ? match.text : "";
    }

    // Default simulated editorial subtitles synchronized with broadcast timestamps
    if (currentTime < 6) {
      return `[Narrator] Welcome to this Thryve clinical inquiry: "${title}".`;
    } else if (currentTime < 15) {
      return `[Narrator] In this broadcast, we examine evidence-based research and clinical methodologies.`;
    } else if (currentTime < 26) {
      return `[Speaker] "Recent clinical trials reveal statistically significant neuroplastic adaptation..."`;
    } else if (currentTime < 40) {
      return `[Narrator] Notice the biochemical pathways modulated by targeted therapeutic interventions.`;
    } else if (currentTime < 60) {
      return `[Narrator] We now observe the patient cohort trajectory across 24 randomized blinded phases.`;
    } else {
      const currentMin = Math.floor(currentTime / 60);
      return `[Investigator] Documenting clinical biomarkers and longitudinal telemetry — Phase ${currentMin + 1}.`;
    }
  }, [captionsEnabled, currentTime, customCaptions, title]);

  // Buffer progress tracking
  const updateBuffer = useCallback(() => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const buffered = videoRef.current.buffered;
    if (buffered.length > 0) {
      const bufferedEnd = buffered.end(buffered.length - 1);
      const pct = (bufferedEnd / videoRef.current.duration) * 100;
      setBufferedPercent(Math.min(pct, 100));
    }
  }, []);

  // Controls auto-hide timeout management
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying && activeMenu === "none") {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  }, [isPlaying, activeMenu]);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    // If starting for the first time and there is saved progress, resume from saved timestamp
    if (!hasStarted && savedProgress && savedProgress.currentTime > 2) {
      videoRef.current.currentTime = savedProgress.currentTime;
      setCurrentTime(savedProgress.currentTime);
    }
    setHasStarted(true);

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          resetControlsTimeout();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
      if (slug && saveProgress) {
        saveVideoProgress(slug, videoRef.current.currentTime, videoRef.current.duration || duration);
      }
    }
  }, [hasStarted, savedProgress, resetControlsTimeout, slug, saveProgress, duration]);

  // Explicit Resume Playback handler
  const handleResumePlayback = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!videoRef.current) return;
      const targetTime = savedProgress?.currentTime || 0;
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
      setHasStarted(true);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          resetControlsTimeout();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    },
    [savedProgress, resetControlsTimeout]
  );

  // Explicit Start from Beginning handler
  const handlePlayFromBeginning = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!videoRef.current) return;
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setHasStarted(true);
      if (slug) {
        clearVideoProgress(slug);
      }
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          resetControlsTimeout();
        })
        .catch(() => {
          setIsPlaying(false);
        });
    },
    [slug, resetControlsTimeout]
  );

  // Volume controls
  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume || 0.5);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      setVolume(0);
    }
  }, [isMuted, volume, previousVolume]);

  const handleVolumeChange = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (clamped === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Skip relative seconds
  const skipTime = useCallback(
    (seconds: number) => {
      if (!videoRef.current) return;
      const dur = videoRef.current.duration || duration || 0;
      const target = Math.max(0, Math.min((videoRef.current.currentTime || 0) + seconds, dur));
      videoRef.current.currentTime = target;
      setCurrentTime(target);
      resetControlsTimeout();
    },
    [duration, resetControlsTimeout]
  );

  // Speed adjustments
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setActiveMenu("none");
  };

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Scrubber calculation helper
  const seekToPosition = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current || !videoRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
      const target = pos * (duration || videoRef.current.duration || 0);
      videoRef.current.currentTime = target;
      setCurrentTime(target);
    },
    [duration]
  );

  // Scrubber mouse events
  const handleScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    seekToPosition(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      seekToPosition(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsScrubbing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleScrubberMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
    const targetSeconds = pos * duration;

    setHoverPosition(pos * 100);
    setHoverTime(targetSeconds);

    // Check if hovering near a chapter
    if (chapters && chapters.length > 0) {
      const activeChap = chapters
        .slice()
        .reverse()
        .find((ch) => targetSeconds >= ch.startTime);
      setHoverChapter(activeChap ? activeChap.title : null);
    } else {
      setHoverChapter(null);
    }
  };

  const handleScrubberMouseLeave = () => {
    setHoverPosition(null);
    setHoverTime(null);
    setHoverChapter(null);
  };

  // Keyboard navigation & accessibility controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      switch (e.key) {
        case " ":
        case "k":
        case "K":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
        case "j":
        case "J":
          e.preventDefault();
          skipTime(-10);
          break;
        case "ArrowRight":
        case "l":
        case "L":
          e.preventDefault();
          skipTime(10);
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolumeChange(volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolumeChange(volume - 0.1);
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "c":
        case "C":
          e.preventDefault();
          setCaptionsEnabled((prev) => !prev);
          break;
        case "Escape":
          setActiveMenu("none");
          break;
        // Numbers 0-9 seek to percentage (0 = 0%, 5 = 50%, etc.)
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          if (videoRef.current && duration > 0) {
            e.preventDefault();
            const pct = parseInt(e.key, 10) / 10;
            const targetTime = duration * pct;
            videoRef.current.currentTime = targetTime;
            setCurrentTime(targetTime);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlay, skipTime, volume, handleVolumeChange, toggleMute, toggleFullscreen, duration]);

  // Click outside to close settings menus
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveMenu("none");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Compute progress bar percentage
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying && activeMenu === "none") {
          setShowControls(false);
        }
      }}
      tabIndex={0}
      role="region"
      aria-label={`Video Player: ${title}`}
      className={cn(
        "relative w-full aspect-video bg-neutral-950 overflow-hidden select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 border border-neutral-900 shadow-xl",
        ambientGlow && isPlaying && "shadow-2xl shadow-neutral-950/80",
        className
      )}
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        playsInline
        autoPlay={autoPlay}
        loop={isLooping}
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => {
          setIsPlaying(true);
          setHasStarted(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          if (slug && saveProgress && videoRef.current) {
            saveVideoProgress(slug, videoRef.current.currentTime, videoRef.current.duration || duration);
          }
        }}
        onProgress={updateBuffer}
        onTimeUpdate={() => {
          if (videoRef.current) {
            const time = videoRef.current.currentTime;
            setCurrentTime(time);
            onTimeUpdate?.(time);
            updateBuffer();

            // Throttle saving local watch progress (every 1.5 seconds)
            const now = Date.now();
            if (now - lastSaveTimeRef.current > 1500 && slug && saveProgress) {
              lastSaveTimeRef.current = now;
              saveVideoProgress(slug, time, videoRef.current.duration || duration);
            }
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            const dur = videoRef.current.duration;
            if (dur && !isNaN(dur)) {
              setDuration(dur);
            }
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
          if (slug && saveProgress) {
            clearVideoProgress(slug);
          }
          onEnded?.();
        }}
        className="w-full h-full object-contain bg-black cursor-pointer"
      />

      {/* Poster / Thumbnail Overlay (Before First Playback) */}
      {!hasStarted && poster && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 cursor-pointer overflow-hidden group/poster"
          aria-label="Click to play documentary"
        >
          {/* High-contrast Poster Image */}
          <Image
            src={poster}
            alt={title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover transition-transform duration-700 group-hover/poster:scale-105"
          />

          {/* Editorial Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />

          {/* Top Editorial Watermark Banner */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/90 font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10">
                {category || "Investigation"}
              </span>
            </div>
            {duration > 0 && (
              <span className="font-mono text-xs text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10 tabular-nums">
                {formatTime(duration)}
              </span>
            )}
          </div>

          {/* Central Broadcast Play Button & Editorial Prompt */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                savedProgress && savedProgress.currentTime > 2
                  ? `Resume broadcast: ${title} from ${formatTime(savedProgress.currentTime)}`
                  : `Start broadcast: ${title}`
              }
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/poster:scale-110 group-hover/poster:bg-neutral-900 group-hover/poster:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" aria-hidden="true" />
            </button>

            <div className="mt-4 max-w-xl hidden sm:block">
              <h2 className="font-serif text-lg sm:text-xl font-medium text-white tracking-tight leading-snug drop-shadow-md line-clamp-1">
                {title}
              </h2>
              {authorName && (
                <p className="font-mono text-xs text-neutral-300 mt-1 uppercase tracking-wider">
                  Investigated by {authorName}
                </p>
              )}
            </div>

            {/* Saved Watch-Progress Prompt / Quick Action Bar */}
            {savedProgress && savedProgress.currentTime > 2 ? (
              <div
                className="mt-3 sm:mt-4 flex flex-col items-center gap-2 z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-950/90 border border-neutral-700 text-white font-mono text-[11px] uppercase tracking-wider shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Resume at {formatTime(savedProgress.currentTime)}</span>
                  <span className="text-neutral-400">({savedProgress.percent}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResumePlayback}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Resume broadcast from ${formatTime(savedProgress.currentTime)}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Resume</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePlayFromBeginning}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 font-mono text-xs uppercase tracking-wider transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Start broadcast from the beginning"
                  >
                    <RestartIcon className="w-3.5 h-3.5" />
                    <span>Start Over</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-400 pointer-events-none hidden sm:block">
                Click to watch documentary
              </div>
            )}
          </div>

          {/* Bottom Prompt / Progress Bar */}
          {savedProgress && savedProgress.percent > 0 ? (
            <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-white/20 z-10 pointer-events-none">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${savedProgress.percent}%` }}
              />
            </div>
          ) : (
            <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-[11px] uppercase tracking-widest text-neutral-400 pointer-events-none">
              Click to watch documentary
            </div>
          )}
        </div>
      )}

      {/* Closed Captions Overlay */}
      {captionsEnabled && activeCaption && (
        <div
          aria-live="polite"
          className="absolute bottom-16 sm:bottom-20 left-4 right-4 sm:left-12 sm:right-12 z-20 flex justify-center pointer-events-none transition-opacity duration-200"
        >
          <div className="bg-black/90 text-white px-4 py-2 text-xs sm:text-sm font-sans tracking-wide max-w-2xl text-center border-l-2 border-emerald-400 shadow-xl backdrop-blur-sm">
            {activeCaption}
          </div>
        </div>
      )}

      {/* Center Paused Indicator Watermark (when paused after starting) */}
      {hasStarted && !isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/35 z-10 cursor-pointer transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white border-0"
          aria-label="Resume video playback"
        >
          <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/75 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transition-transform duration-200 hover:scale-105 pointer-events-none">
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" aria-hidden="true" />
          </span>
        </button>
      )}

      {/* Settings Popover Panels */}
      {activeMenu !== "none" && (
        <div
          role="dialog"
          aria-label="Player settings menu"
          className="absolute bottom-16 right-4 z-30 w-64 bg-neutral-950/95 border border-neutral-800 text-white p-2 shadow-2xl backdrop-blur-md font-mono text-xs"
        >
          {/* Main Settings Menu */}
          {activeMenu === "settings" && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 flex items-center justify-between">
                <span>Player Settings</span>
                <button
                  onClick={() => setActiveMenu("none")}
                  className="text-neutral-400 hover:text-white"
                  aria-label="Close settings"
                >
                  ✕
                </button>
              </div>

              {/* Speed Option */}
              <button
                onClick={() => setActiveMenu("speed")}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors focus:outline-none focus:bg-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Playback Speed</span>
                </div>
                <span className="text-neutral-400 flex items-center gap-1">
                  {playbackRate === 1 ? "Normal" : `${playbackRate}x`}
                  <ChevronRight className="w-3 h-3" />
                </span>
              </button>

              {/* Quality Option */}
              <button
                onClick={() => setActiveMenu("quality")}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors focus:outline-none focus:bg-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Resolution</span>
                </div>
                <span className="text-neutral-400 flex items-center gap-1 uppercase">
                  {resolution}
                  <ChevronRight className="w-3 h-3" />
                </span>
              </button>

              {/* Captions Toggle */}
              <button
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors focus:outline-none focus:bg-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <Captions className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Subtitles (CC)</span>
                </div>
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] uppercase font-bold",
                    captionsEnabled ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "text-neutral-400"
                  )}
                >
                  {captionsEnabled ? "English" : "Off"}
                </span>
              </button>

              {/* Loop Broadcast Toggle */}
              <button
                onClick={() => setIsLooping(!isLooping)}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors focus:outline-none focus:bg-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <Repeat className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Loop Broadcast</span>
                </div>
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] uppercase font-bold",
                    isLooping ? "bg-white text-black" : "text-neutral-400"
                  )}
                >
                  {isLooping ? "On" : "Off"}
                </span>
              </button>

              {/* Ambient Glow Toggle */}
              <button
                onClick={() => setAmbientGlow(!ambientGlow)}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors focus:outline-none focus:bg-neutral-900"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Theater Contrast</span>
                </div>
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] uppercase font-bold",
                    ambientGlow ? "bg-white text-black" : "text-neutral-400"
                  )}
                >
                  {ambientGlow ? "On" : "Off"}
                </span>
              </button>
            </div>
          )}

          {/* Sub-menu: Playback Speed */}
          {activeMenu === "speed" && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveMenu("settings")}
                  className="text-neutral-300 hover:text-white flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  aria-label="Back to main settings"
                >
                  ← Back
                </button>
                <span>Speed</span>
              </div>
              {PLAYBACK_RATES.map((rate) => (
                <button
                  type="button"
                  key={rate}
                  onClick={() => handleSpeedChange(rate)}
                  aria-pressed={playbackRate === rate}
                  className={cn(
                    "w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white",
                    playbackRate === rate ? "text-emerald-400 font-bold bg-neutral-900" : "text-neutral-200"
                  )}
                >
                  <span>{rate === 1 ? "1.0x (Normal)" : `${rate}x`}</span>
                  {playbackRate === rate && <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}

          {/* Sub-menu: Resolution Quality */}
          {activeMenu === "quality" && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveMenu("settings")}
                  className="text-neutral-300 hover:text-white flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  aria-label="Back to main settings"
                >
                  ← Back
                </button>
                <span>Resolution</span>
              </div>
              {RESOLUTIONS.map((res) => (
                <button
                  type="button"
                  key={res.value}
                  onClick={() => {
                    setResolution(res.value);
                    setActiveMenu("none");
                  }}
                  aria-pressed={resolution === res.value}
                  className={cn(
                    "w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white",
                    resolution === res.value ? "text-emerald-400 font-bold bg-neutral-900" : "text-neutral-200"
                  )}
                >
                  <span>{res.label}</span>
                  {resolution === res.value && <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Control Bar Overlay */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 flex flex-col gap-2",
          showControls || !isPlaying || activeMenu !== "none" || isScrubbing
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Progress Bar (Interactive Timeline Scrubber) */}
        <div
          ref={progressBarRef}
          tabIndex={0}
          onMouseDown={handleScrubberMouseDown}
          onMouseMove={handleScrubberMouseMove}
          onMouseLeave={handleScrubberMouseLeave}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              skipTime(-5);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              skipTime(5);
            } else if (e.key === "PageDown") {
              e.preventDefault();
              skipTime(-30);
            } else if (e.key === "PageUp") {
              e.preventDefault();
              skipTime(30);
            } else if (e.key === "Home") {
              e.preventDefault();
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                setCurrentTime(0);
              }
            } else if (e.key === "End") {
              e.preventDefault();
              if (videoRef.current) {
                videoRef.current.currentTime = duration;
                setCurrentTime(duration);
              }
            }
          }}
          className="relative w-full h-4 sm:h-5 flex items-center cursor-pointer group/timeline py-1 touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-black"
          role="slider"
          aria-label="Video timeline scrubber"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.round(currentTime)}
          aria-valuetext={formatTime(currentTime)}
        >
          {/* Background Bar Track */}
          <div className="w-full h-1 bg-white/20 relative group-hover/timeline:h-1.5 transition-all">
            {/* Buffered Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-150"
              style={{ width: `${bufferedPercent}%` }}
            />
            {/* Playback Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white group-hover/timeline:bg-emerald-400 transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Chapter Tick Marks */}
          {duration > 0 &&
            chapters.map((chap) => {
              const chapPct = (chap.startTime / duration) * 100;
              return (
                <div
                  key={chap.id}
                  className="absolute top-0 bottom-0 w-0.5 bg-neutral-950/90 pointer-events-none z-10"
                  style={{ left: `${chapPct}%` }}
                  title={chap.title}
                />
              );
            })}

          {/* Hover Time & Chapter Tooltip */}
          {hoverPosition !== null && hoverTime !== null && (
            <div
              className="absolute -top-9 transform -translate-x-1/2 px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-white rounded-none pointer-events-none shadow-xl flex flex-col items-center whitespace-nowrap z-20"
              style={{ left: `${hoverPosition}%` }}
            >
              <span className="font-mono text-[10px] font-bold">
                {formatTime(hoverTime)}
              </span>
              {hoverChapter && (
                <span className="font-sans text-[9px] text-neutral-300 max-w-[140px] truncate">
                  {hoverChapter}
                </span>
              )}
            </div>
          )}

          {/* Vertical Hover Needle */}
          {hoverPosition !== null && (
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white/60 pointer-events-none"
              style={{ left: `${hoverPosition}%` }}
            />
          )}

          {/* Draggable Scrubber Playhead Handle */}
          <div
            className={cn(
              "absolute w-3.5 h-3.5 rounded-full bg-white shadow-lg transform -translate-x-1/2 pointer-events-none transition-opacity",
              isScrubbing ? "opacity-100 scale-125" : "opacity-0 group-hover/timeline:opacity-100"
            )}
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* Lower Controls Row */}
        <div className="flex items-center justify-between gap-2 text-white">
          {/* Left Actions: Play/Pause, Replay/Forward 10s, Time Counter */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-2 sm:p-1.5 text-white/90 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Skip Backward 10s */}
            <button
              onClick={() => skipTime(-10)}
              className="p-2 sm:p-1.5 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none hidden sm:flex items-center justify-center"
              aria-label="Rewind 10 seconds"
              title="Rewind 10s (Left Arrow / J)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Skip Forward 10s */}
            <button
              onClick={() => skipTime(10)}
              className="p-2 sm:p-1.5 text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none hidden sm:flex items-center justify-center"
              aria-label="Skip forward 10 seconds"
              title="Forward 10s (Right Arrow / L)"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Elapsed Time / Total Duration */}
            <div className="text-[11px] sm:text-xs font-mono tracking-wider text-white/90 pl-1 select-none tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 text-white/40">/</span>
              <span className="text-white/70">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Actions: Volume, Captions, Speed, Settings, Fullscreen */}
          <div className="flex items-center gap-0.5 sm:gap-2 relative">
            {/* Volume Control */}
            <div className="flex items-center group/volume">
              <button
                onClick={toggleMute}
                className="p-2 sm:p-1.5 text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={isMuted || volume === 0 ? "Unmute video" : "Mute video"}
                title="Mute / Unmute (M)"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-12 sm:w-16 h-1 bg-white/20 accent-white cursor-pointer hidden md:inline-block focus:outline-none"
                aria-label="Volume slider"
              />
            </div>

            {/* Captions Button (CC) */}
            <button
              onClick={() => setCaptionsEnabled(!captionsEnabled)}
              className={cn(
                "p-2 sm:p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none min-h-[44px] min-w-[44px] flex items-center justify-center relative",
                captionsEnabled ? "text-emerald-400 font-bold" : "text-white/70 hover:text-white"
              )}
              aria-label={captionsEnabled ? "Disable subtitles" : "Enable subtitles"}
              aria-pressed={captionsEnabled}
              title="Subtitles / CC (C)"
            >
              {captionsEnabled ? (
                <Captions className="w-4 h-4" />
              ) : (
                <CaptionsOff className="w-4 h-4" />
              )}
              {captionsEnabled && (
                <span className="absolute bottom-1 w-3 h-0.5 bg-emerald-400" aria-hidden="true" />
              )}
            </button>

            {/* Speed Quick Button (Mobile & Desktop) */}
            <button
              onClick={() => {
                // Cycle through speeds: 1x -> 1.25x -> 1.5x -> 2x -> 0.75x -> 1x
                const nextIndex =
                  (PLAYBACK_RATES.indexOf(playbackRate) + 1) % PLAYBACK_RATES.length;
                handleSpeedChange(PLAYBACK_RATES[nextIndex]);
              }}
              className="px-2 py-1.5 text-[11px] font-mono font-bold tracking-wider text-white/80 hover:text-white hover:bg-white/10 rounded-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px] flex items-center justify-center"
              aria-label={`Playback speed: ${playbackRate}x. Click to change.`}
              title="Change playback speed"
            >
              <span>{playbackRate}x</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setActiveMenu(activeMenu === "none" ? "settings" : "none")}
              className={cn(
                "p-2 sm:p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none min-h-[44px] min-w-[44px] flex items-center justify-center",
                activeMenu !== "none" ? "text-white bg-white/10" : "text-white/80 hover:text-white"
              )}
              aria-label="Player settings"
              aria-haspopup="dialog"
              aria-expanded={activeMenu !== "none"}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 sm:p-1.5 text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title="Fullscreen (F)"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
