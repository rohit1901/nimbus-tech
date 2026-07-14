import type { GraphQLResume } from "./types"

/**
 * GraphQL query fetched by the exporter.
 *
 * Notes:
 * - `awards.url` is selected so it can be forwarded to JSON Resume.
 * - `certificates` only expose `title`/`description`/`link` in the schema;
 *   `date`/`issuer` are therefore not queried.
 */
export const GET_RESUMES_QUERY = /* GraphQL */ `
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

export interface GraphQLError {
  message: string
  path?: (string | number)[]
  extensions?: Record<string, unknown>
}

export interface FetchResumesOptions {
  url: string
  authToken?: string
  /** Fetch implementation to use (defaults to global fetch). Injectable for tests. */
  fetchImpl?: typeof fetch
  /** Signal to abort the request. */
  signal?: AbortSignal
}

/**
 * Fetches resumes from the GraphQL endpoint using the global `fetch` API.
 * Throws on network errors, HTTP errors, or any non-empty `errors` array
 * in the GraphQL response.
 */
export async function fetchResumes(
  options: FetchResumesOptions,
): Promise<GraphQLResume[]> {
  const { url, authToken, fetchImpl = fetch, signal } = options

  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
  }
  if (authToken) {
    headers.authorization = authToken.startsWith("Bearer ")
      ? authToken
      : `Bearer ${authToken}`
  }

  const response = await fetchImpl(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: GET_RESUMES_QUERY }),
    signal,
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(
      `GraphQL request failed: HTTP ${response.status} ${response.statusText}` +
        (body ? `\n${body.slice(0, 500)}` : ""),
    )
  }

  const payload = (await response.json()) as {
    data?: { resumes?: GraphQLResume[] }
    errors?: GraphQLError[]
  }

  if (payload.errors && payload.errors.length > 0) {
    const summary = payload.errors
      .map((e) => `- ${e.message}${e.path ? ` (at ${e.path.join(".")})` : ""}`)
      .join("\n")
    throw new Error(`GraphQL returned errors:\n${summary}`)
  }

  return payload.data?.resumes ?? []
}
