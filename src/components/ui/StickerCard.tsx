/**
 * @fileoverview StickerCard Component - Animated card with folded corner effect
 *
 * A visually distinctive card component with a folded top-right corner "sticker" effect.
 * Features smooth hover animations and dark mode support.
 *
 * @example
 * ```tsx
 * <StickerCard
 *   title="Cloud Infrastructure"
 *   description="Build scalable cloud solutions"
 *   iconName="RiCloudLine"
 * />
 * ```
 */
import { Maybe } from "@/app/graphql/types"
import { cx } from "@/lib/utils"
import { RemixIconComponent } from "../RemixIconComponent"

/**
 * Props for StickerCard component
 */
type StickerCardProps = {
  /** Card title text */
  title?: Maybe<string>
  /** Card description/body text */
  description?: Maybe<string>
  /** Remix Icon name to display (required for card to render) */
  iconName?: Maybe<string>
}

/**
 * StickerCard - Card component with animated folded corner effect
 *
 * Creates a card with a distinctive "sticker" appearance featuring a folded
 * top-right corner. Returns null if no icon is provided.
 *
 * Features:
 * - Animated folded corner that expands on hover
 * - Icon with accent color bar
 * - Smooth transitions
 * - Dark mode support
 * - Accessible markup
 *
 * Design Details:
 * - Base card with rounded corners
 * - Top-right corner "fold" created with pseudo-elements
 * - Orange accent bar on the left side
 * - Hover effect enlarges the folded corner
 *
 * @param title - Card heading text
 * @param description - Card body text
 * @param iconName - RemixIcon name (e.g., "RiCloudLine")
 * @returns Styled card component or null if no icon provided
 *
 * @example
 * ```tsx
 * // Basic usage
 * <StickerCard
 *   title="DevOps Services"
 *   description="Streamline your deployment pipeline"
 *   iconName="RiGitBranchLine"
 * />
 *
 * // In a grid
 * <div className="grid grid-cols-3 gap-6">
 *   {features.map((feature) => (
 *     <StickerCard
 *       key={feature.id}
 *       title={feature.title}
 *       description={feature.description}
 *       iconName={feature.icon}
 *     />
 *   ))}
 * </div>
 * ```
 */
export const StickerCard = ({
  title,
  description,
  iconName,
}: StickerCardProps) => {
  if (!iconName) return null
  return (
    <div className="relative">
      <a
        className={cx(
          "relative z-10 mt-0 block h-full w-full overflow-hidden hover:cursor-pointer",
          "transition-all duration-[180ms] ease-in-out",
          // Background and main border (shadow)
          "rounded-lg rounded-tr-[26px] bg-white px-4 pt-5 pb-[18px] shadow-[inset_0_0_0_1px] shadow-gray-200 dark:bg-gray-900 dark:shadow-gray-800",
          // Before pseudo-element (Diagonal fold line/shadow)
          "before:absolute before:top-0 before:right-0 before:z-3 before:h-[30px] before:w-[30px] before:translate-x-1/2 before:-translate-y-1/2 before:rotate-45",
          "before:bg-gray-50 before:shadow-[0_1px_0_0_] before:shadow-gray-200 before:transition-all before:duration-[180ms] before:ease-in-out before:content-['']",
          "dark:before:bg-gray-950 dark:before:shadow-gray-800",
          // After pseudo-element (The triangle cutout background)
          "after:absolute after:top-0 after:right-0 after:z-2 after:size-7 after:translate-x-2 after:-translate-y-2 after:rounded-bl-lg after:border",
          "after:bg-gray-50 after:shadow-xs after:transition-all after:duration-[180ms] after:ease-in-out after:content-['']",
          "dark:after:border-gray-800 dark:after:bg-gray-950",
          // Hover states
          "hover:rounded-tr-[45px] hover:before:h-[50px] hover:before:w-[50px] hover:after:h-[42px] hover:after:w-[42px] hover:after:shadow-lg hover:after:shadow-black/5",
        )}
      >
        <div>
          <div className="relative flex items-center gap-2">
            <div className="absolute -left-4 h-5 w-[3px] rounded-r-sm bg-orange-500 dark:bg-orange-400" />
            <RemixIconComponent
              className="size-5 shrink-0 text-orange-500 dark:text-orange-400"
              name={iconName}
            />
            <h3 className="font-medium text-gray-900 dark:text-gray-50">
              {title ?? ""}
            </h3>
          </div>
          <p className="mt-2 text-gray-600 sm:text-sm dark:text-gray-400">
            {description ?? ""}
          </p>
        </div>
      </a>
    </div>
  )
}
