import { Container, Section, SectionHeader, Grid2 } from "@/components/ui/layout";
import { GuideCard } from "@/components/ui/guide-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getGuides } from "@/lib/data";

export async function GuideSection() {
  const guides = await getGuides(4);

  if (!guides.length) return null;

  return (
    <Section className="border-t border-neutral-100 bg-white">
      <Container>
        <SectionHeader 
          title="Guides & Resources" 
          description="Downloadable frameworks, reports, and deep dives from our editorial research team."
          action={
            <Link href="/guides">
              <Button variant="outline">View All Guides</Button>
            </Link>
          }
        />
        <Grid2 className="gap-y-8 gap-x-8">
          {guides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              variant="horizontal"
            />
          ))}
        </Grid2>
      </Container>
    </Section>
  );
}
