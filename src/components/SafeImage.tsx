/**
 * @fileoverview SafeImage Component - Type-safe Next.js Image wrapper
 *
 * Safely renders Next.js Image component with GraphQL image type.
 * Handles missing or invalid image data gracefully by returning null.
 *
 * @example
 * ```tsx
 * // With GraphQL image data
 * <SafeImage image={pageContent.image} />
 *
 * // With custom className
 * <SafeImage
 *   image={testimonial.avatar}
 *   props={{ className: "rounded-full" }}
 * />
 *
 * // Returns null if image is missing
 * <SafeImage image={null} /> // renders nothing
 * ```
 */
import { Image as ImageType, Maybe } from "@/app/graphql/types"
import Image from "next/image"

/**
 * Props for SafeImage component
 */
type SafeImageProps = {
  /** GraphQL image object with src, alt, width, height, etc. */
  image?: Maybe<ImageType>
  /** Additional HTML image element props (primarily for className) */
  props?: Partial<HTMLImageElement>
}

/**
 * SafeImage - Type-safe wrapper for Next.js Image component
 *
 * Renders a Next.js Image component with data from GraphQL API.
 * Returns null if image data is missing or invalid, preventing runtime errors.
 *
 * Features:
 * - Null-safe rendering
 * - Automatic fallback alt text
 * - Supports both fixed dimensions and fill mode
 * - TypeScript type safety
 * - Dark mode compatible
 *
 * @param image - GraphQL image object containing src, alt, dimensions
 * @param props - Additional HTML props (mainly className for styling)
 * @returns Next.js Image component or null if image is invalid
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SafeImage image={hero.backgroundImage} />
 *
 * // With custom styling
 * <SafeImage
 *   image={profile.avatar}
 *   props={{ className: "w-24 h-24 rounded-full object-cover" }}
 * />
 *
 * // Fill mode example
 * <div className="relative w-full h-96">
 *   <SafeImage image={banner} /> // Uses fill if image.fill is true
 * </div>
 * ```
 */
export const SafeImage = ({ image, props }: SafeImageProps) => {
  // Return null if image is missing or has no source
  if (!image || !image?.src) {
    return null
  }

  return (
    <Image
      {...image}
      alt={image.alt ?? "Image Alt"}
      className={props?.className}
      src={image?.src}
      width={image?.width ?? undefined}
      height={image?.height ?? undefined}
      fill={!!image.fill}
    />
  )
}
