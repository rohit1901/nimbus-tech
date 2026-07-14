import { readdir, stat } from "node:fs/promises"
import { basename, extname, isAbsolute, join, resolve } from "node:path"

import type { ResumeFile } from "./types"

/**
 * Extract `name` and `language` from a filename produced by
 * `export:resumes`. Default template is `{name}_{lang}_resume.json`.
 *
 * The parser is intentionally tolerant: if the final segment before
 * `resume` doesn't look like a language code, it's treated as part of
 * the name and `language` falls back to `"unknown"`.
 */
export function parseFilename(filepath: string): Omit<ResumeFile, "path"> {
  const filename = basename(filepath, extname(filepath))
  const parts = filename.split("_")

  if (parts[parts.length - 1] === "resume") parts.pop()

  let language = "unknown"
  let name = parts.join("_")

  if (parts.length >= 2) {
    const candidate = parts[parts.length - 1]
    if (candidate.length <= 5 && /^[a-z-]+$/i.test(candidate)) {
      language = candidate
      name = parts.slice(0, -1).join("_")
    }
  }

  return { basename: filename, name, language }
}

export interface DiscoverOptions {
  inputDir: string
  /** Extensions accepted (with leading dot). Default: `[".json"]`. */
  extensions?: string[]
}

/**
 * Lists all resume JSON files in the input directory.
 * Throws if the directory doesn't exist so callers can present a helpful
 * message to the user.
 */
export async function discoverResumeFiles(
  options: DiscoverOptions,
): Promise<ResumeFile[]> {
  const { inputDir, extensions = [".json"] } = options
  let entries: string[]
  try {
    entries = await readdir(inputDir)
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === "ENOENT") {
      throw new Error(
        `Input directory does not exist: ${inputDir}\n` +
          `Run "npm run export:resumes" first, or pass --file <path> for a custom JSON file.`,
      )
    }
    if (code === "ENOTDIR") {
      throw new Error(
        `--input is not a directory: ${inputDir}\n` +
          `If you want to render a single file, use --file ${inputDir} instead.`,
      )
    }
    if (code === "EACCES" || code === "EPERM") {
      throw new Error(
        `Permission denied reading: ${inputDir}\n` +
          `On macOS this is usually TCC: grant your terminal (or Node) access to this folder in\n` +
          `  System Settings → Privacy & Security → Files and Folders (or "Full Disk Access").\n` +
          `Workarounds:\n` +
          `  • Move the JSON files into the repo (e.g. output/resumes) and re-run.\n` +
          `  • Or render a specific file directly: --file ${inputDir}/<name>.json`,
      )
    }
    throw err
  }

  return entries
    .filter((entry) => extensions.includes(extname(entry).toLowerCase()))
    .map((entry) => {
      const path = join(inputDir, entry)
      return { path, ...parseFilename(path) }
    })
    .sort((a, b) => a.basename.localeCompare(b.basename))
}

/**
 * Resolves an explicit list of file paths (e.g. from `--file`) into
 * `ResumeFile` entries. Paths are resolved against `cwd` when relative.
 * Throws with a helpful message if a path is missing or points at a
 * non-file entry. Metadata (name/language) is derived by reusing the
 * same `parseFilename` heuristic used for directory scans, so custom
 * inputs slot into the same downstream logic.
 */
export async function resolveExplicitFiles(
  paths: string[],
  options: { cwd?: string } = {},
): Promise<ResumeFile[]> {
  const cwd = options.cwd ?? process.cwd()
  const results = await Promise.all(
    paths.map(async (p) => {
      const absolute = isAbsolute(p) ? p : resolve(cwd, p)
      let info
      try {
        info = await stat(absolute)
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") {
          throw new Error(`--file not found: ${p}`)
        }
        throw err
      }
      if (!info.isFile()) {
        throw new Error(`--file is not a regular file: ${p}`)
      }
      return { path: absolute, ...parseFilename(absolute) }
    }),
  )
  return results
}

export interface FilterOptions {
  languages: string[]
  name?: string
}

/** Applies `--language` and `--name` filters. */
export function filterResumeFiles(
  files: ResumeFile[],
  opts: FilterOptions,
): ResumeFile[] {
  const langSet = new Set(opts.languages.map((l) => l.toLowerCase()))
  const nameNeedle = opts.name?.toLowerCase()

  return files.filter((f) => {
    if (langSet.size > 0 && !langSet.has(f.language.toLowerCase())) return false
    if (nameNeedle && !f.name.toLowerCase().includes(nameNeedle)) return false
    return true
  })
}
