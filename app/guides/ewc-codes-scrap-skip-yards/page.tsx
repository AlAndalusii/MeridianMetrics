import type { Metadata } from "next"
import { GuideLayout, ShortAnswer, H2, P, Ticks } from "@/components/guides/GuideLayout"

export const metadata: Metadata = {
  title: "Common EWC Codes for Scrap and Skip Yards | Millstone Compliance",
  description:
    "The EWC codes scrap yards, skip yards and transfer stations use most, plus how R and D codes work. A plain English list to check against your permit.",
  alternates: { canonical: "https://millstonecompliance.com/guides/ewc-codes-scrap-skip-yards" },
  openGraph: {
    title: "Common EWC Codes for Scrap and Skip Yards",
    description: "The codes small permitted sites use most, and how to pick the right R or D code.",
    url: "https://millstonecompliance.com/guides/ewc-codes-scrap-skip-yards",
    type: "article",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
}

const groups: { title: string; codes: [string, string][] }[] = [
  {
    title: "Metals (Scrap Yards)",
    codes: [
      ["17 04 05", "Iron and steel"],
      ["17 04 07", "Mixed metals"],
      ["17 04 01", "Copper, bronze and brass"],
      ["17 04 02", "Aluminium"],
      ["17 04 11", "Cables (not containing oil, coal tar or other dangerous substances)"],
      ["19 12 02", "Ferrous metal (from treating waste)"],
      ["19 12 03", "Non-ferrous metal (from treating waste)"],
      ["20 01 40", "Metals (from households and similar)"],
    ],
  },
  {
    title: "Skip and Builders' Waste (Skip Yards, Transfer Stations)",
    codes: [
      ["17 09 04", "Mixed construction and demolition waste (non-hazardous)"],
      ["17 01 07", "Mixed concrete, bricks, tiles and ceramics (non-hazardous)"],
      ["17 01 01", "Concrete"],
      ["17 05 04", "Soil and stones (non-hazardous)"],
      ["17 02 01", "Wood"],
      ["17 02 03", "Plastic"],
      ["20 03 01", "Mixed municipal waste"],
    ],
  },
  {
    title: "Wood, Green Waste and Packaging",
    codes: [
      ["20 01 38", "Wood (from households and similar, non-hazardous)"],
      ["20 02 01", "Biodegradable waste (garden and park waste)"],
      ["15 01 01", "Paper and cardboard packaging"],
      ["15 01 03", "Wooden packaging"],
    ],
  },
]

export default function EwcCodesGuide() {
  return (
    <GuideLayout
      eyebrow="Codes"
      title="Common EWC Codes for Scrap and Skip Yards"
      intro="Most small sites use the same handful of codes every week. Here are the ones that come up most, in plain English, and how the R and D codes fit in."
      readTime="5 min read"
      related={[
        { title: "What Counts as Two Working Days?", href: "/guides/two-working-days" },
        { title: "Do I Still Need Paper Transfer Notes?", href: "/guides/waste-transfer-notes" },
        { title: "What I Check on Every Load", href: "/what-we-check" },
        { title: "Free Readiness Check", href: "/free-check" },
      ]}
    >
      <ShortAnswer>
        An EWC code says what the waste is. An R or D code says what happens to it next. Every load you report needs both, and both should match what your permit allows.
      </ShortAnswer>

      <H2>The Codes Yards See Most</H2>
      <P>
        This is a starting point, not a full list. Your permit is the final word on which codes your site can accept.
        Codes marked as hazardous in the full list are not covered here.
      </P>
      {groups.map((g) => (
        <div key={g.title} className="mb-6">
          <p className="poppins-semibold text-sm text-emerald-800 mb-2">{g.title}</p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            {g.codes.map(([code, name], i) => (
              <div key={code} className={`flex items-start gap-4 px-4 py-3 ${i > 0 ? "border-t border-slate-100" : ""}`}>
                <span className="poppins-bold text-sm text-emerald-700 tabular-nums w-20 flex-shrink-0">{code}</span>
                <span className="poppins-regular text-sm text-slate-700">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <H2>R and D Codes, Simply</H2>
      <P>R means recovery. D means disposal. The ones small sites use most:</P>
      <Ticks
        items={[
          <><strong>R4</strong>: recycling or reclaiming metals. The usual one for scrap.</>,
          <><strong>R5</strong>: recycling or reclaiming other inorganic materials, like soil, stone and rubble.</>,
          <><strong>R3</strong>: recycling or reclaiming organic materials, like wood and green waste.</>,
          <><strong>R13</strong>: storing waste before it goes on for recovery elsewhere. Common at transfer stations.</>,
          <><strong>D15</strong>: storing waste before it goes on for disposal elsewhere.</>,
        ]}
      />
      <P>
        Pick the code for what your site actually does with that waste, as set out in your permit. The same waste can have a different R code at two different sites.
      </P>

      <H2>Make It Quick: A Code Template</H2>
      <P>
        Look at your last 20 tickets and list the waste types that keep coming up. Write the EWC code and R or D code next to each, and check every one against your permit.
        That short list covers most of your loads, so each entry takes seconds and is done the same way every time.
      </P>
    </GuideLayout>
  )
}
