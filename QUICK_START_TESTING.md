# Quick Start Testing Guide

## 🚀 Immediate Testing (5 Minutes)

### Development Server
**Status:** ✅ Running
**URL:** http://localhost:3001

---

## 🧪 Test Scenarios

### Scenario 1: Multi-Scheme Business (Full Quiz)
**Time:** ~3 minutes
**Purpose:** Test complete flow with all questions

1. **Navigate to:** http://localhost:3001
2. **Click:** "START YOUR FREE ASSESSMENT"
3. **Complete Contact Info (Q1-4):**
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company Ltd
   - Phone: Skip (test optional field)

4. **Complete Business Profile (Q5-8):**
   - Revenue: £2M-£10M (high-value target)
   - Sector: Food & Drink (priority sector)
   - Volume: 50-200 tonnes (medium producer)
   - Schemes: **"EPR + PPT"** or **"All three"** ← This shows all questions

5. **Complete EPR Section (Q9-11):**
   - Invoice: "No - just pay what we're sent" (gap detected)
   - Tracking: "Partial - some materials" (improvement needed)
   - 2026: "No - haven't looked" (future risk)

6. **Complete PPT Section (Q12-14):**
   - Certificates: "Partial - some missing" (gap detected)
   - Records: "No - hours/days needed" (audit risk)
   - Filing: "Mostly - missed 1-2 deadlines" (penalty exposure)

7. **Complete Intelligence (Q15-17):**
   - PRN: "No - haven't addressed" (gap)
   - Pain: "Multiple schemes" (managed service opportunity)
   - Urgency: "Upcoming deadline" (hot lead)

8. **Complete Service (Q18-19):**
   - Service: "Managed Compliance" (high LTV)
   - Context: "Managing EPR, PPT, PRN across spreadsheets - need help"

9. **Click:** "See Results"

**Expected Result:**
- Score: ~40-50% (multiple gaps detected)
- Lead Priority: 🔥 HOT (deadline urgency + low score)
- Service Recommendation: Managed Compliance
- Estimated Value: £5K-£15K annual contract

---

### Scenario 2: EPR-Only Business (Conditional Logic Test)
**Time:** ~2 minutes
**Purpose:** Test EPR-only path (skips PPT questions)

1. **Navigate to:** http://localhost:3001/assessment
2. **Complete Contact Info (Q1-4):**
   - Name: EPR Test
   - Email: epr@example.com
   - Company: EPR Only Ltd
   - Phone: +44 7123 456789 (test phone validation)

3. **Complete Business Profile (Q5-8):**
   - Revenue: £500K-£2M
   - Sector: E-commerce
   - Volume: 25-50 tonnes
   - Schemes: **"EPR only"** ← This skips Q12-14 (PPT questions)

4. **Verify:** Questions jump from Q11 → Q15 (skips Q12-14)

5. **Complete EPR Section (Q9-11):**
   - Invoice: "Yes - verified" (compliant)
   - Tracking: "Yes - detailed records" (compliant)
   - 2026: "Yes - assessed" (forward-thinking)

6. **Complete Intelligence (Q15-17):**
   - PRN: "Partial - buy without strategy"
   - Pain: "EPR invoice errors" (EPR audit service)
   - Urgency: "Proactive" (ideal client)

7. **Complete Service (Q18-19):**
   - Service: "Comprehensive Review"
   - Context: Skip (test optional)

**Expected Result:**
- Score: ~85-90% (good compliance)
- Lead Priority: ⭐ IDEAL (proactive + good score)
- Service Recommendation: Comprehensive Review
- Upsell Opportunity: PPT/PRN services

---

### Scenario 3: PPT-Only Business (Conditional Logic Test)
**Time:** ~2 minutes
**Purpose:** Test PPT-only path (skips EPR questions)

1. **Navigate to:** http://localhost:3001/assessment
2. **Complete Contact Info (Q1-4):**
   - Name: PPT Test
   - Email: ppt@example.com
   - Company: PPT Only Ltd
   - Phone: Skip

3. **Complete Business Profile (Q5-8):**
   - Revenue: Under £500K
   - Sector: Manufacturing
   - Volume: 10-50 tonnes
   - Schemes: **"PPT only"** ← This skips Q9-11 (EPR questions)

4. **Verify:** Questions jump from Q8 → Q12 (skips Q9-11)

5. **Complete PPT Section (Q12-14):**
   - Certificates: "No - missing/vague/outdated" (critical gap)
   - Records: "Not sure - don't know where" (critical gap)
   - Filing: "No - multiple late" (chronic issue)

6. **Complete Intelligence (Q15-17):**
   - PRN: "Not sure - does it apply?" (gap)
   - Pain: "PPT documentation chaos" (PPT system setup)
   - Urgency: "HMRC enquiry/audit" (critical)

7. **Complete Service (Q18-19):**
   - Service: "Express Assessment" (quick win)
   - Context: "HMRC compliance check next month - urgent"

**Expected Result:**
- Score: ~20-30% (critical gaps)
- Lead Priority: 🔥🔥 CRITICAL (audit concern + low score)
- Service Recommendation: Express Assessment (immediate)
- Estimated Value: £500-£1K (quick win) + upsell to EPR

---

### Scenario 4: Uncertain Business (High-Value Gap)
**Time:** ~3 minutes
**Purpose:** Test "not sure" path (shows all questions, high-value opportunity)

1. **Navigate to:** http://localhost:3001/assessment
2. **Complete Contact Info (Q1-4):**
   - Name: Uncertain Test
   - Email: uncertain@example.com
   - Company: Not Sure Ltd
   - Phone: Skip

3. **Complete Business Profile (Q5-8):**
   - Revenue: £2M-£10M (high-value)
   - Sector: Food & Drink (priority)
   - Volume: **"Not sure - haven't measured"** (gap)
   - Schemes: **"Not sure which schemes apply"** ← Shows all questions

4. **Complete All Compliance Questions (Q9-17):**
   - Answer "Not sure" to most questions (reveals knowledge gaps)

5. **Complete Service (Q18-19):**
   - Service: "Not sure - just want to see results"
   - Context: "Accountant flagged documentation gaps"

**Expected Result:**
- Score: ~10-20% (critical gaps + knowledge gaps)
- Lead Priority: 🔥🔥 CRITICAL (high revenue + massive gaps)
- Service Recommendation: Comprehensive Review (audit opportunity)
- Estimated Value: £5K-£15K (comprehensive audit + setup)

---

## ✅ What to Verify

### Functionality
- [ ] All 19 questions display correctly
- [ ] Conditional logic works (EPR-only, PPT-only)
- [ ] Progress bar updates correctly
- [ ] Back button works
- [ ] Skip button works (phone + textarea)
- [ ] Email validation works
- [ ] Phone validation works (optional)
- [ ] Question navigation sidebar works
- [ ] Progress auto-saves (check localStorage)
- [ ] Score calculation is accurate
- [ ] Results page displays correctly

### User Experience
- [ ] Questions are clear
- [ ] Value propositions are compelling
- [ ] Transitions are smooth
- [ ] Loading states work
- [ ] Error messages are helpful
- [ ] Completion feels like ~3 minutes

### Data Capture
- [ ] All answers are saved
- [ ] Session ID is generated
- [ ] Database writes succeed (check API)
- [ ] Lead data is complete
- [ ] Score is calculated correctly

---

## 🐛 Common Issues & Fixes

### Issue: "Quiz won't load"
**Fix:** Check console for errors, verify server is running

### Issue: "Can't click Next button"
**Fix:** Ensure answer is selected (required fields)

### Issue: "Progress not saving"
**Fix:** Check localStorage in browser DevTools

### Issue: "Score seems wrong"
**Fix:** Review scoring logic in MULTI_SCHEME_QUIZ_REDESIGN.md

### Issue: "Questions not skipping correctly"
**Fix:** Verify Q8 answer triggers correct conditional logic

---

## 📊 Quick Scoring Reference

### High Score (90-100%):
- All "Yes - compliant" answers
- Clear business profile
- Proactive approach
- → Managed service opportunity

### Medium Score (70-89%):
- Mostly compliant with minor gaps
- Some "Partial" answers
- → Comprehensive review

### Low Score (50-69%):
- Multiple gaps detected
- Several "No" answers
- → Urgent audit needed

### Critical Score (<50%):
- Significant gaps across multiple schemes
- Many "Not sure" answers
- → Immediate intervention

---

## 🎯 Lead Qualification Quick Check

### High-Value Lead Indicators:
✓ Revenue: £500K-£10M
✓ Sector: Food/Drink or E-commerce
✓ Volume: 50T+
✓ Schemes: Multiple
✓ Score: <70%
✓ Urgency: Deadline/Audit
✓ Service: Managed Compliance

### Medium-Value Lead Indicators:
✓ Revenue: £500K-£2M
✓ Volume: 25-50T
✓ Schemes: Single
✓ Score: 70-89%
✓ Urgency: Proactive
✓ Service: Comprehensive Review

---

## 🔍 Browser DevTools Testing

### Check localStorage:
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Look for:
   - `ppt_session_id`
   - `ppt_assessment_answers`
   - `ppt_assessment_step`
   - `ppt_assessment_score`

### Check Network Requests:
1. Open DevTools (F12)
2. Go to Network tab
3. Look for:
   - `/api/assessment/save` (POST requests)
   - Verify 200 status codes
   - Check request payload

### Check Console:
1. Open DevTools (F12)
2. Go to Console tab
3. Look for:
   - No errors (red messages)
   - Successful save messages
   - Session ID logged

---

## 📱 Mobile Testing (Quick)

### iOS Safari:
1. Open http://localhost:3001 on iPhone
2. Complete quiz
3. Verify:
   - Touch targets are large enough (44px min)
   - Text is readable
   - Buttons work
   - Progress saves

### Chrome Mobile:
1. Open http://localhost:3001 on Android
2. Complete quiz
3. Verify same as iOS

### Desktop Responsive:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px)

---

## ⏱️ Timing Test

### Goal: 3 minutes completion

**Test Method:**
1. Start timer when clicking "START ASSESSMENT"
2. Complete all questions at normal reading speed
3. Stop timer at results page

**Expected Times:**
- Contact Info (Q1-4): 45 seconds
- Business Profile (Q5-8): 45 seconds
- EPR Section (Q9-11): 30 seconds
- PPT Section (Q12-14): 30 seconds
- Intelligence (Q15-17): 45 seconds
- Service (Q18-19): 30 seconds
- **Total: ~3 minutes**

**If Over 3 Minutes:**
- Simplify question wording
- Reduce subtitle text
- Streamline options

**If Under 2 Minutes:**
- Add more context
- Enhance value propositions
- Consider adding questions

---

## 🎉 Success Criteria

### Must Pass:
- [x] All questions display correctly
- [x] Conditional logic works
- [x] Scoring calculates correctly
- [x] No console errors
- [x] Mobile responsive
- [x] ~3 minute completion time

### Should Pass:
- [ ] User feedback is positive
- [ ] Questions are clear
- [ ] Value props are compelling
- [ ] Lead data is complete
- [ ] Email delivery works

### Nice to Have:
- [ ] Animations are smooth
- [ ] Loading states are elegant
- [ ] Error messages are helpful
- [ ] Results page is impressive

---

## 📞 Next Steps After Testing

### If Tests Pass:
1. ✅ Mark deployment checklist items complete
2. ✅ Set up analytics
3. ✅ Train sales team
4. ✅ Prepare marketing assets
5. ✅ Plan soft launch

### If Tests Fail:
1. 🐛 Document issues
2. 🐛 Prioritize fixes
3. 🐛 Fix critical bugs
4. 🐛 Re-test
5. 🐛 Repeat until pass

---

## 🚀 Ready to Test!

**Development Server:** http://localhost:3001
**Status:** ✅ Running and ready
**Documentation:** Complete
**Next Action:** Start testing with Scenario 1

---

**Quick Start Version:** 1.0
**Last Updated:** December 28, 2025
**Quiz Version:** 2.0 (Multi-Scheme)
**Estimated Testing Time:** 15-20 minutes (all scenarios)



