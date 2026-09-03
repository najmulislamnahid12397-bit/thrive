import * as React from "react";
import { Article } from "@/lib/types/article";
import { Container, Section } from "@/components/ui/layout";
import { ArticleCard } from "@/components/ui/article-card";
import { Archive, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MoreTopicStoriesProps {
  articles: Article[];
  topicName?: string;
  layout?: "grid" | "list";
  maxStories?: number;
  className?: string;
}

export function MoreTopicStories({
  articles,
  topicName,
  layout = "list",
  maxStories = 8,
  className,
}: MoreTopicStoriesProps) {
  if (!articles || articles.length === 0) return null;

  // Display between 6–10 stories as requested
  const displayArticles = articles.slice(0, maxStories);

  return (
    <Section
      id={topicName ? `more-stories-${topicName.toLowerCase()}` : "more-topic-stories"}
      aria-label={topicName ? `More stories in ${topicName}` : "More topic stories"}
      className={cn("py-10 sm:py-16 md:py-20 bg-white border-b border-neutral-200/80", className)}
    >
      <Container>
        {/* Section Heading & Context */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 pb-3 sm:pb-4 border-b border-neutral-200 gap-2 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1 sm:mb-1.5">
              <Archive className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-600" aria-hidden="true" />
              <span>Editorial Archive</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900">
              {topicName ? `More Stories in ${topicName}` : "Archive Dispatches"}
            </h2>
            <p className="mt-1 text-neutral-500 font-sans text-xs sm:text-sm md:text-base">
              Chronological reporting, retrospective analyses, and in-depth dispatches.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{displayArticles.length} Stories</span>
          </div>
        </div>

        {/* Layout: 2-Column Horizontal Editorial Stream (Different from 3-Column Vertical Latest Stories) */}
        {layout === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {displayArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="horizontal"
                imageAspectRatio="video"
                imageClassName="w-24 sm:w-36 md:w-44 shrink-0 aspect-[4/3] sm:aspect-video"
                titleSize="sm"
                hideDescription={false}
                hideReadingTime={false}
                className="bg-white p-3.5 sm:p-5 border border-neutral-200 hover:border-neutral-900 transition-all duration-300 hover:shadow-xs"
              />
            ))}
          </div>
        ) : (
          /* Alternate 3/4-Column Compact Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="default"
                imageAspectRatio="video"
                titleSize="sm"
                hideDescription={true}
                hideReadingTime={false}
                className="bg-white p-3.5 sm:p-4 border border-neutral-200 hover:border-neutral-900 transition-all duration-300 hover:shadow-xs"
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

// Named alias for backward compatibility
export const TopicMoreStories = MoreTopicStories;
