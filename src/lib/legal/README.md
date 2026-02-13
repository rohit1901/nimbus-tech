# Page Content Utilities

Generic utilities for fetching page content from GraphQL with optional file system fallback. This module provides flexible functions that work with any page slug, eliminating the need to hardcode mappings when adding new pages.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
- [Slug Naming Convention](#slug-naming-convention)
- [Migration Guide](#migration-guide)

## Overview

This module provides three main functions:

1. **`getPageContent()`** - Fetches content from GraphQL (recommended for new pages)
2. **`getPageContentWithFallback()`** - Fetches from GraphQL with file system fallback
3. **`getLegalContent()`** - Legacy function with hardcoded mappings (deprecated)

## Quick Start

### For New Pages (Recommended)

```tsx
import { getPageContent, Language } from "@/lib/legal/getLegalContent"

export default async function MyPage({ searchParams }) {
  const lang = (searchParams.lang || "en-US") as Language
  const slug = lang === "de-DE" ? "my-page-de" : "my-page"
  
  const content = await getPageContent(slug, lang)
  
  if (!content) {
    return <div>Content not found</div>
  }
  
  return <div>{content}</div>
}
```

### With File System Fallback

```tsx
import { getPageContentWithFallback, Language } from "@/lib/legal/getLegalContent"

export default async function MyPage({ searchParams }) {
  const lang = (searchParams.lang || "en-US") as Language
  const slug = lang === "de-DE" ? "my-page-de" : "my-page"
  const fallback = lang === "de-DE" 
    ? "output/page-content/de-DE/my-page-de.md" 
    : "output/page-content/en-US/my-page.md"
  
  const content = await getPageContentWithFallback(slug, lang, fallback)
  
  return <div>{content}</div>
}
```

## API Reference

### `getPageContent(slug: string, language: Language): Promise<string | null>`

Fetches page content from GraphQL by slug and language.

**Parameters:**
- `slug` - The page slug (e.g., 'privacy-policy', 'impressum-de')
- `language` - The language code ('en-US' or 'de-DE')

**Returns:**
- `Promise<string | null>` - The page content as markdown, or null if not found

**Example:**
```tsx
const content = await getPageContent('privacy-policy', 'en-US')
```

---

### `getPageContentWithFallback(slug: string, language: Language, fallbackFilePath?: string): Promise<string>`

Fetches page content from GraphQL with optional file system fallback.

**Parameters:**
- `slug` - The page slug
- `language` - The language code ('en-US' or 'de-DE')
- `fallbackFilePath` - Optional path to a fallback markdown file (relative to project root)

**Returns:**
- `Promise<string>` - The page content as markdown

**Throws:**
- `Error` if content cannot be found in GraphQL or fallback file

**Example:**
```tsx
const content = await getPageContentWithFallback(
  'privacy-policy',
  'en-US',
  'output/page-content/en-US/privacy-policy.md'
)
```

---

### `getLegalContent(document: 'privacy' | 'terms', language: Language): Promise<string>`

**⚠️ DEPRECATED:** Use `getPageContent()` or `getPageContentWithFallback()` instead.

Legacy function for backward compatibility. Uses hardcoded mappings for privacy and terms pages.

**Parameters:**
- `document` - The legal document type ('privacy' or 'terms')
- `language` - The language code ('en-US' or 'de-DE')

**Returns:**
- `Promise<string>` - The legal content as markdown

## Usage Examples

### Example 1: Simple Page (GraphQL Only)

```tsx
// src/app/about/page.tsx
import { getPageContent, Language } from "@/lib/legal/getLegalContent"
import ReactMarkdown from "react-markdown"

export default async function AboutPage({ searchParams }) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as Language
  const slug = lang === "de-DE" ? "about-us-de" : "about-us"
  
  const content = await getPageContent(slug, lang)
  
  if (!content) {
    return <div>Content not found</div>
  }
  
  return (
    <article className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  )
}
```

### Example 2: With Fallback

```tsx
// src/app/cookies/page.tsx
import { getPageContentWithFallback, Language } from "@/lib/legal/getLegalContent"

export default async function CookiePage({ searchParams }) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as Language
  
  const slug = lang === "de-DE" ? "cookie-policy-de" : "cookie-policy"
  const fallback = lang === "de-DE" 
    ? "output/page-content/de-DE/cookie-policy-de.md"
    : "output/page-content/en-US/cookie-policy.md"
  
  const content = await getPageContentWithFallback(slug, lang, fallback)
  
  return <div>{content}</div>
}
```

### Example 3: Helper Function for Cleaner Code

```tsx
// src/lib/utils/getLocalizedSlug.ts
import { Language } from "@/lib/legal/getLegalContent"

export function getLocalizedSlug(baseSlug: string, language: Language): string {
  return language === "de-DE" ? `${baseSlug}-de` : baseSlug
}

// Usage in page
import { getPageContent } from "@/lib/legal/getLegalContent"
import { getLocalizedSlug } from "@/lib/utils/getLocalizedSlug"

export default async function FAQPage({ searchParams }) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as Language
  const slug = getLocalizedSlug("faq", lang)
  const content = await getPageContent(slug, lang)
  
  return <div>{content}</div>
}
```

### Example 4: Dynamic Route Handler

```tsx
// src/app/legal/[slug]/page.tsx
import { getPageContent, Language } from "@/lib/legal/getLegalContent"

export default async function DynamicLegalPage({ params, searchParams }) {
  const { slug } = await params
  const search = await searchParams
  const lang = (search.lang || "en-US") as Language
  
  const fullSlug = lang === "de-DE" ? `${slug}-de` : slug
  const content = await getPageContent(fullSlug, lang)
  
  if (!content) {
    return <div>404 - Page not found</div>
  }
  
  return <div>{content}</div>
}
```

## Slug Naming Convention

For multi-language pages, use language suffixes:

| Language | Slug Pattern | Example |
|----------|-------------|---------|
| English (default) | `{page-name}` | `privacy-policy` |
| German | `{page-name}-de` | `privacy-policy-de` |
| French | `{page-name}-fr` | `privacy-policy-fr` |

### Current Slugs

| Page | English Slug | German Slug |
|------|-------------|-------------|
| Privacy Policy | `privacy-policy` | `privacy-policy-de` |
| Terms of Service | `impressum` | `impressum-de` |

## Migration Guide

### Before (Hardcoded Approach)

```tsx
// ❌ Required modifying getLegalContent.ts for new pages
const content = await getLegalContent("privacy", "en-US")
```

To add a new page type, you had to:
1. Update `LEGAL_SLUG_MAP` constant
2. Update `LEGAL_FILE_MAP` constant
3. Update `LegalDocument` type

### After (Flexible Approach)

```tsx
// ✅ No file modifications needed for new pages
const content = await getPageContent("privacy-policy", "en-US")
```

To add a new page:
1. Create content in GraphQL CMS with appropriate slug
2. Use `getPageContent()` or `getPageContentWithFallback()` in your page component
3. Done!

### Migration Steps

1. **For existing pages using `getLegalContent()`:**
   - No changes required (backward compatible)
   - Optionally migrate to `getPageContent()` for consistency

2. **For new pages:**
   - Use `getPageContent()` or `getPageContentWithFallback()`
   - Follow the slug naming convention
   - See examples above

## Adding a New Page

### Step 1: Create Content in GraphQL CMS

In your GraphQL CMS, create page content entries:

**English Version:**
- Slug: `my-new-page`
- Language: `en-US`
- Description: (your markdown content)

**German Version:**
- Slug: `my-new-page-de`
- Language: `de-DE`
- Description: (your German markdown content)

### Step 2: Create Your Page Component

```tsx
// src/app/my-new-page/page.tsx
import { getPageContent, Language } from "@/lib/legal/getLegalContent"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default async function MyNewPage({ searchParams }) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as Language
  const slug = lang === "de-DE" ? "my-new-page-de" : "my-new-page"
  
  const content = await getPageContent(slug, lang)
  
  if (!content) {
    return <div>Content not found</div>
  }
  
  return (
    <article className="prose prose-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
```

### Step 3: Done!

No need to modify `getLegalContent.ts` or any other files.

## Best Practices

1. **Use `getPageContent()` for new pages** - It's the simplest and most flexible
2. **Follow the slug naming convention** - Use `-de`, `-fr` suffixes for languages
3. **Handle null returns gracefully** - Show appropriate error messages
4. **Use helper functions** - Create `getLocalizedSlug()` to reduce repetition
5. **Prefer GraphQL over file fallbacks** - Fallbacks are for migration/safety only

## Troubleshooting

### Content Returns Null

**Problem:** `getPageContent()` returns `null`

**Solutions:**
- Verify the slug exists in your GraphQL CMS
- Check the language matches exactly ('en-US' or 'de-DE')
- Ensure the `description` field contains content
- Check network/GraphQL errors in console

### File Fallback Not Working

**Problem:** `getPageContentWithFallback()` throws error even with fallback file

**Solutions:**
- Verify the file path is correct (relative to project root)
- Check the file exists at the specified path
- Ensure the file is readable (permissions)

### Legacy Function Not Working

**Problem:** `getLegalContent()` errors for new document types

**Solution:**
- Use `getPageContent()` or `getPageContentWithFallback()` instead
- `getLegalContent()` only supports 'privacy' and 'terms'

## Support

For questions or issues, see:
- Example file: `src/lib/legal/examples/new-page-example.tsx`
- Source code: `src/lib/legal/getLegalContent.ts`
