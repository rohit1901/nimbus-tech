import { useMemo } from "react"
import { Maybe, Section } from "@/app/graphql/types"

export const useSectionContent = (
  sections?: Maybe<Section>,
  languageValue: string = "en-US",
) => {
  return useMemo(() => {
    if (!sections) {
      return {
        hero: undefined,
        features: undefined,
        testimonials: undefined,
        map: undefined,
        certifications: undefined,
        benefits: undefined,
        faq: undefined,
        about: undefined,
        approach: undefined,
        cta: undefined,
        navigation: undefined,
        footer: undefined,
      }
    }

    // Helper to find content by language
    const getByLang = <
      T extends { language?: Maybe<{ value?: Maybe<string> }> },
    >(
      items: Maybe<T>[] | Maybe<T> | undefined,
    ) => {
      if (!Array.isArray(items)) return undefined
      return items.find((item) => item?.language?.value === languageValue)
    }

    return {
      // Single items resolved by language
      hero: getByLang(sections.contentHero),
      testimonials: getByLang(sections.contentTestimonials),
      map: getByLang(sections.contentMap),
      certifications: getByLang(sections.contentCertifications),
      benefits: getByLang(sections.contentBenefits),
      faq: getByLang(sections.contentFaqSection),
      about: getByLang(sections.contentAbout),
      approach: getByLang(sections.contentApproach),
      cta: getByLang(sections.contentCta),
      navigation: getByLang(sections.contentNavigation),
      footer: getByLang(sections.contentFooter),
      // Lists that don't need finding (passed through as-is)
      features: sections.contentFeatures,
    }
  }, [sections, languageValue])
}
