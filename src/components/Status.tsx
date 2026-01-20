/**
 * @fileoverview Status Components - Loading, Error, and Empty State UI Components
 *
 * This module provides reusable status components for displaying different application states:
 * - LoadingState: Shows loading spinner with optional message
 * - ErrorState: Displays error messages with optional retry action
 * - EmptyState: Shows empty state with optional action
 * - AbsoluteLoadingSpinner: Overlay loading spinner for existing content
 *
 * @example
 * ```tsx
 * // Basic loading state
 * <LoadingState message="Loading data..." />
 *
 * // Absolute overlay loading
 * <div className="relative">
 *   <YourContent />
 *   {isLoading && <LoadingState absolute />}
 * </div>
 *
 * // Error with retry
 * <ErrorState
 *   title="Failed to load"
 *   message="Please try again"
 *   onRetryAction={handleRetry}
 * />
 * ```
 */
"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"

type ClassName = string | null | undefined | false

/**
 * Utility function to conditionally join class names
 * @internal
 */
const cx = (...classNames: ClassName[]) => classNames.filter(Boolean).join(" ")

/**
 * Visual variants for status containers
 * - default: No background styling
 * - muted: Light gray background
 * - surface: Card-like appearance with border and shadow
 */
type StatusVariant = "default" | "muted" | "surface"

const statusVariantClasses: Record<StatusVariant, string> = {
  default: "",
  muted: "bg-gray-50 dark:bg-gray-900/50",
  surface:
    "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:shadow-none",
}

/**
 * Props for StatusContainer component
 */
type StatusContainerProps = {
  /** Content to render inside the container */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Center content horizontally and vertically */
  centered?: boolean
  /** Add padding around content */
  padded?: boolean
  /** Visual style variant */
  variant?: StatusVariant
  /** ARIA role for accessibility */
  role?: "status" | "alert"
  /** ARIA live region politeness setting */
  ariaLive?: "polite" | "assertive"
}

/**
 * Base container component for status messages
 * Provides consistent spacing, centering, and styling for status content
 *
 * @example
 * ```tsx
 * <StatusContainer variant="surface" centered>
 *   <p>Custom status content</p>
 * </StatusContainer>
 * ```
 */
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

/**
 * Props for StatusHeading component
 */
type StatusHeadingProps = {
  /** Heading text content */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** HTML element to render as */
  as?: "h1" | "h2" | "h3" | "p"
}

/**
 * Heading component for status messages
 * Renders nothing if no children provided
 *
 * @example
 * ```tsx
 * <StatusHeading as="h2">Loading Data</StatusHeading>
 * ```
 */
export const StatusHeading = ({
  children,
  className,
  as: Component = "h2",
}: StatusHeadingProps) =>
  children ? (
    <Component
      className={cx(
        "text-lg font-semibold text-gray-900 dark:text-gray-50",
        Component === "p" && "font-medium",
        className,
      )}
    >
      {children}
    </Component>
  ) : null

/**
 * Props for StatusDescription component
 */
type StatusDescriptionProps = {
  /** Description text content */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
}

/**
 * Description/message component for status content
 * Renders nothing if no children provided
 *
 * @example
 * ```tsx
 * <StatusDescription>Please wait while we fetch your data...</StatusDescription>
 * ```
 */
export const StatusDescription = ({
  children,
  className,
}: StatusDescriptionProps) =>
  children ? (
    <p className={cx("text-sm text-gray-600 dark:text-gray-400", className)}>
      {children}
    </p>
  ) : null

/**
 * Props for LoadingSpinner component
 */
type LoadingSpinnerProps = {
  /** Spinner size in pixels */
  size?: number
  /** Additional CSS classes */
  className?: string
  /** Position absolutely in center of parent */
  absolute?: boolean
}

/**
 * Animated loading spinner component
 * Can be used standalone or positioned absolutely in a container
 *
 * @example
 * ```tsx
 * // Inline spinner
 * <LoadingSpinner size={32} />
 *
 * // Absolutely positioned
 * <div className="relative h-64">
 *   <LoadingSpinner absolute size={48} />
 * </div>
 * ```
 */
export const LoadingSpinner = ({
  size = 40,
  className,
  absolute = false,
}: LoadingSpinnerProps) => (
  <div
    className={cx(
      "animate-spin rounded-full border-4 border-gray-200 border-t-orange-500 dark:border-gray-800 dark:border-t-orange-500",
      absolute && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      className,
    )}
    style={{ width: size, height: size }}
    aria-hidden="true"
  />
)

/**
 * Props for AbsoluteLoadingSpinner component
 */
type AbsoluteLoadingSpinnerProps = {
  /** Spinner size in pixels */
  size?: number
  /** Container CSS classes */
  className?: string
  /** Spinner-specific CSS classes */
  spinnerClassName?: string
  /** Show semi-transparent backdrop with blur */
  backdrop?: boolean
  /** Backdrop-specific CSS classes */
  backdropClassName?: string
}

/**
 * Loading spinner with absolute positioning and optional backdrop
 * Useful for overlaying loading states on existing content
 *
 * @example
 * ```tsx
 * <div className="relative min-h-screen">
 *   <YourContent />
 *   {isLoading && (
 *     <AbsoluteLoadingSpinner
 *       backdrop={true}
 *       size={60}
 *     />
 *   )}
 * </div>
 * ```
 */
export const AbsoluteLoadingSpinner = ({
  size = 40,
  className,
  spinnerClassName,
  backdrop = true,
  backdropClassName,
}: AbsoluteLoadingSpinnerProps) => (
  <div
    className={cx(
      "absolute inset-0 flex items-center justify-center",
      backdrop && "bg-white/80 dark:bg-gray-950/80",
      className,
    )}
    role="status"
    aria-live="polite"
  >
    {backdrop && (
      <div
        className={cx("absolute inset-0 backdrop-blur-sm", backdropClassName)}
        aria-hidden="true"
      />
    )}
    <LoadingSpinner size={size} className={spinnerClassName} />
  </div>
)

/**
 * Props for LoadingState component
 */
type LoadingStateProps = {
  /** Optional title text */
  title?: ReactNode
  /** Loading message */
  message?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Spinner size in pixels */
  spinnerSize?: number
  /** Spinner-specific CSS classes */
  spinnerClassName?: string
  /** Show/hide the spinner */
  showSpinner?: boolean
  /** Visual style variant */
  variant?: StatusVariant
  /** Center content */
  centered?: boolean
  /** Add padding */
  padded?: boolean
  /** Use absolute positioning (overlay mode) */
  absolute?: boolean
  /** Show backdrop in absolute mode */
  backdrop?: boolean
  /** Backdrop-specific CSS classes */
  backdropClassName?: string
}

/**
 * Complete loading state component with spinner and optional message
 * Supports both inline and absolute (overlay) positioning modes
 *
 * @example
 * ```tsx
 * // Inline loading state
 * <LoadingState message="Loading data..." />
 *
 * // Absolute overlay
 * <div className="relative">
 *   <DataTable />
 *   {isLoading && <LoadingState absolute />}
 * </div>
 *
 * // Without spinner
 * <LoadingState
 *   showSpinner={false}
 *   title="Processing"
 *   message="This may take a few moments..."
 * />
 * ```
 */
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
  absolute = false,
  backdrop = true,
  backdropClassName,
}: LoadingStateProps) => {
  if (absolute) {
    return (
      <AbsoluteLoadingSpinner
        size={spinnerSize}
        className={className}
        spinnerClassName={spinnerClassName}
        backdrop={backdrop}
        backdropClassName={backdropClassName}
      />
    )
  }

  return (
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
}

/**
 * Props for ErrorState component
 */
type ErrorStateProps = {
  /** Error title */
  title?: ReactNode
  /** Error message/description */
  message?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Text for retry button */
  retryLabel?: string
  /** Callback when retry button is clicked */
  onRetryAction?: () => void
  /** Additional props for retry button */
  actionProps?: ButtonHTMLAttributes<HTMLButtonElement>
  /** Visual style variant */
  variant?: StatusVariant
  /** Center content */
  centered?: boolean
  /** Add padding */
  padded?: boolean
}

/**
 * Error state component with optional retry action
 * Displays error messages with appropriate styling and accessibility
 *
 * @example
 * ```tsx
 * // Basic error
 * <ErrorState
 *   title="Failed to load"
 *   message="Unable to fetch data"
 * />
 *
 * // With retry action
 * <ErrorState
 *   title="Connection Error"
 *   message="Could not connect to server"
 *   retryLabel="Try Again"
 *   onRetryAction={handleRetry}
 * />
 *
 * // Custom styling
 * <ErrorState
 *   title="Error"
 *   message="Something went wrong"
 *   onRetryAction={handleRetry}
 *   actionProps={{ className: 'custom-button-class' }}
 * />
 * ```
 */
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
      <StatusHeading className="text-red-700 dark:text-red-400">
        {title}
      </StatusHeading>
      <StatusDescription className="text-red-600 dark:text-red-300">
        {message}
      </StatusDescription>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className={cx(
          "inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-offset-gray-900",
          actionProps?.className,
        )}
        {...actionProps}
      >
        {retryLabel}
      </button>
    )}
  </StatusContainer>
)

/**
 * Props for EmptyState component
 */
type EmptyStateProps = {
  /** Empty state title */
  title?: ReactNode
  /** Empty state message/description */
  message?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Optional action button or element */
  action?: ReactNode
  /** Visual style variant */
  variant?: StatusVariant
}

/**
 * Empty state component for when no data is available
 * Displays a message with optional call-to-action
 *
 * @example
 * ```tsx
 * // Basic empty state
 * <EmptyState
 *   title="No items found"
 *   message="Start by adding your first item"
 * />
 *
 * // With action
 * <EmptyState
 *   title="No projects yet"
 *   message="Create your first project to get started"
 *   action={<Button>Create Project</Button>}
 * />
 * ```
 */
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
