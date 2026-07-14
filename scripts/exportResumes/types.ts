/**
 * Types for the export-resumes script.
 *
 * `GraphQLResume` mirrors the shape returned by the `Resumes` query
 * (see `./query.ts`). `JSONResumeSchema` mirrors the JSON Resume standard:
 * https://jsonresume.org/schema
 */

export interface GraphQLImage {
  id?: string
  src?: string | null
  alt?: string | null
  preview?: string | null
}

export interface GraphQLLocation {
  id?: string
  address?: string | null
  postalCode?: string | null
  city?: string | null
  countryCode?: string | null
  region?: string | null
}

export interface GraphQLProfile {
  id?: string
  network?: string | null
  username?: string | null
  url?: string | null
}

export interface GraphQLBasicInformation {
  id?: string
  name?: string | null
  label?: string | null
  image?: GraphQLImage | null
  email?: string | null
  phone?: string | null
  url?: string | null
  summary?: string | null
  location?: GraphQLLocation | null
  profiles?: GraphQLProfile[] | null
}

export interface GraphQLHighlight {
  id?: string
  value?: string | null
}

export interface GraphQLWork {
  id?: string
  name?: string | null
  position?: string | null
  url?: string | null
  startDate?: string | null
  endDate?: string | null
  summary?: string | null
  highlights?: GraphQLHighlight[] | null
}

export interface GraphQLVolunteer {
  id?: string
  organization?: string | null
  position?: string | null
  url?: string | null
  startDate?: string | null
  endDate?: string | null
  summary?: string | null
  /** Schema returns a single String (e.g. newline-separated). */
  highlights?: string | null
}

export interface GraphQLEducation {
  id?: string
  institution?: string | null
  url?: string | null
  area?: string | null
  studyType?: string | null
  startDate?: string | null
  endDate?: string | null
  score?: string | null
  /** Schema returns a single String (e.g. newline-separated). */
  courses?: string | null
}

export interface GraphQLAward {
  id?: string
  title?: string | null
  date?: string | null
  awarder?: string | null
  summary?: string | null
  url?: string | null
}

export interface GraphQLCertificate {
  id?: string
  title?: string | null
  description?: string | null
  link?: string | null
}

export interface GraphQLPublication {
  id?: string
  name?: string | null
  publisher?: string | null
  releaseDate?: string | null
  url?: string | null
  summary?: string | null
}

export interface GraphQLSkill {
  id?: string
  name?: string | null
  level?: string | null
  /** Schema returns a single String (comma-separated in practice). */
  keywords?: string | null
}

export interface GraphQLResumeLanguage {
  id?: string
  language?: string | null
  fluency?: string | null
}

export interface GraphQLInterest {
  id?: string
  name?: string | null
  /** Schema returns a single String (comma-separated in practice). */
  keywords?: string | null
}

export interface GraphQLReference {
  id?: string
  name?: string | null
  reference?: string | null
}

export interface GraphQLProject {
  id?: string
  name?: string | null
  startDate?: string | null
  endDate?: string | null
  description?: string | null
  /** Schema returns a single String (e.g. newline-separated). */
  highlights?: string | null
  url?: string | null
}

export interface GraphQLLanguage {
  id?: string
  label?: string | null
  value?: string | null
}

export interface GraphQLResume {
  id: string
  title?: string | null
  language?: GraphQLLanguage | null
  basicInformation?: GraphQLBasicInformation | null
  work?: GraphQLWork[] | null
  volunteer?: GraphQLVolunteer[] | null
  education?: GraphQLEducation[] | null
  awards?: GraphQLAward[] | null
  certificates?: GraphQLCertificate[] | null
  publications?: GraphQLPublication[] | null
  skills?: GraphQLSkill[] | null
  resumeLanguages?: GraphQLResumeLanguage[] | null
  interests?: GraphQLInterest[] | null
  references?: GraphQLReference[] | null
  projects?: GraphQLProject[] | null
  createdAt?: string | null
  updatedAt?: string | null
}

/**
 * JSON Resume schema (subset actually emitted by the exporter).
 * Reference: https://jsonresume.org/schema
 */
export interface JSONResumeSchema {
  basics?: {
    name?: string
    label?: string
    image?: string
    email?: string
    phone?: string
    url?: string
    summary?: string
    location?: {
      address?: string
      postalCode?: string
      city?: string
      countryCode?: string
      region?: string
    }
    profiles?: Array<{
      network?: string
      username?: string
      url?: string
    }>
  }
  work?: Array<{
    name?: string
    position?: string
    url?: string
    startDate?: string
    endDate?: string
    summary?: string
    highlights?: string[]
  }>
  volunteer?: Array<{
    organization?: string
    position?: string
    url?: string
    startDate?: string
    endDate?: string
    summary?: string
    highlights?: string[]
  }>
  education?: Array<{
    institution?: string
    url?: string
    area?: string
    studyType?: string
    startDate?: string
    endDate?: string
    score?: string
    courses?: string[]
  }>
  awards?: Array<{
    title?: string
    date?: string
    awarder?: string
    summary?: string
    url?: string
  }>
  certificates?: Array<{
    name?: string
    url?: string
    /** Free-form description carried over from CMS. */
    summary?: string
  }>
  publications?: Array<{
    name?: string
    publisher?: string
    releaseDate?: string
    url?: string
    summary?: string
  }>
  skills?: Array<{
    name?: string
    level?: string
    keywords?: string[]
  }>
  languages?: Array<{
    language?: string
    fluency?: string
  }>
  interests?: Array<{
    name?: string
    keywords?: string[]
  }>
  references?: Array<{
    name?: string
    reference?: string
  }>
  projects?: Array<{
    name?: string
    startDate?: string
    endDate?: string
    description?: string
    highlights?: string[]
    url?: string
  }>
}
