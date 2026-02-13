import { MockLanguages, MockPageContent } from "@/app/graphql/mockPageContent"
import { Query } from "@/app/graphql/types"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

export const GET_PAGE_CONTENTS = gql`
  query PageContents {
    pageContents {
      id
      slug
      title
      description
      image {
        id
        src
        alt
        width
        height
        fill
        type {
          id
          label
        }
      }
      cta {
        id
        label
        href
        external
        type {
          id
          label
        }
        language {
          id
          label
          value
        }
      }
      sections {
        id
        type
        contentHero {
          id
          title
          description
          subHeading
          banner {
            id
            label
            href
            external
            icon
            additional {
              id
              icon
              text
              language {
                id
                label
                value
              }
            }
            language {
              id
              label
              value
            }
          }
          cta {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          language {
            id
            label
            value
          }
        }
        contentHeroCount
        contentBenefits {
          id
          title
          benefits {
            id
            icon
            title
            description
            language {
              id
              label
              value
            }
          }
          benefitsCount
          language {
            id
            label
            value
          }
        }
        contentBenefitsCount
        contentFeatures {
          id
          featureId
          title
          description
          longDescription
          visualization
          language {
            id
            label
            value
          }
        }
        contentFeaturesCount
        contentFaqSection {
          id
          title
          description
          faqs {
            id
            question
            answer
            language {
              id
              label
              value
            }
          }
          faqsCount
          language {
            id
            label
            value
          }
        }
        contentFaqSectionCount
        contentTestimonials {
          id
          title
          background {
            id
            src
            alt
            width
            height
            fill
            type {
              id
              label
            }
          }
          backgroundCount
          testimonials {
            id
            rating
            badge {
              id
              icon
              label
              language {
                id
                label
                value
              }
            }
            name
            role
            company
            image {
              id
              src
              alt
              width
              height
              fill
              type {
                id
                label
              }
            }
            content
            language {
              id
              label
              value
            }
          }
          testimonialsCount
          fallback {
            id
            rating
            badge {
              id
              icon
              label
              language {
                id
                label
                value
              }
            }
            name
            role
            company
            image {
              id
              src
              alt
              width
              height
              fill
              type {
                id
                label
              }
            }
            content
            language {
              id
              label
              value
            }
          }
          language {
            id
            label
            value
          }
        }
        contentTestimonialsCount
        contentCertifications {
          id
          title
          description
          cta {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          certifications {
            id
            title
            description
            image {
              id
              src
              alt
              width
              height
              fill
            }
            link
            language {
              id
              label
              value
            }
          }
          certificationsCount
          language {
            id
            label
            value
          }
        }
        contentCertificationsCount
        contentApproach {
          id
          title
          description
          steps {
            id
            stepId
            type
            title
            description
            activityTime
            language {
              id
              label
              value
            }
          }
          stepsCount
          language {
            id
            label
            value
          }
        }
        contentApproachCount
        contentAbout {
          id
          heading
          intro
          valuesTitle
          values {
            id
            label
            description
            icon
            language {
              id
              label
              value
            }
          }
          valuesCount
          closing
          language {
            id
            label
            value
          }
        }
        contentAboutCount
        contentAnalytics {
          id
          heading
          subheading
          stats {
            id
            totalDeployments
            deploymentChange
            deploymentChangePercent
            changePeriod
            language {
              id
              label
              value
            }
          }
          tableHeadings
          summary {
            id
            name
            deployments
            uptime
            clientSatisfaction
            efficiency
            revenueGrowth
            bgColor
            changeType
            language {
              id
              label
              value
            }
          }
          summaryCount
          language {
            id
            label
            value
          }
        }
        contentAnalyticsCount
        contentNavigation {
          id
          title
          description
          image {
            id
            src
            alt
            width
            height
            fill
            type {
              id
              label
            }
          }
          cta {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          items {
            id
            label
            href
            external
            icon
            language {
              id
              label
              value
            }
            type {
              id
              label
            }
            sectionKey {
              id
              label
            }
          }
          itemsCount
          language {
            id
            label
            value
          }
        }
        contentNavigationCount
        contentFooter {
          id
          title
          sections {
            id
            title {
              id
              label
            }
            items {
              id
              label
              href
              external
              icon
              type {
                id
                label
              }
              sectionKey {
                id
                label
              }
              language {
                id
                label
                value
              }
            }
            itemsCount
            language {
              id
              label
              value
            }
          }
          sectionsCount
          language {
            id
            label
            value
          }
        }
        contentFooterCount
        contentCta {
          id
          title
          description
          ctas {
            id
            label
            href
            external
            type {
              id
              label
            }
            language {
              id
              label
              value
            }
          }
          ctasCount
          background {
            id
            src
            alt
            width
            height
            fill
            type {
              id
              label
            }
          }
          backgroundCount
          language {
            id
            label
            value
          }
        }
        contentCtaCount
        contentMap {
          id
          title
          subheading
          description
          language {
            id
            label
            value
          }
        }
        contentMapCount
      }
      language {
        id
        label
        value
      }
    }
  }
`

export const GET_FOOTER = gql`
  query GET_FOOTER {
    footers {
      id
      title
      sections {
        id
        title
        items {
          id
          label
          href
          external
          icon
        }
        itemsCount
      }
      sectionsCount
      languages {
        id
        label
        value
      }
      languagesCount
    }
  }
`

export const GET_LANGUAGES = gql`
  query Languages {
    languages {
      id
      label
      value
    }
  }
`

export const GET_RESUME_SHORT = gql`
  query Resumes {
    resumes {
      basicInformation {
        id
        name
        image {
          id
          src
          alt
          width
          height
          fill
          type {
            id
            label
          }
          preview
        }
        email
        profiles {
          id
          network
          username
          url
        }
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_RESUME = gql`
  query Resumes {
    resumes {
      id
      title
      basicInformation {
        id
        name
        label
        image {
          id
          src
          alt
          width
          height
          fill
          type {
            id
            label
          }
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
          language {
            id
            label
            value
          }
        }
        profiles {
          id
          network
          username
          url
          language {
            id
            label
            value
          }
        }
        profilesCount
        language {
          id
          label
          value
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
        highlightsCount
        image {
          id
          src
          alt
          width
          height
          fill
          type {
            id
            label
          }
          preview
        }
        language {
          id
          label
          value
        }
      }
      workCount
      volunteer {
        id
        organization
        position
        url
        startDate
        endDate
        summary
        highlights
        language {
          id
          label
          value
        }
      }
      volunteerCount
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
        language {
          id
          label
          value
        }
      }
      educationCount
      awards {
        id
        title
        date
        awarder
        summary
        url
        language {
          id
          label
          value
        }
      }
      awardsCount
      certificates {
        id
        title
        description
        image {
          id
          src
          alt
          width
          height
          fill
          type {
            id
            label
          }
          preview
        }
        link
        language {
          id
          label
          value
        }
      }
      certificatesCount
      publications {
        id
        name
        publisher
        releaseDate
        url
        summary
        language {
          id
          label
          value
        }
      }
      publicationsCount
      skills {
        id
        name
        level
        keywords
        language {
          id
          label
          value
        }
      }
      skillsCount
      resumeLanguages {
        id
        language
        fluency
        uiLanguage {
          id
          label
          value
        }
      }
      resumeLanguagesCount
      interests {
        id
        name
        keywords
        language {
          id
          label
          value
        }
      }
      interestsCount
      references {
        id
        name
        reference
        language {
          id
          label
          value
        }
      }
      referencesCount
      projects {
        id
        name
        startDate
        endDate
        description
        highlights
        url
        image {
          id
          src
          alt
          width
          height
          fill
          type {
            id
            label
          }
          preview
        }
        language {
          id
          label
          value
        }
      }
      projectsCount
      language {
        id
        label
        value
      }
      createdAt
      updatedAt
    }
  }
`

export function usePageContents() {
  const res = useQuery<Pick<Query, "pageContents">>(GET_PAGE_CONTENTS)
  if (res.error) {
    // console.error(res.error)
    return {
      data: { pageContents: MockPageContent.data.pageContents },
      loading: false,
      error: undefined,
    }
  }
  return res
}

export function useFooterSection() {
  const res = useQuery<Pick<Query, "footers">>(GET_FOOTER)
  if (res.error) {
    // console.error(res.error)
    return {
      data: {
        footers: [MockPageContent.data.pageContents[0].sections.contentFooter],
      },
      loading: false,
      error: undefined,
    }
  }
  return res
}

export function useLanguage() {
  const res = useQuery<Pick<Query, "languages">>(GET_LANGUAGES)
  if (res.error) {
    // console.error(res.error)
    return {
      data: { languages: MockLanguages.data.languages },
      loading: false,
      error: undefined,
    }
  }
  return res
}

export function useResumes(kind: "short" | "full" = "short") {
  const res = useQuery<Pick<Query, "resumes">>(
    kind === "short" ? GET_RESUME_SHORT : GET_RESUME,
  )
  return res
}
