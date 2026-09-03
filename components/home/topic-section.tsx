import { Container, Section, SectionHeader, Grid12 } from "@/components/ui/layout";
import { ArticleCard } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTopicBySlug, getArticlesByTopic } from "@/lib/data";

export interface TopicSectionProps {
  topicSlug?: string;
  className?: string;
}

export async function TopicSection({ topicSlug = "health", className }: TopicSectionProps = {}) {
  const topic = await getTopicBySlug(topicSlug);
  if (!topic) return null;

  const articles = await getArticlesByTopic(topic.slug, 4);
  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const supporting = articles.slice(1, 4);

  return (
    <Section className={className || "bg-neutral-50 border-y border-neutral-100"}>
      <Container>
        <SectionHeader 
          title={topic.name} 
          description={topic.description}
          action={
            <Link href={`/topics/${topic.slug}`}>
              <Button variant="outline">Explore {topic.name}</Button>
            </Link>
          }
        />
        <Grid12>
          {/* Left Column: Featured Topic Story */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 mb-10 lg:mb-0">
            <ArticleCard 
              article={featured} 
              variant="featured" 
              className="border-none bg-transparent h-full"
              hideReadingTime={false}
              imageClassName="rounded-none"
            />
          </div>

          {/* Right Column: Supporting Stories */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col gap-8 lg:pl-10">
            {supporting.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                variant="horizontal"
                hideDescription
                imageAspectRatio="square"
                imageClassName="w-24 md:w-32 shrink-0 rounded-none"
                className="border-none bg-transparent group items-center"
                titleSize="sm"
              />
            ))}
          </div>
        </Grid12>
      </Container>
    </Section>
  );
}
