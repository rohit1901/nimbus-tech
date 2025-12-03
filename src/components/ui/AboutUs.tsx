import { ourApproachContent } from "@/app/data"
import { About, Approach, Maybe, Value } from "@/app/graphql/types"
import Heading from "@/components/Heading"
import OurApproach from "@/components/ui/OurApproach"
import { StickerCard } from "@/components/ui/StickerCard"

function OurValues({
  valuesTitle,
  values,
}: {
  valuesTitle: string
  values?: Maybe<Value[]>
}) {
  return (
    <section id="our-values" className="my-4">
      <div className="mx-auto px-4">
        <Heading title={valuesTitle} className="mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {values?.map((value) => (
            <StickerCard
              key={value.label}
              iconName={value.icon}
              title={value.label}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutUs({
  about,
  approaches,
}: {
  about?: Maybe<About>
  approaches?: Maybe<Approach>
}) {
  if (!about) return null
  return (
    <section id="about-us" className="mx-auto max-w-6xl">
      <Heading title={about.heading ?? ""} className="mb-4" />
      <p className="mb-20 text-center text-lg text-gray-700">{about.intro}</p>
      <OurValues valuesTitle={about.valuesTitle ?? ""} values={about.values} />
      <OurApproach approaches={approaches} />
      <p className="text-center text-gray-600">{about.closing ?? ""}</p>
    </section>
  )
}
