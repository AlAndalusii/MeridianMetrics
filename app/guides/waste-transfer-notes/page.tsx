import type { Metadata } from "next"
import { GuideLayout, ShortAnswer, H2, P, Ticks } from "@/components/guides/GuideLayout"

export const metadata: Metadata = {
  title: "Do I Still Need Paper Waste Transfer Notes? | Millstone Compliance",
  description:
    "Yes. Digital waste tracking sits on top of your paperwork, not instead of it. What still applies, what's new, and how to avoid doing the same job twice.",
  alternates: { canonical: "https://millstonecompliance.com/guides/waste-transfer-notes" },
  openGraph: {
    title: "Do I Still Need Paper Waste Transfer Notes?",
    description: "Digital waste tracking sits on top of your paperwork. Here's what that means for your site.",
    url: "https://millstonecompliance.com/guides/waste-transfer-notes",
    type: "article",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
}

export default function WasteTransferNotesGuide() {
  return (
    <GuideLayout
      eyebrow="Paperwork"
      title="Do I Still Need Paper Transfer Notes?"
      intro="It's the question most yard owners ask first. The answer is yes, and here's why it matters for how you run the office."
      readTime="3 min read"
      related={[
        { title: "What Counts as Two Working Days?", href: "/guides/two-working-days" },
        { title: "Common EWC Codes for Scrap and Skip Yards", href: "/guides/ewc-codes-scrap-skip-yards" },
        { title: "What I Check on Every Load", href: "/what-we-check" },
        { title: "Free Readiness Check", href: "/free-check" },
      ]}
    >
      <ShortAnswer>
        Yes. Digital waste tracking is an extra record on top of your existing paperwork. It doesn&apos;t replace waste transfer notes, so keep doing them the way you always have.
      </ShortAnswer>

      <H2>What Hasn&apos;t Changed</H2>
      <Ticks
        items={[
          "Waste transfer notes still go with your waste, the same as before.",
          "You still keep them. Two years is the usual rule for transfer notes.",
          "Your permit conditions and record keeping still apply.",
          "Quarterly waste returns are still due.",
        ]}
      />

      <H2>What Is New</H2>
      <Ticks
        items={[
          "Every load your site receives is also reported to Defra's digital waste tracking service.",
          "Each one has to go in within two working days of the day after it arrives.",
          "Each load needs the right EWC code and R or D code.",
        ]}
      />

      <H2>The Catch: The Same Job Twice</H2>
      <P>
        The details on a transfer note and the details Defra asks for are mostly the same: the date, the waste, the weight, and who it came from.
        So without a plan, someone in the office ends up typing every ticket in twice.
      </P>
      <P>
        You can&apos;t skip either record. What you can do is make the second one quick: a code template for the waste you take in most,
        your regular hauliers and customers set up in advance, and one person (or someone outside the site) who reports every load the same day.
      </P>

      <H2>Who Is Responsible</H2>
      <P>
        You stay responsible for what goes on your tickets and transfer notes. If you hand the reporting to someone else, they&apos;re responsible for
        entering it correctly and on time. Either way, keep your paper records as you always have.
      </P>
    </GuideLayout>
  )
}
