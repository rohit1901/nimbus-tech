"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"

type ClassName = string | null | undefined | false

const cx = (...classNames: ClassName[]) => classNames.filter(Boolean).join(" ")

type StatusVariant = "default" | "muted" | "surface"

const statusVariantClasses: Record<StatusVariant, string> = {
  default: "",
  muted: "bg-gray-50",
  surface: "rounded-lg border border-gray-200 bg-white shadow-sm",
}

type StatusContainerProps = {
  children: ReactNode
  className?: string
  centered?: boolean
  padded?: boolean
  variant?: StatusVariant
  role?: "status" | "alert"
  ariaLive?: "polite" | "assertive"
}

export const StatusContainer = ({
  children,
  className,
  centered = true,
  padded = true,
  variant = "default",
  role,
  ariaLive,
}: StatusContainerProps) => (
  <div
    role={role}
    aria-live={ariaLive}
    className={cx(
      "w-full",
      padded && "px-4 py-10 sm:px-6 lg:px-8",
      centered && "flex flex-col items-center justify-center gap-4 text-center",
      statusVariantClasses[variant],
      className,
    )}
  >
    {children}
  </div>
)

type StatusHeadingProps = {
  children?: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "p"
}

export const StatusHeading = ({
  children,
  className,
  as: Component = "h2",
}: StatusHeadingProps) =>
  children ? (
    <Component
      className={cx(
        "text-lg font-semibold text-gray-900",
        Component === "p" && "font-medium",
        className,
      )}
    >
      {children}
    </Component>
  ) : null

type StatusDescriptionProps = {
  children?: ReactNode
  className?: string
}

export const StatusDescription = ({
  children,
  className,
}: StatusDescriptionProps) =>
  children ? (
    <p className={cx("text-sm text-gray-600", className)}>{children}</p>
  ) : null

type LoadingSpinnerProps = {
  size?: number
  className?: string
}

export const LoadingSpinner = ({
  size = 40,
  className,
}: LoadingSpinnerProps) => (
  <div
    className={cx(
      "animate-spin rounded-full border-4 border-gray-200 border-t-orange-500",
      className,
    )}
    style={{ width: size, height: size }}
    aria-hidden="true"
  />
)

type LoadingStateProps = {
  title?: ReactNode
  message?: ReactNode
  className?: string
  spinnerSize?: number
  spinnerClassName?: string
  showSpinner?: boolean
  variant?: StatusVariant
  centered?: boolean
  padded?: boolean
}

export const LoadingState = ({
  title,
  message = "Loading…",
  className,
  spinnerSize,
  spinnerClassName,
  showSpinner = true,
  variant = "muted",
  centered = true,
  padded = true,
}: LoadingStateProps) => (
  <StatusContainer
    className={className}
    role="status"
    ariaLive="polite"
    variant={variant}
    centered={centered}
    padded={padded}
  >
    {showSpinner && (
      <LoadingSpinner size={spinnerSize} className={spinnerClassName} />
    )}
    <div className="space-y-2">
      <StatusHeading>{title}</StatusHeading>
      <StatusDescription>{message}</StatusDescription>
    </div>
  </StatusContainer>
)

type ErrorStateProps = {
  title?: ReactNode
  message?: ReactNode
  className?: string
  retryLabel?: string
  onRetryAction?: () => void
  actionProps?: ButtonHTMLAttributes<HTMLButtonElement>
  variant?: StatusVariant
  centered?: boolean
  padded?: boolean
}

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn’t load this content. Please try again later.",
  className,
  retryLabel = "Retry",
  onRetryAction: onRetry,
  actionProps,
  variant = "surface",
  centered = true,
  padded = true,
}: ErrorStateProps) => (
  <StatusContainer
    className={className}
    role="alert"
    ariaLive="assertive"
    variant={variant}
    centered={centered}
    padded={padded}
  >
    <div className="space-y-2">
      <StatusHeading className="text-red-700">{title}</StatusHeading>
      <StatusDescription className="text-red-600">{message}</StatusDescription>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className={cx(
          "inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none",
          actionProps?.className,
        )}
        {...actionProps}
      >
        {retryLabel}
      </button>
    )}
  </StatusContainer>
)

type EmptyStateProps = {
  title?: ReactNode
  message?: ReactNode
  className?: string
  action?: ReactNode
  variant?: StatusVariant
}

export const EmptyState = ({
  title = "Nothing to show yet",
  message = "There is currently no data available for this section.",
  className,
  action,
  variant = "muted",
}: EmptyStateProps) => (
  <StatusContainer className={className} variant={variant}>
    <div className="space-y-2">
      <StatusHeading>{title}</StatusHeading>
      <StatusDescription>{message}</StatusDescription>
    </div>
    {action && <div className="mt-4">{action}</div>}
  </StatusContainer>
)
