import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticleBySlug, getRelatedArticles, getAllArticles } from "@/lib/data";
import { ArticleHero } from "@/components/article/article-hero";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleAuthor } from "@/components/article/article-author";
import { ArticleReadingProgress } from "@/components/article/article-reading-progress";
import { ShareActions } from "@/components/article/share-actions";
import { RelatedArticles } from "@/components/article/related-articles";
import { NewsletterSection } from "@/components/home/newsletter-section";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Thryve",
      description: "The requested editorial story could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const publishedTime = article.publishedAt;
  const modifiedTime = article.updatedAt || article.publishedAt;
  const canonicalUrl = `/articles/${article.slug}`;

  return {
    title: `${article.title} | Thryve`,
    description: article.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.subtitle,
      url: canonicalUrl,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [article.author.name],
      section: article.category,
      tags: article.tags,
      images: [
        {
          url: article.heroImage,
          alt: article.heroImageAlt || article.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
      images: [article.heroImage],
      creator: article.author.social?.twitter
        ? `@${article.author.social.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, "").replace(/\/$/, "")}`
        : undefined,
    },
    other: {
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
      "article:author": article.author.name,
      "article:section": article.category,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.relatedArticles || [], article.slug);

  return (
    <article className="bg-white min-h-screen relative">
      {/* 1. Reading Progress Bar */}
      <ArticleReadingProgress />

      {/* 2. Article Hero (includes Breadcrumbs, Category, Title, Subtitle, Author row, Hero Image) */}
      <ArticleHero article={article} />

      {/* 3. Main Reading Area with Desktop Floating Share Rail */}
      <div className="w-full py-6 sm:py-10 md:py-16 lg:py-20 relative">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative">
          {/* Floating Share Rail on XL Screens */}
          <div className="hidden xl:block absolute left-8 2xl:left-16 top-0 h-full">
            <ShareActions title={article.title} variant="rail" />
          </div>

          {/* Core Article Body */}
          <ArticleBody sections={article.sections} />

          {/* Bottom Share Row for Mobile / Tablet / All Screens */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
            <ShareActions title={article.title} variant="bar" />
          </div>

          {/* 4. Large Author Bio Section */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
            <ArticleAuthor author={article.author} variant="large" />
          </div>
        </div>
      </div>

      {/* 5. Related Articles Section ("More from Thryve") */}
      <RelatedArticles articles={relatedArticles} title="More from Thryve" />
      
      {/* 6. Newsletter CTA Section */}
      <NewsletterSection />
    </article>
  );
}
