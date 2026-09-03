import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Caption } from "@/components/ui/typography";
import { Overline } from "@/components/ui/editorial";
import { Input, FormLabel } from "@/components/ui/form-primitives";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white pt-12 pb-8 sm:pt-16 md:pt-24 md:pb-12 mt-auto">
      <Container>
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 sm:mb-16 md:mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6">
            <span className="font-sans text-2xl font-bold tracking-tight text-neutral-900">
              THRYVE
            </span>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-neutral-600 max-w-md">
              A modern editorial media platform covering technology, science, culture, and the future of human-computer interaction.
            </p>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-7 lg:pl-12">
            <div className="bg-neutral-50 p-5 sm:p-6 md:p-8 border border-neutral-100 flex flex-col gap-4">
              <div className="space-y-1">
                <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-medium text-neutral-900">
                  The Weekly Briefing
                </h4>
                <p className="font-sans text-xs sm:text-sm text-neutral-600">
                  Get the latest editorial pieces and curated insights straight to your inbox.
                </p>
              </div>
              
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end mt-2" action="#">
                <div className="flex-1 space-y-2 w-full">
                  <FormLabel htmlFor="footer-newsletter" className="sr-only">
                    Email address
                  </FormLabel>
                  <Input 
                    id="footer-newsletter" 
                    type="email" 
                    placeholder="Email address" 
                    className="bg-white h-12 text-base px-4 rounded-none"
                    required
                  />
                </div>
                <Button type="button" size="lg" className="w-full sm:w-auto shrink-0 h-12 min-h-[48px] px-6 rounded-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

        </div>

        {/* Middle Section: Navigation Links */}
        <nav aria-label="Footer Navigation" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 border-t border-neutral-100 pt-8 sm:pt-12 md:pt-20 mb-10 sm:mb-16">
          
          <div>
            <Overline className="mb-4 sm:mb-6 block text-neutral-500">Explore</Overline>
            <ul className="space-y-1.5 sm:space-y-3">
              <li><Link href="/articles" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Articles</Link></li>
              <li><Link href="/topics" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Topics</Link></li>
              <li><Link href="/videos" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Videos</Link></li>
              <li><Link href="/guides" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Guides</Link></li>
              <li><Link href="/apps" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Apps</Link></li>
            </ul>
          </div>

          <div>
            <Overline className="mb-4 sm:mb-6 block text-neutral-500">Company</Overline>
            <ul className="space-y-1.5 sm:space-y-3">
              <li><Link href="/about" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">About</Link></li>
              <li><Link href="/contact" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Contact</Link></li>
              <li><Link href="/newsletter" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Newsletter</Link></li>
            </ul>
          </div>

          <div>
            <Overline className="mb-4 sm:mb-6 block text-neutral-500">Legal</Overline>
            <ul className="space-y-1.5 sm:space-y-3">
              <li><Link href="/privacy-policy" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <Overline className="mb-4 sm:mb-6 block text-neutral-500">Social</Overline>
            <ul className="space-y-1.5 sm:space-y-3">
              <li><Link href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">X (Twitter)</Link></li>
              <li><Link href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">Instagram</Link></li>
              <li><Link href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">YouTube</Link></li>
              <li><Link href="#" className="font-sans text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 inline-block">TikTok</Link></li>
            </ul>
          </div>

        </nav>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-neutral-100 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <Caption className="text-neutral-400">
            &copy; {new Date().getFullYear()} Thryve Media. All rights reserved.
          </Caption>
          <Caption className="text-neutral-400">
            Designed for clarity.
          </Caption>
        </div>

      </Container>
    </footer>
  );
}
