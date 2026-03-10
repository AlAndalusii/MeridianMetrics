import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Waste Compliance Assessment | Duty of Care & Simpler Recycling Check",
  description: "Take a free waste compliance assessment — 10 questions, under 3 minutes. Identify Duty of Care documentation gaps, Simpler Recycling obligations and carrier verification failures. Instant score, no obligation.",
  keywords: [
    "free waste compliance assessment",
    "duty of care compliance check",
    "waste compliance audit tool",
    "simpler recycling assessment",
    "waste compliance score",
    "waste transfer note check",
    "waste compliance test",
    "care home waste assessment",
    "free waste compliance tool"
  ],
  openGraph: {
    title: "Free Waste Compliance Assessment | Duty of Care & Simpler Recycling Check",
    description: "Free 10-question waste compliance assessment. Covers Duty of Care, Simpler Recycling and carrier verification — instant score, no obligation.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Waste Compliance Assessment | Duty of Care & Simpler Recycling Check",
    description: "Free 10-question waste compliance assessment. Covers Duty of Care, Simpler Recycling and carrier verification — instant score, no obligation.",
  },
}

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
