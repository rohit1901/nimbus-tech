"use client"
// TODO: Extend Certifications Graphql Type in KeystoneJS with additional fields
import { CertificationSection, Maybe } from "@/app/graphql/types"
import { Button } from "@/components/Button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel"
import Heading from "@/components/Heading"
import Link from "next/link"
import { SafeImage } from "@/components/SafeImage"

export default function OurCertifications({
  content,
}: {
  content?: Maybe<CertificationSection>
}) {
  if (!content) return null
  const certifications = content.certifications
  return (
    <section id="our-certifications" className="bg-gray-50">
      <div className="mx-auto max-w-4xl text-center">
        <Heading title={content.title ?? ""} />
        <p className="my-10 text-gray-700">{content.description}</p>
        <div className="flex justify-center">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {certifications?.map((certification) => (
                <CarouselItem
                  key={certification.id}
                  className="flex flex-col items-center p-4"
                >
                  <SafeImage
                    image={certification.image}
                    key={`certification-image-${certification.id}`}
                  />
                  <Link
                    href={certification.link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 cursor-pointer text-xl font-semibold text-gray-900 hover:text-orange-500"
                  >
                    {certification.title}
                  </Link>

                  <p className="text-gray-600">{certification.description}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="mt-10">
          <Button asChild className="text-md">
            <Link href={content.cta?.href ?? "#"}>
              {content.cta?.label ?? ""}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
