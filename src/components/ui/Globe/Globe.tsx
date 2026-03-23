"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cx as cn } from "@/lib/utils"
import { Map, Maybe } from "@/app/graphql/types"

const MapBorder = ({ position = "left" }: { position?: "left" | "right" }) => (
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
      <rect width="100%" height="100%" fill="url(#diagonal-border-pattern)" />
    </svg>
  </div>
)

const MOVEMENT_DAMPING = 1400

// Base marker data with their original sizes (as mutable arrays for Cobe compatibility)
const BASE_MARKERS: Array<{ location: [number, number]; size: number }> = [
  { location: [14.5995, 120.9842], size: 0.03 },
  { location: [19.076, 72.8777], size: 0.1 },
  { location: [23.8103, 90.4125], size: 0.05 },
  { location: [30.0444, 31.2357], size: 0.07 },
  { location: [39.9042, 116.4074], size: 0.08 },
  { location: [-23.5505, -46.6333], size: 0.1 },
  { location: [19.4326, -99.1332], size: 0.1 },
  { location: [40.7128, -74.006], size: 0.1 },
  { location: [34.6937, 135.5022], size: 0.05 },
  { location: [41.0082, 28.9784], size: 0.06 },
]

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 4.5,
  theta: 0.5,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [255 / 255, 200 / 255, 160 / 255],
  glowColor: [1, 1, 1],
  markers: BASE_MARKERS.map(m => ({ ...m })),
}

export function Globe({
  mapContent,
  className,
  config = GLOBE_CONFIG,
}: {
  mapContent: Maybe<Map>
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const isHovering = useRef(false)

  // Track animated marker sizes for smooth transitions
  const markerSizesRef = useRef<number[]>(BASE_MARKERS.map(m => m.size))
  const targetMarkerSizesRef = useRef<number[]>(BASE_MARKERS.map(m => m.size))

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    let animationFrameId: number

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    })

    const animate = () => {
      // Only rotate when hovering and not dragging
      if (!pointerInteracting.current && isHovering.current) {
        phiRef.current += 0.001
      }

      // Smoothly interpolate marker sizes with ease-out
      // This creates a fluid animation instead of jerky transitions
      markerSizesRef.current = markerSizesRef.current.map((currentSize, i) => {
        const targetSize = targetMarkerSizesRef.current[i]
        const diff = targetSize - currentSize
        // Apply smooth easing to the transition (10% interpolation per frame)
        return currentSize + diff * 0.1
      })

      // Create markers with smoothly animated sizes
      const animatedMarkers = BASE_MARKERS.map((marker, i) => ({
        location: marker.location,
        size: markerSizesRef.current[i],
      }))

      globe.update({
        phi: phiRef.current + rs.get(),
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        markers: animatedMarkers,
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)

    return () => {
      cancelAnimationFrame(animationFrameId)
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="relative flex w-full max-w-6xl scroll-my-24 flex-col items-center justify-center overflow-hidden rounded-2xl bg-gray-950 px-10 shadow-2xl shadow-black/50 sm:px-16 md:px-28 lg:mx-auto"
    >
      <MapBorder position="left" />
      <MapBorder position="right" />

      <div className="pt-12 text-base font-semibold tracking-tight text-orange-400 sm:pt-20 sm:text-lg">
        {mapContent?.title}
      </div>
      <h2
        id="location-title"
        className="mt-6 max-w-175 text-center text-2xl font-semibold tracking-tight text-balance text-white md:text-5xl"
      >
        {mapContent?.subheading}
      </h2>
      <p className="mt-4 max-w-2xl text-center text-base text-balance text-gray-400 sm:mt-8 sm:text-xl">
        {mapContent?.description ?? ""}
      </p>
      <div
        className={cn(
          "inset-0 mx-auto aspect-square w-full max-w-150",
          className
        )}
      >
        <canvas
          className={cn(
            "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
          )}
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX
            updatePointerInteraction(e.clientX)
          }}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseEnter={() => {
            isHovering.current = true
          }}
          onMouseLeave={() => {
            isHovering.current = false
          }}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      </div>
    </section>
  )
}
