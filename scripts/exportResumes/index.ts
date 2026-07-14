#!/usr/bin/env node

/**
 * Export Resumes Script
 *
 * Fetches resume data from the GraphQL API, converts it to JSON Resume
 * format, and writes one file per resume to an output directory.
 *
 * Usage:
 *   npm run export:resumes -- [options]
 *   npx tsx scripts/exportResumes -- [options]
 *
 * Options (see `printHelp()` for the full list):
 *   --url <url>            Override NEXT_PUBLIC_GRAPHQL_URL
 *   --out <dir>            Output directory (default: output/resumes)
 *   --id <id>              Only export the given resume id (repeatable)
 *   --language <code>      Only export resumes for the given language code
 *                          (repeatable; matches Language.value)
 *   --name <fragment>      Case-insensitive substring match on basics.name
 *   --format json|yaml     Output format (default: json)
 *   --filename <template>  Filename template. Placeholders: {name} {lang}
 *                          {id} {ext}. Default: "{name}_{lang}_resume.{ext}"
 *   --pretty / --no-pretty Pretty-print JSON output (default: pretty)
 *   --concurrency <n>      Max concurrent file writes (default: 8)
 *   --dry-run              Convert and validate, but don't write files
 *   --quiet                Suppress progress output (errors still shown)
 *   --verbose              Print per-record warnings
 *   --help, -h             Show this help
 *
 * Environment:
 *   NEXT_PUBLIC_GRAPHQL_URL  GraphQL endpoint
 *   GRAPHQL_AUTH_TOKEN       Optional bearer token (or full "Bearer …")
 */

import { mkdir, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { parseArgs } from "node:util"
import { config as loadEnv } from "dotenv"

import { convertToJSONResume } from "./convert"
import { fetchResumes } from "./query"
import type { GraphQLResume, JSONResumeSchema } from "./types"
import {
  DEFAULT_LIST_SEPARATOR,
  pickListSeparator,
  resolveSeparatorRegex,
} from "../lib/listSeparator"
import {
  c,
  createLogger,
  formatBytes,
  formatDuration,
  sym,
  type StructuredLogger,
} from "../lib/logger"

loadEnv()

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

interface CliOptions {
  url?: string
  out: string
  ids: string[]
  languages: string[]
  name?: string
  format: "json" | "yaml"
  filename: string
  pretty: boolean
  concurrency: number
  dryRun: boolean
  quiet: boolean
  verbose: boolean
  /** Effective list separator (undefined ⇒ built-in default). */
  listSeparator?: string
}

const DEFAULT_FILENAME_TEMPLATE = "{name}_{lang}_resume.{ext}"

function printHelp(): void {
  // Reuses the doc comment at the top of the file.
  process.stdout.write(
    [
      "Export resumes from GraphQL into JSON Resume files.",
      "",
      "Usage: npm run export:resumes -- [options]",
      "",
      "Options:",
      "  --url <url>            Override NEXT_PUBLIC_GRAPHQL_URL",
      "  --out <dir>            Output directory (default: output/resumes)",
      "  --id <id>              Only export the given resume id (repeatable)",
      "  --language <code>      Only export resumes for the given language",
      "                         (repeatable; matches Language.value)",
      "  --name <fragment>      Case-insensitive substring match on basics.name",
      "  --format json|yaml     Output format (default: json)",
      `  --filename <template>  Filename template. Placeholders: {name} {lang}`,
      `                         {id} {ext}. Default: "${DEFAULT_FILENAME_TEMPLATE}"`,
      "  --pretty / --no-pretty Pretty-print JSON output (default: pretty)",
      "  --concurrency <n>      Max concurrent file writes (default: 8)",
      `  --list-separator <str> Marker used to split CMS list fields (default: "${DEFAULT_LIST_SEPARATOR}")`,
      "                         Env: RESUME_LIST_SEPARATOR. Applies to keywords,",
      "                         courses, and highlights.",
      "  --dry-run              Convert and validate, but don't write files",
      "  --quiet                Suppress progress output",
      "  --verbose              Print per-record warnings",
      "  -h, --help             Show this help",
      "",
      "Environment:",
      "  NEXT_PUBLIC_GRAPHQL_URL  GraphQL endpoint",
      "  GRAPHQL_AUTH_TOKEN       Optional bearer token",
      "",
    ].join("\n"),
  )
}

function parseCliOptions(argv: string[]): CliOptions {
  const { values } = parseArgs({
    args: argv,
    allowPositionals: false,
    options: {
      url: { type: "string" },
      out: { type: "string" },
      id: { type: "string", multiple: true },
      language: { type: "string", multiple: true },
      name: { type: "string" },
      format: { type: "string" },
      filename: { type: "string" },
      pretty: { type: "boolean" },
      "no-pretty": { type: "boolean" },
      concurrency: { type: "string" },
      "list-separator": { type: "string" },
      "dry-run": { type: "boolean" },
      quiet: { type: "boolean" },
      verbose: { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  })

  if (values.help) {
    printHelp()
    process.exit(0)
  }

  const format = (values.format ?? "json") as string
  if (format !== "json" && format !== "yaml") {
    throw new Error(`--format must be "json" or "yaml" (got "${format}")`)
  }

  const concurrency = values.concurrency ? Number(values.concurrency) : 8
  if (!Number.isFinite(concurrency) || concurrency < 1) {
    throw new Error(`--concurrency must be a positive integer`)
  }

  return {
    url: values.url,
    out: values.out ?? join("output", "resumes"),
    ids: (values.id as string[] | undefined) ?? [],
    languages: (values.language as string[] | undefined) ?? [],
    name: values.name,
    format: format as "json" | "yaml",
    filename: values.filename ?? DEFAULT_FILENAME_TEMPLATE,
    pretty: values["no-pretty"] ? false : true,
    concurrency,
    dryRun: Boolean(values["dry-run"]),
    quiet: Boolean(values.quiet),
    verbose: Boolean(values.verbose),
    listSeparator: pickListSeparator(values["list-separator"]),
  }
}

// ---------------------------------------------------------------------------
// Filename generation
// ---------------------------------------------------------------------------

/**
 * Slugifies a display name for safe use in filenames. Preserves letters
 * from any script (Unicode "Letter" category) so non-Latin names like
 * "李明" or "Jörg" survive intact.
 */
export function slugifyName(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ""
  return (
    trimmed
      // Normalise combining marks so accents survive the letter class check.
      .normalize("NFC")
      .toLowerCase()
      // Whitespace → underscore
      .replace(/\s+/g, "_")
      // Keep Unicode letters/numbers, plus `_` and `-`.
      .replace(/[^\p{L}\p{N}_-]/gu, "")
  )
}

export function renderFilename(
  template: string,
  values: { name: string; lang: string; id: string; ext: string },
): string {
  return template.replace(/\{(name|lang|id|ext)\}/g, (_, key: string) => {
    const v = values[key as keyof typeof values]
    return v ?? ""
  })
}

/**
 * Given a set of already-claimed filenames, returns a unique variant
 * (appending `-<id>` and, if still colliding, `-2`, `-3`, …).
 */
export function uniqueFilename(
  desired: string,
  claimed: Set<string>,
  id: string,
): string {
  if (!claimed.has(desired)) return desired

  const dot = desired.lastIndexOf(".")
  const stem = dot === -1 ? desired : desired.slice(0, dot)
  const ext = dot === -1 ? "" : desired.slice(dot)
  const shortId = id.replace(/[^a-z0-9]/gi, "").slice(0, 8) || "x"

  let candidate = `${stem}-${shortId}${ext}`
  let n = 2
  while (claimed.has(candidate)) {
    candidate = `${stem}-${shortId}-${n}${ext}`
    n += 1
  }
  return candidate
}

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

async function serialize(
  data: JSONResumeSchema,
  format: "json" | "yaml",
  pretty: boolean,
): Promise<string> {
  if (format === "json") {
    return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)
  }
  // YAML: loaded lazily so the JSON path avoids paying its import cost.
  let yaml: typeof import("yaml")
  try {
    yaml = await import("yaml")
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`failed to load the "yaml" package: ${message}`)
  }
  return yaml.stringify(data)
}

// ---------------------------------------------------------------------------
// Concurrency-limited runner
// ---------------------------------------------------------------------------

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  task: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let cursor = 0
  const workerCount = Math.min(limit, items.length)

  const workers = Array.from({ length: workerCount }, async () => {
    while (true) {
      const i = cursor++
      if (i >= items.length) return
      results[i] = await task(items[i], i)
    }
  })
  await Promise.all(workers)
  return results
}

// ---------------------------------------------------------------------------
// Filtering
// ---------------------------------------------------------------------------

function filterResumes(
  resumes: GraphQLResume[],
  opts: Pick<CliOptions, "ids" | "languages" | "name">,
): GraphQLResume[] {
  const idSet = new Set(opts.ids)
  const langSet = new Set(opts.languages.map((l) => l.toLowerCase()))
  const nameNeedle = opts.name?.toLowerCase()

  return resumes.filter((r) => {
    if (idSet.size > 0 && !idSet.has(r.id)) return false
    if (langSet.size > 0) {
      const langValue = r.language?.value?.toLowerCase()
      if (!langValue || !langSet.has(langValue)) return false
    }
    if (nameNeedle) {
      const name = r.basicInformation?.name?.toLowerCase() ?? ""
      if (!name.includes(nameNeedle)) return false
    }
    return true
  })
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

interface ExportSummary {
  total: number
  written: number
  skipped: number
  failed: number
  warnings: number
  files: string[]
}

export async function runExport(cli: CliOptions): Promise<ExportSummary> {
  const started = Date.now()
  const log: StructuredLogger = createLogger(cli)

  const graphqlUrl = cli.url ?? process.env.NEXT_PUBLIC_GRAPHQL_URL
  if (!graphqlUrl) {
    throw new Error(
      "GraphQL URL not provided. Pass --url or set NEXT_PUBLIC_GRAPHQL_URL.",
    )
  }

  const outputDir = resolve(process.cwd(), cli.out)

  log.banner(
    "📦 Export Resumes",
    "GraphQL → JSON Resume files",
  )

  log.section("Config")
  const filters: string[] = []
  if (cli.ids.length > 0) filters.push(`id=${cli.ids.join(",")}`)
  if (cli.languages.length > 0)
    filters.push(`language=${cli.languages.join(",")}`)
  if (cli.name) filters.push(`name=${cli.name}`)
  log.kv([
    ["GraphQL URL", graphqlUrl],
    ["Output dir", outputDir],
    ["Format", `${cli.format}${cli.format === "json" && !cli.pretty ? " (compact)" : cli.format === "json" ? " (pretty)" : ""}`],
    ["Filename", cli.filename],
    ["Concurrency", String(cli.concurrency)],
    ["Filters", filters.length > 0 ? filters.join(", ") : c.dim("(none)")],
    ["Dry run", cli.dryRun ? c.magenta("yes") : c.dim("no")],
  ])

  log.section("Fetch")
  log.step(`Contacting GraphQL endpoint…`)
  const authToken = process.env.GRAPHQL_AUTH_TOKEN
  const allResumes = await fetchResumes({ url: graphqlUrl, authToken })
  log.ok(`Received ${c.bold(String(allResumes.length))} resume(s) from GraphQL`)

  const resumes = filterResumes(allResumes, cli)
  if (resumes.length === 0) {
    log.warn("No resumes matched the given filters.")
    log.summary(
      "Summary",
      [
        ["Discovered", allResumes.length],
        ["Written", 0],
        ["Skipped", allResumes.length],
        ["Failed", 0],
      ],
      `Duration: ${formatDuration(Date.now() - started)}`,
    )
    return {
      total: allResumes.length,
      written: 0,
      skipped: allResumes.length,
      failed: 0,
      warnings: 0,
      files: [],
    }
  }
  if (resumes.length !== allResumes.length) {
    log.info(
      `Filter matched ${c.bold(String(resumes.length))}/${allResumes.length} resume(s)`,
    )
  }

  if (!cli.dryRun) {
    await mkdir(outputDir, { recursive: true })
  }

  const claimedFilenames = new Set<string>()
  const summary: ExportSummary = {
    total: resumes.length,
    written: 0,
    skipped: 0,
    failed: 0,
    warnings: 0,
    files: [],
  }

  // Pre-compute filenames sequentially so collision resolution is deterministic.
  const plan = resumes.map((resume, index) => {
    const displayName =
      resume.basicInformation?.name || resume.title || `Resume_${index + 1}`
    const langValue = resume.language?.value || "unknown"
    const ext = cli.format === "yaml" ? "yaml" : "json"
    const rendered = renderFilename(cli.filename, {
      name: slugifyName(displayName) || `resume_${index + 1}`,
      lang: langValue,
      id: resume.id,
      ext,
    })
    const filename = uniqueFilename(rendered, claimedFilenames, resume.id)
    claimedFilenames.add(filename)
    return { resume, displayName, langValue, filename }
  })

  // Resolve once up-front so a bad --list-separator fails before any I/O.
  const listSeparator = resolveSeparatorRegex(cli.listSeparator)
  if (cli.listSeparator) {
    log.verbose(
      `list-separator=${JSON.stringify(cli.listSeparator)} (override)`,
    )
  }

  log.section(cli.dryRun ? "Convert (dry-run)" : "Export")

  await runWithConcurrency(plan, cli.concurrency, async (item) => {
    const { resume, displayName, langValue, filename } = item
    const filepath = join(outputDir, filename)
    const label = `${displayName} ${c.dim(`(${langValue})`)}`

    let warningCount = 0
    const onWarn = (msg: string) => {
      warningCount += 1
      log.verbose(`[${displayName}] ${msg}`)
    }

    try {
      const jsonResume = convertToJSONResume(resume, {
        onWarn,
        listSeparator,
      })
      const content = await serialize(jsonResume, cli.format, cli.pretty)

      // Validation warnings (non-fatal).
      const validationIssues: string[] = []
      if (!jsonResume.basics?.name) validationIssues.push("missing name")
      if (!jsonResume.basics?.email) validationIssues.push("missing email")
      if (!jsonResume.work?.length) validationIssues.push("no work experience")
      if (!jsonResume.education?.length) validationIssues.push("no education")
      for (const issue of validationIssues) {
        log.verbose(`[${displayName}] ${issue}`)
      }
      summary.warnings += warningCount + validationIssues.length

      const size = c.dim(`(${formatBytes(Buffer.byteLength(content))})`)
      if (cli.dryRun) {
        log.raw(
          `  ${sym.dryRun} ${label} ${sym.arrow} ${c.cyan(filename)} ${size}`,
        )
      } else {
        await writeFile(filepath, content, "utf-8")
        log.raw(
          `  ${sym.ok} ${label} ${sym.arrow} ${c.cyan(filename)} ${size}`,
        )
        summary.files.push(filepath)
      }
      summary.written += 1
    } catch (err) {
      summary.failed += 1
      const message = err instanceof Error ? err.message : String(err)
      log.fail(`${label}: ${message}`)
    }
  })

  log.summary(
    "Summary",
    [
      ["Written", summary.written],
      ["Failed", summary.failed],
      ["Warnings", summary.warnings],
      ["Output", outputDir],
    ],
    `Duration: ${formatDuration(Date.now() - started)}${cli.dryRun ? "  ·  dry-run (no files written)" : ""}`,
  )
  return summary
}

async function main(): Promise<void> {
  let cli: CliOptions
  try {
    cli = parseCliOptions(process.argv.slice(2))
  } catch (err) {
    process.stderr.write(
      `${sym.fail} ${err instanceof Error ? err.message : String(err)}\n`,
    )
    printHelp()
    process.exit(2)
  }

  try {
    const summary = await runExport(cli)
    // Exit non-zero only if every conversion failed (partial success is OK).
    if (summary.total > 0 && summary.written === 0 && summary.failed > 0) {
      process.exit(1)
    }
  } catch (err) {
    process.stderr.write(
      `${sym.fail} ${err instanceof Error ? err.message : String(err)}\n`,
    )
    process.exit(1)
  }
}

// Run only when invoked as a script (not when imported by tests).
// import.meta.url will match process.argv[1] when this is the entry point.
const isEntryPoint =
  typeof process !== "undefined" &&
  process.argv[1] &&
  import.meta.url === `file://${resolve(process.argv[1])}`

if (isEntryPoint) {
  void main()
}
