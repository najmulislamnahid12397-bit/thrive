import * as React from "react";
import { Guide } from "@/lib/mock-data";
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
import { CategoryBadge, Metadata, Overline, DateLabel } from "@/components/ui/editorial";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GuideCardProps {
  guide: Guide;
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
  hideDescription?: boolean;
}

export function GuideCard({
  guide,
  variant = "horizontal",
  className,
  hideDescription = false,
}: GuideCardProps) {
  if (!guide) return null;

  if (variant === "vertical") {
    return (
      <Card
        variant="default"
        className={cn(
          "bg-white border border-neutral-200 p-5 group hover:border-neutral-900 transition-all duration-300 hover:shadow-md h-full flex flex-col justify-between",
          className
        )}
      >
        <div>
          {/* Portrait Cover */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-200 mb-4 shrink-0">
            <CardImage
              src={guide.cover}
              alt={`Research guide cover for ${guide.title}`}
              aspectRatio="portrait"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 z-20">
              <span className="inline-flex items-center gap-1 bg-neutral-950/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                <FileText className="h-2.5 w-2.5" aria-hidden="true" />
                PDF
              </span>
            </div>
          </div>

          <CardCategory>
            <CategoryBadge variant="outline" className="text-[10px] text-neutral-600 border-neutral-300 bg-white">
              {guide.category}
            </CategoryBadge>
          </CardCategory>

          <CardTitle size="sm" className="mt-2 text-lg sm:text-xl font-serif font-medium leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-2">
            {guide.title}
          </CardTitle>

          {!hideDescription && guide.description && (
            <CardDescription className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mt-2">
              {guide.description}
            </CardDescription>
          )}
        </div>

        <CardFooter className="pt-4 border-t border-neutral-100 mt-4">
          <Metadata className="w-full justify-between">
            <Overline className="text-neutral-500 font-bold text-[11px]">{guide.pages} Pages</Overline>
            <DateLabel date={new Date(guide.publishedAt)} className="text-neutral-400 text-xs" />
          </Metadata>
        </CardFooter>

        <CardLink href={`/guides/${guide.slug}`} aria-label={`Read guide: ${guide.title}`} />
      </Card>
    );
  }

  // Default: Horizontal Layout
  return (
    <Card
      variant="horizontal"
      className={cn(
        "bg-white border border-neutral-200 p-3.5 sm:p-5 group hover:border-neutral-900 transition-all duration-300 hover:shadow-md items-start",
        className
      )}
    >
      <div className="relative shrink-0 w-20 sm:w-28 md:w-36 aspect-[3/4] overflow-hidden bg-neutral-100 border border-neutral-200 group-hover:border-neutral-400 transition-colors duration-300">
        <CardImage
          src={guide.cover}
          alt={`Research guide cover for ${guide.title}`}
          aspectRatio="portrait"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20">
          <span className="inline-flex items-center gap-1 bg-neutral-950/85 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5">
            <FileText className="h-2 w-2" aria-hidden="true" />
            PDF
          </span>
        </div>
      </div>

      <CardContent className="justify-between flex-1 gap-1.5 sm:gap-2 pt-0 min-w-0">
        <div>
          <CardCategory>
            <CategoryBadge variant="outline" className="text-[9px] sm:text-[10px] text-neutral-600 border-neutral-300 bg-white">
              {guide.category}
            </CategoryBadge>
          </CardCategory>

          <CardTitle size="sm" className="leading-snug text-sm sm:text-base md:text-xl text-neutral-900 group-hover:text-neutral-600 mt-1 sm:mt-1.5 transition-colors line-clamp-2 break-words">
            {guide.title}
          </CardTitle>

          {!hideDescription && guide.description && (
            <CardDescription className="text-[11px] sm:text-xs md:text-sm text-neutral-600 line-clamp-2 mt-1 sm:mt-2 leading-relaxed">
              {guide.description}
            </CardDescription>
          )}
        </div>

        <CardFooter className="pt-2 sm:pt-3 border-t border-neutral-100 mt-1.5 sm:mt-2">
          <Metadata className="w-full justify-between text-[10px] sm:text-xs">
            <Overline className="text-neutral-500 font-bold text-[10px] sm:text-[11px]">{guide.pages} Pages</Overline>
            <DateLabel date={new Date(guide.publishedAt)} className="text-neutral-400 text-[10px] sm:text-xs" />
          </Metadata>
        </CardFooter>
      </CardContent>

      <CardLink href={`/guides/${guide.slug}`} aria-label={`Read guide: ${guide.title}`} />
    </Card>
  );
}
