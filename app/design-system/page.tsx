import {
  DisplayMedium,
  H3,
  H4,
  Body,
  Caption
} from "@/components/ui/typography";
import {
  CategoryBadge,
  Tag,
  Label,
  Overline,
  Metadata,
  ReadingTime,
  DateLabel,
  AuthorMeta
} from "@/components/ui/editorial";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark, Mail, Share2, MessageCircle, FileText, ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import {
  Input,
  Textarea,
  Select,
  SearchInput,
  Checkbox,
  Radio,
  FormLabel,
  FormMessage
} from "@/components/ui/form-primitives";
import {
  Card,
  CardImage,
  CardContent,
  CardCategory,
  CardTitle,
  CardDescription,
  CardFooter,
  CardLink
} from "@/components/ui/card";
import {
  Container,
  ContainerWide,
  ContainerReading,
  ContainerFull,
  Section,
  SectionTight,
  SectionHeader,
  Divider,
  ContentGrid,
  Stack,
  Cluster,
  AspectRatio,
  Grid12,
  Grid3,
  Grid2
} from "@/components/ui/layout";
import {
  Skeleton,
  LoadingSpinner,
  LoadingCard,
  EmptyState,
  ErrorState,
  NotFoundState
} from "@/components/ui/states";

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-white">
      
      <SectionTight className="border-b border-neutral-100 bg-neutral-50">
        <Container>
          <Overline className="text-neutral-400 block mb-2">Design System / Phase 1</Overline>
          <DisplayMedium>Component Showcase</DisplayMedium>
          <Body className="mt-4 max-w-2xl text-neutral-600">
            A complete visual reference for the Thryve design system primitives. This page is intended for development and visual testing.
          </Body>
        </Container>
      </SectionTight>

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Color Palette</H3>
            <Body className="text-neutral-500">Core editorial colors based on high-contrast neutrals.</Body>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="space-y-3">
              <div className="h-24 w-full bg-neutral-900 border border-neutral-900 shadow-sm" />
              <div><Label className="block">Neutral 900</Label><Caption>Primary Text / Backgrounds</Caption></div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-neutral-700 border border-neutral-200 shadow-sm" />
              <div><Label className="block">Neutral 700</Label><Caption>Secondary Text</Caption></div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-neutral-500 border border-neutral-200 shadow-sm" />
              <div><Label className="block">Neutral 500</Label><Caption>Muted Text / Icons</Caption></div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-neutral-200 border border-neutral-200 shadow-sm" />
              <div><Label className="block">Neutral 200</Label><Caption>Borders / Dividers</Caption></div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-neutral-50 border border-neutral-200 shadow-sm" />
              <div><Label className="block">Neutral 50</Label><Caption>Subtle Backgrounds</Caption></div>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full bg-white border border-neutral-200 shadow-sm" />
              <div><Label className="block">White</Label><Caption>Base Canvas</Caption></div>
            </div>
            
            <div className="space-y-3 mt-8">
              <div className="h-24 w-full bg-red-700 border border-red-700 shadow-sm" />
              <div><Label className="block text-red-700">Red 700</Label><Caption>Destructive / Errors</Caption></div>
            </div>
            <div className="space-y-3 mt-8">
              <div className="h-24 w-full bg-red-50 border border-red-100 shadow-sm" />
              <div><Label className="block text-red-700">Red 50</Label><Caption>Error Backgrounds</Caption></div>
            </div>
          </div>
        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-8">
            <H3>Container Types</H3>
            <Body className="text-neutral-500">Visualizing the different max-width container constraints.</Body>
          </div>
        </Container>

        <div className="space-y-8">
          {/* Wide Container */}
          <ContainerWide>
            <div className="bg-neutral-100 border border-neutral-200 rounded-sm p-8 text-center border-dashed">
              <Overline>Container Wide</Overline>
              <Caption className="block mt-2">max-w-[100rem] (1600px)</Caption>
            </div>
          </ContainerWide>

          {/* Standard Container */}
          <Container>
            <div className="bg-neutral-100 border border-neutral-200 rounded-sm p-8 text-center border-dashed">
              <Overline>Container Standard</Overline>
              <Caption className="block mt-2">max-w-7xl (1280px)</Caption>
            </div>
          </Container>

          {/* Reading Container */}
          <ContainerReading>
            <div className="bg-neutral-100 border border-neutral-200 rounded-sm p-8 text-center border-dashed">
              <Overline>Container Reading</Overline>
              <Caption className="block mt-2">max-w-3xl (768px)</Caption>
              <Body className="mt-4 text-left">
                This container is ideal for long-form articles. The width is restricted to maintain an optimal character count per line, ensuring the eye doesn&apos;t fatigue while reading. Notice how the horizontal margins are automatically balanced.
              </Body>
            </div>
          </ContainerReading>

          {/* Full Width */}
          <ContainerFull>
            <div className="bg-neutral-100 border-y border-neutral-200 p-8 text-center border-dashed">
              <Overline>Container Full (Edge-to-Edge)</Overline>
              <Caption className="block mt-2">100% viewport width</Caption>
            </div>
          </ContainerFull>
        </div>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Grid Systems</H3>
            <Body className="text-neutral-500">12-column editorial grids and simplified 2/3 column utility grids.</Body>
          </div>

          <div className="space-y-16">
            {/* 12-Column Grid */}
            <div>
              <Overline className="block mb-6 text-neutral-400">12-Column Editorial Grid (Grid12)</Overline>
              <Grid12>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-16 bg-neutral-100 border border-neutral-200 rounded-sm flex items-center justify-center text-neutral-400 font-mono text-xs hidden lg:flex">
                    {i + 1}
                  </div>
                ))}
                {/* Showcase spanning */}
                <div className="col-span-4 lg:col-span-8 bg-neutral-800 text-white p-6 rounded-sm">
                  <H3 className="text-white">Main Story</H3>
                  <Caption className="text-neutral-400 block mt-2">col-span-4 md:col-span-8</Caption>
                </div>
                <div className="col-span-4 bg-neutral-100 border border-neutral-200 p-6 rounded-sm">
                  <H3>Sidebar</H3>
                  <Caption className="text-neutral-500 block mt-2">col-span-4</Caption>
                </div>
              </Grid12>
            </div>

            {/* 3-Column Grid */}
            <div>
              <Overline className="block mb-6 text-neutral-400">3-Column Feature Grid (Grid3)</Overline>
              <Grid3>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-neutral-100 border border-neutral-200 p-6 rounded-sm h-32 flex flex-col justify-center items-center">
                    <Overline>Feature Block</Overline>
                  </div>
                ))}
              </Grid3>
            </div>

            {/* 2-Column Grid */}
            <div>
              <Overline className="block mb-6 text-neutral-400">2-Column Split (Grid2)</Overline>
              <Grid2>
                <div className="bg-neutral-100 border border-neutral-200 p-8 rounded-sm h-48 flex items-center justify-center text-center">
                  <Overline>Visual Side</Overline>
                </div>
                <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-sm h-48 flex items-center justify-center text-center">
                  <Overline>Content Side</Overline>
                </div>
              </Grid2>
            </div>
          </div>
        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Button System</H3>
            <Body className="text-neutral-500">Sharp, high-contrast, premium editorial actions.</Body>
          </div>

          <div className="space-y-12">
            {/* Variants */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Variants</Overline>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Sizes</Overline>
              <div className="flex flex-wrap items-end gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Medium (Default)</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Bookmark">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* States */}
            <div>
              <Overline className="block mb-6 text-neutral-400">States & Icons</Overline>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
                <Button variant="outline">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Full Width */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Full Width</Overline>
              <div className="max-w-sm">
                <Button fullWidth>Subscribe to Newsletter</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Editorial Primitives</H3>
            <Body className="text-neutral-500">Compact, highly readable metadata components for cards and articles.</Body>
          </div>

          <div className="space-y-12">
            {/* Category Badges */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Category Badges</Overline>
              <div className="flex flex-wrap gap-4">
                <CategoryBadge>Technology</CategoryBadge>
                <CategoryBadge>Science</CategoryBadge>
                <CategoryBadge variant="outline">Health</CategoryBadge>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Tags</Overline>
              <div className="flex flex-wrap gap-4">
                <Tag>Artificial Intelligence</Tag>
                <Tag>Machine Learning</Tag>
                <Tag>Future</Tag>
              </div>
            </div>

            {/* Structural Labels */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Structural Text</Overline>
              <div className="flex flex-col gap-6">
                <div>
                  <Caption className="block text-neutral-400 mb-1">Label</Caption>
                  <Label>Editor&apos;s Pick</Label>
                </div>
                <div>
                  <Caption className="block text-neutral-400 mb-1">Overline</Caption>
                  <Overline>In Depth Analysis</Overline>
                </div>
              </div>
            </div>

            {/* Composable Metadata Blocks */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Composable Metadata Blocks</Overline>
              
              <div className="space-y-8 max-w-xl">
                {/* Example 1: Full Article Meta */}
                <div className="p-6 bg-neutral-50 border border-neutral-100">
                  <Caption className="block text-neutral-400 mb-4 border-b border-neutral-200 pb-2">Article Header Use Case</Caption>
                  <Metadata>
                    <AuthorMeta name="Thryve Editorial" />
                    <DateLabel date="AUG 18, 2026" />
                    <ReadingTime minutes={12} />
                  </Metadata>
                </div>

                {/* Example 2: Compact Card Meta */}
                <div className="p-6 bg-neutral-50 border border-neutral-100">
                  <Caption className="block text-neutral-400 mb-4 border-b border-neutral-200 pb-2">Standard Card Use Case</Caption>
                  <div className="space-y-3">
                    <H4>The Future of Generative Media</H4>
                    <Metadata>
                      <DateLabel date="AUG 17, 2026" />
                      <ReadingTime minutes={8} />
                    </Metadata>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Card System</H3>
            <Body className="text-neutral-500">Editorial card variants built for articles, guides, and media.</Body>
          </div>

          <div className="space-y-24">
            
            {/* Default Variant */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Variant: Default (Grid)</Overline>
              <Grid3>
                {/* Card 1 */}
                <Card variant="default">
                  <CardLink href="#" />
                  <CardImage src="https://picsum.photos/seed/thryve1/800/600" alt="Article image" aspectRatio="video" />
                  <CardContent>
                    <CardCategory>
                      <CategoryBadge>Design</CategoryBadge>
                    </CardCategory>
                    <CardTitle>The Evolution of Minimalist Interfaces</CardTitle>
                    <CardDescription>
                      Exploring how white space and typography have replaced heavy borders and shadows in modern application design.
                    </CardDescription>
                    <CardFooter>
                      <Metadata>
                        <AuthorMeta name="Jane Doe" />
                        <DateLabel date="Aug 18, 2026" />
                      </Metadata>
                    </CardFooter>
                  </CardContent>
                </Card>

                {/* Card 2 */}
                <Card variant="default">
                  <CardLink href="#" />
                  <CardImage src="https://picsum.photos/seed/thryve2/800/600" alt="Article image" aspectRatio="video" />
                  <CardContent>
                    <CardCategory>
                      <CategoryBadge variant="outline">Technology</CategoryBadge>
                    </CardCategory>
                    <CardTitle>Frameworks Beyond React: What&apos;s Next?</CardTitle>
                    <CardDescription>
                      A deep dive into emerging web technologies, compiler-first approaches, and the eventual standardization of signals.
                    </CardDescription>
                    <CardFooter>
                      <Metadata>
                        <DateLabel date="Aug 17, 2026" />
                        <ReadingTime minutes={12} />
                      </Metadata>
                    </CardFooter>
                  </CardContent>
                </Card>

                {/* Card 3 */}
                <Card variant="default">
                  <CardLink href="#" />
                  <CardImage src="https://picsum.photos/seed/thryve3/800/600" alt="Article image" aspectRatio="video" />
                  <CardContent>
                    <CardCategory>
                      <CategoryBadge>Culture</CategoryBadge>
                    </CardCategory>
                    <CardTitle>Digital Nomadism in a Post-Remote World</CardTitle>
                    <CardDescription>
                      How cities are adapting their infrastructure to support transient, highly skilled technical workers year-round.
                    </CardDescription>
                    <CardFooter>
                      <Metadata>
                        <DateLabel date="Aug 15, 2026" />
                        <ReadingTime minutes={6} />
                      </Metadata>
                    </CardFooter>
                  </CardContent>
                </Card>
              </Grid3>
            </div>

            {/* Featured Variant */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Variant: Featured</Overline>
              <Card variant="featured">
                <CardLink href="#" />
                <CardImage src="https://picsum.photos/seed/thryve4/1600/900" alt="Featured Article" aspectRatio="wide" className="h-[400px] md:h-auto" />
                <CardContent className="max-w-4xl mx-auto text-center items-center -mt-8 md:mt-0 relative z-20 bg-white p-6 md:p-0 md:bg-transparent">
                  <CardCategory>
                    <CategoryBadge>Cover Story</CategoryBadge>
                  </CardCategory>
                  <CardTitle size="lg" className="mt-4 mb-4">The Dawn of Sentient AI: Fact vs. Fiction</CardTitle>
                  <CardDescription className="max-w-2xl text-lg mb-6">
                    Separating the marketing hype from true technological breakthroughs in the race toward artificial general intelligence.
                  </CardDescription>
                  <CardFooter className="justify-center">
                    <Metadata>
                      <AuthorMeta name="Thryve Editorial" />
                      <DateLabel date="Aug 18, 2026" />
                      <ReadingTime minutes={24} />
                    </Metadata>
                  </CardFooter>
                </CardContent>
              </Card>
            </div>

            {/* Horizontal Variant */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Variant: Horizontal</Overline>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card variant="horizontal">
                  <CardLink href="#" />
                  <CardImage src="https://picsum.photos/seed/thryve5/800/600" alt="Horizontal" aspectRatio="portrait" className="w-full md:w-2/5 md:aspect-square" />
                  <CardContent>
                    <CardCategory>
                      <CategoryBadge variant="outline">Review</CategoryBadge>
                    </CardCategory>
                    <CardTitle size="default">The New MacBook Pro: A Developer&apos;s Dream Machine</CardTitle>
                    <CardDescription>
                      Testing the limits of Apple Silicon with local AI model compilation and heavy multi-threaded workloads.
                    </CardDescription>
                    <CardFooter>
                      <Metadata>
                        <DateLabel date="Aug 14, 2026" />
                      </Metadata>
                    </CardFooter>
                  </CardContent>
                </Card>

                <Card variant="horizontal">
                  <CardLink href="#" />
                  <CardImage src="https://picsum.photos/seed/thryve6/800/600" alt="Horizontal" aspectRatio="portrait" className="w-full md:w-2/5 md:aspect-square" />
                  <CardContent>
                    <CardCategory>
                      <CategoryBadge variant="outline">Science</CategoryBadge>
                    </CardCategory>
                    <CardTitle size="default">Breakthrough in Solid State Battery Technology</CardTitle>
                    <CardDescription>
                      New chemical compositions promise to double range while completely eliminating thermal runaway risks.
                    </CardDescription>
                    <CardFooter>
                      <Metadata>
                        <DateLabel date="Aug 12, 2026" />
                      </Metadata>
                    </CardFooter>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Compact Variant */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Variant: Compact (Listings & Sidebars)</Overline>
              <div className="max-w-md space-y-6">
                {[7, 8, 9].map((seed) => (
                  <Card key={seed} variant="compact">
                    <CardLink href="#" />
                    <CardImage src={`https://picsum.photos/seed/thryve${seed}/200/200`} alt="Compact" aspectRatio="square" className="w-24 h-24" />
                    <CardContent className="gap-1.5">
                      <CardCategory>
                        <Label>News</Label>
                      </CardCategory>
                      <CardTitle size="sm" className="line-clamp-2">Latest Updates to the Next.js App Router Framework</CardTitle>
                      <CardFooter className="pt-1">
                        <Metadata>
                          <DateLabel date={`Aug 0${seed}, 2026`} />
                        </Metadata>
                      </CardFooter>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Form UI Foundation</H3>
            <Body className="text-neutral-500">Accessible, high-contrast input primitives for search, filters, and feedback.</Body>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Basic Inputs */}
            <div className="space-y-8">
              <div>
                <Overline className="block mb-6 text-neutral-400">Text Inputs</Overline>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input id="email" type="email" placeholder="jane@example.com" />
                    <FormMessage>We&apos;ll never share your email.</FormMessage>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input id="password" type="password" defaultValue="secretpassword123" />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel htmlFor="error-input" className="text-red-700">Display Name</FormLabel>
                    <Input id="error-input" type="text" defaultValue="jane_doe" error />
                    <FormMessage error>This username is already taken.</FormMessage>
                  </div>

                  <div className="space-y-2">
                    <FormLabel htmlFor="disabled-input">Invitation Code</FormLabel>
                    <Input id="disabled-input" type="text" placeholder="THRYVE-2026" disabled />
                    <FormMessage>Invitations are currently closed.</FormMessage>
                  </div>
                </div>
              </div>

              <div>
                <Overline className="block mb-6 text-neutral-400">Search</Overline>
                <div className="space-y-2">
                  <FormLabel htmlFor="search" className="sr-only">Search articles</FormLabel>
                  <SearchInput id="search" placeholder="Search articles, topics, authors..." />
                </div>
              </div>
            </div>

            {/* Selection Controls */}
            <div className="space-y-8">
              <div>
                <Overline className="block mb-6 text-neutral-400">Textarea & Select</Overline>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel htmlFor="topic">Primary Topic</FormLabel>
                    <Select id="topic">
                      <option value="" disabled selected>Select a topic...</option>
                      <option value="tech">Technology</option>
                      <option value="science">Science</option>
                      <option value="culture">Culture</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FormLabel htmlFor="bio">Author Bio</FormLabel>
                    <Textarea id="bio" placeholder="Tell us about yourself..." />
                  </div>
                </div>
              </div>

              <div>
                <Overline className="block mb-6 text-neutral-400">Checkboxes & Radios</Overline>
                <div className="space-y-6 bg-neutral-50 p-6 border border-neutral-100">
                  
                  <div className="space-y-4">
                    <FormLabel className="text-base">Newsletter Preferences</FormLabel>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="daily" defaultChecked />
                      <div className="space-y-1">
                        <FormLabel htmlFor="daily" className="cursor-pointer font-normal">Daily Digest</FormLabel>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="weekly" />
                      <div className="space-y-1">
                        <FormLabel htmlFor="weekly" className="cursor-pointer font-normal">Weekly Round-up</FormLabel>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-neutral-200">
                    <FormLabel className="text-base">Theme Style</FormLabel>
                    <div className="flex items-center space-x-3">
                      <Radio id="theme-light" name="theme" defaultChecked />
                      <FormLabel htmlFor="theme-light" className="cursor-pointer font-normal">Light (Default)</FormLabel>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Radio id="theme-dark" name="theme" />
                      <FormLabel htmlFor="theme-dark" className="cursor-pointer font-normal">Dark (High Contrast)</FormLabel>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Radio id="theme-auto" name="theme" disabled />
                      <FormLabel htmlFor="theme-auto" className="cursor-pointer font-normal">System Auto (Coming Soon)</FormLabel>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Icon System</H3>
            <Body className="text-neutral-500">Strictly scaled Lucide integrations optimized for inline editorial alignment.</Body>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Sizing Scale */}
            <div>
              <Overline className="block mb-6 text-neutral-400">Strict Sizing Scale</Overline>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-neutral-900 border-b border-neutral-100 pb-4">
                  <div className="w-16 flex justify-center"><Icon icon={FileText} size="xs" /></div>
                  <div className="flex-1">
                    <FormLabel>Extra Small (xs)</FormLabel>
                    <Caption className="block">14px · Used for dense metadata and overlines</Caption>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-neutral-900 border-b border-neutral-100 pb-4">
                  <div className="w-16 flex justify-center"><Icon icon={FileText} size="sm" /></div>
                  <div className="flex-1">
                    <FormLabel>Small (sm)</FormLabel>
                    <Caption className="block">16px · Default for inline body text and small buttons</Caption>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-neutral-900 border-b border-neutral-100 pb-4">
                  <div className="w-16 flex justify-center"><Icon icon={FileText} size="base" /></div>
                  <div className="flex-1">
                    <FormLabel>Base</FormLabel>
                    <Caption className="block">18px · Standard application UI scale</Caption>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-neutral-900 border-b border-neutral-100 pb-4">
                  <div className="w-16 flex justify-center"><Icon icon={FileText} size="lg" /></div>
                  <div className="flex-1">
                    <FormLabel>Large (lg)</FormLabel>
                    <Caption className="block">20px · Prominent actions and large buttons</Caption>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-neutral-900">
                  <div className="w-16 flex justify-center"><Icon icon={FileText} size="xl" /></div>
                  <div className="flex-1">
                    <FormLabel>Extra Large (xl)</FormLabel>
                    <Caption className="block">24px · Standalone controls, empty states</Caption>
                  </div>
                </div>
              </div>
            </div>

            {/* Inline Alignment */}
            <div className="space-y-12">
              <div>
                <Overline className="block mb-6 text-neutral-400">Inline Alignment (Optical Balancing)</Overline>
                
                <div className="space-y-6 bg-neutral-50 p-6 border border-neutral-100">
                  {/* Body Text Alignment */}
                  <div className="space-y-2">
                    <Caption className="block text-neutral-400">With Body Text</Caption>
                    <Body>
                      Download our complete guide <Icon icon={ArrowRight} size="sm" className="inline align-[-2px] mx-1" /> to learn more about the transition.
                    </Body>
                  </div>

                  {/* Action Link Alignment */}
                  <div className="space-y-2">
                    <Caption className="block text-neutral-400">Action Link Pattern</Caption>
                    <a href="#" className="inline-flex items-center gap-1.5 font-medium text-sm text-neutral-900 hover:text-neutral-500 transition-colors">
                      Continue Reading <Icon icon={ChevronRight} size="sm" />
                    </a>
                  </div>

                  {/* Button Alignment */}
                  <div className="space-y-2">
                    <Caption className="block text-neutral-400">With Components</Caption>
                    <div className="flex gap-4">
                      <Button variant="outline">
                        <Icon icon={Share2} size="sm" className="mr-2" />
                        Share Article
                      </Button>
                      <Button variant="secondary" size="icon" aria-label="View Comments">
                        <Icon icon={MessageCircle} size="base" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Inheritance */}
              <div>
                <Overline className="block mb-6 text-neutral-400">Color Inheritance (currentColor)</Overline>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer">
                    <Icon icon={Bookmark} size="base" />
                    <FormLabel className="cursor-pointer text-inherit">Save</FormLabel>
                  </div>
                  <div className="flex items-center gap-2 text-red-700 hover:text-red-800 transition-colors cursor-pointer">
                    <Icon icon={Mail} size="base" />
                    <FormLabel className="cursor-pointer text-inherit">Report</FormLabel>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>Section Primitives</H3>
            <Body className="text-neutral-500">Reusable layout components for rapid page assembly.</Body>
          </div>

          <Stack gap="xl">
            {/* Section Header & Content Grid Demo */}
            <div>
              <SectionHeader 
                overline="Science"
                title="Understanding the world around us"
                description="Explore the latest discoveries in physics, biology, and space exploration."
                action={<Button variant="outline" size="sm">View All Science <Icon icon={ArrowRight} size="sm" className="ml-2 inline align-[-2px]" /></Button>}
              />
              
              <ContentGrid>
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardImage src={`https://picsum.photos/seed/science${i}/800/600`} alt="Thumbnail" />
                    <CardContent>
                      <CardCategory>Physics</CardCategory>
                      <CardTitle>The quantum mechanics of everyday objects</CardTitle>
                      <CardDescription>How subatomic particles influence the macro world in ways we are just beginning to understand.</CardDescription>
                      <CardFooter>
                        <Metadata>
                          <AuthorMeta name="Dr. Sarah Chen" />
                          <DateLabel date="OCT 12, 2026" />
                        </Metadata>
                      </CardFooter>
                    </CardContent>
                    <CardLink href="#" />
                  </Card>
                ))}
              </ContentGrid>
            </div>

            <Divider />

            {/* Layout Primitives Demo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              <div>
                <Overline className="block mb-6 text-neutral-400">Stack & Aspect Ratio</Overline>
                <div className="bg-neutral-50 p-6 border border-neutral-100">
                  <Stack gap="base">
                    <AspectRatio ratio="21/9" className="bg-neutral-200">
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-neutral-400 tracking-widest uppercase text-xs">21:9 Aspect Ratio</div>
                    </AspectRatio>
                    
                    <AspectRatio ratio="16/9" className="bg-neutral-200">
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-neutral-400 tracking-widest uppercase text-xs">16:9 Aspect Ratio</div>
                    </AspectRatio>
                  </Stack>
                </div>
              </div>

              <div>
                <Overline className="block mb-6 text-neutral-400">Cluster</Overline>
                <div className="bg-neutral-50 p-6 border border-neutral-100 space-y-6">
                  <Caption className="text-neutral-500">Clusters wrap content naturally with consistent gaps. Useful for tags, buttons, and metadata.</Caption>
                  
                  <Cluster>
                    <Tag>Technology</Tag>
                    <Tag>Artificial Intelligence</Tag>
                    <Tag>Machine Learning</Tag>
                    <Tag>Future</Tag>
                    <Tag>Ethics</Tag>
                    <Tag>Robotics</Tag>
                    <Tag>Society</Tag>
                  </Cluster>

                  <Divider />

                  <Cluster align="center">
                    <Button variant="primary" size="sm">Subscribe</Button>
                    <Button variant="outline" size="sm">Learn More</Button>
                    <a href="#" className="text-sm font-medium hover:underline ml-2">Dismiss</a>
                  </Cluster>
                </div>
              </div>

            </div>

          </Stack>

        </Container>
      </Section>

      <hr className="border-neutral-100" />

      <Section>
        <Container>
          <div className="mb-12">
            <H3>UI States</H3>
            <Body className="text-neutral-500">Standardized components for asynchronous operations, errors, and empty datasets.</Body>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Loading States */}
            <div className="space-y-12">
              <div>
                <Overline className="block mb-6 text-neutral-400">Loading Primitives</Overline>
                <div className="flex items-center gap-8 mb-8 bg-neutral-50 p-6 border border-neutral-100">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="base" />
                  <LoadingSpinner size="lg" />
                  <span className="text-sm font-medium text-neutral-500 ml-4 flex items-center gap-2">
                    <LoadingSpinner size="sm" /> Fetching articles...
                  </span>
                </div>
              </div>

              <div>
                <Overline className="block mb-6 text-neutral-400">Loading Card</Overline>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <LoadingCard />
                  <div className="hidden sm:block"><LoadingCard /></div>
                </div>
              </div>
            </div>

            {/* Feedback States */}
            <div className="space-y-8">
              <div>
                <Overline className="block mb-6 text-neutral-400">Empty State</Overline>
                <EmptyState 
                  title="No results found"
                  description="We couldn&apos;t find any articles matching your search query. Try adjusting your filters."
                  action={<Button variant="outline">Clear Filters</Button>}
                />
              </div>

              <div>
                <Overline className="block mb-6 text-neutral-400">Error State</Overline>
                <ErrorState 
                  action={<Button variant="outline" className="border-red-200 hover:bg-red-50 hover:text-red-900">Try Again</Button>}
                />
              </div>

              <div>
                <Overline className="block mb-6 text-neutral-400">Not Found State</Overline>
                <NotFoundState 
                  action={<Button variant="primary">Return Home</Button>}
                />
              </div>
            </div>

          </div>
        </Container>
      </Section>
      
    </div>
  );
}
