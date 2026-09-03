"use client";

import React, { useState } from "react";
import {
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  Check,
  Share2,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ShareContentType = "article" | "video" | "content";

export interface ShareActionsProps {
  /**
   * Title of the article or video to include in shared text.
   */
  title: string;
  /**
   * Target URL to share. Can be relative (e.g. /videos/my-slug) or absolute.
   * Defaults to current browser window URL if omitted.
   */
  url?: string;
  /**
   * Content type for accessible labels and context (default: "article").
   */
  contentType?: ShareContentType;
  /**
   * Presentation variant:
   * - "hero": Compact round icon buttons with focus states and tooltips.
   * - "bar": Broadsheet in-flow bar with headline and explicit text pill buttons.
   * - "rail": Sticky desktop vertical sidebar.
   * - "inline": Minimalist horizontal row.
   */
  variant?: "hero" | "rail" | "bar" | "inline";
  /**
   * Custom CSS classes.
   */
  className?: string;
}

/**
 * Generalized share engine for editorial articles and documentary videos.
 * Supports:
 * 1. Copy link (using browser Clipboard API + fallback)
 * 2. X (Twitter intent)
 * 3. Facebook (Sharer web intent)
 * 4. LinkedIn (Share-offsite web intent)
 * 5. Native share on mobile devices
 */
export function ShareActions({
  title,
  url,
  contentType = "article",
  variant = "hero",
  className,
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  /**
   * Formulate absolute target URL for social intents and clipboard copying.
   */
  const getShareUrl = (): string => {
    if (url) {
      if (typeof window !== "undefined" && url.startsWith("/")) {
        return `${window.location.origin}${url}`;
      }
      return url;
    }
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  /**
   * Copy link using browser Clipboard API.
   */
  const handleCopyLink = async () => {
    const currentUrl = getShareUrl();
    if (!currentUrl) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      }

      // Fallback for non-secure contexts
      const textarea = document.createElement("textarea");
      textarea.value = currentUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.debug("Clipboard copy failed", err);
    }
  };

  /**
   * Share to X (Twitter)
   */
  const handleXShare = () => {
    const currentUrl = getShareUrl();
    const shareText =
      contentType === "video"
        ? `Watch "${title}" on Thryve Video:`
        : `"${title}" via Thryve:`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  /**
   * Share to Facebook
   */
  const handleFacebookShare = () => {
    const currentUrl = getShareUrl();
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  /**
   * Share to LinkedIn
   */
  const handleLinkedInShare = () => {
    const currentUrl = getShareUrl();
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  };

  /**
   * Share via Email
   */
  const handleEmailShare = () => {
    const currentUrl = getShareUrl();
    const subject =
      contentType === "video" ? `Thryve Video: ${title}` : `Thryve Article: ${title}`;
    const body = `Thought you'd find this interesting:\n\n${title}\n${currentUrl}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  /**
   * Optional Web Share API for supported mobile browsers
   */
  const handleNativeShare = async () => {
    const currentUrl = getShareUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: currentUrl,
        });
      } catch {
        // Ignored if user dismissed sheet
      }
    } else {
      handleCopyLink();
    }
  };

  const entityName =
    contentType === "video" ? "video" : contentType === "article" ? "article" : "content";

  // ---------------------------------------------------------------------------
  // 1. Desktop Sticky Share Rail (XL screens)
  // ---------------------------------------------------------------------------
  if (variant === "rail") {
    return (
      <aside
        aria-label={`Share this ${entityName}`}
        className={cn(
          "hidden xl:flex flex-col items-center gap-3 sticky top-28 select-none z-10",
          className
        )}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 [writing-mode:vertical-lr] rotate-180 mb-2">
          Share
        </span>

        {/* X */}
        <button
          type="button"
          onClick={handleXShare}
          className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 shadow-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          aria-label="Share on X"
          title="Share on X"
        >
          <Twitter className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={handleFacebookShare}
          className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 shadow-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={handleLinkedInShare}
          className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 shadow-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Email */}
        <button
          type="button"
          onClick={handleEmailShare}
          className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 shadow-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          aria-label="Share via Email"
          title="Share via Email"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Copy Link */}
        <div className="relative">
          <button
            type="button"
            onClick={handleCopyLink}
            className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center shadow-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
              copied
                ? "bg-neutral-900 text-white border-neutral-900"
                : "border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50"
            )}
            aria-label={`Copy ${entityName} link to clipboard`}
            title={`Copy ${entityName} link`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-white" aria-hidden="true" />
            ) : (
              <LinkIcon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
          {copied && (
            <span
              role="status"
              aria-live="polite"
              className="absolute left-12 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-[11px] font-medium px-2 py-1 rounded-sm whitespace-nowrap shadow-md pointer-events-none"
            >
              Copied!
            </span>
          )}
        </div>
      </aside>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. In-Flow Broadsheet Share Bar (Below videos & articles)
  // ---------------------------------------------------------------------------
  if (variant === "bar") {
    return (
      <div
        role="region"
        aria-label={`Share this ${entityName}`}
        className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 sm:py-5 px-4 sm:px-6 bg-neutral-50 border border-neutral-200",
          className
        )}
      >
        <div className="flex items-center gap-2.5">
          <Share2 className="w-4 h-4 text-neutral-600 shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-neutral-900">
            Share this {entityName}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* X */}
          <button
            type="button"
            onClick={handleXShare}
            className="inline-flex items-center justify-center min-h-[40px] sm:min-h-[38px] gap-1.5 px-3.5 py-1.5 border border-neutral-200 bg-white text-xs font-medium text-neutral-800 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-100 transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            aria-label="Share on X"
          >
            <Twitter className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
            <span>X</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookShare}
            className="inline-flex items-center justify-center min-h-[40px] sm:min-h-[38px] gap-1.5 px-3.5 py-1.5 border border-neutral-200 bg-white text-xs font-medium text-neutral-800 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-100 transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
            <span>Facebook</span>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={handleLinkedInShare}
            className="inline-flex items-center justify-center min-h-[40px] sm:min-h-[38px] gap-1.5 px-3.5 py-1.5 border border-neutral-200 bg-white text-xs font-medium text-neutral-800 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-100 transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
            <span>LinkedIn</span>
          </button>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={cn(
              "inline-flex items-center justify-center min-h-[40px] sm:min-h-[38px] gap-1.5 px-3.5 py-1.5 border text-xs font-medium transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
              copied
                ? "bg-neutral-900 text-white border-neutral-900"
                : "border-neutral-200 bg-white text-neutral-800 hover:text-neutral-950 hover:border-neutral-400 hover:bg-neutral-100"
            )}
            aria-label={`Copy ${entityName} link`}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            ) : (
              <LinkIcon className="w-3.5 h-3.5 text-neutral-600" aria-hidden="true" />
            )}
            <span>{copied ? "Link Copied!" : "Copy Link"}</span>
          </button>

          {/* Mobile Native Share */}
          <button
            type="button"
            onClick={handleNativeShare}
            className="sm:hidden inline-flex items-center justify-center min-h-[40px] gap-1.5 px-3.5 py-1.5 border border-neutral-200 bg-white text-xs font-medium text-neutral-800 hover:text-neutral-950 transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            aria-label="More share options"
          >
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Share</span>
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. Compact Hero / Header Share Row (Default)
  // ---------------------------------------------------------------------------
  return (
    <div
      role="group"
      aria-label={`Share ${entityName}`}
      className={cn("flex items-center gap-1.5 sm:gap-2", className)}
    >
      {/* X */}
      <button
        type="button"
        onClick={handleXShare}
        className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-colors shadow-2xs flex items-center justify-center active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        aria-label="Share on X"
        title="Share on X"
      >
        <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
      </button>

      {/* Facebook */}
      <button
        type="button"
        onClick={handleFacebookShare}
        className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-colors shadow-2xs flex items-center justify-center active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
      </button>

      {/* LinkedIn */}
      <button
        type="button"
        onClick={handleLinkedInShare}
        className="w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-colors shadow-2xs flex items-center justify-center active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
      </button>

      {/* Copy Link */}
      <div className="relative">
        <button
          type="button"
          onClick={handleCopyLink}
          className={cn(
            "w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] min-h-[36px] rounded-full border transition-colors shadow-2xs flex items-center justify-center active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
            copied
              ? "bg-neutral-900 text-white border-neutral-900"
              : "border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50"
          )}
          aria-label={`Copy ${entityName} link`}
          title={`Copy ${entityName} link`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" aria-hidden="true" />
          ) : (
            <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
          )}
        </button>

        {copied && (
          <span
            role="status"
            aria-live="polite"
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-xs whitespace-nowrap shadow-md z-20 pointer-events-none"
          >
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Editorial Article Share alias for semantic consistency
 */
export const ArticleShare = ShareActions;

export default ShareActions;
