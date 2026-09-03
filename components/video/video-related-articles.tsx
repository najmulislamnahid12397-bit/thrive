import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Article } from "@/lib/types/article";
import { ArticleCard } from "@/components/ui/article-card";
import { cn } from "@/lib/utils";

export interface VideoRelatedArticlesProps {
  /**
   * 3 to 4 articles related to the current video documentary.
   */
  articles: Article[];
  /**
   * Optional custom section heading.
   */
  heading?: string;
  /**
   * Video category or topic context.
   */
  category?: string;
  /**
   * Additional wrapper class names.
   */
  className?: string;
}

/**
 * VideoRelatedArticles section component.
 * Displays 3-4 companion articles related to the current video documentary,
 * reusing the established broadsheet ArticleCard component from Phase 4.
 */
export function VideoRelatedArticles({
  articles,
  heading,
  category,
  className,
}: VideoRelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  // Constrain display count strictly to 3–4 articles
  const displayArticles = articles.slice(0, 4);
  const count = displayArticles.length;

  const defaultHeading = category
    ? `Related Investigative Reporting in ${category}`
    : "Companion Field Reports & Essays";

  return (
    <section
      aria-labelledby="video-related-articles-heading"
      className={cn("space-y-6", className)}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Companion Literature</span>
          </div>
          <h2
            id="video-related-articles-heading"
            className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-neutral-900"
          >
            {heading || defaultHeading}
          </h2>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 transition-colors focus:outline-none focus-visible:underline"
        >
          <span>Browse All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Grid of Existing ArticleCard components */}
      <div
        className={cn(
          "grid gap-6 sm:gap-8",
          count === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {displayArticles.map((article) => (
          <ArticleCard
            key={article.id || article.slug}
            article={article}
            hideReadingTime={false}
            hideDescription={false}
            titleSize={count === 4 ? "sm" : "default"}
          />
        ))}
      </div>
    </section>
  );
}

export default VideoRelatedArticles;
