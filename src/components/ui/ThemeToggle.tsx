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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-9 p-2 opacity-0" />
  }

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-fit border-none bg-transparent px-2 shadow-none focus:ring-0 dark:text-gray-50">
        {theme === "light" && <RiSunLine className="size-5" />}
        {theme === "dark" && <RiMoonLine className="size-5" />}
        {theme === "system" && <RiComputerLine className="size-5" />}
        <span className="sr-only">Select theme</span>
      </SelectTrigger>

      <SelectContent
        align="end"
        className="min-w-[8rem] dark:border-gray-800 dark:bg-gray-950"
      >
        <SelectItem
          value="light"
          className="dark:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
        >
          <div className="flex items-center gap-2">
            <RiSunLine className="size-4" />
            <span>Light</span>
          </div>
        </SelectItem>
        <SelectItem
          value="dark"
          className="dark:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
        >
          <div className="flex items-center gap-2">
            <RiMoonLine className="size-4" />
            <span>Dark</span>
          </div>
        </SelectItem>
        <SelectItem
          value="system"
          className="dark:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
        >
          <div className="flex items-center gap-2">
            <RiComputerLine className="size-4" />
            <span>Auto</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
