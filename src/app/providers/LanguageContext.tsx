"use client"

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react"
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
  const languages = languageData?.languages?.filter((lang) => lang?.value !== "en-IN")

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

  // Derive active content based on selected language
  const activeContent = useMemo(() => {
    if (!pageData?.pageContents) return undefined
    return pageData.pageContents.find(
      (content) => content?.language?.value === selectedLangValue,
    )
  }, [pageData?.pageContents, selectedLangValue])

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
