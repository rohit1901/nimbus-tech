import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"
import { Providers } from "@/app/providers/Providers"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nimbus-tech.de"),
  title: "Nimbus Tech",
  description: "Cloud Solutions & DevOps Consulting",
  keywords: [
    "Consulting",
    "Software Development",
    "Nimbus Tech",
    "Tech Solutions",
    "Cloud Development",
    "DevOps",
    "Automation",
    "Software",
    "Development",
    "Cloud Solutions",
    "DevOps Consulting",
    "Automation Solutions",
    "Cloud Architecture",
    "Software Engineering",
    "Custom Software",
    "Web Development",
    "Mobile Development",
    "API Development",
    "System Integration",
    "Cloud Migration",
    "Infrastructure as Code",
    "CI/CD",
    "Containerization",
    "Kubernetes",
    "Docker",
    "Serverless Computing",
    "Microservices",
    "Agile Development",
    "Software Architecture Consulting",
    "Technology Assessment",
    "Documentation",
    "Support",
    "Maintenance",
  ],
  authors: [
    {
      name: "Rohit Khanduri",
      url: "https://www.rohit.khanduri.de",
    },
  ],
  creator: "Nimbus Tech GmbH",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nimbus-tech.de",
    title: "Nimbus Tech",
    description: "Cloud Solutions & DevOps Consulting",
    siteName: "Nimbus Tech",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://cookiechimp.com/widget/yv4tdkM.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${GeistSans.className} min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-orange-100 selection:text-orange-600 dark:bg-gray-950 dark:text-gray-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
