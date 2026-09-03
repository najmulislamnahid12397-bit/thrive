import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Video as VideoIcon, FileText, Layers } from "lucide-react";
import { Topic, TopicContentCounts } from "@/lib/types/topic";
import { cn } from "@/lib/utils";

export interface TopicCardProps {
  topic: Topic;
  articleCount?: number;
  videoCount?: number;
  guideCount?: number;
  counts?: TopicContentCounts;
  featured?: boolean;
  className?: string;
}

export function TopicCard({
  topic,
  articleCount,
  videoCount: customVideoCount,
  guideCount: customGuideCount,
  counts,
  featured = false,
  className,
}: TopicCardProps) {
  const resolvedCounts = counts || topic.counts;
  const count = articleCount ?? resolvedCounts?.articles ?? (topic.articleIds?.length || 0);
  const videos = customVideoCount ?? resolvedCounts?.videos ?? (topic.videoIds?.length || 0);
  const guides = customGuideCount ?? resolvedCounts?.guides ?? (topic.guideIds?.length || 0);

  if (featured) {
    return (
      <div
        className={cn(
          "group relative bg-neutral-900 text-white overflow-hidden flex flex-col lg:flex-row transition-all duration-500 hover:shadow-2xl",
          className
        )}
      >
        {/* Visual Media Pane */}
        <div className="relative w-full lg:w-3/5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[300px] lg:min-h-[440px] overflow-hidden bg-neutral-800 shrink-0">
          <Image
            src={topic.image}
            alt={`Cover imagery for ${topic.name} editorial hub`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-900/90" aria-hidden="true" />
          
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white text-neutral-950 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
              Featured Editorial Hub
            </span>
          </div>

          <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-medium text-neutral-200">
            <span className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 border border-neutral-700/50">
              <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              {count} {count === 1 ? "Story" : "Stories"}
            </span>
            {videos > 0 && (
              <span className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 border border-neutral-700/50">
                <VideoIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                {videos} {videos === 1 ? "Video" : "Videos"}
              </span>
            )}
            {guides > 0 && (
              <span className="flex items-center gap-1.5 bg-neutral-900/80 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 border border-neutral-700/50">
                <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                {guides} {guides === 1 ? "Guide" : "Guides"}
              </span>
            )}
          </div>
        </div>

        {/* Editorial Text Pane */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-between z-20 bg-neutral-900">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3 sm:mb-4">
              <span>Section 01</span>
              <span aria-hidden="true">·</span>
              <span>Primary Coverage</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] mb-3 sm:mb-5 break-words">
              {topic.name}
            </h3>

            <p className="font-sans text-xs sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-xl mb-4 sm:mb-8">
              {topic.description}
            </p>
          </div>

          <div className="pt-4 sm:pt-6 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors flex items-center gap-2">
              Explore {topic.name} Editorial Hub
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
            </span>
          </div>

          <Link
            href={`/topics/${topic.slug}`}
            className="absolute inset-0 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            aria-label={`Explore ${topic.name} editorial hub`}
          />
        </div>
      </div>
    );
  }

  // Standard Directory Card
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-white border border-neutral-200 transition-all duration-300 hover:border-neutral-900 hover:shadow-lg",
        className
      )}
    >
      {/* Visual Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 shrink-0">
        <Image
          src={topic.image}
          alt={`Visual cover for ${topic.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-300" aria-hidden="true" />
        
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20">
          <span className="inline-flex items-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-neutral-900/80 backdrop-blur-sm text-white px-2 py-0.5 border border-neutral-700/40">
            {count} {count === 1 ? "Story" : "Stories"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 md:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            Topic Hub
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 mb-2 sm:mb-3 group-hover:text-neutral-600 transition-colors break-words">
          {topic.name}
        </h3>

        <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed mb-4 sm:mb-6 flex-1 line-clamp-3">
          {topic.shortDescription || topic.description}
        </p>

        <div className="mt-auto pt-3 sm:pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-900">
          <span className="group-hover:text-neutral-600 transition-colors">Explore Topic</span>
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>

      <Link
        href={`/topics/${topic.slug}`}
        className="absolute inset-0 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        aria-label={`View ${topic.name} topic hub`}
      />
    </div>
  );
}
