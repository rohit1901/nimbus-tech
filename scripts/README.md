# Scripts

This directory contains utility scripts for the Nimbus Tech project.

---

## 📜 Available Scripts

1. [Development Setup](#development-setup) - Comprehensive development setup (runs all generation scripts)
2. [Remixicon Map Generator](#remixicon-map-generator) - Generate icon map from @remixicon/react
3. [Generate Page Files](#generate-page-files) - Generate markdown page content files from GraphQL (creates fallback files)
4. [Generate Mock Data](#generate-mock-data) - Generate mock page content TypeScript file from GraphQL API for development fallback
5. [Export Resumes](#export-resumes) - Export resumes from GraphQL to JSON Resume format
6. [Generate Resume Files](#generate-resume-files) - Render HTML resumes from JSON Resume files
7. [Fallback File Generator](#fallback-file-generator) - ~~DEPRECATED~~ Use Generate Page Files instead

---

## Development Setup

Comprehensive development setup script that runs all necessary file generation steps for local development.

### File

`scripts/setupDev.ts`

### Purpose

Automates the complete development environment setup by running all generation scripts in the correct order. Handles failures gracefully and continues even if some steps fail (e.g., when GraphQL API is not available).

### Quick Start

**After installing dependencies, run this manually:**

```bash
npm run setup:dev
```

Or directly:

```bash
npx tsx scripts/setupDev.ts
```

**Note:** This does NOT run automatically after `npm install`. You must run it explicitly for first-time setup and when you need to regenerate files.

### What It Does

The script runs the following steps in order:

1. **Environment Setup** - Copies `.env.copy` to `.env.dev`
2. **GraphQL Types** - Generates TypeScript types from GraphQL schema
3. **Icon Map** - Generates icon map from @remixicon/react
4. **Page Content Files** - Generates fallback markdown files (requires GraphQL)
5. **Resume Export** - Exports resumes to JSON Resume format (requires GraphQL)
6. **Resume Files** - Generates HTML resume files

### Features

- ✅ **Graceful Failure Handling** - Continues even if some steps fail
- ✅ **GraphQL Detection** - Checks if GraphQL API is available
- ✅ **Smart Skipping** - Skips steps that require GraphQL if API is not accessible
- ✅ **Comprehensive Summary** - Shows what succeeded, failed, or was skipped
- ✅ **Idempotent** - Safe to run multiple times

### Example Output

```
🚀 Starting development setup...

🔍 Checking GraphQL API availability...
   ✓ GraphQL API is accessible

📦 Environment Setup
   Copy environment template
   ✓ Created .env from .env.copy
   ✅ Complete

📦 GraphQL Types
   Generate GraphQL types
   ✅ Complete

📦 Icon Map
   Generate icon map from @remixicon/react
   ✅ Complete

📦 Page Content Files
   Generate page content fallback files
   ✅ Complete

📦 Resume Export
   Export resumes to JSON Resume format
   ✅ Complete

📦 Resume Files
   Generate HTML resume files
   ✅ Complete

============================================================
📊 Setup Summary:
   ✅ Completed: 6
   ⏭️  Skipped: 0
   ⚠️  Failed: 0
============================================================

✨ All setup steps completed successfully!

💡 You can now run: npm run dev
```

### When to Use

Run this script:
- **After `npm install`** (first-time setup - run manually)
- When setting up a new development environment
- After pulling changes that affect generated files
- When GraphQL schema changes
- To regenerate all files after API updates

**Important:** This script does NOT run automatically. You must execute it manually.

### Without GraphQL API

If the GraphQL API is not available, the script will skip GraphQL-dependent steps:

```
🔍 Checking GraphQL API availability...
   ⚠️  GraphQL API not accessible
   ℹ️  Steps requiring GraphQL will be skipped

📦 GraphQL Types
   Generate GraphQL types
   ⏭️  Skipped (requires GraphQL API)

📦 Page Content Files
   Generate page content fallback files
   ⏭️  Skipped (requires GraphQL API)

📦 Resume Export
   Export resumes to JSON Resume format
   ⏭️  Skipped (requires GraphQL API)

============================================================
📊 Setup Summary:
   ✅ Completed: 3
   ⏭️  Skipped: 3
   ⚠️  Failed: 0
============================================================

⚠️  Some steps were skipped (GraphQL API not available)

💡 To generate all files:
   1. Ensure GraphQL API is running
   2. Set NEXT_PUBLIC_GRAPHQL_URL in .env
   3. Run: npm run setup:dev
```

### Manual Steps

You can also run individual steps manually:

```bash
# Environment
cp .env.copy .env

# GraphQL types
npm run graphql:generate

# Icons
npm run icons:generate

# Page content
npm run generate:page-files

# Resumes
npm run export:resumes
npm run generate:resume-files
```

### Troubleshooting

**Script fails immediately**
- Ensure you're in the project root directory
- Run `npm install` to ensure dependencies are installed

**GraphQL steps always skipped**
- Check `NEXT_PUBLIC_GRAPHQL_URL` is set in `.env`
- Ensure GraphQL API is running and accessible
- Verify `NEXT_PUBLIC_USE_MOCK=false` in `.env`

**Some steps fail but others succeed**
- This is normal and expected
- Script continues with remaining steps
- Review output to see what failed and why

### Related Documentation

- Main README: `README.md` - Quick Start section
- Individual Scripts: Sections below in this document

---

## Remixicon Map Generator

Generates a TypeScript map of all Remixicon components from `@remixicon/react` for dynamic icon rendering.

### File

`scripts/generateIcons.ts`

### Setup

```bash
npm install @remixicon/react
npm install -D tsx typescript
```

### Generate Icon Map

```bash
npm run icons:generate
```

Or directly with tsx:

```bash
npx tsx scripts/generateIcons.ts
```

### What It Does

1. Parses `@remixicon/react` TypeScript definitions
2. Extracts all icon component names
3. Generates a typed map at `src/icons/remixicon-map.ts`
4. Includes ~2,500 Remixicon components

### Output

**File:** `src/icons/remixicon-map.ts`

```typescript
export const remixIconMap: Record<string, RemixiconComponentType> = {
  "Ri24HoursFill": RiIcons.Ri24HoursFill,
  "Ri24HoursLine": RiIcons.Ri24HoursLine,
  // ... ~2,500 more icons
};
```

### Usage

```typescript
import { remixIconMap, RemixiconComponentType } from '@/icons/remixicon-map';

// Dynamic icon lookup
const iconName = "Ri24HoursFill";
const Icon = remixIconMap[iconName]; // Fully typed!

// Render dynamically
<Icon size={24} />

// Type-safe in components
type HeroType = {
  banner: {
    icon?: RemixiconComponentType;
  }
};
```

### Workflow

- **First run**: `npm run icons:generate`
- **@remixicon/react updates**: Re-run `npm run icons:generate`
- **Auto-generate**: Runs on `npm install` via `postinstall` hook

### Tree-Shaking

✅ Uses named imports - fully tree-shakable  
✅ Only used icons are bundled (~1KB per icon)  
✅ No runtime overhead for unused icons

### Troubleshooting

**Error: @remixicon/react not found**
```
❌ @remixicon/react not found. Run: npm install @remixicon/react
```
**Solution:** Install the dependency: `npm install @remixicon/react`

**Error: No icons found**
```
❌ No RemixiconComponentType declarations found in index.d.ts
```
**Solution:** Verify @remixicon/react is properly installed and has TypeScript definitions

---

## Fallback File Generator (DEPRECATED)

**⚠️ This script is deprecated. Use [Generate Page Files](#generate-page-files) instead.**

The new `generate:page-files` script generates files in `output/page-content/` which are automatically used as fallbacks by the application.

### File

`scripts/generateFallbackFiles.ts`

### Purpose

**DEPRECATED:** This script creates fallback files in `src/data/legal/`. 

**Use `npm run generate:page-files` instead**, which generates files in `output/page-content/` that are automatically used as fallbacks.

### Prerequisites

1. GraphQL API must be running and accessible
2. Environment variable `NEXT_PUBLIC_GRAPHQL_URL` must be set
3. `NEXT_PUBLIC_USE_MOCK` must be `false`
4. Content must exist in GraphQL with correct slugs:
   - `privacy-policy` (en-US)
   - `privacy-policy-de` (de-DE)
   - `impressum` (en-US)
   - `impressum-de` (de-DE)

### Generate Fallback Files

```bash
npm run generate-fallbacks
```

Or directly with tsx:

```bash
npx tsx scripts/generateFallbackFiles.ts
```

### What It Does

1. Connects to GraphQL API using environment configuration
2. Fetches `description` field (markdown content) for each legal page
3. Saves content to `src/data/legal/*.md` files
4. Reports success/failure for each file
5. Provides summary statistics

### Output Files

- `src/data/legal/datenschutz-en.md` - Privacy Policy (English)
- `src/data/legal/datenschutz-de.md` - Datenschutzerklärung (German)
- `src/data/legal/terms-en.md` - Terms of Service (English)
- `src/data/legal/agb-de.md` - AGB (German)

### Example Output

```
🚀 Starting fallback file generation...

🔗 Using GraphQL URL: http://localhost:3000/api/graphql

📄 Processing: Privacy Policy (English)
   Slug: privacy-policy
   Language: en-US
   Output: src/data/legal/datenschutz-en.md
📡 Fetching content for "privacy-policy" (en-US)...
✅ Successfully fetched content for "privacy-policy" (1234 characters)
💾 Saved to: src/data/legal/datenschutz-en.md

============================================================
📊 Summary:
   ✅ Successfully generated: 4 file(s)
   ❌ Failed or skipped: 0 file(s)
   📁 Total processed: 4 page(s)
============================================================

🎉 All fallback files generated successfully!
```

### When to Regenerate

- Legal content is updated in GraphQL
- New legal pages are added
- Compliance requirements change
- Before production deployments
- After content migrations

### Troubleshooting

**Error: Cannot generate in mock mode**
```
❌ Cannot generate fallback files in mock mode
   Set NEXT_PUBLIC_USE_MOCK=false in your .env file
```
**Solution:** Update `.env` file to use real GraphQL API

**Error: GraphQL URL not set**
```
❌ NEXT_PUBLIC_GRAPHQL_URL is not set
```
**Solution:** Add `NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql` to `.env`

**Warning: No content found**
```
⚠️  No content found for "privacy-policy" (en-US)
```
**Solution:** Ensure content exists in GraphQL with the correct slug and language

**Script fails:**
- Check `NEXT_PUBLIC_GRAPHQL_URL` in `.env`
- Verify GraphQL API is running
- Ensure content exists with correct slugs
- Check network connectivity

### Related Documentation

- `src/lib/legal/README.md` - Page content API documentation
- `src/lib/legal/examples/` - Usage examples
- **Note:** The old `src/data/` directory has been removed

---

## Generate Page Files

Generates page content files (markdown) from GraphQL and saves them to the output directory, organized by language. **This is the recommended approach for generating fallback files and managing page content exports.**

The generated files are automatically used as fallbacks by the application when GraphQL is unavailable.

### File

`scripts/generatePageFiles.ts`

### Purpose

Fetches page content from GraphQL API and generates markdown files in the `output` directory, organized by language. This follows the same pattern as resume file generation and is ideal for:
- **Creating fallback files** for when GraphQL is unavailable (primary use case)
- Creating static copies of dynamic content
- Generating deployment-ready content files
- Backing up page content from GraphQL
- Supporting offline development workflows

### Prerequisites

1. GraphQL API must be running and accessible
2. Environment variable `NEXT_PUBLIC_GRAPHQL_URL` must be set
3. `NEXT_PUBLIC_USE_MOCK` must be `false`
4. Content must exist in GraphQL with appropriate slugs

### Quick Start

```bash
# Generate default pages (privacy-policy, impressum)
npm run generate:page-files

# Generate specific pages
node scripts/generatePageFiles.ts --pages=privacy-policy,impressum,about-us

# Custom output directory
node scripts/generatePageFiles.ts --output=custom/path
```

### What It Does

1. Connects to GraphQL API using environment configuration
2. Generates page configurations for all specified pages in all languages
3. Fetches content for each page/language combination
4. Saves markdown files organized by language
5. Provides detailed progress and summary statistics

### Command Line Options

```bash
--pages=page1,page2    # Comma-separated list of page slugs
--output=path          # Custom output directory
```

### Output Structure

```
output/
└── page-content/
    ├── en-US/
    │   ├── privacy-policy.md
    │   ├── impressum.md
    │   └── about-us.md
    └── de-DE/
        ├── privacy-policy-de.md
        ├── impressum-de.md
        └── about-us-de.md
```

### Features

- ✅ **Language Auto-Detection** - Automatically handles language-specific slugs
- ✅ **Organized Output** - Files organized in language directories
- ✅ **Progress Tracking** - Real-time feedback on each file
- ✅ **Error Handling** - Continues processing even if some pages fail
- ✅ **Flexible Configuration** - Command-line options for customization
- ✅ **Summary Statistics** - Detailed success/failure reporting

### Example Output

```
🚀 Starting page content file generation...

⚙️  Configuration:
   Output: output/page-content
   Pages: privacy-policy, impressum

📁 Created output directory: output/page-content

📄 Will process 4 page(s) across all languages

📡 Connected to GraphQL API: http://localhost:3000/api/graphql

🔄 Processing: privacy-policy (en-US)
   Slug: privacy-policy
   Language: en-US
   ✓ Saved: output/page-content/en-US/privacy-policy.md
   ✓ Title: Privacy Policy
   ✓ Size: 1234 characters

🔄 Processing: privacy-policy (de-DE)
   Slug: privacy-policy-de
   Language: de-DE
   ✓ Saved: output/page-content/de-DE/privacy-policy-de.md
   ✓ Title: Datenschutzerklärung
   ✓ Size: 1456 characters

============================================================
📊 Summary:
   ✅ Successfully generated: 4 file(s)
   ❌ Failed or skipped: 0 file(s)
   📁 Output directory: output/page-content
============================================================

✨ All page content files generated successfully!

💡 View your files in: output/page-content
   Organized by language for easy access.
```

### Using Generated Files

The generated markdown files can be used for:

1. **Runtime Fallbacks** - Automatically used when GraphQL is unavailable (primary use case)
2. **Static Site Generation** - Import into static site builders
3. **Content Backup** - Version control for page content
4. **Offline Development** - Work without GraphQL API
5. **Content Review** - Easy diff and review in Git
6. **Documentation** - Export for documentation systems

### Workflow

```bash
# 1. Ensure GraphQL API is running
# 2. Generate page content files
npm run generate:page-files

# 3. Files are ready in output/page-content/
# 4. Use in your application or commit to version control
```

### Comparison with generate-fallbacks

| Feature | generate:page-files | generate-fallbacks |
|---------|--------------------|--------------------|
| Output Location | `output/page-content/` | `src/data/legal/` |
| Organization | By language directories | Flat structure |
| Flexibility | Configurable pages | Hardcoded pages |
| Use Case | Runtime fallbacks & export | Legacy approach |
| Status | ✅ Active | ❌ Deprecated |

**The application now uses files from `output/page-content/` as fallbacks.** The old `generate-fallbacks` script and `src/data/legal/` location are deprecated.

### Troubleshooting

**Error: Cannot generate in mock mode**
```
❌ Cannot generate page files in mock mode
   Set NEXT_PUBLIC_USE_MOCK=false in your .env file
```
**Solution:** Update `.env` file to use real GraphQL API

**Error: GraphQL URL not set**
```
❌ NEXT_PUBLIC_GRAPHQL_URL is not set
```
**Solution:** Add `NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql` to `.env`

**No files generated**
```
⚠️  No files were generated
```
**Solution:** 
- Ensure GraphQL API is running
- Verify content exists with correct slugs
- Check that pages follow naming convention (append `-de` for German)

**Some files skipped**
```
⏭️  Skipped (no content available)
```
**Solution:** Content doesn't exist in GraphQL for that page/language combination

### Advanced Usage

#### Generate Specific Pages Only

```bash
# Only generate legal pages
node scripts/generatePageFiles.ts --pages=privacy-policy,terms,impressum

# Only generate about/marketing pages
node scripts/generatePageFiles.ts --pages=about-us,contact,faq
```

#### Custom Output for Different Environments

```bash
# Production export
node scripts/generatePageFiles.ts --output=dist/content

# Staging export
node scripts/generatePageFiles.ts --output=staging/content
```

#### Integrate with CI/CD

```yaml
# Example GitHub Actions workflow
- name: Generate Page Content
  run: npm run generate:page-files
  
- name: Commit Generated Files
  run: |
    git add output/page-content
    git commit -m "Update page content from GraphQL"
    git push
```

### Related Documentation

- `src/lib/legal/getLegalContent.ts` - Runtime content fetching with fallback support
- `scripts/exportResumes/` - Similar pattern for resume export
- `scripts/generateFallbackFiles.ts.deprecated` - Old legacy approach (deprecated)

---

## Generate Mock Data

**File:** `scripts/generateMockData.ts`

### Purpose

Fetches complete page content and language data from the GraphQL API and generates a TypeScript file with mock data. This file serves as a fallback when the GraphQL API is unavailable, ensuring the application can still render with realistic data during development.

### Prerequisites

- GraphQL API must be running and accessible
- `NEXT_PUBLIC_GRAPHQL_URL` must be set in `.env`

### Quick Start

```bash
npm run generate:mock-data
```

### What It Does

1. Connects to your GraphQL API
2. Fetches all page contents (home, about, etc.) with all sections
3. Fetches all supported languages
4. Generates a TypeScript file at `output/mock-data/mockPageContent.ts`
5. Includes auto-generated header with timestamp and source information

### Output

**Location:** `output/mock-data/mockPageContent.ts`

**Structure:**
```typescript
export const MockPageContent = {
  data: {
    pageContents: [
      // Array of complete page objects with all sections
    ]
  }
}

export const MockLanguages = {
  data: {
    languages: [
      { id: "1", label: "English", value: "en-US" },
      { id: "2", label: "German", value: "de-DE" }
    ]
  }
}
```

### Usage in Application

The generated mock data is automatically imported in `src/queries/index.ts`:

```typescript
import { MockLanguages, MockPageContent } from "../../output/mock-data/mockPageContent"

// Used as fallback when GraphQL API is unavailable
export function usePageContents() {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'
  
  if (useMock) {
    return {
      data: { pageContents: MockPageContent.data.pageContents },
      loading: false,
      error: undefined,
    }
  }
  // ... GraphQL query
}
```

### When to Regenerate

Run this script when:
- GraphQL API schema changes
- Page content is updated in the CMS
- New sections are added to pages
- Language data changes
- After major content updates

### Features

- **Auto-generated**: File header includes generation timestamp and source URL
- **Complete data**: Includes all page sections (hero, features, testimonials, etc.)
- **Type-safe**: Generated as TypeScript for full type checking
- **Development fallback**: Ensures site renders even when API is down
- **Part of setup**: Automatically runs as part of `npm run setup:dev`

### Example Output

```bash
🚀 Starting mock data generation...

⚙️  Configuration:
   GraphQL URL: http://localhost:3000/api/graphql
   Output: /path/to/output/mock-data
   File: mockPageContent.ts

📡 Fetching page contents from GraphQL API...
   ✓ Fetched 2 page(s)

📡 Fetching languages from GraphQL API...
   ✓ Fetched 2 language(s)

📁 Created output directory: /path/to/output/mock-data

🔄 Generating TypeScript file...
   ✓ Saved to: /path/to/output/mock-data/mockPageContent.ts

============================================================
📊 Summary:
   ✅ Pages: 2
   ✅ Languages: 2
   ✅ File size: 145.23 KB
   📁 Output: /path/to/output/mock-data/mockPageContent.ts
============================================================

✨ Mock data generated successfully!

💡 This file is now available for import in your application.
```

### Troubleshooting

**Problem:** "GraphQL URL not configured"
- **Solution:** Set `NEXT_PUBLIC_GRAPHQL_URL` in your `.env` file

**Problem:** "GraphQL request failed"
- **Solution:** Ensure the Next.js dev server is running (`npm run dev`)
- **Solution:** Check that the GraphQL endpoint is accessible

**Problem:** File is very large
- **Solution:** This is normal - the file contains complete mock data for all pages
- **Solution:** The file is only used as fallback and is tree-shaken in production builds

**Problem:** Import errors after regeneration
- **Solution:** Restart your dev server to pick up the new file
- **Solution:** Clear Next.js cache: `rm -rf .next`

### Related Documentation

- [Development Setup](#development-setup) - Runs this script automatically
- [Generate Page Files](#generate-page-files) - Generates markdown fallback files
- Main [README](../README.md) - Environment configuration

---

## Export Resumes

Fetches resume data from the GraphQL API, converts it to [JSON Resume](https://jsonresume.org/schema) format, and writes one file per resume.

### Files

```
scripts/exportResumes/
├── index.ts            # CLI + orchestration (entry point)
├── query.ts            # GraphQL query + native `fetch` client
├── convert.ts          # convertToJSONResume, normalizeDate, splitList
├── types.ts            # GraphQLResume + JSONResumeSchema
├── convert.test.ts     # Unit tests for the converter
└── index.test.ts       # Unit tests for filename helpers
```

The script uses the global `fetch` (Node ≥18) — no Apollo Client, no `cross-fetch`.

### Quick Start

```bash
# Export all resumes with defaults
npm run export:resumes

# Show all options
npm run export:resumes -- --help

# Run the tests
npm run test:export:resumes
```

### What It Does

1. Reads `NEXT_PUBLIC_GRAPHQL_URL` (or `--url`) and issues a single GraphQL POST.
2. Optionally filters resumes by `--id`, `--language`, or `--name`.
3. Converts each resume to JSON Resume format, normalising dates and splitting comma/newline-separated strings into arrays.
4. Writes files concurrently (bounded by `--concurrency`) to the output directory.
5. Prints a per-file summary and a final totals line (`written`, `failed`, `warnings`).

### Requirements

- Node 18+ (Node 20+ recommended)
- `NEXT_PUBLIC_GRAPHQL_URL` set in `.env` **or** `--url` on the command line
- `GRAPHQL_AUTH_TOKEN` in the environment if the endpoint requires auth (added as `Authorization: Bearer …`)

### CLI Options

| Flag                          | Description                                                                                       | Default                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------ |
| `--url <url>`                 | Override `NEXT_PUBLIC_GRAPHQL_URL`                                                                | env var                        |
| `--out <dir>`                 | Output directory                                                                                  | `output/resumes`               |
| `--id <id>`                   | Only export the given resume id (repeatable)                                                      | –                              |
| `--language <code>`           | Only export resumes whose `language.value` matches (repeatable, case-insensitive)                 | –                              |
| `--name <fragment>`           | Case-insensitive substring match on `basics.name`                                                 | –                              |
| `--format json\|yaml`         | Output format (YAML requires `npm i -D yaml`)                                                     | `json`                         |
| `--filename <template>`       | Filename template. Placeholders: `{name}`, `{lang}`, `{id}`, `{ext}`                              | `{name}_{lang}_resume.{ext}`   |
| `--pretty` / `--no-pretty`    | Pretty-print JSON output                                                                          | pretty                         |
| `--concurrency <n>`           | Max concurrent file writes                                                                        | `8`                            |
| `--list-separator <str>`      | Marker used to split CMS list fields (keywords, courses, highlights). Env: `RESUME_LIST_SEPARATOR` | `✌🏻`                             |
| `--dry-run`                   | Convert and validate, but don't write files                                                       | off                            |
| `--quiet` / `--verbose`       | Suppress progress / print per-record warnings                                                     | off / off                      |
| `-h`, `--help`                | Show help                                                                                         | –                              |

### Filename Template

The default template (`{name}_{lang}_resume.{ext}`) is compatible with the downstream `generate:resume-files` parser. If two resumes would collide, the loser gets a short `id` suffix (e.g. `ada_en-US_resume-clr12345.json`).

Slugification preserves Unicode letters: `Jörg Müller` → `jörg_müller`, `李明` → `李明`.

### Output

```
output/resumes/
├── rohit_khanduri_en-US_resume.json
├── rohit_khanduri_de-DE_resume.json
├── florian_zeidler_en-US_resume.json
└── florian_zeidler_de-DE_resume.json
```

### What Gets Exported

| Section        | Notes                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------- |
| `basics`       | name, label, image (`src` preferred, `preview` fallback), email, phone, url, summary       |
| `basics.location`, `basics.profiles` | Emitted only when non-empty                                                     |
| `work`         | Highlights come through as an array of `value` strings                                    |
| `volunteer`    | `highlights` is a single CMS string — split on newlines, then `,` / `;`                    |
| `education`    | `courses` is a single CMS string — same split rules                                       |
| `awards`       | Now includes `url` (was previously dropped)                                               |
| `certificates` | `{ name, url, summary }` — schema exposes no date/issuer, so those keys are omitted        |
| `publications` | Straightforward                                                                           |
| `skills`       | `keywords` split into an array (was always `undefined` in the old exporter)               |
| `languages`    | Mapped from `resumeLanguages`                                                             |
| `interests`    | `keywords` split into an array                                                            |
| `references`   | Straightforward                                                                           |
| `projects`     | `highlights` split into an array                                                          |

All dates emitted as `YYYY-MM-DD`. Unparseable or out-of-range dates (`< 1900` or `> current year + 10`) are dropped with a warning in `--verbose` mode.

### Validation

After conversion, each resume is checked for common issues. These are warnings, not failures:

- ⚠️ missing name
- ⚠️ missing email
- ⚠️ no work experience
- ⚠️ no education

### Examples

```bash
# Full export
npm run export:resumes

# Only the English variants for a specific person
npm run export:resumes -- --language en-US --name rohit

# Export a single resume by id
npm run export:resumes -- --id clr123abc

# Preview what would happen, verbosely
npm run export:resumes -- --dry-run --verbose

# YAML output (requires `npm i -D yaml`)
npm run export:resumes -- --format yaml --out output/resumes-yaml

# Custom filename template
npm run export:resumes -- --filename "{id}-{lang}.{ext}"

# Custom endpoint, non-default output
npm run export:resumes -- --url http://localhost:3000/api/graphql --out /tmp/resumes
```

### Exit Codes

| Code | Meaning                                                        |
| ---- | -------------------------------------------------------------- |
| `0`  | Success (at least one resume written, or no resumes matched)   |
| `1`  | Runtime error, or every resume failed to convert               |
| `2`  | Invalid CLI arguments                                          |

Partial failures (e.g. 3 of 4 resumes exported successfully) still exit `0` so downstream steps can proceed with what was produced.

### JSON Resume Format

Exported files follow the [JSON Resume Schema](https://jsonresume.org/schema):

```json
{
  "basics": {
    "name": "Jane Doe",
    "label": "Software Engineer",
    "email": "jane@example.com",
    "url": "https://jane.dev",
    "summary": "…",
    "location": { "city": "Berlin", "countryCode": "DE" },
    "profiles": [
      { "network": "GitHub", "username": "jane", "url": "https://github.com/jane" }
    ]
  },
  "work": [
    {
      "name": "Acme",
      "position": "Engineer",
      "startDate": "2020-01-01",
      "endDate": "2022-06-15",
      "highlights": ["Shipped X", "Shipped Y"]
    }
  ],
  "skills": [
    { "name": "TypeScript", "level": "Expert", "keywords": ["types", "generics"] }
  ]
}
```

### Using Exported Resumes

See [Generate Resume Files](#generate-resume-files) for the built-in HTML pipeline. External options:

- **`resume-cli`** – `npm i -g resume-cli`, then `resume export resume.html --resume output/resumes/…json --theme elegant`
- **Themes** – https://jsonresume.org/themes/
- **Registry** – https://registry.jsonresume.org/
- **In-app conversion** – `src/lib/resume/resumeConverter.ts` (used by the download button in the UI)

### Troubleshooting

| Symptom                                                | Fix                                                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `GraphQL URL not provided`                             | Set `NEXT_PUBLIC_GRAPHQL_URL` in `.env` or pass `--url`                                          |
| `GraphQL request failed: HTTP 401/403`                 | Set `GRAPHQL_AUTH_TOKEN` in the environment                                                      |
| `GraphQL returned errors: …`                           | The endpoint returned a `errors[]` array — the message identifies the failing field / operation |
| `--format yaml requires the "yaml" package`            | `npm install --save-dev yaml`                                                                    |
| Filename shows `unknown` for the language              | Ensure each resume in the CMS has a `language.value` set                                          |
| Two resumes collide on filename                        | The exporter appends the short id automatically — no action needed                                |

### Related Documentation

- **Library Module:** `src/lib/resume/resumeConverter.ts` — browser-side counterpart (used by the UI)
- **API Docs:** `src/lib/resume/README.md`
- **JSON Resume:** https://jsonresume.org/schema

---

## Generate Resume Files

Generates HTML resumes from exported JSON Resume files using [`resumed`](https://github.com/rbardini/resumed) and any [JSON Resume theme](https://jsonresume.org/themes/).

### Files

```
scripts/generateResumeFiles/
├── index.ts             # CLI + orchestration (entry point)
├── render.ts            # renderResume + HTML post-processors + lazy loaders
├── discover.ts          # discoverResumeFiles, parseFilename, filterResumeFiles
├── types.ts             # RunConfig, ResumeFile, JSONResume, Renderer
├── discover.test.ts     # File discovery + filename parsing tests
└── render.test.ts       # Post-processor + renderer tests
```

### Prerequisites

1. JSON Resume files exist (run `npm run export:resumes` first).
2. The chosen theme is installed as a devDependency.
   Default: `jsonresume-theme-stackoverflow` (already installed).

### Quick Start

```bash
# Render everything with the default theme
npm run generate:resume-files

# Show all options
npm run generate:resume-files -- --help

# Run the tests
npm run test:generate:resume-files
```

### What It Does

1. Discovers `.json` files in the input directory and parses `{name}_{lang}_resume.json`.
2. Applies `--language` / `--name` filters if provided.
3. Loads `resumed` and the chosen theme once, up front.
4. Renders resumes concurrently (bounded by `--concurrency`).
5. Applies HTML post-processors:
   - `stripProfilePictures` (on by default) — injects CSS to hide `.profile-pic`.
   - `rewriteElegantThemeFonts` — auto-enabled only for `jsonresume-theme-elegant` (rewrites `fonts/…` and protocol-relative `//unpkg.com` URLs so the HTML opens over `file://`).
6. Writes each file to `output/resume-files/{lang}/{name}.html` (or a flat layout with `--flat`).

### CLI Options

| Flag                            | Description                                                                          | Default                            |
| ------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------- |
| `--input <dir>`                 | Input directory                                                                      | `output/resumes`                   |
| `--file <path>`                 | Explicit JSON Resume file (repeatable). When set, `--input` is ignored               | –                                  |
| `--output <dir>`                | Output directory                                                                     | `output/resume-files`              |
| `--theme <name>`                | JSON Resume theme. Bare names are auto-prefixed with `jsonresume-theme-`             | `jsonresume-theme-stackoverflow`   |
| `--language <code>`             | Render only this language (repeatable, case-insensitive)                             | –                                  |
| `--name <fragment>`             | Case-insensitive substring match on the parsed name                                  | –                                  |
| `--concurrency <n>`             | Max concurrent renders                                                               | `4`                                |
| `--list-separator <str>`        | Marker used to split list-shaped fields on load. Env: `RESUME_LIST_SEPARATOR`         | `✌🏻`                                 |
| `--flat`                        | Skip the per-language subdirectory and prefix files with language code               | off                                |
| `--no-strip-profile-pic`        | Keep profile pictures in the rendered HTML                                            | strip                              |
| `--rewrite-elegant-fonts`       | Force elegant-theme URL rewriting (otherwise auto based on theme name)                | auto                               |
| `--no-rewrite-elegant-fonts`    | Disable elegant-theme URL rewriting                                                  | –                                  |
| `--dry-run`                     | Render everything but don't write files                                              | off                                |
| `--quiet` / `--verbose`         | Suppress progress / print extra diagnostics                                          | off / off                          |
| `-h`, `--help`                  | Show help                                                                            | –                                  |

### Output Structure

```
output/resume-files/
├── en-US/
│   ├── rohit_khanduri.html
│   └── florian_zeidler.html
└── de-DE/
    ├── rohit_khanduri.html
    └── florian_zeidler.html
```

With `--flat`:

```
output/resume-files/
├── rohit_khanduri_en-US.html
├── rohit_khanduri_de-DE.html
└── …
```

### Available Themes

| Theme                                  | Install                                                    |
| -------------------------------------- | ---------------------------------------------------------- |
| `jsonresume-theme-stackoverflow` (default) | preinstalled                                            |
| `jsonresume-theme-elegant`             | preinstalled                                                |
| `jsonresume-theme-even`                | preinstalled                                                |
| `jsonresume-theme-kendall`             | `npm i -D jsonresume-theme-kendall`                        |
| `jsonresume-theme-short`               | `npm i -D jsonresume-theme-short`                          |
| Browse more                            | https://jsonresume.org/themes/                             |

### Examples

```bash
# Default: render every resume with the default theme
npm run generate:resume-files

# Only English resumes for a specific person
npm run generate:resume-files -- --language en-US --name rohit

# Use a different theme (name is auto-prefixed)
npm run generate:resume-files -- --theme even

# Render one custom JSON Resume file that wasn't produced by `export:resumes`
npm run generate:resume-files -- --file ./path/to/my_resume.json

# Render several custom files at once (repeatable --file, filters still apply)
npm run generate:resume-files -- \
  --file ./ada_en-US_resume.json \
  --file ./bob_de-DE_resume.json \
  --language en-US

# Compare themes side-by-side
for t in stackoverflow even elegant; do
  npm run generate:resume-files -- --theme $t --output output/resume-files-$t
done

# Preview without writing anything
npm run generate:resume-files -- --dry-run --verbose

# Flat layout, keeping profile pictures
npm run generate:resume-files -- --flat --no-strip-profile-pic
```

### Custom Input Files

`--file <path>` accepts any JSON Resume document, not just files produced by `export:resumes`. It's repeatable, resolves relative paths against the current working directory, and short-circuits the directory scan entirely.

- **Name / language** are derived from the filename via the same `{name}_{lang}_resume.json` heuristic used for discovery. Files without a parseable language code (e.g. `my_resume.json`) render under the `unknown/` subdirectory — use `--flat` if you don't want the extra folder.
- **`--language` and `--name` filters still apply**, so passing a mixed list and narrowing with `--language en-US` works as expected.
- **Schema conformity** — the loader rejects non-object JSON up front (`invalid JSON Resume: expected an object at top level, got array`) so the theme doesn't crash with an opaque stack trace. Beyond that, any valid JSON Resume document works.
- **`✌🏻` list marker** — for `work.highlights`, `volunteer.highlights`, `projects.highlights`, `education.courses`, `skills.keywords`, and `interests.keywords`, the loader splits any string (or array item) that still contains the CMS list marker into distinct bullets. Free-form fields like `summary` / `description` are preserved verbatim. Override the marker via `--list-separator <str>` (CLI) or `RESUME_LIST_SEPARATOR=<str>` (env). Precedence: CLI > env > default.

### Exit Codes

| Code | Meaning                                                              |
| ---- | -------------------------------------------------------------------- |
| `0`  | Success (at least one file rendered, or no files matched filters)    |
| `1`  | Runtime error, or every file failed to render                        |
| `2`  | Invalid CLI arguments                                                |

Partial failures still exit `0` — the summary line reports `rendered=` / `failed=` counts so CI can act on them if needed.

### Generating PDFs

PDF generation is intentionally out of scope. Recommended approaches:

- **Browser print** — `open output/resume-files/en-US/rohit_khanduri.html`, then File → Print → Save as PDF.
- **wkhtmltopdf** — `wkhtmltopdf in.html out.pdf`
- **Puppeteer** — short Node script; see `RESUME_GENERATION.md`.

### Troubleshooting

| Symptom                                             | Fix                                                                                 |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `Input directory does not exist: …`                  | Run `npm run export:resumes` first, or pass `--file <path>` for a custom JSON file    |
| `--file not found: …`                                | Check the path; relative paths are resolved against the current working directory   |
| `--file is not a regular file: …`                    | `--file` needs a JSON file, not a directory                                          |
| `Theme "…" is not installed`                          | `npm install --save-dev <theme-name>` (or drop the `jsonresume-theme-` prefix)     |
| `invalid JSON: …`                                    | Re-run `npm run export:resumes` or fix the JSON file passed to `--file`             |
| `invalid JSON Resume: expected an object at top level` | The file is valid JSON but isn't a JSON Resume document (must be a top-level object) |
| Missing icons / broken fonts (elegant theme)         | Elegant-font rewriting is auto-enabled; force it with `--rewrite-elegant-fonts`     |
| Elegant theme crashes with `Cannot read … 'slice'`   | Known upstream theme issue with some resume shapes — try `stackoverflow` or `even`   |

### Related Documentation

- [Export Resumes](#export-resumes) — upstream JSON generator
- Full walkthrough: `scripts/RESUME_GENERATION.md`
- Theme catalogue: https://jsonresume.org/themes/
- Renderer: https://github.com/rbardini/resumed

---

## Environment Variables

Scripts that connect to GraphQL require proper environment configuration:

```env
# GraphQL API endpoint (required for export:resumes and generate-fallbacks)
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql

# Disable mock mode for scripts (required for export:resumes and generate-fallbacks)
NEXT_PUBLIC_USE_MOCK=false
```

**Note:** The `generate:resume-files` script works offline and doesn't require GraphQL configuration.

---

## Common Issues

### Scripts won't run

**Error:** `command not found: tsx`

**Solution:** Install dev dependencies:
```bash
npm install -D tsx typescript
```

### Permission denied

**Solution:** Make scripts executable:
```bash
chmod +x scripts/*.ts
```

Or run with `npx tsx` instead of direct execution.

### GraphQL connection issues

1. Verify API is running
2. Check `.env` file configuration
3. Test GraphQL endpoint manually
4. Ensure network connectivity

---

## Development

### Adding New Scripts

1. Create script file in `scripts/` directory
2. Add shebang: `#!/usr/bin/env tsx`
3. Add npm script to `package.json`:
   ```json
   "scripts": {
     "my-script": "tsx scripts/myScript.ts"
   }
   ```
4. Document in this README
5. Test thoroughly

### Best Practices

- ✅ Use TypeScript for type safety
- ✅ Include detailed console output
- ✅ Validate environment variables
- ✅ Handle errors gracefully
- ✅ Provide clear error messages
- ✅ Document prerequisites
- ✅ Add examples to README

---

## License

MIT