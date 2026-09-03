import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/layout";
import {
  getAllVideos,
  getVideoBySlug,
  getRelatedVideosForVideo,
  getRelatedArticlesForVideo,
} from "@/lib/data";
import {
  VideoInteractiveStage,
  RelatedVideos,
  VideoShare,
  VideoRelatedArticles,
} from "@/components/video";
import { NewsletterSection } from "@/components/home/newsletter-section";

export async function generateStaticParams() {
  const videos = await getAllVideos();
  return videos.map((video) => ({
    slug: video.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    return {
      title: "Video Not Found | Thryve",
      description: "The requested video documentary could not be located in our archive.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const publishedTime = video.publishedAt;
  const modifiedTime = video.updatedAt || video.publishedAt;
  const canonicalUrl = `/videos/${video.slug}`;
  const metaDescription = video.shortDescription || video.description;
  const metaTitle = `${video.title} | Thryve Video`;

  return {
    title: metaTitle,
    description: metaDescription,
    authors: [{ name: video.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: video.title,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Thryve",
      type: "video.other",
      images: video.thumbnail
        ? [
            {
              url: video.thumbnail,
              alt: video.thumbnailAlt || video.title,
              width: 1200,
              height: 675,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: video.thumbnail ? [video.thumbnail] : [],
    },
    other: {
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
      "article:author": video.author.name,
      "video:duration": video.duration,
      "video:release_date": publishedTime,
      "video:author": video.author.name,
      "og:video:release_date": publishedTime,
    },
  };
}

export default async function VideoDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const [relatedVideos, relatedArticles] = await Promise.all([
    getRelatedVideosForVideo(video, 4),
    getRelatedArticlesForVideo(video, 3),
  ]);

  return (
    <div className="bg-white min-h-screen text-neutral-900">
      {/* Interactive Video Detail Stage:
          Top Section strictly follows:
          1. Breadcrumb
          2. Video player (strong visual priority, large on desktop, no mobile overflow)
          3. Category
          4. Title (strong editorial hierarchy)
          5. Description
          6. Author
          7. Date
          8. Duration
          9. Share actions
          Followed by synchronized chapters and transcript sync drawer when present. */}
      {/* Interactive Video Detail Stage */}
      <VideoInteractiveStage video={video} />

      {/* Post-Video Broadsheet Share Bar */}
      <Container className="pt-4 pb-12 sm:pb-16">
        <VideoShare
          title={video.title}
          url={`/videos/${video.slug}`}
          variant="bar"
        />
      </Container>

      {/* Additional Investigations & Companion Editorial Sections */}
      <div className="border-t border-neutral-200 bg-neutral-50/50 py-14 sm:py-20">
        <Container className="space-y-16">
          {relatedArticles.length > 0 && (
            <VideoRelatedArticles
              articles={relatedArticles}
              category={video.category}
            />
          )}

          {relatedVideos.length > 0 && (
            <RelatedVideos
              videos={relatedVideos}
              category={video.category}
            />
          )}
        </Container>
      </div>

      {/* Broadsheet Newsletter Dispatch */}
      <NewsletterSection
        title="Weekly Documentary Dispatches"
        description="Receive direct research bibliographies, clinical transcripts, and advance screening access."
      />
    </div>
  );
}

