import AboutUs from "@/components/ui/AboutUs"
import { CallToAction } from "@/components/ui/CallToAction"
import FaqSection from "@/components/ui/FAQ"
import FeatureDivider from "@/components/ui/FeatureDivider"
import Features from "@/components/ui/Features"
import Hero from "@/components/ui/Hero"
import { Map } from "@/components/ui/Map/Map"
import { OurCertifications } from "@/components/ui/OurCertifications"
import Testimonial from "@/components/ui/Testimonial"
import WhyNimbusTech from "@/components/ui/WhyNimbusTech"

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col">
      <div className="pt-56">
        <Hero />
      </div>
      <div className="mt-52 px-4 xl:px-0">
        <Features />
      </div>
      <div className="mt-32 px-4 xl:px-0">
        <Testimonial />
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
