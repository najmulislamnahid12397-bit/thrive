import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/types/article";
import { Container, Section } from "@/components/ui/layout";
import { CategoryBadge, AuthorMeta, DateLabel, ReadingTime } from "@/components/ui/editorial";
import { ArrowRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopicPopularStoriesProps {
  articles: Article[];
  topicName?: string;
  layout?: "split" | "ranked";
  className?: string;
}

export function TopicPopularStories({
  articles,
  topicName,
  layout = "split",
  className,
}: TopicPopularStoriesProps) {
  if (!articles || articles.length === 0) return null;

  const displayArticles = articles.slice(0, 5);
  const primaryStory = displayArticles[0];
  const secondaryStories = displayArticles.slice(1);

  return (
    <Section
      id={topicName ? `popular-stories-${topicName.toLowerCase()}` : "topic-popular-stories"}
      aria-label={topicName ? `Popular stories in ${topicName}` : "Popular stories"}
      className={cn("py-12 md:py-16 bg-neutral-50/70 border-b border-neutral-200/80", className)}
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-neutral-200 gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
              <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" aria-hidden="true" />
              <span>Trending Reads</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900">
              {topicName ? `Most Read in ${topicName}` : "Most Popular Stories"}
            </h2>
          </div>
          <span className="text-[11px] sm:text-xs text-neutral-500 font-medium">
            Ranked by member engagement & citations
          </span>
        </div>

        {/* Layout Mode: Split (1 Large Highlight + Ranked Secondary Stories) */}
        {layout === "split" && displayArticles.length >= 2 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Primary Large Highlight */}
            <div className="lg:col-span-7 group relative bg-white border border-neutral-200 flex flex-col justify-between transition-all duration-300 hover:border-neutral-900 hover:shadow-md">
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-100 shrink-0">
                  <Image
                    src={primaryStory.heroImage}
                    alt={primaryStory.heroImageAlt || primaryStory.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-300" />
                  
                    {/* Rank 01 Marker */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20">
                    <span className="inline-flex items-center gap-1.5 bg-neutral-950 text-white font-serif text-xs sm:text-sm font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1">
                      #01
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                    <CategoryBadge variant="outline" className="text-[10px]">
                      {primaryStory.category}
                    </CategoryBadge>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 mb-2 sm:mb-3 group-hover:text-neutral-600 transition-colors leading-snug break-words">
                    {primaryStory.title}
                  </h3>

                  {primaryStory.subtitle && (
                    <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed line-clamp-3 mb-4 sm:mb-6">
                      {primaryStory.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Meta Footer */}
              <div className="px-4 pb-4 sm:px-8 sm:pb-8 pt-0 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 mt-auto pt-3 sm:pt-4 text-[11px] sm:text-xs text-neutral-600">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <AuthorMeta name={primaryStory.author.name} />
                  <span aria-hidden="true">·</span>
                  <DateLabel date={new Date(primaryStory.publishedAt)} />
                </div>
                {primaryStory.readingTime && (
                  <ReadingTime minutes={primaryStory.readingTime} />
                )}
              </div>

              <Link
                href={`/articles/${primaryStory.slug}`}
                className="absolute inset-0 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                aria-label={`Read story: ${primaryStory.title}`}
              />
            </div>

            {/* Supporting Ranked Stories (02, 03, 04...) */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-neutral-200 bg-white border border-neutral-200">
              {secondaryStories.map((story, index) => {
                const rankNumber = String(index + 2).padStart(2, "0");
                return (
                  <div
                    key={story.id}
                    className="group relative p-4 sm:p-6 md:p-7 flex gap-3 sm:gap-5 items-start transition-colors duration-200 hover:bg-neutral-50/80"
                  >
                    {/* Big Serif Rank Number */}
                    <span 
                      className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-neutral-300 group-hover:text-neutral-900 transition-colors shrink-0 select-none leading-none pt-0.5"
                      aria-hidden="true"
                    >
                      {rankNumber}
                    </span>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                            {story.category}
                          </span>
                        </div>

                        <h3 className="font-serif text-base sm:text-lg md:text-xl font-medium tracking-tight text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors line-clamp-2 mb-1.5 sm:mb-2 break-words">
                          {story.title}
                        </h3>

                        {story.subtitle && (
                          <p className="font-sans text-xs sm:text-sm text-neutral-600 line-clamp-2 mb-3 sm:mb-4">
                            {story.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-[11px] sm:text-xs text-neutral-500 font-medium pt-2 border-t border-neutral-100">
                        <span className="text-neutral-700 font-bold uppercase tracking-wider text-[9px] sm:text-[10px]">
                          {story.author.name}
                        </span>
                        <span aria-hidden="true">·</span>
                        <DateLabel date={new Date(story.publishedAt)} />
                        {story.readingTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <ReadingTime minutes={story.readingTime} />
                          </>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/articles/${story.slug}`}
                      className="absolute inset-0 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                      aria-label={`Read story: ${story.title}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Ranked Grid Layout (All stories rendered as numbered cards) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {displayArticles.map((article, index) => {
              const rank = String(index + 1).padStart(2, "0");
              return (
                <div
                  key={article.id}
                  className="group relative bg-white border border-neutral-200 p-4 sm:p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:border-neutral-900 hover:shadow-md"
                >
                  <div>
                    {/* Big Number Index */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span 
                        className="font-serif text-2xl sm:text-3xl font-light text-neutral-300 group-hover:text-neutral-900 transition-colors"
                        aria-hidden="true"
                      >
                        {rank}
                      </span>
                      <CategoryBadge variant="outline" className="text-[10px]">
                        {article.category}
                      </CategoryBadge>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-neutral-900 mb-2 sm:mb-3 group-hover:text-neutral-600 transition-colors line-clamp-3 leading-snug break-words">
                      {article.title}
                    </h3>

                    {/* Subtitle */}
                    {article.subtitle && (
                      <p className="font-sans text-xs sm:text-sm text-neutral-600 line-clamp-2 mb-4 sm:mb-6">
                        {article.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 sm:pt-4 border-t border-neutral-100 flex flex-col gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-600">
                    <div className="flex items-center justify-between">
                      <AuthorMeta name={article.author.name} />
                      {article.readingTime && (
                        <ReadingTime minutes={article.readingTime} />
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <DateLabel date={new Date(article.publishedAt)} />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-neutral-900 flex items-center gap-1 group-hover:text-neutral-600">
                        Read Story
                        <ArrowRight className="h-3 w-3 transform transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="absolute inset-0 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                    aria-label={`Read story: ${article.title}`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}
