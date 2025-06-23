import { Badge } from "@/components/Badge"
import { RiTimeLine } from "@remixicon/react"
import Image from "next/image"

export default function Testimonial() {
  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl shadow-[#366A79]/70">
      <div className="absolute inset-0 object-cover">
        <Image
          alt="clouds background"
          src="/images/field.png"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute top-[19rem] -right-14 w-[19rem] sm:top-[12rem] sm:right-3 sm:w-[23rem] md:top-[12rem] md:right-0 md:w-[25rem] lg:top-[16rem] lg:right-12 lg:w-[34rem]">
        <Image
          alt="clouds background"
          src="/images/drone.png"
          width={1583}
          height={554}
          className="animate-hover"
        />
      </div>
      <div className="relative z-20 mb-20 p-8 sm:p-14 lg:p-24">
        <div>
          <div className="relative max-w-2xl text-xl leading-relaxed tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
            <span className="block font-semibold text-gray-900">
              Client Success Stories
            </span>
            <Badge className="mt-2">
              <RiTimeLine className="h-4 w-4 text-orange-500" />
              Coming Soon
            </Badge>
          </div>
          <span className="mt-4 block text-base text-gray-900/70">
            As Nimbus Tech launches, we look forward to partnering with
            innovative organizations and delivering exceptional software and
            cloud solutions. Your feedback could be featured here!
          </span>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="relative shrink-0 rounded-full bg-white/15 p-0.5 ring-1 ring-white/20">
            <Image
              alt="Nimbus Tech logo"
              src="/nimbus.svg"
              width={36}
              height={36}
              className="rounded-full border-none bg-orange-50 p-1 shadow-lg ring-1 shadow-[#366A79]/20 ring-white/20 transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div>
            <div className="text-base font-medium text-gray-900">
              The Nimbus Tech Team
            </div>
            <div className="text-sm text-[#C33621]/80">
              Software & Cloud Experts, Germany
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
