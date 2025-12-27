"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { RemixIconComponent } from "@/components/RemixIconComponent"
import { LoadingState, ErrorState } from "@/components/Status"
import { useSectionContent } from "@/hooks/useSectionContent"
import { useLanguageContext } from "@/app/providers/LanguageContext"
import Image from "next/image"

export const CURRENT_YEAR = new Date().getFullYear()

const joinClassNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ")

type FooterStatusContainerProps = {
  children: ReactNode
  footerClassName?: string
}

export const FooterStatusContainer = ({
  children,
  footerClassName,
}: FooterStatusContainerProps) => (
  <div className="px-4 xl:px-0">
    <footer
      id="footer"
      className={joinClassNames(
        "relative mx-auto flex max-w-6xl flex-wrap pt-4",
        footerClassName,
      )}
    >
      {children}
    </footer>
  </div>
)

const FOOTER_STATUS_CLASSNAME = "min-h-[180px]"

const COPYRIGHT_ENTITY = "Nimbus Tech GmbH"
const LOCATION = "Leipzig, Germany"

const Copyright = () => (
  <div className="ml-3 hidden text-sm text-gray-700 lg:inline">
    &copy; {CURRENT_YEAR} {COPYRIGHT_ENTITY} &mdash; {LOCATION}
  </div>
)

export default function Footer() {
  const {
    activeContent,
    isReady,
    loading,
    error,
    currentLanguage,
    availableLanguages,
    setLanguage,
  } = useLanguageContext()

  const { footer } = useSectionContent(
    activeContent?.sections,
    currentLanguage?.value ?? "en-US",
  )

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={"Error loading Footer."} />
  // Guard against missing language data
  if (!isReady || !activeContent) {
    console.error("Languages or Content not available")
    return <ErrorState message="Content not available" />
  }

  if (loading) {
    return (
      <FooterStatusContainer
        footerClassName={joinClassNames(
          FOOTER_STATUS_CLASSNAME,
          "items-center justify-center text-center",
        )}
      >
        <LoadingState
          message="Loading footer..."
          variant="default"
          padded={false}
        />
      </FooterStatusContainer>
    )
  }

  if (error) {
    return (
      <FooterStatusContainer
        footerClassName={joinClassNames(
          FOOTER_STATUS_CLASSNAME,
          "items-center justify-center text-center",
        )}
      >
        <ErrorState
          message={"Unknown error"}
          variant="default"
          padded={false}
        />
      </FooterStatusContainer>
    )
  }

  if (!footer) {
    return (
      <FooterStatusContainer
        footerClassName={joinClassNames(
          FOOTER_STATUS_CLASSNAME,
          "items-center justify-center text-center",
        )}
      >
        <ErrorState
          message="Footer content not available."
          variant="default"
          padded={false}
        />
      </FooterStatusContainer>
    )
  }
  const icons = footer.sections?.find(
    (section) => section.title?.label === "social",
  )
  const links = footer.sections?.filter(
    (section) => section.title?.label !== "social",
  )

  return (
    <FooterStatusContainer>
      {/* Vertical Lines */}
      <div className="pointer-events-none inset-0">
        {/* Left */}
        <div
          className="absolute inset-y-0 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
        {/* Right */}
        <div
          className="absolute inset-y-0 right-0 my-[-5rem] w-px"
          style={{
            maskImage: "linear-gradient(transparent, white 5rem)",
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      </div>

      <svg className="mb-10 h-20 w-full border-y border-dashed border-gray-300 stroke-gray-300">
        <defs>
          <pattern
            id="diagonal-footer-pattern"
            patternUnits="userSpaceOnUse"
            width="64"
            height="64"
          >
            {Array.from({ length: 17 }, (_, index) => {
              const offset = index * 8
              return (
                <path
                  key={index}
                  d={`M${-106 + offset} 110L${22 + offset} -18`}
                  stroke=""
                  strokeWidth="1"
                />
              )
            })}
          </pattern>
        </defs>
        <rect
          stroke="none"
          width="100%"
          height="100%"
          fill="url(#diagonal-footer-pattern)"
        />
      </svg>

      <div className="mr-auto flex w-full flex-col justify-between lg:w-fit">
        <Link
          href="/"
          className="ml-3 flex items-center font-medium text-gray-700 select-none sm:text-sm"
        >
          <Image
            className="w-50"
            src="https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg"
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="sr-only">Nimbus Tech Logo (go home)</span>
        </Link>

        <div className="flex items-center lg:block">
          <div className="flex items-center">
            {/* Social Icons */}
            {icons?.items?.map((item) => (
              <Link
                key={item.id}
                href={item.href ?? "#"}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="ml-3 text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                <RemixIconComponent className="h-6 w-6" name={item.icon} />
              </Link>
            ))}
          </div>
          <Copyright />
        </div>

        <div className="m-4 max-w-[250px]">
          <Select
            value={currentLanguage?.value ?? "en-US"}
            onValueChange={(v) => setLanguage(v)}
          >
            <SelectTrigger id="languages" className="mt-2">
              <SelectValue placeholder="Choose language" />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages?.map((item) => (
                <SelectItem key={item?.value} value={item?.value ?? ""}>
                  {item?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer Sections */}
      {links?.map((section) => (
        <div key={section.id} className="mt-6 min-w-44 pl-2 lg:mt-0 lg:pl-0">
          <h3 className="mb-4 font-medium text-gray-900 sm:text-sm">
            {section.title?.label?.toUpperCase() ?? ""}
          </h3>
          <ul className="space-y-4">
            {section.items?.map((item) => (
              <li key={item.label} className="text-sm">
                <Link
                  href={item.href ?? "#"}
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </FooterStatusContainer>
  )
}
