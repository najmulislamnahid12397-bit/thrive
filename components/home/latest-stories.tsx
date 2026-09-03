import { Container, Section, SectionHeader, Stack } from "@/components/ui/layout";
import { ArticleCard } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLatestArticles } from "@/lib/data";

export async function LatestStories() {
  const articles = await getLatestArticles();
  
  if (articles.length < 6) return null;

  const topStories = articles.slice(0, 2);
  const bottomStories = articles.slice(2, 6);

  return (
    <Section>
      <Container>
        <SectionHeader 
          title="Latest Stories" 
          description="The newest deep dives, reports, and essays from the Thryve editorial team."
          action={
            <Link href="/articles">
              <Button variant="outline">View All</Button>
            </Link>
          }
        />
        
        <Stack gap="xl">
          {/* Top Row: 2 Large Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
            {topStories.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="default" 
                className="border-none"
                hideReadingTime={false}
              />
            ))}
          </div>

          {/* Bottom Row: 4 Compact Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-neutral-100 pt-10 md:pt-16">
            {bottomStories.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="default"
                hideDescription
                imageAspectRatio="video"
                imageClassName="sm:aspect-[3/2] lg:aspect-[4/3]"
                className="border-none"
                titleSize="sm"
              />
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
