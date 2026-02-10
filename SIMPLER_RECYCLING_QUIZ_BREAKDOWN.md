# Simpler Recycling Quiz - Question Breakdown

## Overview
Based on the comprehensive Simpler Recycling workplace compliance report, I created a 10-question quiz (4 contact + 6 assessment) that follows the same structure as the EPR quiz.

## How Questions Map to Report Content

### Q5: Employee Count
**Report Section:** "Who Must Comply?" (Section 2)
- **Key Point:** Micro-firms (under 10 FTE) have until 31 March 2027
- **Key Point:** Businesses with 10+ employees deadline was 31 March 2025
- **Quiz Logic:** Identifies if user gets extra time or if they're already past deadline

**Direct Quote from Report:**
> "A micro‑firm is a business with fewer than 10 full‑time equivalent employees. Micro‑firms have until 31 March 2027 to meet the new recycling rules."

### Q6: Current Bin Setup
**Report Section:** "What Must Businesses Do?" (Section 3.1 & 3.2)
- **Key Point:** Must separate 3 waste streams: dry recyclables, food waste, non-recyclable
- **Quiz Logic:** Checks if business has the minimum required bins

**Direct Quote from Report:**
> "Workplaces must keep three main waste streams apart before they are collected: Dry recyclable materials, Food waste, Non‑recyclable (residual) waste."

### Q7: Food Waste Separation
**Report Section:** "What Must Businesses Do?" (Section 3.1 & 3.2)
- **Key Point:** Food waste must be collected even if no canteen
- **Key Point:** Includes coffee grounds, fruit peels, tea bags
- **Quiz Logic:** Most commonly missed requirement - critical for compliance

**Direct Quote from Report:**
> "Food scraps must be collected even if there is no canteen. Food waste includes leftovers, fruit peels, coffee grounds, tea bags and preparation waste like onion skins."

### Q8: Waste Contractor Compliance
**Report Section:** "Use Registered Waste Collectors" (Section 3.5)
- **Key Point:** Must arrange separate collections for each stream
- **Key Point:** Waste collectors must be registered
- **Quiz Logic:** "My contractor doesn't offer it" is not a valid excuse

**Direct Quote from Report:**
> "Businesses must arrange separate collections for dry recycling, food waste and non‑recyclable waste. Always check that a collector is registered on the Public Register of Waste Carriers, Brokers and Dealers."

### Q9: Deadline Awareness
**Report Section:** "What Is Simpler Recycling?" (Section 1)
- **Key Point:** 31 March 2025 for businesses with 10+ employees
- **Key Point:** 31 March 2027 for micro-firms
- **Quiz Logic:** Tests knowledge of key compliance date

**Direct Quote from Report:**
> "The government said that by 31 March 2025 all businesses and other non‑domestic workplaces in England must arrange separate collections for the main recycling materials. Very small businesses (micro‑firms) get more time: they have until 31 March 2027 to meet the rules."

### Q10: Inspection Readiness
**Report Section:** "Penalties & Enforcement" (Section 4)
- **Key Point:** Environment Agency can inspect and issue compliance notices
- **Key Point:** Need labeled bins, collection records, staff awareness
- **Quiz Logic:** Assesses if business is prepared for unannounced inspection

**Direct Quote from Report:**
> "If a business does not separate waste as required by 31 March 2025, the Environment Agency can issue a compliance notice. Not obeying a compliance notice is an offence."

## Key Findings Logic (Results Page)

### Finding 1: Micro-Firm Status
- **Triggers on:** Q5 answer "under_10"
- **Report Reference:** Section 2 - Micro-firm exemption
- **Message:** "You have until 31 March 2027 to comply (2 extra years)"

### Finding 2: Insufficient Bins
- **Triggers on:** Q6 answers "one" or "two"
- **Report Reference:** Section 3.1 - Three waste streams required
- **Message:** "You need at least 3 separate bins: dry recyclables, food waste, and general waste"

### Finding 3: Missing Food Waste
- **Triggers on:** Q7 answer "no"
- **Report Reference:** Section 3.1 - Food waste mandatory
- **Message:** "This is the #1 thing Environment Agency inspectors look for - critical violation"

### Finding 4: Contractor Issues
- **Triggers on:** Q8 answers "no" or "not_sure"
- **Report Reference:** Section 3.5 - Registered carriers required
- **Message:** Explains need for compliant contractor

### Finding 5: Deadline Misunderstood
- **Triggers on:** Q9 any answer except "march_2025" AND Q5 not "under_10"
- **Report Reference:** Section 1 - When rules started
- **Message:** "The deadline was 31 March 2025 - you should be compliant already"

### Finding 6: Not Inspection-Ready
- **Triggers on:** Q10 any answer except "yes"
- **Report Reference:** Section 4 - Enforcement
- **Message:** "You need labeled bins, collection records, and staff training for Environment Agency visits"

## Service Recommendations Logic

### Score 80-100: Workplace Compliance Check - £295
**Recommendation Rationale:** Business is mostly compliant, needs annual verification
- Site visit and bin inspection
- Waste contractor verification
- Staff awareness check
- Compliance documentation review

### Score 50-79: Simpler Recycling Audit - £295
**Recommendation Rationale:** Business has gaps but not major violations
- Site assessment (on-site visit)
- Waste stream analysis
- Contractor compliance check
- Staff training materials
- Compliance implementation plan

### Score 0-49: Full Compliance Setup - £795
**Recommendation Rationale:** Business is non-compliant, needs complete overhaul
- Full site audit
- New waste contract (if needed)
- Bin procurement and installation
- Staff training session delivered
- Signage and labeling
- Compliance documentation

## Urgency Messaging

### For Scores < 50 with 10+ Employees:
Red alert banner with:
- "Urgent: You're Breaking the Law"
- Explanation: Deadline passed 31 March 2025
- Environment Agency enforcement powers
- £118/hour charge for regulatory work
- CTA: Emergency setup required

**Report Reference:** Section 4 - Penalties & Enforcement
> "If the Environment Agency needs to carry out regulatory work because a business is non‑compliant, it will charge £118 per hour to recover its costs."

## Questions Made Easy to Understand

### Simplifications Made:
1. **Employee count** - Instead of "full-time equivalent across all locations", simplified to "How many employees?" with clear threshold options
2. **Waste streams** - Instead of technical waste categories, used plain language "bins" that people understand
3. **Food waste** - Gave concrete examples (coffee grounds, fruit peels) instead of abstract categories
4. **Contractor setup** - Focused on practical outcome (separate collections) not legal jargon
5. **Deadline** - Multiple choice with the correct date, testing awareness
6. **Inspection readiness** - Focused on practical proof (labeled bins, records) not legal compliance language

### Made Complex Topics Accessible:
- **Co-collection assessments** → Simplified to "contractor offers separate collections"
- **Waste transfer notes** → Simplified to "collection records"
- **Aerobic composting regulations** → Omitted (too technical for 10 questions)
- **Season tickets** → Omitted (covered under "collection records")
- **Waste duty of care** → Simplified to "registered contractors"

## Business Value

This quiz:
1. **Identifies non-compliance** - Most businesses don't know deadline has passed
2. **Creates urgency** - Shows risk of fines and inspections
3. **Qualifies leads** - Collects contact info and assesses service need
4. **Educates** - "Why this matters" explains each requirement
5. **Converts** - Recommends appropriate service tier based on score

## User Journey

```
User visits /quiz
  ↓
Clicks "Start Simpler Recycling Quiz"
  ↓
Answers 4 contact questions (name, email, company, optional phone)
  ↓
Answers 6 assessment questions with immediate feedback
  ↓
Sees animated score reveal (0-100)
  ↓
Reviews personalized findings based on their answers
  ↓
Sees recommended service tier
  ↓
CTAs: Book consultation / Download report / View all services
```

## Technical Implementation

### Data Flow:
1. **Quiz page** → Collects answers → Saves to localStorage (auto-save)
2. **Next button** → Validates answer → Animates to next question
3. **Final question** → Calculates score → Saves to localStorage
4. **Results page** → Reads localStorage → Displays personalized results

### Validation:
- Email: Must be valid format (user@domain.com)
- Phone: Optional, but if provided must be UK format
- All questions: Required except Q4 (phone is optional)

### Feedback System:
- ✓ Green checkmark: Correct answer (compliant)
- ⚠️ Amber warning: Gap answer (non-compliant)
- Neutral: Other answers

This matches the same UX pattern as the EPR quiz for consistency.
