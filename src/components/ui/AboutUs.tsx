import Heading from "@/components/Heading"
import OurApproach from "@/components/ui/OurApproach"
import { StickerCard } from "@/components/ui/StickerCard"
import {
  RiAwardFill,
  RiFlashlightFill,
  RiLightbulbFill,
  RiMoneyEuroBoxFill,
  RiShieldCheckFill,
} from "@remixicon/react"
type ApproachStep = {
  id: number
  type: "done" | "in progress" | "open"
  title: string
  description: string
  activityTime: string
}
export type OurApproachContent = {
  title: string
  description: string
  steps: ApproachStep[]
}
const ourApproachContent: OurApproachContent = {
  title: "Our Approach: From Vision to Value",
  description:
    "At Nimbus Tech, we follow a structured approach to ensure your project is successful from start to finish. Our process is designed to be flexible, transparent, and focused on delivering real business value.",
  steps: [
    {
      id: 1,
      type: "done",
      title: "Discovery: Listen & Learn",
      description:
        "We start by understanding your goals, challenges, and vision.",
      activityTime: "Step 1",
    },
    {
      id: 2,
      type: "done",
      title: "Planning: Architect for Success",
      description:
        "We design a scalable, future-proof solution tailored to your needs.",
      activityTime: "Step 2",
    },
    {
      id: 3,
      type: "done",
      title: "Development: Build with Quality",
      description:
        "We develop your solution using best practices and modern technologies.",
      activityTime: "Step 3",
    },
    {
      id: 4,
      type: "in progress",
      title: "Deployment: Launch & Deliver",
      description:
        "We deploy your product securely and ensure a smooth go-live.",
      activityTime: "Step 4",
    },
    {
      id: 5,
      type: "open",
      title: "Support: Optimize & Grow",
      description: "We provide ongoing support and continuous improvement.",
      activityTime: "Step 5",
    },
  ],
}
const aboutUsContent = {
  heading: "About Nimbus Tech",
  intro:
    "With over 14 years of experience in software development, architecture, and cloud, Nimbus Tech is your trusted partner for robust, scalable, and innovative digital solutions. Co-founded in Germany by experienced software architects, we combine deep technical expertise with a passion for solving complex challenges and delivering real business value.",
  valuesTitle: "Our Values",
  values: [
    {
      label: "Excellence",
      description:
        "Technical excellence and continuous improvement in every project.",
      icon: RiAwardFill,
    },
    {
      label: "Transparency",
      description: "Open communication and honest advice at all times.",
      icon: RiMoneyEuroBoxFill,
    },
    {
      label: "Collaboration",
      description: "Building the best solutions together with our clients.",
      icon: RiFlashlightFill,
    },
    {
      label: "Reliability",
      description: "Consistent delivery and long-term support.",
      icon: RiShieldCheckFill,
    },
    {
      label: "Innovation",
      description: "Embracing new technologies and creative thinking.",
      icon: RiLightbulbFill,
    },
  ],
  closing:
    "At Nimbus Tech, we are passionate about helping you succeed in your digital transformation journey.",
}

function OurValues({
  valuesContent,
  valuesTitle,
}: {
  valuesContent: typeof aboutUsContent.values
  valuesTitle: string
}) {
  return (
    <section id="our-values" className="my-4">
      <div className="mx-auto px-4">
        <Heading title={valuesTitle} className="mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {valuesContent.map((value) => (
            <StickerCard
              key={value.label}
              Icon={value.icon}
              title={value.label}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutUs() {
  return (
    <section id="about-us" className="mx-auto max-w-6xl">
      <Heading title={aboutUsContent.heading} className="mb-4" />
      <p className="mb-20 text-center text-lg text-gray-700">
        {aboutUsContent.intro}
      </p>
      <OurValues
        valuesContent={aboutUsContent.values}
        valuesTitle={aboutUsContent.valuesTitle}
      />
      <OurApproach {...ourApproachContent} />
      <p className="text-center text-gray-600">{aboutUsContent.closing}</p>
    </section>
  )
}
