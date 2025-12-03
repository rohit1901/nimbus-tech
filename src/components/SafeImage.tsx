import { Image as ImageType } from "@/app/graphql/types"
import Image from "next/image"

export const SafeImage = ({ ...image }: ImageType) => {
  return (
    <Image
      {...image}
      alt={image.alt ?? ""}
      className={image.className ?? ""}
      src={image.src ?? ""}
      width={image.width ?? 0}
      height={image.height ?? 0}
      fill={!!image.fill}
    />
  )
}
