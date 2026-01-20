/**
 * @fileoverview ThemeToggle Component - Theme selection dropdown
 *
 * Provides a dropdown menu for switching between light, dark, and system theme modes.
 * Uses next-themes for theme management with proper SSR handling.
 *
 * @example
 * ```tsx
 * // In navbar or settings
 * <ThemeToggle />
 * ```
 */
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { RiMoonLine, RiSunLine, RiComputerLine } from "@remixicon/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/Select"
import { SelectPortal } from "@radix-ui/react-select"

/**
 * Available theme options with icons
 * @internal
 */
const themeOptions = [
  {
    value: "light" as const,
    label: "Light",
    Icon: RiSunLine,
  },
  {
    value: "dark" as const,
    label: "Dark",
    Icon: RiMoonLine,
  },
  {
    value: "system" as const,
    label: "Auto",
    Icon: RiComputerLine,
  },
]

/**
 * ThemeToggle - Theme selection dropdown component
 *
 * Allows users to switch between light mode, dark mode, and system preference.
 * Includes proper hydration handling to avoid SSR mismatches.
 *
 * Features:
 * - Light theme with sun icon
 * - Dark theme with moon icon
 * - System/Auto theme with computer icon
 * - Smooth transitions between themes
 * - Prevents hydration mismatches with mounted state
 * - Fully accessible with ARIA labels
 *
 * @returns A dropdown select component for theme switching
 *
 * @example
 * ```tsx
 * // In navigation bar
 * <div className="flex items-center gap-4">
 *   <ThemeToggle />
 *   <LanguageToggle />
 * </div>
 * ```
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for client-side hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return <div className="h-9 w-9 p-2 opacity-0" />
  }

  const current = themeOptions.find((opt) => opt.value === theme)

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-fit border-none bg-transparent px-2 shadow-none focus:ring-0 dark:text-gray-50">
        {current && <current.Icon className="size-5" />}
        <span className="sr-only">Select theme</span>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent className="dark:border-gray-800 dark:bg-gray-950">
          {themeOptions.map(({ value, label, Icon }) => (
            <SelectItem
              key={value}
              value={value}
              className="dark:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4" />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  )
}
