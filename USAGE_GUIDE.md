# PDF Report - Usage Guide

## Quick Start

Your PDF report system is fully functional and ready to use! Here's how everything works:

## Current Implementation

The system is **already integrated** into your results page at `/app/assessment/results/page.tsx`. When users complete the assessment, they automatically see:

1. Their personalized results
2. A download button that generates a professional PDF
3. An email sent with the same information

## How to Use the DownloadReport Component (Optional)

If you want to use the new `DownloadReport` component for a cleaner UI, here's how:

### 1. Import the component:

```tsx
import { DownloadReport } from '@/components/DownloadReport';
```

### 2. Replace your current download section with:

```tsx
<DownloadReport
  userName={userInfo.name}
  userEmail={userInfo.email}
  company={userInfo.company}
  score={score}
  gaps={gaps}
  strengths={strengths}
  onDownload={handleDownloadPDF}
  isGenerating={isGeneratingPDF}
/>
```

## Testing the PDF

### Test Locally:

1. Start your development server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/assessment`

3. Complete the assessment with test data:
   - Name: John Smith
   - Email: test@example.com
   - Company: Test Company Ltd
   - Answer the compliance questions

4. View the results page and click "Download PDF"

### Expected Output:

**Filename:** `Millstone_Compliance_Report_John_Smith_2025-10-16.pdf`

**Contents:**
- Page 1: Welcome message, client info, compliance score
- Page 2: Areas to address, strengths, recommendations

## Customizing the PDF

### Change Colors:

Edit `/lib/pdfGenerator.ts` and update the color values:

```typescript
// Header color
doc.setFillColor(6, 95, 70); // Change RGB values

// Text colors
doc.setTextColor(6, 95, 70); // Emerald-800
```

### Change Text:

#### Welcome Message:
```typescript
const welcomeText = `Your custom welcome message here...`;
```

#### Section Headings:
```typescript
doc.text('YOUR CUSTOM HEADING', margin, yPosition);
```

### Adjust Layout:

```typescript
// Margins
const margin = 20; // Change to adjust page margins

// Font sizes
doc.setFontSize(14); // Change to adjust text size

// Spacing
yPosition += 10; // Change to adjust vertical spacing
```

## Email Customization

Edit `/app/api/send-result/route.ts` to customize the email:

### Subject Line:
```typescript
subject: `Your custom subject - ${score}/100`
```

### Email Content:
Look for the template functions:
- `generateUserEmail()` - User's results email
- `generateBusinessEmail()` - Your notification email

## Common Customizations

### 1. Add Your Phone Number to Footer:

In `pdfGenerator.ts`, add after the email:

```typescript
doc.setFontSize(7);
doc.text('Phone: 01234 567890', margin, footerY + 8);
```

### 2. Add a Logo Image:

```typescript
// At the top of pdfGenerator.ts, add:
// (Note: requires converting SVG to PNG/JPG first)
doc.addImage(logoImage, 'PNG', margin, 10, 30, 30);
```

### 3. Change Recommendation Packages:

In `pdfGenerator.ts`, find the `addRecommendationSection` function and update:

```typescript
const recommendation = data.score >= 90
  ? 'Your custom package name'
  : data.score >= 70
  ? 'Another package'
  : // etc...
```

## Troubleshooting

### PDF Text is Blurry:
✅ **Already Fixed!** The new implementation uses jsPDF directly which produces crisp text.

### Wrong Branding:
✅ **Already Fixed!** The PDF now uses "Millstone Compliance" with your emerald color theme.

### Missing Personalization:
- Check that `userName`, `userEmail`, and `company` are populated
- Verify localStorage has assessment data
- Clear browser cache and try again

### Email Not Sending:
- Check your `.env.local` has `RESEND_API_KEY` set
- Verify domain verification in Resend dashboard
- Check the terminal console for error messages

## File Locations

Here's where everything is:

```
/lib/pdfGenerator.ts              ← PDF generation logic
/components/DownloadReport.tsx    ← Optional UI component
/app/api/send-result/route.ts     ← Email templates
/app/assessment/results/page.tsx  ← Results page (current implementation)
```

## What's Different from Before

### Old System:
- ❌ Blurry text (used html2canvas)
- ❌ Generic branding
- ❌ No personalization
- ❌ Cold, technical tone

### New System:
- ✅ Crystal clear text (pure jsPDF)
- ✅ Millstone Compliance branding
- ✅ Personalized for each user
- ✅ Warm, human, supportive tone
- ✅ Professional consultancy-grade design
- ✅ Matches your website's emerald theme

## Examples of Personalization

### Welcome Message:
> "Dear John Smith,
> 
> Thank you for completing your PPT Compliance Assessment. We've prepared this personalized report to help you understand where you stand and what steps you can take to protect Test Company Ltd from HMRC penalties."

### Gaps Section:
> "We've identified 4 areas that need your attention. Don't worry - these are common issues, and we can help you fix them."

### Strengths Section:
> "Great work! You already have these important compliance elements in place:"

### Recommendations:
> "Let's get your compliance sorted. We'll conduct a full review, organize your records, and provide hands-on support to make you audit-ready."

## Next Steps

Your system is ready to use! Every user who completes the assessment will receive:

1. ✅ A professional, personalized PDF report
2. ✅ A welcoming email with the same content
3. ✅ Clear, crisp text (no more blurry PDFs!)
4. ✅ Consistent branding throughout

No additional setup needed - just deploy and you're good to go!

## Questions?

If you need to:
- Change colors or styling
- Adjust text or messaging
- Add/remove sections
- Modify the layout

Just edit the files mentioned above, or let me know what you'd like changed!

