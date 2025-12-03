import { Query } from "@/app/graphql/types"
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
        width
        height
        src
        alt
        fill
        className
      }
      cta {
        id
        label
        href
        external
      }
      sections {
        id
        type
        contentHero {
          id
          subHeading
          banner {
            id
            label
            href
            external
            additional {
              id
              icon
              text
            }
          }
        }
        contentBenefits {
          id
          icon
          title
          description
        }
        contentBenefitsCount
        contentFeatures {
          id
          fid
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
        contentTestimonials {
          id
          background {
            id
            image {
              id
              width
              height
              src
              alt
              fill
              className
            }
            outerClassName
          }
          backgroundCount
          testimonials {
            id
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
              width
              height
              src
              alt
              fill
              className
            }
            content
          }
          testimonialsCount
          fallback {
            id
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
              width
              height
              src
              alt
              fill
              className
            }
            content
          }
        }
        contentCertifications {
          id
          title
          description
          image {
            id
            width
            height
            src
            alt
            fill
            className
          }
          link
        }
        contentCertificationsCount
        contentApproaches {
          id
          title
          description
          steps {
            id
            type
            title
            description
            activityTime
            aid
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
            width
            height
            src
            alt
            fill
            className
          }
          cta {
            id
            label
            href
            external
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
        contentFooter {
          id
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
        contentCta {
          id
          background {
            id
            image {
              id
              width
              height
              src
              alt
              fill
              className
            }
            outerClassName
          }
          backgroundCount
          ctas {
            id
            label
            href
            external
          }
          ctasCount
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
export function usePageContents() {
  return useQuery<Pick<Query, "pageContents">>(GET_PAGE_CONTENTS)
}
