import {
  RiGithubFill,
  RiSlackFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react"
import Link from "next/link"
import { SolarLogo } from "../../../public/SolarLogo"
const CURRENT_YEAR = new Date().getFullYear()

const Footer = () => {
  const sections = {
    services: {
      title: "Services",
      items: [
        { label: "Software Development", href: "#" },
        { label: "Cloud Development", href: "#" },
        { label: "Architecture Consulting", href: "#" },
        { label: "DevOps & Automation", href: "#" },
        { label: "Technology Assessment", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Support & Maintenance", href: "#" },
      ],
    },
    company: {
      title: "Company",
      items: [
        { label: "About Us", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Our Values", href: "#" },
      ],
    },
    resources: {
      title: "Resources",
      items: [
        { label: "Insights", href: "#" },
        { label: "Community", href: "#", external: true },
        { label: "Contact", href: "#" },
        { label: "Support", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Report an Issue", href: "#" },
      ],
    },
    partners: {
      title: "Partners",
      items: [
        { label: "Technology Partners", href: "#", external: true },
        { label: "Cloud Providers", href: "#", external: true },
        { label: "Integration Partners", href: "#", external: true },
        { label: "Partner Program", href: "#" },
      ],
    },
  }

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
        <svg
          className="mb-10 h-20 w-full border-y border-dashed border-gray-300 stroke-gray-300"
          // style={{
          //   maskImage:
          //     "linear-gradient(transparent, white 10rem, white calc(100% - 10rem), transparent)",
          // }}
        >
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
            <SolarLogo className="ml-2 w-20" />

            <span className="sr-only">Solar Logo (go home)</span>
          </Link>

          <div>
            <div className="mt-4 flex items-center">
              {/* Social Icons */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900"
              >
                <RiTwitterXFill className="size-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900"
              >
                <RiYoutubeFill className="size-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900"
              >
                <RiGithubFill className="size-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-900"
              >
                <RiSlackFill className="size-5" />
              </Link>
            </div>
            <div className="ml-2 hidden text-sm text-gray-700 lg:inline">
              &copy; {CURRENT_YEAR} Nimbus Tech GmbH.
            </div>
          </div>
        </div>

        {/* Footer Sections */}
        {Object.entries(sections).map(([key, section]) => (
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
