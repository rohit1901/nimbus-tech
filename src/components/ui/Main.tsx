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
export const Main = () => {
  const { data, loading, error } = usePageContents()
  const pageContent: PageContent | null = data?.pageContents?.at(0) ?? null
  if (!pageContent) return null
  if (!pageContent.sections?.contentHero) return null
  if (error) return null
  const contentFeatures = pageContent.sections?.contentFeatures
  return (
    <main className="relative mx-auto flex flex-col">
      <div className="pt-56">
        <Hero
          pageContent={{
            ...pageContent,
            hero: pageContent.sections?.contentHero,
          }}
        />
      </div>
      <div className="mt-52 px-4 xl:px-0">
        <Features features={contentFeatures ?? undefined} />
      </div>
      <div className="mt-32 px-4 xl:px-0">
        <Testimonials />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="px-4 xl:px-0">
        <Map />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="px-4 xl:px-0">
        <OurCertifications />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="px-4 xl:px-0">
        <WhyNimbusTech />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="px-4 xl:px-0">
        <FaqSection />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="px-4 xl:px-0">
        <AboutUs />
      </div>
      <FeatureDivider className="my-16 max-w-6xl" />
      <div className="mt-10 mb-40 px-4 xl:px-0">
        <CallToAction />
      </div>
    </main>
  )
}
