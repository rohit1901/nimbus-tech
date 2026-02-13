"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import NextImage from "next/image"
import clsx from "clsx"

import { RemixIconComponent } from "@/components/RemixIconComponent"
import { useSectionContent } from "@/hooks/useSectionContent"
import { useLanguageContext } from "@/app/providers/LanguageContext"
import LanguageToggle from "@/components/ui/LanguageToggle"
import {
  FooterSection,
  Image,
  Language,
  Maybe,
  NavigationLink,
} from "@/app/graphql/types"

// Constants
export const CURRENT_YEAR = new Date().getFullYear()
const COPYRIGHT_ENTITY = "Nimbus Tech GmbH"
const LOCATION = "Leipzig, Germany"
const LOGO_URL = "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg"

// Types
type FooterStatusContainerProps = {
  children: ReactNode
  footerClassName?: string
}

// Utilities
const joinClassNames = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ")

// Sub-components
const VerticalLine = ({ position }: { position: "left" | "right" }) => (
  <div
    className={joinClassNames(
      "absolute inset-y-0 -my-20 w-px",
      position === "right" && "right-0",
    )}
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
        className="stroke-gray-300 dark:stroke-gray-800"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
    </svg>
  </div>
)

const VerticalLines = () => (
  <div className="pointer-events-none inset-0">
    <VerticalLine position="left" />
    <VerticalLine position="right" />
  </div>
)

const DiagonalPattern = () => (
  <svg className="mb-10 h-20 w-full border-y border-dashed border-gray-300 stroke-gray-300 dark:border-gray-800 dark:stroke-gray-800">
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
)

const Copyright = () => (
  <div className="ml-1 inline text-sm text-gray-700 dark:text-gray-400">
    &copy; {CURRENT_YEAR} {COPYRIGHT_ENTITY} &mdash; {LOCATION}
  </div>
)

const Logo = ({ image }: { image?: Maybe<Image> }) => (
  <Link
    href="/"
    className="flex items-center gap-3 font-medium text-gray-700 select-none sm:text-sm dark:text-gray-200"
  >
    <NextImage
      className="w-50"
      src={image?.src ?? LOGO_URL}
      alt={image?.alt ?? "Nimbus Tech Logo"}
      width={50}
      height={50}
    />
    <span className="sr-only">Nimbus Tech Logo (go home)</span>
  </Link>
)

const SocialLinks = ({ items }: { items?: Maybe<NavigationLink[]> }) => {
  if (!items?.length) return null

  return (
    <div className="flex items-center justify-center gap-3 sm:justify-start sm:gap-4">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href ?? "#"}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <RemixIconComponent className="h-6 w-6" name={item.icon} />
        </Link>
      ))}
    </div>
  )
}

type BrandSectionProps = {
  socialItems?: Maybe<NavigationLink[]>
  availableLanguages: Language[]
  currentLanguage?: Maybe<string>
  onLanguageChange: (value: string) => void
  image?: Maybe<Image>
}

const BrandSection = ({
  socialItems,
  availableLanguages,
  currentLanguage,
  onLanguageChange,
  image,
}: BrandSectionProps) => (
  <div className="mr-auto flex w-full flex-col items-center gap-6 sm:min-w-70 sm:items-start sm:gap-6">
    <Logo image={image} />

    <div className="flex flex-col items-center gap-3 sm:items-start">
      <SocialLinks items={socialItems} />
      <Copyright />
    </div>

    <div className="mt-4 flex w-full justify-center sm:mt-6 sm:justify-start">
      <LanguageToggle
        availableLanguages={availableLanguages}
        currentValue={currentLanguage}
        onChange={onLanguageChange}
      />
    </div>
  </div>
)

type FooterLinksSectionProps = {
  section: FooterSection
}

const FooterLinksSection = ({ section }: FooterLinksSectionProps) => (
  <div className="mx-auto w-full max-w-55 sm:mx-0 sm:max-w-none">
    <h3 className="mb-4 font-medium text-gray-900 sm:text-sm dark:text-gray-50">
      {section.title?.label?.toUpperCase() ?? ""}
    </h3>
    <ul className="space-y-4">
      {section.items?.map((item) => (
        <li key={item.label} className="text-sm">
          <Link
            href={item.href ?? "#"}
            className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

type FooterLinksProps = {
  sections?: FooterSection[]
}

const FooterLinks = ({ sections }: FooterLinksProps) => {
  if (!sections?.length) return null

  const gridClass = clsx(
    "grid w-full grid-cols-1 gap-10 text-center",
    "sm:grid-cols-2 sm:text-left",
    `lg:grid-cols-${sections.length}`,
    `xl:grid-cols-${sections.length}`,
  )

  return (
    <div className="flex w-full flex-col items-end gap-8 sm:items-stretch">
      <div className={gridClass}>
        {sections.map((section) => (
          <FooterLinksSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}

// Main components
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

export default function Footer() {
  const { activeContent, currentLanguage, availableLanguages, setLanguage } =
    useLanguageContext()

  const { footer, navigation } = useSectionContent(
    activeContent?.sections,
    currentLanguage?.value ?? "en-US",
  )

  const socialSection = footer?.sections?.find(
    (section) => section.title?.label === "social",
  )

  const linkSections = footer?.sections?.filter(
    (section) => section.title?.label !== "social",
  )

  return (
    <FooterStatusContainer>
      <VerticalLines />
      <DiagonalPattern />

      <div className="flex w-full flex-col gap-10 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-start sm:gap-12 sm:px-4 lg:gap-16 lg:px-6">
        <BrandSection
          socialItems={socialSection?.items}
          availableLanguages={availableLanguages}
          currentLanguage={currentLanguage?.value}
          onLanguageChange={setLanguage}
          image={navigation?.image}
        />

        <FooterLinks sections={linkSections} />
      </div>
    </FooterStatusContainer>
  )
}
