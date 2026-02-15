# Quick Testing Guide - Mobile & Performance

## 🎯 How to Test Your Changes

### 1. **Start the Development Server**
```bash
npm run dev
```

### 2. **Test Mobile Menu (Most Important)**

#### On Desktop Browser
1. Open the site in your browser
2. Open DevTools (F12 or Right-click → Inspect)
3. Click the mobile device icon or press `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac)
4. Choose a mobile device (e.g., iPhone 14 Pro)
5. You should see a hamburger menu icon (☰) in the top-right corner

#### Mobile Menu Checklist
- [ ] Click the hamburger menu icon
- [ ] Menu slides in from the right smoothly
- [ ] See 3 menu items: Home, Resources, Free Assessment
- [ ] Current page is highlighted with green background
- [ ] Click "Resources" - should navigate and menu closes
- [ ] Click menu icon again to open
- [ ] Click the backdrop (dark area) - menu should close
- [ ] Click the X button - menu should close
- [ ] Try the email link - should open email client
- [ ] Try "Start Free Assessment" button - should navigate to quiz

### 3. **Test All Pages Have Mobile Menu**

Visit each page and verify the menu works:
- [ ] Home page: http://localhost:3000/
- [ ] Resources page: http://localhost:3000/resources
- [ ] Duty of Care article: http://localhost:3000/resources/duty-of-care-waste
- [ ] Simpler Recycling article: http://localhost:3000/resources/simpler-recycling-businesses
- [ ] PPT Explained: http://localhost:3000/resources/plastic-packaging-tax-explained
- [ ] PPT Guide: http://localhost:3000/resources/plastic-packaging-tax

### 4. **Test Touch Interactions**

If you have a real mobile device:
1. Open the site on your phone
2. Test tapping all buttons
3. Verify no accidental taps
4. Check buttons respond quickly
5. Ensure no weird highlighting when tapping

### 5. **Test Page Loading Speed**

#### Using Chrome DevTools
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Check scores:
   - Performance should be 90+
   - Accessibility should be 90+
   - Best Practices should be 90+

#### Test on Slow Connection
1. In DevTools, go to "Network" tab
2. Change "No throttling" to "Slow 3G"
3. Reload the page
4. Verify:
   - [ ] Page loads within 5 seconds
   - [ ] Text appears immediately
   - [ ] Buttons are clickable quickly
   - [ ] Images load progressively

### 6. **Test Pre-filled Email Links**

On each page, find the "Contact Us via Email" button:
- [ ] Click the button
- [ ] Email client opens
- [ ] Subject is pre-filled
- [ ] Body has template with placeholders
- [ ] "To" field has info@millstonecompliance.com

### 7. **Test Responsive Design**

Test these screen sizes:
- [ ] 320px (Small phone - iPhone SE)
- [ ] 375px (iPhone 12/13)
- [ ] 390px (iPhone 12 Pro)
- [ ] 430px (iPhone 14 Pro Max)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1280px (Laptop)
- [ ] 1920px (Desktop)

Verify:
- [ ] No horizontal scrolling
- [ ] All text is readable
- [ ] Buttons are accessible
- [ ] Content fits properly

### 8. **Test Animations**

- [ ] Menu slides in smoothly
- [ ] Menu slides out smoothly
- [ ] Backdrop fades in/out
- [ ] Button hover effects work
- [ ] No janky animations
- [ ] Animations respect user preferences

## 🐛 Common Issues & Solutions

### Issue: Menu doesn't appear
**Solution**: Make sure you're viewing on mobile size (< 1024px width)

### Issue: Menu is cut off
**Solution**: Check if there are any CSS conflicts. Clear browser cache.

### Issue: Email link doesn't work
**Solution**: Make sure you have a default email client set up

### Issue: Page loads slowly
**Solution**: 
1. Check your internet connection
2. Clear browser cache
3. Run `npm run build` and test production build

### Issue: Buttons not responding on mobile
**Solution**: Make sure touch-action is enabled in browser settings

## ✅ Quick Verification (30 seconds)

1. **Resize browser to mobile** (< 1024px width)
2. **Click hamburger menu** - Should open
3. **Click "Resources"** - Should navigate
4. **Open menu again** - Should work
5. **Click backdrop** - Should close

If all 5 work, you're good to go! 🎉

## 📱 Real Device Testing

### iOS (iPhone/iPad)
1. Get your local IP: 
   - Mac: System Preferences → Network
   - Should be something like `192.168.1.X`
2. On your iPhone, go to: `http://YOUR-IP:3000`
3. Test the mobile menu and navigation

### Android
1. Get your local IP (same as above)
2. On your Android phone, go to: `http://YOUR-IP:3000`
3. Test the mobile menu and navigation

## 🚀 Performance Checklist

- [ ] First page load < 3 seconds (3G)
- [ ] First page load < 1 second (4G/WiFi)
- [ ] Menu opens instantly
- [ ] No layout shifts
- [ ] Images load progressively
- [ ] Text appears immediately
- [ ] Buttons respond instantly
- [ ] No console errors

## 📊 Tools to Use

1. **Chrome DevTools**: For mobile emulation and debugging
2. **Lighthouse**: For performance scoring
3. **BrowserStack**: For real device testing (optional)
4. **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
5. **PageSpeed Insights**: https://pagespeed.web.dev/

## 🎉 Success Criteria

Your site is ready when:
- ✅ All pages accessible on mobile
- ✅ Mobile menu works on all pages
- ✅ Touch interactions feel native
- ✅ Page loads in < 3 seconds on 3G
- ✅ Lighthouse score > 90
- ✅ No console errors
- ✅ Email links work properly

---

**Need Help?** Check MOBILE_PERFORMANCE_OPTIMIZATIONS.md for detailed documentation.
