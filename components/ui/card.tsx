import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "featured" | "horizontal" | "compact" }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex",
        variant === "default" && "flex-col gap-3.5 sm:gap-4 md:gap-5",
        variant === "featured" && "flex-col gap-4 sm:gap-5 md:gap-6",
        variant === "horizontal" && "flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-start",
        variant === "compact" && "flex-row gap-3 sm:gap-4 items-center",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    src: string, 
    alt: string, 
    aspectRatio?: "video" | "square" | "portrait" | "wide" | "auto"
  }
>(({ className, src, alt, aspectRatio = "video", ...props }, ref) => {
  const ratios = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
    auto: "aspect-auto"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-neutral-100 shrink-0 rounded-none",
        ratios[aspectRatio],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "Article visual"}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-100" />
      )}
    </div>
  )
})
CardImage.displayName = "CardImage"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-3 flex-1", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardCategory = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-1 z-20 relative", className)} {...props} />
))
CardCategory.displayName = "CardCategory"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { size?: "sm" | "default" | "lg" }
>(({ className, size = "default", ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-serif font-medium text-neutral-900 leading-[1.2] tracking-tight transition-colors group-hover:text-neutral-600 decoration-1 underline-offset-4 group-hover:underline break-words",
      size === "sm" && "text-base sm:text-lg md:text-xl",
      size === "default" && "text-lg sm:text-xl md:text-2xl",
      size === "lg" && "text-2xl sm:text-3xl md:text-5xl",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-sans text-sm md:text-base leading-relaxed text-neutral-600 line-clamp-3", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-auto pt-2 flex flex-wrap items-center gap-3", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export interface CardLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  'aria-label'?: string;
}

const CardLink = React.forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ className, href, 'aria-label': ariaLabel, ...props }, ref) => (
    <Link
      ref={ref}
      href={href}
      aria-label={ariaLabel || "Read more about this article"}
      className={cn(
        "absolute inset-0 z-10 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4",
        className
      )}
      {...props}
    />
  )
)
CardLink.displayName = "CardLink"

export { 
  Card, 
  CardImage, 
  CardContent, 
  CardCategory, 
  CardTitle, 
  CardDescription, 
  CardFooter, 
  CardLink 
}

