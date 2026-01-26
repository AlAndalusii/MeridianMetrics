# Multi-Scheme Quiz Visual Flow Diagram

## 🎯 Complete Quiz Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOMEPAGE                                 │
│  "Overpaying EPR, PPT, PRN? We find what you're missing."      │
│                                                                  │
│  [START YOUR FREE ASSESSMENT] ←── 3-minute promise             │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                   PART 1: CONTACT INFO                          │
│                     (45 seconds)                                 │
├─────────────────────────────────────────────────────────────────┤
│  Q1: Name          [Text Input]                                 │
│  Q2: Email         [Text Input + Validation]                    │
│  Q3: Company       [Text Input]                                 │
│  Q4: Phone         [Text Input - Optional]                      │
│                                                                  │
│  Purpose: Lead Capture                                          │
│  Progress: 21% (4/19 questions)                                 │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│              PART 2: BUSINESS PROFILE                           │
│                   (45 seconds)                                   │
├─────────────────────────────────────────────────────────────────┤
│  Q5: Revenue Bracket                                            │
│      ○ Under £500K                                              │
│      ○ £500K-£2M      ← EPR likely                             │
│      ○ £2M-£10M       ← HIGH VALUE TARGET                      │
│      ○ £10M+          ← Premium client                          │
│      ○ Not sure                                                 │
│                                                                  │
│  Q6: Business Sector                                            │
│      ○ Food & Drink   ← HIGH PRIORITY                          │
│      ○ E-commerce     ← HIGH PRIORITY                          │
│      ○ Manufacturing                                            │
│      ○ Healthcare                                               │
│      ○ Other                                                    │
│                                                                  │
│  Q7: Packaging Volume                                           │
│      ○ Under 25T                                                │
│      ○ 25-50T         ← EPR full reporting                     │
│      ○ 50-200T        ← HIGH VALUE TARGET                      │
│      ○ 200+ tonnes    ← Premium client                          │
│      ○ Not sure       ← GAP INDICATOR                          │
│                                                                  │
│  Q8: Current Schemes (CRITICAL BRANCHING POINT)                │
│      ○ EPR only       → Skip PPT questions (Q12-14)            │
│      ○ PPT only       → Skip EPR questions (Q9-11)             │
│      ○ EPR + PPT      → Show all questions                      │
│      ○ All three      → Show all questions                      │
│      ○ Not sure       → HIGH VALUE GAP (show all)              │
│                                                                  │
│  Purpose: Lead Qualification + Scheme Routing                   │
│  Progress: 42% (8/19 questions)                                 │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ├──────────────────────────────────────┐
                        │                                       │
        ┌───────────────┴────────┐                             │
        │ IF Q8 = "EPR only"     │                             │
        │ OR "EPR+PPT"           │                             │
        │ OR "All three"         │                             │
        │ OR "Not sure"          │                             │
        └───────────┬────────────┘                             │
                    ▼                                           │
┌─────────────────────────────────────────────────────────────┐ │
│              PART 3: EPR COMPLIANCE                          │ │
│                   (30 seconds)                                │ │
├─────────────────────────────────────────────────────────────┤ │
│  Q9: EPR Invoice Verification                                │ │
│      ○ Yes - verified invoice ✓                             │ │
│      ○ No - just pay what we're sent ✗ £5K-£15K SAVINGS    │ │
│      ○ Not sure - don't know how ✗                          │ │
│      ○ Not registered ✗                                      │ │
│                                                              │ │
│  💡 "Most businesses overpay £5K-£15K annually"             │ │
│                                                              │ │
│  Q10: Material Type Tracking                                 │ │
│      ○ Yes - detailed records ✓                             │ │
│      ○ Partial - some materials                             │ │
│      ○ No - estimate/supplier data ✗                        │ │
│      ○ Not sure - don't know requirements ✗                 │ │
│                                                              │ │
│  Q11: 2026 Modulation Readiness                             │ │
│      ○ Yes - assessed recyclability ✓                       │ │
│      ○ No - haven't looked ✗ 20-40% FEE INCREASE RISK      │ │
│      ○ Not sure - what is modulation? ✗                     │ │
│      ○ Not applicable                                        │ │
│                                                              │ │
│  💡 "2026 modulation could increase fees by 20-40%"         │ │
│                                                              │ │
│  Purpose: EPR Gap Detection + Savings Opportunity            │ │
│  Progress: 58% (11/19 questions)                            │ │
└─────────────────────┬───────────────────────────────────────┘ │
                      │                                          │
                      └──────────────┬───────────────────────────┘
                                     │
        ┌────────────────────────────┴────────────────┐
        │ IF Q8 = "PPT only"                          │
        │ OR "EPR+PPT"                                │
        │ OR "All three"                              │
        │ OR "Not sure"                               │
        └────────────────┬────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              PART 4: PPT COMPLIANCE                             │
│                   (30 seconds)                                   │
├─────────────────────────────────────────────────────────────────┤
│  Q12: PPT Certificate Validity                                  │
│      ○ Yes - all valid with exact % ✓                          │
│      ○ Partial - some missing                                   │
│      ○ No - missing/vague/outdated ✗ HMRC PENALTY RISK        │
│      ○ Not applicable                                           │
│                                                                  │
│  💡 "PPT charges £210.82/tonne - proper certs save money"      │
│                                                                  │
│  Q13: PPT Record Accessibility                                  │
│      ○ Yes - 10 minute access ✓ AUDIT READY                   │
│      ○ Maybe - 30 minutes                                       │
│      ○ No - hours/days needed ✗ AUDIT FAILURE RISK            │
│      ○ Not sure - don't know where records are ✗              │
│                                                                  │
│  Q14: PPT Filing Compliance                                     │
│      ○ Yes - all on time ✓                                     │
│      ○ Mostly - missed 1-2 deadlines ✗ PENALTY EXPOSURE       │
│      ○ No - multiple late submissions ✗ CHRONIC ISSUE         │
│      ○ Not registered                                           │
│                                                                  │
│  Purpose: PPT Gap Detection + Penalty Risk                      │
│  Progress: 74% (14/19 questions)                               │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│         PART 5: PRN STRATEGY & INTELLIGENCE                     │
│                   (45 seconds)                                   │
├─────────────────────────────────────────────────────────────────┤
│  Q15: PRN Strategy                                              │
│      ○ Yes - clear PRN plan ✓                                  │
│      ○ Partial - buy without strategy                           │
│      ○ No - haven't addressed ✗ JAN 31 DEADLINE RISK          │
│      ○ Not sure - does PRN apply? ✗                           │
│                                                                  │
│  💡 "Strategic PRN procurement saves thousands"                 │
│                                                                  │
│  Q16: Biggest Pain Point (CRITICAL - SERVICE MATCHING)         │
│      ○ EPR invoice errors      → EPR audit service             │
│      ○ PPT documentation chaos → PPT system setup              │
│      ○ PRN deadline stress     → PRN procurement               │
│      ○ Multiple schemes        → MANAGED COMPLIANCE            │
│      ○ Uncertain about compliance → COMPREHENSIVE REVIEW       │
│                                                                  │
│  Q17: Urgency Indicators (CRITICAL - LEAD PRIORITIZATION)     │
│      ○ Upcoming deadline       → 🔥 HOT LEAD (24h call)       │
│      ○ HMRC enquiry/audit      → 🔥🔥 CRITICAL (4h call)      │
│      ○ Received warning/penalty → 🔥🔥 CRITICAL (same day)    │
│      ○ Proactive               → ⭐ IDEAL CLIENT               │
│      ○ Just exploring          → ❄️ NURTURE                    │
│                                                                  │
│  Purpose: PRN Assessment + Service Match + Lead Priority        │
│  Progress: 89% (17/19 questions)                               │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│         PART 6: SERVICE PREFERENCE & CONTEXT                    │
│                   (30 seconds)                                   │
├─────────────────────────────────────────────────────────────────┤
│  Q18: Service Preference (SERVICE TIER MATCHING)               │
│      ○ Express Assessment      → 90-min audit (£500-£1K)      │
│      ○ Comprehensive Review    → Full audit (£2K-£5K)         │
│      ○ Managed Compliance      → Quarterly (£1K-£3K/mo)       │
│      ○ Multi-Scheme Fix        → EPR+PPT+PRN (£5K-£15K)      │
│      ○ Not sure                → Conversion opportunity        │
│                                                                  │
│  Q19: Additional Context [Optional Textarea]                    │
│      Examples that elevate lead priority:                       │
│      • "HMRC compliance check next month"                       │
│      • "Just received £15K EPR invoice - too high?"           │
│      • "PRN deadline approaching, not ready"                    │
│      • "Managing 3 schemes across spreadsheets"                 │
│      • "Accountant flagged documentation gaps"                  │
│                                                                  │
│  Purpose: Service Tier Match + Critical Context Capture         │
│  Progress: 100% (19/19 questions)                              │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SCORING CALCULATION                          │
├─────────────────────────────────────────────────────────────────┤
│  Questions 5-17 scored (13 questions)                          │
│  Each question worth 10 points                                  │
│  Maximum possible: 130 points                                   │
│                                                                  │
│  Business Profile (Q5-8):                                       │
│    Clear answer = 8 points                                      │
│    "Not sure" = 0 points (gap)                                 │
│                                                                  │
│  Compliance Questions (Q9-17):                                  │
│    ✓ Correct/Compliant = 10 points                            │
│    Partial compliance = 5 points                                │
│    ✗ Gap/Not sure = 0 points                                   │
│    N/A = 10 points (acceptable)                                 │
│                                                                  │
│  Conditional Scoring:                                           │
│    EPR-only: Skip Q12-14 (PPT questions)                       │
│    PPT-only: Skip Q9-11 (EPR questions)                        │
│    Score = (points earned / applicable points) × 100           │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RESULTS PAGE                                 │
├─────────────────────────────────────────────────────────────────┤
│  Your Compliance Score: XX%                                     │
│                                                                  │
│  90-100% → "Excellent compliance"                              │
│            → Managed service opportunity                        │
│                                                                  │
│  70-89%  → "Good with minor gaps"                              │
│            → Comprehensive review recommended                   │
│                                                                  │
│  50-69%  → "Significant gaps detected"                         │
│            → Urgent audit needed                                │
│                                                                  │
│  <50%    → "Critical compliance issues"                        │
│            → Immediate intervention required                    │
│                                                                  │
│  Personalized Recommendations:                                  │
│  • Scheme-specific gap identification                           │
│  • Estimated savings opportunities                              │
│  • Penalty risk assessment                                      │
│  • Next-step CTA based on urgency                              │
│                                                                  │
│  [BOOK YOUR COMPLIANCE REVIEW]                                 │
│  [DOWNLOAD YOUR RESULTS]                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔀 Branching Logic Visualization

```
                    Q8: Current Schemes?
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   "EPR only"          "PPT only"        "EPR+PPT" or
                                         "All three" or
                                         "Not sure"
        │                   │                   │
        ▼                   ▼                   ▼
   Show Q9-11          Show Q12-14         Show Q9-14
   (EPR questions)     (PPT questions)     (All questions)
        │                   │                   │
   Skip Q12-14         Skip Q9-11              │
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                            ▼
                    All continue to Q15-19
                    (PRN + Intelligence)
```

---

## 🎯 Lead Qualification Flow

```
                    LEAD COMPLETES QUIZ
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │     Calculate Compliance Score         │
        │     (Questions 5-17)                   │
        └───────────────┬───────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
   Score < 70%                    Score ≥ 70%
   (Gaps detected)                (Good compliance)
        │                               │
        ▼                               ▼
   Check Urgency (Q17)            Check Urgency (Q17)
        │                               │
   ┌────┴────┐                     ┌────┴────┐
   ▼         ▼                     ▼         ▼
Deadline   Proactive            Proactive  Exploring
/Audit                                      
   │         │                     │         │
   ▼         ▼                     ▼         ▼
🔥🔥      🔥                    ⭐        ❄️
CRITICAL   HOT                 IDEAL      NURTURE
(4h call)  (24h call)          (Email)    (Content)
```

---

## 💰 Revenue Opportunity Matrix

```
                    LEAD QUALIFICATION MATRIX
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
   HIGH VALUE                              MEDIUM VALUE
   £5K-£15K annual                         £2K-£5K project
        │                                       │
   ┌────┴────┐                           ┌─────┴─────┐
   │         │                           │           │
   ▼         ▼                           ▼           ▼
Revenue:  Volume:                    Revenue:    Volume:
£500K-    50T+                       £500K-      25-50T
£10M                                 £2M
   │         │                           │           │
   ▼         ▼                           ▼           ▼
Schemes:  Score:                    Schemes:    Score:
Multiple  <70%                      Single      70-89%
   │         │                           │           │
   ▼         ▼                           ▼           ▼
Urgency:  Service:                  Urgency:    Service:
Deadline  Managed                   Proactive   Review
/Audit    Compliance                            
   │         │                           │           │
   └────┬────┘                           └─────┬─────┘
        ▼                                      ▼
   🎯 IDEAL                               ✅ QUALIFIED
   PROSPECT                               LEAD
```

---

## 📊 Intelligence Capture Map

```
CONTACT INFO (Q1-4)
├── Name
├── Email (validated)
├── Company
└── Phone (optional)

BUSINESS PROFILE (Q5-8)
├── Revenue Bracket → Lead Qualification
├── Sector → Priority Scoring
├── Packaging Volume → Obligation Scope
└── Current Schemes → Branching Logic + Upsell Opportunity

EPR INTELLIGENCE (Q9-11) *conditional*
├── Invoice Verification → £5K-£15K Savings Opportunity
├── Material Tracking → System Gap Detection
└── 2026 Modulation → Future Cost Risk

PPT INTELLIGENCE (Q12-14) *conditional*
├── Certificate Validity → HMRC Penalty Risk
├── Record Accessibility → Audit Readiness
└── Filing Compliance → Deadline Tracking

PRN & STRATEGIC INTELLIGENCE (Q15-17)
├── PRN Strategy → Cost Optimization
├── Pain Point → Service Matching
└── Urgency → Lead Prioritization

SERVICE MATCHING (Q18-19)
├── Service Preference → Tier Matching
└── Additional Context → Critical Details

TOTAL INTELLIGENCE CAPTURED:
• 50+ data points per lead
• 300%+ increase vs previous quiz
• Automatic lead qualification
• Service tier pre-selection
• Urgency-based prioritization
```

---

## 🚀 Conversion Optimization Flow

```
HOMEPAGE
"Overpaying EPR, PPT, PRN?"
        │
        ▼ (Click CTA)
        │
CONTACT INFO (Q1-4)
"Let's start with basics"
        │
        ▼ (Build trust)
        │
BUSINESS PROFILE (Q5-8)
"Understand your business"
        │
        ▼ (Qualify lead)
        │
COMPLIANCE QUESTIONS (Q9-14)
"Identify gaps" + "Reveal value"
        │
        ▼ (Build awareness)
        │
INTELLIGENCE GATHERING (Q15-17)
"What's your pain?" + "How urgent?"
        │
        ▼ (Service matching)
        │
SERVICE PREFERENCE (Q18-19)
"What do you need?" + "Any concerns?"
        │
        ▼ (Calculate score)
        │
RESULTS PAGE
"Here's your score + gaps + savings"
        │
        ▼ (CTA based on score/urgency)
        │
SALES FOLLOW-UP
• Critical (<50%) → 4h call
• Hot (50-69%) → 24h call
• Warm (70-89%) → 48h email
• Cold (90%+) → Nurture sequence
```

---

## 📈 Success Metrics Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│                  QUIZ PERFORMANCE METRICS                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONVERSION FUNNEL:                                         │
│  ├─ Homepage → Assessment Start:      XX% (Target: >15%)   │
│  ├─ Started → Completed:              XX% (Target: >60%)   │
│  ├─ Completed → Qualified:            XX% (Target: >40%)   │
│  ├─ Qualified → Sales Call:           XX% (Target: >50%)   │
│  └─ Sales Call → Client:              XX% (Target: >30%)   │
│                                                              │
│  LEAD QUALITY:                                              │
│  ├─ High-Value Leads:                 XX% (Target: >30%)   │
│  ├─ Multi-Scheme Leads:               XX% (Target: >40%)   │
│  ├─ Urgent Leads:                     XX% (Target: >20%)   │
│  └─ Score <70% (Gap Opportunity):     XX% (Target: >50%)   │
│                                                              │
│  INTELLIGENCE CAPTURE:                                      │
│  ├─ Complete Business Profile:        XX% (Target: 100%)   │
│  ├─ Pain Point Identified:            XX% (Target: >95%)   │
│  ├─ Service Tier Selected:            XX% (Target: >90%)   │
│  └─ Additional Context Provided:      XX% (Target: >40%)   │
│                                                              │
│  SCHEME DISTRIBUTION:                                       │
│  ├─ EPR only:                         XX%                   │
│  ├─ PPT only:                         XX%                   │
│  ├─ EPR + PPT:                        XX%                   │
│  ├─ All three:                        XX%                   │
│  └─ Not sure (High-value gap):        XX%                   │
│                                                              │
│  REVENUE IMPACT:                                            │
│  ├─ Average Lead Value:               £X,XXX                │
│  ├─ Multi-Scheme Premium:             +XX%                  │
│  ├─ Urgency Conversion Rate:          XX%                   │
│  └─ Service Tier Distribution:        [Chart]              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 User Experience Flow

```
TIME: 0:00
┌──────────────────────────────────────────────────┐
│  HOMEPAGE                                         │
│  "3-minute check finds EPR overcharges,          │
│   PPT errors, and PRN gaps"                      │
│                                                   │
│  [START YOUR FREE ASSESSMENT] ← Click            │
└──────────────────────────────────────────────────┘

TIME: 0:00-0:45 (Contact Info)
┌──────────────────────────────────────────────────┐
│  Progress: ████░░░░░░░░░░░░░░░░ 21%             │
│                                                   │
│  "What's your name?"                             │
│  [John Smith___________]                         │
│                                                   │
│  🔒 Your information is confidential             │
└──────────────────────────────────────────────────┘

TIME: 0:45-1:30 (Business Profile)
┌──────────────────────────────────────────────────┐
│  Progress: ████████░░░░░░░░░░░░ 42%             │
│                                                   │
│  "What's your approximate annual revenue?"       │
│  ○ Under £500K                                   │
│  ● £2M-£10M ← Selected                          │
│  ○ £10M+                                         │
│                                                   │
│  💡 Revenue determines which schemes apply       │
└──────────────────────────────────────────────────┘

TIME: 1:30-2:00 (EPR Compliance)
┌──────────────────────────────────────────────────┐
│  Progress: ███████████░░░░░░░░░ 58%             │
│                                                   │
│  "Have you verified your EPR invoice?"           │
│  ○ Yes - verified                                │
│  ● No - just pay what we're sent ← Selected     │
│                                                   │
│  💡 Most businesses overpay £5K-£15K annually   │
│  ⚠️ We'll help you fix this                     │
└──────────────────────────────────────────────────┘

TIME: 2:00-2:30 (PPT Compliance)
┌──────────────────────────────────────────────────┐
│  Progress: ██████████████░░░░░░ 74%             │
│                                                   │
│  "Can you access all PPT records in 10 mins?"   │
│  ○ Yes - organized                               │
│  ● No - would take hours ← Selected             │
│                                                   │
│  💡 HMRC can request anytime                     │
│  ⚠️ We'll help you fix this                     │
└──────────────────────────────────────────────────┘

TIME: 2:30-3:00 (Intelligence + Service)
┌──────────────────────────────────────────────────┐
│  Progress: ████████████████████ 100%             │
│                                                   │
│  "What's your biggest pain point?"               │
│  ○ EPR invoice errors                            │
│  ● Multiple schemes overwhelming ← Selected      │
│                                                   │
│  ⏱️ Almost done! Calculating your results...    │
└──────────────────────────────────────────────────┘

TIME: 3:00
┌──────────────────────────────────────────────────┐
│  YOUR COMPLIANCE SCORE: 52%                      │
│  ⚠️ Significant gaps detected                    │
│                                                   │
│  Key Findings:                                    │
│  ✗ EPR invoice not verified (£5K-£15K at risk)  │
│  ✗ PPT records not accessible (audit risk)      │
│  ✗ Managing multiple schemes without system      │
│                                                   │
│  Recommended: Multi-Scheme Fix                   │
│  We'll audit EPR, organize PPT, and set up PRN  │
│                                                   │
│  [BOOK YOUR COMPLIANCE REVIEW]                   │
│  [DOWNLOAD DETAILED REPORT]                      │
└──────────────────────────────────────────────────┘
```

---

**Visual Flow Version:** 1.0
**Last Updated:** December 28, 2025
**Quiz Version:** 2.0 (Multi-Scheme)
**Total Time:** ~3 minutes
**Schemes Covered:** EPR, PPT, PRN/PERN



