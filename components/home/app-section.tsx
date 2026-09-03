import { Container, Section, SectionHeader, Grid2 } from "@/components/ui/layout";
import { Card, CardContent, CardTitle, CardDescription, CardFooter, CardLink } from "@/components/ui/card";
import { Metadata, Overline } from "@/components/ui/editorial";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getApps } from "@/lib/data";

export async function AppSection() {
  const apps = await getApps();

  if (!apps.length) return null;

  return (
    <Section className="border-t border-neutral-100 bg-neutral-50">
      <Container>
        <SectionHeader 
          title="Thryve Apps" 
          description="Tools and applications designed to support your daily routines and cognitive health."
          action={
            <Link href="/apps">
              <Button variant="outline">Explore Apps</Button>
            </Link>
          }
        />
        <Grid2 className="gap-y-12">
          {apps.map((app) => (
            <Card key={app.id} variant="default" className="border-none bg-transparent group">
              {/* Product Visual Area */}
              <div className="bg-neutral-100 px-6 pt-10 pb-0 flex justify-center items-end h-[280px] overflow-hidden border border-neutral-100">
                <div className="relative w-48 h-80 overflow-hidden border-x-[4px] border-t-[4px] border-neutral-900 bg-neutral-900 transform translate-y-8 group-hover:translate-y-4 transition-transform duration-500 ease-out">
                  <Image src={app.screenshot} alt={`${app.name} interface`} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              
              {/* Product Info */}
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-12 h-12 shrink-0 rounded-none overflow-hidden border border-neutral-200">
                    <Image src={app.icon} alt={`${app.name} icon`} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <CardTitle size="sm" className="mb-1 group-hover:no-underline">{app.name}</CardTitle>
                    <Overline className="text-neutral-500 font-bold tracking-wider">{app.platform.join(", ")}</Overline>
                  </div>
                </div>
                <CardDescription className="text-sm md:text-base leading-relaxed text-neutral-600 line-clamp-3 mb-2">
                  {app.description}
                </CardDescription>
                <CardFooter className="pt-2">
                  <span className="text-sm font-bold text-neutral-900 group-hover:text-neutral-500 transition-colors inline-flex items-center">
                    Learn more <span className="ml-1 translate-x-0 group-hover:translate-x-1 transition-transform ease-out">→</span>
                  </span>
                </CardFooter>
              </CardContent>
              <CardLink href={`/apps/${app.slug}`} aria-label={`View app: ${app.name}`} />
            </Card>
          ))}
        </Grid2>
      </Container>
    </Section>
  );
}
