import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  getTopicBySlug, 
  getAllTopics,
  getArticlesByTopic, 
  getTopicFeaturedArticle, 
  getTopicPopularArticles, 
  getVideosByTopic, 
  getGuidesByTopic 
} from "@/lib/data";
import { TopicHero } from "@/components/topic/topic-hero";
import { TopicNavigation } from "@/components/topic/topic-navigation";
import { TopicFeaturedStory } from "@/components/topic/topic-featured-story";
import { TopicLatestStories } from "@/components/topic/topic-latest-stories";
import { TopicPopularStories } from "@/components/topic/topic-popular-stories";
import { TopicVideos } from "@/components/topic/topic-videos";
import { TopicGuides } from "@/components/topic/topic-guides";
import { MoreTopicStories } from "@/components/topic/more-topic-stories";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { Container, Section } from "@/components/ui/layout";

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) {
    return {
      title: "Topic Not Found — Thryve",
      description: "The requested editorial topic could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${topic.name} — Thryve`;
  const description =
    topic.description ||
    topic.metadata?.description ||
    `Explore the latest Thryve stories about ${topic.name.toLowerCase()}, wellbeing, habits, and the science of everyday life.`;
  const canonicalUrl = `/topics/${topic.slug}`;
  const ogImageUrl = topic.metadata?.ogImage || topic.image || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Thryve",
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: `${topic.name} — Thryve`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    keywords: topic.metadata?.keywords,
  };
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  // Parallel fetching of all related topic entities
  const [allTopicArticles, featuredArticle, popularArticles, videos, guides] = await Promise.all([
    getArticlesByTopic(topic.slug, 16),
    getTopicFeaturedArticle(topic),
    getTopicPopularArticles(topic, 3),
    getVideosByTopic(topic.slug, 4),
    getGuidesByTopic(topic.slug, 4),
  ]);

  // Determine latest stories (excluding the featured article)
  const nonFeaturedArticles = allTopicArticles.filter(
    (a) => !featuredArticle || a.id !== featuredArticle.id
  );
  const latestArticles = nonFeaturedArticles.slice(0, 3);
  const moreArticles = nonFeaturedArticles.slice(3, 11);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Topic Hero Header */}
      <TopicHero
        topic={topic}
        counts={topic.counts}
        showBreadcrumbs={true}
      />

      {/* 1b. Topic Switcher Navigation */}
      <TopicNavigation
        currentSlug={topic.slug}
        showAllLink={true}
      />

      {/* 2. Featured Story */}
      {featuredArticle && (
        <Section className="py-10 md:py-14 bg-neutral-50/60 border-b border-neutral-200">
          <Container>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                  Lead Story
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
                  Featured Investigation
                </h2>
              </div>
            </div>

            <TopicFeaturedStory article={featuredArticle} />
          </Container>
        </Section>
      )}

      {/* 3. Latest Stories Grid */}
      {latestArticles.length > 0 && (
        <TopicLatestStories
          articles={latestArticles}
          topicName={topic.name}
        />
      )}

      {/* 4. Popular / Trending Stories */}
      {popularArticles.length > 0 && (
        <TopicPopularStories
          articles={popularArticles}
          topicName={topic.name}
        />
      )}

      {/* 5. Topic Videos Section */}
      {videos.length > 0 && (
        <TopicVideos
          videos={videos}
          topicName={topic.name}
          topicSlug={topic.slug}
        />
      )}

      {/* 6. Topic PDF Guides Section */}
      {guides.length > 0 && (
        <TopicGuides
          guides={guides}
          topicName={topic.name}
        />
      )}

      {/* 7. More Stories (Archive) */}
      {moreArticles.length > 0 && (
        <MoreTopicStories
          articles={moreArticles}
          topicName={topic.name}
          maxStories={8}
          layout="list"
        />
      )}

      {/* 7. Newsletter CTA */}
      <NewsletterSection
        id={`topic-newsletter-${topic.slug}`}
        title={
          <>
            Subscribe to the<br />{topic.name} digest.
          </>
        }
        description={`Get our latest weekly investigations, curated ${topic.name.toLowerCase()} breakthroughs, and expert analysis delivered straight to your inbox.`}
      />
    </div>
  );
}
