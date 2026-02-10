import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, AlertCircle, FileText, Calculator } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"

export default function PlasticPackagingTaxExplained() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <Button 
              asChild
              className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/quiz">Free Assessment</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="poppins-medium text-sm">Back to Resources</span>
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 mb-4">
              <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-wide">Beginner's Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              What Is Plastic Packaging Tax? A Simple Guide for UK Businesses
            </h1>
            <p className="poppins-regular text-lg text-emerald-700">
              Everything you need to know about the UK plastic packaging tax in 2025, explained in plain English.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Updated: December 2024</span>
              <span>•</span>
              <span className="poppins-medium">5 min read</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-emerald max-w-none">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">What Is the Plastic Packaging Tax?</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                The <strong>plastic packaging tax</strong> (or PPT for short) is a charge the UK government introduced in April 2022. Think of it like this: if you make or bring plastic packaging into the UK, and it doesn't have enough recycled plastic in it, you'll need to pay this tax.
              </p>
              <p className="poppins-regular text-emerald-800 leading-relaxed">
                The government created the <strong>UK plastic packaging tax</strong> to get businesses to use more recycled plastic. It's like when your parents ask you to recycle your bottles — the government wants companies to do the same thing with their packaging.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">How Much Is the Plastic Packaging Tax?</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                In 2025, the <strong>plastic packaging tax rate</strong> is £217.85 for every tonne of plastic packaging. That's about £0.22 per kilogram. It might not sound like much, but if your business uses lots of plastic packaging, it adds up quickly!
              </p>
              <p className="poppins-regular text-emerald-800 leading-relaxed">
                The <strong>plastic packaging tax rate 2025</strong> went up from £210.82 in 2024. HMRC (that's the UK tax office) changes the rate each year to match inflation.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="poppins-semibold text-lg text-amber-900 mb-2">Important: The 30% Rule</h3>
                  <p className="poppins-regular text-amber-800 leading-relaxed">
                    Here's the key rule: if your plastic packaging contains <strong>30% or more recycled plastic</strong>, you don't pay the tax! This is the big one that helps businesses avoid the charge.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Who Pays Plastic Packaging Tax?</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                You need to worry about this tax if you're a business that:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Makes plastic packaging in the UK</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Brings plastic packaging into the UK from other countries (imports)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Uses more than 10 tonnes of plastic packaging in a year</span>
                </li>
              </ul>
              <p className="poppins-regular text-emerald-800 leading-relaxed">
                The <strong>plastic packaging tax threshold</strong> is 10 tonnes per year. If you use less than this, you don't need to register or pay anything. As of August 2025, there are 4,927 businesses registered for the tax across the UK.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Plastic Packaging Tax Registration</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                If you go over 10 tonnes of plastic packaging in a 12-month period, you need to <strong>register for plastic packaging tax</strong> with HMRC. Here's what you need to know:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-700 text-sm poppins-semibold">1</span>
                  </div>
                  <span className="poppins-regular text-emerald-800">Register online through the HMRC website</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-700 text-sm poppins-semibold">2</span>
                  </div>
                  <span className="poppins-regular text-emerald-800">Submit returns every 3 months (quarterly)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-700 text-sm poppins-semibold">3</span>
                  </div>
                  <span className="poppins-regular text-emerald-800">Pay your tax bill by the last working day of the month after each quarter</span>
                </li>
              </ul>
              <p className="poppins-regular text-emerald-800 leading-relaxed">
                The <strong>HMRC plastic packaging tax</strong> system requires you to keep detailed records of all your plastic packaging — both the stuff you pay tax on and the stuff you don't.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Plastic Packaging Tax Exemptions</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                Good news! You don't pay the <strong>plastics packaging tax</strong> if:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Your packaging has 30% or more recycled plastic content (this is the big one!)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">You're exporting the packaging out of the UK</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">The packaging is for medicines (like pill bottles or blister packs)</span>
                </li>
              </ul>
              <p className="poppins-regular text-emerald-800 leading-relaxed">
                In the 2024-2025 tax year, 51% of all plastic packaging in the UK met the 30% recycled content threshold. That's a lot of businesses getting it right!
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">What Happens If You Get It Wrong?</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                The <strong>plastic packaging tax penalties</strong> can be serious if you don't follow the rules properly. You could face fines if you:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Don't register when you should</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Miss the deadline for your returns</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Can't prove your recycled content claims</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200 mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Quick Facts About Plastic Packaging Tax 2025</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Started: 1 April 2022</span>
                </li>
                <li className="flex items-start gap-3">
                  <Calculator className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Current rate: £217.85 per tonne</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Registration threshold: 10 tonnes per year</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Recycled content needed to avoid tax: 30% or more</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Government revenue 2024-25: £259 million</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 sm:p-8 text-white mb-8">
              <h2 className="poppins-semibold text-2xl mb-4">Need Help With Your Plastic Packaging Tax?</h2>
              <p className="poppins-regular mb-6 leading-relaxed">
                The <strong>plastic packaging tax legislation</strong> can be tricky to get right. Our free assessment takes just 3 minutes and shows you exactly what you need to do to stay compliant.
              </p>
              <Button 
                asChild
                className="poppins-semibold bg-white hover:bg-emerald-50 text-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link href="/quiz">Start Your Free Assessment</Link>
              </Button>
            </div>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">The Bottom Line</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed">
                The <strong>UK plastic packaging tax</strong> is here to stay, and it's getting businesses to think differently about packaging. The main thing to remember is the 30% rule — get your recycled content above 30%, and you won't pay the tax. Simple as that!
              </p>
              <p className="poppins-regular text-emerald-800 leading-relaxed mt-4">
                If you're making or importing more than 10 tonnes of plastic packaging per year, make sure you're registered with HMRC and keeping proper records. The <strong>HMRC plastic packaging tax guidance</strong> on their website has all the official details, but if you want it explained in plain English, that's what we're here for.
              </p>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-emerald-100">
            <p className="poppins-regular text-sm text-emerald-600">
              Last updated: December 2024 | Based on official HMRC plastic packaging tax statistics and guidance
            </p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-emerald-50/50 border-t border-emerald-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
            <MillstoneLogo size="sm" variant="modern" />
          </Link>
          <p className="poppins-regular text-emerald-600 text-sm">
            © {new Date().getFullYear()} Millstone Compliance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


