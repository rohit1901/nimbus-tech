import { benefitsContent } from "@/app/data"
import { StickerCard } from "@/components/ui/StickerCard"

export default function WhyNimbusTech() {
  return (
    <section className="bg-gray-50" id="benefits">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mt-2 text-center text-3xl font-semibold tracking-tighter text-gray-900 md:text-4xl">
          {benefitsContent.title}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {benefitsContent.benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <StickerCard
                Icon={benefit.icon}
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
