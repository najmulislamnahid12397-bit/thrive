import type { Metadata } from "next";
import { Section, Container, Stack } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Search — Thryve",
};
import { H1, Body } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/states";
import { Overline } from "@/components/ui/editorial";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <Section>
      <Container className="max-w-3xl py-12 md:py-20">
        <Stack gap="xl">
          <div className="max-w-2xl">
            <Overline className="text-neutral-400 block mb-4">Discover</Overline>
            <H1 className="mb-6">Search Thryve</H1>
            <Body className="text-neutral-500">
              Find articles, topics, and more. This is a temporary placeholder.
            </Body>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-md text-base focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-shadow bg-neutral-50" 
              placeholder="Search..."
              disabled
            />
          </div>
          
          <div className="space-y-6 pt-8">
            <Overline className="text-neutral-400 block">Recent Searches</Overline>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-16 h-16 shrink-0 rounded-sm" />
                <div className="space-y-2 flex-1 py-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
