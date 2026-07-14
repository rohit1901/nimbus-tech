/**
 * Structured, colorised terminal logger for the resume scripts.
 *
 * Design goals:
 *  - Zero runtime dependencies (raw ANSI escape codes).
 *  - Honours the `NO_COLOR` and `FORCE_COLOR` environment conventions.
 *  - Auto-disables colours when stdout is not a TTY (e.g. piped to a file
 *    or captured by CI logs), unless `FORCE_COLOR` overrides.
 *  - Consistent visual language across `export:resumes` and
 *    `generate:resume-files` so their combined output reads as one pipeline.
 *
 * Visual vocabulary:
 *   banner   – top-of-run title with subtitle
 *   section  – underlined section header
 *   kv       – aligned key/value block (used for config dumps)
 *   step/ok/fail/warn/info/dim – per-item lines with a leading glyph
 *   summary  – closing box of totals + a footer line
 */

// ---------------------------------------------------------------------------
// Colour detection
// ---------------------------------------------------------------------------

const NO_COLOR_ENV = process.env.NO_COLOR != null && process.env.NO_COLOR !== ""
const FORCE_COLOR_ENV =
  process.env.FORCE_COLOR != null &&
  process.env.FORCE_COLOR !== "" &&
  process.env.FORCE_COLOR !== "0"
const IS_TTY = Boolean(process.stdout.isTTY)

/**
 * Whether ANSI colour codes are emitted. `FORCE_COLOR` wins over
 * `NO_COLOR`; otherwise colours require a TTY.
 */
export const COLOR_ENABLED: boolean = FORCE_COLOR_ENV || (!NO_COLOR_ENV && IS_TTY)

function wrap(code: number): (s: string) => string {
  const open = `\x1b[${code}m`
  const close = "\x1b[0m"
  return (s: string) => (COLOR_ENABLED ? `${open}${s}${close}` : s)
}

/** Named colour / style helpers. Each is a no-op when colour is disabled. */
export const c = {
  bold: wrap(1),
  dim: wrap(2),
  italic: wrap(3),
  underline: wrap(4),
  red: wrap(31),
  green: wrap(32),
  yellow: wrap(33),
  blue: wrap(34),
  magenta: wrap(35),
  cyan: wrap(36),
  gray: wrap(90),
} as const

/**
 * Visual glyphs used across the pipeline. Falls back to ASCII markers
 * when colours are disabled so log files stay readable.
 */
export const sym = {
  ok: COLOR_ENABLED ? c.green("✔") : "[OK]",
  fail: COLOR_ENABLED ? c.red("✖") : "[X]",
  warn: COLOR_ENABLED ? c.yellow("⚠") : "[!]",
  info: COLOR_ENABLED ? c.blue("ℹ") : "[i]",
  step: COLOR_ENABLED ? c.cyan("›") : ">",
  arrow: COLOR_ENABLED ? c.dim("→") : "->",
  bullet: COLOR_ENABLED ? c.dim("•") : "*",
  dryRun: COLOR_ENABLED ? c.magenta("◇") : "[DR]",
} as const

// ---------------------------------------------------------------------------
// Byte-length aware helpers (visible width, ignoring ANSI codes)
// ---------------------------------------------------------------------------

const ANSI_RE = /\x1b\[[0-9;]*m/g
function visibleLength(s: string): number {
  return s.replace(ANSI_RE, "").length
}

function padVisible(s: string, width: number): string {
  const pad = Math.max(0, width - visibleLength(s))
  return s + " ".repeat(pad)
}

// ---------------------------------------------------------------------------
// Logger
// ---------------------------------------------------------------------------

export interface LoggerOptions {
  quiet?: boolean
  verbose?: boolean
}

export interface StructuredLogger {
  banner(title: string, subtitle?: string): void
  section(title: string): void
  kv(pairs: Array<[string, string]>): void
  step(msg: string): void
  ok(msg: string): void
  fail(msg: string): void
  warn(msg: string): void
  info(msg: string): void
  dim(msg: string): void
  verbose(msg: string): void
  raw(msg: string): void
  summary(
    title: string,
    rows: Array<[string, string | number]>,
    footer?: string,
  ): void
  blank(): void
}

/**
 * Creates a structured logger. Errors and warnings always go to stderr,
 * everything else goes to stdout. `quiet` silences stdout output but still
 * allows errors through; `verbose` unlocks the extra diagnostic channel.
 */
export function createLogger(opts: LoggerOptions = {}): StructuredLogger {
  const quiet = Boolean(opts.quiet)
  const verbose = Boolean(opts.verbose)

  const out = (line: string) => {
    if (!quiet) process.stdout.write(line + "\n")
  }
  const err = (line: string) => {
    process.stderr.write(line + "\n")
  }

  return {
    banner(title, subtitle) {
      const bar = c.dim("━".repeat(Math.max(24, visibleLength(title) + 4)))
      out("")
      out(`${c.bold(c.cyan(title))}`)
      if (subtitle) out(c.dim(subtitle))
      out(bar)
    },

    section(title) {
      out("")
      out(`${c.bold(title)}`)
    },

    kv(pairs) {
      if (pairs.length === 0) return
      const keyWidth = Math.max(...pairs.map(([k]) => visibleLength(k)))
      for (const [k, v] of pairs) {
        out(`  ${c.dim(padVisible(k, keyWidth))}  ${v}`)
      }
    },

    step(msg) {
      out(`  ${sym.step} ${msg}`)
    },

    ok(msg) {
      out(`  ${sym.ok} ${msg}`)
    },

    fail(msg) {
      err(`  ${sym.fail} ${msg}`)
    },

    warn(msg) {
      err(`  ${sym.warn} ${msg}`)
    },

    info(msg) {
      out(`  ${sym.info} ${msg}`)
    },

    dim(msg) {
      out(`  ${c.dim(msg)}`)
    },

    verbose(msg) {
      if (verbose && !quiet) out(`  ${c.dim(msg)}`)
    },

    raw(msg) {
      out(msg)
    },

    blank() {
      out("")
    },

    summary(title, rows, footer) {
      if (rows.length === 0) return
      const keyWidth = Math.max(...rows.map(([k]) => visibleLength(k)))
      const valueStrings = rows.map(([, v]) => String(v))
      const valueWidth = Math.max(...valueStrings.map(visibleLength))
      const width = Math.max(
        visibleLength(title),
        keyWidth + valueWidth + 4, // "  " + key + "  " + value
      )

      const rule = c.dim("─".repeat(width + 2))
      out("")
      out(`${c.bold(title)}`)
      out(rule)
      for (let i = 0; i < rows.length; i += 1) {
        const [k, v] = rows[i]
        const value = valueStrings[i]
        // Numeric zero counts render dim to reduce visual noise.
        const rendered =
          typeof v === "number" && v === 0 ? c.dim(value) : value
        out(`  ${padVisible(c.dim(k), keyWidth)}  ${rendered}`)
      }
      out(rule)
      if (footer) out(`  ${c.dim(footer)}`)
    },
  }
}

/**
 * Format a duration in milliseconds as a compact human string
 * (e.g. `842ms`, `3.4s`, `1m 12s`).
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`
  const mins = Math.floor(ms / 60_000)
  const secs = Math.round((ms % 60_000) / 1000)
  return `${mins}m ${secs}s`
}

/**
 * Compact human-readable byte size (KiB / MiB) for log summaries.
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`
}
