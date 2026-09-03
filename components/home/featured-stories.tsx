import { Container, Grid12, SectionTight } from "@/components/ui/layout";
import { ArticleCard } from "@/components/ui/article-card";
import { getFeaturedArticles } from "@/lib/data";

export async function FeaturedStories() {
  const articles = await getFeaturedArticles();
  
  if (articles.length < 3) return null;

  const mainStory = articles[0];
  const sideStories = articles.slice(1);

  return (
    <SectionTight className="pb-16 md:pb-24 border-b border-neutral-100">
      <Container>
        <h2 className="sr-only">Featured Stories</h2>
        <Grid12>
          {/* Main Featured Story */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 mb-10 lg:mb-0">
            <ArticleCard 
              article={mainStory} 
              variant="featured" 
              className="h-full border-none"
            />
          </div>

          {/* Secondary Featured Stories */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-8 lg:gap-8 justify-between">
            {sideStories.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="default"
                hideDescription
                imageAspectRatio="video"
                imageClassName="sm:aspect-video lg:aspect-square w-full lg:w-32 xl:w-40 shrink-0"
                className="flex-1 border-none sm:flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6"
                titleSize="sm"
              />
            ))}
          </div>
        </Grid12>
      </Container>
    </SectionTight>
  );
}
