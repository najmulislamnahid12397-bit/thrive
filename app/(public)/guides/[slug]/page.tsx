import type { Metadata } from "next";
import { Section, Container, Stack } from "@/components/ui/layout";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formattedSlug = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return { title: `${formattedSlug} — Thryve` };
}
import { H1, Body } from "@/components/ui/typography";
import { Overline } from "@/components/ui/editorial";
import { Skeleton } from "@/components/ui/states";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function GuideDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <Section>
      <Container className="max-w-3xl py-12 md:py-20">
        <Stack gap="lg">
          <div>
            <H1 className="mb-6 capitalize">Guide: {slug.replace(/-/g, ' ')}</H1>
            <Body className="text-neutral-500">
              This is a temporary placeholder for the guide. Guides will feature structured learning paths and extensive content sections in future phases.
            </Body>
          </div>
          <div className="p-8 border border-neutral-100 bg-neutral-50">
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3 mb-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
