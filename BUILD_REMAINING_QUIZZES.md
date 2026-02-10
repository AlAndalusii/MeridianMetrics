# HOW TO BUILD REMAINING QUIZZES
**Quick Guide for WEEE, PRN, and Simpler Recycling**

---

## Copy the EPR Quiz Structure

Each new quiz should follow the same structure as the EPR quiz. Here's the step-by-step process:

---

## 1. WEEE Quiz (Electrical Products)

### Create Files:
```
/app/quiz/weee/page.tsx
/app/quiz/weee/results/page.tsx
```

### Steps:
1. **Copy EPR quiz file** (`/app/quiz/epr/page.tsx`)
2. **Global find & replace:**
   - `epr` → `weee`
   - `EPR` → `WEEE`
   - `blue` → `purple`
   - `Extended Producer Responsibility` → `Waste Electronics Compliance`

3. **Update Questions** (10 total: 4 contact + 6 WEEE):
   - Q5: Product type (electrical/electronic products)
   - Q6: Business activity (manufacturer/importer/brand owner)
   - Q7: Volume threshold (5+ tonnes per year)
   - Q8: Online selling (distance seller from outside UK)
   - Q9: Product marking (crossed-out bin symbol)
   - Q10: Registration status

4. **Update Results Page:**
   - Copy `/app/quiz/epr/results/page.tsx`
   - Find & replace: `epr` → `weee`, `EPR` → `WEEE`, `blue` → `purple`
   - Update service tiers:
     - £395 - WEEE Assessment
     - £695 - Full WEEE Registration
     - £599/month - Managed WEEE Compliance

5. **Update Landing Page:**
   - In `/app/quiz/page.tsx`, change WEEE `isActive: false` → `isActive: true`

---

## 2. PRN Quiz (Packaging Recovery Notes)

### Create Files:
```
/app/quiz/prn/page.tsx
/app/quiz/prn/results/page.tsx
```

### Steps:
1. **Copy EPR quiz file**
2. **Global find & replace:**
   - `epr` → `prn`
   - `EPR` → `PRN`
   - `blue` → `amber`
   - `Extended Producer Responsibility` → `Packaging Recovery Notes`

3. **Update Questions** (10 total: 4 contact + 6 PRN):
   - Q5: Business turnover (£1M, £2M thresholds)
   - Q6: Packaging volume (25t, 50t thresholds)
   - Q7: Combined threshold test (£2M + 50t = PRN obligation)
   - Q8: Packaging activity type (manufacturer/packer/importer/seller)
   - Q9: Material types handled
   - Q10: PRN deadline awareness (January 31)

4. **Update Results Page:**
   - Copy EPR results, find & replace colors
   - Service tiers:
     - £395 - PRN Obligation Assessment
     - £995 - Full PRN Compliance (+ PRN costs)
     - £499/month - Managed Compliance

5. **Update Landing Page:**
   - Change PRN `isActive: false` → `isActive: true`

---

## 3. Simpler Recycling Quiz (Workplace Waste)

### Create Files:
```
/app/quiz/simpler-recycling/page.tsx
/app/quiz/simpler-recycling/results/page.tsx
```

### Steps:
1. **Copy EPR quiz file**
2. **Global find & replace:**
   - `epr` → `simpler-recycling`
   - `EPR` → `Simpler Recycling`
   - `blue` → `green`
   - `Extended Producer Responsibility` → `Workplace Waste Separation`

3. **Update Questions** (10 total: 4 contact + 6 Simpler Recycling):
   - Q5: Employee count (10+ employees threshold)
   - Q6: Business type (office/retail/industrial/healthcare)
   - Q7: Current waste setup (how many bins)
   - Q8: Food waste separation (yes/no)
   - Q9: Waste contractor arrangement
   - Q10: Deadline awareness (31 March 2025)

4. **Update Results Page:**
   - Service tiers:
     - £295 - Site Compliance Audit
     - £795 - Full Compliance Setup
     - £499/month - Managed Compliance

5. **Update Landing Page:**
   - Change Simpler Recycling `isActive: false` → `isActive: true`

---

## Quick Reference: Color Schemes

```typescript
// Blue (EPR)
bg: "from-blue-50 to-blue-100"
border: "border-blue-200"
text: "text-blue-700"
button: "bg-blue-600 hover:bg-blue-700"

// Purple (WEEE)
bg: "from-purple-50 to-purple-100"
border: "border-purple-200"
text: "text-purple-700"
button: "bg-purple-600 hover:bg-purple-700"

// Amber (PRN)
bg: "from-amber-50 to-amber-100"
border: "border-amber-200"
text: "text-amber-700"
button: "bg-amber-600 hover:bg-amber-700"

// Green (Simpler Recycling)
bg: "from-green-50 to-green-100"
border: "border-green-200"
text: "text-green-700"
button: "bg-green-600 hover:bg-green-700"
```

---

## LocalStorage Key Pattern

```typescript
// WEEE
`weee_session_id`
`weee_assessment_answers`
`weee_assessment_step`
`weee_assessment_score`
`weee_assessment_complete`

// PRN
`prn_session_id`
`prn_assessment_answers`
`prn_assessment_step`
`prn_assessment_score`
`prn_assessment_complete`

// Simpler Recycling
`simpler_recycling_session_id`
`simpler_recycling_assessment_answers`
`simpler_recycling_assessment_step`
`simpler_recycling_assessment_score`
`simpler_recycling_assessment_complete`
```

---

## Question Template

Use this template for each new quiz:

```typescript
const questions: Question[] = [
  // Contact Info (Same for all quizzes)
  { id: 1, section: "Contact Information", icon: Shield, question: "What's your name?", ... },
  { id: 2, section: "Contact Information", icon: Shield, question: "What's your work email?", ... },
  { id: 3, section: "Contact Information", icon: Shield, question: "What's your company name?", ... },
  { id: 4, section: "Contact Information", icon: Shield, question: "Phone number (optional)", ... },
  
  // Quiz-specific questions (6 questions)
  { id: 5, section: "Liability Check", ... },
  { id: 6, section: "Liability Check", ... },
  { id: 7, section: "Liability Check", ... },
  { id: 8, section: "Knowledge Assessment", ... },
  { id: 9, section: "Knowledge Assessment", ... },
  { id: 10, section: "Service Need", ... },
]
```

---

## Scoring Template

Same for all quizzes:

```typescript
const calculateAndRedirectToResults = async () => {
  let score = 0
  let maxScore = 0

  for (let i = 5; i <= 10; i++) {
    const answer = answers[i]
    const question = questions.find(q => q.id === i)
    
    if (question && question.options) {
      const selectedOption = question.options.find(opt => opt.value === answer)
      
      maxScore += 10
      
      if (selectedOption?.isCorrect) {
        score += 10
      } else if (selectedOption?.isGap || answer === "not_sure") {
        score += 0
      } else if (answer === "partial") {
        score += 5
      } else {
        score += 3
      }
    }
  }

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
  
  localStorage.setItem("[quiz_name]_assessment_score", percentage.toString())
  router.push("/quiz/[quiz_name]/results")
}
```

---

## Service Tier Recommendations

### By Score:
- **80-100%:** Lower-tier service (audit/health check)
- **50-79%:** Mid-tier service (comprehensive review)
- **0-49%:** Premium service (managed/full-service)

### Pricing Structure:
- Entry audit: £295-£395
- Comprehensive: £695-£995
- Managed: £499-£599/month

---

## Testing Checklist (For Each Quiz)

- [ ] All 10 questions display correctly
- [ ] Email validation works
- [ ] Phone validation works (optional field)
- [ ] Progress bar animates correctly
- [ ] Can navigate back without losing data
- [ ] localStorage saves after each answer
- [ ] Score calculates correctly
- [ ] Results page displays with correct risk level
- [ ] Service recommendations show based on score
- [ ] All CTAs are clickable and styled correctly
- [ ] Mobile responsive on all breakpoints
- [ ] Color scheme consistent throughout
- [ ] Icons display correctly

---

## Build Order Recommendation

1. **WEEE** (Easiest) - Most similar to EPR, clear yes/no obligations
2. **Simpler Recycling** (Medium) - Very practical, clear bins requirement
3. **PRN** (Hardest) - More complex thresholds and calculations

---

## Time Estimate

Per quiz:
- Copy and customize quiz page: **30 minutes**
- Copy and customize results page: **20 minutes**
- Update landing page: **5 minutes**
- Test thoroughly: **15 minutes**

**Total per quiz: ~70 minutes**
**All 3 remaining quizzes: ~3.5 hours**

---

## Common Pitfalls to Avoid

1. **Don't forget to update localStorage keys** - Each quiz needs unique keys
2. **Update BOTH quiz and results files** - Easy to forget the results page colors
3. **Change isActive to true on landing page** - Or the quiz won't be clickable
4. **Update icon imports** - If using different icons for each quiz
5. **Test mobile immediately** - Don't wait until the end
6. **Check all links** - Make sure navigation works between pages

---

## Pro Tips

1. **Use VS Code multi-cursor** for find & replace in multiple places
2. **Test in incognito mode** to avoid localStorage conflicts
3. **Keep a browser tab open to `/quiz`** to quickly test navigation
4. **Use React DevTools** to inspect state if debugging
5. **Clear localStorage between test runs** to simulate fresh user
6. **Take screenshots** of each quiz for documentation

---

## Final Pre-Launch Checklist

- [ ] All 5 quizzes appear on `/quiz` landing page
- [ ] All active quizzes link correctly
- [ ] All quizzes save to localStorage
- [ ] All quizzes calculate scores
- [ ] All results pages display correctly
- [ ] All color schemes correct
- [ ] All CTAs functional
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Analytics tracking added (if needed)

---

**Ready to build! Each quiz takes ~1 hour. You can build all 3 in one afternoon.** 🚀

---

## Need Help?

Refer back to:
- `QUIZ_SYSTEM_COMPLETE.md` - Full documentation
- `SIMPLER_RECYCLING_WEEE_PRN_QUIZZES.md` - Content for each quiz
- `/app/quiz/epr/page.tsx` - Working example to copy from
- `/app/quiz/epr/results/page.tsx` - Working results page to copy from
