import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How UK Businesses Cut Waste Costs 20–40% | Millstone Compliance",
  description:
    "Independent audit data shows UK businesses overpay by 20–40% on waste. See NHS clinical waste figures, £30K real savings cases, and how a £195 snapshot audit pays for itself in weeks.",
  keywords: [
    "UK waste cost savings",
    "reduce waste costs UK",
    "waste audit ROI",
    "clinical waste misclassification",
    "waste contractor overcharging",
    "waste cost reduction UK",
    "independent waste audit",
    "waste spend analysis",
  ],
  openGraph: {
    title: "How UK Businesses Cut Waste Costs 20–40%",
    description:
      "NHS data, real case studies and sector cost tables. See exactly where waste spend leaks — and how to recover it.",
    type: "article",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
