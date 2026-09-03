import Link from "next/link";
import Image from "next/image";
import { Container, Section, Grid12, Stack } from "@/components/ui/layout";
import { DisplayLarge, Body } from "@/components/ui/typography";
import { CategoryBadge, DateLabel, AuthorMeta, Metadata, ReadingTime } from "@/components/ui/editorial";
import { Button } from "@/components/ui/button";
import { getFeaturedArticles } from "@/lib/data";

export async function HeroSection() {
  const articles = await getFeaturedArticles();
  const heroArticle = articles[0];
  
  if (!heroArticle) return null;

  return (
    <Section className="pt-8 md:pt-16 pb-12 md:pb-24 border-b border-neutral-100 bg-white">
      <Container>
        <Grid12 className="items-center">
          {/* Left Column: Typography & Actions */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <Stack gap="base">
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href={`/topics/${heroArticle.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:opacity-80 transition-opacity"
                >
                  <CategoryBadge variant="solid">{heroArticle.category}</CategoryBadge>
                </Link>
                <span className="text-neutral-300">|</span>
                <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {heroArticle.tags?.[0]}
                </span>
              </div>
              
              <Link href={`/articles/${heroArticle.slug}`} className="group block">
                <DisplayLarge className="group-hover:text-neutral-600 transition-colors mb-6 decoration-1 underline-offset-4 group-hover:underline">
                  {heroArticle.title}
                </DisplayLarge>
              </Link>
              
              <Body className="text-lg md:text-xl text-neutral-600 mb-8 max-w-lg leading-relaxed">
                {heroArticle.subtitle}
              </Body>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-4">
                <Link href={`/articles/${heroArticle.slug}`} className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full h-12 px-8">
                    Read Story
                  </Button>
                </Link>
                <Metadata className="mt-2 sm:mt-0">
                  <AuthorMeta name={heroArticle.author.name} />
                  <DateLabel date={new Date(heroArticle.publishedAt)} />
                  <ReadingTime minutes={heroArticle.readingTime} />
                </Metadata>
              </div>
            </Stack>
          </div>

          {/* Right Column: Editorial Image */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 order-1 lg:order-2 mb-8 md:mb-10 lg:mb-0 lg:pl-12">
            <Link href={`/articles/${heroArticle.slug}`} className="block relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden bg-neutral-100 group">
              <Image 
                src={heroArticle.heroImage} 
                alt={heroArticle.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
                priority
              />
            </Link>
          </div>
        </Grid12>
      </Container>
    </Section>
  );
}
