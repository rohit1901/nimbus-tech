import { Resume } from "@/app/graphql/types"

/**
 * JSON Resume Schema Types
 * Based on https://jsonresume.org/schema
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
  }>
  certificates?: Array<{
    name?: string
    date?: string
    issuer?: string
    url?: string
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

/**
 * Converts a GraphQL Resume response to JSON Resume schema format
 * @param resume - The resume object from GET_RESUME query
 * @returns JSON Resume formatted object
 */
export function convertToJSONResume(resume: Resume): JSONResumeSchema {
  const jsonResume: JSONResumeSchema = {}

  // Convert basics
  if (resume.basicInformation) {
    const basic = resume.basicInformation
    jsonResume.basics = {
      name: basic.name || undefined,
      label: basic.label || undefined,
      image: basic.image?.src || basic.image?.preview || undefined,
      email: basic.email || undefined,
      phone: basic.phone || undefined,
      url: basic.url || undefined,
      summary: basic.summary || undefined,
    }

    // Convert location
    if (basic.location) {
      jsonResume.basics.location = {
        address: basic.location.address || undefined,
        postalCode: basic.location.postalCode || undefined,
        city: basic.location.city || undefined,
        countryCode: basic.location.countryCode || undefined,
        region: basic.location.region || undefined,
      }
    }

    // Convert profiles
    if (basic.profiles && basic.profiles.length > 0) {
      jsonResume.basics.profiles = basic.profiles.map((profile) => ({
        network: profile.network || undefined,
        username: profile.username || undefined,
        url: profile.url || undefined,
      }))
    }
  }

  // Convert work experience
  if (resume.work && resume.work.length > 0) {
    jsonResume.work = resume.work.map((job) => ({
      name: job.name || undefined,
      position: job.position || undefined,
      url: job.url || undefined,
      startDate: job.startDate || undefined,
      endDate: job.endDate || undefined,
      summary: job.summary || undefined,
      highlights:
        job.highlights && job.highlights.length > 0
          ? (job.highlights.map((h) => h.value).filter(Boolean) as string[])
          : undefined,
    }))
  }

  // Convert volunteer experience
  if (resume.volunteer && resume.volunteer.length > 0) {
    jsonResume.volunteer = resume.volunteer.map((vol) => ({
      organization: vol.organization || undefined,
      position: vol.position || undefined,
      url: vol.url || undefined,
      startDate: vol.startDate || undefined,
      endDate: vol.endDate || undefined,
      summary: vol.summary || undefined,
      highlights:
        vol.highlights && Array.isArray(vol.highlights)
          ? (vol.highlights.filter(Boolean) as string[])
          : undefined,
    }))
  }

  // Convert education
  if (resume.education && resume.education.length > 0) {
    jsonResume.education = resume.education.map((edu) => ({
      institution: edu.institution || undefined,
      url: edu.url || undefined,
      area: edu.area || undefined,
      studyType: edu.studyType || undefined,
      startDate: edu.startDate || undefined,
      endDate: edu.endDate || undefined,
      score: edu.score || undefined,
      courses:
        edu.courses && Array.isArray(edu.courses)
          ? (edu.courses.filter(Boolean) as string[])
          : undefined,
    }))
  }

  // Convert awards
  if (resume.awards && resume.awards.length > 0) {
    jsonResume.awards = resume.awards.map((award) => ({
      title: award.title || undefined,
      date: award.date || undefined,
      awarder: award.awarder || undefined,
      summary: award.summary || undefined,
    }))
  }

  // Convert certificates
  if (resume.certificates && resume.certificates.length > 0) {
    jsonResume.certificates = resume.certificates.map((cert) => ({
      name: cert.title || undefined,
      date: undefined, // Not available in GraphQL schema
      issuer: undefined, // Not available in GraphQL schema
      url: cert.link || undefined,
    }))
  }

  // Convert publications
  if (resume.publications && resume.publications.length > 0) {
    jsonResume.publications = resume.publications.map((pub) => ({
      name: pub.name || undefined,
      publisher: pub.publisher || undefined,
      releaseDate: pub.releaseDate || undefined,
      url: pub.url || undefined,
      summary: pub.summary || undefined,
    }))
  }

  // Convert skills
  if (resume.skills && resume.skills.length > 0) {
    jsonResume.skills = resume.skills.map((skill) => ({
      name: skill.name || undefined,
      level: skill.level || undefined,
      keywords:
        skill.keywords && Array.isArray(skill.keywords)
          ? (skill.keywords.filter(Boolean) as string[])
          : undefined,
    }))
  }

  // Convert languages
  if (resume.resumeLanguages && resume.resumeLanguages.length > 0) {
    jsonResume.languages = resume.resumeLanguages.map((lang) => ({
      language: lang.language || undefined,
      fluency: lang.fluency || undefined,
    }))
  }

  // Convert interests
  if (resume.interests && resume.interests.length > 0) {
    jsonResume.interests = resume.interests.map((interest) => ({
      name: interest.name || undefined,
      keywords:
        interest.keywords && Array.isArray(interest.keywords)
          ? (interest.keywords.filter(Boolean) as string[])
          : undefined,
    }))
  }

  // Convert references
  if (resume.references && resume.references.length > 0) {
    jsonResume.references = resume.references.map((ref) => ({
      name: ref.name || undefined,
      reference: ref.reference || undefined,
    }))
  }

  // Convert projects
  if (resume.projects && resume.projects.length > 0) {
    jsonResume.projects = resume.projects.map((project) => ({
      name: project.name || undefined,
      startDate: project.startDate || undefined,
      endDate: project.endDate || undefined,
      description: project.description || undefined,
      highlights:
        project.highlights && Array.isArray(project.highlights)
          ? (project.highlights.filter(Boolean) as string[])
          : undefined,
      url: project.url || undefined,
    }))
  }

  return jsonResume
}

/**
 * Converts multiple resumes to JSON Resume format
 * @param resumes - Array of resumes from GET_RESUME query
 * @returns Array of JSON Resume formatted objects
 */
export function convertResumesToJSONResume(
  resumes: Resume[],
): JSONResumeSchema[] {
  return resumes.map(convertToJSONResume)
}

/**
 * Exports a JSON Resume to a downloadable JSON file
 * @param jsonResume - The JSON Resume object
 * @param filename - Optional filename (defaults to 'resume.json')
 */
export function downloadJSONResume(
  jsonResume: JSONResumeSchema,
  filename: string = "resume.json",
): void {
  const dataStr = JSON.stringify(jsonResume, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Validates if a resume object has the minimum required fields for JSON Resume
 * @param resume - The resume to validate
 * @returns Object with isValid flag and array of missing required fields
 */
export function validateJSONResume(resume: Resume): {
  isValid: boolean
  missingFields: string[]
  warnings: string[]
} {
  const missingFields: string[] = []
  const warnings: string[] = []

  // Check required/recommended fields
  if (!resume.basicInformation?.name) {
    missingFields.push("basics.name")
  }

  if (!resume.basicInformation?.email) {
    warnings.push("basics.email (recommended)")
  }

  if (!resume.basicInformation?.summary) {
    warnings.push("basics.summary (recommended)")
  }

  if (!resume.work || resume.work.length === 0) {
    warnings.push("work experience (recommended)")
  }

  if (!resume.education || resume.education.length === 0) {
    warnings.push("education (recommended)")
  }

  if (!resume.skills || resume.skills.length === 0) {
    warnings.push("skills (recommended)")
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    warnings,
  }
}
