import type { Metadata } from "next";
import { Section, Container, Stack } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Guides & Resources — Thryve",
};
import { H1, Body } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/states";
import { Overline } from "@/components/ui/editorial";

export default function GuidesPage() {
  return (
    <Section>
      <Container className="py-12 md:py-20">
        <Stack gap="xl">
          <div className="max-w-2xl">
            <Overline className="text-neutral-400 block mb-4">Resources</Overline>
            <H1 className="mb-6">Guides & Resources</H1>
            <Body className="text-neutral-500">
              In-depth guides and editorial resources. This is a temporary placeholder index.
            </Body>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border border-neutral-100 bg-neutral-50 space-y-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="h-6 w-3/4 mt-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
