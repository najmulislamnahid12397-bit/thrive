import React from "react";
import Image from "next/image";
import { Author } from "@/lib/types/article";
import { DateLabel, ReadingTime, Metadata } from "@/components/ui/editorial";
import { Twitter, Linkedin, Globe, Github, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArticleAuthorProps {
  author: Author;
  variant?: "compact" | "large" | "inline";
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  className?: string;
  showBio?: boolean;
  showRole?: boolean;
  showSocial?: boolean;
}

export function ArticleAuthor({
  author,
  variant = "compact",
  publishedAt,
  updatedAt,
  readingTime,
  className,
  showBio = true,
  showRole = true,
  showSocial = true,
}: ArticleAuthorProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const hasSocial =
    showSocial &&
    author.social &&
    Object.values(author.social).some((val) => Boolean(val));

  const parsedPublishedDate = publishedAt ? new Date(publishedAt) : null;
  const isValidPublishedDate = parsedPublishedDate && !isNaN(parsedPublishedDate.getTime());

  const parsedUpdatedDate = updatedAt ? new Date(updatedAt) : null;
  const isValidUpdatedDate = parsedUpdatedDate && !isNaN(parsedUpdatedDate.getTime());

  // Compact Variant (Header / Meta row)
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3.5 md:gap-4", className)}>
        {author.avatar ? (
          <div className="relative w-11 h-11 md:w-12 md:h-12 flex-shrink-0 rounded-full overflow-hidden bg-neutral-100 ring-1 ring-neutral-200/70">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="w-11 h-11 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
            {getInitials(author.name)}
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] md:text-xs font-bold text-neutral-900 uppercase tracking-widest">
              BY {author.name}
            </span>
            {showRole && author.role && (
              <span className="hidden sm:inline text-xs text-neutral-500 font-normal">
                · {author.role}
              </span>
            )}
          </div>

          {(isValidPublishedDate || isValidUpdatedDate || (readingTime !== undefined && readingTime > 0)) && (
            <Metadata className="text-[10px] md:text-[11px] mt-1 text-neutral-500">
              {isValidPublishedDate && <DateLabel date={parsedPublishedDate} />}
              {isValidUpdatedDate && (
                <span className="font-medium text-neutral-500 uppercase tracking-widest">
                  UPDATED {parsedUpdatedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
                </span>
              )}
              {readingTime !== undefined && readingTime > 0 && <ReadingTime minutes={readingTime} />}
            </Metadata>
          )}
        </div>
      </div>
    );
  }

  // Inline Variant (Simple single-line attribution)
  if (variant === "inline") {
    return (
      <div className={cn("inline-flex items-center gap-2.5", className)}>
        {author.avatar && (
          <div className="relative w-6 h-6 flex-shrink-0 rounded-full overflow-hidden bg-neutral-100 ring-1 ring-neutral-200/60">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          {author.name}
        </span>
        {showRole && author.role && (
          <span className="text-xs text-neutral-500 font-normal">
            ({author.role})
          </span>
        )}
      </div>
    );
  }

  // Large Variant (End of Article / Full Author Bio Box)
  return (
    <section
      aria-label={`About the author, ${author.name}`}
      className={cn(
        "rounded-2xl bg-neutral-50/80 border border-neutral-200/80 p-6 sm:p-8 md:p-10 my-10 transition-colors",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        {/* Avatar */}
        {author.avatar ? (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden bg-neutral-100 ring-2 ring-neutral-200 shadow-sm">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xl tracking-wider ring-2 ring-neutral-200">
            {getInitials(author.name)}
          </div>
        )}

        {/* Content */}
        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-neutral-500 block mb-1">
                Written by
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-neutral-900">
                {author.name}
              </h3>
            </div>

            {/* Optional Social Links */}
            {hasSocial && (
              <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap pt-2 sm:pt-0">
                {author.social?.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name}'s Twitter`}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/60 transition-colors active:scale-95"
                  >
                    <Twitter className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
                {author.social?.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name}'s LinkedIn`}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/60 transition-colors active:scale-95"
                  >
                    <Linkedin className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
                {author.social?.website && (
                  <a
                    href={author.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name}'s Personal Website`}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/60 transition-colors active:scale-95"
                  >
                    <Globe className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
                {author.social?.github && (
                  <a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name}'s GitHub`}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/60 transition-colors active:scale-95"
                  >
                    <Github className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
                {author.social?.instagram && (
                  <a
                    href={author.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name}'s Instagram`}
                    className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-100/60 transition-colors active:scale-95"
                  >
                    <Instagram className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Role */}
          {showRole && author.role && (
            <p className="text-xs md:text-sm font-medium text-neutral-600 mb-3 tracking-wide">
              {author.role}
            </p>
          )}

          {/* Bio */}
          {showBio && author.bio && (
            <p className="font-sans text-sm md:text-base text-neutral-700 leading-relaxed max-w-2xl">
              {author.bio}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ArticleAuthor;
