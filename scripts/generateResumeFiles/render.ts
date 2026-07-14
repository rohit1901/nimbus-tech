import type { JSONResume, Renderer } from "./types"
import { DEFAULT_LIST_SEPARATOR_RE } from "../lib/listSeparator"

/** Backwards-compatible alias for the default list-separator matcher. */
const LIST_SEPARATOR_RE = DEFAULT_LIST_SEPARATOR_RE

/**
 * JSON Resume fields that should be arrays of short bullet strings.
 * If any element still contains the CMS list marker (✌🏻) we split it
 * in place so themes render the items as separate `<li>` entries.
 *
 * Only these known-list fields are touched — free-form fields like
 * `summary` / `description` are preserved verbatim.
 */
const LIST_FIELDS_BY_SECTION: Record<string, string[]> = {
  work: ["highlights"],
  volunteer: ["highlights"],
  projects: ["highlights"],
  education: ["courses"],
  skills: ["keywords"],
  interests: ["keywords"],
}

function splitOnMarker(value: string, separator: RegExp): string[] {
  return value
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Walks the known list-shaped fields of a JSON Resume and splits any
 * string element containing the CMS list marker into multiple entries.
 * The input object is mutated in place and returned for convenience.
 *
 * Safe to run on already-normalised documents: entries without the
 * marker pass through unchanged.
 *
 * @param resume    JSON Resume document (mutated in place).
 * @param separator Marker regex. Defaults to the shared
 *                  `DEFAULT_LIST_SEPARATOR_RE`. Pass
 *                  `resolveSeparatorRegex(override)` to honour a CLI
 *                  or env override.
 */
export function normalizeListSeparators(
  resume: JSONResume,
  separator: RegExp = LIST_SEPARATOR_RE,
): JSONResume {
  for (const [section, fields] of Object.entries(LIST_FIELDS_BY_SECTION)) {
    const items = (resume as Record<string, unknown>)[section]
    if (!Array.isArray(items)) continue
    for (const entry of items) {
      if (!entry || typeof entry !== "object") continue
      const record = entry as Record<string, unknown>
      for (const field of fields) {
        const original = record[field]

        // Case A: field is a single string — replace with split array.
        if (typeof original === "string") {
          if (separator.test(original)) {
            record[field] = splitOnMarker(original, separator)
          }
          continue
        }

        // Case B: field is already an array — expand any items that
        // still contain the marker.
        if (Array.isArray(original)) {
          let touched = false
          const expanded: unknown[] = []
          for (const item of original) {
            if (typeof item === "string" && separator.test(item)) {
              expanded.push(...splitOnMarker(item, separator))
              touched = true
            } else {
              expanded.push(item)
            }
          }
          if (touched) record[field] = expanded
        }
      }
    }
  }
  return resume
}

/**
 * Post-processors that mutate the HTML string emitted by a JSON Resume
 * theme. Kept as pure functions so they're easy to unit-test.
 */

/**
 * Hides `.profile-pic` elements by injecting a small stylesheet before
 * the closing `</style>` tag of the first inline stylesheet. If no
 * `</style>` tag exists, appends a fresh `<style>` block just before
 * `</head>`. As a last resort, the HTML is returned unchanged.
 */
export function stripProfilePictures(html: string): string {
  const css = `
.profile-pic { display: none !important; }
@media print { .profile-pic { display: none !important; } }
`
  if (html.includes("</style>")) {
    return html.replace("</style>", `${css}</style>`)
  }
  if (html.includes("</head>")) {
    return html.replace("</head>", `<style>${css}</style></head>`)
  }
  return html
}

/**
 * The `jsonresume-theme-elegant` theme references `fonts/…` paths and
 * protocol-relative `//unpkg.com` URLs that break when the HTML is
 * opened via `file://`. Rewrites them to absolute `https://unpkg.com`
 * URLs pinned to the version below.
 *
 * This helper is a no-op for other themes; the caller decides when to
 * invoke it (see `--rewrite-elegant-fonts`).
 */
export function rewriteElegantThemeFonts(
  html: string,
  version = "1.12.0",
): string {
  const base = `https://unpkg.com/jsonresume-theme-elegant@${version}/assets/icomoon/fonts/`
  return html
    .replace(/url\('fonts\//g, `url('${base}`)
    .replace(/url\("fonts\//g, `url("${base}`)
    .replace(/src="fonts\//g, `src="${base}`)
    .replace(/href="fonts\//g, `href="${base}`)
    .replace(/url\("\/\/unpkg\.com/g, 'url("https://unpkg.com')
    .replace(/url\('\/\/unpkg\.com/g, "url('https://unpkg.com")
}

export interface RenderOptions {
  render: Renderer
  theme: unknown
  postProcess?: Array<(html: string) => string>
}

/**
 * Renders a JSON Resume to HTML and applies the given post-processors
 * in order. Errors from the theme propagate to the caller.
 */
export async function renderResume(
  resume: JSONResume,
  options: RenderOptions,
): Promise<string> {
  const { render, theme, postProcess = [] } = options
  let html = await render(resume, theme)
  for (const step of postProcess) html = step(html)
  return html
}

/**
 * Lazily loads the `resumed` library. Kept behind a function so the
 * import cost is only paid when we actually generate HTML (not when
 * running --help or tests).
 */
export async function loadResumed(): Promise<Renderer> {
  try {
    const mod = (await import("resumed")) as { render: Renderer }
    return mod.render
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(
      `Failed to load "resumed". Install it with:\n` +
        `  npm install --save-dev resumed\n\n${message}`,
    )
  }
}

/** Lazily loads a JSON Resume theme by module name. */
export async function loadTheme(themeName: string): Promise<unknown> {
  try {
    return await import(themeName)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(
      `Theme "${themeName}" is not installed.\n` +
        `Install it with:\n  npm install --save-dev ${themeName}\n\n${message}`,
    )
  }
}
