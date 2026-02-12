"use client"

import { useLanguageContext } from "@/app/providers/LanguageContext"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type LegalPageWrapperProps = {
  children: React.ReactNode
}

export function LegalPageWrapper({ children }: LegalPageWrapperProps) {
  const { currentLanguage } = useLanguageContext()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const currentLang = searchParams.get("lang")
    const contextLang = currentLanguage?.value || "en-US"

    // Only update if the language has changed
    if (currentLang !== contextLang) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set("lang", contextLang)
      router.push(`${pathname}?${newSearchParams.toString()}`)
    }
  }, [currentLanguage, pathname, router, searchParams])

  return <>{children}</>
}
