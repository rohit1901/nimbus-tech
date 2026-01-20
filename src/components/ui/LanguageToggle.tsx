/**
 * @fileoverview LanguageToggle Component - Language selection dropdown
 *
 * Provides a dropdown menu for switching between available languages.
 * Supports two display variants: default (with label) and icon-only.
 *
 * @example
 * ```tsx
 * // Default variant (with translate icon and dropdown)
 * <LanguageToggle
 *   availableLanguages={languages}
 *   currentValue="en-US"
 *   onChange={handleLanguageChange}
 * />
 *
 * // Icon-only variant (compact)
 * <LanguageToggle
 *   availableLanguages={languages}
 *   currentValue="de-DE"
 *   onChange={handleLanguageChange}
 *   variant="icon"
 * />
 * ```
 */
import { RiTranslate } from "@remixicon/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select"
import { Language } from "@/app/graphql/types"

/**
 * Props for LanguageToggle component
 */
export type LanguageToggleProps = {
  /** Array of available language options from GraphQL */
  availableLanguages?: Language[]
  /** Currently selected language value (e.g., "en-US") */
  currentValue?: string | null
  /** Callback fired when language is changed */
  onChange: (value: string) => void
  /** Display variant - "default" shows label, "icon" is compact */
  variant?: "default" | "icon"
}

/**
 * Transforms GraphQL language objects into select options
 * Filters out invalid entries with missing values
 * @internal
 */
const buildLanguageOptions = (languages?: Language[]) =>
  (languages ?? [])
    .map((lang) => ({
      value: lang?.value ?? "",
      label: lang?.label ?? lang?.value ?? "",
    }))
    .filter((lang) => lang.value)

/**
 * Returns wrapper CSS classes based on variant
 * Icon variant always shows, default variant hidden on small screens
 * @internal
 */
const getWrapperClass = (isIconVariant: boolean) =>
  `items-center gap-2 ${isIconVariant ? "flex" : "hidden lg:flex"}`

/**
 * Returns select trigger CSS classes based on variant
 * @internal
 */
const getTriggerClass = (isIconVariant: boolean) =>
  isIconVariant
    ? "w-fit border-none bg-transparent px-2 shadow-none focus:ring-0 dark:text-gray-50"
    : "dark:bg-transparent dark:text-gray-50"

/**
 * LanguageToggle - Language selection dropdown component
 *
 * Allows users to switch between available languages from the GraphQL API.
 * Returns null if no languages are available.
 *
 * Features:
 * - Two display variants: default (with icon) and icon-only
 * - Responsive: default variant hidden on mobile
 * - Dark mode support
 * - Translate icon indicator
 * - Fully accessible select component
 *
 * @param availableLanguages - List of language options
 * @param currentValue - Currently selected language code
 * @param onChange - Language change handler
 * @param variant - Display style ("default" | "icon")
 * @returns Language selection dropdown or null if no languages available
 *
 * @example
 * ```tsx
 * // In footer
 * <LanguageToggle
 *   availableLanguages={[
 *     { value: 'en-US', label: 'English' },
 *     { value: 'de-DE', label: 'Deutsch' }
 *   ]}
 *   currentValue={currentLang}
 *   onChange={(lang) => setLanguage(lang)}
 * />
 *
 * // In navbar (icon variant)
 * <LanguageToggle
 *   availableLanguages={languages}
 *   currentValue={currentLang}
 *   onChange={handleChange}
 *   variant="icon"
 * />
 * ```
 */
const LanguageToggle = ({
  availableLanguages,
  currentValue,
  onChange,
  variant = "default",
}: LanguageToggleProps) => {
  const options = buildLanguageOptions(availableLanguages)

  if (options.length === 0) {
    return null
  }

  const isIconVariant = variant === "icon"

  return (
    <div className={getWrapperClass(isIconVariant)}>
      {!isIconVariant && (
        <RiTranslate className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      )}

      <Select value={currentValue ?? ""} onValueChange={onChange}>
        <SelectTrigger className={getTriggerClass(isIconVariant)}>
          {isIconVariant ? (
            <RiTranslate className="size-5" />
          ) : (
            <SelectValue placeholder="Select" />
          )}
        </SelectTrigger>

        <SelectContent className="dark:border-gray-800 dark:bg-gray-950">
          {options.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
              className="dark:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default LanguageToggle
