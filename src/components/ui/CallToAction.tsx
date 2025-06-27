import { ctaPageContent } from "@/app/data"
import { Button } from "@/components/Button"
import Image from "next/image"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-6xl">
      <div className="grid items-center gap-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <h2
            id="cta-title"
            className="scroll-my-60 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl"
          >
            {ctaPageContent.title}
          </h2>
          {ctaPageContent.description && (
            <p className="mt-3 mb-8 text-lg text-gray-600">
              {ctaPageContent.description}
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            {ctaPageContent.ctas.map((cta, idx) => (
              <Button
                asChild
                className="text-md"
                variant={idx === 1 ? "secondary" : undefined}
                key={cta.label}
              >
                <Link
                  href={cta.href}
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
          {ctaPageContent.background.map((bg, idx) => (
            <Image
              key={idx}
              aria-hidden={idx === 0}
              {...bg.imageProps}
              alt={bg.imageProps.alt}
              className={bg.imageProps.className}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
