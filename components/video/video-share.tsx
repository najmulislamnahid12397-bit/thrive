"use client";

import * as React from "react";
import { ShareActions, ShareActionsProps } from "@/components/article/share-actions";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VideoShareProps {
  /**
   * Title of the video documentary.
   */
  title: string;
  /**
   * Current video URL (can be relative or absolute; defaults to current window URL).
   */
  url?: string;
  /**
   * Presentation variant:
   * - "hero": Compact round buttons for player header / metadata bars.
   * - "bar": Full broadsheet post-video strip with text buttons.
   * - "rail": Sticky desktop vertical sidebar.
   */
  variant?: "hero" | "rail" | "bar" | "inline";
  /**
   * Whether to display a "Share Video" prefix label (default: false for hero/bar, customizable).
   */
  showLabel?: boolean;
  /**
   * Custom label text (default: "Share Video").
   */
  label?: string;
  /**
   * Additional wrapper class names.
   */
  className?: string;
}

/**
 * VideoShare component.
 * Reuses the generalized broadsheet ShareActions system with video-specific presets.
 * Supports:
 * - Copy link (browser Clipboard API + fallback)
 * - X (Twitter web intent with video title & URL)
 * - Facebook (Facebook Sharer web intent)
 * - LinkedIn (LinkedIn share-offsite web intent)
 */
export function VideoShare({
  title,
  url,
  variant = "hero",
  showLabel = false,
  label = "Share Video",
  className,
}: VideoShareProps) {
  if (variant === "bar") {
    return (
      <ShareActions
        title={title}
        url={url}
        contentType="video"
        variant="bar"
        className={className}
      />
    );
  }

  if (variant === "rail") {
    return (
      <ShareActions
        title={title}
        url={url}
        contentType="video"
        variant="rail"
        className={className}
      />
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      {showLabel && (
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 inline-flex items-center gap-1.5 shrink-0 select-none">
          <Share2 className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
          {label}
        </span>
      )}
      <ShareActions
        title={title}
        url={url}
        contentType="video"
        variant={variant}
      />
    </div>
  );
}

export default VideoShare;
