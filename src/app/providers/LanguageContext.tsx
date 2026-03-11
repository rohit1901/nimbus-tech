"use client"

/**
 * @fileoverview LanguageContext - Multi-language content management
 *
 * This context manages language selection and content routing for the application.
 * It uses a slug-based system where each page can have language-specific variants.
 *
 * @example Slug Resolution:
 * URL: "/"
 * - English (en-US): Finds page with slug "home"
 * - German (de-DE): Finds page with slug "home-de"
 *
 * URL: "/privacy-policy"
 * - English (en-US): Finds page with slug "privacy-policy"
 * - German (de-DE): Finds page with slug "privacy-policy-de"
 *
 * @example Creating New Pages:
 * 1. Add content in GraphQL/mock data with base slug (e.g., "about")
 * 2. Add language variants with suffix (e.g., "about-de", "about-fr")
 * 3. Create Next.js route at /app/[base-slug]/page.tsx
 * 4. No code changes needed - system automatically resolves variants
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react"
import { usePathname } from "next/navigation"
import { Language, PageContent } from "@/app/graphql/types"
import { useLanguage, usePageContents } from "@/queries"

interface LanguageContextType {
  currentLanguage?: Language
  availableLanguages: Language[]
  activeContent?: PageContent
  setLanguage: (languageValue: string) => void
  isLoading: boolean
  error: unknown
}

/**
 * Slug Naming Convention:
 * - Base slug (English): "home", "privacy-policy", "impressum"
 * - Language variants: "{base-slug}-{lang-code}"
 *   - German: "home-de", "privacy-policy-de"
 *   - French: "home-fr", "privacy-policy-fr"
 *
 * This allows the same URL path to show different content based on selected language.
 */

// Helper function to get base slug from URL path
// Converts URL path to base slug (without language suffix)
// Examples: "/" -> "home", "/privacy-policy" -> "privacy-policy"
const getBaseSlugFromPath = (pathname: string): string => {
  // Root path maps to "home"
  if (pathname === "/") {
    return "home"
  }

  // Remove leading slash and use path as slug
  // e.g., "/privacy-policy" -> "privacy-policy"
  return pathname.replace(/^\//, "")
}

// Helper function to find matching slug for language
// Tries multiple patterns to find the right page:
// 1. Exact match (e.g., "home" for en-US)
// 2. Base slug with short lang code (e.g., "home-de" for de-DE)
// 3. Base slug with full lang code (e.g., "home-de-DE")
// 4. Fallback to any page with sections for this language
const findSlugVariant = (
  baseSlug: string,
  languageValue: string,
  pages: PageContent[]
): PageContent | undefined => {
  const langCode = languageValue.split("-")[0].toLowerCase() // "de-DE" -> "de"

  // Try exact match first (e.g., "home" for English, "impressum" for English)
  const exactMatch = pages.find((p) => p?.slug === baseSlug)
  if (exactMatch) return exactMatch

  // Try with short language code (e.g., "home-de", "impressum-de")
  const shortLangMatch = pages.find((p) => p?.slug === `${baseSlug}-${langCode}`)
  if (shortLangMatch) return shortLangMatch

  // Try with full language code (e.g., "home-de-DE")
  const fullLangMatch = pages.find((p) => p?.slug === `${baseSlug}-${languageValue}`)
  if (fullLangMatch) return fullLangMatch

  // Fallback: find any page with sections for this language (typically home page)
  return pages.find((p) => p?.sections && p?.slug?.startsWith("home"))
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

const DEFAULT_LANGUAGE = "en-US"

// Helper function to detect browser language
const detectBrowserLanguage = (): string => {
  if (typeof window !== "undefined") {
    const browserLang =
      navigator.language || navigator.languages?.[0] || "en-US"
    return browserLang.split("-")[0].toLowerCase()
  }
  return "en"
}

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  // Fetch data from queries
  const {
    data: languageData,
    loading: languagesLoading,
    error: languagesError,
  } = useLanguage()
  const {
    data: pageData,
    loading: pageContentsLoading,
    error: pageContentsError,
  } = usePageContents()

  // TODO: Remove hardcoded Hindi option and handle other languages gracefully
  const languages = languageData?.languages?.filter(
    (lang) => lang?.value !== "en-IN",
  )

  // Compute available languages
  const availableLanguages = useMemo(() => {
    if (!languages) return []
    return languages
      .map((l) => {
        if (!l?.value || !l?.label) return null
        return l
      })
      .filter((l): l is Language => Boolean(l))
  }, [languages])

  // State for selected language
  const [selectedLangValue, setSelectedLangValue] =
    useState<string>(DEFAULT_LANGUAGE)
  const isInitialized = useRef(false)

  // Detect browser language and set initial language (only once)
  useEffect(() => {
    if (availableLanguages.length > 0 && !isInitialized.current) {
      isInitialized.current = true
      const browserLang = detectBrowserLanguage()
      let initialLanguage = DEFAULT_LANGUAGE

      const browserLangMatch = availableLanguages.find((lang) =>
        lang?.value?.startsWith(browserLang),
      )

      if (browserLangMatch?.value) {
        initialLanguage = browserLangMatch.value
      }

      setSelectedLangValue(initialLanguage)
    }
  }, [availableLanguages])

  // Derive active content based on URL path and selected language
  const activeContent = useMemo(() => {
    if (!pageData?.pageContents) {
      return undefined
    }

    // Get base slug from current URL path
    const baseSlug = getBaseSlugFromPath(pathname)

    // Filter pages by selected language
    const pagesForLanguage = pageData.pageContents.filter(
      (content) => content?.language?.value === selectedLangValue,
    )

    if (pagesForLanguage.length === 0) {
      return undefined
    }

    // Find the matching slug variant for this language
    return findSlugVariant(baseSlug, selectedLangValue, pagesForLanguage)
  }, [pageData?.pageContents, selectedLangValue, pathname])

  // Derive current language object
  const currentLanguage = useMemo(() => {
    return availableLanguages.find((l) => l.value === selectedLangValue)
  }, [availableLanguages, selectedLangValue])

  // Determine if we're still loading data
  const isLoading = languagesLoading || pageContentsLoading

  // Only report errors if there's truly no data available
  const hasError =
    (!languagesLoading && !languages && languagesError) ||
    (!pageContentsLoading && !pageData?.pageContents && pageContentsError)

  const error = hasError ? languagesError || pageContentsError : null

  const value = {
    currentLanguage,
    availableLanguages,
    activeContent,
    setLanguage: setSelectedLangValue,
    isLoading,
    error,
  }
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguageContext must be used within a LanguageProvider")
  }
  return context
}
