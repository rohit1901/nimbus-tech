import { CompositePageContentWithExtras, FooterSections, Language } from "@/app/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiXingFill
} from "@remixicon/react";
import Link from "next/link";
import { SolarLogo } from "../../../public/SolarLogo";

const CURRENT_YEAR = new Date().getFullYear()
const footerPageContent: CompositePageContentWithExtras<{ sections: FooterSections, languages: Language[] }> = {
  title: "Footer",
  sections: {
    services: {
      title: "Services",
      items: [
        { label: "Software Development", href: "#features" },
        { label: "Cloud Architecture", href: "#features" },
        { label: "DevOps & Automation", href: "#features" },
        { label: "Software Architecture", href: "#features" },
        { label: "Technology Assessment", href: "#features" },
      ],
    },
    company: {
      title: "Company",
      items: [
        { label: "About Nimbus Tech", href: "#about-us" },
        {
          label: "Blog",
          href: "https://rohitkhanduri.substack.com",
          external: true,
        }, //TODO:  Link to Substack for now
        // Careers removed (add later when hiring)
        // Case Studies removed (add after first projects)
        { label: "Our Values", href: "#our-values" },
        {
          label: "News & Updates",
          href: "https://rohitkhanduri.substack.com",
          external: true,
        }, //TODO:  Link to Substack for now
      ],
    },
    resources: {
      title: "Resources",
      items: [
        // TODO: Add links to documentation, guides, or other resources when available
        {
          label: "Contact",
          href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
        },
        {
          label: "Support",
          href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
        },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        // "Report an Issue" can stay if you want to be open to feedback from day one
      ],
    },
    social: {
      title: "Follow Us",
      items: [
        {
          label: "GitHub",
          href: "https://rohit1901.github.com",
          external: true,
          icon: RiGithubFill
        },
        {
          label: "LinkedIn",
          href: "#",
          external: true,
          icon: RiLinkedinBoxFill
        },
        {
          label: "Xing",
          href: "#",
          external: true,
          icon: RiXingFill
        },
      ]
    },
  },
  languages: [
    {
      label: "English",
      value: "en-US"
    },
    {
      label: "German",
      value: "de-DE"
    }
  ]
}

const Copyright = () => {
  return (
    <div className="ml-3 hidden text-sm text-gray-700 lg:inline">
      &copy; {CURRENT_YEAR} Nimbus Tech GmbH &mdash; Leipzig, Germany
    </div>
  )
}
const Footer = () => {
  return (
    <div className="px-4 xl:px-0">
      <footer
        id="footer"
        className="relative mx-auto flex max-w-6xl flex-wrap pt-4"
      >
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
              {Array.from({ length: 17 }, (_, i) => {
                const offset = i * 8
                return (
                  <path
                    key={i}
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
        <div className="mr-auto flex w-full justify-between lg:w-fit lg:flex-col">
          <Link
            href="/"
            className="flex items-center font-medium text-gray-700 select-none sm:text-sm"
          >
            <SolarLogo className="ml-0 w-50" />
            <span className="sr-only">Nimbus Tech Logo (go home)</span>
          </Link>

          <div className="lg:block flex items-center">
            <div className="ml-1 flex items-center">
              {/* Social Icons */}
              {footerPageContent.sections.social.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="ml-3 text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  {item.icon ? (
                    <item.icon className="h-6 w-6" />
                  ) : (
                    item.label
                  )}
                </Link>
              ))}
            </div>
            <Copyright />
          </div>
          <div className="w-[250px] ml-4">
            <Select defaultValue="de-DE">
              <SelectTrigger id="languages" className="mt-2">
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                {footerPageContent.languages.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>

            </Select>
          </div>
        </div>

        {/* Footer Sections */}
        {Object.entries(footerPageContent.sections).map(([key, section]) => (
          <div key={key} className="mt-10 min-w-44 pl-2 lg:mt-0 lg:pl-0">
            <h3 className="mb-4 font-medium text-gray-900 sm:text-sm">
              {section.title}
            </h3>
            <ul className="space-y-4">
              {section.items.map((item) => (
                <li key={item.label} className="text-sm">
                  <Link
                    href={item.href}
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
      </footer>
    </div>
  )
}

export default Footer
