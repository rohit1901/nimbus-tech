import { aboutUsContent, ourApproachContent } from "@/app/data"
import Heading from "@/components/Heading"
import OurApproach from "@/components/ui/OurApproach"
import { StickerCard } from "@/components/ui/StickerCard"

function OurValues({
  valuesContent,
  valuesTitle,
}: {
  valuesContent: typeof aboutUsContent.values
  valuesTitle: string
}) {
  return (
    <section id="our-values" className="my-4">
      <div className="mx-auto px-4">
        <Heading title={valuesTitle} className="mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {valuesContent.map((value) => (
            <StickerCard
              key={value.label}
              Icon={value.icon}
              title={value.label}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutUs() {
  return (
    <section id="about-us" className="mx-auto max-w-6xl">
      <Heading title={aboutUsContent.heading} className="mb-4" />
      <p className="mb-20 text-center text-lg text-gray-700">
        {aboutUsContent.intro}
      </p>
      <OurValues
        valuesContent={aboutUsContent.values}
        valuesTitle={aboutUsContent.valuesTitle}
      />
      <OurApproach {...ourApproachContent} />
      <p className="text-center text-gray-600">{aboutUsContent.closing}</p>
    </section>
  )
}
