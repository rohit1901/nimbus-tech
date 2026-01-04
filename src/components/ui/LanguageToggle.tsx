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
}

const LanguageToggle = ({
  availableLanguages,
  currentValue,
  onChange,
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

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <RiTranslate className="h-5 w-5 text-gray-600" />
      <Select value={currentValue ?? ""} onValueChange={(v) => onChange(v)}>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/*<select
        value={currentValue ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>*/}
    </div>
  )
}

export default LanguageToggle
