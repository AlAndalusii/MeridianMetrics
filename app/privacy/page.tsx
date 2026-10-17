import React from "react"
import Link from "next/link"
import { LegalLayout, Section, H3, Bullets, Note, CompanyDetails } from "@/components/legal/LegalLayout"
import { CONTACT_INFO } from "@/lib/constants"

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="How Millstone Compliance collects, uses and protects personal information when you use our website and our digital waste tracking services."
      current="/privacy"
    >
      <Section num={1} title="Who We Are">
        <p>
          Millstone Compliance Ltd provides digital waste tracking (DWT) reporting and compliance support for permitted
          waste sites in the UK, such as scrap yards, skip yards and waste transfer stations. For the personal data described
          in this policy, we are the data controller, except where section 4 says we act as a processor for our clients.
        </p>
        <CompanyDetails />
        <p className="text-sm">
          We are a small business and have not appointed a Data Protection Officer. Questions about this policy or your data
          go to {CONTACT_INFO.email}.
        </p>
      </Section>

      <Section num={2} title="What We Collect">
        <H3>Information you give us</H3>
        <Bullets
          items={[
            <><strong>Contact and booking forms:</strong> your name, business name, email, phone number, the service you are interested in, a preferred call time and your message.</>,
            <><strong>Send your tickets:</strong> photos or files of weighbridge tickets, waste transfer notes and similar documents, plus your contact details.</>,
            <><strong>Ready for 2027 list:</strong> your name, business, email, phone, whether you are a carrier, broker or dealer, your registration number (if given) and any notes.</>,
            <><strong>WhatsApp, email and phone:</strong> the messages, photos and documents you send us, and notes of our calls.</>,
            <><strong>Client records:</strong> for clients, site and permit details, your usual EWC and R/D codes, Defra account and API details you share with us, and billing details.</>,
          ]}
        />
        <H3>Information in your waste records</H3>
        <p>
          Tickets and transfer notes can include details about other people, such as driver names, vehicle registrations,
          haulier and customer names, addresses and waste carrier registration numbers. We only use these to report your
          loads and prepare your paperwork.
        </p>
        <H3>Information collected automatically</H3>
        <p>
          When you visit the website, we and our providers collect technical data such as your IP address, browser and device
          type, pages viewed and the referring site. See our <Link href="/cookies" className="underline decoration-emerald-300">Cookie Policy</Link> for details.
        </p>
        <p>
          The free readiness check and the deadline checker run in your browser. Your answers are not sent to us unless you
          choose to contact us.
        </p>
      </Section>

      <Section num={3} title="How We Use It, and Our Lawful Basis">
        <div className="space-y-3">
          {[
            ["Delivering our services", "Entering and submitting your loads to Defra's digital waste tracking service, Health Checks, Setup, Paperwork Support and introductions.", "Contract"],
            ["Answering enquiries and bookings", "Replying to forms, calls and messages, and sending confirmation emails.", "Contract (steps before a contract) and legitimate interests"],
            ["Ready for 2027 updates", "Short plain-English emails about digital waste tracking for carriers, brokers and dealers.", "Consent. You can unsubscribe at any time."],
            ["Running and improving the website", "Keeping the site secure, fixing faults and understanding which pages help people.", "Legitimate interests, and consent where the law needs it"],
            ["Business-to-business marketing", "Understanding which businesses visit the site so we can follow up where relevant.", "Legitimate interests, and consent for non-essential cookies"],
            ["Legal and accounting duties", "Keeping invoices and records, and responding to regulators.", "Legal obligation"],
          ].map(([what, detail, basis]) => (
            <div key={what} className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
              <h3 className="text-emerald-900 font-semibold mb-1">{what}</h3>
              <p className="text-sm">{detail}</p>
              <p className="text-xs mt-2 text-emerald-700"><strong>Lawful basis:</strong> {basis}</p>
            </div>
          ))}
        </div>
        <p>We do not sell your personal data, and we do not make decisions about you by automated means alone.</p>
      </Section>

      <Section num={4} title="When We Report Loads for You">
        <p>
          When we submit loads to Defra&apos;s digital waste tracking service for your site, we act on your instructions as a
          data processor for the personal data in your waste records. Your business remains the controller of that data and
          remains legally responsible for its waste tracking duties. We will:
        </p>
        <Bullets
          items={[
            "only use your records to provide the services you have asked for",
            "keep your Defra login and API details private and use them only to report for your site",
            "make sure anyone working on your records is bound by confidentiality",
            "tell you without undue delay if we become aware of a breach affecting your data",
            "return or delete your records when our work for you ends, unless the law requires us to keep them",
          ]}
        />
        <p className="text-sm">
          Our <Link href="/terms" className="underline decoration-emerald-300">Terms of Service</Link> set out the rest of this
          arrangement.
        </p>
      </Section>

      <Section num={5} title="Who We Share It With">
        <Bullets
          items={[
            <><strong>Defra and the environmental regulators</strong> (such as the Environment Agency), when we submit loads for you or where the law requires it.</>,
            <><strong>Resend</strong>, which sends our website form emails.</>,
            <><strong>WhatsApp (Meta)</strong>, when you choose to send us tickets or messages on WhatsApp.</>,
            <><strong>Our website hosting provider</strong>, which runs the website and processes form submissions.</>,
            <><strong>Leadsy</strong>, a website visitor tool. See the <Link href="/cookies" className="underline decoration-emerald-300">Cookie Policy</Link>.</>,
            <><strong>Professional advisers</strong>, such as our accountant, insurer or solicitor.</>,
            <><strong>Introductions:</strong> if you ask us to introduce you to a carrier, yard or other contact, we only pass on your details with your agreement.</>,
          ]}
        />
        <p>
          Some providers may process data outside the UK. Where they do, we rely on UK adequacy regulations or the UK
          International Data Transfer Agreement or Addendum to protect it.
        </p>
      </Section>

      <Section num={6} title="How Long We Keep It">
        <Bullets
          items={[
            "Enquiries that do not become work: up to 2 years after our last contact",
            "Ready for 2027 list: until you unsubscribe, or until October 2028 if we no longer send updates",
            "Client waste records we hold for you: for the length of our work, then returned or deleted within 90 days unless you ask us to keep them",
            "Invoices and accounting records: 6 years after the end of the financial year, as UK law requires",
            "Website and cookie data: see the Cookie Policy",
          ]}
        />
        <Note>
          The legal duty to keep waste transfer records (normally at least 2 years) sits with your business. We are not your
          record keeper unless we have agreed that in writing.
        </Note>
      </Section>

      <Section num={7} title="Keeping It Safe">
        <p>
          We use encrypted connections (HTTPS), secure email and file storage, strong passwords and two-factor sign-in on
          our accounts, and we limit access to the people who need it. No system is completely secure, so please tell us
          straight away if you think your data has been put at risk.
        </p>
      </Section>

      <Section num={8} title="Your Rights">
        <p>Under UK GDPR and the Data Protection Act 2018 you can ask us to:</p>
        <Bullets
          items={[
            "give you a copy of the personal data we hold about you",
            "correct data that is wrong or incomplete",
            "delete your data, where we have no legal reason to keep it",
            "restrict or object to how we use it, including for marketing",
            "give you your data in a portable format",
            "withdraw consent at any time, where we rely on consent",
          ]}
        />
        <p>
          Email {CONTACT_INFO.email}. We will reply within one month. If you are unhappy with how we handle your data, you can
          complain to the Information Commissioner&apos;s Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="underline decoration-emerald-300">ico.org.uk</a> or
          on 0303 123 1113. We would like the chance to help first.
        </p>
      </Section>

      <Section num={9} title="Changes to This Policy">
        <p>
          We will update this policy when our services or the law change, and change the date at the top. If a change
          matters to clients, we will tell them directly.
        </p>
      </Section>
    </LegalLayout>
  )
}
