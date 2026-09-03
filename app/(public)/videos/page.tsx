import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { H1, Body } from "@/components/ui/typography";
import { Overline, CategoryBadge, DateLabel } from "@/components/ui/editorial";
import { FeaturedVideo } from "@/components/video/featured-video";
import { VideoThumbnail } from "@/components/video/video-thumbnail";
import { VideoMeta } from "@/components/video/video-meta";
import { VideoArchiveFilter } from "@/components/video/video-archive-filter";
import { NewsletterSection } from "@/components/home/newsletter-section";
import {
  getFeaturedVideo,
  getLatestVideos,
  getPopularVideos,
  getAllVideos,
} from "@/lib/data";
import { Clock, Eye, ArrowRight, ChevronRight, Play, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Videos & Documentaries — Thryve",
  description:
    "Investigative medical documentaries, clinical masterclasses, and visual explainers dissecting the frontiers of medicine, neuroscience, and computing.",
};

export default async function VideosPage() {
  const [featured, allVideos, popularVideos] = await Promise.all([
    getFeaturedVideo(),
    getAllVideos(),
    getPopularVideos(4),
  ]);

  // Derive latest releases (excluding the featured one)
  const latestVideos = await getLatestVideos(4, featured?.slug);
  const leadLatest = latestVideos[0];
  const sideLatest = latestVideos.slice(1, 4);

  return (
    <div className="bg-white min-h-screen text-neutral-900">
      {/* 1. Breadcrumb */}
      <div className="border-b border-neutral-100 bg-neutral-50/50">
        <Container className="py-2.5">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-neutral-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-neutral-900 transition-colors py-1 inline-flex items-center"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-300">
                <ChevronRight className="w-3 h-3" />
              </li>
              <li>
                <span className="text-neutral-900 font-semibold" aria-current="page">
                  Videos
                </span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      <Container className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-24 space-y-16 sm:space-y-24">
        {/* 2. Page heading & 3. Intro */}
        <header className="pb-8 sm:pb-12 border-b border-neutral-200">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <Overline className="text-neutral-500">Broadcast & Documentary Archive</Overline>
                <span className="text-neutral-300" aria-hidden="true">·</span>
                <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase">
                  Vol. IV
                </span>
              </div>
              <H1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.08] text-neutral-900 mb-4">
                Thryve Video
              </H1>
              <Body className="text-neutral-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-sans">
                Clinical investigations, physiological masterclasses, and visual inquiries into the
                frontiers of human longevity, cognitive neuroscience, and modern computing paradigms.
              </Body>
            </div>

            {/* Archive Metrics Banner */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-100 font-mono text-xs shrink-0">
              <div className="border-l-2 border-neutral-900 pl-3">
                <div className="text-lg sm:text-2xl font-bold text-neutral-900 font-sans">
                  {allVideos.length}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Broadcasts
                </div>
              </div>
              <div className="border-l-2 border-neutral-300 pl-3">
                <div className="text-lg sm:text-2xl font-bold text-neutral-900 font-sans">
                  3h 24m
                </div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Runtime
                </div>
              </div>
              <div className="border-l-2 border-neutral-300 pl-3">
                <div className="text-lg sm:text-2xl font-bold text-neutral-900 font-sans">
                  650K+
                </div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Total Views
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 4. Featured video */}
        {featured && (
          <section aria-labelledby="featured-video-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <h2
                  id="featured-video-heading"
                  className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold"
                >
                  Featured Broadcast
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-400">Prime Investigation</span>
            </div>

            <FeaturedVideo
              video={featured}
              priority
              badge="Lead Investigation"
              ctaText="Watch Broadcast"
              className="w-full shadow-sm"
            />
          </section>
        )}

        {/* 5. Latest videos (Asymmetrical Broadsheet Layout) */}
        {latestVideos.length > 0 && (
          <section aria-labelledby="latest-videos-heading" className="space-y-6 pt-4 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-4">
              <div>
                <Overline className="text-neutral-500 block mb-1">Chronological Dispatches</Overline>
                <h2
                  id="latest-videos-heading"
                  className="font-serif text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight"
                >
                  Latest Broadcasts
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-500">
                Sorted by recent airdate
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Lead Latest Video (7 cols) */}
              {leadLatest && (
                <article className="lg:col-span-7 group flex flex-col space-y-4">
                  <Link
                    href={`/videos/${leadLatest.slug}`}
                    className="block relative overflow-hidden bg-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                    aria-label={`Watch newest broadcast: ${leadLatest.title}`}
                  >
                    <VideoThumbnail
                      src={leadLatest.thumbnail}
                      alt={leadLatest.thumbnailAlt || leadLatest.title}
                      duration={leadLatest.duration}
                      category={leadLatest.category}
                      featured={true}
                      aspectRatio="video"
                      size="full"
                      priority={false}
                    />
                  </Link>

                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center gap-2">
                      <CategoryBadge variant="solid" className="bg-neutral-900 text-white text-xs px-2.5 py-0.5">
                        {leadLatest.category}
                      </CategoryBadge>
                      <span className="text-xs font-mono text-neutral-500">
                        New Release
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      <Link href={`/videos/${leadLatest.slug}`} className="focus:outline-none focus-visible:underline">
                        {leadLatest.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-600 line-clamp-3 leading-relaxed font-sans">
                      {leadLatest.description || leadLatest.shortDescription}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                      {leadLatest.author && (
                        <span className="font-sans font-medium text-neutral-900">
                          {leadLatest.author.name}
                        </span>
                      )}
                      <span>·</span>
                      <DateLabel date={leadLatest.publishedAt} />
                      <span>·</span>
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {leadLatest.duration}
                      </span>
                      {leadLatest.views && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1 font-mono">
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            {leadLatest.views}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              )}

              {/* Side Stack of Latest Videos (5 cols) */}
              {sideLatest.length > 0 && (
                <div className="lg:col-span-5 divide-y divide-neutral-200 space-y-6 pt-0">
                  {sideLatest.map((video, index) => (
                    <article
                      key={video.id || video.slug}
                      className={cn("group flex flex-col sm:flex-row items-start gap-4", index > 0 && "pt-6")}
                    >
                      <Link
                        href={`/videos/${video.slug}`}
                        className="block relative w-full sm:w-44 md:w-48 aspect-video shrink-0 bg-neutral-950 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                        aria-label={`Watch: ${video.title}`}
                      >
                        <VideoThumbnail
                          src={video.thumbnail}
                          alt={video.thumbnailAlt || video.title}
                          duration={video.duration}
                          size="full"
                          className="w-full h-full"
                        />
                      </Link>

                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5">
                            {video.category}
                          </span>
                        </div>

                        <h4 className="font-serif text-base sm:text-lg font-medium leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-2">
                          <Link href={`/videos/${video.slug}`} className="focus:outline-none focus-visible:underline">
                            {video.title}
                          </Link>
                        </h4>

                        <VideoMeta
                          video={video}
                          variant="inline"
                          showCategory={false}
                          showAuthor={false}
                          showUpdatedDate={true}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 6. Popular videos (Ranked Leaderboard Cards) */}
        {popularVideos.length > 0 && (
          <section
            aria-labelledby="popular-videos-heading"
            className="p-6 sm:p-8 md:p-10 bg-neutral-50 border border-neutral-200 rounded-none space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-neutral-700" aria-hidden="true" />
                  <Overline className="text-neutral-600">Audience Impact</Overline>
                </div>
                <h2
                  id="popular-videos-heading"
                  className="font-serif text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight"
                >
                  Most Watched Inquiries
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-500">
                Ranked by verified viewing retention
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {popularVideos.map((video, index) => {
                const rank = `0${index + 1}`;
                return (
                  <article
                    key={video.id || video.slug}
                    className="group relative flex flex-col justify-between space-y-3 bg-white p-4 border border-neutral-200 hover:border-neutral-400 transition-colors"
                  >
                    {/* Rank Badge & View Count */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xl font-bold tracking-tight text-neutral-900">
                        {rank}
                      </span>
                      {video.views && (
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5">
                          <Eye className="w-3 h-3 text-neutral-500" aria-hidden="true" />
                          {video.views}
                        </span>
                      )}
                    </div>

                    {/* Thumbnail */}
                    <Link
                      href={`/videos/${video.slug}`}
                      className="block relative aspect-video w-full overflow-hidden bg-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                      aria-label={`Watch popular video #${rank}: ${video.title}`}
                    >
                      <VideoThumbnail
                        src={video.thumbnail}
                        alt={video.thumbnailAlt || video.title}
                        duration={video.duration}
                        size="full"
                        className="w-full h-full"
                      />
                    </Link>

                    {/* Metadata & Title */}
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                        {video.category}
                      </span>
                      <h4 className="font-serif text-base font-normal leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-2">
                        <Link href={`/videos/${video.slug}`} className="focus:outline-none focus-visible:underline">
                          {video.title}
                        </Link>
                      </h4>
                    </div>

                    {/* Metadata Footer */}
                    <div className="pt-2 border-t border-neutral-100">
                      <VideoMeta
                        video={video}
                        variant="inline"
                        showCategory={false}
                        showAuthor={true}
                        showPublishedDate={false}
                        showUpdatedDate={false}
                        showDuration={true}
                        showViews={false}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* 7. Topic/category filters & 8. More videos */}
        <section aria-labelledby="archive-filter-heading" className="space-y-8 pt-4 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <Overline className="text-neutral-500 block mb-1">The Complete Catalogue</Overline>
              <h2
                id="archive-filter-heading"
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-neutral-900 tracking-tight"
              >
                Explore All Broadcasts
              </h2>
            </div>
            <p className="text-sm text-neutral-500">
              Select a discipline to filter documentaries
            </p>
          </div>

          {/* Client-side UI Filter and Complete Video Archive */}
          <VideoArchiveFilter videos={allVideos} />
        </section>
      </Container>

      {/* 9. Newsletter CTA */}
      <NewsletterSection
        title={
          <>
            New Documentaries.<br />Direct to Your Inbox.
          </>
        }
        description="Join 50,000+ clinicians, researchers, and technologists receiving our weekly video dispatch and behind-the-scenes research bibliographies."
      />

      {/* 10. Footer is automatically rendered by app/(public)/layout.tsx */}
    </div>
  );
}

