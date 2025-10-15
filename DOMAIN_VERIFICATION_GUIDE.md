# 📧 Domain Verification Guide - Send Emails to Customers

## ✅ Current Status

**Emails are working!** However, both emails (user + business) are currently being sent to `zak@millstonecompliance.com` because your domain is not yet verified with Resend.

### What's Happening Now:
- ✅ User completes assessment → 2 emails sent to you
- ⚠️ Email 1: Business notification (complete data)
- ⚠️ Email 2: User's results (with note to forward to customer)
- ❌ Customer does NOT receive email automatically

## 🚀 How to Send Emails Directly to Customers (10 minutes)

### Step 1: Verify Your Domain in Resend

1. **Go to Resend Dashboard**
   - Visit: https://resend.com/domains
   - Log in with your Resend account

2. **Add Your Domain**
   - Click "Add Domain"
   - Enter: `millstonecompliance.com` (or your domain)
   - Click "Add"

3. **Add DNS Records**
   
   Resend will show you 3 DNS records to add. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these records:

   **Example DNS records** (yours will be different):
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [long string Resend provides]
   
   Type: TXT  
   Name: @
   Value: [SPF record Resend provides]
   
   Type: CNAME (optional but recommended)
   Name: em
   Value: [CNAME Resend provides]
   ```

4. **Wait for Verification**
   - DNS propagation takes 5-10 minutes (sometimes up to 1 hour)
   - Resend will automatically verify when DNS is live
   - You'll see a ✅ green checkmark when verified

### Step 2: Update the Email Code

Once your domain is verified, update the code:

1. **Open**: `/app/api/send-result/route.ts`

2. **Find line 41** and change:
   ```typescript
   from: 'Assessment System <onboarding@resend.dev>',
   ```
   **To**:
   ```typescript
   from: 'Millstone Compliance <hello@millstonecompliance.com>',
   ```

3. **Find line 49** and change:
   ```typescript
   from: 'Millstone Compliance <onboarding@resend.dev>',
   ```
   **To**:
   ```typescript
   from: 'Millstone Compliance <hello@millstonecompliance.com>',
   ```

4. **Find line 50** and change:
   ```typescript
   to: [process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'],
   ```
   **To**:
   ```typescript
   to: [userInfo.email],
   ```

5. **Remove the warning message** (lines 52-56):
   Delete this entire section:
   ```typescript
   html: `
     <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
       <strong>⚠️ IMPORTANT - Forward this email to: ${userInfo.email}</strong><br>
       <small>Domain verification pending. Once verified, emails will send automatically to customers.</small>
     </div>
     ${generateUserEmail(userInfo, score, scoreLevel, gaps, strengths, recommendation)}
   `,
   ```
   **Replace with**:
   ```typescript
   html: generateUserEmail(userInfo, score, scoreLevel, gaps, strengths, recommendation),
   ```

### Step 3: Test It!

1. Clear localStorage in your browser:
   - Open browser console (F12)
   - Run: `localStorage.clear()`

2. Complete the assessment at http://localhost:3000/assessment

3. Check both inboxes:
   - ✅ Your email: Business notification
   - ✅ Customer email: Their results

## 🆘 Troubleshooting

### Domain Not Verifying?

**Check your DNS records:**
- Are the records in the right domain/zone?
- Did you copy the entire value (no spaces/truncation)?
- Wait 10-30 minutes for DNS to propagate
- Use https://dnschecker.org to verify records are live

**Common Issues:**
- Some registrars don't allow `@` - try leaving Name field blank instead
- Make sure you're adding records to the ROOT domain, not a subdomain
- Remove any duplicate SPF records (only one SPF record allowed)

### Emails Still Not Sending?

1. Check browser console for errors
2. Check the terminal/server logs for Resend errors
3. Verify your RESEND_API_KEY in `.env.local` is correct
4. Make sure you restarted the dev server after changing code

### Test Different Email Addresses

Try these when testing:
- ✅ Gmail: `yourname@gmail.com`
- ✅ Outlook: `yourname@outlook.com`
- ✅ Corporate: `yourname@companyname.com`
- ❌ Don't use: `example.com`, `test.com`, `fake.com`

## 📊 After Verification

Once your domain is verified, you'll be able to:
- ✅ Send unlimited emails to any address
- ✅ Automatic delivery to customers
- ✅ Professional "from" address (@millstonecompliance.com)
- ✅ Better deliverability (higher trust)
- ✅ View email delivery stats in Resend dashboard

## 💡 Best Practices

### Recommended Email Addresses:
- `hello@millstonecompliance.com` - Main contact
- `results@millstonecompliance.com` - Assessment results
- `noreply@millstonecompliance.com` - Automated emails (not recommended)

### Create Alias in Your Email Provider:
Set up email forwarding so all these addresses go to your main inbox.

## 📈 Next Steps

After domain verification:
1. ✅ Test with your own email
2. ✅ Test with a friend/colleague's email
3. ✅ Monitor Resend dashboard for delivery rates
4. ✅ Set up DMARC (optional but recommended)

## 🎯 Quick Command Reference

**Clear browser storage for testing:**
```javascript
localStorage.clear()
```

**Check if emails were sent (browser console):**
```javascript
localStorage.getItem('ppt_assessment_email_sent')
```

**Resend Dashboard:**
- https://resend.com/emails - View sent emails
- https://resend.com/domains - Manage domains
- https://resend.com/api-keys - Manage API keys

---

## ✉️ Need Help?

If you need assistance with domain verification, just ask! I can:
- Help troubleshoot DNS issues
- Verify your DNS records
- Test the email flow
- Update the code for you once verified

