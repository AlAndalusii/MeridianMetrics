import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Waste Compliance Results | Your Gap Analysis Report | Millstone Compliance",
  description: "View your personalised waste compliance assessment results. Includes your compliance score, top gaps in Duty of Care and Simpler Recycling, and a prioritised action plan for care homes and businesses.",
  keywords: [
    "waste compliance results",
    "waste compliance score report",
    "duty of care gap report",
    "waste compliance assessment results",
    "simpler recycling compliance score",
    "waste audit results",
    "care home compliance report",
    "waste compliance recommendations"
  ],
  openGraph: {
    title: "Waste Compliance Results | Your Gap Analysis Report | Millstone Compliance",
    description: "Your personalised waste compliance score, top gaps and prioritised action plan — covering Duty of Care, Simpler Recycling and clinical waste.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waste Compliance Results | Your Gap Analysis Report | Millstone Compliance",
    description: "Your personalised waste compliance score, top gaps and prioritised action plan — covering Duty of Care, Simpler Recycling and clinical waste.",
  },
}

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
