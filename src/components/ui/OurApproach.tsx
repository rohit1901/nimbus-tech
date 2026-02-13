import { Approach, Maybe } from "@/app/graphql/types"
import Heading from "@/components/Heading"
import { cx } from "@/lib/utils"
import { RiCheckLine } from "@remixicon/react"

export default function OurApproach({
  approaches,
}: {
  approaches?: Maybe<Approach>
}) {
  // Early return if no data
  if (!approaches) return null

  const { title, description, steps } = approaches

  // Validate required fields
  if (!title && !description && (!steps || steps.length === 0)) {
    return null
  }

  // Safely sort steps with error handling
  const getSortedSteps = () => {
    try {
      if (!steps || !Array.isArray(steps) || steps.length === 0) {
        return []
      }

      // Create a copy and sort safely
      return [...steps]
        .filter((step) => step != null) // Remove null/undefined items
        .sort((a, b) => {
          const stepIdA = a?.stepId ?? 0
          const stepIdB = b?.stepId ?? 0
          return stepIdA - stepIdB
        })
    } catch (error) {
      console.error("Error sorting steps in OurApproach:", error)
      return steps || []
    }
  }

  const sortedSteps = getSortedSteps()

  // Don't render if no valid steps
  if (sortedSteps.length === 0) {
    return null
  }

  return (
    <section id="our-approach" className="py-16">
      {title && <Heading title={title} className="mb-6 text-center" />}
      {description && (
        <p className="mb-8 text-center text-lg text-gray-700 dark:text-gray-400">
          {description}
        </p>
      )}
      <ul
        role="list"
        className="mx-auto mt-6 max-w-lg space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
      >
        {sortedSteps.map((step, index) => {
          // Skip if step is null or missing required fields
          if (!step || !step.title) {
            return null
          }

          // Generate a stable key
          const key = step.id || step.title || `step-${index}`

          return (
            <li key={key} className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <span
                  className={cx(
                    "flex h-6 w-6 items-center justify-center rounded-full border-2",
                    step.type === "done"
                      ? "border-orange-500"
                      : step.type === "in progress"
                        ? "border-0 bg-orange-500"
                        : "border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800",
                  )}
                >
                  {step.type === "done" && (
                    <RiCheckLine className="h-4 w-4 text-orange-500" />
                  )}
                </span>
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">
                  {step.title}
                </p>
                {step.description && (
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                )}
                {step.activityTime && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    {step.activityTime}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
