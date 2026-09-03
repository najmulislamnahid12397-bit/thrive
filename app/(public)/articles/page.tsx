import React from "react";
import { Metadata } from "next";
import { Container, Section } from "@/components/ui/layout";
import { H1, H2, Body } from "@/components/ui/typography";
import { ArticleCard } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Articles | Thryve",
  description: "Browse all articles, insights, and stories from Thryve.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  // Establish visual hierarchy
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const remainingArticles = articles.filter(a => a.id !== featuredArticle?.id);
  
  const topArticles = remainingArticles.slice(0, 2);
  const archiveArticles = remainingArticles.slice(2);

  return (
    <div className="pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 bg-white min-h-screen">
      <Container>
        {/* Page Header */}
        <header className="mb-8 sm:mb-12 md:mb-16 border-b border-neutral-200 pb-8 sm:pb-12">
          <H1 className="mb-3 sm:mb-4 md:mb-6">
            The Archive
          </H1>
          <Body className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl leading-relaxed">
            Dive into our complete collection of stories, analysis, and perspectives shaping the future of technology and culture.
          </Body>
        </header>

        {/* Featured Article Area */}
        {featuredArticle && (
          <Section className="py-0 md:py-0 lg:py-0 mb-10 sm:mb-16 md:mb-24">
            <ArticleCard 
              article={featuredArticle} 
              variant="featured" 
              imageAspectRatio="wide"
            />
          </Section>
        )}

        {/* Latest Articles (Secondary Highlights) */}
        {topArticles.length > 0 && (
          <Section className="py-0 md:py-0 lg:py-0 mb-12 sm:mb-16 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {topArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  variant="default"
                  imageAspectRatio="video"
                  titleSize="lg"
                />
              ))}
            </div>
          </Section>
        )}

        {/* Article Grid / List */}
        <Section className="py-0 md:py-0 lg:py-0 border-t border-neutral-200 pt-10 sm:pt-16 md:pt-20">
          <H2 className="mb-6 sm:mb-10 md:mb-12">All Stories</H2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12">
            {archiveArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="default"
              />
            ))}
          </div>

          {/* Load More Placeholder */}
          <div className="mt-12 sm:mt-16 md:mt-24 flex justify-center border-t border-neutral-100 pt-8 sm:pt-12">
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] min-h-[48px] text-sm font-semibold">
              Load More Stories
            </Button>
          </div>
        </Section>
      </Container>
    </div>
  );
}
