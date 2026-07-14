# Resume Generation

End-to-end guide for exporting resume data from the GraphQL CMS and rendering it as HTML using [`resumed`](https://github.com/rbardini/resumed) and [JSON Resume themes](https://jsonresume.org/themes/).

For the full CLI reference for each script, see [`scripts/README.md`](./README.md).

## 🚀 Quick Start

```bash
# 1. Export resume data from GraphQL → JSON Resume files
npm run export:resumes

# 2. Render each JSON file to HTML
npm run generate:resume-files

# 3. Open the result
open output/resume-files/en-US/rohit_khanduri.html
```

Both commands accept `--help` for the full option list.

## 📂 Output Structure

```
output/
├── resumes/                          # JSON Resume files (step 1)
│   ├── rohit_khanduri_en-US_resume.json
│   ├── rohit_khanduri_de-DE_resume.json
│   ├── florian_zeidler_en-US_resume.json
│   └── florian_zeidler_de-DE_resume.json
└── resume-files/                     # HTML files (step 2)
    ├── en-US/
    │   ├── rohit_khanduri.html
    │   └── florian_zeidler.html
    └── de-DE/
        ├── rohit_khanduri.html
        └── florian_zeidler.html
```

Use `--flat` on step 2 to skip the per-language subdirectory.

## 🧱 Script Layout

Both scripts live in their own folders and share the same layered design (types → converters/rendering → CLI + orchestration):

```
scripts/
├── exportResumes/
│   ├── index.ts       # CLI + orchestration
│   ├── query.ts       # GraphQL query + native fetch client
│   ├── convert.ts     # JSON Resume conversion + date/list helpers
│   ├── types.ts
│   ├── convert.test.ts
│   └── index.test.ts
└── generateResumeFiles/
    ├── index.ts       # CLI + orchestration
    ├── render.ts      # resumed loader + HTML post-processors
    ├── discover.ts    # file discovery + filename parsing
    ├── types.ts
    ├── discover.test.ts
    └── render.test.ts
```

Run tests with:

```bash
npm run test:export:resumes
npm run test:generate:resume-files
```

## ⚙️ Common Flags

| Purpose                        | Export flag                                    | Generate flag                                  |
| ------------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| Filter by language             | `--language en-US` (repeatable)                | `--language en-US` (repeatable)                |
| Filter by name substring       | `--name rohit`                                 | `--name rohit`                                 |
| Filter by resume id            | `--id <cuid>` (repeatable)                     | n/a                                            |
| Dry run                        | `--dry-run`                                    | `--dry-run`                                    |
| Concurrency                    | `--concurrency 8` (default 8)                  | `--concurrency 4` (default 4)                  |
| Output directory               | `--out <dir>` (default `output/resumes`)       | `--output <dir>` (default `output/resume-files`) |
| List separator                 | `--list-separator <str>` (default `✌🏻`)      | `--list-separator <str>` (default `✌🏻`)      |
| Verbosity                      | `--quiet` / `--verbose`                        | `--quiet` / `--verbose`                        |

Extras:

- **Export** — `--format json|yaml`, `--filename <template>`, `--pretty` / `--no-pretty`, `--url`, `GRAPHQL_AUTH_TOKEN` env var.
- **Generate** — `--theme <name>`, `--file <path>` (repeatable, bypasses `--input`), `--flat`, `--no-strip-profile-pic`, `--rewrite-elegant-fonts` / `--no-rewrite-elegant-fonts`.

## 📄 Custom Input Files

By default the generator scans `output/resumes/` (the exporter's output). To render a JSON Resume file from anywhere else, pass one or more `--file <path>` flags:

```bash
# Single custom file
npm run generate:resume-files -- --file ./ada_lovelace_en-US_resume.json

# Multiple, filtered
npm run generate:resume-files -- \
  --file ./ada_en-US_resume.json \
  --file ./bob_de-DE_resume.json \
  --language en-US
```

Rules:
- `--input` is ignored when `--file` is provided.
- Filename parsing (`{name}_{lang}_resume.json`) is reused, so well-named files land in the correct language subfolder. Files without a parseable language code (e.g. `my_resume.json`) go to `unknown/` — use `--flat` if that's awkward.
- `--language` and `--name` filters still apply.
- The JSON must be a top-level object; arrays / primitives are rejected with a clear error before the theme is invoked.

## 🎨 Themes

Bare theme names are auto-prefixed with `jsonresume-theme-`:

```bash
npm run generate:resume-files -- --theme stackoverflow   # default
npm run generate:resume-files -- --theme even
npm run generate:resume-files -- --theme elegant
```

Preinstalled: `stackoverflow`, `even`, `elegant`. Install more with `npm i -D jsonresume-theme-<name>` and browse the catalogue at https://jsonresume.org/themes/.

### Compare themes side-by-side

```bash
for t in stackoverflow even elegant; do
  npm run generate:resume-files -- --theme $t --output output/resume-files-$t
done
```

### About the elegant theme

- Elegant references `fonts/…` and protocol-relative `//unpkg.com` URLs. The generator automatically rewrites those to pinned `https://unpkg.com` URLs when `--theme elegant` is used (disable with `--no-rewrite-elegant-fonts`).
- Some resume shapes trigger an upstream error inside the theme (`Cannot read properties of undefined (reading 'slice')`). If you hit this, try another theme.

## 🖼️ Profile Pictures

The renderer injects CSS to hide `.profile-pic` elements by default (useful for PDFs). Opt out with `--no-strip-profile-pic`.

## 📄 Converting to PDF

PDF is intentionally not built in. Pick whichever workflow fits your setup:

### Option 1 — Browser Print (recommended)

```bash
open output/resume-files/en-US/rohit_khanduri.html
# then File → Print → Save as PDF
```

### Option 2 — wkhtmltopdf

```bash
brew install wkhtmltopdf                 # macOS
sudo apt-get install wkhtmltopdf         # Debian/Ubuntu

wkhtmltopdf \
  output/resume-files/en-US/rohit_khanduri.html \
  output/resume-files/en-US/rohit_khanduri.pdf
```

### Option 3 — Puppeteer

```bash
npm install --save-dev puppeteer
```

```js
// scripts/htmlToPdf.mjs
import puppeteer from "puppeteer"
import { pathToFileURL } from "node:url"
import { resolve } from "node:path"

const input = resolve(process.argv[2])
const output = resolve(process.argv[3])

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto(pathToFileURL(input).href, { waitUntil: "networkidle0" })
await page.pdf({ path: output, format: "A4", printBackground: true })
await browser.close()
```

```bash
node scripts/htmlToPdf.mjs \
  output/resume-files/en-US/rohit_khanduri.html \
  output/resume-files/en-US/rohit_khanduri.pdf
```

## 🌍 Multi-Language Behaviour

- The exporter uses `Language.value` (e.g. `en-US`, `de-DE`) in the filename via `{lang}`.
- The generator parses that filename back to derive the language subdirectory.
- If a resume has no `language.value`, the language falls back to `unknown`.

## ✅ Data Correctness (as of the current exporter)

- Dates are emitted as `YYYY-MM-DD` (JSON Resume convention). Corrupt or out-of-range dates are dropped with a warning in `--verbose`.
- `skills.keywords`, `interests.keywords`, `volunteer.highlights`, `education.courses`, and `projects.highlights` are stored as single strings in the CMS but exposed as **arrays** in the JSON output. Split priority: `✌🏻` (explicit CMS marker) → newlines → `,` / `;`. Commas are last so they aren't mistaken for delimiters inside sentences. The marker itself is configurable via `--list-separator <str>` (CLI) or `RESUME_LIST_SEPARATOR=<str>` (env) on **both** scripts — handy if the CMS uses a different bullet character.
- `awards.url` is preserved.
- `certificates` map to `{ name, url, summary }` only — the CMS schema exposes no `date` / `issuer`, so those keys are omitted rather than emitted as `undefined`.
- Filename collisions get an `-<shortId>` suffix; Unicode names (`Jörg`, `李明`) are preserved.

## 🔧 Troubleshooting

| Symptom                                              | Fix                                                                         |
| ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `GraphQL URL not provided`                           | Set `NEXT_PUBLIC_GRAPHQL_URL` in `.env` or pass `--url`                     |
| `GraphQL request failed: HTTP 401/403`               | Set `GRAPHQL_AUTH_TOKEN` in the environment                                 |
| `--format yaml requires the "yaml" package`          | `npm install --save-dev yaml`                                               |
| `Input directory does not exist: …`                  | Run `npm run export:resumes` first                                          |
| `Theme "…" is not installed`                         | `npm install --save-dev <theme-name>` or drop the `jsonresume-theme-` prefix |
| `invalid JSON: …`                                    | Re-run `npm run export:resumes` to regenerate the input                     |
| Elegant theme icons are boxes / broken fonts         | Ensure `--rewrite-elegant-fonts` is enabled (default when theme = elegant)  |

## 📚 References

- [`scripts/README.md`](./README.md) — full CLI reference for every script
- [JSON Resume schema](https://jsonresume.org/schema)
- [JSON Resume themes](https://jsonresume.org/themes/)
- [`resumed`](https://github.com/rbardini/resumed) — the renderer
- `src/lib/resume/resumeConverter.ts` — browser-side counterpart of the exporter (used by the download button in the UI)

## 🎯 Complete Workflow

```bash
# 1. Export from GraphQL (with any filters you want)
npm run export:resumes -- --language en-US

# 2. Render HTML with your chosen theme
npm run generate:resume-files -- --theme even --language en-US

# 3. View
open output/resume-files/en-US/rohit_khanduri.html

# 4. Print → Save as PDF, or use one of the PDF options above
```
