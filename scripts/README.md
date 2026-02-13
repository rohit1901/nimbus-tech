# Scripts

This directory contains utility scripts for the Nimbus Tech project.

---

## 📜 Available Scripts

1. [Development Setup](#development-setup) - Comprehensive development setup (runs all generation scripts)
2. [Remixicon Map Generator](#remixicon-map-generator) - Generate icon map from @remixicon/react
3. [Generate Page Files](#generate-page-files) - Generate markdown page content files from GraphQL (creates fallback files)
4. [Export Resumes](#export-resumes) - Export resumes to JSON Resume format
5. [Generate Resume Files](#generate-resume-files) - Generate HTML/PDF resumes from JSON Resume files
6. [Fallback File Generator](#fallback-file-generator) - ~~DEPRECATED~~ Use Generate Page Files instead

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
- `scripts/exportResumes.ts` - Similar pattern for resume export
- `scripts/generateFallbackFiles.ts.deprecated` - Old legacy approach (deprecated)

---

## Export Resumes

Fetches resume data from GraphQL API, converts to [JSON Resume](https://jsonresume.org/schema) format, and saves to language-specific files.

### File

`scripts/exportResumes.ts`

### Purpose

Automatically exports all resumes from your GraphQL backend into the JSON Resume standard format. Creates separate files for each language version, making them compatible with resume tools, themes, and services.

### Quick Start

```bash
npm run export:resumes
```

Or directly with tsx:

```bash
npx tsx scripts/exportResumes.ts
```

### What It Does

1. Connects to GraphQL API
2. Fetches all resumes with their language information
3. Converts each resume to JSON Resume format
4. Saves separate files for each language version
5. Validates exported data and reports warnings

### Requirements

- GraphQL API must be running
- `NEXT_PUBLIC_GRAPHQL_URL` set in `.env`
- Resume data exists in GraphQL backend
- Each resume must have a `language` property

### Output

Files saved to: `output/resumes/`

Filename format: `{name}_{language}_resume.json`

**Example:**
```
output/resumes/
├── rohit_khanduri_en_resume.json
├── rohit_khanduri_de_resume.json
├── florian_zeidler_en_resume.json
└── florian_zeidler_de_resume.json
```

### Language Support

Each resume's language is determined by the `language` property from GraphQL:

```graphql
{
  language {
    id
    label      # "English", "Deutsch"
    value      # "en", "de"
  }
}
```

The `value` field is used in the filename (e.g., `en`, `de`).

### What Gets Exported

All resume sections are converted to JSON Resume format:

- ✅ **Basics**: name, email, phone, summary, location, profiles
- ✅ **Work**: experience with highlights
- ✅ **Education**: degrees, institutions, courses
- ✅ **Skills**: with levels and keywords
- ✅ **Projects**: with descriptions and highlights
- ✅ **Volunteer**: experience and contributions
- ✅ **Awards**: titles, dates, and descriptions
- ✅ **Certificates**: certifications and credentials
- ✅ **Publications**: articles and papers
- ✅ **Languages**: spoken languages and fluency
- ✅ **Interests**: hobbies and keywords
- ✅ **References**: professional references

### Example Output

```
🚀 Starting resume export...

📡 Connecting to GraphQL API: http://localhost:3000/api/graphql
📥 Fetching resume data...
✅ Found 4 resume(s)

📁 Created output directory: /path/to/output/resumes

🔄 Processing: Rohit Khanduri (English)
   ✓ Saved to: /path/to/output/resumes/rohit_khanduri_en_resume.json

🔄 Processing: Rohit Khanduri (Deutsch)
   ✓ Saved to: /path/to/output/resumes/rohit_khanduri_de_resume.json

🔄 Processing: Florian Zeidler (English)
   ✓ Saved to: /path/to/output/resumes/florian_zeidler_en_resume.json

🔄 Processing: Florian Zeidler (Deutsch)
   ✓ Saved to: /path/to/output/resumes/florian_zeidler_de_resume.json

✨ Export completed successfully!
📂 Output directory: /path/to/output/resumes
```

### Validation

The script automatically validates each exported resume and warns about:

- ⚠️ Missing name
- ⚠️ Missing email
- ⚠️ No work experience
- ⚠️ No education

Warnings don't stop the export but help identify incomplete data.

### JSON Resume Format

Exported files follow the [JSON Resume Schema](https://jsonresume.org/schema):

```json
{
  "basics": {
    "name": "John Doe",
    "label": "Software Engineer",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "url": "https://johndoe.dev",
    "summary": "...",
    "location": {
      "city": "San Francisco",
      "countryCode": "US",
      "region": "California"
    },
    "profiles": [
      {
        "network": "GitHub",
        "username": "johndoe",
        "url": "https://github.com/johndoe"
      }
    ]
  },
  "work": [...],
  "education": [...],
  "skills": [...],
  "projects": [...]
}
```

### Using Exported Resumes

#### 1. Generate HTML/PDF with Resume CLI

```bash
# Install resume-cli globally
npm install -g resume-cli

# Generate HTML
resume export resume.html \
  --resume output/resumes/rohit_khanduri_en_resume.json \
  --theme elegant

# Generate PDF
resume export resume.pdf \
  --resume output/resumes/rohit_khanduri_en_resume.json \
  --theme elegant
```

#### 2. Browse Themes

Explore [JSON Resume Themes](https://jsonresume.org/themes/) for beautiful templates:
- `elegant` - Clean and professional
- `stackoverflow` - Tech-focused design
- `kendall` - Modern minimalist
- Many more...

#### 3. Host Online

Upload to [JSON Resume Registry](https://registry.jsonresume.org/) for public hosting.

#### 4. Use in React/TypeScript

```typescript
import { useResumes } from '@/queries/index';
import { convertToJSONResume, downloadJSONResume } from '@/lib/resume/resumeConverter';

function MyComponent() {
  const { data } = useResumes();
  
  const handleDownload = () => {
    if (data?.resumes?.[0]) {
      const jsonResume = convertToJSONResume(data.resumes[0]);
      downloadJSONResume(jsonResume, 'resume.json');
    }
  };
  
  return <button onClick={handleDownload}>Download Resume</button>;
}
```

### Troubleshooting

**Error: GraphQL URL not found**
```
❌ Error: NEXT_PUBLIC_GRAPHQL_URL not found in environment variables
```
**Solution:** Add `NEXT_PUBLIC_GRAPHQL_URL` to your `.env` file

**Error: Cannot connect to GraphQL**
```
❌ Error fetching or converting resumes
```
**Solution:** Ensure your GraphQL API is running at the specified URL

**No resumes found**
```
⚠️  No resumes found in GraphQL
```
**Solution:** Add resume data to your GraphQL backend first

**Missing language information**

If a resume doesn't have a language property, the filename will use `unknown`:
```
rohit_khanduri_unknown_resume.json
```

**Solution:** Ensure all resumes in GraphQL have a `language` field set

### Related Documentation

- **Library Module:** `src/lib/resume/resumeConverter.ts` - Use in React components
- **API Docs:** `src/lib/resume/README.md` - Full API documentation
- **Quick Guide:** `RESUME_CONVERTER_GUIDE.md` - Usage examples
- **Examples:** `src/lib/resume/resumeConverter.examples.ts` - Code samples
- **JSON Resume:** https://jsonresume.org/schema - Official schema documentation

---

## Generate Resume Files

Generates HTML resume files from exported JSON Resume files using resumed and JSON Resume themes.

### File

`scripts/generateResumeFiles.ts`

### Purpose

Takes exported JSON Resume files and generates beautiful, professional HTML resumes using the resumed library and JSON Resume themes. Organizes output by language for easy distribution.

### Prerequisites

1. JSON Resume files must exist (run `npm run export:resumes` first)
2. Theme must be installed (default: `jsonresume-theme-elegant`)
3. Input files in `output/resumes/` directory

### Quick Start

```bash
npm run generate:resume-files
```

Or directly with node:

```bash
node scripts/generateResumeFiles.ts
```

### What It Does

1. Reads all JSON Resume files from `output/resumes/`
2. Extracts name and language from filenames
3. Generates HTML files using resumed and the specified theme
4. Organizes output by language in `output/resume-files/{language}/`
5. Reports success/failure for each file

### Command Line Options

```bash
# Use a different theme
node scripts/generateResumeFiles.ts --theme=even

# Custom input/output directories
node scripts/generateResumeFiles.ts --input=custom/path --output=custom/output

# Combine options
node scripts/generateResumeFiles.ts --theme=stackoverflow --output=custom/output
```

### Output Structure

Files organized by language:

```
output/resume-files/
├── en-US/
│   ├── rohit_khanduri.html
│   └── florian_zeidler.html
├── de-DE/
│   ├── rohit_khanduri.html
│   └── florian_zeidler.html
└── unknown/
    └── fallback_resume.html
```

### Available Themes

Install themes from npm and use them with the `--theme` option:

```bash
# Elegant (default, already installed)
npm install jsonresume-theme-elegant

# Clean and modern
npm install jsonresume-theme-even

# Tech-focused design
npm install jsonresume-theme-stackoverflow

# Modern minimalist
npm install jsonresume-theme-kendall

# Compact single-page
npm install jsonresume-theme-short

# Browse more: https://jsonresume.org/themes/
```

### Features

- ✅ **Professional Themes** - 50+ community-maintained designs
- ✅ **Responsive Design** - Works on all devices
- ✅ **Print-Optimized** - Perfect for PDF generation via browser print
- ✅ **Standards Compliant** - Uses JSON Resume schema
- ✅ **Easy Theme Switching** - Just change the --theme parameter
- ✅ **Multi-Language** - Automatically organized by language

### Example Output

```
🚀 Starting resume file generation...

✓ Loaded resumed library

⚙️  Configuration:
   Input: /path/to/output/resumes
   Output: /path/to/output/resume-files
   Theme: jsonresume-theme-elegant
   ✓ Theme installed: jsonresume-theme-elegant

📄 Found 4 resume file(s)

📁 Created output directory: /path/to/output/resume-files

🔄 Processing: rohit_khanduri_en-US_resume
   Name: rohit_khanduri
   Language: en-US
   ✓ HTML: /path/to/output/resume-files/en-US/rohit_khanduri.html

🔄 Processing: rohit_khanduri_de-DE_resume
   Name: rohit_khanduri
   Language: de-DE
   ✓ HTML: /path/to/output/resume-files/de-DE/rohit_khanduri.html

🔄 Processing: florian_zeidler_en-US_resume
   Name: florian_zeidler
   Language: en-US
   ✓ HTML: /path/to/output/resume-files/en-US/florian_zeidler.html

🔄 Processing: florian_zeidler_de-DE_resume
   Name: florian_zeidler
   Language: de-DE
   ✓ HTML: /path/to/output/resume-files/de-DE/florian_zeidler.html

============================================================
📊 Summary:
   ✅ Successfully generated: 4 resume(s)
   ❌ Failed: 0 resume(s)
   📁 Output directory: /path/to/output/resume-files
============================================================

✨ All resumes generated successfully!

💡 View your resumes in: /path/to/output/resume-files
   Organized by language for easy access.
```

### Generating PDFs

PDF generation requires additional tools. Here are recommended approaches:

#### Option 1: Browser Print to PDF

```bash
# Generate HTML first
npm run generate:resume-files

# Open in browser and use Print to PDF
open output/resume-files/en/rohit_khanduri.html
```

#### Option 2: Using wkhtmltopdf

```bash
# Install wkhtmltopdf
brew install wkhtmltopdf  # macOS
# or apt-get install wkhtmltopdf  # Ubuntu/Debian

# Convert HTML to PDF
wkhtmltopdf output/resume-files/en/rohit_khanduri.html output/resume-files/en/rohit_khanduri.pdf
```

#### Option 3: Using Puppeteer

```bash
# Install puppeteer
npm install puppeteer

# Create a script to convert HTML to PDF
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///path/to/resume.html', { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'resume.pdf', format: 'A4' });
  await browser.close();
})();
"
```

### Workflow

Complete workflow for generating and distributing resumes:

```bash
# Step 1: Export resumes from GraphQL
npm run export:resumes

# Step 2: Generate HTML files
npm run generate:resume-files

# Step 3: (Optional) Convert to PDF
# Use one of the PDF generation methods above

# Step 4: Distribute
# HTML files are ready to host or email
# Share the output/resume-files directory
```

### Using Different Themes

Switch between themes by using the `--theme` parameter:

```bash
# Try different themes
npm run generate:resume-files -- --theme=even
npm run generate:resume-files -- --theme=stackoverflow
npm run generate:resume-files -- --theme=kendall

# Or use node directly
node scripts/generateResumeFiles.ts --theme=elegant
```

### Comparing Themes

Generate resumes with multiple themes to choose your favorite:

```bash
# Export resumes first
npm run export:resumes

# Generate with different themes
node scripts/generateResumeFiles.ts --theme=elegant --output=output/elegant
node scripts/generateResumeFiles.ts --theme=even --output=output/even
node scripts/generateResumeFiles.ts --theme=stackoverflow --output=output/stackoverflow

# Compare and pick your favorite!
```

### Troubleshooting

**Error: Input directory does not exist**
```
❌ Input directory does not exist: output/resumes
```
**Solution:** Run `npm run export:resumes` first to generate JSON files

**Error: Theme not found**
```
❌ Theme not found: jsonresume-theme-elegant
```
**Solution:** Install the theme: `npm install jsonresume-theme-elegant`

**Error: Failed to read JSON**
```
✗ Failed to read JSON: Unexpected token
```
**Solution:** Ensure JSON files are valid. Re-run `npm run export:resumes`

**No resume files found**
```
⚠️  No resume files found.
```
**Solution:** Export resumes first: `npm run export:resumes`

### Advanced Usage

#### Process Specific Language Only

```bash
# Manually process only English resumes
npx tsx scripts/generateResumeFiles.ts --input=output/resumes/en
```

#### Batch Process Multiple Themes

```bash
# Generate with multiple themes
for theme in even elegant stackoverflow kendall; do
  npx tsx scripts/generateResumeFiles.ts \
    --theme=$theme \
    --output=output/resume-files-$theme
done
```

#### Integrate with CI/CD

```yaml
# GitHub Actions example
- name: Generate Resume Files
  run: |
    npm run export:resumes
    npm run generate:resume-files
    
- name: Deploy to Static Hosting
  run: |
    # Upload output/resume-files to hosting
```

### Related Documentation

- **Export Script:** [Export Resumes](#export-resumes) - Generate JSON Resume files
- **JSON Resume:** https://jsonresume.org/schema - Official schema
- **Themes:** https://jsonresume.org/themes/ - Browse available themes
- **Resumed Docs:** https://github.com/rbardini/resumed - Renderer documentation

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