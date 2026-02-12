/**
 * @fileoverview Page Content Utilities
 *
 * Generic utilities for fetching page content from GraphQL with optional file system fallback.
 * This module provides flexible functions that work with any page slug, eliminating the need
 * to hardcode mappings when adding new pages.
 *
 * ## Recommended Usage (New Pages)
 *
 * For new pages, use `getPageContent` or `getPageContentWithFallback` directly with the slug:
 *
 * ```ts
 * // In your page component
 * export default async function MyPage({ searchParams }) {
 *   const lang = (searchParams.lang || "en-US") as Language
 *
 *   // Option 1: GraphQL only (recommended)
 *   const content = await getPageContent('my-page-slug', lang)
 *
 *   // Option 2: With file system fallback
 *   const content = await getPageContentWithFallback(
 *     'my-page-slug',
 *     lang,
 *     'src/data/my-page-en.md'  // optional fallback file
 *   )
 *
 *   return <div>{content}</div>
 * }
 * ```
 *
 * ## Slug Naming Convention
 *
 * For multi-language pages, append language suffix to slug:
 * - English: `my-page` (or `my-page-en`)
 * - German: `my-page-de`
 * - French: `my-page-fr`
 *
 * ## Legacy Usage
 *
 * The `getLegalContent` function is maintained for backward compatibility
 * but uses hardcoded mappings. New code should use the flexible functions above.
 *
 * @example
 * ```ts
 * // ✅ Good - Flexible approach (no hardcoding)
 * const content = await getPageContent('about-us', 'en-US')
 * const contentDe = await getPageContent('about-us-de', 'de-DE')
 *
 * // ⚠️ Okay - Legacy approach (requires updating this file for new pages)
 * const content = await getLegalContent('privacy', 'en-US')
 * ```
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import client from '@/lib/apolloClient'
import { gql } from '@apollo/client'
import { Query } from '@/app/graphql/types'

export type Language = 'en-US' | 'de-DE'

const GET_PAGE_CONTENT = gql`
  query GetPageContent($slug: String!, $languageValue: String!) {
    pageContents(
      where: {
        slug: { equals: $slug }
        language: { value: { equals: $languageValue } }
      }
    ) {
      id
      slug
      title
      description
      language {
        id
        label
        value
      }
    }
  }
`

/**
 * Fetches page content from GraphQL by slug and language
 *
 * @param slug - The page slug (e.g., 'privacy-policy', 'impressum', 'privacy-policy-de')
 * @param language - The language code ('en-US' or 'de-DE')
 * @returns The page content as a string (markdown format)
 *
 * @example
 * ```ts
 * // Fetch English privacy policy
 * const content = await getPageContent('privacy-policy', 'en-US')
 *
 * // Fetch German impressum
 * const content = await getPageContent('impressum-de', 'de-DE')
 * ```
 */
export async function getPageContent(
  slug: string,
  language: Language
): Promise<string | null> {
  try {
    // Fetch from GraphQL
    const { data } = await client.query<Pick<Query, 'pageContents'>>({
      query: GET_PAGE_CONTENT,
      variables: {
        slug,
        languageValue: language,
      },
      fetchPolicy: 'network-only',
    })

    const pageContent = data?.pageContents?.[0]

    if (pageContent?.description) {
      // Return the description field which contains the markdown content
      return pageContent.description
    }

    console.warn(
      `No GraphQL content found for slug "${slug}" in language "${language}"`
    )
    return null
  } catch (error) {
    console.error(
      `Error fetching page content from GraphQL for slug "${slug}" in language "${language}":`,
      error
    )
    return null
  }
}

/**
 * Fetches page content with optional file system fallback
 *
 * @param slug - The page slug
 * @param language - The language code
 * @param fallbackFilePath - Optional path to a fallback markdown file (relative to project root)
 * @returns The page content as a string (markdown format)
 *
 * @example
 * ```ts
 * // With fallback to file system
 * const content = await getPageContentWithFallback(
 *   'privacy-policy',
 *   'en-US',
 *   'src/data/legal/datenschutz-en.md'
 * )
 * ```
 */
export async function getPageContentWithFallback(
  slug: string,
  language: Language,
  fallbackFilePath?: string
): Promise<string> {
  // Try to fetch from GraphQL
  const content = await getPageContent(slug, language)

  if (content) {
    return content
  }

  // If no content found and fallback file is provided, try to read from file
  if (fallbackFilePath) {
    try {
      const filePath = join(process.cwd(), fallbackFilePath)
      const fileContent = readFileSync(filePath, 'utf-8')
      console.info(
        `Loaded content from fallback file: ${fallbackFilePath}`
      )
      return fileContent
    } catch (error) {
      console.error(
        `Error reading fallback file "${fallbackFilePath}":`,
        error
      )
    }
  }

  // If all else fails, throw an error
  throw new Error(
    `Could not find content for slug "${slug}" in language "${language}"${fallbackFilePath ? ` or in fallback file "${fallbackFilePath}"` : ''
    }`
  )
}

/**
 * DEPRECATED: Use getPageContent or getPageContentWithFallback instead
 *
 * Legacy function for backward compatibility
 * Fetches legal content from GraphQL or falls back to local markdown files
 *
 * @param document - The legal document type ('privacy' or 'terms')
 * @param language - The language code ('en-US' or 'de-DE')
 * @returns The legal content as a string (markdown format)
 *
 * @deprecated This function uses hardcoded mappings. Use getPageContent() or getPageContentWithFallback() instead.
 */
export async function getLegalContent(
  document: 'privacy' | 'terms',
  language: Language
): Promise<string> {
  const LEGACY_SLUG_MAP: Record<'privacy' | 'terms', Record<Language, string>> = {
    privacy: {
      'en-US': 'privacy-policy',
      'de-DE': 'privacy-policy-de',
    },
    terms: {
      'en-US': 'impressum',
      'de-DE': 'impressum-de',
    },
  }

  const LEGACY_FILE_MAP: Record<'privacy' | 'terms', Record<Language, string>> = {
    privacy: {
      'en-US': 'src/data/legal/datenschutz-en.md',
      'de-DE': 'src/data/legal/datenschutz-de.md',
    },
    terms: {
      'en-US': 'src/data/legal/terms-en.md',
      'de-DE': 'src/data/legal/agb-de.md',
    },
  }

  const slug = LEGACY_SLUG_MAP[document][language]
  const fallbackFile = LEGACY_FILE_MAP[document][language]

  return getPageContentWithFallback(slug, language, fallbackFile)
}
