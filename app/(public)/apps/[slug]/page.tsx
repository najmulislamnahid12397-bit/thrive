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

export default async function AppDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <Section>
      <Container className="max-w-4xl py-12 md:py-20">
        <Stack gap="lg">
          <div>
            <H1 className="mb-6 capitalize">App: {slug.replace(/-/g, ' ')}</H1>
            <Body className="text-neutral-500 max-w-2xl">
              This is a temporary placeholder for the interactive application view. Complex client-side components will be mounted here.
            </Body>
          </div>
          
          <div className="w-full aspect-[16/10] bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center p-8">
            <div className="text-center space-y-4 w-full max-w-sm">
              <Skeleton className="h-12 w-12 rounded-xl mx-auto" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full mt-8 rounded-md" />
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
