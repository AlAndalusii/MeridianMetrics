# Responsive Design Implementation Guide

## Overview
This website is fully responsive and optimized for all devices including desktop, laptop, iPad, iPhone, and Android devices.

## Viewport Configuration
The viewport meta tag is configured in `app/layout.tsx`:
```typescript
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#065f46',
}
```

## Breakpoints
The following breakpoints are defined in `tailwind.config.ts`:
- `xs`: 475px
- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px
- `2xl`: 1400px

## Responsive Features

### 1. Typography
- Uses responsive text sizes: `text-xs sm:text-sm md:text-base lg:text-lg`
- Clamp-based responsive typography classes available: `.text-responsive-{size}`
- Minimum font size of 16px on inputs to prevent iOS zoom

### 2. Spacing
- All sections use responsive padding: `px-4 sm:px-6 lg:px-8`
- Section spacing utility class: `.section-spacing` (3rem → 6rem based on screen size)
- Card responsive spacing: `.card-responsive` (1rem → 2.5rem)

### 3. Layout
- Flexbox and Grid layouts adapt to screen size
- Stack on mobile, side-by-side on desktop
- Example: `flex flex-col sm:flex-row`

### 4. Images
- All images use `max-width: 100%` and `height: auto`
- Utility class: `.img-fluid`
- Next.js Image component used where possible

### 5. Navigation
- Fixed header with backdrop blur
- Touch-friendly targets (minimum 44px)
- Hamburger menu for mobile (if implemented)
- Proper z-index layering

### 6. Touch Targets
- All interactive elements (buttons, links) have minimum 44px height/width
- `min-h-[44px] min-w-[44px]` classes applied
- Touch manipulation enabled: `touch-action: manipulation`

### 7. Forms and Inputs
- Input font size set to 16px on mobile to prevent zoom
- Proper input modes for different field types
- Full-width inputs on mobile: `w-full`
- Touch-friendly spacing

### 8. Overflow Prevention
- `overflow-x: hidden` on body and html
- `max-width: 100%` on all elements
- No fixed pixel widths that exceed viewport

## Component-Specific Optimizations

### Logo (MeridianLogo.tsx)
- Responsive size classes: `w-8 h-8 sm:w-10 sm:h-10`
- Responsive text: `text-sm sm:text-base md:text-lg lg:text-xl`
- Truncate text on overflow: `truncate`

### Hero Section
- Responsive heading: `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`
- Responsive padding: `pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32`
- Grid adapts: `grid-cols-1 lg:grid-cols-2`

### Cards and Sections
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Responsive padding: `p-4 sm:p-6 md:p-8 lg:p-10`
- Responsive border radius: `rounded-xl sm:rounded-2xl md:rounded-3xl`

### Footer
- Stack columns on mobile: `grid-cols-2 md:grid-cols-4`
- Responsive spacing: `gap-6 lg:gap-12`
- Center content on mobile: `text-center md:text-left`

### Assessment Page
- Full-width questions on mobile
- Large touch-friendly radio buttons
- Responsive card sizing
- Proper input field sizing

### Results Page
- Stack score display on mobile
- Responsive speedometer sizing
- Full-width buttons on mobile: `w-full sm:w-auto`
- Responsive grid for strengths/gaps

## Performance Optimizations

### Mobile-Specific
- Reduced animation duration on mobile devices
- Simplified blur effects: `backdrop-blur-xl` → 8px on mobile
- Optimized shadow rendering
- Content-visibility for layout shift prevention

### Touch Devices
- Removed hover effects on touch devices
- Active states for touch feedback
- Prevent text selection on buttons
- Better tap highlighting

## Testing Checklist

### Desktop (1920x1080)
- [x] All sections visible and properly spaced
- [x] Navigation clear and accessible
- [x] Typography readable
- [x] Images display correctly

### Laptop (1366x768)
- [x] Layout adapts properly
- [x] No horizontal scroll
- [x] Content remains readable

### iPad (768x1024)
- [x] Sections stack appropriately
- [x] Touch targets adequate size
- [x] Forms usable
- [x] Navigation accessible

### iPhone (375x667)
- [x] All content accessible
- [x] No zoom on input focus
- [x] Buttons touchable
- [x] Typography readable
- [x] No horizontal scroll

### Android (360x640)
- [x] Similar to iPhone
- [x] Proper rendering
- [x] Touch interactions work

## Browser Compatibility
- Chrome/Edge: Full support
- Safari (iOS): Full support with iOS-specific fixes
- Firefox: Full support
- Samsung Internet: Full support

## Accessibility
- Reduced motion support: `@media (prefers-reduced-motion: reduce)`
- Focus visible states: `focus-visible:outline`
- ARIA labels on interactive elements
- Semantic HTML structure

## Common Issues & Solutions

### Issue: Horizontal Scroll on Mobile
**Solution**: Check for elements with fixed widths, ensure `overflow-x: hidden` on body

### Issue: Text Too Small on Mobile
**Solution**: Use responsive text classes or clamp() function

### Issue: Buttons Too Small to Tap
**Solution**: Ensure minimum 44px height/width with `min-h-[44px]`

### Issue: Form Zoom on iOS
**Solution**: Set input font-size to 16px or larger

### Issue: Images Overflow Container
**Solution**: Use `max-width: 100%` and `height: auto`

## Maintenance
- Test on real devices regularly
- Use Chrome DevTools device emulation
- Check responsive breakpoints when adding new components
- Maintain consistent spacing and sizing patterns

