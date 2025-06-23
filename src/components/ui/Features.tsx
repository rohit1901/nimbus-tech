import { Icons } from "@/components/Icons"
import { Orbit } from "@/components/Orbit"
import ChipViz from "@/components/ui/ChipViz"
import {
  RiBarChartLine,
  RiCheckLine,
  RiCodeBoxLine,
  RiCodepenLine,
  RiContrast2Line,
  RiFullscreenFill,
  RiLoaderFill,
  RiNotification2Line,
  RiReactjsLine,
  RiRocket2Line,
  RiSettings3Line,
  RiStackLine,
  RiTeamLine,
} from "@remixicon/react"
import { SolarMark } from "../../../public/SolarMark"

// --- Reusable Components ---

function VerticalLines() {
  const lines = [
    { className: "absolute inset-y-0 my-[-5rem] w-px", style: {}, show: true },
    {
      className: "absolute inset-y-0 right-0 my-[-5rem] w-px",
      style: {},
      show: true,
    },
    {
      className: "absolute inset-y-0 left-1/2 -z-10 my-[-5rem] w-px",
      style: {},
      show: true,
    },
    {
      className:
        "absolute inset-y-0 left-1/4 -z-10 my-[-5rem] hidden w-px sm:block",
      style: {},
      show: true,
    },
    {
      className:
        "absolute inset-y-0 left-3/4 -z-10 my-[-5rem] hidden w-px sm:block",
      style: {},
      show: true,
    },
  ]
  return (
    <div className="pointer-events-none inset-0 select-none">
      {lines.map((line, idx) => (
        <div
          key={idx}
          className={line.className}
          style={{
            maskImage:
              "linear-gradient(transparent, white 5rem, white calc(100% - 5rem), transparent)",
            ...line.style,
          }}
        >
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              className="stroke-gray-300"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

function FeatureTextBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="col-span-2 my-auto px-2">
      <h2 className="relative text-lg font-semibold tracking-tight text-orange-500">
        {title}
        <div className="absolute top-1 -left-[8px] h-5 w-[3px] rounded-r-sm bg-orange-500" />
      </h2>
      {children}
    </div>
  )
}

function OrbitFeatureVisualization() {
  return (
    <div className="relative col-span-2 flex items-center justify-center overflow-hidden">
      <PatternBackground />
      <div className="pointer-events-none h-[26rem] p-10 select-none">
        <div className="relative flex flex-col items-center justify-center">
          <Orbit
            durationSeconds={40}
            radiusPx={140}
            keepUpright
            orbitingObjects={[
              <OrbitObject
                key="obj1"
                icon={<RiBarChartLine className="z-10 size-5 text-gray-900" />}
                label="Planning"
                labelColor="bg-red-500"
                iconLabel={
                  <RiStackLine className="size-3 shrink-0 text-white" />
                }
                pingDelay="1s"
              />,
              <OrbitObject
                key="obj2"
                icon={
                  <RiLoaderFill className="z-10 size-5 rotate-90 text-gray-900" />
                }
                label="Analysis"
                labelColor="bg-gray-500"
                iconLabel={
                  <RiSettings3Line className="size-3 shrink-0 text-white" />
                }
                pingDelay="4s"
              />,
              <OrbitObject
                key="obj3"
                label="Development"
                icon={<RiCodeBoxLine className="z-10 size-5 text-gray-900" />}
                iconLabel={
                  <RiReactjsLine className="size-3 shrink-0 text-white" />
                }
                labelColor="bg-blue-500"
                pingDelay="2s"
              />,
              <OrbitObject
                key="obj4"
                icon={
                  <Icons.QuadCopter className="z-10 size-5 rotate-90 text-gray-900" />
                }
                label="Deployment"
                labelColor="bg-emerald-500"
                iconLabel={
                  <RiCheckLine className="size-3 shrink-0 text-white" />
                }
                pingDelay="6s"
              />,
              <OrbitObject
                key="obj5"
                label="Optimization"
                icon={<RiRocket2Line className="z-10 size-5 text-gray-900" />}
                pingDelay="3s"
                labelColor="bg-purple-500"
                iconLabel={
                  <RiTeamLine className="size-3 shrink-0 text-white" />
                }
              />,
            ]}
          >
            <div className="relative flex h-48 w-48 items-center justify-center">
              <div className="rounded-full p-1 ring-1 ring-black/10">
                <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-white shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.1),0_7px_10px_0_rgba(0,0,0,0.15)] ring-1 ring-black/20">
                  <SolarMark className="size-10" />
                </div>
                <div className="absolute inset-12 animate-[spin_8s_linear_infinite] rounded-full bg-linear-to-t from-transparent via-orange-400 to-transparent blur-lg" />
              </div>
            </div>
          </Orbit>
        </div>
      </div>
    </div>
  )
}

function OrbitObject({
  icon,
  label,
  labelColor,
  iconLabel,
  pingDelay,
}: {
  icon: React.ReactNode
  label?: string
  labelColor?: string
  iconLabel?: React.ReactNode
  pingDelay?: string
}) {
  return (
    <div className="relative flex items-center justify-center">
      {icon}
      <div className="absolute size-10 rounded-full bg-white/50 shadow-lg ring-1 ring-black/5"></div>
      {label && (
        <div className="absolute -top-5 left-4">
          <div className="flex gap-1">
            <div
              className={`flex items-center justify-center rounded-l-full ${labelColor} p-1 text-xs ring-1 ring-gray-200`}
            >
              {iconLabel}
            </div>
            <div className="rounded-r-full bg-white/50 py-0.5 pr-1.5 pl-1 text-xs whitespace-nowrap ring-1 ring-gray-200">
              {label}
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          animationDelay: pingDelay,
        }}
        className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-orange-500/50"
      ></div>
    </div>
  )
}

function PatternBackground() {
  return (
    <svg className="absolute size-full [mask-image:linear-gradient(transparent,white_10rem)]">
      <defs>
        <pattern
          id="diagonal-feature-pattern"
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
                className="stroke-gray-200/70"
                strokeWidth="1"
              />
            )
          })}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonal-feature-pattern)" />
    </svg>
  )
}

function CloudFeatureVisualization() {
  const tempData = [
    { top: 144, left: 48, value: "14°C" },
    { top: 48, left: 144, value: "18°C" },
    { top: 96, left: 240, value: "17°C" },
    { top: 240, left: 385, value: "14°C" },
    { top: 337, left: 336, value: "12°C" },
    { top: 288, left: 144, value: "17°C" },
  ]
  return (
    <div className="relative col-span-2 flex items-center justify-center overflow-hidden">
      <PatternBackground />
      <div className="relative h-[432px] w-[432px]">
        <svg
          id="grid"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="mask absolute size-[432px]"
        >
          <path
            className="stroke-gray-300"
            d="M48 0v432M96 0v432M144 0v432M192 0v432M240 0v432M288 0v432M336 0v432M384 0v432M0 48h432M0 96h432M0 144h432M0 192h432M0 240h432M0 288h432M0 336h432M0 384h432"
          />
        </svg>
        <div className="pointer-events-none relative h-full select-none">
          <div className="absolute top-[192px] left-[191.8px]">
            <div className="flex h-12 w-12 items-center justify-center bg-white shadow-sm ring-1 ring-black/15">
              <SolarMark className="h-8 w-8" />
            </div>
          </div>
          {tempData.map((d, i) => (
            <div
              key={i}
              className="absolute"
              style={{ top: d.top, left: d.left }}
            >
              <div className="relative">
                <div className="absolute inset-0 size-12 animate-pulse bg-orange-200 blur-[3px]"></div>
                <div className="relative flex h-12 w-12 items-center justify-center bg-white shadow-sm ring-1 ring-black/15">
                  <span className="text-sm font-medium text-gray-500">
                    {d.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArchitectureFeatureVisualization() {
  const icons = [
    {
      top: "top-[6rem]",
      left: "left-[6rem]",
      icon: (
        <RiNotification2Line
          className="size-5 text-gray-900"
          aria-hidden="true"
        />
      ),
    },
    {
      top: "top-[6rem]",
      left: "right-[6rem]",
      icon: (
        <RiContrast2Line className="size-5 text-gray-900" aria-hidden="true" />
      ),
    },
    {
      top: "right-[6rem]",
      left: "bottom-[6rem]",
      icon: (
        <RiCodepenLine className="size-5 text-gray-900" aria-hidden="true" />
      ),
    },
    {
      top: "bottom-[6rem]",
      left: "left-[6rem]",
      icon: (
        <RiFullscreenFill className="size-5 text-gray-900" aria-hidden="true" />
      ),
    },
  ]
  return (
    <div className="relative col-span-2 flex items-center justify-center overflow-hidden">
      <PatternBackground />
      <div className="pointer-events-none relative flex size-full h-[26rem] items-center justify-center p-10 select-none">
        <div className="relative">
          {icons.map((item, i) => (
            <div key={i} className={`absolute ${item.top} ${item.left} z-20`}>
              <div className="relative mx-auto w-fit rounded-full bg-gray-50 p-1 shadow-md ring-1 shadow-black/10 ring-black/10">
                <div className="w-fit rounded-full bg-linear-to-b from-white to-gray-100 p-3 shadow-[inset_0px_-2px_6px_rgba(0,0,0,0.09),0_3px_5px_0_rgba(0,0,0,0.19)] ring-1 ring-white/50 ring-inset">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          {[0, 45, 135, 180, 225, 315, 360].map((rotation, index) => (
            <div
              key={rotation}
              className="absolute origin-left overflow-hidden"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="relative">
                <div className="h-0.5 w-60 bg-linear-to-r from-gray-300 to-transparent" />
                <div
                  className="absolute top-0 left-0 h-0.5 w-28 bg-linear-to-r from-transparent via-orange-300 to-transparent"
                  style={{
                    animation: `gridMovingLine 5s linear infinite ${index * 1.2}s`,
                    animationFillMode: "backwards",
                  }}
                />
              </div>
            </div>
          ))}
          <div className="absolute -translate-x-1/2 -translate-y-1/2">
            <ChipViz />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Main Features Component ---

export default function Features() {
  return (
    <section
      aria-label="Solutions"
      id="solutions"
      className="relative mx-auto max-w-6xl scroll-my-24"
    >
      <VerticalLines />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-0">
        <FeatureTextBlock title="Software development">
          <p
            className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl"
            id="software-development"
          >
            Custom applications tailored to your business needs, from web to
            mobile.
          </p>
          <p className="mt-4 text-balance text-gray-700">
            Our team specializes in creating custom software solutions that
            streamline your operations, enhance productivity, and drive growth.
            Whether you need a web application, mobile app, or cloud-based
            solution, we have the expertise to deliver results that exceed your
            expectations.
          </p>
        </FeatureTextBlock>
        <OrbitFeatureVisualization />

        <FeatureTextBlock title="Cloud Development">
          <p
            className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl"
            id="cloud-architecture"
          >
            Seamless cloud migration and scalable solutions leveraging AWS,
            Azure, or GCP
          </p>
          <p className="mt-4 text-balance text-gray-700">
            Our cloud development services help you migrate to the cloud
            effortlessly, ensuring your applications are optimized for
            performance, security, and scalability. We specialize in AWS, Azure,
            and GCP, providing tailored solutions that meet your unique
            requirements.
          </p>
        </FeatureTextBlock>
        <CloudFeatureVisualization />

        <FeatureTextBlock title="Architecture & Consulting">
          <p
            className="mt-2 text-3xl font-semibold tracking-tighter text-balance text-gray-900 md:text-4xl"
            id="software-architecture"
          >
            Robust system design and technical consulting for future-proof
            infrastructure.
          </p>
          <p className="mt-4 text-balance text-gray-700">
            Our architecture and consulting services ensure your systems are
            designed for scalability, reliability, and performance. We work
            closely with you to understand your business goals and provide
            tailored solutions that align with your vision.
          </p>
        </FeatureTextBlock>
        <ArchitectureFeatureVisualization />
      </div>
    </section>
  )
}
