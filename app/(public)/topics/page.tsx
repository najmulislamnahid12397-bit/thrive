import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/layout";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { TopicCard } from "@/components/topic/topic-card";
import { TopicNavigation } from "@/components/topic/topic-navigation";
import { getAllTopics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Topics & Editorial Hubs — Thryve",
  description:
    "Explore Thryve's dedicated editorial hubs covering Health, Psychology, Technology, Science, Society, Education, Culture, and Business.",
};

export default async function TopicsIndexPage() {
  const topics = await getAllTopics();
  
  // Featured topic spotlight (e.g. Health) and supporting topic hubs
  const featuredTopic = topics.find((t) => t.slug === "health") || topics[0];
  const otherTopics = topics.filter((t) => t.id !== featuredTopic.id);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header */}
      <section className="border-b border-neutral-100 pt-8 pb-10 sm:pt-12 sm:pb-14 md:pt-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="h-2 w-2 rounded-full bg-neutral-900" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500">
                Editorial Directory
              </span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-neutral-900 leading-[1.05] mb-4 sm:mb-6">
              Topics
            </h1>

            <p className="font-sans text-sm sm:text-lg md:text-xl text-neutral-600 leading-relaxed">
              Curated editorial hubs organizing deep investigative journalism, scientific 
              literature breakdowns, multimedia explainers, and practical guides across the eight 
              core pillars of human flourishing.
            </p>
          </div>

          {/* Quick-Filter Navigation */}
          <div className="mt-6 pt-6 sm:mt-10 sm:pt-8 border-t border-neutral-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 shrink-0">
                Explore Pillars:
              </span>
              <TopicNavigation variant="compact" showAllLink={true} className="py-0" />
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Featured Topic Spotlight */}
      {featuredTopic && (
        <Section className="py-10 sm:py-16 bg-neutral-50/60 border-b border-neutral-100">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2 sm:gap-3">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                  Spotlight
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900">
                  Featured Topic Hub
                </h2>
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-neutral-500">
                Lead editorial focus for this edition
              </span>
            </div>

            <TopicCard topic={featuredTopic} featured={true} />
          </Container>
        </Section>
      )}

      {/* 5 & 6. Complete Topic Directory Grid */}
      <Section className="py-10 sm:py-16 md:py-24">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-neutral-200 gap-2 sm:gap-4">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Explore All
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900">
                All Editorial Topics
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xs sm:text-right">
              Explore {topics.length} dedicated domains with in-depth reporting and curated research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {otherTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                featured={false}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Newsletter CTA */}
      <NewsletterSection
        id="topics-newsletter-input"
        title={
          <>
            Subscribe to our<br />topic-specific digests.
          </>
        }
        description="Choose your areas of focus and get weekly curated deep dives, breakthrough papers, and editorial essays sent directly to your inbox."
      />
    </div>
  );
}
