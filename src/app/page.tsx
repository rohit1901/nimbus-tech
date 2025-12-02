"use client"

import { Main } from "@/components/ui/Main"
import client from "@/lib/apolloClient"
import { ApolloProvider } from "@apollo/client/react"

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  )
}
