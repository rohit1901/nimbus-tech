import {
  RemixiconComponentType,
  RiBarChart2Line,
  RiCloudLine,
  RiCodeBoxLine,
  RiReactjsLine,
  RiStackLine,
  RiTeamLine
} from "@remixicon/react"
import { SVGMap } from "./SVGMap"

type MapBorderProps = { position?: "left" | "right" }
type MapFeaturePinProps = {
  className?: string
  icon: RemixiconComponentType
  label?: string
  labelClass?: string
  iconClass?: string
  pingColor?: string
  animationDelay?: string
}

// Reusable border component
const MapBorder = ({ position = "left" }: MapBorderProps) => (
  <div className={`absolute ${position}-0 z-10 h-full backdrop-blur-[2px]`}>
    <svg
      className="h-full w-8 border-r border-zinc-900 stroke-zinc-800 sm:w-20"
      style={{
        maskImage:
          "linear-gradient(transparent, white 10rem, white calc(100% - 10rem), transparent)",
      }}
    >
      <defs>
        <pattern
          id="diagonal-border-pattern"
          patternUnits="userSpaceOnUse"
          width="64"
          height="64"
        >
          {Array.from({ length: 17 }, (_, i) => {
            const offset = i * 8
            return (
              <path
                key={i}
                d={`M${-106 + offset} 110L${22 + offset} -18`}
                stroke=""
                strokeWidth="1"
              />
            )
          })}
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#diagonal-border-pattern)"
      />
    </svg>
  </div>
)

// Reusable feature pin component
const MapFeaturePin = ({
  className,
  icon: Icon,
  label,
  labelClass = "",
  iconClass = "",
  pingColor = "",
  animationDelay = "",
}: MapFeaturePinProps) => (
  <div className={className}>
    <div className="relative flex items-center justify-center">
      <div className="absolute size-10 rounded-full bg-gray-950 ring-1 ring-white/15"></div>
      {label && (
        <div className={`absolute -top-4 flex w-fit items-center justify-center rounded-full bg-gray-950 px-2 py-0.5 text-xs whitespace-nowrap text-white ring-1 ring-white/15 ${labelClass}`}>
          {label}
        </div>
      )}
      <Icon className={`relative size-5 text-white ${iconClass}`} />
      {pingColor && (
        <div
          style={{ animationDelay }}
          className={`absolute size-10 animate-[ping_5s_ease_infinite] rounded-full ring-1 ${pingColor}`}
        ></div>
      )}
    </div>
  </div>
)

export const Map = () => {
  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="relative flex w-full max-w-6xl scroll-my-24 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-950 px-10 shadow-2xl shadow-black/50 sm:px-16 md:px-28 lg:mx-auto"
    >
      <MapBorder position="left" />
      <MapBorder position="right" />

      <div className="pt-12 text-base font-semibold tracking-tight text-orange-400 sm:pt-20 sm:text-lg">
        Global Reach, Local Expertise
      </div>
      <h2
        id="location-title"
        className="mt-6 max-w-[700px] text-center text-2xl font-semibold tracking-tight text-balance text-white md:text-5xl"
      >
        Expert Software & Cloud Consulting, Wherever You Are
      </h2>
      <p className="mt-4 max-w-2xl text-center text-base text-balance text-gray-400 sm:mt-8 sm:text-xl">
        Our team operates from Germany, collaborating with enterprises and startups worldwide to architect, build, and optimize custom software and cloud systems.
      </p>

      <div className="relative mt-20 mb-10 ml-[17rem] scale-90 sm:mb-16 md:mt-24 md:ml-0 md:scale-100">
        <SVGMap className="w-[50rem] shrink-0" />

        <MapFeaturePin
          className="absolute -top-3 left-[130px]"
          icon={RiCodeBoxLine}
          label="Custom Software"
          pingColor="ring-orange-500/50"
          animationDelay="3.5s"
        />
        <MapFeaturePin
          className="absolute top-[73px] left-[243px]"
          icon={RiCloudLine}
          label="Cloud & DevOps"
          pingColor="ring-blue-400/50"
          animationDelay="2.5s"
          labelClass="-right-[1rem]"
        />
        <MapFeaturePin
          className="absolute top-32 right-[300px]"
          icon={RiReactjsLine}
          label="Frontend"
          pingColor="ring-cyan-400/50"
          animationDelay="3.5s"
          labelClass="-right-[3.7rem]"
        />
        <MapFeaturePin
          className="absolute top-20 right-[390px]"
          icon={RiBarChart2Line}
        />
        <MapFeaturePin
          className="absolute top-12 right-[430px]"
          icon={RiStackLine}
          label="Tech Stack"
          labelClass="-right-7"
        />
        <MapFeaturePin
          className="absolute top-9 right-56"
          icon={RiTeamLine}
          label="Team"
          iconClass="z-10"
        />
      </div>
    </section>
  )
}
