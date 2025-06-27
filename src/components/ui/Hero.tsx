import { CompositePageContent, HeroType } from "@/app/types"
import { Button } from "@/components/Button"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import GameOfLife from "@/components/ui/HeroBackground"
import { RiArrowRightUpLine } from "@remixicon/react"
import Link from "next/link"

const heroPageContent: CompositePageContent<'hero', HeroType> = {
  title: "Nimbus Tech",
  description: "Custom software development, cloud architecture, and scalable solutions for modern enterprises.",
  hero: {
    subHeading: "Expert Software & Cloud Solutions",
    banner: {
      label: "News",
      href: "https://rohitkhanduri.substack.com", // TODO: Substack for now, change later
      external: true,
      additional: {
        icon: RiArrowRightUpLine,
        text: "Nimbus Tech is launching soon!"
      }
    }
  },
  cta: {
    label: "Contact Us",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: Substack for now, change later
    external: true
  }
}

export default function Hero() {
  return (
    <section aria-label="hero" id="hero-section">
      <FadeContainer className="relative flex flex-col items-center justify-center">
        <FadeDiv className="mx-auto">
          <a
            aria-label={`Learn more about ${heroPageContent.title}`}
            href={heroPageContent.hero.banner.href}
            target={heroPageContent.hero.banner.external ? "_blank" : undefined}
            rel={heroPageContent.hero.banner.external ? "noopener noreferrer" : undefined}
            className="mx-auto w-full"
          >
            <div className="inline-flex max-w-full items-center gap-3 rounded-full bg-white/5 px-2.5 py-0.5 pr-3 pl-0.5 font-medium text-gray-900 shadow-lg ring-1 shadow-orange-400/20 ring-black/10 filter backdrop-blur-[1px] transition-colors hover:bg-orange-500/[2.5%] focus:outline-hidden sm:text-sm">
              <span className="shrink-0 truncate rounded-full border bg-gray-50 px-2.5 py-1 text-sm text-gray-600 sm:text-xs">
                {heroPageContent.hero.banner.label}
              </span>
              <span className="flex items-center gap-1 truncate">
                <span className="w-full truncate">
                  {heroPageContent.hero.banner.additional?.text}
                </span>
                {heroPageContent.hero.banner.additional?.icon && (
                  <heroPageContent.hero.banner.additional.icon className="size-4 shrink-0 text-gray-700" />
                )}
              </span>
            </div>
          </a>
        </FadeDiv>
        <h1 className="mt-8 text-center text-5xl font-semibold tracking-tighter text-gray-900 sm:text-8xl sm:leading-[5.5rem]">
          <FadeSpan>{heroPageContent.title}</FadeSpan>
          <br />
          <FadeSpan className="text-orange-500">
            {heroPageContent.hero.subHeading}
          </FadeSpan>
        </h1>
        <p className="mt-5 max-w-xl text-center text-base text-balance text-gray-700 sm:mt-8 sm:text-xl">
          <FadeSpan>
            {heroPageContent.description}
          </FadeSpan>
        </p>
        <FadeDiv>
          <Button asChild className="text-md my-10">
            <Link
              href={heroPageContent.cta?.href ?? "#"}
              target={heroPageContent.cta?.external ? "_blank" : undefined}
              rel={heroPageContent.cta?.external ? "noopener noreferrer" : undefined}
            >
              {heroPageContent.cta?.label}
            </Link>
          </Button>
        </FadeDiv>
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <GameOfLife />
        </div>
      </FadeContainer>
    </section>
  )
}
