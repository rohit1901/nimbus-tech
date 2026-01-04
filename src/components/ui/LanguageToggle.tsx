import { RiTranslate } from "@remixicon/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select"
import { Language, Maybe } from "@/app/graphql/types"

export type LanguageToggleProps = {
  availableLanguages?: Array<Maybe<Language> | undefined> | null
  currentValue?: string | null
  onChange: (value: string) => void
  variant?: "default" | "icon"
}

const LanguageToggle = ({
  availableLanguages,
  currentValue,
  onChange,
  variant = "default",
}: LanguageToggleProps) => {
  const options = (availableLanguages ?? [])
    .map((lang) => ({
      value: lang?.value ?? "",
      label: lang?.label ?? lang?.value ?? "",
    }))
    .filter((lang) => lang.value)

  if (options.length === 0) {
    return null
  }

  const isIconVariant = variant === "icon"

  return (
    <div
      className={`items-center gap-2 ${isIconVariant ? "flex" : "hidden lg:flex"}`}
    >
      {/* In default mode, show the icon outside the select */}
      {!isIconVariant && (
        <RiTranslate className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      )}

      <Select value={currentValue ?? ""} onValueChange={onChange}>
        <SelectTrigger
          className={
            isIconVariant
              ? "w-fit border-none bg-transparent px-2 shadow-none focus:ring-0 dark:text-gray-50"
              : "dark:bg-transparent dark:text-gray-50"
          }
        >
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
