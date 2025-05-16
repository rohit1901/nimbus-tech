import {
  RiCloudFill,
  RiCodeBoxFill,
  RiServerFill,
  RiShieldCheckFill
} from "@remixicon/react"
import { Divider } from "../Divider"
import AnalyticsIllustration from "./AnalyticsIllustration"
import { StickerCard } from "./StickerCard"

export function SolarAnalytics() {
  return (
    <section
      aria-labelledby="nimbus-analytics"
      className="relative mx-auto w-full max-w-6xl overflow-hidden"
    >
      <div>
        <h2
          id="nimbus-analytics"
          className="relative scroll-my-24 text-lg font-semibold tracking-tight text-orange-500"
        >
          Nimbus Analytics
          <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-blue-600" />
        </h2>
        <p className="mt-2 max-w-lg text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl">
          Transform your data into actionable insights with real-time software and cloud analytics
        </p>
      </div>
      <div className="*:pointer-events-none">
        <AnalyticsIllustration />
      </div>
      <Divider className="mt-0"></Divider>
      <div className="grid grid-cols-1 grid-rows-2 gap-6 md:grid-cols-4 md:grid-rows-1">
        <StickerCard
          Icon={RiCloudFill}
          title="Cloud Resource Analytics"
          description="Monitor and optimize your cloud infrastructure for cost and performance."
        />
        <StickerCard
          Icon={RiCodeBoxFill}
          title="Application Performance"
          description="Track software health, uptime, and user engagement in real time."
        />
        <StickerCard
          Icon={RiServerFill}
          title="Architecture Health"
          description="Assess system architecture for scalability, reliability, and efficiency."
        />
        <StickerCard
          Icon={RiShieldCheckFill}
          title="Security Insights"
          description="Identify vulnerabilities and monitor security posture across all systems."
        />
      </div>
    </section>
  )
}
