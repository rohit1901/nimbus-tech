import type {
  GraphQLResume,
  JSONResumeSchema,
} from "./types"
import {
  DEFAULT_LIST_SEPARATOR_RE,
} from "../lib/listSeparator"

/**
 * Bounds used by `normalizeDate` to reject clearly corrupt values.
 * Computed once at module load; the exporter is short-lived so the
 * "current year" is a stable snapshot.
 */
const MIN_YEAR = 1900
const MAX_YEAR = new Date().getFullYear() + 10

export interface NormalizeDateOptions {
  /** Called with a human-readable reason when a date is rejected. */
  onInvalid?: (reason: string, input: string) => void
}

/**
 * Normalises a date-like string to `YYYY-MM-DD` (JSON Resume convention).
 * Returns `undefined` for empty, unparseable, or out-of-range inputs.
 */
export function normalizeDate(
  dateString: string | null | undefined,
  options: NormalizeDateOptions = {},
): string | undefined {
  if (!dateString) return undefined

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    options.onInvalid?.("unparseable date", dateString)
    return undefined
  }

  const year = date.getUTCFullYear()
  if (year < MIN_YEAR || year > MAX_YEAR) {
    options.onInvalid?.(`year ${year} out of range`, dateString)
    return undefined
  }

  const mm = String(date.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(date.getUTCDate()).padStart(2, "0")
  return `${year}-${mm}-${dd}`
}

/**
 * Comparator for JSON Resume entries with `startDate` and/or `endDate` in
 * ISO `YYYY-MM-DD` form. Sorts reverse-chronologically:
 *   1. Entries with no `endDate` (current / ongoing) come first.
 *   2. Then by `endDate` descending.
 *   3. Ties are broken by `startDate` descending.
 *   4. Missing `startDate` sinks to the bottom of its tier.
 *
 * Relies on ISO date strings sorting lexicographically. Do not use for
 * unnormalised or non-ISO dates.
 */
export function byReverseChronological<
  T extends { startDate?: string; endDate?: string },
>(a: T, b: T): number {
  const aEnd = a.endDate ?? "9999-99-99"
  const bEnd = b.endDate ?? "9999-99-99"
  if (aEnd !== bEnd) return bEnd.localeCompare(aEnd)
  return (b.startDate ?? "").localeCompare(a.startDate ?? "")
}

/**
 * Character used in the CMS to separate list items inside a single
 * text field (e.g. project highlights). Kept as a constant so it's
 * easy to grep for and change.
 *
 * The default is imported from `../lib/listSeparator` so both
 * `export:resumes` and `generate:resume-files` agree on the marker.
 * Callers can override it via `ConvertOptions.listSeparator`.
 */
const DEFAULT_SEPARATOR_RE = DEFAULT_LIST_SEPARATOR_RE

/**
 * Splits a free-form string field into a list of non-empty tokens.
 *
 * Several CMS fields (skill/interest keywords, education courses,
 * project & volunteer highlights) are stored as a single `String` in
 * the schema but need to be exposed as arrays in JSON Resume.
 *
 * Split priority (first non-trivial split wins):
 *   1. `✌🏻` (or the caller-provided separator)   — explicit CMS marker
 *   2. newlines                                       — authored line breaks
 *   3. `,` / `;`                                      — comma-separated lists
 *
 * Commas are the last resort because they also occur inside sentences.
 */
export function splitList(
  value: string | null | undefined,
  separator: RegExp = DEFAULT_SEPARATOR_RE,
): string[] | undefined {
  if (value == null) return undefined
  const raw = String(value)
  if (!raw.trim()) return undefined

  const bySeparator = raw
    .split(separator)
    .map((s) => s.trim())
    .filter(Boolean)
  if (bySeparator.length > 1) return bySeparator

  const byNewline = raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (byNewline.length > 1) return byNewline

  const byPunctuation = raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (byPunctuation.length > 0) return byPunctuation

  return undefined
}

/** Returns `value` when non-empty, otherwise `undefined`. */
function str(value: string | null | undefined): string | undefined {
  if (value == null) return undefined
  const trimmed = String(value).trim()
  return trimmed.length > 0 ? trimmed : undefined
}

/**
 * Removes properties whose value is `undefined`, and drops nested objects
 * that become empty as a result. Keeps arrays as-is.
 */
function compact<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value as Record<string, unknown>).length === 0
    ) {
      continue
    }
    out[key] = value
  }
  return out as T
}

export interface ConvertOptions {
  /** Called with a warning message emitted during conversion. */
  onWarn?: (message: string) => void
  /**
   * Regex matching the list-item marker used inside CMS string fields.
   * Defaults to the shared `DEFAULT_LIST_SEPARATOR_RE` (✌ with optional
   * skin-tone modifier). Pass `resolveSeparatorRegex(userValue)` to
   * honour a CLI/env override.
   */
  listSeparator?: RegExp
}

/**
 * Converts a GraphQL Resume to the JSON Resume schema.
 * The conversion is pure and side-effect free (except for optional
 * warning callbacks) so it is safe to run in parallel.
 */
export function convertToJSONResume(
  resume: GraphQLResume,
  options: ConvertOptions = {},
): JSONResumeSchema {
  const warn = options.onWarn
  const onInvalid = warn
    ? (reason: string, input: string) =>
        warn(`Skipped date (${reason}): ${input}`)
    : undefined
  const separator = options.listSeparator ?? DEFAULT_SEPARATOR_RE
  const split = (v: string | null | undefined) => splitList(v, separator)

  const jsonResume: JSONResumeSchema = {}

  // basics -----------------------------------------------------------------
  const basic = resume.basicInformation
  if (basic) {
    const basics: JSONResumeSchema["basics"] = compact({
      name: str(basic.name),
      label: str(basic.label),
      // JSON Resume expects a URL; prefer full src, fall back to preview.
      image: str(basic.image?.src) ?? str(basic.image?.preview),
      email: str(basic.email),
      phone: str(basic.phone),
      url: str(basic.url),
      summary: str(basic.summary),
    })

    if (basic.location) {
      const location = compact({
        address: str(basic.location.address),
        postalCode: str(basic.location.postalCode),
        city: str(basic.location.city),
        countryCode: str(basic.location.countryCode),
        region: str(basic.location.region),
      })
      if (Object.keys(location).length > 0) basics.location = location
    }

    if (basic.profiles && basic.profiles.length > 0) {
      const profiles = basic.profiles
        .map((p) =>
          compact({
            network: str(p.network),
            username: str(p.username),
            url: str(p.url),
          }),
        )
        .filter((p) => Object.keys(p).length > 0)
      if (profiles.length > 0) basics.profiles = profiles
    }

    if (Object.keys(basics).length > 0) jsonResume.basics = basics
  }

  // work -------------------------------------------------------------------
  if (resume.work && resume.work.length > 0) {
    jsonResume.work = resume.work
      .map((job) =>
        compact({
          name: str(job.name),
          position: str(job.position),
          url: str(job.url),
          startDate: normalizeDate(job.startDate, { onInvalid }),
          endDate: normalizeDate(job.endDate, { onInvalid }),
          summary: str(job.summary),
          highlights:
            job.highlights && job.highlights.length > 0
              ? job.highlights
                  .map((h) => str(h.value))
                  .filter((v): v is string => Boolean(v))
              : undefined,
        }),
      )
      .sort(byReverseChronological)
  }

  // volunteer --------------------------------------------------------------
  if (resume.volunteer && resume.volunteer.length > 0) {
    jsonResume.volunteer = resume.volunteer.map((vol) =>
      compact({
        organization: str(vol.organization),
        position: str(vol.position),
        url: str(vol.url),
        startDate: normalizeDate(vol.startDate, { onInvalid }),
        endDate: normalizeDate(vol.endDate, { onInvalid }),
        summary: str(vol.summary),
        highlights: split(vol.highlights),
      }),
    )
  }

  // education --------------------------------------------------------------
  if (resume.education && resume.education.length > 0) {
    jsonResume.education = resume.education.map((edu) =>
      compact({
        institution: str(edu.institution),
        url: str(edu.url),
        area: str(edu.area),
        studyType: str(edu.studyType),
        startDate: normalizeDate(edu.startDate, { onInvalid }),
        endDate: normalizeDate(edu.endDate, { onInvalid }),
        score: str(edu.score),
        courses: split(edu.courses),
      }),
    )
  }

  // awards -----------------------------------------------------------------
  if (resume.awards && resume.awards.length > 0) {
    jsonResume.awards = resume.awards.map((award) =>
      compact({
        title: str(award.title),
        date: normalizeDate(award.date, { onInvalid }),
        awarder: str(award.awarder),
        summary: str(award.summary),
        url: str(award.url),
      }),
    )
  }

  // certificates -----------------------------------------------------------
  // Schema exposes only title/description/link; date & issuer are omitted
  // rather than emitting `undefined` placeholders.
  if (resume.certificates && resume.certificates.length > 0) {
    jsonResume.certificates = resume.certificates.map((cert) =>
      compact({
        name: str(cert.title),
        url: str(cert.link),
        summary: str(cert.description),
      }),
    )
  }

  // publications -----------------------------------------------------------
  if (resume.publications && resume.publications.length > 0) {
    jsonResume.publications = resume.publications.map((pub) =>
      compact({
        name: str(pub.name),
        publisher: str(pub.publisher),
        releaseDate: normalizeDate(pub.releaseDate, { onInvalid }),
        url: str(pub.url),
        summary: str(pub.summary),
      }),
    )
  }

  // skills -----------------------------------------------------------------
  if (resume.skills && resume.skills.length > 0) {
    jsonResume.skills = resume.skills.map((skill) =>
      compact({
        name: str(skill.name),
        level: str(skill.level),
        keywords: split(skill.keywords),
      }),
    )
  }

  // languages --------------------------------------------------------------
  if (resume.resumeLanguages && resume.resumeLanguages.length > 0) {
    jsonResume.languages = resume.resumeLanguages.map((lang) =>
      compact({
        language: str(lang.language),
        fluency: str(lang.fluency),
      }),
    )
  }

  // interests --------------------------------------------------------------
  if (resume.interests && resume.interests.length > 0) {
    jsonResume.interests = resume.interests.map((interest) =>
      compact({
        name: str(interest.name),
        keywords: split(interest.keywords),
      }),
    )
  }

  // references -------------------------------------------------------------
  if (resume.references && resume.references.length > 0) {
    jsonResume.references = resume.references.map((ref) =>
      compact({
        name: str(ref.name),
        reference: str(ref.reference),
      }),
    )
  }

  // projects ---------------------------------------------------------------
  if (resume.projects && resume.projects.length > 0) {
    jsonResume.projects = resume.projects
      .map((project) =>
        compact({
          name: str(project.name),
          startDate: normalizeDate(project.startDate, { onInvalid }),
          endDate: normalizeDate(project.endDate, { onInvalid }),
          description: str(project.description),
          highlights: split(project.highlights),
          url: str(project.url),
        }),
      )
      .sort(byReverseChronological)
  }

  return jsonResume
}
