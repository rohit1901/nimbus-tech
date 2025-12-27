import { useState, useMemo, useEffect } from "react"
import { Language, PageContent } from "@/app/graphql/types"

type Maybe<T> = T | null | undefined

interface UseContentLanguageReturn {
  currentLanguage: Maybe<Language>
  availableLanguages: Maybe<Language>[]
  activeContent: Maybe<PageContent>
  setLanguage: (languageValue: string) => void
  isReady: boolean
}

export const useContentLanguage = (
  pageContents?: Maybe<PageContent>[] | null,
): UseContentLanguageReturn => {
  // 1. Extract available languages efficiently
  const availableLanguages = useMemo(() => {
    if (!pageContents) return []
    return (
      pageContents
        .map((content) => content?.language)
        // FIX: Ensure language AND language.value exist to satisfy TypeScript
        .filter(
          (lang): lang is Language & { value: string } =>
            !!lang && !!lang.value,
        )
    )
  }, [pageContents])

  const [selectedLangValue, setSelectedLangValue] = useState<string>("en-US")

  // 2. Ensure a valid language is always selected when data loads
  useEffect(() => {
    if (availableLanguages.length > 0) {
      const hasCurrent = availableLanguages.some(
        (l) => l.value === selectedLangValue,
      )

      if (!hasCurrent) {
        const defaultLang = availableLanguages.find((l) => l.value === "en-US")

        // FIX: Coalesce to ensure strict string type.
        // We know availableLanguages[0].value is a string due to the filter above,
        // but TS might need the explicit fallback to satisfy the compiler.
        const nextLangValue =
          defaultLang?.value ?? availableLanguages[0].value ?? "en-US"

        setSelectedLangValue(nextLangValue)
      }
    }
  }, [availableLanguages, selectedLangValue])

  // 3. Derive the specific content for the selected language
  const activeContent = useMemo(() => {
    if (!pageContents) return null
    return pageContents.find(
      (content) => content?.language?.value === selectedLangValue,
    )
  }, [pageContents, selectedLangValue])

  // 4. Derive the actual Language object
  const currentLanguage = useMemo(() => {
    return availableLanguages.find((l) => l.value === selectedLangValue) ?? null
  }, [availableLanguages, selectedLangValue])

  return {
    currentLanguage,
    availableLanguages,
    activeContent: activeContent ?? null,
    setLanguage: setSelectedLangValue,
    isReady: availableLanguages.length > 0,
  }
}
