"use client"

import { ThemeProvider } from "next-themes"
import { ApolloProvider } from "@apollo/client/react"
import client from "@/lib/apolloClient"
import { LanguageProvider } from "./LanguageContext"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ApolloProvider client={client}>
        <LanguageProvider>{children}</LanguageProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}
