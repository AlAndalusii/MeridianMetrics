"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Truck,
  ListChecks,
  Timer,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  Search,
  RotateCcw,
  Clock,
  BadgeCheck,
  Lock,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

const WHATSAPP_NUMBER = "447762270113"

/* ─── The four areas and ten questions ────────────────────────────────────── */
type Answer = "yes" | "no" | "unsure"
type AreaId = "registration" | "reporting" | "codes" | "deadlines"

const areas: { id: AreaId; label: string; icon: React.ElementType }[] = [
  { id: "registration", label: "Registration", icon: FileCheck },
  { id: "reporting", label: "Reporting", icon: Truck },
  { id: "codes", label: "Codes", icon: ListChecks },
  { id: "deadlines", label: "Deadlines", icon: Timer },
]

type Question = {
  area: AreaId
  q: string
  why: string
  // Which answer is the warning sign ("Not sure" always counts)
  warn: Answer
  sign: string
  check: string
}

const questions: Question[] = [
  {
    area: "registration",
    q: "Is your site set up on Defra's digital waste tracking service?",
    why: "You can't report a load until you're set up.",
    warn: "no",
    sign: "Site not set up yet",
    check: "Ask whoever looks after your permit if the site is registered. If not, get it done before your next load comes in.",
  },
  {
    area: "registration",
    q: "Do you know who at your site can log in and submit loads?",
    why: "If only one person can, loads stop when they're off.",
    warn: "no",
    sign: "Not sure who can submit",
    check: "Write down who has a login. Make sure at least two people can submit, or someone outside the site does it for you.",
  },
  {
    area: "reporting",
    q: "Is every load you receive being reported right now?",
    why: "Every load counts, not just the big ones.",
    warn: "no",
    sign: "Not every load is reported",
    check: "Pick one day last week. Count the tickets, then count the loads you reported for that day. The two numbers should match.",
  },
  {
    area: "reporting",
    q: "Does someone type each load in by hand from the paper ticket?",
    why: "That's the same job twice, on every ticket.",
    warn: "yes",
    sign: "Every load typed in twice",
    check: "Time how long one load takes to enter. Times it by your loads a week. That's the admin you could hand over.",
  },
  {
    area: "reporting",
    q: "Do you still keep your paper waste transfer notes?",
    why: "Digital tracking is extra. It doesn't replace them.",
    warn: "no",
    sign: "Paper notes not kept",
    check: "Keep your transfer notes the way you always have. Digital waste tracking sits on top of your paperwork, not instead of it.",
  },
  {
    area: "codes",
    q: "Do you know the EWC codes for the waste you take in most?",
    why: "Most sites use the same handful of codes.",
    warn: "no",
    sign: "Unsure of our EWC codes",
    check: "Look at your last 20 tickets. List the waste types that keep coming up, and the six-digit EWC code for each one.",
  },
  {
    area: "codes",
    q: "Do you know which R or D code goes with each waste?",
    why: "R means recovery. D means disposal.",
    warn: "no",
    sign: "Unsure of our R/D codes",
    check: "For each waste on your list, write down what your site does with it. Then match it to the R or D code your permit uses.",
  },
  {
    area: "codes",
    q: "Have you checked your codes match what your permit allows?",
    why: "A wrong code can mean a load your permit doesn't cover.",
    warn: "no",
    sign: "Codes not checked against permit",
    check: "Put your permit next to your code list. Every EWC and R/D code you report should appear in your permit.",
  },
  {
    area: "deadlines",
    q: "Do you know the deadline for reporting each load?",
    why: "It's two working days, and it's easy to miscount.",
    warn: "no",
    sign: "Unsure of the deadline",
    check: "Count two working days from the day after the waste arrives. Weekends and bank holidays don't count. A Thursday load is due by the end of Monday.",
  },
  {
    area: "deadlines",
    q: "If someone is off sick or on holiday, do loads still go in on time?",
    why: "Deadlines don't stop for holidays.",
    warn: "no",
    sign: "No cover when someone's off",
    check: "Decide now who reports loads when the usual person is away, and make sure they can log in.",
  },
]

const isWarning = (q: Question, a?: Answer) => a === "unsure" || a === q.warn

const verdictFor = (n: number) =>
  n <= 2
    ? { label: "Looking ready", note: "Only a few small things to tidy up.", tone: "emerald" as const }
    : n <= 5
    ? { label: "A few gaps", note: "There are a few places where loads could slip through.", tone: "amber" as const }
    : { label: "Time to get set up", note: "Several signs your site isn't ready yet.", tone: "rose" as const }

const toneClasses = {
  emerald: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", stroke: "#059669" },
  amber: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", stroke: "#d97706" },
  rose: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", stroke: "#e11d48" },
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function FreeCheckPage() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro")
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(Answer | undefined)[]>(Array(questions.length).fill(undefined))
  const [picked, setPicked] = useState<Answer | null>(null)
  const [name, setName] = useState("")
  const [business, setBusiness] = useState("")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [stage])

  const choose = (a: Answer) => {
    if (picked) return
    setPicked(a)
    const next = [...answers]
    next[index] = a
    setAnswers(next)
    setTimeout(() => {
      setPicked(null)
      if (index + 1 < questions.length) setIndex(index + 1)
      else setStage("result")
    }, 380)
  }

  // Keys 1, 2, 3 answer the question
  useEffect(() => {
    if (stage !== "quiz") return
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      const map: Record<string, Answer> = { "1": "yes", "2": "no", "3": "unsure" }
      if (map[e.key]) choose(map[e.key])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const restart = () => {
    setAnswers(Array(questions.length).fill(undefined))
    setIndex(0)
    setStage("quiz")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50/60 text-slate-900 overflow-x-hidden">
      <Navigation />

      <main className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
        {/* Soft backdrop */}
        <div className="absolute inset-x-0 top-0 h-[600px] -z-0 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_20%,transparent_100%)]" />

        <div className="relative max-w-3xl mx-auto">
          {stage === "intro" && <Intro onStart={() => setStage("quiz")} />}
          {stage === "quiz" && (
            <QuizCard
              index={index}
              answers={answers}
              picked={picked}
              onChoose={choose}
              onBack={() => (index === 0 ? setStage("intro") : setIndex(index - 1))}
            />
          )}
          {stage === "result" && (
            <Result
              answers={answers}
              name={name}
              business={business}
              setName={setName}
              setBusiness={setBusiness}
              onRestart={restart}
            />
          )}
        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fcIn {
          0%   { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes fcWord {
          0%   { opacity: 0; transform: translateY(0.4em); filter: blur(12px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes fcShine { to { background-position: -200% 0; } }
        @keyframes fcGlow  { 0%, 100% { opacity: 0.35; transform: scale(0.96); } 50% { opacity: 0.7; transform: scale(1.04); } }
        @keyframes fcBtn   { 0%, 55% { left: -50%; } 100% { left: 150%; } }
        .fc-in { animation: fcIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .fc-word { animation: fcWord 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .fc-shine { animation: fcWord 0.9s cubic-bezier(0.22,1,0.36,1) both, fcShine 6s linear 1.8s infinite; }
        .fc-glow { animation: fcGlow 3.2s ease-in-out infinite; }
        .fc-btn-shine { animation: fcBtn 3.6s ease-in-out 1.6s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fc-in, .fc-word, .fc-shine, .fc-glow, .fc-btn-shine { animation: none; }
        }
      ` }} />
    </div>
  )
}

/* ─── Intro ───────────────────────────────────────────────────────────────── */
function Intro({ onStart }: { onStart: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const [lit, setLit] = useState(-1)

  // Light the four areas one after another, on a loop
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let i = -1
    let id: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      id = setInterval(() => {
        i = (i + 1) % (areas.length + 1)
        setLit(i === areas.length ? -1 : i)
      }, 900)
    }, 1400)
    return () => {
      clearTimeout(start)
      clearInterval(id)
    }
  }, [])

  const begin = () => {
    if (leaving) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onStart()
    setLeaving(true)
    setTimeout(onStart, 520)
  }

  const words = ["Is", "Your", "Site", "Ready"]

  return (
    <div className={`text-center transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${leaving ? "opacity-0 -translate-y-6 scale-[0.98] blur-sm" : ""}`}>
      <div className="fc-in inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 backdrop-blur shadow-sm px-3.5 py-1.5 mb-8">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
          <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
        </span>
        <span className="poppins-semibold text-xs uppercase tracking-[0.18em] text-emerald-800">Free Readiness Check</span>
      </div>

      <h1 className="poppins-bold text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.02] tracking-tight">
        <span className="block">
          {words.map((w, i) => (
            <React.Fragment key={w}>
              <span className="fc-word inline-block" style={{ animationDelay: `${100 + i * 90}ms` }}>{w}</span>{" "}
            </React.Fragment>
          ))}
        </span>
        <span
          className="fc-word fc-shine inline-block pb-2 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent"
          style={{ animationDelay: "480ms" }}
        >
          for Waste Tracking?
        </span>
      </h1>

      <p className="fc-in poppins-regular text-lg sm:text-xl text-slate-600 leading-relaxed mt-6 max-w-xl mx-auto" style={{ animationDelay: "650ms" }}>
        10 quick questions, 3 minutes. Find out if your site is reporting properly, or if loads are slipping through.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-10 max-w-2xl mx-auto">
        {areas.map((a, i) => {
          const on = lit === i
          return (
            <div
              key={a.id}
              className={`fc-in flex items-center justify-center gap-2 rounded-2xl border px-3 py-3.5 transition-all duration-500 ${
                on
                  ? "border-emerald-300 bg-emerald-50 -translate-y-1 shadow-[0_12px_28px_-10px_rgba(16,185,129,0.45)]"
                  : "border-emerald-100 bg-white shadow-[0_2px_12px_rgba(6,95,70,0.05)]"
              }`}
              style={{ animationDelay: `${780 + i * 80}ms` }}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${on ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600"}`}>
                <a.icon className="w-4 h-4" />
              </span>
              <span className="poppins-semibold text-sm text-slate-800">{a.label}</span>
            </div>
          )
        })}
      </div>

      <div className="fc-in mt-12 flex flex-col items-center" style={{ animationDelay: "1100ms" }}>
        <div className="relative w-full sm:w-auto">
          {/* Breathing glow */}
          <div className="fc-glow absolute -inset-3 rounded-full bg-emerald-400/40 blur-2xl pointer-events-none" aria-hidden="true" />
          <button
            onClick={begin}
            className="group relative w-full sm:w-auto sm:min-w-[380px] inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-b from-emerald-600 to-emerald-800 px-12 py-6 min-h-[72px] poppins-semibold text-xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_24px_60px_-16px_rgba(6,95,70,0.7)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_30px_70px_-14px_rgba(6,95,70,0.8)] active:translate-y-0 active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            <span className="fc-btn-shine absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" aria-hidden="true" />
            <span className="relative">Start the Check</span>
            <span className="relative flex w-9 h-9 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-white group-hover:text-emerald-800">
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>

        <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 rounded-full border border-emerald-100 bg-white/70 backdrop-blur px-4 sm:px-6 py-3 text-sm sm:text-base text-slate-600 poppins-medium">
          <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-600" />3 minutes</span>
          <span className="hidden sm:block w-px h-4 bg-emerald-200" />
          <span className="inline-flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-600" />No email needed</span>
          <span className="hidden sm:block w-px h-4 bg-emerald-200" />
          <span className="inline-flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-emerald-600" />Free</span>
        </div>
      </div>
    </div>
  )
}

/* ─── One question at a time ──────────────────────────────────────────────── */
function QuizCard({
  index,
  answers,
  picked,
  onChoose,
  onBack,
}: {
  index: number
  answers: (Answer | undefined)[]
  picked: Answer | null
  onChoose: (a: Answer) => void
  onBack: () => void
}) {
  const q = questions[index]
  const area = areas.find((a) => a.id === q.area)!
  const current = picked ?? answers[index]

  const options: { value: Answer; label: string; key: string }[] = [
    { value: "yes", label: "Yes", key: "1" },
    { value: "no", label: "No", key: "2" },
    { value: "unsure", label: "Not sure", key: "3" },
  ]

  return (
    <div>
      {/* Progress: one segment per question, grouped by area */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 poppins-medium text-sm text-slate-500 hover:text-emerald-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="poppins-semibold text-sm text-slate-500 tabular-nums">
          {index + 1} <span className="text-slate-300">/ {questions.length}</span>
        </span>
      </div>
      <div className="flex gap-1 mb-10" aria-hidden="true">
        {questions.map((qq, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              i < index || (i === index && picked) ? "bg-emerald-600" : i === index ? "bg-emerald-300" : "bg-emerald-100"
            } ${i > 0 && questions[i - 1].area !== qq.area ? "ml-1.5" : ""}`}
          />
        ))}
      </div>

      <div key={index} className="rounded-[2rem] border border-emerald-100 bg-white shadow-[0_30px_80px_-40px_rgba(6,95,70,0.35)] p-6 sm:p-10">
        <div className="fc-in inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 mb-6">
          <area.icon className="w-4 h-4 text-emerald-700" />
          <span className="poppins-semibold text-xs uppercase tracking-[0.15em] text-emerald-800">{area.label}</span>
        </div>

        <h1 className="fc-in poppins-bold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-slate-900" style={{ animationDelay: "60ms" }}>
          {q.q}
        </h1>
        <p className="fc-in poppins-regular text-base text-slate-500 mt-3" style={{ animationDelay: "120ms" }}>
          {q.why}
        </p>

        <div className="fc-in grid sm:grid-cols-3 gap-3 mt-8" style={{ animationDelay: "180ms" }} role="radiogroup" aria-label={q.q}>
          {options.map((o) => {
            const active = current === o.value
            return (
              <button
                key={o.value}
                role="radio"
                aria-checked={active}
                onClick={() => onChoose(o.value)}
                className={`group relative flex items-center justify-between rounded-2xl border-2 px-5 py-4 min-h-[60px] text-left transition-all duration-200 active:scale-[0.98] ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-[0_12px_30px_-10px_rgba(5,150,105,0.6)]"
                    : "border-slate-200 bg-white text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50"
                }`}
              >
                <span className="poppins-semibold text-lg">{o.label}</span>
                <span
                  className={`hidden sm:inline-flex w-6 h-6 items-center justify-center rounded-md text-[11px] poppins-semibold border ${
                    active ? "border-white/40 text-white/80" : "border-slate-200 text-slate-400"
                  }`}
                >
                  {o.key}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── Result ──────────────────────────────────────────────────────────────── */
function Result({
  answers,
  name,
  business,
  setName,
  setBusiness,
  onRestart,
}: {
  answers: (Answer | undefined)[]
  name: string
  business: string
  setName: (v: string) => void
  setBusiness: (v: string) => void
  onRestart: () => void
}) {
  const flagged = questions.filter((q, i) => isWarning(q, answers[i]))
  const count = flagged.length
  const verdict = verdictFor(count)
  const tone = toneClasses[verdict.tone]

  // Score ring fills after the page lands
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setShown(count), 250)
    return () => clearTimeout(t)
  }, [count])
  const R = 52
  const C = 2 * Math.PI * R

  const message = [
    `Hi Zak, I just did the free readiness check on your website.`,
    name && `Name: ${name}`,
    business && `Site: ${business}`,
    `Result: ${count} of ${questions.length} warning signs (${verdict.label})`,
    count > 0 && `\nMy warning signs:\n${flagged.map((q) => `• ${q.sign}`).join("\n")}`,
    `\nCan you help my site with digital waste tracking?`,
  ]
    .filter(Boolean)
    .join("\n")
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  const WhatsAppButton = ({ className = "" }: { className?: string }) => (
    <a
      href={waHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5b] px-7 py-4 poppins-semibold text-base text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.6)] transition-all duration-300 active:scale-[0.98] min-h-[56px] ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Send My Results on WhatsApp
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )

  return (
    <div>
      {/* Score */}
      <div className="fc-in rounded-[2rem] border border-emerald-100 bg-white shadow-[0_30px_80px_-40px_rgba(6,95,70,0.35)] p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-40 h-40 flex-shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
              <circle cx="60" cy="60" r={R} fill="none" stroke="#ecfdf5" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={tone.stroke}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(shown / questions.length) * C} ${C}`}
                style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.65,0,0.35,1)" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="poppins-bold text-5xl text-slate-900 tabular-nums leading-none">{count}</span>
              <span className="poppins-medium text-xs text-slate-400 mt-1">of {questions.length} signs</span>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 poppins-semibold text-xs uppercase tracking-[0.15em] ${tone.bg} ${tone.border} ${tone.text}`}>
              Your result
            </span>
            <h1 className={`poppins-bold text-3xl sm:text-4xl tracking-tight mt-3 ${tone.text}`}>{verdict.label}</h1>
            <p className="poppins-regular text-lg text-slate-600 mt-2">{verdict.note}</p>
          </div>
        </div>

        {/* Area breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-8">
          {areas.map((a) => {
            const qs = questions.filter((q) => q.area === a.id)
            const bad = qs.filter((q) => flagged.includes(q)).length
            const ok = bad === 0
            return (
              <div
                key={a.id}
                className={`rounded-2xl border px-4 py-3 ${ok ? "border-emerald-100 bg-emerald-50/60" : "border-amber-200 bg-amber-50/70"}`}
              >
                <div className="flex items-center justify-between">
                  <a.icon className={`w-4 h-4 ${ok ? "text-emerald-600" : "text-amber-600"}`} />
                  {ok ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                </div>
                <p className="poppins-semibold text-sm text-slate-900 mt-2">{a.label}</p>
                <p className={`poppins-regular text-xs ${ok ? "text-emerald-700" : "text-amber-700"}`}>
                  {ok ? "Looks OK" : `${bad} sign${bad > 1 ? "s" : ""}`}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* WhatsApp */}
      <div className="fc-in mt-5 rounded-[2rem] bg-emerald-900 p-6 sm:p-10 relative overflow-hidden" style={{ animationDelay: "120ms" }}>
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.35)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative">
          <h2 className="poppins-bold text-2xl sm:text-3xl text-white tracking-tight">Want Me to Take a Look?</h2>
          <p className="poppins-regular text-base sm:text-lg text-emerald-100/80 mt-2 max-w-xl">
            Send me your result on WhatsApp. I&apos;ll tell you what I&apos;d fix first, and how a free two-week trial works.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <label className="block">
              <span className="poppins-medium text-xs text-emerald-200/80">Your name (optional)</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sam"
                className="mt-1.5 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-emerald-100/40 poppins-regular text-base outline-none focus:border-emerald-300 focus:bg-white/15 transition-colors"
              />
            </label>
            <label className="block">
              <span className="poppins-medium text-xs text-emerald-200/80">Site name (optional)</span>
              <input
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="e.g. Northside Metals"
                className="mt-1.5 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-emerald-100/40 poppins-regular text-base outline-none focus:border-emerald-300 focus:bg-white/15 transition-colors"
              />
            </label>
          </div>
          <WhatsAppButton className="mt-6 w-full sm:w-auto" />
          <p className="poppins-regular text-xs text-emerald-200/60 mt-3">Opens WhatsApp with your answers filled in. You can edit it before you send.</p>
        </div>
      </div>

      {/* Signs + how to check */}
      <div className="fc-in mt-12" style={{ animationDelay: "220ms" }}>
        <div className="flex items-center gap-4 mb-6">
          <p className="poppins-semibold text-xs uppercase tracking-[0.2em] text-emerald-700/80">
            {count > 0 ? "Your warning signs, and how to check" : "How to keep it that way"}
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent" />
        </div>

        <div className="space-y-3">
          {(count > 0 ? flagged : questions.slice(0, 3)).map((q, i) => (
            <div key={q.sign} className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_2px_16px_rgba(6,95,70,0.04)]">
              <div className="flex items-start gap-4">
                <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center poppins-bold text-sm tabular-nums ${count > 0 ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-100"}`}>
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="poppins-semibold text-base sm:text-lg text-slate-900">{q.sign}</p>
                  <div className="mt-2 flex items-start gap-2">
                    <Search className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <p className="poppins-regular text-sm sm:text-base text-slate-600 leading-relaxed">
                      <span className="poppins-semibold text-emerald-700">How to check: </span>
                      {q.check}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fc-in mt-10 text-center" style={{ animationDelay: "300ms" }}>
        <p className="poppins-semibold text-lg text-slate-900">Rather I did the reporting?</p>
        <p className="poppins-regular text-slate-500 mt-1">Two weeks free. No card. No contract.</p>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <WhatsAppButton className="w-full sm:w-auto" />
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 px-6 py-4 poppins-semibold text-sm text-slate-700 transition-colors min-h-[56px] w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-4 h-4" /> Do it again
          </button>
        </div>
        <Link href="/send-your-bill" className="inline-block mt-5 poppins-medium text-sm text-emerald-700 hover:text-emerald-800 underline underline-offset-4">
          Or send me your tickets instead
        </Link>
      </div>
    </div>
  )
}
