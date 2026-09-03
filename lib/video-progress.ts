"use client";

import { useSyncExternalStore } from "react";

export interface VideoWatchProgress {
  slug: string;
  currentTime: number;
  duration: number;
  percent: number;
  updatedAt: number;
}

const STORAGE_PREFIX = "thryve_watch_progress_";

// In-memory notification listeners for same-tab synchronized state updates
const progressListeners = new Set<() => void>();

function notifyProgressChange() {
  progressListeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // Ignore
    }
  });
}

/**
 * Safely retrieve local watch progress for a video by its unique slug.
 * Guaranteed safe for server-side rendering (returns null if window/localStorage is undefined).
 */
export function getStoredVideoProgress(slug?: string): VideoWatchProgress | null {
  if (typeof window === "undefined" || !slug) return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${slug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.currentTime === "number" &&
      !isNaN(parsed.currentTime)
    ) {
      return parsed as VideoWatchProgress;
    }
  } catch {
    // Gracefully ignore storage quota or parsing errors
  }
  return null;
}

/**
 * Safely persist watch progress to localStorage.
 * Automatically clears when video is completed (>97% or within 3 seconds of end).
 */
export function saveVideoProgress(
  slug: string | undefined,
  currentTime: number,
  duration: number
): void {
  if (
    typeof window === "undefined" ||
    !slug ||
    isNaN(currentTime) ||
    currentTime < 0
  ) {
    return;
  }

  try {
    const dur = duration > 0 ? duration : 0;
    const percent =
      dur > 0 ? Math.min(100, Math.max(0, (currentTime / dur) * 100)) : 0;

    // If video has completed (within last 3 seconds or > 97%), reset saved progress
    if (dur > 0 && (currentTime >= dur - 3 || percent >= 97)) {
      localStorage.removeItem(`${STORAGE_PREFIX}${slug}`);
      notifyProgressChange();
      return;
    }

    // Only persist if user has watched at least 2 seconds
    if (currentTime < 2) {
      return;
    }

    const payload: VideoWatchProgress = {
      slug,
      currentTime: Math.round(currentTime * 10) / 10,
      duration: Math.round(dur * 10) / 10,
      percent: Math.round(percent),
      updatedAt: Date.now(),
    };

    localStorage.setItem(`${STORAGE_PREFIX}${slug}`, JSON.stringify(payload));
    notifyProgressChange();
  } catch {
    // Gracefully ignore storage write failures
  }
}

/**
 * Clear saved progress for a specific video slug (e.g. when video finishes or user clicks 'Start over').
 */
export function clearVideoProgress(slug?: string): void {
  if (typeof window === "undefined" || !slug) return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${slug}`);
    notifyProgressChange();
  } catch {
    // Gracefully ignore
  }
}

/**
 * Subscribe to watch progress updates across windows and components.
 */
export function subscribeToVideoProgress(callback: () => void): () => void {
  progressListeners.add(callback);

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key && event.key.startsWith(STORAGE_PREFIX)) {
      callback();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorageEvent);
  }

  return () => {
    progressListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorageEvent);
    }
  };
}

/**
 * React 19 compliant hook to subscribe to local video watch progress with SSR-safety.
 */
export function useVideoProgress(slug?: string): VideoWatchProgress | null {
  return useSyncExternalStore(
    subscribeToVideoProgress,
    () => (slug ? getStoredVideoProgress(slug) : null),
    () => null // Server-side snapshot is always null
  );
}

