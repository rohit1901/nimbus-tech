"use client"

import Footer from "@/components/ui/Footer"
import { Main } from "@/components/ui/Main"
import { NavBar } from "@/components/ui/Navbar"
import client from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client/react"
import { LanguageProvider } from "./providers/LanguageContext"

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <NavBar />
        <Main />
        <Footer />
      </LanguageProvider>
    </ApolloProvider>
  )
}
