import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, ChevronDown } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "flex h-11 w-full border border-neutral-300 bg-transparent px-4 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 rounded-none transition-colors",
          error && "border-red-700 focus-visible:ring-red-700",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "flex min-h-[80px] w-full border border-neutral-300 bg-transparent px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 rounded-none transition-colors resize-y",
          error && "border-red-700 focus-visible:ring-red-700",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "flex h-11 w-full appearance-none border border-neutral-300 bg-transparent px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 rounded-none transition-colors",
            error && "border-red-700 focus-visible:ring-red-700",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-neutral-400" />
        <Input
          type="search"
          className={cn("pl-9", className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center shrink-0">
        <input
          type="checkbox"
          className={cn(
            "peer appearance-none w-5 h-5 border border-neutral-300 rounded-none checked:border-neutral-900 checked:bg-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />
        <svg
          className="absolute w-5 h-5 pointer-events-none hidden peer-checked:block text-white p-[3px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export const Radio = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center shrink-0">
        <input
          type="radio"
          className={cn(
            "peer appearance-none w-5 h-5 border border-neutral-300 rounded-full checked:border-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 transition-colors cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-neutral-900 pointer-events-none hidden peer-checked:block" />
      </div>
    )
  }
)
Radio.displayName = "Radio"

export const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none text-neutral-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    )
  }
)
FormLabel.displayName = "FormLabel"

export const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { error?: boolean }>(
  ({ className, error, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-[13px] font-medium",
          error ? "text-red-700" : "text-neutral-500",
          className
        )}
        {...props}
      />
    )
  }
)
FormMessage.displayName = "FormMessage"
