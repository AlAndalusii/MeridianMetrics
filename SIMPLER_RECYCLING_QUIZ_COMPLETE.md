# Simpler Recycling Quiz - Complete

## Summary
Created a comprehensive 10-question compliance quiz for Simpler Recycling workplace regulations, following the same structure as the EPR quiz. The quiz assesses whether businesses are compliant with the new waste separation rules that came into effect on 31 March 2025.

## Quiz Structure

### Part 1: Contact Information (Questions 1-4)
1. **Name** - Text input
2. **Work Email** - Text input with email validation
3. **Company Name** - Text input
4. **Phone Number** - Optional text input with UK phone validation

### Part 2: Compliance Assessment (Questions 5-10)

#### Q5: Employee Count
- Under 10 employees (micro-firm - exempt until March 2027) ✓
- 10-50 employees (must comply NOW)
- 50+ employees (must comply NOW)
- Not sure / need to count properly ⚠️

**Why this matters:** Determines which deadline applies (micro-firms get 2 extra years)

#### Q6: Current Bin Setup
- One bin - everything mixed ⚠️
- Two bins - general waste and recycling ⚠️
- Three or more - separated by material type ✓
- Not sure / varies by location ⚠️

**Why this matters:** You MUST have at least 3 separate bins (dry recyclables, food waste, general waste)

#### Q7: Food Waste Separation
- Yes - dedicated food waste bins ✓
- No - food goes in general waste ⚠️
- We don't produce food waste at all ✓
- Only in some locations ⚠️

**Why this matters:** Food waste separation is the #1 thing Environment Agency inspectors look for

#### Q8: Waste Contractor Setup
- Yes - each stream collected separately ✓
- No - everything collected mixed ⚠️
- Recyclables collected but not food waste ⚠️
- Don't know what contractor does ⚠️

**Why this matters:** "My contractor doesn't offer it" is NOT a legal defence

#### Q9: Deadline Awareness
- 31 March 2025 (correct) ✓
- 1 January 2025
- 31 March 2026
- I didn't know there was a deadline ⚠️

**Why this matters:** Deadline was 31 March 2025 - if you have 10+ employees, you should already be compliant

#### Q10: Inspection Readiness
- Yes - have labeled bins and collection records ✓
- Probably - not sure what proof needed
- No - don't have right setup yet ⚠️
- Didn't know we could be inspected ⚠️

**Why this matters:** Environment Agency can inspect ANY workplace unannounced

## Scoring System

### Score Calculation
- Each assessment question (Q5-Q10) worth 10 points
- **Correct answer (✓)**: 10 points
- **Gap answer (⚠️)**: 0 points
- **Partial answer**: 5 points
- **Other answers**: 3 points

### Risk Levels
- **80-100**: Compliant (green) - "You're meeting Simpler Recycling requirements"
- **50-79**: Gaps Identified (amber) - "You have compliance gaps to fix"
- **0-49**: Non-Compliant (red) - "Urgent action needed - you're breaking the law"

## Key Findings Displayed

The results page shows personalized findings based on answers:

1. **Micro-firm status** (if under 10 employees) - You have until 31 March 2027
2. **Deadline passed** (if 10+ employees) - Should already be compliant
3. **Insufficient waste separation** (if 1-2 bins) - Need at least 3 bins
4. **Missing food waste separation** - Critical violation
5. **Waste contractor issues** - Need contractor offering separate collections
6. **Deadline misunderstood** - Deadline was 31 March 2025
7. **Not inspection-ready** - Need labeled bins, records, and training

## Service Recommendations

### Score 80-100: Workplace Compliance Check - £295
- Annual site assessment
- Bin inspection
- Waste contractor verification
- Staff awareness check
- Compliance documentation review

### Score 50-79: Simpler Recycling Audit - £295
- On-site assessment
- Waste stream analysis
- Contractor compliance check
- Staff training materials
- Compliance implementation plan

### Score 0-49: Full Compliance Setup - £795
- Full site audit
- New waste contract (if needed)
- Bin procurement and installation
- Staff training session delivered
- Signage and labeling
- Compliance documentation

## All Service Tiers Shown
1. **£295** - Site Audit (one-time)
2. **£795** - Full Setup (one-time, marked "Most Popular")
3. **£499/month** - Managed Service (ongoing)

## Special Urgency Alert
For scores below 50 with 10+ employees:
- Red alert banner: "Urgent: You're Breaking the Law"
- Explains deadline passed on 31 March 2025
- Environment Agency can issue compliance notices
- £118/hour charge for regulatory work
- CTA: "Call for Emergency Setup"

## Key Compliance Points Covered

From the Simpler Recycling report:
- ✅ Employee count threshold (10 FTE = compliance required)
- ✅ Micro-firm exemption (under 10 = until March 2027)
- ✅ Three mandatory waste streams (dry recyclables, food waste, non-recyclable)
- ✅ Food waste must be collected weekly/fortnightly
- ✅ Registered waste carriers required
- ✅ Waste transfer notes (kept for 2 years)
- ✅ Environment Agency enforcement
- ✅ Compliance notices and penalties
- ✅ £118/hour charge for non-compliance
- ✅ Labeled bins and staff training required

## Files Created

1. `/app/quiz/simpler-recycling/page.tsx` - Main quiz component
2. `/app/quiz/simpler-recycling/results/page.tsx` - Results page
3. `/app/quiz/page.tsx` - Updated to mark Simpler Recycling as active

## Technical Features

### Quiz Page
- Client-side state management
- LocalStorage auto-save (every answer saved immediately)
- Email and phone validation
- Progress bar (separate for contact info and assessment)
- Visual feedback (✓ correct, ⚠️ gap, neutral)
- "Why this matters" explanation for each question
- Smooth animations and transitions
- Mobile responsive

### Results Page
- Animated score circle (0-100 countdown effect)
- Dynamic risk level badge (color-coded)
- Personalized key findings based on specific answers
- Service recommendations tailored to score
- All 3 service tiers displayed
- Urgency alert for non-compliant businesses with 10+ employees
- CTAs: Book consultation, download report, book call, email results

## Business Context

This quiz addresses a common blind spot for UK businesses:
- Many businesses don't know about Simpler Recycling
- The deadline (31 March 2025) has ALREADY PASSED for 10+ employee businesses
- Food waste separation is the most commonly missed requirement
- Environment Agency can inspect unannounced
- Non-compliance = compliance notices, fines, and £118/hour charges
- Most businesses think "my contractor doesn't offer it" is a defence (it's not)

The quiz creates urgency by:
- Making it clear the deadline has passed
- Explaining penalties (compliance notices, hourly charges)
- Showing inspection risk
- Identifying gaps in current setup
- Offering fast setup (14 days to compliant)

## User Experience Flow

1. Click "Start Simpler Recycling Quiz" from `/quiz`
2. Answer 4 contact info questions (email required, phone optional)
3. Answer 6 compliance questions
4. See animated score reveal
5. Review personalized findings
6. See recommended service tier
7. Choose: Book consultation, download report, or view all services

## Next Steps

All 5 regulation quizzes are now built:
- ✅ PPT (19 questions, existing)
- ✅ EPR (10 questions)
- ✅ Simpler Recycling (10 questions)
- ⏳ WEEE (coming soon)
- ⏳ PRN (coming soon)

To build WEEE and PRN quizzes, follow the same pattern as EPR and Simpler Recycling.
