"use client"

import { Certification, CompositePageContent } from "@/app/types"
import { Button } from "@/components/Button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel"
import Heading from "@/components/Heading"
import Image from "next/image"
import Link from "next/link"

const certifications: Certification[] = [
  {
    id: 1,
    title:
      "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
    description:
      "Advanced expertise in software architecture principles and practices.",
    image: "/cpsa.a.png",
    width: 200,
    height: 200,
  },
  {
    id: 2,
    title:
      "iSAQB® Certified Professional for Software Architecture - Foundation Level (CPSA-F)",
    description:
      "Fundamental knowledge of software architecture concepts and methodologies.",
    image:
      "https://app.skillsclub.com/participants/115738/credentials/217564-2301-CPSAFL-223971-EN.png?ngsw-bypass=true&v=1716371214&Expires=1837082997&Signature=duhUg5dapPCYABZlu903zk~WlmPt75Sap-7sFkFgk0Cxd51gSm7lf4XBuR4SM8fU5ephShR50oFamcrsxF23t9E5yuCjSYC0FL1Oeujv7z1BkujgoVK37pdYCYPPlfeW7DepRSYJeAlIYejTrjxq2gsHYHHpOpqBhekyMCVbJ0HPov6B0FNuQtJ9Jr8eH9kAyxwxuAV5AWtT3T5Xfhw33V6zVU55sGWvYEW5i70T24kEodo2FZgVVMOgWsJK4QgjhdlVzMAwVCKrOJshKA33CY48kdPe6DQy26PnbFIoV-j9k6124QIBwLC4X66Gw3R9pMpBLVn6ym3nppBozizmnw__&Key-Pair-Id=APKAJGVOLYFJFHV5FSSQ",
    link: "https://app.skillsclub.com/credential/28340-f57d08ae92c30e28a0c2850516e8fec9616ac7473feba42e7c4a2e62585c44c0?locale=en&badge=true",
    width: 200,
    height: 200,
  },
  {
    id: 3,
    title: "Apollo Certified Graph Developer - Professional",
    description:
      "Certified skills in GraphQL development and Apollo client/server technologies.",
    image:
      "https://res.cloudinary.com/apollographql/image/upload/v1654200365/odyssey/certifications/graph_professional_badge.svg",
    link: "https://www.apollographql.com/tutorials/certifications/d5356f71-0760-4701-ae67-8b56c425c89a",
    width: 200,
    height: 200,
  },
  {
    id: 4,
    title: "Apollo Certified Graph Developer - Associate",
    description:
      "Certified skills in GraphQL development and Apollo client/server technologies.",
    image:
      "https://res.cloudinary.com/apollographql/image/upload/v1632844693/badge_sfsiin.svg",
    link: "https://www.apollographql.com/tutorials/certifications/3ad7e4dd-4b29-46f2-8e65-6e5706e0c067",
    width: 200,
    height: 200,
  },
  {
    id: 5,
    title: "Git Certified Specialist by GitKraken",
    description:
      "Expertise in Git version control and collaboration workflows.",
    image: "/gitkraken.svg",
    link: "https://cdn.filestackcontent.com/dq8NILlGROaJpp4bxYlC?policy=eyJjYWxsIjpbInJlYWQiXSwiZXhwaXJ5IjoxNzUwNjg3MzIwLCJwYXRoIjoiLyJ9&signature=3180d99a6f24a049042e2341f449f4e35a12688f261859fa6dfd88cac212d230",
    width: 200,
    height: 200,
  },
  {
    id: 6,
    title: "AWS Certified Developer - Associate",
    description:
      "Demonstrates proficiency in developing and maintaining applications on AWS.",
    image:
      "https://d1.awsstatic.com/certification/badges/AWS-Certified-Developer-Associate_badge_150x150.a8973e238efb2d1b0b24f5282e1ad87eb554e6ef.png",
    width: 200,
    height: 200,
  },
]

const ourCertificationsPageContent: CompositePageContent<'certifications', Certification[]> = {
  title: "Our Certifications",
  description: "Nimbus Tech is certified in various technologies and methodologies, ensuring the highest quality standards in our projects.",
  certifications,
  cta: {
    label: "Let’s Talk",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de"
  }
}

export default function OurCertifications() {
  return (
    <section id="our-certifications" className="bg-gray-50">
      <div className="mx-auto max-w-4xl text-center">
        <Heading title={ourCertificationsPageContent.title} />
        <p className="my-10 text-gray-700">
          {ourCertificationsPageContent.description}
        </p>
        <div className="flex justify-center">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {ourCertificationsPageContent.certifications.map((certification) => (
                <CarouselItem
                  key={certification.id}
                  className="flex flex-col items-center p-4"
                >
                  <Image
                    src={certification.image}
                    alt={certification.title}
                    className="h-auto w-40"
                    width={certification.width}
                    height={certification.height}
                    loading="lazy"
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
            <Link href={ourCertificationsPageContent.cta?.href ?? "#"}>
              {ourCertificationsPageContent.cta?.label ?? ""}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
