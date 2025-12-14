import { Maybe } from "@/app/graphql/types"
import { remixIconMap } from "@/icons/remixicon-map"

export const RemixIconComponent = ({
  name,
  className,
}: {
  name?: Maybe<string>
  className?: string
}) => {
  if (!name) return null
  const Icon = remixIconMap[name]
  return <Icon className={className} />
}
