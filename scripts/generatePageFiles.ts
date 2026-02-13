#!/usr/bin/env node

/**
 * @fileoverview Generate Page Content Files (Markdown) from GraphQL
 *
 * This script fetches page content from the GraphQL API and saves it as
 * markdown files in the output directory, organized by language.
 *
 * Usage:
 *   npm run generate:page-files
 *   or
 *   node scripts/generatePageFiles.ts
 *   or with options:
 *   node scripts/generatePageFiles.ts --pages=privacy,terms
 */

import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client"
import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"
import { config } from "dotenv"

// Load environment variables
config()

// Configuration
interface Config {
  outputDir: string
  pages: string[]
}

const DEFAULT_CONFIG: Config = {
  outputDir: join(process.cwd(), "output", "page-content"),
  pages: ["privacy-policy", "impressum"], // Default pages to export
}

// Page configuration type
type PageConfig = {
  slug: string
  language: "en-US" | "de-DE"
  description: string
}

// GraphQL Query
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
 * Parse command line arguments
 */
function parseArgs(): Partial<Config> {
  const args = process.argv.slice(2)
  const config: Partial<Config> = {}

  for (const arg of args) {
    if (arg.startsWith("--pages=")) {
      const pages = arg.replace("--pages=", "")
      config.pages = pages.split(",").map((p) => p.trim())
    } else if (arg.startsWith("--output=")) {
      config.outputDir = arg.replace("--output=", "")
    }
  }

  return config
}

/**
 * Generate page configurations for all languages
 */
function generatePageConfigs(pageNames: string[]): PageConfig[] {
  const configs: PageConfig[] = []
  const languages: Array<"en-US" | "de-DE"> = ["en-US", "de-DE"]

  for (const pageName of pageNames) {
    for (const language of languages) {
      // Determine slug based on language
      const slug = language === "de-DE" ? `${pageName}-de` : pageName

      configs.push({
        slug,
        language,
        description: `${pageName} (${language})`,
      })
    }
  }

  return configs
}

/**
 * Create Apollo Client
 */
function createApolloClient() {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true"
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (useMock) {
    console.error("❌ Cannot generate page files in mock mode")
    console.error("   Set NEXT_PUBLIC_USE_MOCK=false in your .env file")
    process.exit(1)
  }

  if (!graphqlUrl) {
    console.error("❌ NEXT_PUBLIC_GRAPHQL_URL is not set")
    console.error("   Please set it in your .env file")
    console.error(
      "   Example: NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql",
    )
    process.exit(1)
  }

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlUrl,
      fetch,
    }),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
    },
  })
}

/**
 * Fetch page content from GraphQL
 */
async function fetchPageContent(
  client: ReturnType<typeof createApolloClient>,
  slug: string,
  language: string,
): Promise<{ title?: string; content?: string } | null> {
  try {
    const { data, error } = await client.query<{
      pageContents?: Array<{
        id: string
        slug: string
        title?: string
        description?: string
        language?: {
          id: string
          label: string
          value: string
        }
      }>
    }>({
      query: GET_PAGE_CONTENT,
      variables: {
        slug,
        languageValue: language,
      },
    })

    if (error) {
      console.error(`   ✗ GraphQL error:`, error.message)
      return null
    }

    const pageContent = data?.pageContents?.[0]

    if (!pageContent?.description) {
      console.error(`   ✗ No content found`)
      return null
    }

    return {
      title: pageContent.title,
      content: pageContent.description,
    }
  } catch (error) {
    console.error(`   ✗ Error:`, error instanceof Error ? error.message : error)
    return null
  }
}

/**
 * Save markdown file
 */
function saveMarkdownFile(
  content: string,
  slug: string,
  language: string,
  outputDir: string,
): string {
  // Create language-specific directory
  const languageDir = join(outputDir, language)
  if (!existsSync(languageDir)) {
    mkdirSync(languageDir, { recursive: true })
  }

  // Generate filename
  const filename = `${slug}.md`
  const filepath = join(languageDir, filename)

  // Write file
  writeFileSync(filepath, content, "utf-8")

  return filepath
}

/**
 * Process a single page
 */
async function processPage(
  client: ReturnType<typeof createApolloClient>,
  page: PageConfig,
  config: Config,
): Promise<boolean> {
  console.log(`\n🔄 Processing: ${page.description}`)
  console.log(`   Slug: ${page.slug}`)
  console.log(`   Language: ${page.language}`)

  // Fetch content from GraphQL
  const result = await fetchPageContent(client, page.slug, page.language)

  if (!result || !result.content) {
    console.log(`   ⏭️  Skipped (no content available)`)
    return false
  }

  // Save to file
  try {
    const filepath = saveMarkdownFile(
      result.content,
      page.slug,
      page.language,
      config.outputDir,
    )

    console.log(`   ✓ Saved: ${filepath}`)
    console.log(`   ✓ Title: ${result.title || "N/A"}`)
    console.log(`   ✓ Size: ${result.content.length} characters`)

    return true
  } catch (error) {
    console.error(
      `   ✗ Failed to save:`,
      error instanceof Error ? error.message : error,
    )
    return false
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting page content file generation...\n")

  // Parse arguments and merge with defaults
  const args = parseArgs()
  const config: Config = { ...DEFAULT_CONFIG, ...args }

  console.log("⚙️  Configuration:")
  console.log(`   Output: ${config.outputDir}`)
  console.log(`   Pages: ${config.pages.join(", ")}`)

  // Create output directory
  if (!existsSync(config.outputDir)) {
    mkdirSync(config.outputDir, { recursive: true })
    console.log(`\n📁 Created output directory: ${config.outputDir}`)
  }

  // Generate page configurations
  const pageConfigs = generatePageConfigs(config.pages)
  console.log(
    `\n📄 Will process ${pageConfigs.length} page(s) across all languages\n`,
  )

  // Create Apollo Client
  const client = createApolloClient()
  console.log(
    `📡 Connected to GraphQL API: ${process.env.NEXT_PUBLIC_GRAPHQL_URL}\n`,
  )

  // Process each page
  let successCount = 0
  let failCount = 0

  for (const page of pageConfigs) {
    const success = await processPage(client, page, config)
    if (success) {
      successCount++
    } else {
      failCount++
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60))
  console.log("📊 Summary:")
  console.log(`   ✅ Successfully generated: ${successCount} file(s)`)
  console.log(`   ❌ Failed or skipped: ${failCount} file(s)`)
  console.log(`   📁 Output directory: ${config.outputDir}`)
  console.log("=".repeat(60))

  if (successCount === 0) {
    console.log("\n⚠️  No files were generated. Check the logs above.")
    console.log("   Make sure:")
    console.log("   - GraphQL API is running")
    console.log("   - Content exists with the correct slugs")
    console.log("   - NEXT_PUBLIC_USE_MOCK=false in .env")
    process.exit(1)
  } else if (failCount > 0) {
    console.log("\n⚠️  Some files were not generated. Check the logs above.")
  } else {
    console.log("\n✨ All page content files generated successfully!")
    console.log(`\n💡 View your files in: ${config.outputDir}`)
    console.log("   Organized by language for easy access.")
  }
}

// Run the script
main().catch((error) => {
  console.error("\n💥 Fatal error:", error)
  process.exit(1)
})
