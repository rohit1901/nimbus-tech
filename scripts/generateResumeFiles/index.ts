#!/usr/bin/env node

/**
 * Generate Resume Files (HTML)
 *
 * Reads JSON Resume files produced by `export:resumes` and renders each
 * one to HTML using the `resumed` library and a JSON Resume theme.
 *
 * Usage:
 *   npm run generate:resume-files -- [options]
 *   npx tsx scripts/generateResumeFiles -- [options]
 *
 * See `printHelp()` for the full option list.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { parseArgs } from "node:util"

import {
  discoverResumeFiles,
  filterResumeFiles,
  resolveExplicitFiles,
} from "./discover"
import {
  loadResumed,
  loadTheme,
  normalizeListSeparators,
  renderResume,
  rewriteElegantThemeFonts,
  stripProfilePictures,
} from "./render"
import type { JSONResume, ResumeFile, RunConfig } from "./types"
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

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------

const DEFAULT_THEME = "jsonresume-theme-stackoverflow"
const KNOWN_THEME_PREFIXES = ["jsonresume-theme-", "@jsonresume/"]

function printHelp(): void {
  process.stdout.write(
    [
      "Generate HTML resume files from JSON Resume input.",
      "",
      "Usage: npm run generate:resume-files -- [options]",
      "",
      "Options:",
      "  --input <dir>              Input directory (default: output/resumes)",
      "  --file <path>              Explicit JSON Resume file (repeatable).",
      "                             When provided, --input is ignored.",
      "  --output <dir>             Output directory (default: output/resume-files)",
      `  --theme <name>             JSON Resume theme (default: ${DEFAULT_THEME})`,
      "                             Bare names are auto-prefixed with `jsonresume-theme-`",
      "  --language <code>          Only render this language (repeatable)",
      "  --name <fragment>          Case-insensitive name substring filter",
      "  --concurrency <n>          Max concurrent renders (default: 4)",
      `  --list-separator <str>     Marker used to split list-shaped fields`,
      `                             (default: "${DEFAULT_LIST_SEPARATOR}", env: RESUME_LIST_SEPARATOR)`,
      "  --flat                     Do not group output by language subdirectory",
      "  --no-strip-profile-pic     Keep profile pictures in the rendered HTML",
      "  --rewrite-elegant-fonts    Rewrite `fonts/…` URLs to unpkg (auto for elegant)",
      "  --no-rewrite-elegant-fonts Disable elegant-theme URL rewriting",
      "  --dry-run                  Render everything but don't write files",
      "  --quiet                    Suppress progress output",
      "  --verbose                  Extra per-file diagnostics",
      "  -h, --help                 Show this help",
      "",
    ].join("\n"),
  )
}

function normaliseThemeName(input: string): string {
  return KNOWN_THEME_PREFIXES.some((p) => input.startsWith(p))
    ? input
    : `jsonresume-theme-${input}`
}

function parseCliOptions(argv: string[]): RunConfig {
  const { values } = parseArgs({
    args: argv,
    allowPositionals: false,
    options: {
      input: { type: "string" },
      file: { type: "string", multiple: true },
      output: { type: "string" },
      theme: { type: "string" },
      language: { type: "string", multiple: true },
      name: { type: "string" },
      concurrency: { type: "string" },
      "list-separator": { type: "string" },
      flat: { type: "boolean" },
      "strip-profile-pic": { type: "boolean" },
      "no-strip-profile-pic": { type: "boolean" },
      "rewrite-elegant-fonts": { type: "boolean" },
      "no-rewrite-elegant-fonts": { type: "boolean" },
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

  const concurrency = values.concurrency ? Number(values.concurrency) : 4
  if (!Number.isFinite(concurrency) || concurrency < 1) {
    throw new Error(`--concurrency must be a positive integer`)
  }

  // Explicit --rewrite-elegant-fonts wins over --no-… ; otherwise fall
  // back to "auto" (decided later based on theme name).
  let rewriteElegantFonts: RunConfig["rewriteElegantFonts"] = "auto"
  if (values["no-rewrite-elegant-fonts"]) rewriteElegantFonts = false
  if (values["rewrite-elegant-fonts"]) rewriteElegantFonts = true

  return {
    inputDir: values.input ?? join("output", "resumes"),
    outputDir: values.output ?? join("output", "resume-files"),
    theme: normaliseThemeName(values.theme ?? DEFAULT_THEME),
    files: (values.file as string[] | undefined) ?? [],
    languages: (values.language as string[] | undefined) ?? [],
    name: values.name,
    concurrency,
    flat: Boolean(values.flat),
    stripProfilePic: values["no-strip-profile-pic"] ? false : true,
    rewriteElegantFonts,
    dryRun: Boolean(values["dry-run"]),
    quiet: Boolean(values.quiet),
    verbose: Boolean(values.verbose),
    listSeparator: pickListSeparator(values["list-separator"]),
  }
}

// ---------------------------------------------------------------------------
// Concurrency helper (same shape as the exporter)
// ---------------------------------------------------------------------------

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  task: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let cursor = 0
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (true) {
        const i = cursor++
        if (i >= items.length) return
        results[i] = await task(items[i], i)
      }
    },
  )
  await Promise.all(workers)
  return results
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

interface RunSummary {
  discovered: number
  rendered: number
  failed: number
  written: string[]
}

export async function runGenerate(cfg: RunConfig): Promise<RunSummary> {
  const started = Date.now()
  const log: StructuredLogger = createLogger(cfg)

  const outputRoot = resolve(process.cwd(), cfg.outputDir)
  const inputLabel =
    cfg.files.length > 0
      ? `<explicit --file, ${cfg.files.length} path(s)>`
      : cfg.inputDir

  log.banner(
    "🎨 Generate Resume Files",
    "JSON Resume → themed HTML",
  )

  log.section("Config")
  const filters: string[] = []
  if (cfg.languages.length > 0)
    filters.push(`language=${cfg.languages.join(",")}`)
  if (cfg.name) filters.push(`name=${cfg.name}`)
  log.kv([
    ["Input", inputLabel],
    ["Output dir", outputRoot],
    ["Theme", cfg.theme],
    ["Concurrency", String(cfg.concurrency)],
    ["Layout", cfg.flat ? "flat" : "by language"],
    ["Filters", filters.length > 0 ? filters.join(", ") : c.dim("(none)")],
    ["Strip profile pic", cfg.stripProfilePic ? c.green("yes") : c.dim("no")],
    [
      "Rewrite elegant fonts",
      cfg.rewriteElegantFonts === "auto"
        ? c.dim("auto")
        : cfg.rewriteElegantFonts
          ? c.green("yes")
          : c.dim("no"),
    ],
    ["Dry run", cfg.dryRun ? c.magenta("yes") : c.dim("no")],
  ])

  log.section("Discover")
  const allFiles =
    cfg.files.length > 0
      ? await resolveExplicitFiles(cfg.files)
      : await discoverResumeFiles({ inputDir: cfg.inputDir })
  log.ok(`Found ${c.bold(String(allFiles.length))} JSON resume file(s)`)

  const files = filterResumeFiles(allFiles, {
    languages: cfg.languages,
    name: cfg.name,
  })

  if (allFiles.length === 0) {
    log.warn(`No JSON resume files found in ${inputLabel}.`)
    log.summary(
      "Summary",
      [
        ["Discovered", 0],
        ["Rendered", 0],
        ["Failed", 0],
      ],
      `Duration: ${formatDuration(Date.now() - started)}`,
    )
    return { discovered: 0, rendered: 0, failed: 0, written: [] }
  }
  if (files.length === 0) {
    log.warn(`No files matched the given filters.`)
    log.summary(
      "Summary",
      [
        ["Discovered", allFiles.length],
        ["Rendered", 0],
        ["Failed", 0],
      ],
      `Duration: ${formatDuration(Date.now() - started)}`,
    )
    return {
      discovered: allFiles.length,
      rendered: 0,
      failed: 0,
      written: [],
    }
  }
  if (files.length !== allFiles.length) {
    log.info(
      `Filter matched ${c.bold(String(files.length))}/${allFiles.length} file(s)`,
    )
  }

  log.section("Prepare")
  log.step(`Loading resumed + ${c.cyan(cfg.theme)}…`)
  const [render, theme] = await Promise.all([
    loadResumed(),
    loadTheme(cfg.theme),
  ])
  log.ok(`Loaded resumed + ${c.cyan(cfg.theme)}`)

  // Decide post-processors up front.
  const postProcess: Array<(html: string) => string> = []
  const shouldRewriteFonts =
    cfg.rewriteElegantFonts === true ||
    (cfg.rewriteElegantFonts === "auto" &&
      cfg.theme === "jsonresume-theme-elegant")
  if (shouldRewriteFonts) postProcess.push((h) => rewriteElegantThemeFonts(h))
  if (cfg.stripProfilePic) postProcess.push(stripProfilePictures)
  log.verbose(
    `post-processors: ${postProcess.length > 0 ? postProcess.length : "none"}`,
  )

  if (!cfg.dryRun) await mkdir(outputRoot, { recursive: true })

  // Ensure per-language subdirectories exist up front (idempotent, cheap).
  if (!cfg.dryRun && !cfg.flat) {
    const langs = new Set(files.map((f) => f.language))
    await Promise.all(
      Array.from(langs).map((lang) =>
        mkdir(join(outputRoot, lang), { recursive: true }),
      ),
    )
  }

  const summary: RunSummary = {
    discovered: allFiles.length,
    rendered: 0,
    failed: 0,
    written: [],
  }

  // Resolve the list separator once up-front so a malformed value
  // fails before any I/O happens.
  const listSeparator = resolveSeparatorRegex(cfg.listSeparator)
  if (cfg.listSeparator) {
    log.verbose(
      `list-separator=${JSON.stringify(cfg.listSeparator)} (override)`,
    )
  }

  log.section(cfg.dryRun ? "Render (dry-run)" : "Render")

  await runWithConcurrency(files, cfg.concurrency, async (file) => {
    const label = `${file.basename} ${c.dim(`(${file.language})`)}`
    try {
      const outPath = destinationFor(file, outputRoot, cfg.flat)
      const resume = await readResumeJson(file, listSeparator)
      const html = await renderResume(resume, { render, theme, postProcess })
      const size = c.dim(`(${formatBytes(Buffer.byteLength(html))})`)

      if (cfg.dryRun) {
        log.raw(
          `  ${sym.dryRun} ${label} ${sym.arrow} ${c.cyan(outPath)} ${size}`,
        )
      } else {
        await writeFile(outPath, html, "utf-8")
        log.raw(
          `  ${sym.ok} ${label} ${sym.arrow} ${c.cyan(outPath)} ${size}`,
        )
        summary.written.push(outPath)
      }
      summary.rendered += 1
    } catch (err) {
      summary.failed += 1
      const message = err instanceof Error ? err.message : String(err)
      log.fail(`${label}: ${message}`)
    }
  })

  log.summary(
    "Summary",
    [
      ["Discovered", summary.discovered],
      ["Rendered", summary.rendered],
      ["Failed", summary.failed],
      ["Output", outputRoot],
    ],
    `Duration: ${formatDuration(Date.now() - started)}${cfg.dryRun ? "  ·  dry-run (no files written)" : ""}`,
  )
  return summary
}

function destinationFor(
  file: ResumeFile,
  outputRoot: string,
  flat: boolean,
): string {
  const filename = `${file.name}.html`
  return flat
    ? join(outputRoot, `${file.name}_${file.language}.html`)
    : join(outputRoot, file.language, filename)
}

async function readResumeJson(
  file: ResumeFile,
  listSeparator: RegExp,
): Promise<JSONResume> {
  const raw = await readFile(file.path, "utf-8")
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`invalid JSON: ${message}`)
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(
      `invalid JSON Resume: expected an object at top level, got ${
        Array.isArray(parsed) ? "array" : parsed === null ? "null" : typeof parsed
      }`,
    )
  }
  // Normalise CMS list markers (✌🏻 by default; overridable via
  // --list-separator / RESUME_LIST_SEPARATOR) into proper array items
  // so themes render one <li> per bullet. Idempotent — already-clean
  // docs are untouched.
  return normalizeListSeparators(parsed as JSONResume, listSeparator)
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  let cfg: RunConfig
  try {
    cfg = parseCliOptions(process.argv.slice(2))
  } catch (err) {
    process.stderr.write(
      `${sym.fail} ${err instanceof Error ? err.message : String(err)}\n`,
    )
    printHelp()
    process.exit(2)
  }

  try {
    const summary = await runGenerate(cfg)
    if (
      summary.discovered > 0 &&
      summary.rendered === 0 &&
      summary.failed > 0
    ) {
      process.exit(1)
    }
  } catch (err) {
    process.stderr.write(
      `${sym.fail} ${err instanceof Error ? err.message : String(err)}\n`,
    )
    process.exit(1)
  }
}

const isEntryPoint =
  typeof process !== "undefined" &&
  process.argv[1] &&
  import.meta.url === `file://${resolve(process.argv[1])}`

if (isEntryPoint) {
  void main()
}
