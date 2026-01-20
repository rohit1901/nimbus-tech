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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
