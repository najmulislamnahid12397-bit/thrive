import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedStories } from "@/components/home/featured-stories";
import { LatestStories } from "@/components/home/latest-stories";
import { TopicSection } from "@/components/home/topic-section";
import { VideoSection } from "@/components/home/video-section";
import { GuideSection } from "@/components/home/guide-section";
import { AppSection } from "@/components/home/app-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export const metadata: Metadata = {
  title: "Thryve — Understand. Explore. Thrive.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedStories />
      <LatestStories />
      <TopicSection topicSlug="health" />
      <TopicSection topicSlug="technology" className="bg-white border-b border-neutral-100" />
      <VideoSection />
      <GuideSection />
      <AppSection />
      <NewsletterSection />
    </>
  );
}
