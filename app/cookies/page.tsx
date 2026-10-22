import React from "react"
import Link from "next/link"
import { LegalLayout, Section, Bullets, Note, CompanyDetails } from "@/components/legal/LegalLayout"
import { CONTACT_INFO } from "@/lib/constants"

const cookieRows = [
  {
    name: "Leadsy (r2.leadsy.ai)",
    type: "Marketing / visitor insight",
    purpose: "Helps us see which businesses visit the site and which pages they read, so we can follow up with sites that may need help with digital waste tracking.",
    duration: "Set by Leadsy, typically up to 12 months",
  },
  {
    name: "Website hosting",
    type: "Strictly necessary",
    purpose: "Keeps the site secure and working, for example protecting forms from abuse. These do not track you across other sites.",
    duration: "Session or short-lived",
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      intro="What cookies and similar technologies the Millstone Compliance website uses, why, and how you can control them."
      current="/cookies"
    >
      <Section num={1} title="What Cookies Are">
        <p>
          Cookies are small files a website saves on your device. Similar technologies, such as tracking scripts and pixels, work
          in a similar way. Some are needed for a website to work. Others help the owner understand how the site is used.
        </p>
      </Section>

      <Section num={2} title="What We Use">
        <p>We keep this short on purpose. We do not use Google Analytics or advertising cookies, and we do not sell your data.</p>
        <div className="space-y-3">
          {cookieRows.map((row) => (
            <div key={row.name} className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-emerald-900 font-semibold">{row.name}</h3>
                <span className="text-xs poppins-medium text-emerald-700 bg-white border border-emerald-200 rounded-full px-2.5 py-0.5">{row.type}</span>
              </div>
              <p className="text-sm">{row.purpose}</p>
              <p className="text-xs mt-2 text-emerald-700"><strong>How long:</strong> {row.duration}</p>
            </div>
          ))}
        </div>
        <p>
          Our free readiness check and deadline checker run in your browser and do not save your answers in cookies. Our forms
          send your details to us by email; they do not set tracking cookies.
        </p>
      </Section>

      <Section num={3} title="Links and Services Outside the Website">
        <p>
          If you follow a link to LinkedIn, Defra or GOV.UK, those services may set their
          own cookies under their own policies. We do not control those cookies.
        </p>
      </Section>

      <Section num={4} title="How to Control Cookies">
        <Bullets
          items={[
            "You can block or delete cookies in your browser settings. Each browser explains how in its help pages.",
            "Blocking strictly necessary cookies may stop parts of the site, such as forms, from working.",
            "Blocking marketing cookies will not affect how the site works for you.",
            <>For more guidance, see the ICO&apos;s page on cookies at <a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener noreferrer" className="underline decoration-emerald-300">ico.org.uk</a>.</>,
          ]}
        />
        <Note>
          The law (the Privacy and Electronic Communications Regulations) says non-essential cookies need your consent. If you
          would like us to remove any data collected about your visit, email {CONTACT_INFO.email}.
        </Note>
      </Section>

      <Section num={5} title="Personal Data and Contact">
        <p>
          Where cookies collect personal data, we handle it as set out in our{" "}
          <Link href="/privacy" className="underline decoration-emerald-300">Privacy Policy</Link>. Questions about this policy go to:
        </p>
        <CompanyDetails />
      </Section>
    </LegalLayout>
  )
}
