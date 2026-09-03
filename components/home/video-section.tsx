import { Container, Section, Grid12 } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Video as VideoIcon } from "lucide-react";
import { getFeaturedVideo, getLatestVideos } from "@/lib/data";
import { VideoCard } from "@/components/video/video-card";

export async function VideoSection() {
  const featured = await getFeaturedVideo();
  const supporting = await getLatestVideos(3, featured?.slug);

  if (!featured) return null;

  return (
    <Section id="thryve-video" aria-labelledby="thryve-video-heading" className="bg-neutral-900 text-white py-12 sm:py-16 md:py-24">
      <Container>
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-1.5 sm:mb-2">
                <VideoIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Visual Journalism & Documentaries</span>
              </div>
              <h2
                id="thryve-video-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight"
              >
                Thryve Video
              </h2>
              <p className="mt-2 sm:mt-3 text-neutral-300 font-sans text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                Investigative deep dives, expert discussions, and field essays produced by our documentary team.
              </p>
            </div>
            <div className="shrink-0 mt-2 sm:mt-0">
              <Link href="/videos" className="block w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-500 bg-transparent text-xs font-mono font-bold uppercase tracking-wider group h-10 sm:h-11 px-4 sm:px-5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                >
                  <span>Explore All Videos</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-2 transform transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Grid12>
          {/* Left Column: Featured Lead Video */}
          <div className="col-span-12 lg:col-span-7 mb-8 lg:mb-0">
            <VideoCard
              video={featured}
              variant="featured"
              theme="dark"
              showDescription={true}
              className="h-full"
            />
          </div>

          {/* Right Column: Supporting Videos */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 sm:gap-6 lg:pl-6 justify-between">
            {supporting.map((video) => (
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
      </Container>
    </Section>
  );
}

