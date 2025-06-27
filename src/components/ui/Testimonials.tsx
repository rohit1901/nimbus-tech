import { CompositePageContentWithExtras, Testimonial } from "@/app/types"
import { Badge } from "@/components/Badge"
import { RiTimeLine } from "@remixicon/react"
import Image, { ImageProps } from "next/image"
const testimonialPageContent: CompositePageContentWithExtras<{
  background: {
    imageProps: ImageProps
    outerClassName: string
  }[],
  testimonials?: Testimonial[]
  fallback: Testimonial
}> = {
  title: "Client Success Stories",
  background: [
    {
      imageProps: {
        src: "/images/field.png",
        alt: "clouds background",
        fill: true,
        className: "object-cover"
      },
      outerClassName: "absolute inset-0 object-cover"
    },
    {
      imageProps: {
        src: "/images/drone.png",
        alt: "clouds background",
        width: 1583,
        height: 554,
        className: "animate-hover"
      },
      outerClassName: "absolute top-[19rem] -right-14 w-[19rem] sm:top-[12rem] sm:right-3 sm:w-[23rem] md:top-[12rem] md:right-0 md:w-[25rem] lg:top-[16rem] lg:right-12 lg:w-[34rem]"
    }
  ],
  fallback: {
    badge: {
      icon: RiTimeLine,
      label: "Coming Soon"
    },
    name: "The Nimbus Tech Team",
    role: "Software & Cloud Experts, Germany",
    company: "Nimbus Tech",
    image: {
      src: "/nimbus.svg",
      alt: "Nimbus Tech logo",
      width: 50,
      height: 50,
      className: "rounded-full border-none bg-orange-50 p-3 shadow-lg ring-1 shadow-[#366A79]/20 ring-white/20 transition-transform duration-300 ease-in-out hover:scale-105"
    },
    content: "As Nimbus Tech launches, we look forward to partnering with innovative organizations and delivering exceptional software and cloud solutions. Your feedback could be featured here!"
  } as Testimonial
}
const TestimonialOrFallback = ({
  testimonial
}: { testimonial: Testimonial }) => {
  return (<div className="mb-16" key={testimonial.name}>
    <span className="mt-4 block text-base text-gray-900/70">
      {testimonial.content}
    </span>

    <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      {testimonial.image && <div className="relative shrink-0 rounded-full bg-white/15 p-0.5 ring-1 ring-white/20">
        <Image
          {...testimonial.image}
          alt={testimonial.image.alt}
        />
      </div>}
      <div>
        <div className="text-base font-medium text-gray-900">
          {testimonial.name}
        </div>
        <div className="text-sm text-[#C33621]/80">
          {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
        </div>
      </div>
    </div>
  </div>)
}

const TestimonialOrFallbackWrapper = ({
  testimonialOrFallback
}: { testimonialOrFallback: Testimonial[] | Testimonial }) => {
  if (Array.isArray(testimonialOrFallback)) {
    return testimonialOrFallback.map((testimonial) => (
      <TestimonialOrFallback
        key={testimonial.name}
        testimonial={testimonial}
      />
    ))
  }
  return (
    <TestimonialOrFallback
      testimonial={testimonialOrFallback}
    />
  )
}

export default function Testimonials() {
  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl shadow-[#366A79]/70">
      {testimonialPageContent.background.map((bg, index) => (
        <div key={index} className={bg.outerClassName}>
          <Image
            {...bg.imageProps}
            alt={bg.imageProps.alt}
          />
        </div>
      ))}
      <div className="relative z-20 mb-20 p-8 sm:p-14 lg:p-24">
        <div className="relative max-w-2xl text-xl leading-relaxed tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
          <span className="block font-semibold text-gray-900">
            {testimonialPageContent.title}
          </span>
          {testimonialPageContent.fallback?.badge && (
            <Badge className="mt-2">
              <testimonialPageContent.fallback.badge.icon className="h-4 w-4 text-orange-500" />
              {testimonialPageContent.fallback.badge.label}
            </Badge>
          )}
        </div>
        <TestimonialOrFallbackWrapper
          testimonialOrFallback={testimonialPageContent.testimonials && testimonialPageContent.testimonials.length > 0
            ? testimonialPageContent.testimonials
            : testimonialPageContent.fallback}
        />
      </div>
    </section>
  )
}
