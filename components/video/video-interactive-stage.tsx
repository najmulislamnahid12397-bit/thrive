"use client";

import * as React from "react";
import { VideoTopSection } from "./video-top-section";
import { VideoChapters } from "./video-chapters";
import { VideoTranscript } from "./video-transcript";
import { Video } from "@/lib/types/video";
import { cn } from "@/lib/utils";
import { ListOrdered, FileText } from "lucide-react";

export interface VideoInteractiveStageProps {
  video: Video;
  className?: string;
}

export function VideoInteractiveStage({ video, className }: VideoInteractiveStageProps) {
  const [seekToTime, setSeekToTime] = React.useState<number | null>(null);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const hasChapters = Array.isArray(video.chapters) && video.chapters.length > 0;
  const hasTranscript = Array.isArray(video.transcript) && video.transcript.length > 0;

  const [activeTab, setActiveTab] = React.useState<"chapters" | "transcript" | "both">(() => {
    if (!hasChapters && hasTranscript) return "transcript";
    return "chapters";
  });

  const handleSeek = (seconds: number) => {
    setSeekToTime(seconds);
    // Smooth scroll back up to video player if user is deep in transcript
    const playerEl = document.getElementById("video-player-container");
    if (playerEl && window.scrollY > playerEl.offsetTop + playerEl.offsetHeight) {
      playerEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Reset seek state shortly after so subsequent clicks to same timestamp trigger seek
    setTimeout(() => {
      setSeekToTime(null);
    }, 150);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* 1. Top Section strictly following requested sequence:
          Breadcrumb -> Video Player -> Category -> Title -> Description -> Author -> Date -> Duration -> Share Actions */}
      <VideoTopSection
        video={video}
        seekToTime={seekToTime}
        onTimeUpdate={setCurrentTime}
      />

      {/* 2. Synchronized Chapters & Transcript Accordion / Drawer (if available) */}
      {(hasChapters || hasTranscript) && (
        <div id="video-media-sync" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <div className="border border-neutral-200 bg-white shadow-xs">
            {/* Section Header with Tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 px-4 sm:px-6 py-3 bg-neutral-50/70 gap-2">
              <div role="tablist" aria-label="Media synchronized content" className="flex items-center gap-1.5 sm:gap-2">
                {hasChapters && (
                  <button
                    role="tab"
                    onClick={() => setActiveTab("chapters")}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
                      activeTab === "chapters"
                        ? "bg-neutral-900 text-white font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200/80"
                    )}
                    aria-selected={activeTab === "chapters"}
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>Chapters ({video.chapters?.length})</span>
                  </button>
                )}

                {hasTranscript && (
                  <button
                    role="tab"
                    onClick={() => setActiveTab("transcript")}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
                      activeTab === "transcript"
                        ? "bg-neutral-900 text-white font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200/80"
                    )}
                    aria-selected={activeTab === "transcript"}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Transcript</span>
                  </button>
                )}

                {hasChapters && hasTranscript && (
                  <button
                    role="tab"
                    onClick={() => setActiveTab("both")}
                    className={cn(
                      "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
                      activeTab === "both"
                        ? "bg-neutral-900 text-white font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200/80"
                    )}
                    aria-selected={activeTab === "both"}
                  >
                    <span>Overview (Both)</span>
                  </button>
                )}
              </div>

              <span className="text-[11px] font-mono text-neutral-400 hidden md:inline-block">
                Interactive Media Sync
              </span>
            </div>

            {/* Active Panel */}
            <div className="p-4 sm:p-6">
              {activeTab === "chapters" && hasChapters && (
                <VideoChapters
                  chapters={video.chapters}
                  currentTime={currentTime}
                  onSeek={handleSeek}
                  showHeader={false}
                  className="border-0 p-0 shadow-none bg-transparent"
                />
              )}

              {activeTab === "transcript" && hasTranscript && (
                <VideoTranscript
                  transcript={video.transcript}
                  currentTime={currentTime}
                  onSeek={handleSeek}
                  showHeader={false}
                  collapsible={false}
                  className="border-0 p-0 shadow-none bg-transparent"
                />
              )}

              {activeTab === "both" && hasChapters && hasTranscript && (
                <div className="space-y-8 divide-y divide-neutral-200">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-1.5">
                      <ListOrdered className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Program Breakdown ({video.chapters?.length} Chapters)</span>
                    </h3>
                    <VideoChapters
                      chapters={video.chapters}
                      currentTime={currentTime}
                      onSeek={handleSeek}
                      showHeader={false}
                      className="border-0 p-0 shadow-none bg-transparent"
                    />
                  </div>
                  <div className="pt-8">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Verbatim Transcript & Dialogue</span>
                    </h3>
                    <VideoTranscript
                      transcript={video.transcript}
                      currentTime={currentTime}
                      onSeek={handleSeek}
                      showHeader={false}
                      collapsible={false}
                      className="border-0 p-0 shadow-none bg-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

