import React from "react";
import { Article } from "@/lib/types/article";
import { CategoryBadge } from "@/components/ui/editorial";
import { DisplayMedium, Body } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArticleAuthor } from "@/components/article/article-author";
import { ShareActions } from "@/components/article/share-actions";
import { EditorialImage } from "@/components/article/editorial-image";

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: article.category, href: `/articles?category=${encodeURIComponent(article.category.toLowerCase())}` },
  ];

  return (
    <header className="pt-6 pb-8 sm:pt-10 sm:pb-12 md:pt-14 lg:pt-16 lg:pb-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Reusable Breadcrumbs */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <Breadcrumbs variant="inline" items={breadcrumbItems} />
        </div>

        {/* Category */}
        <div className="mb-4 sm:mb-6">
          <CategoryBadge variant="solid">
            {article.category || "General"}
          </CategoryBadge>
        </div>

        {/* Title */}
        <DisplayMedium className="mb-4 sm:mb-6 leading-[1.18] sm:leading-[1.12]">
          {article.title}
        </DisplayMedium>

        {/* Subtitle / Deck */}
        {article.subtitle && (
          <Body className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed sm:leading-relaxed mb-6 sm:mb-8 md:mb-10">
            {article.subtitle}
          </Body>
        )}

        {/* Author & Metadata Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 py-5 sm:py-6 border-y border-neutral-100">
          <ArticleAuthor
            author={article.author}
            variant="compact"
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
            readingTime={article.readingTime}
          />

          {/* Share Actions */}
          <div className="pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-50 flex items-center justify-between sm:justify-end">
            <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest text-neutral-400">Share Story</span>
            <ShareActions title={article.title} variant="hero" />
          </div>
        </div>
      </div>

      {/* Hero Image - Spans wider than the text column for visual tension */}
      {article.heroImage && (
        <EditorialImage 
          src={article.heroImage}
          alt={article.heroImageAlt || article.title}
          caption={article.heroCaption}
          credit={article.heroImageCredit}
          layout="wide"
          priority={true}
          className="my-0 lg:my-0 mt-4 sm:mt-8 md:mt-12"
        />
      )}
    </header>
  );
}
