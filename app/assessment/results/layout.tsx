import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PPT Compliance Results | Your Plastic Packaging Tax Assessment Report",
  description: "View your personalized PPT compliance assessment results. Get detailed analysis of your plastic packaging tax gaps, strengths, and recommended next steps for HMRC compliance.",
  keywords: [
    "PPT compliance results",
    "plastic packaging tax report",
    "PPT assessment results",
    "plastic tax compliance score",
    "PPT audit results",
    "HMRC compliance report",
    "plastic packaging tax gaps",
    "PPT compliance recommendations"
  ],
  openGraph: {
    title: "PPT Compliance Results | Your Plastic Packaging Tax Assessment Report",
    description: "View your personalized PPT compliance assessment results. Get detailed analysis of your plastic packaging tax gaps, strengths, and recommended next steps.",
    type: "website",
  },
}

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
