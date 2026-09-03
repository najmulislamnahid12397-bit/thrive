import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * The Lucide icon component to render.
   */
  icon: LucideIcon
  
  /**
   * Controlled size constraints aligned with the editorial typographic scale.
   * xs: 14px - For metadata and small captions
   * sm: 16px - For body text inline and standard buttons
   * base: 18px - Standard UI icon scale
   * lg: 20px - For large buttons and prominent actions
   * xl: 24px - For standalone UI controls and headers
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  
  className?: string
}

const sizeMap = {
  xs: "w-[14px] h-[14px]",
  sm: "w-4 h-4",
  base: "w-[18px] h-[18px]",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
}

/**
 * Thryve Icon System
 * A wrapper around Lucide React to enforce strict sizing, perfect inline text alignment,
 * and predictable accessibility defaults.
 */
export function Icon({ 
  icon: IconComponent, 
  size = "base", 
  className, 
  "aria-label": ariaLabel,
  ...props 
}: IconProps) {
  return (
    <IconComponent
      className={cn(
        "shrink-0", // Prevents icon from squishing in flex containers
        sizeMap[size],
        className
      )}
      // Default to hidden from screen readers unless explicitly labeled
      aria-hidden={ariaLabel ? "false" : "true"}
      aria-label={ariaLabel}
      {...props}
    />
  )
}
