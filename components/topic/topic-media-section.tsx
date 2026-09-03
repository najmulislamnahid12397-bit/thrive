import * as React from "react";
import Link from "next/link";
import { Video, Guide } from "@/lib/mock-data";
import { Container, Section } from "@/components/ui/layout";
import { VideoCard } from "@/components/ui/video-card";
import { Card, CardImage, CardContent, CardCategory, CardTitle, CardDescription, CardFooter, CardLink } from "@/components/ui/card";
import { CategoryBadge, Metadata, Overline, DateLabel } from "@/components/ui/editorial";
import { Video as VideoIcon, BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopicMediaSectionProps {
  videos: Video[];
  guides: Guide[];
  topicName: string;
  className?: string;
}

export function TopicMediaSection({
  videos,
  guides,
  topicName,
  className,
}: TopicMediaSectionProps) {
  const hasVideos = videos && videos.length > 0;
  const hasGuides = guides && guides.length > 0;

  if (!hasVideos && !hasGuides) return null;

  return (
    <Section className={cn("py-12 md:py-20 bg-neutral-900 text-white", className)}>
      <Container>
        {/* Videos Subsection */}
        {hasVideos && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-800 gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  <VideoIcon className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Multimedia Explainers</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white">
                  {topicName} on Video
                </h2>
              </div>
              <Link
                href="/videos"
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>View All Videos</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {/* Guides Subsection */}
        {hasGuides && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-800 gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
                  <BookOpen className="h-3.5 w-3.5 text-sky-400" />
                  <span>Curated Dossiers</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white">
                  {topicName} Research & Guides
                </h2>
              </div>
              <Link
                href="/guides"
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Browse All Guides</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {guides.map((guide) => (
                <Card
                  key={guide.id}
                  variant="horizontal"
                  className="bg-neutral-800/80 border border-neutral-700/60 p-4 sm:p-5 group items-start hover:border-neutral-500 transition-colors"
                >
                  <div className="relative shrink-0 w-24 sm:w-32 md:w-36 overflow-hidden bg-neutral-900 border border-neutral-700">
                    <CardImage src={guide.cover} alt={guide.title} aspectRatio="portrait" className="w-full" />
                  </div>
                  <CardContent className="justify-between flex-1 gap-2 pt-1">
                    <div>
                      <CardCategory>
                        <CategoryBadge variant="outline" className="text-[10px] sm:text-xs text-neutral-300 border-neutral-600 bg-neutral-900">
                          {guide.category}
                        </CategoryBadge>
                      </CardCategory>
                      <CardTitle size="sm" className="text-white group-hover:text-neutral-300 mt-2 leading-snug md:text-lg">
                        {guide.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-neutral-400 line-clamp-2 mt-2">
                        {guide.description}
                      </CardDescription>
                    </div>
                    <CardFooter className="pt-3">
                      <Metadata>
                        <Overline className="text-neutral-400 font-bold">{guide.pages} Pages</Overline>
                        <DateLabel date={new Date(guide.publishedAt)} className="text-neutral-500" />
                      </Metadata>
                    </CardFooter>
                  </CardContent>
                  <CardLink href={`/guides/${guide.slug}`} aria-label={`Download guide: ${guide.title}`} />
                </Card>
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
