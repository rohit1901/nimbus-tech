import { testimonialPageContent } from "@/app/data"
import { Maybe, Testimonial, TestimonialItem } from "@/app/graphql/types"
import { Badge } from "@/components/Badge"
import Image from "next/image"
import { RemixIconComponent } from "@/components/RemixIconComponent"
import { SafeImage } from "../SafeImage"
const TestimonialOrFallback = ({
  testimonial,
}: {
  testimonial: TestimonialItem
}) => {
  return (
    <div className="mb-16" key={testimonial.name}>
      <span className="mt-4 block text-base text-gray-900/70">
        {testimonial.content}
      </span>

      <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {testimonial.image && (
          <div className="relative shrink-0 rounded-full bg-white/15 p-0.5 ring-1 ring-white/20">
            <SafeImage {...testimonial.image} />
          </div>
        )}
        <div>
          <div className="text-base font-medium text-gray-900">
            {testimonial.name}
          </div>
          <div className="text-sm text-[#C33621]/80">
            {testimonial.role}{" "}
            {testimonial.company && `at ${testimonial.company}`}
          </div>
        </div>
      </div>
    </div>
  )
}

const TestimonialOrFallbackWrapper = ({
  testimonialOrFallback,
}: {
  testimonialOrFallback?: Maybe<TestimonialItem[]> | Maybe<TestimonialItem>
}) => {
  if (!testimonialOrFallback) {
    return null
  }

  if (Array.isArray(testimonialOrFallback)) {
    return testimonialOrFallback.map((testimonial) => (
      <TestimonialOrFallback key={testimonial.id} testimonial={testimonial} />
    ))
  }
  return <TestimonialOrFallback testimonial={testimonialOrFallback} />
}

export default function Testimonials({
  testimonial,
}: {
  testimonial?: Maybe<Testimonial>
}) {
  if (!testimonial) {
    return null
  }
  const { testimonials, fallback } = testimonial
  const getTestimonials = (
    testimonials?: Maybe<TestimonialItem[]>,
    fallback?: Maybe<TestimonialItem>,
  ) => {
    if (!testimonials || testimonials.length === 0) {
      return fallback
    }
    return testimonials
  }
  const testimonialsToShow = getTestimonials(testimonials, fallback)
  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl shadow-[#366A79]/70">
      {testimonial.background?.map((bg, index) => (
        <div key={index} className={bg.outerClassName ?? ""}>
          <SafeImage {...bg.image} id={bg.id} />
        </div>
      ))}
      <div className="relative z-20 mb-20 p-8 sm:p-14 lg:p-24">
        <div className="relative max-w-2xl text-xl leading-relaxed tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
          <span className="block font-semibold text-gray-900">
            {testimonialPageContent.title}
          </span>
          {testimonialPageContent.fallback?.badge && (
            <Badge className="mt-2">
              <RemixIconComponent
                name={testimonialPageContent.fallback.badge.icon}
                className="h-4 w-4 text-orange-500"
              />
              {testimonialPageContent.fallback.badge.label}
            </Badge>
          )}
        </div>
        <TestimonialOrFallbackWrapper
          testimonialOrFallback={testimonialsToShow}
        />
      </div>
    </section>
  )
}
