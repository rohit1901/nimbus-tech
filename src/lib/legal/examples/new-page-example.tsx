/**
 * @fileoverview Example: How to create a new page with dynamic content
 *
 * This example demonstrates how to use the new flexible getPageContent functions
 * to create pages without modifying getLegalContent.ts
 */

import { getPageContent, getPageContentWithFallback, Language } from "@/lib/legal/getLegalContent"
import { NavBar } from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"
import { LegalPageWrapper } from "@/components/legal/LegalPageWrapper"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Metadata } from "next"

// ============================================================================
// EXAMPLE 1: Simple page with GraphQL content only (recommended)
// ============================================================================

type AboutPageProps = {
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: AboutPageProps): Promise<Metadata> {
  const params = await searchParams
  const lang = params.lang || "en-US"

  const titles = {
    "en-US": "About Us | Nimbus Tech",
    "de-DE": "Über Uns | Nimbus Tech",
  }

  return {
    title: titles[lang as keyof typeof titles] || titles["en-US"],
  }
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as Language

  // Determine the slug based on language
  const slug = lang === "de-DE" ? "about-us-de" : "about-us"

  // Fetch content from GraphQL (no fallback)
  const content = await getPageContent(slug, lang)

  if (!content) {
    return (
      <LegalPageWrapper>
        <NavBar />
        <main className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
          <div className="relative mx-auto max-w-4xl px-4 py-20">
            <h1>Content not found</h1>
            <p>The requested content could not be loaded.</p>
          </div>
        </main>
        <Footer />
      </LegalPageWrapper>
    )
  }

  return (
    <LegalPageWrapper>
      <NavBar />
      <main className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </LegalPageWrapper>
  )
}

// ============================================================================
// EXAMPLE 2: Page with file system fallback
// ============================================================================

export async function CookiePolicyPage({ searchParams }: AboutPageProps) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as Language

  // Determine slug and fallback file based on language
  const slug = lang === "de-DE" ? "cookie-policy-de" : "cookie-policy"
  const fallbackFile = lang === "de-DE"
    ? "src/data/legal/cookies-de.md"
    : "src/data/legal/cookies-en.md"

  // Fetch content with fallback to file system
  const content = await getPageContentWithFallback(slug, lang, fallbackFile)

  return (
    <LegalPageWrapper>
      <NavBar />
      <main className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </LegalPageWrapper>
  )
}

// ============================================================================
// EXAMPLE 3: Dynamic page that handles multiple document types
// ============================================================================

type DynamicLegalPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ lang?: string }>
}

export async function DynamicLegalPage({ params, searchParams }: DynamicLegalPageProps) {
  const { slug } = await params
  const { lang } = await searchParams
  const language = (lang || "en-US") as Language

  // Construct the full slug with language suffix if needed
  const fullSlug = language === "de-DE" ? `${slug}-de` : slug

  // Fetch content dynamically based on URL
  const content = await getPageContent(fullSlug, language)

  if (!content) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page "{fullSlug}" could not be found.</p>
      </div>
    )
  }

  return (
    <LegalPageWrapper>
      <NavBar />
      <main className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </LegalPageWrapper>
  )
}

// ============================================================================
// EXAMPLE 4: Slug helper function for cleaner code
// ============================================================================

/**
 * Helper function to get the correct slug for a page based on language
 */
function getLocalizedSlug(baseSlug: string, language: Language): string {
  return language === "de-DE" ? `${baseSlug}-de` : baseSlug
}

export async function FAQPage({ searchParams }: AboutPageProps) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as Language

  // Use helper function for cleaner code
  const slug = getLocalizedSlug("faq", lang)
  const content = await getPageContent(slug, lang)

  if (!content) {
    throw new Error(`FAQ content not found for language: ${lang}`)
  }

  return (
    <LegalPageWrapper>
      <NavBar />
      <main className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="relative mx-auto max-w-4xl px-4 py-20">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </LegalPageWrapper>
  )
}

// ============================================================================
// SUMMARY: Steps to add a new page
// ============================================================================

/*
 * To add a new page (e.g., "Accessibility Statement"):
 *
 * 1. In your GraphQL CMS, create page content entries:
 *    - Slug: "accessibility" (or "accessibility-statement")
 *    - Language: "en-US"
 *    - Description: (your markdown content)
 *
 *    - Slug: "accessibility-de" (or "accessibility-statement-de")
 *    - Language: "de-DE"
 *    - Description: (your German markdown content)
 *
 * 2. Create your page component:
 *    ```tsx
 *    export default async function AccessibilityPage({ searchParams }) {
 *      const lang = (searchParams.lang || "en-US") as Language
 *      const slug = getLocalizedSlug("accessibility", lang)
 *      const content = await getPageContent(slug, lang)
 *      return <YourPageLayout content={content} />
 *    }
 *    ```
 *
 * 3. Done! No need to modify getLegalContent.ts
 */
