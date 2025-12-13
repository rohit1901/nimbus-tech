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
      alt={image.alt ?? "Image Alt"}
      className={props?.className}
      src={image?.src}
      width={image?.width ?? undefined}
      height={image?.height ?? undefined}
      fill={!!image.fill}
    />
  )
}
