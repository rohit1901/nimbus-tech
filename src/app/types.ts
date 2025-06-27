import { RemixiconComponentType } from "@remixicon/react"
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
    label:
    | "English"
    | "German",
    value:
    | "de-DE"
    | "en-US"
}


export type PageContentWithSubHeading = CompositePageContent<'subheading', string>

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
        icon?: RemixiconComponentType
        additional?: {
            icon: RemixiconComponentType
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
    icon: RemixiconComponentType
    title: string
    description: string
}

export type Testimonial = {
    rating?: number
    badge?: {
        icon: RemixiconComponentType
        label: string
    },
    name: string
    role: string
    company: string
    image?: ImageProps
    content: string
}

export type NavigationSectionItem = {
    icon?: RemixiconComponentType
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
    question: string;
    answer: string;
};


// --- Generic Composite Helper (single extra section) ---

export type CompositePageContent<
    ExtraKey extends string,
    ExtraType
> = PageContent & {
    [K in ExtraKey]: ExtraType;
};

// Usage:
/* 
type PageWithBenefits = CompositePageContent<'benefits', Benefit[]>;
type PageWithFaq = CompositePageContent<'faq', FaqItem[]>; 
*/

// --- Generic Composite Helper (multiple extra sections) ---
export type CompositePageContentWithExtras<Extras extends Record<string, unknown>> =
    PageContent & Extras;

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
    ExtraType
> = PageContent & {
    [K in Lowercase<ExtraKey>]: ExtraType;
};

// Usage:
// type PageWithBenefitsLC = CompositePageContentLC<'Benefits', Benefit[]>;

// --- Composite with Mapping Table (for pluralization, etc.) ---

type KeyMap = {
    Benefit: 'benefits';
    FaqItem: 'faq';
    // Add more as needed
};

export type CompositePageContentWithMap<
    T,
    K extends keyof KeyMap
> = PageContent & {
    [P in KeyMap[K]]: T;
};

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
