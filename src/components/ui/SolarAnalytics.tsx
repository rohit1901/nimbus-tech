"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Carousel";

const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    description: "Demonstrates expertise in designing distributed systems on AWS.",
    image: "/images/clouds.png",
  },
  {
    id: 2,
    title: "Google Cloud Professional Cloud Architect",
    description: "Validates ability to design and manage solutions on Google Cloud.",
    image: "/images/clouds.png",
  },
  {
    id: 3,
    title: "Microsoft Certified: Azure Solutions Architect Expert",
    description: "Shows proficiency in designing solutions on Microsoft Azure.",
    image: "/images/clouds.png",
  },
  {
    id: 4,
    title: "Certified Kubernetes Administrator (CKA)",
    description: "Demonstrates skills in managing Kubernetes clusters.",
    image: "/images/clouds.png",
  },
  {
    id: 5,
    title: "Certified Ethical Hacker (CEH)",
    description: "Validates skills in ethical hacking and penetration testing.",
    image: "/images/clouds.png",
  },
];

export function SolarAnalytics() {
  return (
    <section id="our-certifications" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">We are certified</h2>
        <p className="mb-10 text-gray-700">
          Nimbus Tech is certified in various technologies and methodologies, ensuring the highest quality standards in our projects.
        </p>
        <div className="flex justify-center">
          <Carousel className="w-full max-w-3xl">
            <CarouselContent>
              {certifications.map((certification) => (
                <CarouselItem key={certification.id}>
                  <img src={certification.image} alt={certification.title} className="w-full h-auto" />
                  <h3 className="text-xl font-semibold mt-4">{certification.title}</h3>
                  <p className="text-gray-600">{certification.description}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="mt-10">
          <a
            className="mt-6 inline-flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-linear-to-b from-orange-400 to-orange-500 px-5 py-3 leading-4 font-medium tracking-wide whitespace-nowrap text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all duration-200 ease-in-out hover:shadow-orange-300"
            href="mailto:r.khanduri@nimbus-tech.de"
          >Let’s Talk</a>
        </div>
      </div>
    </section>
  );
}
