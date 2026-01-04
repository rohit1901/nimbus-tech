"use client"

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react"
import { Language, PageContent } from "@/app/graphql/types"
import { usePageContents } from "@/queries" // Assuming this fetches your data

type Maybe<T> = T | null | undefined

interface LanguageContextType {
  currentLanguage: Maybe<Language>
  availableLanguages: Maybe<Language>[]
  activeContent: Maybe<PageContent>
  setLanguage: (languageValue: string) => void
  isReady: boolean
  loading: boolean
  error: unknown
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

// Helper function to detect browser language
const detectBrowserLanguage = (): string => {
  if (typeof window !== "undefined") {
    const browserLang =
      navigator.language || navigator.languages?.[0] || "en-US"
    // Extract just the language code (e.g., "en-US" -> "en", "de-DE" -> "de")
    return browserLang.split("-")[0].toLowerCase()
  }
  return "en"
}

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // 1. Fetch data ONCE here at the top level
  const { data, loading, error } = usePageContents()
  const pageContents = data?.pageContents

  // 2. Compute available languages
  const availableLanguages = useMemo(() => {
    if (!pageContents) return []
    return pageContents
      .map((content) => content?.language)
      .filter(
        (lang): lang is Language & { value: string } => !!lang && !!lang.value,
      )
  }, [pageContents])

  // 3. Shared State for selected language
  const [selectedLangValue, setSelectedLangValue] = useState<string>("en-US")

  // 4. Detect browser language and set initial language
  useEffect(() => {
    if (availableLanguages.length > 0) {
      const browserLang = detectBrowserLanguage()
      let initialLanguage = "en-US" // Default to English

      // Check if browser language matches available languages
      const browserLangMatch = availableLanguages.find((lang) =>
        lang.value.startsWith(browserLang),
      )

      if (browserLangMatch) {
        initialLanguage = browserLangMatch.value
      }

      setSelectedLangValue(initialLanguage)
    }
  }, [availableLanguages])

  // 5. Fallback logic if browser detection doesn't work
  useEffect(() => {
    if (availableLanguages.length > 0 && !selectedLangValue) {
      const defaultLang = availableLanguages.find((l) => l.value === "en-US")
      setSelectedLangValue(defaultLang?.value ?? availableLanguages[0].value)
    }
  }, [availableLanguages, selectedLangValue])

  // 5. Derive active content based on shared state
  const activeContent = useMemo(() => {
    if (!pageContents) return null
    return pageContents.find(
      (content) => content?.language?.value === selectedLangValue,
    )
  }, [pageContents, selectedLangValue])

  const currentLanguage = useMemo(() => {
    return availableLanguages.find((l) => l.value === selectedLangValue) ?? null
  }, [availableLanguages, selectedLangValue])

  const value = {
    currentLanguage,
    availableLanguages,
    activeContent: activeContent ?? null,
    setLanguage: setSelectedLangValue,
    isReady: availableLanguages.length > 0,
    loading,
    error,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to consume the context
export const useLanguageContext = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguageContext must be used within a LanguageProvider")
  }
  return context
}
