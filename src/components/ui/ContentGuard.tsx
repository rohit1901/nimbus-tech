/**
 * @fileoverview ContentGuard Component - Loading and error state wrapper
 *
 * Wraps content and automatically displays loading or error states based on
 * LanguageContext state. Used for client-side rendered pages.
 *
 * Note: In SSR pages, this component is typically not needed as data is
 * fetched on the server before rendering.
 *
 * @example
 * ```tsx
 * // Wrap page content with loading/error handling
 * <ContentGuard>
 *   <NavBar />
 *   <Main />
 *   <Footer />
 * </ContentGuard>
 * ```
 */
"use client"

import { ErrorState, LoadingState } from "@/components/Status"
import { useLanguageContext } from "@/app/providers/LanguageContext"

/**
 * Props for ContentGuard component
 */
interface ContentGuardProps {
  /** Content to render when data is successfully loaded */
  children: React.ReactNode
}

/**
 * ContentGuard - Conditional content renderer with loading/error states
 *
 * Automatically shows:
 * - Loading spinner while data is being fetched
 * - Error message if data fails to load or is unavailable
 * - Children content when data is successfully loaded
 *
 * Used primarily with LanguageContext to handle page content loading states.
 *
 * Features:
 * - Automatic loading state detection
 * - Error boundary functionality
 * - Centered loading spinner
 * - User-friendly error messages
 *
 * @param children - Content to display when data is loaded
 * @returns LoadingState, ErrorState, or children based on context state
 *
 * @example
 * ```tsx
 * // In a client-side rendered page
 * export default function Home() {
 *   return (
 *     <ContentGuard>
 *       <NavBar />
 *       <Main />
 *       <Footer />
 *     </ContentGuard>
 *   )
 * }
 * ```
 *
 * @deprecated This component is primarily used in CSR pages.
 * For SSR pages (recommended), fetch data on the server instead.
 */
export function ContentGuard({ children }: ContentGuardProps) {
  const { isLoading, error, activeContent } = useLanguageContext()

  if (isLoading) {
    return <LoadingState variant="default" centered />
  }

  if (error || !activeContent) {
    return <ErrorState message="Content not available" />
  }

  return <>{children}</>
}
