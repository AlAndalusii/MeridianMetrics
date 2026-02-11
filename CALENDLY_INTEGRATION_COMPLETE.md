# Calendly Integration - All "Book Free Consultation" Buttons

## Summary
Connected all "Book Free Consultation" buttons across the quiz system to the same Calendly modal that's used on the landing page. Users can now instantly book a consultation from any quiz page.

## Files Updated

### 1. `/app/quiz/page.tsx` (Quiz Selector)
**Changes:**
- Added `import { CalendlyModal } from "@/components/CalendlyWidget"`
- Added `import { useState } from "react"`
- Added state: `const [showCalendlyModal, setShowCalendlyModal] = useState(false)`
- Added `onClick={() => setShowCalendlyModal(true)}` to "Book Free Consultation" button
- Added `<CalendlyModal>` component at end of return statement

**Button Location:** "Not Sure Which Regulations Apply?" section

### 2. `/app/quiz/simpler-recycling/results/page.tsx` (Simpler Recycling Results)
**Changes:**
- Added `import { CalendlyModal } from "@/components/CalendlyWidget"`
- Added state: `const [showCalendlyModal, setShowCalendlyModal] = useState(false)`
- Added `onClick={() => setShowCalendlyModal(true)}` to TWO buttons:
  1. "Book Free Consultation" (in recommended service card)
  2. "Book Free Call" (in contact CTA section)
- Added `<CalendlyModal>` component at end of return statement

**Button Locations:** 
- Recommended service tier section
- "Want to Discuss Your Results?" section

### 3. `/app/quiz/epr/results/page.tsx` (EPR Results)
**Changes:**
- Added `import { CalendlyModal } from "@/components/CalendlyWidget"`
- Added state: `const [showCalendlyModal, setShowCalendlyModal] = useState(false)`
- Added `onClick={() => setShowCalendlyModal(true)}` to TWO buttons:
  1. "Book Free Consultation" (in recommended service card)
  2. "Book Free Call" (in contact CTA section)
- Added `<CalendlyModal>` component at end of return statement

**Button Locations:**
- Recommended service tier section
- "Want to Discuss Your Results?" section

## How It Works

### Implementation Pattern
```typescript
// 1. Import at top
import { CalendlyModal } from "@/components/CalendlyWidget"

// 2. Add state in component
const [showCalendlyModal, setShowCalendlyModal] = useState(false)

// 3. Add onClick to buttons
<Button onClick={() => setShowCalendlyModal(true)}>
  Book Free Consultation
</Button>

// 4. Add modal before closing </div>
<CalendlyModal 
  isOpen={showCalendlyModal} 
  onClose={() => setShowCalendlyModal(false)} 
/>
```

### User Experience
1. User clicks any "Book Free Consultation" or "Book Free Call" button
2. Calendly modal appears instantly (overlay)
3. User can:
   - Select a time slot
   - Fill in details
   - Book consultation
   - Close modal (ESC key or click outside)
4. Modal uses same Calendly embed URL as landing page

## Button Inventory

### Quiz Selector (`/quiz`)
- ✅ "Book Free Consultation" → Opens Calendly modal

### EPR Results (`/quiz/epr/results`)
- ✅ "Book Free Consultation" → Opens Calendly modal
- ✅ "Book Free Call" → Opens Calendly modal

### Simpler Recycling Results (`/quiz/simpler-recycling/results`)
- ✅ "Book Free Consultation" → Opens Calendly modal
- ✅ "Book Free Call" → Opens Calendly modal

### Landing Page (`/`)
- ✅ "BOOK A COMPLIANCE REVIEW" → Opens Calendly modal (already implemented)
- ✅ "BOOK A COMPLIANCE REVIEW" (in popup) → Opens Calendly modal (already implemented)

## Benefits

### For Users:
1. **Consistent Experience:** Same booking flow everywhere
2. **Instant Action:** No page navigation required
3. **Context Preserved:** Modal overlay keeps quiz results visible
4. **Mobile Friendly:** Calendly modal is responsive
5. **No Friction:** Direct path to consultation

### For Business:
1. **Higher Conversion:** Reduced steps to book
2. **Lead Capture:** Calendly collects contact info
3. **Automated Scheduling:** No manual back-and-forth
4. **Calendar Sync:** Appointments automatically blocked
5. **Email Notifications:** Both parties notified

## Testing Checklist

✅ Quiz selector: "Book Free Consultation" opens modal
✅ EPR results: Both buttons open modal
✅ Simpler Recycling results: Both buttons open modal
✅ Modal closes on ESC key
✅ Modal closes on backdrop click
✅ Modal closes on X button
✅ Calendly widget loads inside modal
✅ Mobile responsive
✅ No linter errors
✅ Server compiles successfully

## Calendly Configuration

The CalendlyWidget component (defined in `/components/CalendlyWidget.tsx`) handles:
- Modal overlay with backdrop blur
- Close button (X icon)
- ESC key to close
- Click outside to close
- Calendly embed iframe
- Loading state
- Mobile responsive sizing

**Note:** The actual Calendly URL is configured in the CalendlyWidget component. If you need to change the booking link, update it there.

## User Journey Examples

### Example 1: Quiz Selector
```
User lands on /quiz
  ↓
Not sure which quiz to take
  ↓
Clicks "Book Free Consultation"
  ↓
Calendly modal opens
  ↓
Books 15-minute call
  ↓
Receives confirmation email
```

### Example 2: After Quiz Completion
```
User completes Simpler Recycling quiz
  ↓
Sees score: 45% (non-compliant)
  ↓
Sees recommended service: £795 Full Setup
  ↓
Clicks "Book Free Consultation"
  ↓
Calendly modal opens
  ↓
Books call with context (just took quiz)
  ↓
Consultant sees quiz results before call
```

### Example 3: Results Discussion
```
User reviews EPR results
  ↓
Wants to discuss findings
  ↓
Scrolls to "Want to Discuss Your Results?"
  ↓
Clicks "Book Free Call"
  ↓
Calendly modal opens
  ↓
Selects convenient time
  ↓
Adds notes about specific questions
  ↓
Books consultation
```

## Technical Details

### State Management
Each page has its own `showCalendlyModal` state:
- Scoped to individual page (no global state needed)
- Cleans up on component unmount
- Simple boolean toggle (open/closed)

### Modal Component
The `CalendlyModal` component:
- Accepts `isOpen` and `onClose` props
- Renders portal overlay
- Embeds Calendly iframe
- Handles keyboard/click events
- Applies backdrop blur for premium feel

### Performance
- Calendly widget lazy-loads on modal open (not pre-loaded)
- Modal unmounts when closed (no memory leaks)
- No impact on page load time
- Smooth animations (CSS transitions)

## Future Enhancements

Potential improvements:
1. **Pre-fill User Info:** Pass quiz email/name to Calendly URL params
2. **Quiz Context:** Add quiz type/score to Calendly form notes
3. **Analytics:** Track which button/page triggered booking
4. **A/B Testing:** Test button text variants ("Book Call" vs "Schedule Consultation")
5. **Urgency:** Add countdown timer for limited slots
6. **Alternative Times:** Show next 3 available slots as quick picks

## Support

If users report Calendly not loading:
1. Check browser console for errors
2. Verify Calendly URL in CalendlyWidget component
3. Test in incognito mode (extensions can block iframes)
4. Check ad blockers (some block Calendly)
5. Verify Calendly account is active

---

**Status:** ✅ Complete and tested
**Dev Server:** http://localhost:3000
**No Linter Errors:** Confirmed
**Pages Updated:** 3 (quiz selector, EPR results, Simpler Recycling results)
**Buttons Connected:** 5 total
