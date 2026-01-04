import { Maybe } from "@/app/graphql/types"
import { cx } from "@/lib/utils"
import { RemixIconComponent } from "../RemixIconComponent"

export const StickerCard = ({
  title,
  description,
  iconName,
}: {
  title?: Maybe<string>
  description?: Maybe<string>
  iconName?: Maybe<string>
}) => {
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
