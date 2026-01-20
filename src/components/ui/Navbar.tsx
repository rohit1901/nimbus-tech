"use client"

import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"
import { RiCloseFill, RiMenuFill } from "@remixicon/react"
import Link from "next/link"
import React from "react"
import { useSectionContent } from "@/hooks/useSectionContent"
import { useLanguageContext } from "@/app/providers/LanguageContext"
import Image from "next/image"
import { useTheme } from "next-themes"
import LanguageToggle from "@/components/ui/LanguageToggle"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export function NavBar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(15)
  const { activeContent, currentLanguage, availableLanguages, setLanguage } =
    useLanguageContext()

  const { navigation } = useSectionContent(
    activeContent?.sections,
    currentLanguage?.value ?? "en-US",
  )

  const { resolvedTheme } = useTheme()

  return (
    <header
      className={cx(
        "fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl justify-center rounded-lg border border-transparent px-3 py-3 transition duration-300",
        scrolled || open
          ? "border-gray-200/50 bg-white/80 shadow-2xl shadow-black/5 backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-950/80"
          : "bg-white/0 dark:bg-gray-950/0",
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <Link href={siteConfig.baseLinks.home} aria-label="Home">
            <span className="sr-only">{navigation?.image?.alt}</span>
            <Image
              className="w-50"
              src={
                navigation?.image?.src ??
                "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg"
              }
              alt={navigation?.image?.alt ?? "Nimbus Tech Logo"}
              width={50}
              height={50}
            />
          </Link>
          <nav className="hidden sm:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-10 font-medium">
              {navigation?.items?.map((link) => (
                <Link
                  key={link.label}
                  className="px-2 py-1 text-gray-900 transition-colors hover:text-orange-500 dark:text-gray-50 dark:hover:text-orange-400"
                  href={link.href ?? "#"}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-4 sm:flex">
            <ThemeToggle />
            <LanguageToggle
              availableLanguages={availableLanguages}
              currentValue={currentLanguage?.value}
              onChange={(value) => setLanguage(value)}
              variant="icon"
            />
            <Button
              variant={resolvedTheme === "dark" ? "primary" : "secondary"}
              className="hidden h-10 font-semibold sm:block"
            >
              <Link href={navigation?.cta?.href ?? "#"}>
                {navigation?.cta?.label ?? "Get started"}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />

            <Button
              onClick={() => setOpen(!open)}
              variant={resolvedTheme === "dark" ? "ghost" : "secondary"}
              // Added dark mode background and border classes
              className="p-1.5"
              aria-label={
                open ? "Close Navigation Menu" : "Open Navigation Menu"
              }
            >
              {!open ? (
                <RiMenuFill
                  // Added dark:text-gray-50
                  className="size-6 shrink-0 text-gray-900 dark:text-gray-50"
                  aria-hidden
                />
              ) : (
                <RiCloseFill
                  // Added dark:text-gray-50
                  className="size-6 shrink-0 text-gray-900 dark:text-gray-50"
                  aria-hidden
                />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <nav
          className={cx(
            "mt-6 flex flex-col gap-6 text-lg text-gray-900 ease-in-out will-change-transform sm:hidden dark:text-gray-50",
            open ? "" : "hidden",
          )}
        >
          <ul className="space-y-4 font-medium">
            {navigation?.items?.map((link) => (
              <li key={link.label} onClick={() => setOpen(false)}>
                <Link href={link.href ?? "#"}>{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile Language Toggle (if not already handled by LanguageToggle's responsive logic) */}
          {/* Note: Your existing LanguageToggle is hidden on small screens ("hidden ... lg:flex").
              You might want to create a mobile version or update LanguageToggle to support mobile. */}

          <Button
            variant={resolvedTheme === "dark" ? "primary" : "secondary"}
            className="w-full text-lg"
          >
            <Link href={navigation?.cta?.href ?? "#"}>
              {navigation?.cta?.label ?? "Get started"}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
