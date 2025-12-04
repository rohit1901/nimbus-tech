import { Query } from "@/app/graphql/types"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

export const GET_PAGE_CONTENTS = gql`
  query GET_PAGE_CONTENTS {
    pageContents {
      title
      slug
      image {
        id
        width
        height
        src
        alt
        fill
        className
      }
      id
      description
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
            icon
            additional {
              id
              icon
              text
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
        contentTestimonials {
          id
          title
          background {
            id
            image {
              id
              src
              alt
              width
              height
              fill
              className
            }
            outerClassName
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
            content
          }
          testimonialsCount
          fallback {
            id
            rating
            name
            role
            company
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
          }
          certifications {
            id
            certId
            title
            description
            image {
              id
              src
              alt
              width
              height
              fill
              className
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
        contentCta {
          id
          title
          description
          ctas {
            id
            label
            href
            external
          }
          ctasCount
          background {
            id
            image {
              id
              src
              alt
              width
              height
              fill
              className
            }
            outerClassName
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
      sectionsCount
    }
  }
`

export const GET_BENEFITS_SECTION = gql`
  query GET_BENEFITS_SECTION {
    benefitSections {
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
  }
`

export function usePageContents() {
  return useQuery<Pick<Query, "pageContents">>(GET_PAGE_CONTENTS)
}

export function useBenefitsSection() {
  return useQuery<Pick<Query, "benefitSections">>(GET_BENEFITS_SECTION)
}
