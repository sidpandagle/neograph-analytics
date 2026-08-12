import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  /** `plain` sits on white; `surface` uses the tinted inner-card fill. */
  tone?: "plain" | "surface" | "tile" | "blue" | "ink" | "sky"
}

/**
 * The bordered content card — the system's primary content unit.
 * Depth comes from the hairline border and the panel it sits on,
 * never from a drop shadow.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, tone = "plain", ...props }, ref) => {
    const tones = {
      plain: "bg-white border border-[var(--cmi-line)] text-[var(--cmi-ink)]",
      surface: "bg-[var(--cmi-surface)] border border-transparent text-[var(--cmi-ink)]",
      tile: "bg-[var(--cmi-raisedsurface)] border border-[var(--cmi-line)] text-[var(--cmi-ink)]",
      blue: "bg-[var(--cmi-primary)] border border-transparent text-white",
      ink: "bg-[var(--cmi-ink)] border border-transparent text-white",
      sky: "bg-[var(--cmi-sky)] border border-transparent text-[var(--cmi-ink)]",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card transition-[border-color,transform] duration-200",
          tones[tone],
          hover && "hover:border-[var(--cmi-primary)] hover:-translate-y-0.5",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-6.5 pb-0", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "font-display text-[22px] font-semibold leading-[1.25] tracking-[-0.01em]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-[13.5px] leading-[1.55] text-[var(--cmi-body)]", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6.5", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 p-6.5 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
