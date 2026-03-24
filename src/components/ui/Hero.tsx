import { Hero as HeroType, Maybe, PageContent } from "@/app/graphql/types"
import { Button } from "@/components/Button"
import { FadeContainer, FadeDiv, FadeSpan } from "@/components/Fade"
import GameOfLife from "@/components/ui/HeroBackground"
import Link from "next/link"
import { RemixIconComponent } from "@/components/RemixIconComponent"
import { AnimatedShinyText } from "@/components/AnimatedShinyText"
import { cx } from "@/lib/utils"

type HeroProps = {
  pageContent: PageContent & {
    hero?: Maybe<HeroType>
  }
}

export default function Hero({ pageContent }: HeroProps) {
  if (!pageContent.hero) return null
  return (
    <section aria-label="hero" id="hero-section">
      <FadeContainer className="relative flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div
            className={cx(
              "group rounded-full border bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 border-orange-500/10 dark:bg-transparent dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-2 py-2 transition ease-out hover:text-orange-500 hover:duration-300 ">
              <a
                aria-label={`Learn more about ${pageContent.hero?.banner?.label}`}
                href={pageContent.hero?.banner?.href ?? ""}
                target={pageContent.hero?.banner?.external ? "_blank" : undefined}
                rel={
                  pageContent.hero?.banner?.external
                    ? "noopener noreferrer"
                    : undefined
                }
                className="mx-auto w-full"
              >
                <div className="inline-flex max-w-full items-center gap-3 ">
                  <span className="shrink-0 truncate rounded-full border bg-gray-50 px-2 py-2 text-sm text-gray-900 sm:text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {pageContent.hero?.banner?.label}
                  </span>
                  <span className="flex items-center gap-1 truncate">
                    <span className="w-full truncate">
                      {pageContent.hero?.banner?.additional?.text}
                    </span>
                    <RemixIconComponent
                      name={pageContent.hero?.banner?.additional?.icon}
                      className="size-4 shrink-0"
                    />
                  </span>
                </div>
              </a>
            </AnimatedShinyText>
          </div>
        </div>
        <h1 className="mt-8 text-center text-5xl font-semibold tracking-tighter text-gray-900 sm:text-8xl sm:leading-[5.5rem] dark:text-gray-50">
          <FadeSpan>{pageContent.title}</FadeSpan>
          <br />
          <FadeSpan className="text-orange-500">
            {pageContent.hero?.subHeading}
          </FadeSpan>
        </h1>
        <p className="mt-5 max-w-xl text-center text-base text-balance text-gray-700 sm:mt-8 sm:text-xl dark:text-gray-400">
          <FadeSpan>{pageContent.description}</FadeSpan>
        </p>
        <FadeDiv>
          <Button asChild className="text-md my-10">
            <Link
              href={pageContent.cta?.href ?? "#"}
              target={pageContent.cta?.external ? "_blank" : undefined}
              rel={
                pageContent.cta?.external ? "noopener noreferrer" : undefined
              }
            >
              {pageContent.cta?.label}
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
