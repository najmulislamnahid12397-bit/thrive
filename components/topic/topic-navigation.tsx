"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Compass } from "lucide-react";

export interface TopicNavItem {
  name: string;
  slug: string;
  shortDescription?: string;
}

export const MAJOR_TOPICS: TopicNavItem[] = [
  { name: "Health", slug: "health", shortDescription: "Physiology, sleep, and longevity" },
  { name: "Psychology", slug: "psychology", shortDescription: "Cognitive load & behavioral neuroscience" },
  { name: "Technology", slug: "technology", shortDescription: "Ambient computing & systems architecture" },
  { name: "Science", slug: "science", shortDescription: "Bio-materials & planetary physics" },
  { name: "Culture", slug: "culture", shortDescription: "Media philosophy & digital labor" },
  { name: "Education", slug: "education", shortDescription: "Mastery learning & adaptive pedagogy" },
  { name: "Society", slug: "society", shortDescription: "Urban sociology & public realm" },
  { name: "Business", slug: "business", shortDescription: "Circular economics & sustainable strategy" },
];

export interface TopicNavigationProps {
  currentSlug?: string;
  variant?: "bar" | "compact" | "grid" | "list";
  showAllLink?: boolean;
  topics?: TopicNavItem[];
  className?: string;
  label?: string;
}

export function TopicNavigation({
  currentSlug,
  variant = "bar",
  showAllLink = false,
  topics = MAJOR_TOPICS,
  className,
  label = "Topics Navigation",
}: TopicNavigationProps) {
  const pathname = usePathname();

  // Helper to determine if a given topic item is currently active
  const isTopicActive = (slug: string) => {
    if (currentSlug) {
      return currentSlug.toLowerCase() === slug.toLowerCase();
    }
    if (!pathname) return false;
    return (
      pathname === `/topics/${slug}` ||
      pathname.startsWith(`/topics/${slug}/`)
    );
  };

  const isAllActive = !currentSlug && pathname === "/topics";

  /* -------------------------------------------------------------------------- */
  /* Variant: Grid (For Directory / Footer / Mega Hubs)                         */
  /* -------------------------------------------------------------------------- */
  if (variant === "grid") {
    return (
      <nav
        aria-label={label}
        className={cn("w-full", className)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {showAllLink && (
            <Link
              href="/topics"
              aria-current={isAllActive ? "page" : undefined}
              className={cn(
                "group p-3.5 sm:p-4 border transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                isAllActive
                  ? "bg-neutral-900 border-neutral-900 text-white"
                  : "bg-white border-neutral-200 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50/60"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-medium text-base sm:text-lg">
                  All Topics
                </span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                    isAllActive ? "text-white" : "text-neutral-400"
                  )}
                  aria-hidden="true"
                />
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 sm:mt-2",
                  isAllActive ? "text-neutral-300" : "text-neutral-500"
                )}
              >
                Complete editorial archive
              </span>
            </Link>
          )}

          {topics.map((topic) => {
            const active = isTopicActive(topic.slug);
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group p-3.5 sm:p-4 border transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                  active
                    ? "bg-neutral-900 border-neutral-900 text-white"
                    : "bg-white border-neutral-200 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-medium text-base sm:text-lg">
                    {topic.name}
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                      active ? "text-white" : "text-neutral-400"
                    )}
                    aria-hidden="true"
                  />
                </div>
                {topic.shortDescription && (
                  <span
                    className={cn(
                      "text-xs mt-1.5 sm:mt-2 line-clamp-1",
                      active ? "text-neutral-300" : "text-neutral-500"
                    )}
                  >
                    {topic.shortDescription}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Variant: Compact (Architectural Box Badges / Sub-bar)                      */
  /* -------------------------------------------------------------------------- */
  if (variant === "compact") {
    return (
      <nav
        aria-label={label}
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1.5 touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          className
        )}
      >
        {showAllLink && (
          <Link
            href="/topics"
            aria-current={isAllActive ? "page" : undefined}
            className={cn(
              "shrink-0 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
              isAllActive
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-700 border-neutral-200 hover:text-neutral-900 hover:border-neutral-900"
            )}
          >
            All
          </Link>
        )}

        {topics.map((topic) => {
          const active = isTopicActive(topic.slug);
          return (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                active
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-700 border-neutral-200 hover:text-neutral-900 hover:border-neutral-900"
              )}
            >
              {topic.name}
            </Link>
          );
        })}
      </nav>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Variant: List (Vertical Sidebar / Accordion style)                         */
  /* -------------------------------------------------------------------------- */
  if (variant === "list") {
    return (
      <nav
        aria-label={label}
        className={cn("flex flex-col divide-y divide-neutral-100 border-y border-neutral-200", className)}
      >
        {showAllLink && (
          <Link
            href="/topics"
            aria-current={isAllActive ? "page" : undefined}
            className={cn(
              "flex items-center justify-between py-3 px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
              isAllActive
                ? "font-bold text-neutral-900 bg-neutral-50/80"
                : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50/40"
            )}
          >
            <span>All Topics</span>
            <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden="true" />
          </Link>
        )}

        {topics.map((topic) => {
          const active = isTopicActive(topic.slug);
          return (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center justify-between py-3 px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                active
                  ? "font-bold text-neutral-900 bg-neutral-50/80"
                  : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50/40"
              )}
            >
              <span>{topic.name}</span>
              <ChevronRight
                className={cn(
                  "h-4 w-4",
                  active ? "text-neutral-900" : "text-neutral-400"
                )}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </nav>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Variant: Bar (Default Horizontal Editorial Navigation)                     */
  /* -------------------------------------------------------------------------- */
  return (
    <div
      className={cn(
        "w-full border-y border-neutral-200/80 bg-white/95 backdrop-blur-xs sticky top-16 z-30",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <nav
          aria-label={label}
          className="relative flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto py-0 touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Leading Context Label on wider viewports */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-500 shrink-0 pr-2 border-r border-neutral-200 my-2.5">
            <Compass className="h-3.5 w-3.5 text-neutral-600" aria-hidden="true" />
            <span>Topics</span>
          </div>

          {/* Scrollable Links Container */}
          <div className="flex items-center gap-5 sm:gap-8 md:gap-9 shrink-0 flex-1">
            {showAllLink && (
              <Link
                href="/topics"
                aria-current={isAllActive ? "page" : undefined}
                className={cn(
                  "shrink-0 py-3 sm:py-3.5 text-xs sm:text-[13px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                  isAllActive
                    ? "border-neutral-900 text-neutral-900 font-bold"
                    : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                )}
              >
                All Topics
              </Link>
            )}

            {topics.map((topic) => {
              const active = isTopicActive(topic.slug);
              return (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "shrink-0 py-3 sm:py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                    active
                      ? "border-neutral-900 text-neutral-900 font-bold"
                      : "border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
                  )}
                >
                  {topic.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
