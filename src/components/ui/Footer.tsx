"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

import { RemixIconComponent } from "@/components/RemixIconComponent"
import { LoadingState, ErrorState } from "@/components/Status"
import { useSectionContent } from "@/hooks/useSectionContent"
import { useLanguageContext } from "@/app/providers/LanguageContext"
import { Language, Maybe } from "@/app/graphql/types"

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

// FIX: Allow undefined in array items and for the array itself
type LanguageToggleProps = {
  availableLanguages?: Array<Maybe<Language> | undefined> | null
  currentValue?: string | null
  onChange: (value: string) => void
}

const COPYRIGHT_ENTITY = "Nimbus Tech GmbH"
const LOCATION = "Leipzig, Germany"

const Copyright = () => (
  <div className="hidden text-sm text-gray-700 lg:ml-3 lg:inline">
    &copy; {CURRENT_YEAR} {COPYRIGHT_ENTITY} &mdash; {LOCATION}
  </div>
)

const LanguageToggle = ({
  availableLanguages,
  currentValue,
  onChange,
}: LanguageToggleProps) => {
  const options = (availableLanguages ?? [])
    .map((lang) => ({
      // Optional chaining handles null and undefined safely here
      value: lang?.value ?? "",
      label: lang?.label ?? lang?.value ?? "",
    }))
    .filter((lang) => lang.value)

  if (options.length === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:justify-start">
      {options.map(({ value, label }) => {
        const isActive = currentValue === value

        return (
          <button
            key={value}
            type="button"
            onClick={() => {
              if (!isActive) {
                onChange(value)
              }
            }}
            className={joinClassNames(
              "inline-flex cursor-pointer items-center justify-center rounded-md px-5 py-2 text-sm font-medium",
              isActive
                ? "bg-orange-500 text-white"
                : "border border-gray-200 bg-white text-gray-900",
            )}
            aria-pressed={isActive}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

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

  if (!isReady || !activeContent) {
    if (!loading && !error) console.error("Languages or Content not available")
    return null
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
      {/*Content Wrapper*/}
      <div className="flex w-full flex-col gap-10 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-start sm:gap-12 sm:px-4 lg:gap-16 lg:px-6 ">
        <div className="mr-auto flex w-full flex-col items-center gap-6 sm:min-w-[280px] sm:items-start sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 select-none font-medium text-gray-700 sm:text-sm"
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

          <div className="flex flex-col items-center gap-3 sm:items-start">
            <div className="flex items-center justify-center gap-3 sm:justify-start sm:gap-4">
              {/* Social Icons */}
              {icons?.items?.map((item) => (
                <Link
                  key={item.id}
                  href={item.href ?? "#"}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  <RemixIconComponent className="h-6 w-6" name={item.icon} />
                </Link>
              ))}
            </div>
            <Copyright />
          </div>

          <div className="mt-4 flex w-full justify-center sm:mt-6 sm:justify-start">
            <LanguageToggle
              availableLanguages={availableLanguages}
              currentValue={currentLanguage?.value}
              onChange={(value) => setLanguage(value)}
            />
          </div>
        </div>

        {links?.length ? (
          <div className="flex w-full flex-col items-end gap-8 sm:items-stretch">
            <div className="grid w-full grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3 xl:grid-cols-4">
              {links.map((section) => (
                <div key={section.id} className="mx-auto w-full max-w-[220px] sm:mx-0 sm:max-w-none">
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
            </div>
          </div>
        ) : null}
      </div>
    </FooterStatusContainer>
  )
}
