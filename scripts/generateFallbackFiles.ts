#!/usr/bin/env tsx
/**
 * @fileoverview Generate Fallback Markdown Files from GraphQL
 *
 * This script fetches page content from the GraphQL API and saves it as
 * markdown files to be used as fallbacks when GraphQL is unavailable.
 *
 * Usage:
 *   npm run generate-fallbacks
 *   or
 *   npx tsx scripts/generateFallbackFiles.ts
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'
import { config } from 'dotenv'
import type { Query } from '@/app/graphql/types'

// Load environment variables
config()

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

type PageConfig = {
  slug: string
  language: 'en-US' | 'de-DE'
  outputPath: string
  description: string
}

const PAGES_TO_FETCH: PageConfig[] = [
  {
    slug: 'privacy-policy',
    language: 'en-US',
    outputPath: 'src/data/legal/datenschutz-en.md',
    description: 'Privacy Policy (English)',
  },
  {
    slug: 'privacy-policy-de',
    language: 'de-DE',
    outputPath: 'src/data/legal/datenschutz-de.md',
    description: 'Datenschutzerklärung (Deutsch)',
  },
  {
    slug: 'impressum',
    language: 'en-US',
    outputPath: 'src/data/legal/terms-en.md',
    description: 'Terms of Service (English)',
  },
  {
    slug: 'impressum-de',
    language: 'de-DE',
    outputPath: 'src/data/legal/agb-de.md',
    description: 'Allgemeine Geschäftsbedingungen (Deutsch)',
  },
]

function createApolloClient() {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (useMock) {
    console.error('❌ Cannot generate fallback files in mock mode')
    console.error('   Set NEXT_PUBLIC_USE_MOCK=false in your .env file')
    process.exit(1)
  }

  if (!graphqlUrl) {
    console.error('❌ NEXT_PUBLIC_GRAPHQL_URL is not set')
    console.error('   Please set it in your .env file')
    console.error('   Example: NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql')
    process.exit(1)
  }

  console.log(`🔗 Using GraphQL URL: ${graphqlUrl}`)

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlUrl,
      fetch,
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
  })
}

async function fetchPageContent(
  client: ReturnType<typeof createApolloClient>,
  slug: string,
  language: string
): Promise<string | null> {
  try {
    console.log(`📡 Fetching content for "${slug}" (${language})...`)

    const { data, error } = await client.query<Pick<Query, 'pageContents'>>({
      query: GET_PAGE_CONTENT,
      variables: {
        slug,
        languageValue: language,
      },
    })

    if (error) {
      console.error(`⚠️  GraphQL error for "${slug}":`, error)
      return null
    }

    const pageContent = data?.pageContents?.[0]

    if (!pageContent?.description) {
      console.warn(`⚠️  No content found for "${slug}" (${language})`)
      return null
    }

    console.log(`✅ Successfully fetched content for "${slug}" (${pageContent.description.length} characters)`)
    return pageContent.description
  } catch (error) {
    console.error(`❌ Error fetching "${slug}":`, error)
    return null
  }
}

function saveMarkdownFile(content: string, outputPath: string): void {
  try {
    const fullPath = join(process.cwd(), outputPath)
    const dir = dirname(fullPath)

    // Ensure directory exists
    mkdirSync(dir, { recursive: true })

    // Write file
    writeFileSync(fullPath, content, 'utf-8')

    console.log(`💾 Saved to: ${outputPath}`)
  } catch (error) {
    console.error(`❌ Error saving file to "${outputPath}":`, error)
    throw error
  }
}

async function generateFallbackFiles(): Promise<void> {
  console.log('🚀 Starting fallback file generation...\n')

  const client = createApolloClient()

  let successCount = 0
  let failCount = 0

  for (const page of PAGES_TO_FETCH) {
    console.log(`\n📄 Processing: ${page.description}`)
    console.log(`   Slug: ${page.slug}`)
    console.log(`   Language: ${page.language}`)
    console.log(`   Output: ${page.outputPath}`)

    const content = await fetchPageContent(client, page.slug, page.language)

    if (content) {
      saveMarkdownFile(content, page.outputPath)
      successCount++
    } else {
      console.log(`⏭️  Skipping file creation (no content available)`)
      failCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Summary:')
  console.log(`   ✅ Successfully generated: ${successCount} file(s)`)
  console.log(`   ❌ Failed or skipped: ${failCount} file(s)`)
  console.log(`   📁 Total processed: ${PAGES_TO_FETCH.length} page(s)`)
  console.log('='.repeat(60))

  if (failCount > 0) {
    console.log('\n⚠️  Some files were not generated. Check the logs above.')
    console.log('   Make sure the content exists in your GraphQL API with the correct slugs.')
    process.exit(1)
  } else {
    console.log('\n🎉 All fallback files generated successfully!')
  }
}

// Run the script
generateFallbackFiles().catch((error) => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
