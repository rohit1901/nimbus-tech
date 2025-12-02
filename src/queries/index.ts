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
        contentFeatures {
          id
          fid
          title
          description
          longDescription
          visualization
        }
      }
    }
  }
`
export function usePageContents() {
  return useQuery<Pick<Query, "pageContents">>(GET_PAGE_CONTENTS)
}
