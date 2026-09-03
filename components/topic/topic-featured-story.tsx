import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Article } from "@/lib/types/article";
import { CategoryBadge, DateLabel, AuthorMeta } from "@/components/ui/editorial";
import { cn } from "@/lib/utils";

export interface TopicFeaturedStoryProps {
  article: Article;
  headingTag?: "h2" | "h3";
  className?: string;
}

export function TopicFeaturedStory({ 
  article, 
  headingTag = "h3",
  className 
}: TopicFeaturedStoryProps) {
  if (!article) return null;

  const Heading = headingTag;

  return (
    <div
      id={`featured-story-${article.slug}`}
      className={cn(
        "group relative bg-white border border-neutral-200 overflow-hidden transition-all duration-300 hover:border-neutral-900 hover:shadow-lg",
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Large Featured Image Pane */}
        <div className="lg:col-span-7 xl:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[300px] lg:min-h-[460px] overflow-hidden bg-neutral-100">
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt || `Cover image for ${article.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors duration-300" aria-hidden="true" />
          
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <span className="inline-flex items-center gap-1.5 bg-neutral-950 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 sm:px-3 sm:py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              Lead Editorial
            </span>
          </div>
        </div>

        {/* Story Details Pane */}
        <div className="lg:col-span-5 xl:col-span-4 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-neutral-200">
          <div>
            {/* Category / Topic */}
            <div className="flex items-center gap-2 mb-2.5 sm:mb-4">
              <CategoryBadge variant="solid" className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
                {article.category}
              </CategoryBadge>
            </div>

            {/* Large Headline */}
            <Heading
              className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 leading-[1.18] mb-3 sm:mb-4 group-hover:text-neutral-600 transition-colors break-words"
            >
              {article.title}
            </Heading>

            {/* Description / Subtitle */}
            {article.subtitle && (
              <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed line-clamp-3 md:line-clamp-4 mb-4 sm:mb-6">
                {article.subtitle}
              </p>
            )}
          </div>

          {/* Author / Date / Reading Time / Link */}
          <div className="pt-4 sm:pt-6 border-t border-neutral-100 flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center justify-between gap-y-1.5 text-[11px] sm:text-xs text-neutral-600 font-medium">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <AuthorMeta name={article.author.name} />
                <span aria-hidden="true">·</span>
                <DateLabel date={new Date(article.publishedAt)} />
              </div>

              {article.readingTime && (
                <span className="inline-flex items-center gap-1 text-neutral-500">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {article.readingTime} min read
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-900 pt-1 sm:pt-2">
              <span className="group-hover:text-neutral-600 transition-colors">Read Full Investigation</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
            </div>
          </div>

          {/* Full Card Hit Target */}
          <Link
            href={`/articles/${article.slug}`}
            className="absolute inset-0 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            aria-label={`Read featured story: ${article.title}`}
          />
        </div>
      </div>
    </div>
  );
}
