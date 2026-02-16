#!/usr/bin/env node

/**
 * @fileoverview Generate Resume Files (HTML) from JSON Resume using resumed
 *
 * This script reads exported JSON Resume files and generates HTML
 * versions using the resumed library and JSON Resume themes.
 *
 * Usage:
 *   npm run generate:resume-files
 *   or
 *   node scripts/generateResumeFiles.ts
 *   or with options:
 *   node scripts/generateResumeFiles.ts --theme=consultant-polished
 */

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "fs"
import { join, basename, extname } from "path"

// Dynamic import for resumed (ESM module)
let resumed: any

// Configuration
interface Config {
  inputDir: string
  outputDir: string
  theme: string
}

const DEFAULT_CONFIG: Config = {
  inputDir: join(process.cwd(), "output", "resumes"),
  outputDir: join(process.cwd(), "output", "resume-files"),
  theme: "jsonresume-theme-elegant",
}

/**
 * Parse command line arguments
 */
function parseArgs(): Partial<Config> {
  const args = process.argv.slice(2)
  const config: Partial<Config> = {}

  for (const arg of args) {
    if (arg.startsWith("--theme=")) {
      const theme = arg.replace("--theme=", "")
      // Auto-prefix with jsonresume-theme- if not already prefixed
      if (
        !theme.startsWith("jsonresume-theme-") &&
        !theme.startsWith("@jsonresume/")
      ) {
        config.theme = `jsonresume-theme-${theme}`
      } else {
        config.theme = theme
      }
    } else if (arg.startsWith("--input=")) {
      config.inputDir = arg.replace("--input=", "")
    } else if (arg.startsWith("--output=")) {
      config.outputDir = arg.replace("--output=", "")
    }
  }

  return config
}

/**
 * Get all JSON resume files from input directory
 */
function getResumeFiles(inputDir: string): string[] {
  if (!existsSync(inputDir)) {
    console.error(`❌ Input directory does not exist: ${inputDir}`)
    console.error(
      '   Please run "npm run export:resumes" first to generate JSON files.',
    )
    process.exit(1)
  }

  const files = readdirSync(inputDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => join(inputDir, file))

  return files
}

/**
 * Extract metadata from filename
 * Format: {name}_{language}_resume.json
 */
function parseFilename(filepath: string): {
  name: string
  language: string
  basename: string
} {
  const filename = basename(filepath, extname(filepath))
  const parts = filename.split("_")

  // Remove 'resume' from the end if present
  if (parts[parts.length - 1] === "resume") {
    parts.pop()
  }

  let language = "unknown"
  let name = parts.join("_")

  // Try to extract language code (usually last part before 'resume')
  if (parts.length >= 2) {
    const possibleLang = parts[parts.length - 1]
    // Check if it's a language code (2-5 characters, can include hyphen)
    if (possibleLang.length <= 5 && /^[a-z-]+$/i.test(possibleLang)) {
      language = possibleLang
      name = parts.slice(0, -1).join("_")
    }
  }

  return {
    name,
    language,
    basename: filename,
  }
}

/**
 * Check if theme is installed
 */
async function checkTheme(theme: string): Promise<boolean> {
  try {
    await import(theme)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Remove profile pictures from HTML
 */
function removeProfilePictures(html: string): string {
  // Add CSS to hide profile pictures
  const hideProfilePicCSS = `
.profile-pic {
  display: none !important;
}
@media (max-width: 992px) {
  .profile-pic {
    display: none !important;
  }
}
@media print {
  .profile-pic {
    display: none !important;
  }
}
</style>`

  // Replace the closing </style> tag with our custom CSS
  html = html.replace('</style>', hideProfilePicCSS)

  return html
}

/**
 * Fix relative URLs to use CDN (unpkg.com)
 */
function fixRelativeUrls(html: string): string {
  // Fix font URLs for icomoon fonts
  html = html.replace(/url\('fonts\//g, "url('https://unpkg.com/jsonresume-theme-elegant@1.12.0/assets/icomoon/fonts/")

  // Fix protocol-relative URLs (//unpkg.com) to use https
  html = html.replace(/url\("\/\/unpkg\.com/g, 'url("https://unpkg.com')

  // Fix any other relative asset URLs that might be present
  html = html.replace(/src="fonts\//g, 'src="https://unpkg.com/jsonresume-theme-elegant@1.12.0/assets/icomoon/fonts/')
  html = html.replace(/href="fonts\//g, 'href="https://unpkg.com/jsonresume-theme-elegant@1.12.0/assets/icomoon/fonts/')

  return html
}

/**
 * Generate HTML from JSON Resume using resumed
 */
async function generateHTML(
  resumeData: any,
  themeName: string,
  outputPath: string,
): Promise<boolean> {
  try {
    // Import the theme dynamically
    const theme = await import(themeName)
    let html = await resumed.render(resumeData, theme)

    // Post-process: Fix relative URLs and remove profile pictures
    html = fixRelativeUrls(html)
    html = removeProfilePictures(html)

    writeFileSync(outputPath, html, "utf-8")
    console.log(`   ✓ HTML: ${outputPath}`)
    return true
  } catch (error) {
    console.error(
      `   ✗ HTML generation failed: ${error instanceof Error ? error.message : error}`,
    )
    return false
  }
}

/**
 * Process a single resume file
 */
async function processResume(
  filepath: string,
  config: Config,
): Promise<boolean> {
  const { name, language, basename: fileBasename } = parseFilename(filepath)

  console.log(`\n🔄 Processing: ${fileBasename}`)
  console.log(`   Name: ${name}`)
  console.log(`   Language: ${language}`)

  // Read JSON resume
  let resumeData: any
  try {
    const content = readFileSync(filepath, "utf-8")
    resumeData = JSON.parse(content)
  } catch (error) {
    console.error(
      `   ✗ Failed to read JSON: ${error instanceof Error ? error.message : error}`,
    )
    return false
  }

  // Create language-specific output directory
  const languageDir = join(config.outputDir, language)
  if (!existsSync(languageDir)) {
    mkdirSync(languageDir, { recursive: true })
  }

  // Generate HTML
  const outputPath = join(languageDir, `${name}.html`)
  return await generateHTML(resumeData, config.theme, outputPath)
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting resume file generation...\n")

  // Dynamically import resumed (ESM module)
  try {
    resumed = await import("resumed")
    console.log("✓ Loaded resumed library\n")
  } catch (error) {
    console.error("❌ Failed to load resumed library")
    console.error("   Make sure it is installed: npm install resumed")
    console.error(`   Error: ${error instanceof Error ? error.message : error}`)
    process.exit(1)
  }

  // Parse arguments and merge with defaults
  const args = parseArgs()
  const config: Config = { ...DEFAULT_CONFIG, ...args }

  console.log("⚙️  Configuration:")
  console.log(`   Input: ${config.inputDir}`)
  console.log(`   Output: ${config.outputDir}`)
  console.log(`   Theme: ${config.theme}`)

  // Verify theme is installed
  const themeInstalled = await checkTheme(config.theme)
  if (!themeInstalled) {
    console.error(`\n❌ Theme not found: ${config.theme}`)
    console.error(`   Install it with: npm install ${config.theme}`)
    console.error("\n📦 Popular themes:")
    console.error("   - jsonresume-theme-elegant (professional)")
    console.error("   - jsonresume-theme-even (clean and modern)")
    console.error("   - jsonresume-theme-stackoverflow (tech-focused)")
    console.error("   - jsonresume-theme-kendall (minimalist)")
    console.error("   - jsonresume-theme-short (compact)")
    process.exit(1)
  }
  console.log(`   ✓ Theme installed: ${config.theme}\n`)

  // Get all resume files
  const files = getResumeFiles(config.inputDir)

  if (files.length === 0) {
    console.log("⚠️  No resume files found.")
    console.log('   Run "npm run export:resumes" first to generate JSON files.')
    process.exit(0)
  }

  console.log(`📄 Found ${files.length} resume file(s)\n`)

  // Create output directory
  if (!existsSync(config.outputDir)) {
    mkdirSync(config.outputDir, { recursive: true })
    console.log(`📁 Created output directory: ${config.outputDir}\n`)
  }

  // Process each resume
  let successCount = 0
  let errorCount = 0

  for (const file of files) {
    const success = await processResume(file, config)
    if (success) {
      successCount++
    } else {
      errorCount++
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60))
  console.log("📊 Summary:")
  console.log(`   ✅ Successfully generated: ${successCount} resume(s)`)
  console.log(`   ❌ Failed: ${errorCount} resume(s)`)
  console.log(`   📁 Output directory: ${config.outputDir}`)
  console.log("=".repeat(60))

  if (errorCount === 0) {
    console.log("\n✨ All resumes generated successfully!")
    console.log(`\n💡 View your resumes in: ${config.outputDir}`)
    console.log("   Organized by language for easy access.")
    console.log("\n📝 To convert to PDF:")
    console.log(
      "   - Open HTML files in your browser and use Print → Save as PDF",
    )
    console.log("   - Or use: wkhtmltopdf resume.html resume.pdf")
  } else {
    console.log("\n⚠️  Some resumes failed to generate. Check the logs above.")
    process.exit(1)
  }
}

// Run the script
main().catch((error) => {
  console.error("\n💥 Fatal error:", error)
  process.exit(1)
})
