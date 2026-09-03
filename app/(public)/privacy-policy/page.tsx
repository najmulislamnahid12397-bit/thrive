import { Section, Container } from "@/components/ui/layout";
import { H1, Body } from "@/components/ui/typography";

export default function Page() {
  return (
    <Section>
      <Container className="max-w-3xl py-12 md:py-20 text-center">
        <H1 className="mb-6">Privacy Policy</H1>
        <Body className="text-neutral-500">
          This is a placeholder page for the /privacy-policy route. 
          Real content will be implemented in future phases.
        </Body>
      </Container>
    </Section>
  );
}
