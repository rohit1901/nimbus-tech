"use client"

import { ErrorState, LoadingState } from "@/components/Status"
import { useLanguageContext } from "@/app/providers/LanguageContext"

interface ContentGuardProps {
  children: React.ReactNode
}

export function ContentGuard({ children }: ContentGuardProps) {
  const { isLoading, error, activeContent } = useLanguageContext()

  if (isLoading) {
    return <LoadingState variant="default" />
  }

  if (error || !activeContent) {
    return <ErrorState message="Content not available" />
  }

  return <>{children}</>
}
