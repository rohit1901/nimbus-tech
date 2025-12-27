"use client"

import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"
import { RiCloseFill, RiMenuFill } from "@remixicon/react"
import Link from "next/link"
import React from "react"
import { ErrorState, LoadingState } from "@/components/Status"
import { useSectionContent } from "@/hooks/useSectionContent"
import { useLanguageContext } from "@/app/providers/LanguageContext"
import Image from "next/image"

export function NavBar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(15)
  const {
    activeContent,
    isReady,
    loading,
    error,
    currentLanguage,
  } = useLanguageContext()

  const { navigation } = useSectionContent(
    activeContent?.sections,
    currentLanguage?.value ?? "en-US",
  )

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={"Error fetching content"} />
  // Guard against missing language data
  if (!isReady || !activeContent) {
    console.error("Languages or Content not available")
    return <ErrorState message="Content not available" />
  }

  return (
    <header
      className={cx(
        "fixed inset-x-4 top-4 z-50 mx-auto flex max-w-6xl justify-center rounded-lg border border-transparent px-3 py-3 transition duration-300",
        scrolled || open
          ? "border-gray-200/50 bg-white/80 shadow-2xl shadow-black/5 backdrop-blur-sm"
          : "bg-white/0",
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <Link href={siteConfig.baseLinks.home} aria-label="Home">
            <span className="sr-only">{navigation?.image?.alt}</span>
            <Image
              className="w-50"
              src="https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg"
              alt="Logo"
              width={50}
              height={50}
            />
          </Link>
          <nav className="hidden sm:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-10 font-medium">
              {navigation?.items?.map((link) => (
                <Link
                  key={link.label}
                  className="px-2 py-1 text-gray-900"
                  href={link.href ?? "#"}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <Button
            variant="secondary"
            className="hidden h-10 font-semibold sm:block"
          >
            <Link href={navigation?.cta?.href ?? "#"}>
              {navigation?.cta?.label ?? "Get started"}
            </Link>
          </Button>
          <Button
            onClick={() => setOpen(!open)}
            variant="secondary"
            className="p-1.5 sm:hidden"
            aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {!open ? (
              <RiMenuFill
                className="size-6 shrink-0 text-gray-900"
                aria-hidden
              />
            ) : (
              <RiCloseFill
                className="size-6 shrink-0 text-gray-900"
                aria-hidden
              />
            )}
          </Button>
        </div>
        <nav
          className={cx(
            "mt-6 flex flex-col gap-6 text-lg ease-in-out will-change-transform sm:hidden",
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
          <Button variant="secondary" className="text-lg">
            <Link href={navigation?.cta?.href ?? "#"}>
              {navigation?.cta?.label ?? "Get started"}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
