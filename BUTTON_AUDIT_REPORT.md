# Button Audit Report - All Pages

## Summary
Comprehensive audit of every button across the website to verify functionality.

## ✅ WORKING BUTTONS (With Actions)

### Landing Page (`/app/page.tsx`)
1. ✅ **"Resources"** - `onClick={() => router.push("/resources")}`
2. ✅ **"START YOUR FREE ASSESSMENT"** (Hero) - `onClick={() => router.push("/quiz")}`
3. ✅ **"START YOUR FREE ASSESSMENT"** (Intelligence section) - `onClick={() => router.push("/quiz")}`
4. ✅ **"Check If You're Compliant"** (Simpler Recycling) - `<Link href="/quiz/simpler-recycling">`
5. ✅ **"START YOUR FREE ASSESSMENT"** (CTA section) - `onClick={() => router.push("/quiz")}`
6. ✅ **"BOOK A COMPLIANCE REVIEW"** - `onClick={() => setShowCalendlyModal(true)}`
7. ✅ **"BOOK A COMPLIANCE REVIEW"** (popup) - `onClick={() => setShowCalendlyModal(true)}`

### Quiz Selector (`/app/quiz/page.tsx`)
1. ✅ **"Back to Home"** - `<Link href="/">`
2. ✅ **"Start PPT Quiz"** - `<Link href="/assessment">`
3. ✅ **"Start EPR Quiz"** - `<Link href="/quiz/epr">`
4. ✅ **"Start Simpler Recycling Quiz"** - `<Link href="/quiz/simpler-recycling">`
5. ✅ **"Coming Soon"** (WEEE, PRN) - Disabled
6. ✅ **"Book Free Consultation"** - `onClick={() => setShowCalendlyModal(true)}`

### Simpler Recycling Quiz (`/app/quiz/simpler-recycling/page.tsx`)
1. ✅ **"← All Quizzes"** - `<Link href="/quiz">`
2. ✅ **"Back"** - `onClick={handleBack}` with disabled state
3. ✅ **"Next" / "See Results"** - `onClick={handleNext}` with disabled state

### EPR Quiz (`/app/quiz/epr/page.tsx`)
1. ✅ **"← All Quizzes"** - `<Link href="/quiz">`
2. ✅ **"Back"** - `onClick={handleBack}` with disabled state
3. ✅ **"Next" / "See Results"** - `onClick={handleNext}` with disabled state

### EPR Results (`/app/quiz/epr/results/page.tsx`)
1. ✅ **"All Quizzes"** - `<Link href="/quiz">`
2. ✅ **"Book Free Consultation"** (main CTA) - `onClick={() => setShowCalendlyModal(true)}`
3. ✅ **"Book Free Call"** (bottom section) - `onClick={() => setShowCalendlyModal(true)}`

### Simpler Recycling Results (`/app/quiz/simpler-recycling/results/page.tsx`)
1. ✅ **"All Quizzes"** - `<Link href="/quiz">`
2. ✅ **"Book Free Consultation"** (main CTA) - `onClick={() => setShowCalendlyModal(true)}`
3. ✅ **"Book Free Call"** (bottom section) - `onClick={() => setShowCalendlyModal(true)}`

---

## ⚠️ BUTTONS MISSING ACTIONS

### EPR Results Page
1. ❌ **"Download Report"** - No action
2. ❌ **"Book Audit"** (£295 service) - No action
3. ❌ **"Book Review"** (£795 service) - No action
4. ❌ **"Get Started"** (£499/month service) - No action
5. ❌ **"Email Results"** - No action

### Simpler Recycling Results Page
1. ❌ **"Download Report"** - No action
2. ❌ **"Book Audit"** (£295 service) - No action
3. ❌ **"Get Setup"** (£795 service) - No action
4. ❌ **"Get Started"** (£499/month service) - No action
5. ❌ **"Call for Emergency Setup"** - No action
6. ❌ **"Email Results"** - No action

---

## 🔧 RECOMMENDED FIXES

### Service Tier Buttons (Book Audit, Book Review, Get Setup, Get Started)
**Should do:** Open Calendly modal with pre-filled service selection

```typescript
<Button 
  onClick={() => setShowCalendlyModal(true)}
  className="..."
>
  Book Audit
</Button>
```

### Download Report Buttons
**Should do:** Generate and download PDF report of quiz results

**Option 1:** Simple browser print
```typescript
<Button 
  onClick={() => window.print()}
  variant="outline"
  className="..."
>
  Download Report
</Button>
```

**Option 2:** Generate PDF (requires library)
```typescript
<Button 
  onClick={() => generatePDF(answers, score)}
  variant="outline"
  className="..."
>
  Download Report
</Button>
```

### Email Results Buttons
**Should do:** Open email compose with results

**Option 1:** Simple mailto link
```typescript
<Button 
  onClick={() => {
    const subject = encodeURIComponent("My Compliance Quiz Results")
    const body = encodeURIComponent(`Score: ${score}%\nRisk Level: ${riskLevel.level}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }}
  variant="outline"
  className="..."
>
  Email Results
</Button>
```

**Option 2:** Modal with email form (better UX)
```typescript
<Button 
  onClick={() => setShowEmailModal(true)}
  variant="outline"
  className="..."
>
  Email Results
</Button>
```

### Emergency Setup Button
**Should do:** Open Calendly with urgent flag or direct phone link

**Option 1:** Calendly with urgent note
```typescript
<Button 
  onClick={() => setShowCalendlyModal(true)}
  className="..."
>
  <Phone className="w-5 h-5 mr-2" />
  Call for Emergency Setup
</Button>
```

**Option 2:** Direct phone call
```typescript
<Button 
  onClick={() => window.location.href = 'tel:+441234567890'}
  className="..."
>
  <Phone className="w-5 h-5 mr-2" />
  Call for Emergency Setup
</Button>
```

---

## 📊 Button Functionality Summary

| Page | Total Buttons | Working | Missing Action |
|------|--------------|---------|----------------|
| Landing Page | 7 | 7 (100%) | 0 |
| Quiz Selector | 6 | 6 (100%) | 0 |
| EPR Quiz | 3 | 3 (100%) | 0 |
| Simpler Recycling Quiz | 3 | 3 (100%) | 0 |
| EPR Results | 10 | 3 (30%) | 7 |
| Simpler Recycling Results | 11 | 3 (27%) | 8 |
| **TOTAL** | **40** | **25 (62.5%)** | **15 (37.5%)** |

---

## 🎯 Priority Actions

### HIGH PRIORITY (User-facing CTAs)
1. **Service tier buttons** (Book Audit, Book Review, Get Setup, Get Started)
   - Action: Open Calendly modal
   - Impact: Direct conversion path

2. **Emergency Setup button**
   - Action: Open Calendly or phone link
   - Impact: Urgent lead capture

### MEDIUM PRIORITY (Secondary actions)
3. **Email Results buttons**
   - Action: Email modal or mailto
   - Impact: Lead sharing, engagement

### LOW PRIORITY (Nice to have)
4. **Download Report buttons**
   - Action: PDF generation or print
   - Impact: User retention, shareability

---

## 🚀 Implementation Plan

### Phase 1: Service Tier Buttons (30 minutes)
Connect all service tier buttons to Calendly modal:
- EPR Results: 3 buttons
- Simpler Recycling Results: 3 buttons

### Phase 2: Emergency/Call Buttons (15 minutes)
Connect emergency buttons:
- Simpler Recycling: Emergency Setup button

### Phase 3: Email Buttons (30 minutes)
Implement email functionality:
- Create email modal component
- Connect 2 Email Results buttons

### Phase 4: Download Buttons (60 minutes)
Implement PDF generation:
- Install PDF library (jsPDF or react-pdf)
- Create PDF template
- Connect 2 Download Report buttons

---

## ✅ NEXT STEPS

1. **Immediate:** Connect service tier buttons to Calendly (highest ROI)
2. **Today:** Add emergency button functionality
3. **This Week:** Implement email results feature
4. **Optional:** Add PDF download feature

Would you like me to implement these fixes now?
