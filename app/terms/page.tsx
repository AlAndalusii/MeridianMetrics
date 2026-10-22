import React from "react"
import Link from "next/link"
import { LegalLayout, Section, H3, Bullets, Note, CompanyDetails } from "@/components/legal/LegalLayout"
import { CONTACT_INFO } from "@/lib/constants"

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="The terms for using our website and for our digital waste tracking services. Written in plain English, so you know exactly what we do and what you do."
      current="/terms"
    >
      <Section num={1} title="Who We Are">
        <p>
          These terms are between your business and Millstone Compliance Ltd (&quot;we&quot;, &quot;us&quot;). By using this
          website or our services, you agree to them. If we agree something different with you in writing, such as a proposal
          or email confirming your fee, that takes priority where the two conflict.
        </p>
        <CompanyDetails />
        <Note>
          Our services are for businesses only. If you use them, you confirm you are acting for a business and not as a
          consumer.
        </Note>
      </Section>

      <Section num={2} title="Our Services">
        <div className="space-y-3">
          {[
            ["DWT Reporting, Done for You", "You send us your weighbridge tickets and transfer notes, usually by email. We enter and submit each load to Defra's digital waste tracking service for your site, fix errors we find, and send you a confirmation each Friday."],
            ["DWT Health Check", "A one-off check of a sample week of your loads against your tickets and permit, with a short written report of what to fix."],
            ["DWT Setup", "One-off help to get you reporting yourself: Defra registration and API code, choosing a spreadsheet or software, a pre-filled code template and a handover for your weighbridge staff."],
            ["Paperwork Support", "An add-on for reporting clients: quarterly waste returns and setting up regular hauliers and customers, using data we already hold for you."],
            ["Introductions", "Free introductions to carriers, yards and other contacts we know."],
          ].map(([name, detail]) => (
            <div key={name} className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
              <h3 className="text-emerald-900 font-semibold mb-1">{name}</h3>
              <p className="text-sm">{detail}</p>
            </div>
          ))}
        </div>
        <p>
          We also offer free guides, a readiness check and a deadline checker on this website. These are general information,
          not advice for your particular site.
        </p>
      </Section>

      <Section num={3} title="Free Two-Week Trial">
        <Bullets
          items={[
            "DWT Reporting comes with a free two-week trial. No card and no contract are needed.",
            "During the trial we report your loads in the same way as for paying clients.",
            "At the end, we will confirm your monthly fee. Reporting only continues if you agree to it.",
            "If you do not continue, we stop reporting and return or delete your records as set out in section 11.",
          ]}
        />
      </Section>

      <Section num={4} title="What We Do">
        <Bullets
          items={[
            "Carry out the services with reasonable care and skill.",
            "Aim to submit each load within one working day of receiving a clear, complete ticket, so you stay inside Defra's two-working-day deadline.",
            "Tell you promptly if a ticket is unclear, a code looks wrong, or a submission fails.",
            "Use the Defra access you give us only to report for your site, and keep it private.",
            "Keep your information confidential and handle personal data as set out in section 11.",
          ]}
        />
      </Section>

      <Section num={5} title="What You Do">
        <Note>
          <strong>Your legal duties stay with you.</strong> Digital waste tracking, your permit, duty of care and record keeping
          are your business&apos;s legal responsibilities. We report on your behalf and on your instructions, but we do not take
          those duties over.
        </Note>
        <Bullets
          items={[
            "Send us clear, complete and accurate tickets and notes as soon as each load arrives, ideally the same day.",
            "Confirm your usual EWC and R/D codes and tell us when your permit, site or regular hauliers change.",
            "Give us the Defra access we need, set up in a way Defra allows, and tell us if you change or withdraw it.",
            "Check our Friday confirmation and tell us quickly if anything looks wrong.",
            "Only send us information you are allowed to share with us.",
            "Pay our invoices on time.",
          ]}
        />
        <p>
          If a ticket reaches us late, is unclear or is missing details, we will do our best, but we cannot promise the load is
          reported within the deadline.
        </p>
      </Section>

      <Section num={6} title="Fees and Payment">
        <Bullets
          items={[
            "DWT Reporting: a fixed monthly fee based on your number of loads, agreed with you before the trial ends.",
            "DWT Health Check and DWT Setup: a one-off fee, agreed upfront.",
            "Paperwork Support: added to your monthly fee, or charged per job, as agreed.",
            "Introductions: free.",
            "Invoices are payable within 14 days unless we agree otherwise in writing.",
            "If your loads change a lot, we may review your monthly fee. We will give you at least 30 days' notice of any change.",
          ]}
        />
      </Section>

      <Section num={7} title="Ending the Service">
        <p>
          Monthly reporting has no fixed term. Either of us can end it by giving 30 days&apos; notice by email. We may end it
          sooner if invoices remain unpaid after a reminder, or if you ask us to do something unlawful. When it ends, we will
          finish any loads already sent to us, send a final confirmation, and return or delete your records.
        </p>
      </Section>

      <Section num={8} title="Our Liability">
        <Bullets
          items={[
            "We are not responsible for fines, penalties or losses caused by information you gave us that was wrong, late or incomplete, or by changes you did not tell us about.",
            "We are not responsible for problems caused by Defra's systems, the regulators or other services outside our control, such as outages of the digital waste tracking service.",
            "We are not liable for loss of profit, loss of business or indirect losses.",
            "Our total liability to you in any 12-month period is limited to the fees you paid us in that period.",
            "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot be limited by law.",
          ]}
        />
      </Section>

      <Section num={9} title="Introductions and Other Businesses">
        <p>
          When we introduce you to another business, any agreement is between you and them. We do not guarantee their work,
          prices or compliance, so please carry out your own checks, such as their waste carrier registration.
        </p>
      </Section>

      <Section num={10} title="Using This Website">
        <H3>Information, not legal advice</H3>
        <p>
          Our guides are general information. Rules change, so check official guidance and your permit before you act.
        </p>
        <H3>Our content</H3>
        <p>
          This website&apos;s content and design belong to us. Share it for your own business use, but don&apos;t copy or resell
          it. Templates we make for your site are yours to use there.
        </p>
        <H3>Fair use</H3>
        <p>
          Please don&apos;t misuse the site or its forms. We&apos;re not responsible for websites we link to.
        </p>
      </Section>

      <Section num={11} title="Personal Data">
        <p>
          Your waste records include personal data, such as drivers&apos; and carriers&apos; details. For these, you are the
          controller and we are your processor. We will:
        </p>
        <Bullets
          items={[
            "use it only to provide our services, on your written instructions;",
            "keep it confidential and secure, and make sure anyone handling it is bound by confidentiality;",
            "only use the tools we tell you about (such as our email and storage providers), and stay responsible for them;",
            "help you respond to data requests, and tell you without delay about any data breach;",
            "give you the information you need to show we meet these terms;",
            "delete or return it when the service ends, unless the law requires us to keep it.",
          ]}
        />
        <p>
          How we handle other personal data, and how we use cookies, is explained in our{" "}
          <Link href="/privacy" className="underline decoration-emerald-300">Privacy Policy</Link> and{" "}
          <Link href="/cookies" className="underline decoration-emerald-300">Cookie Policy</Link>.
        </p>
      </Section>

      <Section num={12} title="Complaints, Changes and Law">
        <p>
          If something goes wrong, email {CONTACT_INFO.email} or call {CONTACT_INFO.phone} and we will aim to put it right
          quickly. We may update these terms from time to time; the date at the top shows the latest version, and we will tell
          clients about changes that affect them. These terms are governed by the law of England and Wales, and the courts of
          England and Wales deal with any dispute.
        </p>
      </Section>
    </LegalLayout>
  )
}
