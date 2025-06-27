import { CURRENT_YEAR, footerPageContent } from "@/app/data"
import Link from "next/link"
import { SolarLogo } from "../../../public/SolarLogo"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select"

const Copyright = () => {
  return (
    <div className="ml-3 hidden text-sm text-gray-700 lg:inline">
      &copy; {CURRENT_YEAR} Nimbus Tech GmbH &mdash; Leipzig, Germany
    </div>
  )
}
export default function Footer() {
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
        <div className="mr-auto flex w-full flex-col justify-between lg:w-fit">
          <Link
            href="/"
            className="flex items-center font-medium text-gray-700 select-none sm:text-sm"
          >
            <SolarLogo className="w-50" />
            <span className="sr-only">Nimbus Tech Logo (go home)</span>
          </Link>
          <div className="flex items-center lg:block">
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
                  {item.icon ? <item.icon className="h-6 w-6" /> : item.label}
                </Link>
              ))}
            </div>
            <Copyright />
          </div>
          <div className="m-4 max-w-[250px]">
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
          <div key={key} className="mt-6 min-w-44 pl-2 lg:mt-0 lg:pl-0">
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
