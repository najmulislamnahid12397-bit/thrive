import React from "react";
import { Skeleton, LoadingCard } from "@/components/ui/states";
import { Container, Section } from "@/components/ui/layout";

export default function ArticleLoading() {
  return (
    <article className="bg-white min-h-screen animate-pulse" aria-busy="true" aria-label="Loading article">
      {/* 1. Top Reading Progress Skeleton placeholder */}
      <div className="h-1 w-full bg-neutral-100" />

      {/* 2. Article Hero Skeleton */}
      <header className="pt-8 pb-12 md:pt-12 lg:pt-16 lg:pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Skeleton */}
          <div className="flex items-center gap-2 mb-8 md:mb-10">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Category Badge Skeleton */}
          <Skeleton className="h-6 w-24 mb-6" />

          {/* Title Skeleton */}
          <div className="space-y-3 mb-6">
            <Skeleton className="h-10 md:h-12 w-full" />
            <Skeleton className="h-10 md:h-12 w-4/5" />
          </div>

          {/* Subtitle / Deck Skeleton */}
          <div className="space-y-2 mb-10 md:mb-12">
            <Skeleton className="h-5 md:h-6 w-full" />
            <Skeleton className="h-5 md:h-6 w-3/4" />
          </div>

          {/* Author & Meta Row Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 py-6 border-y border-neutral-100">
            <div className="flex items-center gap-3.5">
              <Skeleton className="w-11 h-11 md:w-12 md:h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-9 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
            </div>
          </div>
        </div>

        {/* Hero Image Skeleton */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
          <Skeleton className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full sm:rounded-xl" />
        </div>
      </header>

      {/* 3. Article Body Skeleton */}
      <div className="w-full py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-4/5 mb-10" />

          <Skeleton className="h-8 w-2/3 mt-12 mb-6" />

          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-10/12" />
          <Skeleton className="h-5 w-3/4" />

          {/* Blockquote Skeleton */}
          <div className="my-10 pl-6 border-l-2 border-neutral-200 space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-3 w-32 mt-4" />
          </div>

          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-4/5" />

          {/* Author Bio Box Skeleton */}
          <div className="rounded-2xl bg-neutral-50 border border-neutral-100 p-8 my-14">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Skeleton className="w-20 h-20 rounded-full shrink-0" />
              <div className="flex-1 space-y-3 w-full">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-44" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Related Articles Skeleton */}
      <Section className="border-t border-neutral-100 bg-neutral-50/50 py-16 md:py-24">
        <Container>
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        </Container>
      </Section>
    </article>
  );
}
