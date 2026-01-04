"use client"
// TODO: Extend Certifications Graphql Type in KeystoneJS with additional fields
import { Certification, CertificationSection, Maybe } from "@/app/graphql/types"
import { Button } from "@/components/Button"
import Heading from "@/components/Heading"
import { SafeImage } from "@/components/SafeImage"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard"
import LogoLoop from "@/components/ui/LogoLoop"
import Link from "next/link"
import React from "react"

export default function OurCertifications({
  content,
}: {
  content?: Maybe<CertificationSection>
}) {
  if (!content) return null
  const certifications = content.certifications || []

  // No need to map to LogoItem anymore, pass certifications directly
  // renderCertificate will handle the strict typing

  const renderCertificate = (certification: Certification, key: React.Key) => {
    return (
      <HoverCard key={key} openDelay={0} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer transition-transform duration-300 group-hover/item:scale-110">
            <SafeImage
              image={certification.image}
              props={{
                className: "h-48 w-auto object-contain",
              }}
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-[360px] dark:border-gray-800 dark:bg-gray-900">
          <div className="flex gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-white p-2 dark:border-gray-800 dark:bg-gray-800">
              <SafeImage
                image={certification.image}
                props={{ className: "h-full w-full object-contain" }}
              />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <h4 className="font-semibold text-gray-900 dark:text-gray-50">
                {certification.title}
              </h4>
              <p className="text-sm leading-snug text-gray-600 dark:text-gray-400">
                {certification.description}
              </p>
              {certification.link && (
                <Link
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm font-medium text-orange-500 hover:underline dark:text-orange-400"
                >
                  Learn more
                </Link>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  }

  return (
    <section id="our-certifications" className="bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl text-center">
        <Heading title={content.title ?? ""} />
        <p className="my-10 text-gray-700 dark:text-gray-400">
          {content.description}
        </p>

        <div className="relative w-full py-10">
          <LogoLoop
            logos={certifications}
            speed={40}
            direction="left"
            logoHeight={96} // Matches h-24 (24 * 4 = 96px)
            gap={48}
            pauseOnHover={true}
            renderItem={renderCertificate}
            ariaLabel="Our Certifications"
            scaleOnHover={true}
            blurRest={true}
          />
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
