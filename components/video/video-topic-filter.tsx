"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Video } from "@/lib/types/video";
import { Check } from "lucide-react";

export interface TopicFilterItem {
  id: string;
  slug: string;
  name: string;
  count?: number;
}

export const THRYVE_VIDEO_TOPICS: TopicFilterItem[] = [
  { id: "all", slug: "all", name: "All" },
  { id: "health", slug: "health", name: "Health" },
  { id: "psychology", slug: "psychology", name: "Psychology" },
  { id: "technology", slug: "technology", name: "Technology" },
  { id: "science", slug: "science", name: "Science" },
  { id: "culture", slug: "culture", name: "Culture" },
  { id: "education", slug: "education", name: "Education" },
  { id: "society", slug: "society", name: "Society" },
  { id: "business", slug: "business", name: "Business" },
];

export interface VideoTopicFilterProps {
  /**
   * Currently active topic slug (controlled).
   */
  selectedTopic?: string;
  /**
   * Initial active topic slug (uncontrolled).
   */
  defaultTopic?: string;
  /**
   * Callback fired when a topic is selected.
   */
  onSelectTopic?: (topicSlug: string) => void;
  /**
   * Custom topics list. Defaults to the 9 Thryve topics (All + 8 categories).
   */
  topics?: TopicFilterItem[];
  /**
   * Optional local mock videos array to automatically compute counts and/or filter client-side.
   */
  videos?: Video[];
  /**
   * Callback fired with client-side filtered videos when selection changes.
   */
  onFilteredChange?: (filtered: Video[]) => void;
  /**
   * Explicit counts map (e.g. { all: 12, health: 3, ... }).
   */
  counts?: Record<string, number>;
  /**
   * Whether to display numerical count badges. Defaults to true.
   */
  showCounts?: boolean;
  /**
   * Layout style: "wrap" (wraps pills) or "scroll" (horizontal swipe track without window overflow). Defaults to "scroll".
   */
  layout?: "scroll" | "wrap";
  /**
   * Optional aria-label for accessibility.
   */
  ariaLabel?: string;
  /**
   * Additional container className.
   */
  className?: string;
}

/**
 * Normalizes a topic slug/name for comparison (lowercased and trimmed).
 */
function normalizeTopic(val?: string): string {
  if (!val) return "all";
  return val.trim().toLowerCase();
}

export function VideoTopicFilter({
  selectedTopic: controlledTopic,
  defaultTopic = "all",
  onSelectTopic,
  topics = THRYVE_VIDEO_TOPICS,
  videos,
  onFilteredChange,
  counts: customCounts,
  showCounts = true,
  layout = "scroll",
  ariaLabel = "Filter videos by topic",
  className,
}: VideoTopicFilterProps) {
  // Local state for uncontrolled usage
  const [internalTopic, setInternalTopic] = React.useState<string>(defaultTopic);
  const activeTopic = controlledTopic !== undefined ? controlledTopic : internalTopic;
  const normalizedActive = normalizeTopic(activeTopic);

  // References for keyboard navigation
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Compute counts dynamically if mock videos are provided and custom counts are not
  const computedCounts = React.useMemo(() => {
    if (customCounts) return customCounts;
    if (!videos || videos.length === 0) return {};

    const countsMap: Record<string, number> = {
      all: videos.length,
    };

    videos.forEach((video) => {
      const cat = normalizeTopic(video.category);
      countsMap[cat] = (countsMap[cat] || 0) + 1;

      // Also tally topics array if present
      if (Array.isArray(video.topics)) {
        video.topics.forEach((t) => {
          const normT = normalizeTopic(t);
          if (normT !== cat) {
            countsMap[normT] = (countsMap[normT] || 0) + 1;
          }
        });
      }
    });

    return countsMap;
  }, [videos, customCounts]);

  // Merge computed counts into topics
  const topicsWithCounts = React.useMemo(() => {
    return topics.map((t) => {
      const slugNorm = normalizeTopic(t.slug);
      const calculatedCount =
        t.count !== undefined ? t.count : computedCounts[slugNorm];
      return {
        ...t,
        count: calculatedCount,
      };
    });
  }, [topics, computedCounts]);

  // Handle selection
  const handleSelect = React.useCallback(
    (slug: string) => {
      const norm = normalizeTopic(slug);
      if (controlledTopic === undefined) {
        setInternalTopic(norm);
      }
      onSelectTopic?.(norm);

      // If videos and onFilteredChange are provided, run client-side filtering
      if (videos && onFilteredChange) {
        if (norm === "all") {
          onFilteredChange(videos);
        } else {
          const filtered = videos.filter((v) => {
            const matchCat = normalizeTopic(v.category) === norm;
            const matchTopic =
              Array.isArray(v.topics) &&
              v.topics.some((t) => normalizeTopic(t) === norm);
            return matchCat || matchTopic;
          });
          onFilteredChange(filtered);
        }
      }
    },
    [controlledTopic, onSelectTopic, videos, onFilteredChange]
  );

  // Keyboard navigation (WAI-ARIA Tabs pattern)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = topicsWithCounts.length;
    let nextIndex = -1;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (index + 1) % total;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextIndex = (index - 1 + total) % total;
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        e.preventDefault();
        nextIndex = total - 1;
        break;
      default:
        return;
    }

    if (nextIndex >= 0 && tabRefs.current[nextIndex]) {
      const targetBtn = tabRefs.current[nextIndex];
      targetBtn?.focus();
      const targetSlug = topicsWithCounts[nextIndex].slug;
      handleSelect(targetSlug);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-full overflow-hidden",
        className
      )}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "max-w-full items-center gap-2",
          layout === "scroll"
            ? "flex overflow-x-auto pb-2 pt-1 px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "flex flex-wrap pt-1"
        )}
      >
        {topicsWithCounts.map((topic, index) => {
          const isSelected = normalizeTopic(topic.slug) === normalizedActive;
          const count = topic.count;

          return (
            <button
              key={topic.id || topic.slug}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`video-topic-tab-${topic.slug}`}
              aria-selected={isSelected}
              aria-controls={`video-topic-panel-${topic.slug}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(topic.slug)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "group relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 min-h-[44px] text-xs font-mono uppercase tracking-wider transition-all duration-150 shrink-0 cursor-pointer rounded-none border focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                isSelected
                  ? "bg-neutral-900 text-white border-neutral-900 shadow-sm font-semibold"
                  : "bg-neutral-50 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border-neutral-200 hover:border-neutral-300 font-normal"
              )}
            >
              {isSelected && (
                <Check
                  className="w-3 h-3 shrink-0 text-emerald-400 stroke-[2.5]"
                  aria-hidden="true"
                />
              )}
              <span className="truncate">{topic.name}</span>

              {showCounts && typeof count === "number" && (
                <span
                  className={cn(
                    "text-[10px] ml-1 px-1.5 py-0.5 tabular-nums transition-colors",
                    isSelected
                      ? "bg-neutral-800 text-neutral-300"
                      : "bg-neutral-200/80 text-neutral-600 group-hover:bg-neutral-300/80 group-hover:text-neutral-900"
                  )}
                  aria-label={`${count} videos`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
