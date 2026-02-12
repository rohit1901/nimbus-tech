# Scripts

This directory contains utility scripts for the Nimbus Tech project.

---

## Remixicon Map Generator

### Setup
npm install @remixicon/react
npm install -D tsx typescript

text

### Generate Icon Map
npm run icons:generate

text

**Output**: `src/icons/remixicon-map.ts` with all ~2,500 Remixicons mapped.

### Usage
import { remixIconMap, RemixiconComponentType } from '@/icons/remixicon-map';

type HeroType = {
banner: {
icon?: RemixiconComponentType;
}
};

// Dynamic lookup
const iconName = "Ri24HoursFill";
const Icon = remixIconMap[iconName]; // Fully typed!
<Icon size={24} />;

text

### Workflow
- **First run**: `npm run icons:generate`
- **@remixicon/react updates**: Re-run `npm run icons:generate`
- **Auto-generate**: Runs on `npm install` via `postinstall`

### Tree-shaking
✅ Map uses named imports, fully tree-shakable
✅ Only used icons bundled (~1KB per icon)

**Regenerate anytime** - script validates dependencies and handles all edge cases.

---

## Fallback File Generator

Generates markdown fallback files from GraphQL content for legal pages.

### Purpose

Creates local fallback files that are used when the GraphQL API is unavailable, ensuring critical legal pages are always accessible.

### Prerequisites

1. GraphQL API must be running and accessible
2. Environment variable `NEXT_PUBLIC_GRAPHQL_URL` must be set
3. Content must exist in GraphQL with correct slugs:
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

1. Connects to GraphQL API
2. Fetches `description` field (markdown content) for each legal page
3. Saves content to `src/data/legal/*.md` files
4. Reports success/failure for each file

### Output Files

- `src/data/legal/datenschutz-en.md` - Privacy Policy (English)
- `src/data/legal/datenschutz-de.md` - Datenschutzerklärung (German)
- `src/data/legal/terms-en.md` - Terms of Service (English)
- `src/data/legal/agb-de.md` - AGB (German)

### When to Regenerate

- Legal content is updated in GraphQL
- New legal pages are added
- Compliance requirements change
- Before production deployments

### Troubleshooting

**Script fails:**
- Check `NEXT_PUBLIC_GRAPHQL_URL` in `.env`
- Verify GraphQL API is running
- Ensure content exists with correct slugs
- Check network connectivity

**See:** `src/data/legal/README.md` for more details

---

## Related Documentation

- `src/lib/legal/README.md` - Page content API documentation
- `src/lib/legal/examples/` - Usage examples
- `src/data/legal/README.md` - Fallback files documentation
