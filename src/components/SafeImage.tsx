import { Image as ImageType, Maybe } from "@/app/graphql/types"
import Image from "next/image"

export const SafeImage = ({
  image,
  props,
}: {
  image?: Maybe<ImageType>
  props?: Partial<HTMLImageElement>
}) => {
  if (!image || !image?.src) {
    return null
  }
  return (
    <Image
      {...image}
      alt={image.alt ?? ""}
      className={props?.className ?? undefined}
      src={image.src ?? undefined}
      width={image?.width ?? undefined}
      height={image?.height ?? undefined}
      fill={!!image.fill}
    />
  )
}
