import type { Metadata } from "next";
import { NewsletterSection } from "@/components/home/newsletter-section";

export const metadata: Metadata = {
  title: "Newsletter — Thryve",
  description: "Subscribe to our weekly briefing for the latest editorial pieces, research deep dives, and expert analysis delivered directly to your inbox.",
};

export default function NewsletterPage() {
  return (
    <div className="bg-white min-h-[70vh] flex flex-col justify-center">
      <NewsletterSection
        title={
          <>
            Stay informed with <span className="italic font-serif">Thryve</span>.
          </>
        }
        description="Subscribe to our weekly briefing for the latest editorial pieces, research deep dives, and curated analysis delivered directly to your inbox."
      />
    </div>
  );
}

