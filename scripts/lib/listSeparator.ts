/**
 * Shared list-separator logic used by both `export:resumes` and
 * `generate:resume-files`. Kept in one place so the two scripts can't
 * drift.
 *
 * The default separator is `\u270c\ud83c\udffb` (victory hand + light skin tone) \u2014 the
 * marker used inside CMS text fields to indicate list boundaries.
 *
 * Users may override the default via:
 *   \u2022 The `--list-separator <string>` CLI flag on either script.
 *   \u2022 The `RESUME_LIST_SEPARATOR` environment variable.
 *
 * Precedence: CLI flag > env var > default.
 */

/** Human-readable default separator. */
export const DEFAULT_LIST_SEPARATOR = "\u270c\ud83c\udffb"

/**
 * Default matcher. Uses the bare victory-hand codepoint (U+270C) with
 * an optional emoji skin-tone modifier so all of `\u270c`, `\u270c\ud83c\udffb`, `\u270c\ud83c\udffc`,
 * `\u270c\ud83c\udffd`, `\u270c\ud83c\udffe`, `\u270c\ud83c\udfff` split. This is intentionally more
 * permissive than the literal default constant \u2014 handy when the CMS
 * data mixes skin tones.
 */
export const DEFAULT_LIST_SEPARATOR_RE = /\u270C[\u{1F3FB}-\u{1F3FF}]?/u

/** Escapes regex metacharacters in a literal string. */
function escapeForRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Resolves the final separator regex given an optional user override.
 * When no override is supplied, returns the smart default matcher.
 * When an override is supplied, matches it as a literal string with
 * Unicode-aware flags.
 */
export function resolveSeparatorRegex(override?: string | null): RegExp {
  if (override == null) return DEFAULT_LIST_SEPARATOR_RE
  if (override.length === 0) {
    throw new Error("list separator cannot be an empty string")
  }
  return new RegExp(escapeForRegExp(override), "u")
}

/**
 * Picks the effective separator string from (in order):
 *   CLI value > env var (`RESUME_LIST_SEPARATOR`) > `undefined` (= default).
 *
 * Returning `undefined` lets the caller pass it straight through to
 * `resolveSeparatorRegex`, which knows how to fall back.
 *
 * The `env` parameter is typed loosely as a plain string map so tests
 * (and non-Node hosts) don't need to construct a full `ProcessEnv`.
 */
export function pickListSeparator(
  cliValue: string | undefined,
  env: Record<string, string | undefined> = process.env,
): string | undefined {
  if (cliValue != null) return cliValue
  const envValue = env.RESUME_LIST_SEPARATOR
  if (envValue != null && envValue.length > 0) return envValue
  return undefined
}
