type HeadingProps = {
  title: string
} & React.HTMLAttributes<HTMLHeadingElement>
export default function Heading({ title, className }: HeadingProps) {
  return (
    <h2
      className={`my-2 text-center text-3xl font-semibold tracking-tighter md:text-4xl ${className}`}
    >
      {title}
    </h2>
  )
}
