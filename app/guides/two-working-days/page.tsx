import type { Metadata } from "next"
import { GuideLayout, ShortAnswer, H2, P, Ticks } from "@/components/guides/GuideLayout"

export const metadata: Metadata = {
  title: "What Counts as Two Working Days for DWT? | Millstone Compliance",
  description:
    "How to count the two-working-day deadline for reporting a load to Defra: start the day after the waste arrives, skip weekends and bank holidays. With examples.",
  alternates: { canonical: "https://millstonecompliance.com/guides/two-working-days" },
  openGraph: {
    title: "What Counts as Two Working Days?",
    description: "The digital waste tracking deadline, counted day by day, in plain English.",
    url: "https://millstonecompliance.com/guides/two-working-days",
    type: "article",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
}

const rows = [
  ["Monday", "Tuesday", "Wednesday", "End of Wednesday"],
  ["Tuesday", "Wednesday", "Thursday", "End of Thursday"],
  ["Wednesday", "Thursday", "Friday", "End of Friday"],
  ["Thursday", "Friday", "Monday", "End of Monday"],
  ["Friday", "Monday", "Tuesday", "End of Tuesday"],
  ["Saturday", "Monday", "Tuesday", "End of Tuesday"],
  ["Sunday", "Monday", "Tuesday", "End of Tuesday"],
]

export default function TwoWorkingDaysGuide() {
  return (
    <GuideLayout
      eyebrow="Deadlines"
      title="What Counts as Two Working Days?"
      intro="Every load your site receives has to be reported to Defra within two working days. Here is how to count them, so nothing goes in late."
      readTime="3 min read"
      related={[
        { title: "Do I Still Need Paper Transfer Notes?", href: "/guides/waste-transfer-notes" },
        { title: "Common EWC Codes for Scrap and Skip Yards", href: "/guides/ewc-codes-scrap-skip-yards" },
        { title: "Digital Waste Tracking, Explained Simply", href: "/waste-cost-savings" },
        { title: "Free Readiness Check", href: "/free-check" },
      ]}
    >
      <ShortAnswer>
        Start counting the day after the waste arrives. Count only Monday to Friday, and skip bank holidays. The load is due by the end of the second working day.
      </ShortAnswer>

      <H2>How to Count It</H2>
      <Ticks
        items={[
          <>The day the lorry comes in is <strong>day zero</strong>. It doesn&apos;t count.</>,
          <>The next working day is <strong>day one</strong>. The one after that is <strong>day two</strong>.</>,
          <>Saturdays, Sundays and bank holidays are skipped. They never count as a working day.</>,
          <>The load must be in by the end of day two.</>,
        ]}
      />

      <H2>Every Day of the Week</H2>
      <P>If there is no bank holiday in the way, this is when each load is due.</P>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 mb-6">
        <table className="w-full text-left min-w-[480px]">
          <thead className="bg-emerald-50">
            <tr>
              {["Load arrives", "Day one", "Day two", "Report by"].map((h) => (
                <th key={h} className="px-4 py-3 poppins-semibold text-xs uppercase tracking-wider text-emerald-800">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-slate-100">
                {r.map((c, i) => (
                  <td key={i} className={`px-4 py-3 text-sm ${i === 3 ? "poppins-semibold text-emerald-800" : "poppins-regular text-slate-600"}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>When a Bank Holiday Gets in the Way</H2>
      <P>
        Push the deadline back one day for each bank holiday that lands on day one or day two. For example, a load that arrives on the
        Thursday before Good Friday: Friday is a bank holiday, Monday is Easter Monday, so day one is Tuesday and day two is Wednesday.
        It is due by the end of Wednesday.
      </P>

      <H2>Why Sites Get It Wrong</H2>
      <Ticks
        items={[
          "Counting the day the waste arrived as day one. It isn't. Day one is the next working day.",
          "Forgetting Friday loads over a long weekend.",
          "Leaving it all to one person, so loads stop when they are off sick or on holiday.",
        ]}
      />
      <P>
        The simplest fix is not to cut it fine. Report each load the same day or the next working day, and the deadline takes care of itself.
      </P>
    </GuideLayout>
  )
}
