// TODO: Extend Benefit GraphQL Type in KeystoneJS to include new fields
import { BenefitSection, Maybe } from "@/app/graphql/types"
import { StickerCard } from "@/components/ui/StickerCard"

export default function WhyNimbusTech({
  benefitSection: benefitsContent,
}: {
  benefitSection?: Maybe<BenefitSection>
}) {
  if (!benefitsContent) return null
  const benefits = benefitsContent?.benefits
  return (
    <section className="bg-gray-50 dark:bg-gray-950" id="benefits">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mt-2 text-center text-3xl font-semibold tracking-tighter text-gray-900 md:text-4xl dark:text-gray-50">
          {benefitsContent?.title}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <StickerCard
                iconName={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
