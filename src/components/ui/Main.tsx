import { PageContent } from "@/app/graphql/types"
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
import { usePageContents } from "@/queries"

// Wrapper component for consistent section padding
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`px-4 xl:px-0 ${className}`.trim()}>{children}</div>

// Loading skeleton or spinner component
const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
      <p className="mt-4 text-gray-600">Loading content...</p>
    </div>
  </div>
)

// Error state component
const ErrorState = ({ message }: { message?: string }) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <p className="text-red-600">
        {message || "Failed to load content. Please try again later."}
      </p>
    </div>
  </div>
)

export const Main = () => {
  const { data, loading, error } = usePageContents()

  // Handle loading state
  if (loading) {
    return <LoadingState />
  }

  // Handle error state
  if (error) {
    return <ErrorState message={error.message} />
  }

  // Extract page content
  const pageContent: PageContent | null = data?.pageContents?.at(0) ?? null

  // Handle missing content
  if (!pageContent?.sections?.contentHero) {
    return <ErrorState message="Page content not available" />
  }

  // Destructure sections for cleaner access
  const {
    contentHero,
    contentFeatures,
    contentTestimonials,
    contentMap,
    contentCertifications,
    contentBenefits,
    contentFaqs,
    contentAbout,
    contentApproaches,
    contentCta,
  } = pageContent.sections

  return (
    <main className="relative mx-auto flex flex-col">
      {/* Hero Section */}
      <div className="pt-56">
        <Hero
          pageContent={{
            ...pageContent,
            hero: contentHero,
          }}
        />
      </div>

      {/* Features Section */}
      {contentFeatures && (
        <Section className="mt-52">
          <Features features={contentFeatures} />
        </Section>
      )}

      {/* Testimonials Section */}
      {contentTestimonials && (
        <>
          <Section className="mt-32">
            <Testimonials testimonial={contentTestimonials} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {/* Map Section */}
      {contentMap && (
        <>
          <Section>
            <Map mapContent={contentMap} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {/* Certifications Section */}
      {contentCertifications && (
        <>
          <Section>
            <OurCertifications certifications={contentCertifications} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {/* Benefits Section */}
      {contentBenefits && (
        <>
          <Section>
            <WhyNimbusTech benefits={contentBenefits} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {/* FAQ Section */}
      {contentFaqs && (
        <>
          <Section>
            <FaqSection faqs={contentFaqs} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {/* About Us Section */}
      {contentAbout && contentApproaches && (
        <>
          <Section>
            <AboutUs about={contentAbout} approaches={contentApproaches} />
          </Section>
          <FeatureDivider className="my-16 max-w-6xl" />
        </>
      )}

      {/* Call to Action Section */}
      {contentCta && (
        <Section className="mt-10 mb-40">
          <CallToAction cta={contentCta} />
        </Section>
      )}
    </main>
  )
}
