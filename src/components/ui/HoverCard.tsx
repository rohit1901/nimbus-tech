/**
 * @fileoverview HoverCard Component - Radix UI HoverCard wrapper
 *
 * Provides a floating card that appears when hovering over an element.
 * Built on top of Radix UI's HoverCard primitive with custom styling.
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <button>Hover me</button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="space-y-2">
 *       <h4 className="font-semibold">Hover Card</h4>
 *       <p className="text-sm">Additional information appears here</p>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import * as React from "react"

import { cx } from "@/lib/utils"

/**
 * HoverCard Root - Main container component
 *
 * Wraps the trigger and content. Manages open/close state.
 *
 * @example
 * ```tsx
 * <HoverCard openDelay={200} closeDelay={100}>
 *   <HoverCardTrigger>...</HoverCardTrigger>
 *   <HoverCardContent>...</HoverCardContent>
 * </HoverCard>
 * ```
 */
const HoverCard = HoverCardPrimitive.Root

/**
 * HoverCardTrigger - Element that triggers the hover card
 *
 * Use `asChild` prop to merge with child element.
 *
 * @example
 * ```tsx
 * <HoverCardTrigger asChild>
 *   <Link href="/profile">@username</Link>
 * </HoverCardTrigger>
 * ```
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger

/**
 * HoverCardContent - The floating content container
 *
 * Displays content in a styled card with animations when hovering.
 * Automatically positioned relative to the trigger element.
 *
 * Features:
 * - Smooth fade and zoom animations
 * - Automatic positioning (top, bottom, left, right)
 * - Portal rendering for proper z-index stacking
 * - Customizable alignment and offset
 * - Responsive and accessible
 *
 * @param align - Horizontal alignment relative to trigger ("start" | "center" | "end")
 * @param sideOffset - Distance in pixels from the trigger (default: 4)
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <HoverCardContent align="start" sideOffset={8}>
 *   <div className="space-y-2">
 *     <img src="/avatar.jpg" alt="Avatar" className="w-12 h-12 rounded-full" />
 *     <div>
 *       <h4 className="font-semibold">John Doe</h4>
 *       <p className="text-sm text-gray-600">Software Engineer</p>
 *     </div>
 *   </div>
 * </HoverCardContent>
 * ```
 */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cx(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-xl border bg-white p-4 text-gray-950 shadow-md outline-none",
        className,
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardContent, HoverCardTrigger }
