import { MockPageContent } from "@/app/graphql/mockPageContent"
import { Query } from "@/app/graphql/types"
import { ErrorLike } from "@apollo/client"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

export const GET_PAGE_CONTENTS = gql`
  query GET_PAGE_CONTENTS {
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
          }
        }
        contentBenefits {
          id
          title
          benefits {
            id
            icon
            title
            description
          }
          benefitsCount
        }
        contentFeatures {
          id
          featureId
          title
          description
          longDescription
          visualization
        }
        contentFeaturesCount
        contentFaqs {
          id
          question
          answer
        }
        contentFaqsCount
        contentFaqSection {
          id
          title
          description
          faqs {
            id
            question
            answer
          }
          faqsCount
        }
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
          }
          testimonialsCount
          fallback {
            id
            rating
            badge {
              id
              icon
              label
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
          }
        }
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
              type {
                id
                label
              }
            }
            link
          }
          certificationsCount
        }
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
          }
          stepsCount
        }
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
          }
          valuesCount
          closing
        }
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
          }
          summaryCount
        }
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
          }
          items {
            id
            label
            href
            external
            icon
          }
          itemsCount
        }
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
        }
        contentMap {
          id
          title
          subheading
          description
        }
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
export function usePageContents() {
  const res = useQuery<Pick<Query, "pageContents">>(GET_PAGE_CONTENTS)
  if (res.error) {
    console.error(res.error)
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
    console.error(res.error)
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
