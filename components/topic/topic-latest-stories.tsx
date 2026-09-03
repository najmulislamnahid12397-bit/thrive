import * as React from "react";
import { Article } from "@/lib/types/article";
import { Container, Section } from "@/components/ui/layout";
import { ArticleCard } from "@/components/ui/article-card";
import { cn } from "@/lib/utils";

export interface TopicLatestStoriesProps {
  articles: Article[];
  topicName: string;
  className?: string;
}

export function TopicLatestStories({
  articles,
  topicName,
  className,
}: TopicLatestStoriesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <Section className={cn("py-10 sm:py-16 bg-white border-b border-neutral-100", className)}>
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-neutral-200 gap-2">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">
              Recent Investigations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900">
              Latest in {topicName}
            </h2>
          </div>
          <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">
            Chronological editorial reporting
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="default"
              imageAspectRatio="video"
              titleSize="default"
              hideReadingTime={false}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
