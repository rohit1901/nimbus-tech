"use client"

import * as React from "react"

import { Feature, Map, Maybe } from "@/app/graphql/types"
import { DottedMap } from "@/components/ui/Globe/DottedMap"
import type { Marker } from "@/components/ui/Globe/DottedMap"
import { Badge } from "@/components/Badge"
import { useLanguageContext } from "@/app/providers/LanguageContext"

export const markers: Marker[] = [
  { lat: 51.3397, lng: 12.3731, size: 0.3 }, // Leipzig
  { lat: 37.773972, lng: -122.431297, size: 0.3 }, // SF
  { lat: 40.7128, lng: -74.006, size: 0.28, pulse: false }, // NYC
  { lat: 28.679079, lng: 77.06971, size: 0.3 }, // Delhi
  { lat: 35.6895, lng: 139.6917, size: 0.28 }, // Tokyo
  { lat: 1.3521, lng: 103.8198, size: 0.26 }, // Singapore
  { lat: -31.9522, lng: 115.8589, size: 0.3 }, // Perth
  { lat: -23.5505, lng: -46.6333, size: 0.28 }, // São Paulo
  { lat: -1.2921, lng: 36.8219, size: 0.28 }, // Nairobi
]
const enFeatures: Pick<Feature, "title" | "description">[] = [
  {
    title: "AWS-Native Architecture",
    description:
      "We design event-driven and serverless architectures using native AWS services so your product ships faster and scales smoothly as you grow.",
  },
  {
    title: "Cloud Cost Optimization",
    description:
      "We structure accounts, workloads, and autoscaling with FinOps best practices so your AWS spend remains transparent, predictable, and continuously optimized.",
  },
  {
    title: "Cloud Security & Compliance",
    description:
      "We apply the AWS Well-Architected Framework and security best practices—IAM, networking, encryption, and logging—to build a secure, audit-ready cloud foundation.",
  },
]

const deFeatures: Pick<Feature, "title" | "description">[] = [
  {
    title: "AWS-native Architektur",
    description:
      "Wir entwerfen ereignisgesteuerte und serverlose Architekturen mit nativen AWS-Diensten, damit Ihr Produkt schneller ausgeliefert wird und reibungslos mit Ihrem Wachstum skaliert.",
  },
  {
    title: "Cloud-Kostenoptimierung",
    description:
      "Wir strukturieren Konten, Workloads und Autoscaling nach FinOps-Best-Practices, damit Ihre AWS-Ausgaben transparent, vorhersehbar und kontinuierlich optimiert bleiben.",
  },
  {
    title: "Cloud-Sicherheit & Compliance",
    description:
      "Wir wenden das AWS Well-Architected Framework und bewährte Sicherheitsverfahren – IAM, Netzwerke, Verschlüsselung und Logging – an, um eine sichere, auditfähige Cloud-Grundlage zu schaffen.",
  },
]


const featureMap: Record<"en-US" | "de-DE", typeof enFeatures> = {
  "en-US": enFeatures,
  "de-DE": deFeatures,
}

export const GlobalDatabase: React.FunctionComponent<{ mapContent?: Maybe<Map> }> = ({
  mapContent,
}) => {
  const { currentLanguage } = useLanguageContext()
  if (!currentLanguage || !currentLanguage.value) return null
  const features = featureMap[currentLanguage.value as keyof typeof featureMap]

  return (
    <div className="px-3">
      <section
        aria-labelledby="global-database-title"
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-linear-to-b from-black via-slate-950 to-black px-3 pt-12 pb-12 shadow-xl shadow-black/30 sm:px-6 md:px-8 md:pt-16 md:pb-16"
      >
        {/* heading block on top */}
        <div className="relative z-20 flex flex-col items-center gap-3 px-2 text-center sm:gap-4 sm:px-4">
          <Badge variant="slate">{mapContent?.subheading}</Badge>

          <h2
            id="global-database-title"
            className="text-balance bg-linear-to-b from-gray-100 to-gray-300 bg-clip-text text-center text-2xl font-bold tracking-tight text-orange-500 sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {mapContent?.title}
          </h2>

          {mapContent?.description && (
            <p className="max-w-2xl text-balance text-xs text-gray-300 sm:text-sm md:text-base">
              {mapContent.description}
            </p>
          )}
        </div>

        {/* blended map background strip */}
        <div className="relative z-10 mt-4 w-full max-w-5xl px-1 sm:mt-10 sm:px-4">
          <div className="relative w-full overflow-hidden rounded-2xl sm:h-75 md:h-85">
            {/* gradient backdrop so map blends into section */}
            <div className="pointer-events-none absolute inset-0 " />
            {/* soft orange glow */}
            <div className="pointer-events-none absolute inset-x-[-25%] top-[-35%] h-[260%] blur-3xl" />
            {/* map itself */}
            <DottedMap
              markers={markers}
              pulse
              mapSamples={7500}
              dotRadius={0.24}
              dotColor="rgba(226,232,240,0.8)"
              markerColor="#ff6900"
              className="relative h-full w-full"
            />

            {/* feature cards overlaid */}
            <div className="pointer-events-none absolute inset-x-3 bottom-0 mx-auto max-w-none sm:max-w-4xl hidden md:block">
              <div className="pointer-events-auto grid grid-cols-1 gap-y-4 rounded-2xl border border-white/6 bg-black/25 px-4 py-4 text-left shadow-xl backdrop-blur sm:grid-cols-3 sm:gap-x-6 sm:gap-y-6 md:p-8">
                {features.map((item) => (
                  <div key={item.title} className="flex flex-col gap-2">
                    <h3 className="bg-linear-to-b from-orange-400 to-orange-500 bg-clip-text text-sm font-semibold text-orange-500 sm:text-base md:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-5 text-gray-200 dark:text-gray-200 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
