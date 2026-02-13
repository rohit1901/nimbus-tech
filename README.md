# Nimbus Tech Website

Nimbus Tech GmbH delivers tailored cloud, software engineering, and architecture solutions for modern enterprises. This repository contains the public marketing site that presents our services, credentials, and contact channels while showcasing an interactive, multilingual experience.

## Table of Contents

- [About Nimbus Tech](#about-nimbus-tech)
- [Website Highlights](#website-highlights)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Directory Overview](#directory-overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Data & Content Flow](#data--content-flow)
- [Deployment Notes](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)

## About Nimbus Tech

Nimbus Tech is a software consultancy based in Germany. We specialise in:

- Designing and building bespoke web and cloud-native applications
- Modernising legacy systems through strategic architecture engagements
- Establishing robust DevOps practices, observability, and automation

The website shares our story, highlights customer value, and provides clear paths to connect with our engineers.

## Website Highlights

- **Hero & Call to Action** – Communicates our positioning and offers direct contact links.
- **Service Feature Sections** – Orbit-style visualisations explain software development, cloud, and architecture offerings.
- **Client Testimonials** – Dynamic carousel backed by CMS-driven data with graceful fallbacks.
- **Interactive Map** – Highlights team focus areas, delivery capabilities, and geographic reach.
- **Certifications & Credentials** – Demonstrates formal qualifications and recognised expertise.
- **FAQ, Values & Approach** – Answers common questions and details our delivery methodology.
- **Multilingual Support** – Language-specific content is surfaced through a shared context and GraphQL queries.
- **Responsive Design** – Tailored layouts optimised for desktop and mobile devices.

## System Architecture

- **Next.js App Router** (src/app) with React Server Components where appropriate and client components for interactive sections.
- **Apollo Client** for querying the Nimbus Tech GraphQL API, co-located with hooks in `src/queries`.
- **Tailwind CSS & Custom Motion** for design system primitives, animated backgrounds, and component-level theming.
- **Radix UI & Remix Icons** for consistent, accessible UI primitives and iconography.
- **Mock GraphQL Data** to keep development productive when the backend API is unreachable.

## Technology Stack

| Category              | Tooling / Libraries                          |
| --------------------- | -------------------------------------------- |
| Framework             | Next.js 15 (App Router)                      |
| Language              | TypeScript                                   |
| Runtime               | React 19                                     |
| Styling               | Tailwind CSS, Geist fonts                    |
| Data Layer            | Apollo Client, GraphQL                       |
| UI Components         | Radix UI, custom component library           |
| Animations            | motion, bespoke canvas/game-of-life effects  |
| Utility               | clsx, tailwind-merge, tailwind-variants      |
| Tooling               | ESLint, Prettier, GraphQL Code Generator     |

## Directory Overview

- `src/app` – Next.js App Router entry point, routing, and global layouts.
  - `graphql` – Generated/shared GraphQL types and mock CMS payloads.
  - `providers` – React context for language selection and CMS content.
- `src/components` – Shared UI primitives, data visualisations, and themed sections.
- `src/hooks` – Custom hooks, including data orchestration helpers.
- `src/lib` – Specialized library modules and shared utilities.
  - `legal` – Page content utilities with GraphQL and file system fallback support.
  - `resume` – Resume conversion utilities for JSON Resume format.
- `public` – Static assets and icons served by Next.js.
- `scripts` – Build-time utilities (icon generation, resume export, page content generation).
- `output` – Generated files organized by type and language.
  - `resumes` – Exported JSON Resume files.
  - `resume-files` – Generated HTML resume files.
  - `page-content` – Generated markdown page content files.

## Prerequisites

- Node.js 18.18 or newer (Next.js 15 requirement)
- npm 9 or newer (bundled with recent Node.js releases)
- Access to a Nimbus Tech GraphQL endpoint or willingness to use the shipped mock data
- (Optional) For resume generation: `resumed` and a JSON Resume theme are included in devDependencies

## Quick Start

1. Clone the repository: `git clone https://github.com/rohit1901/nimbus-tech.git`
2. Change into the project directory: `cd nimbus-tech`
3. Install dependencies: `npm install`
4. Prepare environment variables (see [Environment Configuration](#environment-configuration))
5. **Run development setup:** `npm run setup:dev`
   - Sets up environment file (`.env` from `.env.copy` if it doesn't exist)
   - Generates GraphQL types
   - Generates icon maps
   - Creates fallback content files (if GraphQL API is available)
   - Exports and generates resume files (if GraphQL API is available)
6. Start the development server: `npm run dev`
7. Visit `http://localhost:3000` in your browser

The development server watches for file changes and automatically hot-reloads the application.

**Note:** Step 5 (`npm run setup:dev`) is **required for first-time setup**. The script handles failures gracefully - if the GraphQL API is not accessible, it will skip those steps and you can run them individually later when the API is available.

## Environment Configuration

The application expects a GraphQL endpoint to be exposed via `NEXT_PUBLIC_GRAPHQL_URL`.

- The setup script (`npm run setup:dev`) automatically creates `.env` from `.env.copy` if it doesn't exist
- Alternatively, manually copy the template: `cp .env.copy .env`
- Update `NEXT_PUBLIC_GRAPHQL_URL` to the URL of your Nimbus Tech GraphQL API
- The Apollo client reads this variable at runtime to populate the site with live content

If the API is unavailable, the application transparently falls back to the bundled mock data defined in `output/mock-data/mockPageContent.ts`, ensuring the site still renders during development.

## Available Scripts

### Development & Build

- `npm run dev` – Launches Next.js in development mode with hot reloading.
- `npm run build` – Creates an optimised production build.
- `npm run start` – Serves the production build (requires running `build` first).
- `npm run lint` – Runs ESLint across the project.
- `npm run format` – Formats `.ts` and `.tsx` files using Prettier.

### Development Setup

- `npm run setup:dev` – **Required for first-time setup.** Comprehensive development setup (runs all generation scripts).

### Code Generation

- `npm run graphql:generate` – Runs GraphQL Code Generator with the settings in `graphql.codegen.yml`.
- `npm run icons:generate` / `npm run icons:watch` – Regenerates the icon sprite from the assets directory.

### Content Generation

- `npm run export:resumes` – Exports resume data from GraphQL API to JSON Resume format, organized by language.
- `npm run generate:resume-files` – Generates professional HTML resumes from exported JSON files using resumed and themes.
- `npm run generate:page-files` – Generates markdown page content files (legal pages, etc.) from GraphQL, organized by language in output directory. These files serve as fallbacks when GraphQL is unavailable.
- `npm run generate:mock-data` – Generates mock page content TypeScript file from GraphQL API for development fallback. Output: `output/mock-data/mockPageContent.ts`.

See `scripts/README.md` for detailed documentation on all utility scripts.

## Data & Content Flow

1. The `LanguageProvider` fetches page content via `usePageContents`, requesting sections such as hero, features, testimonials, certifications, map, and FAQs.
2. Apollo Client stores responses in an in-memory cache for efficient reuse.
3. If the GraphQL request fails, the provider supplies the mock payload to ensure every section renders predictably.
4. Each UI section (`Hero`, `Features`, `Testimonials`, etc.) reads the translated content and renders modular React components.
5. Sections use Radix primitives, motion animations, and custom layout utilities to deliver an interactive, accessible experience.

## Content Export & Generation

The project includes scripts for exporting and generating various content types from GraphQL:

### Resume Export & Generation

1. **Export Resumes** – Fetches resume data from GraphQL API and converts to JSON Resume format:
   ```bash
   npm run export:resumes
   ```
   - Outputs language-specific JSON files to `output/resumes/`
   - Format: `{name}_{language}_resume.json`

2. **Generate HTML Resumes** – Creates professional HTML resumes using resumed and themes:
   ```bash
   npm run generate:resume-files
   ```
   - Uses `jsonresume-theme-elegant` by default
   - Outputs HTML files organized by language in `output/resume-files/`
   - Supports custom themes via `--theme` parameter

3. **Complete Workflow**:
   ```bash
   npm run export:resumes        # Export from GraphQL
   npm run generate:resume-files # Generate HTML files
   ```

See `scripts/RESUME_GENERATION.md` for detailed resume documentation.

### Page Content Generation

**Generate Page Content Files** – Exports page content (legal pages, etc.) from GraphQL to markdown files:
```bash
npm run generate:page-files
```
- Outputs markdown files organized by language in `output/page-content/`
- Supports custom pages via `--pages` parameter
- Example: `node scripts/generatePageFiles.ts --pages=privacy-policy,impressum,about-us`

**Note:** The generated files in `output/page-content/` are automatically used as fallbacks by the application when the GraphQL API is unavailable.

See `scripts/README.md` for comprehensive documentation on all utility scripts.

## Deployment Notes

### Production Builds

- Production builds should be created with `npm run build` followed by `npm run start`.
- Ensure the production environment defines `NEXT_PUBLIC_GRAPHQL_URL`.
- A `Procfile` is included for platforms that recognise process definitions (for example, Railway or Heroku-style deployments).
- Assets in `public` are bundled automatically; keep large media in a CDN for optimal performance.

### Fallback Files for Production

The application uses a fallback system for critical content when GraphQL is unavailable. **Before deploying to production:**

1. **Generate fallback files:**
   ```bash
   npm run generate:page-files
   ```

2. **Ensure `output/page-content/` is deployed** with your application. The `.gitignore` is configured to allow these files.

3. **Verify deployment** includes the fallback files at runtime.

The fallback files are automatically used when the GraphQL API is down or unreachable, ensuring legal pages and other critical content remain accessible.

**See `DEPLOYMENT_GUIDE.md` for comprehensive deployment strategies and platform-specific instructions.**

## Contributing

Contributions and suggestions are welcome:

1. Fork the repository and create a feature branch.
2. Commit changes following conventional commit messages where possible.
3. Ensure `npm run lint` and `npm run build` succeed.
4. Open a pull request detailing your changes and testing notes.

For feature ideas, bug reports, or questions, please open an issue or reach out directly.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
