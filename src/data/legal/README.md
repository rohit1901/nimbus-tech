# Legal Content Fallback Files

This directory contains markdown fallback files for legal pages. These files are used when the GraphQL API is unavailable or doesn't return content.

## Purpose

The fallback system ensures that critical legal pages (Privacy Policy, Terms of Service, etc.) are always available, even if:
- The GraphQL API is down
- Network connectivity issues occur
- Content hasn't been added to the CMS yet
- During development with mock data disabled

## File Structure

```
src/data/legal/
├── README.md                # This file
├── datenschutz-en.md       # Privacy Policy (English)
├── datenschutz-de.md       # Datenschutzerklärung (German)
├── terms-en.md             # Terms of Service (English)
└── agb-de.md               # Allgemeine Geschäftsbedingungen (German)
```

## Generating Fallback Files

Fallback files are generated automatically from the GraphQL API content using a script.

### Prerequisites

1. Ensure your GraphQL API is running and accessible
2. Make sure the environment variable `NEXT_PUBLIC_GRAPHQL_URL` is set
3. Content must exist in the GraphQL API with the correct slugs:
   - `privacy-policy` (en-US)
   - `privacy-policy-de` (de-DE)
   - `impressum` (en-US)
   - `impressum-de` (de-DE)

### Running the Script

```bash
npm run generate-fallbacks
```

Or directly with tsx:

```bash
npx tsx scripts/generateFallbackFiles.ts
```

### What the Script Does

1. Connects to the GraphQL API
2. Fetches the `description` field (markdown content) for each legal page
3. Saves the content to the appropriate `.md` file in this directory
4. Reports success/failure for each file

### Output Example

```
🚀 Starting fallback file generation...

📄 Processing: Privacy Policy (English)
   Slug: privacy-policy
   Language: en-US
   Output: src/data/legal/datenschutz-en.md
📡 Fetching content for "privacy-policy" (en-US)...
✅ Successfully fetched content for "privacy-policy"
💾 Saved to: src/data/legal/datenschutz-en.md

...

📊 Summary:
   ✅ Successfully generated: 4 file(s)
   ❌ Failed or skipped: 0 file(s)
   📁 Total processed: 4 page(s)
🎉 All fallback files generated successfully!
```

## When Fallbacks Are Used

The `getPageContentWithFallback()` function uses this priority:

1. **Primary:** Fetch from GraphQL API
2. **Fallback:** If GraphQL fails or returns null, read from these markdown files
3. **Error:** If both fail, throw an error

## Manual File Creation

You can also create or edit these files manually:

1. Create a new `.md` file in this directory
2. Write your markdown content
3. Update the `getPageContentWithFallback()` call in your page to reference the file

Example:
```tsx
const content = await getPageContentWithFallback(
  'my-page',
  'en-US',
  'src/data/legal/my-page-en.md'  // Points to this directory
)
```

## File Naming Convention

- **English files:** Use `-en.md` suffix
- **German files:** Use `-de.md` suffix
- Use descriptive names that indicate the content type

## Maintenance

### When to Regenerate

Regenerate fallback files when:
- Legal content is updated in the GraphQL API
- New legal pages are added
- Compliance requirements change

### Version Control

These files should be committed to version control (Git) to ensure:
- Fallback content is always available
- Changes are tracked
- Deployments include the latest fallback content

## Troubleshooting

### Script Fails to Generate Files

**Problem:** `npm run generate-fallbacks` fails

**Solutions:**
1. Check that `NEXT_PUBLIC_GRAPHQL_URL` is set correctly in `.env`
2. Verify the GraphQL API is running and accessible
3. Ensure content exists in the API with the correct slugs
4. Check network connectivity
5. Review the error messages for specific issues

### Content is Outdated

**Problem:** Fallback files contain old content

**Solution:**
```bash
# Regenerate all fallback files
npm run generate-fallbacks
```

### Missing Language Version

**Problem:** German (or other language) fallback doesn't exist

**Solution:**
1. Add content to GraphQL API with language-specific slug (e.g., `my-page-de`)
2. Update `scripts/generateFallbackFiles.ts` to include the new page
3. Run `npm run generate-fallbacks`

## Related Files

- **Script:** `scripts/generateFallbackFiles.ts`
- **Utilities:** `src/lib/legal/getLegalContent.ts`
- **Documentation:** `src/lib/legal/README.md`

## Security & Compliance

These files may contain sensitive legal information. Ensure:
- Content is reviewed by legal counsel
- Files are kept up-to-date with regulatory changes
- Changes are audited and approved
- GDPR compliance for privacy policies
- Local legal requirements are met

## Questions?

See the main documentation:
- `src/lib/legal/README.md` - Complete API documentation
- `src/lib/legal/examples/new-page-example.tsx` - Usage examples