import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital Waste Tracking, Explained Simply | Millstone Compliance",
  description:
    "A plain English guide to digital waste tracking for permitted sites: who it affects, what to report, the two-working-day deadline, and what happens in October 2027.",
  keywords: [
    "digital waste tracking explained",
    "digital waste tracking deadline",
    "two working days waste reporting",
    "Defra digital waste tracking",
    "permitted site waste tracking",
    "waste transfer notes digital tracking",
    "EWC and R/D codes",
    "waste tracking October 2027",
  ],
  openGraph: {
    title: "Digital Waste Tracking, Explained Simply",
    description:
      "Who it affects, what to report, and when. With a deadline checker for every day of the week.",
    type: "article",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
