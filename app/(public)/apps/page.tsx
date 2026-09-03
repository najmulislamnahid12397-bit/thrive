import type { Metadata } from "next";
import { Section, Container, Stack } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Apps — Thryve",
};
import { H1, Body } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/states";
import { Overline } from "@/components/ui/editorial";

export default function AppsPage() {
  return (
    <Section>
      <Container className="py-12 md:py-20">
        <Stack gap="xl">
          <div className="max-w-2xl">
            <Overline className="text-neutral-400 block mb-4">Interactive</Overline>
            <H1 className="mb-6">Thryve Apps</H1>
            <Body className="text-neutral-500">
              Interactive software and tools. This is a temporary placeholder index.
            </Body>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 border border-neutral-100 p-6 rounded-lg">
                <Skeleton className="w-20 h-20 shrink-0 rounded-xl" />
                <div className="space-y-3 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
