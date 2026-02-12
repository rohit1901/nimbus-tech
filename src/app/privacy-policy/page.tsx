import { getLegalContent } from "@/lib/legal/getLegalContent"
import { NavBar } from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"
import { LegalPageWrapper } from "@/components/legal/LegalPageWrapper"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Metadata } from "next"

type PrivacyPolicyPageProps = {
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({ searchParams }: PrivacyPolicyPageProps): Promise<Metadata> {
  const params = await searchParams
  const lang = params.lang || "en-US"

  const titles = {
    "en-US": "Privacy Policy | Nimbus Tech",
    "de-DE": "Datenschutzerklärung | Nimbus Tech",
  }

  const descriptions = {
    "en-US": "Privacy Policy for Nimbus Tech GmbH - Learn how we collect, use, and protect your personal data in accordance with GDPR.",
    "de-DE": "Datenschutzerklärung der Nimbus Tech GmbH - Erfahren Sie, wie wir Ihre personenbezogenen Daten gemäß DSGVO erfassen, verwenden und schützen.",
  }

  return {
    title: titles[lang as keyof typeof titles] || titles["en-US"],
    description: descriptions[lang as keyof typeof descriptions] || descriptions["en-US"],
  }
}

export default async function PrivacyPolicyPage({ searchParams }: PrivacyPolicyPageProps) {
  const params = await searchParams
  const lang = (params.lang || "en-US") as "en-US" | "de-DE"

  const content = await getLegalContent("privacy", lang)

  const labels = {
    "en-US": {
      lastUpdated: "Last updated:",
    },
    "de-DE": {
      lastUpdated: "Zuletzt aktualisiert:",
    },
  }

  const currentLabels = labels[lang] || labels["en-US"]

  return (
    <LegalPageWrapper>
      <NavBar />
      <main className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 rounded-full bg-orange-100/20 blur-3xl dark:bg-orange-900/10" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 dark:bg-orange-900/20">
              <svg className="h-4 w-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                {currentLabels.lastUpdated}{" "}
                {new Date().toLocaleDateString(lang === "de-DE" ? "de-DE" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg prose-gray max-w-none dark:prose-invert
            prose-headings:scroll-mt-20 prose-headings:font-extrabold prose-headings:tracking-tight
            prose-h1:text-5xl prose-h1:text-gray-950 prose-h1:dark:text-white prose-h1:mb-10 prose-h1:leading-tight
            prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-3xl prose-h2:text-gray-950 prose-h2:dark:text-white prose-h2:border-b-2 prose-h2:border-orange-200 prose-h2:dark:border-orange-900/50 prose-h2:pb-4
            prose-h3:mt-10 prose-h3:mb-5 prose-h3:text-2xl prose-h3:text-gray-900 prose-h3:dark:text-gray-50 prose-h3:font-bold
            prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-900 prose-strong:dark:text-gray-50 prose-strong:font-semibold
            prose-a:text-orange-600 prose-a:dark:text-orange-400 prose-a:no-underline prose-a:font-medium hover:prose-a:underline hover:prose-a:decoration-2 hover:prose-a:underline-offset-2
            prose-ul:my-6 prose-ul:text-gray-700 prose-ul:dark:text-gray-300
            prose-li:my-2 prose-li:text-gray-700 prose-li:dark:text-gray-300 prose-li:leading-relaxed
            marker:prose-li:text-orange-600 marker:prose-li:dark:text-orange-400
            prose-hr:my-12 prose-hr:border-gray-200 prose-hr:dark:border-gray-800
            mb-20">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>

          {/* Footer note */}
          <div className="mt-16 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lang === "de-DE"
                ? "Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns bitte unter "
                : "If you have any questions about this Privacy Policy, please contact us at "}
              <a href="mailto:info@nimbus-tech.de" className="font-medium text-orange-600 hover:underline dark:text-orange-400">
                info@nimbus-tech.de
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </LegalPageWrapper>
  )
}
