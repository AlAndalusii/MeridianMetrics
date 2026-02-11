# Simpler Recycling Section - Visual Guide

## 🎨 Section Preview (What It Looks Like)

```
═══════════════════════════════════════════════════════════════════════════════
                         SIMPLER RECYCLING SECTION
═══════════════════════════════════════════════════════════════════════════════

Background: Animated green gradient orbs floating, grid pattern, shimmer effect

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│              [⚡ NEW REGULATION ALERT] [2025]  ← Red badge, pulsing          │
│                                                                               │
│                         Simpler Recycling                                     │
│                    Are You Breaking the Law?  ← Green gradient text          │
│                                                                               │
│    Deadline was 31 March 2025. All UK businesses with 10+ employees          │
│    must now separate waste into 3 bins. Environment Agency inspections       │
│    have started.                                                              │
│                                                                               │
│    ┌──────────┐        ┌──────────┐        ┌──────────┐                     │
│    │  31 Mar  │        │    3     │        │   £118   │                     │
│    │ Deadline │        │  Waste   │        │ Per Hour │                     │
│    │  Passed  │        │ Streams  │        │   Fine   │                     │
│    └──────────┘        └──────────┘        └──────────┘                     │
│     Red (Alert)         Green               Green                            │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

Floating Elements (Desktop Only):
┌──────────────┐                                    ┌──────────────┐
│  [Alert] 🔴  │ (Top Right)                       │  Businesses  │
│   31 Mar     │                                    │      3       │ (Bottom
│   Deadline   │                                    │ Waste Streams│  Left)
│   Passed     │                                    │  Required    │
│  ████████    │                                    │  ███ ███ ███ │
└──────────────┘                                    └──────────────┘

═══════════════════════════════════════════════════════════════════════════════
                              3 VALUE CARDS
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│                     │  │                     │  │                     │
│   [🎯 Target Icon]  │  │  [🗑️ Trash2 Icon]  │  │  [🛡️ Shield Icon]  │
│                     │  │                     │  │                     │
│  Check Your Setup   │  │   3-Bin System      │  │  Inspection Ready   │
│                     │  │                     │  │                     │
│ We visit your site, │  │ Dry recyclables,    │  │ Environment Agency  │
│ count your bins,    │  │ food waste, and     │  │ can visit any time. │
│ check your waste    │  │ general waste. We   │  │ We make sure you    │
│ contractor, and     │  │ set up the bins,    │  │ have labeled bins,  │
│ tell you if you're  │  │ signage, and staff  │  │ records, and proof. │
│ compliant.          │  │ training.           │  │                     │
│                     │  │                     │  │                     │
│   [14-Day Fix]      │  │  [Ready in 7 Days]  │  │   [Zero Fines]      │
│                     │  │                     │  │                     │
│ ═════════════════   │  │ ═════════════════   │  │ ═════════════════   │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
   Green gradient          Emerald gradient         Blue gradient
   Hover: Lifts up         Hover: Lifts up          Hover: Lifts up
   Progress bar fills      Progress bar fills       Progress bar fills

═══════════════════════════════════════════════════════════════════════════════
                                    CTA
═══════════════════════════════════════════════════════════════════════════════

                    ╔═══════════════════════════════════════╗
                    ║  🗑️ Check If You're Compliant  →    ║  ← Huge button
                    ║                                       ║     Green gradient
                    ║     (Shine effect + hover scale)     ║     Links to quiz
                    ╚═══════════════════════════════════════╝

         [🕐 2 minutes]  |  [🛡️ Free assessment]  |  [⚠️ Deadline passed]
                              Trust indicators

              ┌────────────────────────────────────────────┐
              │  ⚠️ Environment Agency can inspect any time │  ← Red urgency
              └────────────────────────────────────────────┘     banner

═══════════════════════════════════════════════════════════════════════════════
```

## 🎬 Animations Timeline

### On Page Load (Staggered Entrance)
```
0.0s → Background gradients start pulsing
0.1s → Badge fades in + scales
0.2s → Headline fades in from below
0.3s → Stats bar fades in
0.4s → Card 1 fades in from below (delay-0)
0.5s → Card 2 fades in from below (delay-100)
0.6s → Card 3 fades in from below (delay-200)
0.7s → CTA button fades in from below (delay-300)
0.8s → Trust indicators fade in (delay-400)

Continuous:
- Gradient orbs pulse slowly
- Floating cards bob up and down
- Geometric shapes rotate
- Shimmer effect scrolls across
- Stats icons pulse
```

### On Hover (Interactive)
```
Card Hover:
├─ Card lifts 12px
├─ Glow appears behind card
├─ Border shimmer activates
├─ Icon scales to 110%
├─ Progress bar fills (0% → 100%)
└─ Badge background changes

Button Hover:
├─ Button scales to 105%
├─ Shadow intensifies
├─ Arrow icon slides right
├─ Border pulse activates
└─ Shine effect sweeps across

Stat Hover:
└─ Number scales to 110%
```

## 📐 Layout Breakpoints

### Mobile (< 640px)
```
┌─────────────┐
│   Badge     │
│   Headline  │
│   Stats     │
│             │
│   Card 1    │
│   (stacked) │
│             │
│   Card 2    │
│   (stacked) │
│             │
│   Card 3    │
│   (stacked) │
│             │
│   CTA       │
│   (full w)  │
└─────────────┘

Note: Floating cards HIDDEN
```

### Tablet (640px - 1024px)
```
┌─────────────────────┐
│      Badge          │
│      Headline       │
│      Stats          │
│                     │
│  Card 1  │  Card 2  │
│  Card 3  │ (spans)  │
│                     │
│        CTA          │
└─────────────────────┘

Note: Floating cards HIDDEN
```

### Desktop (> 1024px)
```
┌───────────────────────────────────────┐
│  [Deadline Card]     Badge            │ ← Floating
│                     Headline           │
│                      Stats             │
│                                        │
│   Card 1  │  Card 2  │  Card 3        │
│                                        │
│                      CTA               │
│  [Compliance Card]                     │ ← Floating
└───────────────────────────────────────┘
```

## 🎨 Color Palette

### Primary (Compliant)
- **Green-50**: `#f0fdf4` - Lightest background
- **Green-100**: `#dcfce7` - Card backgrounds
- **Green-200**: `#bbf7d0` - Borders, dividers
- **Green-500**: `#22c55e` - Accent elements
- **Green-600**: `#16a34a` - Primary CTA
- **Green-700**: `#15803d` - Text, hover states
- **Green-900**: `#14532d` - Headings

### Urgency (Non-Compliant)
- **Red-50**: `#fef2f2` - Urgency backgrounds
- **Red-200**: `#fecaca` - Alert borders
- **Red-600**: `#dc2626` - Deadline warnings
- **Red-800**: `#991b1b` - Urgent text

### Accent Colors
- **Emerald**: Cards with emerald gradient
- **Blue**: Cards with blue gradient

## 💫 Special Effects

### 1. Gradient Orbs (Background)
```css
Top-right orb: Green-200/20 → Emerald-100/15 → Transparent
Bottom-left orb: Green-300/15 → Green-100/10 → Transparent
Animation: Pulse (scale 100% → 105% → 100%), 6s infinite
Blur: 3xl (64px)
```

### 2. Floating Cards
```css
Position: Absolute, fixed to viewport edges
Animation: Float (translateY 0 → -10px → 0), 6s ease-in-out infinite
Backdrop: blur(xl), white/70
Shadow: Soft colored shadow matching content
```

### 3. Shimmer Effect
```css
Background: Linear gradient 45deg
Colors: Transparent → White/30 → Transparent
Size: 20px × 20px
Animation: Translate right infinitely
```

### 4. Card Glow
```css
Opacity: 0 → 100% on hover
Position: Inset -8px (behind card)
Gradient: Accent color/0 → Accent/10 → Accent/0
Blur: 2xl (40px)
Transition: 700ms
```

### 5. Progress Bar
```css
Height: 1px (4px visual)
Color: Accent-100 (inactive) → Accent-400 (active)
Width: 0% → 100% on hover
Transition: 700ms ease-out
Position: Bottom of card
```

## 🔗 User Journey

```
Homepage
   ↓
Scroll to Simpler Recycling Section
   ↓
[See floating "31 Mar Deadline Passed" card] ← URGENCY
   ↓
Read headline "Are You Breaking the Law?"  ← FEAR
   ↓
See stats: Deadline passed, 3 bins, £118/hour ← SPECIFICS
   ↓
Review 3 cards: What we do ← VALUE
   ↓
Click "Check If You're Compliant" CTA ← ACTION
   ↓
/quiz/simpler-recycling
   ↓
Complete 10-question assessment
   ↓
Get personalized compliance report
   ↓
Book service: £295 audit / £795 setup / £499/month
```

## 📊 Conversion Optimizations

### Psychological Triggers:
1. **Fear:** "Are You Breaking the Law?"
2. **Urgency:** "Deadline Passed", "Environment Agency inspections"
3. **Specificity:** "3 bins", "£118/hour", "31 March 2025"
4. **Social Proof:** "14-Day Fix", "Ready in 7 Days", "Zero Fines"
5. **Low Friction:** "2 minutes", "Free assessment"

### Visual Hierarchy:
1. Red alert badge (highest contrast)
2. Large headline with gradient
3. Critical stats (numbers)
4. Value cards (detailed info)
5. CTA button (green, calls to action)
6. Trust signals (supporting info)

### CTA Optimization:
- **Size:** Extra large (py-8, px-14)
- **Color:** Green gradient (matches brand)
- **Icon:** Trash2 (reinforces topic)
- **Action Text:** "Check If You're Compliant" (outcome-focused)
- **Position:** Center, below value cards
- **Contrast:** White text on green (WCAG AAA)

## ✅ Accessibility Checklist

✅ Semantic HTML (section, h2, h3)
✅ ARIA labels (aria-labelledby)
✅ Keyboard navigable
✅ Focus visible on interactive elements
✅ Color contrast meets WCAG AA
✅ Text scales with browser zoom
✅ Animations respect prefers-reduced-motion
✅ Alt text for icons (via aria-hidden + text)
✅ Logical tab order
✅ Screen reader friendly structure

## 🚀 Performance

### Optimizations:
- CSS animations (GPU-accelerated)
- Hidden elements on mobile (reduce paint)
- Lazy-loaded animations (viewport trigger)
- Efficient selectors (group/hover)
- Minimal JavaScript (pure CSS animations)

### Metrics:
- **First Paint:** Gradient backgrounds visible immediately
- **Above Fold:** Headline + CTA visible in viewport
- **Time to Interactive:** < 2s (no JS blocking)
- **Animation FPS:** 60fps (transform/opacity only)

## 🎯 Success Metrics

### Primary KPI:
**Click-through rate on CTA** → Target: 8-12%

### Secondary KPIs:
- Time on section: > 15 seconds
- Scroll depth: 90%+ users reach section
- Quiz completion rate: 65-75%
- Mobile engagement: 40%+ of traffic

### A/B Test Ideas:
1. Headline variants: "Are You Compliant?" vs "Are You Breaking the Law?"
2. CTA text: "Check Compliance" vs "Take Free Quiz"
3. Urgency level: Deadline passed vs Inspections happening
4. Card count: 3 vs 4 value propositions

---

**Visual Summary:**
This section uses **minimal text**, **maximum impact** through:
- Animated backgrounds (movement)
- Floating contextual cards (depth)
- Large stats (quick scan)
- Clear value props (3 cards)
- One big CTA (clear next step)

Following the **100k section style**: Premium animations, glassmorphism, sophisticated gradients, and trust signals.
