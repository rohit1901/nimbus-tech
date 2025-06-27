import { Benefit, CompositePageContent } from "@/app/types"
import {
  RiAwardFill,
  RiFlashlightFill,
  RiMoneyEuroBoxFill
} from "@remixicon/react"
import { StickerCard } from "./StickerCard"


const benefitsContent: CompositePageContent<'benefits', Benefit[]> = {
  title: "Your Benefits with Nimbus Tech",
  benefits: [
    {
      icon: RiAwardFill,
      title: "Certified Experts",
      description: "We are experienced and certified AWS cloud specialists.",
    },
    {
      icon: RiMoneyEuroBoxFill,
      title: "Full Cost Control",
      description:
        "We ensure transparent and predictable costs for your cloud project.",
    },
    {
      icon: RiFlashlightFill,
      title: "Fast Implementation",
      description:
        "We implement your individual cloud project efficiently and quickly.",
    },
  ],
}
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
