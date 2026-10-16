import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Free Digital Waste Tracking Readiness Check | Millstone Compliance",
  description: "10 quick questions on registration, reporting, codes and deadlines. Find out if your permitted waste site is reporting every load properly. Free, 3 minutes.",
  keywords: ["digital waste tracking readiness", "is my site ready for digital waste tracking"],
  alternates: { canonical: "https://millstonecompliance.com/free-check" },
  openGraph: {
    title: "Free Digital Waste Tracking Readiness Check | Millstone Compliance",
    description: "10 quick questions on registration, reporting, codes and deadlines. Find out if your permitted waste site is reporting every load properly. Free, 3 minutes.",
    url: "https://millstonecompliance.com/free-check",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Digital Waste Tracking Readiness Check | Millstone Compliance",
    description: "10 quick questions on registration, reporting, codes and deadlines. Find out if your permitted waste site is reporting every load properly. Free, 3 minutes.",
  },
}

export default function FreeCheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
