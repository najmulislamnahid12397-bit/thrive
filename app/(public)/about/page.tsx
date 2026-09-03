import type { Metadata } from "next";
import { Section, Container, Stack } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "About — Thryve",
};
import { H1, Body } from "@/components/ui/typography";
import { Overline } from "@/components/ui/editorial";
import { Skeleton } from "@/components/ui/states";

export default function AboutPage() {
  return (
    <Section>
      <Container className="max-w-3xl py-12 md:py-20">
        <Stack gap="xl">
          <div>
            <Overline className="text-neutral-400 block mb-4">Our Mission</Overline>
            <H1 className="mb-6">About Thryve</H1>
            <Body className="text-neutral-500 text-lg leading-relaxed">
              Learn more about our editorial mission. Thryve is dedicated to exploring the intersection of design, technology, and culture through thoughtful, long-form journalism.
            </Body>
          </div>
          
          <Skeleton className="w-full aspect-video rounded-sm" />
          
          <div className="space-y-6">
            <Body className="text-neutral-500">
              This is a temporary placeholder page. The final about page will contain detailed information regarding our editorial standards, masthead, and history.
            </Body>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
