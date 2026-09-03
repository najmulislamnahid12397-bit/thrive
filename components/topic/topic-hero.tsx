import * as React from "react";
import Image from "next/image";
import { BookOpen, Video as VideoIcon, FileText, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Topic, TopicContentCounts } from "@/lib/types/topic";
import { cn } from "@/lib/utils";

export interface TopicHeroProps {
  topic: Topic;
  articleCount?: number;
  videoCount?: number;
  guideCount?: number;
  counts?: TopicContentCounts;
  showBreadcrumbs?: boolean;
  className?: string;
}

export function TopicHero({
  topic,
  articleCount,
  videoCount: customVideoCount,
  guideCount: customGuideCount,
  counts,
  showBreadcrumbs = true,
  className,
}: TopicHeroProps) {
  const resolvedCounts = counts || topic.counts;
  const storyCount = articleCount ?? resolvedCounts?.articles ?? (topic.articleIds?.length || 0);
  const videoCount = customVideoCount ?? resolvedCounts?.videos ?? (topic.videoIds?.length || 0);
  const guideCount = customGuideCount ?? resolvedCounts?.guides ?? (topic.guideIds?.length || 0);

  return (
    <header
      id={`topic-hero-${topic.slug}`}
      className={cn(
        "relative bg-neutral-50/70 border-b border-neutral-200 overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-16 md:pt-12 md:pb-20",
        className
      )}
    >
      {/* Subtle Ambient Pattern Accent */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* 1. Breadcrumbs */}
        {showBreadcrumbs && (
          <div className="mb-4 sm:mb-8">
            <Breadcrumbs
              variant="inline"
              items={[
                { label: "Home", href: "/" },
                { label: "Topics", href: "/topics" },
                { label: topic.name },
              ]}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Main Editorial Content Column */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            {/* Editorial Hub Indicator */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest bg-neutral-900 text-white">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-neutral-300" aria-hidden="true" />
                Editorial Hub
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500">
                · {topic.slug}
              </span>
            </div>

            {/* Topic Name */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-neutral-900 uppercase leading-[0.95] mb-4 sm:mb-6 break-words">
              {topic.name}
            </h1>

            {/* Topic Description */}
            <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 leading-relaxed font-light max-w-2xl mb-6 sm:mb-8">
              {topic.description}
            </p>

            {/* Meta & Stats Badge Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-neutral-200/80">
              <span className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium text-neutral-700 shadow-2xs">
                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-600" aria-hidden="true" />
                <span className="font-bold text-neutral-900">{storyCount}</span>
                <span>{storyCount === 1 ? "Story" : "Stories"}</span>
              </span>

              {videoCount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium text-neutral-700 shadow-2xs">
                  <VideoIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-600" aria-hidden="true" />
                  <span className="font-bold text-neutral-900">{videoCount}</span>
                  <span>{videoCount === 1 ? "Video" : "Videos"}</span>
                </span>
              )}

              {guideCount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium text-neutral-700 shadow-2xs">
                  <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-neutral-600" aria-hidden="true" />
                  <span className="font-bold text-neutral-900">{guideCount}</span>
                  <span>{guideCount === 1 ? "Guide" : "Guides"}</span>
                </span>
              )}

              <span className="text-[11px] sm:text-xs text-neutral-500 font-medium ml-auto hidden md:inline-block">
                Updated weekly with verified research
              </span>
            </div>
          </div>

          {/* Optional Visual Pane */}
          {topic.image && (
            <div className="lg:col-span-5 xl:col-span-4 mt-2 lg:mt-0">
              <div className="relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-neutral-200 border border-neutral-300 shadow-sm">
                <Image
                  src={topic.image}
                  alt={`Editorial topic imagery for ${topic.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-900/10" aria-hidden="true" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-neutral-900/80 backdrop-blur-sm text-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11px] font-medium tracking-wide flex items-center justify-between">
                  <span className="truncate">{topic.shortDescription || topic.name}</span>
                  <span className="text-neutral-400 uppercase tracking-widest text-[9px] font-bold shrink-0 ml-2">THRYVE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
