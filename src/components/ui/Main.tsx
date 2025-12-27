import AboutUs from "@/components/ui/AboutUs"
import CallToAction from "@/components/ui/CallToAction"
import FaqSection from "@/components/ui/FAQ"
import FeatureDivider from "@/components/ui/FeatureDivider"
import Features from "@/components/ui/Features"
import Hero from "@/components/ui/Hero"
import Map from "@/components/ui/Map/Map"
import OurCertifications from "@/components/ui/OurCertifications"
import Testimonials from "@/components/ui/Testimonials"
import WhyNimbusTech from "@/components/ui/WhyNimbusTech"
import { ErrorState, LoadingState } from "@/components/Status"
import { useSectionContent } from "@/hooks/useSectionContent"
import { useLanguageContext } from "@/app/providers/LanguageContext"

// Wrapper component for consistent section padding
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`px-4 xl:px-0 ${className}`.trim()}>{children}</div>

export const Main = () => {
  const {
    activeContent,
    isReady,
    loading,
    error,
    currentLanguage,
  } = useLanguageContext()

  const content = useSectionContent(
    activeContent?.sections,
    currentLanguage?.value ?? "en-US",
  )

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={"Error fetching content."} />
  // Guard against missing language data
  if (!isReady || !activeContent) {
    console.error("Languages or Content not available")
    return <ErrorState message="Content not available" />
  }

  return (
    <main className="relative mx-auto flex flex-col">
      <div className="pt-56">
        <Hero
          pageContent={{
            ...activeContent,
            hero: content.hero,
          }}
        />
      </div>

      {content.features && (
        <Section className="mt-52">
          <Features features={content.features} />
        </Section>
      )}

      {content.testimonials && (
        <>
          <Section className="mt-32">
            <Testimonials testimonial={content.testimonials} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {content.map && (
        <>
          <Section>
            <Map mapContent={content.map} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {content.certifications && (
        <>
          <Section>
            <OurCertifications content={content.certifications} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {content.benefits && (
        <>
          <Section>
            <WhyNimbusTech benefitSection={content.benefits} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {content.faq && (
        <>
          <Section>
            <FaqSection faqSection={content.faq} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {content.about && content.approach && (
        <>
          <Section>
            <AboutUs about={content.about} approaches={content.approach} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {content.cta && (
        <Section className="mt-10 mb-40">
          <CallToAction cta={content.cta} />
        </Section>
      )}
    </main>
  )
}
