import { CompositePageContentWithExtras, CTA } from "@/app/types"
import { Button } from "@/components/Button"
import Image, { ImageProps } from "next/image"
import Link from "next/link"

const ctaPageContent: CompositePageContentWithExtras<{
  background: {
    imageProps: ImageProps,
    outerClassName?: string
  }[],
  ctas: CTA[]
}> = {
  title: "Ready to get started?",
  description: "Let’s build scalable software solutions tailored to your business goals.",
  ctas: [
    {
      label: "Start now",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      external: true
    }, {
      label: "Schedule a discovery call",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: add link to calendars
      external: true
    }
  ],
  background: [
    {
      imageProps: {
        src: "/images/farm-footer.webp",
        alt: "Farm with vehicles blurred",
        width: 1000,
        height: 1000,
        className: "absolute inset-0 -z-10 rounded-2xl blur-xl"
      }
    },
    {
      imageProps: {
        src: "/images/farm-footer.webp",
        alt: "Farm with vehicles",
        width: 1000,
        height: 1000,
        className: "relative z-10 rounded-2xl"
      }
    }
  ]
}
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
                <Link href={cta.href} target={cta.external ? "_blank" : undefined} rel={cta.external ? "noopener noreferrer" : undefined}>
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
