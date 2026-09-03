#!/bin/bash
pages=("latest:The Latest" "topics:Explore Topics" "videos:Thryve Video" "guides:Editorial Guides" "apps:Software & Apps" "about:About Thryve" "contact:Contact Us" "newsletter:The Weekly Briefing" "privacy-policy:Privacy Policy" "terms-of-service:Terms of Service")

for item in "${pages[@]}"
do
  dir="${item%%:*}"
  title="${item##*:}"
  
  cat << INNER_EOF > app/$dir/page.tsx
import { Section, Container } from "@/components/ui/layout";
import { DisplaySmall, Body } from "@/components/ui/typography";

export default function Page() {
  return (
    <Section>
      <Container className="max-w-3xl py-12 md:py-20 text-center">
        <DisplaySmall className="mb-6">$title</DisplaySmall>
        <Body className="text-neutral-500">
          This is a placeholder page for the /$dir route. 
          Real content will be implemented in future phases.
        </Body>
      </Container>
    </Section>
  );
}
INNER_EOF
done
