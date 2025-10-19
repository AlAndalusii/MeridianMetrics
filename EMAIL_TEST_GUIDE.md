# Email Testing Guide - Assessment System

## ✅ System Status

### Environment Configuration
- ✅ **Resend API Key**: Configured (re_bAPcUJFd...)
- ✅ **Business Email**: zak@millstonecompliance.com
- ✅ **Verified Domain**: hello@mail.millstonecompliance.com
- ✅ **Development Server**: Running on http://localhost:3000
- ✅ **Email Route**: Updated to use verified subdomain

### Recent Changes
1. **From Address Updated**: Changed from `onboarding@resend.dev` to `hello@mail.millstonecompliance.com`
2. **Recipient Fixed**: User emails now go to the actual user (not business owner)
3. **Warning Removed**: Deleted the yellow domain verification warning from user emails
4. **Both Emails Working**: Admin email + User email sent via batch API

---

## 🧪 Testing the Assessment Flow

### Step 1: Access the Assessment
1. Open your browser and go to: **http://localhost:3000**
2. Click the "Start Assessment" or "Take Assessment" button
3. You should see the first question (What's your name?)

### Step 2: Fill Out the Assessment
Use these **test data** for quick testing:

#### Contact Information (Questions 1-4)
- **Name**: Test User (or your real name)
- **Email**: **YOUR_ACTUAL_EMAIL@domain.com** ← Use your real email to receive the test!
- **Company**: Test Company Ltd
- **Phone**: +44 7123 456789 (optional - can skip)

#### Compliance Questions (Questions 5-14)
For quick testing, answer a mix of yes/no to get a realistic score:
- Q5: "No - we're missing certificates" (creates a gap)
- Q6: "Yes - exact percentages" (strength)
- Q7: "Yes - current certificates" (strength)
- Q8: "Yes - 10 minutes" (strength)
- Q9: "Manufacturing completes" (correct)
- Q10: "Yes - always request new" (strength)
- Q11: "No - estimate weights" (gap)
- Q12: "Yes - submitted on time" (strength)
- Q13: "We don't export" (neutral)
- Q14: "No - don't track" (gap)

#### Strategic Questions (Questions 15-19)
- Q15: "10-50 tonnes"
- Q16: "Fix documentation gaps"
- Q17: "Don't fully understand requirements"
- Q18: "Expert Audit"
- Q19: (Optional - can leave blank or add notes)

### Step 3: Submit & Check Results
1. After the last question, click "See Results"
2. You'll be redirected to `/assessment/results`
3. You should see:
   - ✅ Your compliance score (animated)
   - ✅ List of gaps identified
   - ✅ List of strengths
   - ✅ Recommended service package
   - ✅ Email confirmation section

---

## 📧 Email Verification Checklist

### Check 1: User Email (Sent to Assessment Taker)
**To**: The email address you entered in Q2
**From**: Millstone Compliance <hello@mail.millstonecompliance.com>
**Subject**: [Your Name], Your PPT Compliance Assessment Results - [Score]/100

**Content should include**:
- ✅ Personalized greeting with user's name
- ✅ Company name mentioned
- ✅ Large score display with colored emoji
- ✅ Score level (Audit-Ready, Strong Foundation, Compliance Risk, or Critical Gaps)
- ✅ List of gaps with descriptions and exposure amounts
- ✅ List of strengths
- ✅ Recommended service with pricing
- ✅ "Get Started Now" CTA button
- ✅ Footer with contact email
- ❌ **NO WARNING BANNER** about domain verification

### Check 2: Business/Admin Email (Sent to You)
**To**: zak@millstonecompliance.com
**From**: Millstone Compliance <hello@mail.millstonecompliance.com>
**Subject**: 🆕 New Assessment: [User Name] ([Company]) - Score: [X]/100

**Content should include**:
- ✅ Timestamp of submission
- ✅ Contact information (name, email, company, phone)
- ✅ Assessment score with visual display
- ✅ Summary of gaps and strengths
- ✅ Key business insights (business scale, goals, obstacles)
- ✅ Additional notes if provided
- ✅ Recommended service package
- ✅ Expandable section with ALL answers to all questions

### Check 3: Email Deliverability
- ✅ Check **Inbox** first
- ⚠️ Check **Spam/Junk** folder if not in inbox
- ✅ Verify sender shows as "Millstone Compliance"
- ✅ Verify "from" address is `hello@mail.millstonecompliance.com`
- ✅ Check all HTML formatting displays correctly
- ✅ Check all links work (mailto:zak@millstonecompliance.com)

---

## 🐛 Troubleshooting

### Issue: No Email Received
1. **Check spam folder** - New domains sometimes go to spam initially
2. **Check Resend Dashboard**: https://resend.com/emails
   - Look for your batch send
   - Check delivery status
   - Check for any error messages
3. **Check browser console**: Open DevTools (F12) and look for errors
4. **Check server logs**: Look at your terminal where `npm run dev` is running

### Issue: Emails in Spam
**Normal for new domains** - Takes time to build reputation. Solutions:
1. Ask recipients to mark as "Not Spam"
2. Verify DNS records are set:
   - SPF record for mail.millstonecompliance.com
   - DKIM keys configured
   - DMARC policy set
3. Monitor Resend dashboard for bounce/spam rates

### Issue: Server Error 500
1. Check terminal logs for detailed error message
2. Verify RESEND_API_KEY is set correctly
3. Check `/api/send-result/route.ts` for any console errors

### Issue: Wrong Email Content
1. Check the `generateUserEmail()` function in `/app/api/send-result/route.ts`
2. Verify all dynamic variables are passed correctly
3. Check for console errors in browser and server

---

## ✅ Success Criteria

Your email system is working correctly if:

1. ✅ User receives an email within 1-2 minutes
2. ✅ Business owner (zak@) receives an email with full details
3. ✅ Both emails show sender as "hello@mail.millstonecompliance.com"
4. ✅ No warning banners in user email
5. ✅ All dynamic content displays correctly (name, company, score, gaps)
6. ✅ HTML formatting is intact and responsive
7. ✅ Emails don't go to spam (may take time for new domain)

---

## 📊 Next Steps After Testing

### If Everything Works:
1. ✅ Test with multiple email addresses
2. ✅ Test different score ranges (high/medium/low)
3. ✅ Monitor Resend dashboard for deliverability metrics
4. ✅ Ask a friend/colleague to test the full flow
5. ✅ Check email rendering on mobile devices

### If Issues Found:
1. Document the specific error
2. Check the troubleshooting section above
3. Review server logs and browser console
4. Verify DNS records are correct for `mail.millstonecompliance.com`

---

## 🎯 Quick Test Commands

### Test Assessment Locally
```bash
# Open browser to assessment
open http://localhost:3000/assessment

# OR for specific result testing (if you have saved data)
open http://localhost:3000/assessment/results
```

### Check Server Logs
```bash
# View the terminal where you ran `npm run dev`
# Look for these log messages:
# - "📧 Attempting to send emails to:"
# - "📬 Resend batch response:"
# - "✅ Emails sent successfully! Batch ID:"
```

### Check Environment Variables
```bash
cd /Users/jama/Documents/fieldmark-website-2
cat .env.local | grep -E "(RESEND|BUSINESS)"
```

---

## 📝 Test Results Template

Use this to document your test:

```
Date: __________
Time: __________

✅ Assessment completed successfully
✅ Results page displayed correctly
✅ User email received in: ____ minutes
✅ Business email received in: ____ minutes
✅ No warning banners present
✅ All dynamic content correct
✅ HTML formatting intact
✅ Sender shows as hello@mail.millstonecompliance.com

Score received: ___/100
Gaps identified: ___
Strengths identified: ___

Issues found (if any):
_________________________________
_________________________________
```

---

## 🚀 Production Deployment Notes

Before going live:
1. ✅ Verify DNS records for mail.millstonecompliance.com
2. ✅ Test from external email addresses (Gmail, Outlook, etc.)
3. ✅ Monitor Resend dashboard for first week
4. ✅ Set up email alerts in Resend for failures
5. ✅ Consider adding email retry logic for failures

---

**Last Updated**: October 18, 2025
**Status**: Ready for Testing ✅

