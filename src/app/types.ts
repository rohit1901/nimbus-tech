import { remixIconMap } from "@/icons/remixicon-map"
import { ImageProps } from "next/image"

export type PageContent = {
  title: string
  description?: string
  image?: string
  imageAlt?: string
  cta?: CTA
}

export type CTA = {
  label: string
  href: string
  external?: boolean
}

export type Language = {
  label: "English" | "German"
  value: "de-DE" | "en-US"
}

export type PageContentWithSubHeading = CompositePageContent<
  "subheading",
  string
>

export type Certification = {
  id: number
  title: string
  description: string
  image: string
  link?: string // Optional link for certifications that have a URL
  width: number
  height: number
}

export type HeroType = {
  banner: {
    icon?: keyof typeof remixIconMap
    additional?: {
      icon: keyof typeof remixIconMap
      text: string
    }
  } & CTA
  subHeading: string
}

export type FeatureVisualization =
  | "OrbitFeatureVisualization"
  | "CloudFeatureVisualization"
  | "ArchitectureFeatureVisualization"

export type Benefit = {
  icon: keyof typeof remixIconMap
  title: string
  description: string
}

export type Testimonial = {
  rating?: number
  badge?: {
    icon: keyof typeof remixIconMap
    label: string
  }
  name: string
  role: string
  company: string
  image?: ImageProps
  content: string
}

export type NavigationSectionItem = {
  icon?: keyof typeof remixIconMap
} & CTA

// Type for a single footer section (e.g., Services, Company)
export type FooterSection = {
  title: string
  items: NavigationSectionItem[]
}

// Type for the overall sections object
export type FooterSections = {
  [key: string]: FooterSection
}

export type FaqItem = {
  question: string
  answer: string
}

export type ApproachStep = {
  id: number
  type: "done" | "in progress" | "open"
  title: string
  description: string
  activityTime: string
}
export type OurApproachContent = {
  title: string
  description: string
  steps: ApproachStep[]
}

// Type for a single project summary row
export type AnalyticsSummaryItem = {
  name: string
  deployments: string
  uptime: string
  clientSatisfaction: string
  efficiency: string
  revenueGrowth: string
  bgColor: string
  changeType: "positive" | "negative"
}

// Type for the stats section above the table
export type AnalyticsStats = {
  totalDeployments: string
  deploymentChange: string
  deploymentChangePercent: string
  changePeriod: string
}

// Type for the overall analytics data object
export type AnalyticsData = {
  heading: string
  subheading: string
  stats: AnalyticsStats
  tableHeadings: string[]
  summary: AnalyticsSummaryItem[]
}

// --- Generic Composite Helper (single extra section) ---

export type CompositePageContent<
  ExtraKey extends string,
  ExtraType,
> = PageContent & {
  [K in ExtraKey]: ExtraType
}

// Usage:
/*
type PageWithBenefits = CompositePageContent<'benefits', Benefit[]>;
type PageWithFaq = CompositePageContent<'faq', FaqItem[]>;
*/

// --- Generic Composite Helper (multiple extra sections) ---
export type CompositePageContentWithExtras<
  Extras extends Record<string, unknown>,
> = PageContent & Extras

// Usage:
/*
type PageWithBenefitsAndFaq = CompositePageContentWithExtras<{
  benefits: Benefit[];
  faq: FaqItem[];
}>;
*/

// --- Helper with Lowercase Key ---

export type CompositePageContentLC<
  ExtraKey extends string,
  ExtraType,
> = PageContent & {
  [K in Lowercase<ExtraKey>]: ExtraType
}

// Usage:
// type PageWithBenefitsLC = CompositePageContentLC<'Benefits', Benefit[]>;

// --- Composite with Mapping Table (for pluralization, etc.) ---

type KeyMap = {
  Benefit: "benefits"
  FaqItem: "faq"
  // Add more as needed
}

export type CompositePageContentWithMap<
  T,
  K extends keyof KeyMap,
> = PageContent & {
  [P in KeyMap[K]]: T
}

// Usage:
/*
type PageWithBenefitsMapped = CompositePageContentWithMap<Benefit[], 'Benefit'>;
type PageWithFaqMapped = CompositePageContentWithMap<FaqItem[], 'FaqItem'>;
 */

// --- Example Usage ---

/*
const example: PageWithBenefitsAndFaq = {
  title: "Welcome",
  benefits: [
    { icon: "icon1", title: "Fast", description: "Very fast" }
  ],
  faq: [
    { question: "How?", answer: "Like this." }
  ]
};
*/
