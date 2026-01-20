"use client"

import Footer from "@/components/ui/Footer"
import { Main } from "@/components/ui/Main"
import { NavBar } from "@/components/ui/Navbar"
import { ContentGuard } from "@/components/ui/ContentGuard"

export default function Home() {
  return (
    <ContentGuard>
      <NavBar />
      <Main />
      <Footer />
    </ContentGuard>
  )
}
