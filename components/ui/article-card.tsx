import React from "react";
import Link from "next/link";
import { Article } from "@/lib/types/article";
import { Card, CardImage, CardContent, CardCategory, CardTitle, CardDescription, CardFooter, CardLink } from "@/components/ui/card";
import { CategoryBadge, DateLabel, AuthorMeta, Metadata, ReadingTime } from "@/components/ui/editorial";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "horizontal" | "compact";
  hideDescription?: boolean;
  hideAuthor?: boolean;
  hideReadingTime?: boolean;
  imageAspectRatio?: "video" | "square" | "portrait" | "wide" | "auto";
  imageClassName?: string;
  titleSize?: "sm" | "default" | "lg";
  className?: string;
}

export function ArticleCard({
  article,
  variant = "default",
  hideDescription = false,
  hideAuthor = false,
  hideReadingTime = true,
  imageAspectRatio = "video",
  imageClassName,
  titleSize,
  className,
}: ArticleCardProps) {
  // Determine default title size based on variant if not provided
  const resolvedTitleSize = titleSize || (variant === "featured" ? "lg" : variant === "horizontal" ? "sm" : "default");
  const topicSlug = article.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <Card variant={variant} className={className}>
      <CardImage 
        src={article.heroImage} 
        alt={article.heroImageAlt || article.title} 
        aspectRatio={imageAspectRatio} 
        className={imageClassName}
      />
      <CardContent>
        <CardCategory>
          <Link
            href={`/topics/${topicSlug}`}
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <CategoryBadge variant="outline">{article.category}</CategoryBadge>
          </Link>
        </CardCategory>
        
        <CardTitle size={resolvedTitleSize} className="mt-2">
          {article.title}
        </CardTitle>
        
        {!hideDescription && article.subtitle && (
          <CardDescription className={variant === "featured" ? "text-base md:text-lg mt-2" : "mt-2"}>
            {article.subtitle}
          </CardDescription>
        )}
        
        <CardFooter className="pt-4">
          <Metadata>
            {!hideAuthor && <AuthorMeta name={article.author.name} />}
            <DateLabel date={new Date(article.publishedAt)} />
            {!hideReadingTime && <ReadingTime minutes={article.readingTime} />}
          </Metadata>
        </CardFooter>
      </CardContent>
      <CardLink href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`} />
    </Card>
  );
}
