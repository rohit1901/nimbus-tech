"use client"

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react"
import { Language, PageContent } from "@/app/graphql/types"
import { useLanguage, usePageContents } from "@/queries" // Assuming this fetches your data

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

const DEFAULT_LANGUAGE = "en-US"

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
  const { data, loading, error } = useLanguage()
  const { data: pageData } = usePageContents()
  const languages = data?.languages

  // 2. Compute available languages
  const availableLanguages = useMemo(() => {
    if (!languages) return []
    return languages.map(l => {
      if (!l.value || !l.label) return null
      return l
    }).filter(Boolean)
  }, [languages])

  // 3. Shared State for selected language
  const [selectedLangValue, setSelectedLangValue] = useState<string>(DEFAULT_LANGUAGE)

  // 4. Detect browser language and set initial language
  useEffect(() => {
    if (availableLanguages.length > 0) {
      const browserLang = detectBrowserLanguage()
      let initialLanguage = DEFAULT_LANGUAGE

      // Check if browser language matches available languages
      const browserLangMatch = availableLanguages.find((lang) =>
        lang?.value?.startsWith(browserLang),
      )

      if (browserLangMatch && browserLangMatch.value) {
        initialLanguage = browserLangMatch.value
      }

      setSelectedLangValue(initialLanguage)
    }
  }, [availableLanguages])

  // 5. Fallback logic if browser detection doesn't work
  useEffect(() => {
    if (availableLanguages.length > 0 && !selectedLangValue) {
      const defaultLang = availableLanguages.find((l) => l?.value === DEFAULT_LANGUAGE)

      setSelectedLangValue(defaultLang?.value ?? DEFAULT_LANGUAGE)
    }
  }, [availableLanguages, selectedLangValue])

  // 5. Derive active content based on shared state
  const activeContent = useMemo(() => {
    if (!pageData?.pageContents) return null
    return pageData.pageContents?.find(
      (content) => content?.language?.value === selectedLangValue,
    )
  }, [pageData?.pageContents, selectedLangValue])

  const currentLanguage = useMemo(() => {
    const language = availableLanguages.find((l) => l?.value === selectedLangValue)
    return language
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
