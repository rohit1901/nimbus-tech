import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import "./globals.css"

import { siteConfig } from "@/app/siteConfig"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL("https://nimbus-tech.de"),
  title: siteConfig.name,
  description: siteConfig.description,
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
  creator: "Rohit Khanduri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    <html lang="en">
      <head>
        <Script
          src="https://cookiechimp.com/widget/yv4tdkM.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${GeistSans.className} min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-orange-100 selection:text-orange-600`}
      >
        {children}
      </body>
    </html>
  )
}
