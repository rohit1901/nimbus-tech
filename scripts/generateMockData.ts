#!/usr/bin/env tsx

/**
 * @fileoverview Generate Mock Data from GraphQL API
 *
 * This script fetches page content and language data from the GraphQL API
 * and generates a TypeScript file with mock data for development and fallback.
 *
 * Usage:
 *   npm run generate:mock-data
 *   or
 *   tsx scripts/generateMockData.ts
 */

import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"
import { config } from "dotenv"

// Load environment variables
config()

interface Config {
  graphqlUrl: string
  outputDir: string
  outputFile: string
}

const DEFAULT_CONFIG: Config = {
  graphqlUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/api/graphql",
  outputDir: join(process.cwd(), "output", "mock-data"),
  outputFile: "mockPageContent.ts",
}

/**
 * GraphQL query to fetch all page contents
 * This matches the exact query used in src/queries/index.ts
 */
const PAGE_CONTENTS_QUERY = `
  query PageContents {
    pageContents {
      id
      slug
      title
      description
      image {
        id
        src
        alt
        width
        height
        fill
        type {
          id
          label
        }
      }
      cta {
        id
        label
        href
        external
        type {
          id
          label
        }
        language {
          id
          label
          value
        }
      }
      sections {
        id
        type
        contentHero {
          id
          title
          description
          subHeading
          banner {
            id
            label
            href
            external
            icon
            additional {
              id
              icon
              text
              language {
                id
                label
                value
              }
            }
            language {
              id
              label
              value
            }
          }
          cta {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          language {
            id
            label
            value
          }
        }
        contentHeroCount
        contentBenefits {
          id
          title
          benefits {
            id
            icon
            title
            description
            language {
              id
              label
              value
            }
          }
          benefitsCount
          language {
            id
            label
            value
          }
        }
        contentBenefitsCount
        contentFeatures {
          id
          featureId
          title
          description
          longDescription
          visualization
          language {
            id
            label
            value
          }
        }
        contentFeaturesCount
        contentFaqSection {
          id
          title
          description
          faqs {
            id
            question
            answer
            language {
              id
              label
              value
            }
          }
          faqsCount
          language {
            id
            label
            value
          }
        }
        contentFaqSectionCount
        contentTestimonials {
          id
          title
          background {
            id
            src
            alt
            width
            height
            fill
            type {
              id
              label
            }
          }
          backgroundCount
          testimonials {
            id
            rating
            badge {
              id
              icon
              label
              language {
                id
                label
                value
              }
            }
            name
            role
            company
            image {
              id
              src
              alt
              width
              height
              fill
              type {
                id
                label
              }
            }
            content
            language {
              id
              label
              value
            }
          }
          testimonialsCount
          fallback {
            id
            rating
            badge {
              id
              icon
              label
              language {
                id
                label
                value
              }
            }
            name
            role
            company
            image {
              id
              src
              alt
              width
              height
              fill
              type {
                id
                label
              }
            }
            content
            language {
              id
              label
              value
            }
          }
          language {
            id
            label
            value
          }
        }
        contentTestimonialsCount
        contentCertifications {
          id
          title
          description
          cta {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          certifications {
            id
            title
            description
            image {
              id
              src
              alt
              width
              height
              fill
            }
            link
            language {
              id
              label
              value
            }
          }
          certificationsCount
          language {
            id
            label
            value
          }
        }
        contentCertificationsCount
        contentApproach {
          id
          title
          description
          steps {
            id
            stepId
            type
            title
            description
            activityTime
            language {
              id
              label
              value
            }
          }
          stepsCount
          language {
            id
            label
            value
          }
        }
        contentApproachCount
        contentAbout {
          id
          heading
          intro
          valuesTitle
          values {
            id
            label
            description
            icon
            language {
              id
              label
              value
            }
          }
          valuesCount
          closing
          language {
            id
            label
            value
          }
        }
        contentAboutCount
        contentAnalytics {
          id
          heading
          subheading
          stats {
            id
            totalDeployments
            deploymentChange
            deploymentChangePercent
            changePeriod
            language {
              id
              label
              value
            }
          }
          tableHeadings
          summary {
            id
            name
            deployments
            uptime
            clientSatisfaction
            efficiency
            revenueGrowth
            bgColor
            changeType
            language {
              id
              label
              value
            }
          }
          summaryCount
          language {
            id
            label
            value
          }
        }
        contentAnalyticsCount
        contentNavigation {
          id
          title
          description
          image {
            id
            src
            alt
            width
            height
            fill
            type {
              id
              label
            }
          }
          cta {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          items {
            id
            label
            href
            external
            icon
            language {
              id
              label
              value
            }
            type {
              id
              label
            }
            sectionKey {
              id
              label
            }
          }
          itemsCount
          language {
            id
            label
            value
          }
        }
        contentNavigationCount
        contentFooter {
          id
          title
          sections {
            id
            title {
              id
              label
            }
            items {
              id
              label
              href
              external
              icon
              type {
                id
                label
              }
              sectionKey {
                id
                label
              }
              language {
                id
                label
                value
              }
            }
            itemsCount
            language {
              id
              label
              value
            }
          }
          sectionsCount
          language {
            id
            label
            value
          }
        }
        contentFooterCount
        contentCta {
          id
          title
          description
          ctas {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          ctasCount
          background {
            id
            src
            alt
            width
            height
            fill
            type {
              id
              label
            }
          }
          backgroundCount
          language {
            id
            label
            value
          }
        }
        contentCtaCount
        contentMap {
          id
          title
          subheading
          description
          language {
            id
            label
            value
          }
        }
        contentMapCount
      }
      language {
        id
        label
        value
      }
    }
  }
`

/**
 * GraphQL query to fetch all languages
 */
const LANGUAGES_QUERY = `
  query Languages {
    languages {
      id
      label
      value
    }
  }
`

/**
 * Fetch data from GraphQL API
 */
async function fetchGraphQL(query: string): Promise<any> {
  const response = await fetch(DEFAULT_CONFIG.graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`)
  }

  const result = await response.json()

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`)
  }

  return result.data
}

/**
 * Format data as TypeScript code
 */
function formatAsTypeScript(pageContents: any, languages: any): string {
  const header = `/**
 * @fileoverview Mock Page Content and Languages
 *
 * This file is AUTO-GENERATED by scripts/generateMockData.ts
 * DO NOT EDIT MANUALLY - Your changes will be overwritten
 *
 * Generated: ${new Date().toISOString()}
 * Source: GraphQL API (${DEFAULT_CONFIG.graphqlUrl})
 *
 * To regenerate: npm run generate:mock-data
 */

`

  const mockPageContent = `export const MockPageContent = ${JSON.stringify({ data: { pageContents } }, null, 2)}\n`

  const mockLanguages = `export const MockLanguages = ${JSON.stringify({ data: { languages } }, null, 2)}\n`

  return header + mockPageContent + "\n" + mockLanguages
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting mock data generation...\n")

  // Check GraphQL URL
  if (!DEFAULT_CONFIG.graphqlUrl) {
    console.error("❌ GraphQL URL not configured")
    console.error(
      "   Set NEXT_PUBLIC_GRAPHQL_URL in .env or ensure the server is running",
    )
    process.exit(1)
  }

  console.log("⚙️  Configuration:")
  console.log(`   GraphQL URL: ${DEFAULT_CONFIG.graphqlUrl}`)
  console.log(`   Output: ${DEFAULT_CONFIG.outputDir}`)
  console.log(`   File: ${DEFAULT_CONFIG.outputFile}\n`)

  try {
    // Fetch page contents
    console.log("📡 Fetching page contents from GraphQL API...")
    const pageData = await fetchGraphQL(PAGE_CONTENTS_QUERY)
    console.log(
      `   ✓ Fetched ${pageData.pageContents?.length || 0} page(s)\n`,
    )

    // Fetch languages
    console.log("📡 Fetching languages from GraphQL API...")
    const languageData = await fetchGraphQL(LANGUAGES_QUERY)
    console.log(`   ✓ Fetched ${languageData.languages?.length || 0} language(s)\n`)

    // Create output directory if it doesn't exist
    if (!existsSync(DEFAULT_CONFIG.outputDir)) {
      mkdirSync(DEFAULT_CONFIG.outputDir, { recursive: true })
      console.log(`📁 Created output directory: ${DEFAULT_CONFIG.outputDir}\n`)
    }

    // Format as TypeScript
    console.log("🔄 Generating TypeScript file...")
    const tsContent = formatAsTypeScript(
      pageData.pageContents,
      languageData.languages,
    )

    // Write to file
    const outputPath = join(DEFAULT_CONFIG.outputDir, DEFAULT_CONFIG.outputFile)
    writeFileSync(outputPath, tsContent, "utf-8")
    console.log(`   ✓ Saved to: ${outputPath}`)

    // Calculate stats
    const fileSize = Buffer.byteLength(tsContent, "utf-8")
    const fileSizeKB = (fileSize / 1024).toFixed(2)

    console.log("\n" + "=".repeat(60))
    console.log("📊 Summary:")
    console.log(`   ✅ Pages: ${pageData.pageContents?.length || 0}`)
    console.log(`   ✅ Languages: ${languageData.languages?.length || 0}`)
    console.log(`   ✅ File size: ${fileSizeKB} KB`)
    console.log(`   📁 Output: ${outputPath}`)
    console.log("=".repeat(60))

    console.log("\n✨ Mock data generated successfully!")
    console.log(
      "\n💡 This file is now available for import in your application.",
    )
    console.log(
      "   Import from: output/mock-data/mockPageContent",
    )
  } catch (error) {
    console.error("\n❌ Failed to generate mock data")
    if (error instanceof Error) {
      console.error(`   Error: ${error.message}`)
    } else {
      console.error(`   Error: ${error}`)
    }
    console.error("\n💡 Troubleshooting:")
    console.error("   - Ensure GraphQL API is running (npm run dev)")
    console.error(
      "   - Check NEXT_PUBLIC_GRAPHQL_URL in .env points to the correct endpoint",
    )
    console.error(
      "   - Verify the GraphQL schema matches the queries in this script",
    )
    process.exit(1)
  }
}

// Run the script
main().catch((error) => {
  console.error("\n💥 Fatal error:", error)
  process.exit(1)
})
