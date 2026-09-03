import React from "react";
import { Article } from "@/lib/types/article";
import { ArticleCard } from "@/components/ui/article-card";
import { Section } from "@/components/ui/layout";
import { H2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
  className?: string;
}

export function RelatedArticles({
  articles,
  title = "More from Thryve",
  className,
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const displayArticles = articles.slice(0, 3);

  return (
    <section
      aria-labelledby="related-articles-heading"
      className={cn("bg-neutral-50 py-10 sm:py-14 md:py-20 lg:py-24 border-t border-neutral-200", className)}
    >
      <Section className="py-0 md:py-0 lg:py-0">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <H2 id="related-articles-heading" className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-neutral-900">
            {title}
          </H2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayArticles.map((article) => (
            <ArticleCard
              key={article.id || article.slug}
              article={article}
              hideReadingTime={false}
              hideDescription={false}
            />
          ))}
        </div>
      </Section>
    </section>
  );
}

export default RelatedArticles;
