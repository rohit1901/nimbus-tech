import { CtaSection, Maybe } from "@/app/graphql/types"
import { Button } from "@/components/Button"
import Link from "next/link"
import { SafeImage } from "@/components/SafeImage"

export default function CallToAction({ cta }: { cta?: Maybe<CtaSection> }) {
  if (!cta) return null
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-6xl">
      <div className="grid items-center gap-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <h2
            id="cta-title"
            className="scroll-my-60 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl dark:text-gray-50"
          >
            {cta.title}
          </h2>
          {cta.description && (
            <p className="mt-3 mb-8 text-lg text-gray-600 dark:text-gray-100">
              {cta.description}
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            {cta.ctas?.map((cta, idx) => (
              <Button
                asChild
                className="text-md"
                variant={idx === 1 ? "secondary" : undefined}
                key={cta.label}
              >
                <Link
                  href={cta.href ?? "#"}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noopener noreferrer" : undefined}
                >
                  {cta.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="relative isolate rounded-xl sm:col-span-4 sm:h-full">
          {cta.background?.map((bg, idx) => (
            <SafeImage
              image={bg}
              props={{
                className: bg.alt?.includes("blurred")
                  ? "absolute inset-0 -z-10 rounded-2xl blur-xl"
                  : "relative z-10 rounded-2xl",
              }}
              {...bg}
              aria-hidden={idx === 0}
              key={`cta-background-${bg.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
