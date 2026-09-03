import * as React from "react";
import Link from "next/link";
import { Guide } from "@/lib/mock-data";
import { Container, Section } from "@/components/ui/layout";
import { GuideCard } from "@/components/ui/guide-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopicGuidesProps {
  guides: Guide[];
  topicName?: string;
  className?: string;
}

export function TopicGuides({
  guides,
  topicName,
  className,
}: TopicGuidesProps) {
  if (!guides || guides.length === 0) return null;

  const displayGuides = guides.slice(0, 4);

  return (
    <Section
      id={topicName ? `guides-${topicName.toLowerCase()}` : "topic-guides"}
      aria-label={topicName ? `${topicName} guides & resources` : "Topic guides"}
      className={cn("py-10 sm:py-16 bg-neutral-50/50 border-b border-neutral-200/80", className)}
    >
      <Container>
        {/* Section Heading & Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-neutral-200 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1 sm:mb-1.5">
              <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-sky-600" aria-hidden="true" />
              <span>Research Dossiers & PDF Guides</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-neutral-900">
              {topicName ? `${topicName} Frameworks & Guides` : "Featured Research Guides"}
            </h2>
            <p className="mt-1 sm:mt-1.5 text-neutral-600 font-sans text-xs sm:text-sm md:text-base max-w-2xl">
              Curated, peer-reviewed PDF frameworks, protocols, and deep-dive reference guides.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link href="/guides" className="block w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-neutral-300 hover:border-neutral-900 text-[11px] sm:text-xs font-bold uppercase tracking-widest group bg-white h-10 sm:h-11 px-4 sm:px-5 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                <span>View All Guides</span>
                <ArrowRight className="h-3.5 w-3.5 ml-2 transform transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 3–4 Guide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {displayGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              variant="horizontal"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
