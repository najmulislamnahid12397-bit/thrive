import React from "react";
import Markdown from "react-markdown";
import { ArticleSection } from "@/lib/types/article";
import { H2, H3, H4 } from "@/components/ui/typography";
import { EditorialImage } from "@/components/article/editorial-image";
import { PullQuote } from "@/components/article/pull-quote";
import { BlockQuote } from "@/components/article/block-quote";
import { Callout } from "@/components/article/callout";
import { EmptyState } from "@/components/ui/states";
import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  sections?: ArticleSection[];
}

const markdownComponents = {
  a: ({ node, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) => (
    <a className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors font-medium break-words" {...props} />
  ),
  strong: ({ node, ...props }: React.HTMLAttributes<HTMLElement> & { node?: unknown }) => (
    <strong className="font-semibold text-neutral-900" {...props} />
  ),
  em: ({ node, ...props }: React.HTMLAttributes<HTMLElement> & { node?: unknown }) => (
    <em className="italic text-neutral-800" {...props} />
  ),
  p: ({ node, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { node?: unknown }) => (
    <span {...props} />
  ),
};

// Helper to wrap text elements in the reading column
const TextWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full", className)}>
    {children}
  </div>
);

export function ArticleBody({ sections }: ArticleBodyProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Article Content Coming Soon"
          description="The editorial content for this story is currently being curated."
        />
      </div>
    );
  }

  return (
    <div className="w-full font-sans">
      {sections.map((section, index) => {
        switch (section.type) {
          case "paragraph":
            return (
              <TextWrapper key={index}>
                <p className="text-base sm:text-lg md:text-xl text-neutral-800 leading-[1.7] sm:leading-relaxed md:leading-[1.75] mb-5 sm:mb-6 md:mb-8 font-serif break-words hyphens-auto">
                  <Markdown components={markdownComponents}>{section.text}</Markdown>
                </p>
              </TextWrapper>
            );
          case "heading":
            return (
              <TextWrapper key={index}>
                {section.level === 2 && <H2 className="mt-10 sm:mt-14 mb-4 sm:mb-6 font-medium text-neutral-900">{section.text}</H2>}
                {section.level === 3 && <H3 className="mt-8 sm:mt-10 mb-3 sm:mb-4 font-medium text-neutral-900">{section.text}</H3>}
                {section.level === 4 && <H4 className="mt-6 sm:mt-8 mb-3 sm:mb-4 font-medium text-neutral-900">{section.text}</H4>}
              </TextWrapper>
            );
          case "image":
            return (
              <EditorialImage
                key={index}
                src={section.src}
                alt={section.alt}
                caption={section.caption}
                credit={section.credit}
                layout={section.layout || "wide"}
              />
            );
          case "quote":
            if (section.isPullQuote) {
              return (
                <TextWrapper key={index} className="max-w-4xl">
                  <PullQuote author={section.author} role={section.role}>
                    <Markdown components={markdownComponents}>{section.text}</Markdown>
                  </PullQuote>
                </TextWrapper>
              );
            }
            return (
              <TextWrapper key={index}>
                <BlockQuote author={section.author} role={section.role}>
                  <Markdown components={markdownComponents}>{section.text}</Markdown>
                </BlockQuote>
              </TextWrapper>
            );
          case "list":
            const ListTag = section.style === "ordered" ? "ol" : "ul";
            return (
              <TextWrapper key={index}>
                <ListTag className={`mb-6 sm:mb-8 md:mb-10 pl-5 sm:pl-6 space-y-2.5 sm:space-y-3 ${section.style === "ordered" ? "list-decimal" : "list-disc"} text-base sm:text-lg md:text-xl font-serif text-neutral-800 leading-relaxed md:leading-[1.75]`}>
                  {section.items.map((item, i) => (
                    <li key={i} className="pl-1 sm:pl-2 break-words">
                      <Markdown components={markdownComponents}>{item}</Markdown>
                    </li>
                  ))}
                </ListTag>
              </TextWrapper>
            );
          case "callout":
            return (
              <TextWrapper key={index}>
                <Callout title={section.title} intent={section.intent}>
                  <Markdown
                    components={{
                      ...markdownComponents,
                      p: ({ node, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { node?: unknown }) => (
                        <p className="mb-4 last:mb-0" {...props} />
                      ),
                    }}
                  >
                    {section.text}
                  </Markdown>
                </Callout>
              </TextWrapper>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
