#!/usr/bin/env node

/**
 * Export Resumes Script
 *
 * Fetches resume data from GraphQL API, converts to JSON Resume format,
 * and saves to output files.
 *
 * Usage:
 *   npx tsx scripts/exportResumes.ts
 *   npm run export:resumes
 */

import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client"
import { writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"
import { config } from "dotenv"
import fetch from "cross-fetch"

// Load environment variables
config()

// GraphQL Query
const GET_RESUME = gql`
  query Resumes {
    resumes {
      id
      title
      language {
        id
        label
        value
      }
      basicInformation {
        id
        name
        label
        image {
          id
          src
          alt
          preview
        }
        email
        phone
        url
        summary
        location {
          id
          address
          postalCode
          city
          countryCode
          region
        }
        profiles {
          id
          network
          username
          url
        }
      }
      work {
        id
        name
        position
        url
        startDate
        endDate
        summary
        highlights {
          id
          value
        }
      }
      volunteer {
        id
        organization
        position
        url
        startDate
        endDate
        summary
        highlights
      }
      education {
        id
        institution
        url
        area
        studyType
        startDate
        endDate
        score
        courses
      }
      awards {
        id
        title
        date
        awarder
        summary
        url
      }
      certificates {
        id
        title
        description
        link
      }
      publications {
        id
        name
        publisher
        releaseDate
        url
        summary
      }
      skills {
        id
        name
        level
        keywords
      }
      resumeLanguages {
        id
        language
        fluency
      }
      interests {
        id
        name
        keywords
      }
      references {
        id
        name
        reference
      }
      projects {
        id
        name
        startDate
        endDate
        description
        highlights
        url
      }
      createdAt
      updatedAt
    }
  }
`

// JSON Resume Schema Interface
interface JSONResumeSchema {
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
 * Converts GraphQL Resume to JSON Resume format
 */
function convertToJSONResume(resume: any): JSONResumeSchema {
  const jsonResume: JSONResumeSchema = {}

  // Convert basics
  if (resume.basicInformation) {
    const basic = resume.basicInformation
    jsonResume.basics = {
      name: basic.name || undefined,
      label: basic.label || undefined,
      image: basic.image?.preview || basic.image?.src || undefined,
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
      jsonResume.basics.profiles = basic.profiles.map((profile: any) => ({
        network: profile.network || undefined,
        username: profile.username || undefined,
        url: profile.url || undefined,
      }))
    }
  }

  // Convert work experience
  if (resume.work && resume.work.length > 0) {
    jsonResume.work = resume.work.map((job: any) => ({
      name: job.name || undefined,
      position: job.position || undefined,
      url: job.url || undefined,
      startDate: job.startDate || undefined,
      endDate: job.endDate || undefined,
      summary: job.summary || undefined,
      highlights:
        job.highlights && job.highlights.length > 0
          ? job.highlights.map((h: any) => h.value).filter(Boolean)
          : undefined,
    }))
  }

  // Convert volunteer experience
  if (resume.volunteer && resume.volunteer.length > 0) {
    jsonResume.volunteer = resume.volunteer.map((vol: any) => ({
      organization: vol.organization || undefined,
      position: vol.position || undefined,
      url: vol.url || undefined,
      startDate: vol.startDate || undefined,
      endDate: vol.endDate || undefined,
      summary: vol.summary || undefined,
      highlights:
        vol.highlights && Array.isArray(vol.highlights)
          ? vol.highlights.filter(Boolean)
          : undefined,
    }))
  }

  // Convert education
  if (resume.education && resume.education.length > 0) {
    jsonResume.education = resume.education.map((edu: any) => ({
      institution: edu.institution || undefined,
      url: edu.url || undefined,
      area: edu.area || undefined,
      studyType: edu.studyType || undefined,
      startDate: edu.startDate || undefined,
      endDate: edu.endDate || undefined,
      score: edu.score || undefined,
      courses:
        edu.courses && Array.isArray(edu.courses)
          ? edu.courses.filter(Boolean)
          : undefined,
    }))
  }

  // Convert awards
  if (resume.awards && resume.awards.length > 0) {
    jsonResume.awards = resume.awards.map((award: any) => ({
      title: award.title || undefined,
      date: award.date || undefined,
      awarder: award.awarder || undefined,
      summary: award.summary || undefined,
    }))
  }

  // Convert certificates
  if (resume.certificates && resume.certificates.length > 0) {
    jsonResume.certificates = resume.certificates.map((cert: any) => ({
      name: cert.title || undefined,
      date: undefined,
      issuer: undefined,
      url: cert.link || undefined,
    }))
  }

  // Convert publications
  if (resume.publications && resume.publications.length > 0) {
    jsonResume.publications = resume.publications.map((pub: any) => ({
      name: pub.name || undefined,
      publisher: pub.publisher || undefined,
      releaseDate: pub.releaseDate || undefined,
      url: pub.url || undefined,
      summary: pub.summary || undefined,
    }))
  }

  // Convert skills
  if (resume.skills && resume.skills.length > 0) {
    jsonResume.skills = resume.skills.map((skill: any) => ({
      name: skill.name || undefined,
      level: skill.level || undefined,
      keywords:
        skill.keywords && Array.isArray(skill.keywords)
          ? skill.keywords.filter(Boolean)
          : undefined,
    }))
  }

  // Convert languages
  if (resume.resumeLanguages && resume.resumeLanguages.length > 0) {
    jsonResume.languages = resume.resumeLanguages.map((lang: any) => ({
      language: lang.language || undefined,
      fluency: lang.fluency || undefined,
    }))
  }

  // Convert interests
  if (resume.interests && resume.interests.length > 0) {
    jsonResume.interests = resume.interests.map((interest: any) => ({
      name: interest.name || undefined,
      keywords:
        interest.keywords && Array.isArray(interest.keywords)
          ? interest.keywords.filter(Boolean)
          : undefined,
    }))
  }

  // Convert references
  if (resume.references && resume.references.length > 0) {
    jsonResume.references = resume.references.map((ref: any) => ({
      name: ref.name || undefined,
      reference: ref.reference || undefined,
    }))
  }

  // Convert projects
  if (resume.projects && resume.projects.length > 0) {
    jsonResume.projects = resume.projects.map((project: any) => ({
      name: project.name || undefined,
      startDate: project.startDate || undefined,
      endDate: project.endDate || undefined,
      description: project.description || undefined,
      highlights:
        project.highlights && Array.isArray(project.highlights)
          ? project.highlights.filter(Boolean)
          : undefined,
      url: project.url || undefined,
    }))
  }

  return jsonResume
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting resume export...\n")

  // Get GraphQL URL from environment
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL

  if (!graphqlUrl) {
    console.error(
      "❌ Error: NEXT_PUBLIC_GRAPHQL_URL not found in environment variables",
    )
    console.error("Please set it in your .env file")
    process.exit(1)
  }

  console.log(`📡 Connecting to GraphQL API: ${graphqlUrl}`)

  // Create Apollo Client with HttpLink for Node.js compatibility
  const client = new ApolloClient({
    link: new HttpLink({
      uri: graphqlUrl,
      fetch,
    }),
    cache: new InMemoryCache(),
  })

  try {
    // Fetch resumes from GraphQL
    console.log("📥 Fetching resume data...")
    const { data } = await client.query<{ resumes: any[] }>({
      query: GET_RESUME,
    })

    if (!data?.resumes || data.resumes.length === 0) {
      console.log("⚠️  No resumes found in GraphQL")
      process.exit(0)
    }

    console.log(`✅ Found ${data.resumes.length} resume(s)\n`)

    // Create output directory
    const outputDir = join(process.cwd(), "output", "resumes")
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
      console.log(`📁 Created output directory: ${outputDir}\n`)
    }

    // Process each resume
    data.resumes.forEach((resume: any, index: number) => {
      const name = resume.basicInformation?.name || `Resume_${index + 1}`
      const languageValue = resume.language?.value || "unknown"
      const languageLabel = resume.language?.label || "Unknown"

      console.log(`🔄 Processing: ${name} (${languageLabel})`)

      // Convert to JSON Resume format
      const jsonResume = convertToJSONResume(resume)

      // Generate filename with language suffix
      const baseName = name
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "")
      const filename = `${baseName}_${languageValue}_resume.json`
      const filepath = join(outputDir, filename)

      // Save to file
      writeFileSync(filepath, JSON.stringify(jsonResume, null, 2), "utf-8")
      console.log(`   ✓ Saved to: ${filepath}`)

      // Validation
      const hasName = !!jsonResume.basics?.name
      const hasEmail = !!jsonResume.basics?.email
      const hasWork = jsonResume.work && jsonResume.work.length > 0
      const hasEducation =
        jsonResume.education && jsonResume.education.length > 0

      if (!hasName) {
        console.log("   ⚠️  Warning: Missing name")
      }
      if (!hasEmail) {
        console.log("   ⚠️  Warning: Missing email")
      }
      if (!hasWork) {
        console.log("   ⚠️  Warning: No work experience")
      }
      if (!hasEducation) {
        console.log("   ⚠️  Warning: No education")
      }

      console.log("")
    })

    console.log("✨ Export completed successfully!")
    console.log(`📂 Output directory: ${outputDir}`)
  } catch (error) {
    console.error("❌ Error fetching or converting resumes:")
    console.error(error)
    process.exit(1)
  }
}

// Run the script
main()
