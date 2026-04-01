/**
 * @fileoverview SafeLink Component - Link with fallback URL support
 *
 * A wrapper around Next.js Link that provides a fallback mechanism for links
 * that might fail silently (mailto:, tel:, custom protocols, app deep links, etc.).
 *
 * Features:
 * - Shows toast notification after clicking with fallback option
 * - Supports protocol links (mailto:, tel:, etc.)
 * - Handles internal and external links
 * - Customizable toast message and duration
 * - Dark mode support
 *
 * @example
 * ```tsx
 * <SafeLink
 *   href="mailto:contact@example.com"
 *   fallbackUrl="/contact"
 *   fallbackLabel="Use contact form"
 * >
 *   Email us
 * </SafeLink>
 * ```
 */
"use client"
import Link from "next/link"
import React from "react"
import { Maybe, NavigationLink } from "@/app/graphql/types"

/**
 * Simple Toast notification component
 */
interface ToastProps {
  message: string
  fallbackUrl: string
  fallbackLabel?: string
  fallbackExternal?: boolean
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({
  message,
  fallbackUrl,
  fallbackLabel = "Click here",
  fallbackExternal = true,
  onClose,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-100 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex max-w-md items-start gap-3 rounded-lg border border-gray-200/50 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/95">
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {message}{" "}
            <a
              href={fallbackUrl}
              className="font-semibold text-orange-500 underline decoration-orange-500/30 underline-offset-2 transition-colors hover:text-orange-600 hover:decoration-orange-600/50 dark:text-orange-400 dark:hover:text-orange-300"
              target={fallbackExternal ? "_blank" : undefined}
              rel={fallbackExternal ? "noopener noreferrer" : undefined}
              onClick={onClose}
            >
              {fallbackLabel}
            </a>
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          aria-label="Close notification"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

/**
 * SafeLink component props
 */
export type SafeLinkProps = {
  /** Fallback URL to show in toast if primary link fails */
  fallbackUrl?: string
  /** Additional CSS classes */
  className?: string
  /** Child elements to render inside the link */
  children?: React.ReactNode
  /** Custom toast message */
  toastMessage?: string
  /** Duration to show toast in milliseconds */
  toastDuration?: number
  /** Label for the fallback link in toast */
  fallbackLabel?: string
  /** Whether fallback link opens in new tab (default: true) */
  fallbackExternal?: boolean
  /** Force showing toast even for regular links (default: auto-detect) */
  alwaysShowToast?: boolean
  /** Icon name (for future use) */
  icon?: Maybe<string>
} & Partial<NavigationLink>

/**
 * SafeLink - A link component with fallback URL support
 *
 * Wraps Next.js Link and provides a fallback mechanism for links that might
 * fail silently. After clicking, shows a toast notification with fallback option.
 *
 * Automatically detects protocol links (mailto:, tel:, etc.) and only shows
 * toast for links that might fail. Regular navigation links work normally.
 */
export const SafeLink: React.FC<SafeLinkProps> = ({
  href,
  fallbackUrl,
  external = false,
  label,
  className,
  children,
  toastMessage = "Link didn't work?",
  toastDuration = 5000,
  fallbackLabel = "Click here",
  fallbackExternal = true,
  alwaysShowToast = false,
}) => {
  const [showToast, setShowToast] = React.useState(false)

  /**
   * Builds a link based on the provided path and external flag.
   * Handles internal and external links along with protocol links.
   */
  const buildLink = (path?: Maybe<string>, isExternal = false) => {
    if (!path) return "#"

    // Check if the path uses a protocol (http://, https://, mailto:, tel:, etc.)
    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path)

    // External links or protocol links: return as-is
    if (isExternal || hasProtocol) return path

    // Internal links: ensure they start with / for Next.js routing
    return path.startsWith("/") ? path : `/${path}`
  }

  // Detect if this is a protocol link that might fail
  const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href ?? "")
  const isHttpLink = href?.startsWith("http://") || href?.startsWith("https://")
  const shouldShowToast = alwaysShowToast || (hasProtocol && !isHttpLink)

  /**
   * Handles link click - shows toast after brief delay (only for protocol links)
   */
  const handleClick = () => {
    if (shouldShowToast && fallbackUrl) {
      // Show toast after a brief delay to allow the link to attempt opening
      setTimeout(() => {
        setShowToast(true)
      }, 500)
    }
  }

  /**
   * Auto-hide toast after duration
   */
  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, toastDuration)

      return () => clearTimeout(timer)
    }
  }, [showToast, toastDuration])

  const builtHref = buildLink(href, !!external)

  // For external or protocol links, use anchor tag
  if (external || hasProtocol) {
    return (
      <>
        <a
          href={builtHref}
          className={className}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          onClick={shouldShowToast ? handleClick : undefined}
        >
          {children || label}
        </a>
        {showToast && fallbackUrl && (
          <Toast
            message={toastMessage}
            fallbackUrl={fallbackUrl}
            fallbackLabel={fallbackLabel}
            fallbackExternal={fallbackExternal}
            onClose={() => setShowToast(false)}
          />
        )}
      </>
    )
  }

  // For internal links, use Next.js Link
  return (
    <>
      <Link
        href={builtHref}
        className={className}
        onClick={shouldShowToast ? handleClick : undefined}
      >
        {children || label}
      </Link>
      {showToast && fallbackUrl && (
        <Toast
          message={toastMessage}
          fallbackUrl={fallbackUrl}
          fallbackLabel={fallbackLabel}
          fallbackExternal={fallbackExternal}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}
