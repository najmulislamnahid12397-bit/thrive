"use client";

import * as React from "react";
import { Video } from "@/lib/types/video";
import { VideoCard } from "@/components/video/video-card";
import { VideoTopicFilter } from "@/components/video/video-topic-filter";
import { cn } from "@/lib/utils";
import { Film } from "lucide-react";

export interface VideoArchiveFilterProps {
  videos: Video[];
  initialCategory?: string;
  className?: string;
}

export function VideoArchiveFilter({
  videos,
  initialCategory = "all",
  className,
}: VideoArchiveFilterProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    initialCategory.toLowerCase()
  );

  // Filtered videos based on UI filter selection
  const filteredVideos = React.useMemo(() => {
    const norm = selectedCategory.toLowerCase();
    if (norm === "all") {
      return videos;
    }
    return videos.filter((video) => {
      const catMatch = video.category?.toLowerCase() === norm;
      const topicMatch =
        Array.isArray(video.topics) &&
        video.topics.some((t) => t.toLowerCase() === norm);
      return catMatch || topicMatch;
    });
  }, [videos, selectedCategory]);

  return (
    <div className={cn("space-y-8", className)}>
      {/* Category Filter Controls using reusable VideoTopicFilter */}
      <div className="border-b border-neutral-200 pb-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
            Filter by Discipline
          </span>
          <span className="text-xs font-mono text-neutral-500">
            Showing {filteredVideos.length} of {videos.length} broadcasts
          </span>
        </div>

        <VideoTopicFilter
          selectedTopic={selectedCategory}
          onSelectTopic={setSelectedCategory}
          videos={videos}
          ariaLabel="Filter broadcasts by discipline"
        />
      </div>

      {/* Grid of Filtered Broadcasts */}
      {filteredVideos.length > 0 ? (
        <div
          role="region"
          aria-live="polite"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {filteredVideos.map((video, idx) => (
            <div key={video.id || video.slug} className="flex flex-col h-full">
              <VideoCard
                video={video}
                variant="default"
                priority={idx < 3}
                showDescription={true}
                className="h-full"
              />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center border border-dashed border-neutral-200 p-8">
          <Film className="w-8 h-8 mx-auto text-neutral-400 mb-3" aria-hidden="true" />
          <h3 className="font-serif text-lg text-neutral-900 mb-1">
            No broadcasts found in &ldquo;{selectedCategory}&rdquo;
          </h3>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-4">
            There are currently no published investigations in this category.
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-xs font-mono uppercase tracking-widest text-neutral-900 underline underline-offset-4 hover:text-neutral-600 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            Reset filter to show all broadcasts
          </button>
        </div>
      )}
    </div>
  );
}

