/**
 * Types for the generate-resume-files script.
 */

export interface RunConfig {
  inputDir: string
  outputDir: string
  theme: string
  /**
   * Explicit list of input files. When non-empty, `inputDir` is
   * ignored and only these files are rendered.
   */
  files: string[]
  languages: string[]
  name?: string
  concurrency: number
  flat: boolean
  stripProfilePic: boolean
  rewriteElegantFonts: boolean | "auto"
  dryRun: boolean
  quiet: boolean
  verbose: boolean
  /** User-provided list separator (undefined ⇒ built-in default). */
  listSeparator?: string
}

export interface ResumeFile {
  /** Absolute path to the JSON file on disk. */
  path: string
  /** Base filename (no extension). */
  basename: string
  /** Slugified person/resume name parsed from the filename. */
  name: string
  /** Language code parsed from the filename (or "unknown"). */
  language: string
}

/** Minimal JSON Resume shape needed by the renderer. */
export type JSONResume = Record<string, unknown>

/** Signature of `resumed.render`. */
export type Renderer = (resume: JSONResume, theme: unknown) => Promise<string>
