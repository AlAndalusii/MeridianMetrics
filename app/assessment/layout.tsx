import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free PPT Compliance Assessment | Plastic Packaging Tax Audit Check",
  description: "Get your free Plastic Packaging Tax compliance assessment. Identify gaps in your PPT documentation, certificates, and HMRC reporting in just 3 minutes. No obligation.",
  keywords: [
    "PPT compliance assessment",
    "plastic packaging tax audit",
    "free PPT check",
    "PPT compliance test",
    "plastic tax assessment",
    "PPT documentation review",
    "HMRC compliance check",
    "plastic packaging tax gaps",
    "PPT audit checklist"
  ],
  openGraph: {
    title: "Free PPT Compliance Assessment | Plastic Packaging Tax Audit Check",
    description: "Get your free Plastic Packaging Tax compliance assessment. Identify gaps in your PPT documentation, certificates, and HMRC reporting in just 3 minutes.",
    type: "website",
  },
}

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
