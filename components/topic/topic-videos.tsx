import * as React from "react";
import Link from "next/link";
import { Video } from "@/lib/types/video";
import { Container, Section, Grid12 } from "@/components/ui/layout";
import { VideoCard } from "@/components/video/video-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video as VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopicVideosProps {
  videos: Video[];
  topicName?: string;
  topicSlug?: string;
  className?: string;
}

export function TopicVideos({
  videos,
  topicName,
  topicSlug,
  className,
}: TopicVideosProps) {
  if (!videos || videos.length === 0) return null;

  const featuredVideo = videos[0];
  const supportingVideos = videos.slice(1, 4);
  const sectionId = topicSlug
    ? `videos-${topicSlug}`
    : topicName
    ? `videos-${topicName.toLowerCase().replace(/\s+/g, "-")}`
    : "topic-videos";

  return (
    <Section
      id={sectionId}
      aria-label={topicName ? `${topicName} videos` : "Topic videos"}
      className={cn("bg-neutral-900 text-white py-10 sm:py-16 md:py-20", className)}
    >
      <Container>
        {/* Section Heading & Header */}
        <div className="mb-6 sm:mb-10 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-1.5 sm:mb-2">
                <VideoIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Multimedia & Visual Investigations</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
                {topicName ? `${topicName} on Video` : "Topic Documentaries"}
              </h2>
              <p className="mt-2 sm:mt-3 text-neutral-400 font-sans text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
                Visual essays, investigative interviews, and concise breakdown videos curated for {topicName || "this topic"}.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Link href="/videos" className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-500 bg-transparent text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest group h-10 sm:h-11 px-4 sm:px-5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                >
                  <span>Explore All Videos</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-2 transform transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Video Layout */}
        {supportingVideos.length > 0 ? (
          /* 1 Featured Video + 1 to 3 Supporting Videos */
          <Grid12>
            {/* Left: Featured Lead Video */}
            <div className="col-span-12 lg:col-span-7 mb-6 sm:mb-8 lg:mb-0">
              {featuredVideo && (
                <VideoCard
                  video={featuredVideo}
                  variant="featured"
                  theme="dark"
                  showDescription={true}
                  className="h-full"
                />
              )}
            </div>

            {/* Right: Supporting Horizontal Video List */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 sm:gap-6 lg:pl-6 justify-start">
              {supportingVideos.map((video) => (
                <VideoCard
                  key={video.id || video.slug}
                  video={video}
                  variant="horizontal"
                  theme="dark"
                  showDescription={true}
                />
              ))}
            </div>
          </Grid12>
        ) : (
          /* Single Video Layout */
          <div className="max-w-4xl">
            <VideoCard
              video={featuredVideo}
              variant="featured"
              theme="dark"
              showDescription={true}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
