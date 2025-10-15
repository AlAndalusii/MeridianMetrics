# 🔧 Troubleshooting Guide

## ChunkLoadError Fix

### What Happened
You got: `Loading chunk app/assessment/page failed`

This is a Next.js cache issue that happens after code changes.

### Quick Fix (Already Running)

I just cleared the Next.js cache and restarted the server:

```bash
rm -rf .next
npm run dev
```

### Wait for it to finish...

You should see:
```
✓ Ready in ~2000ms
```

Then try visiting http://localhost:3000/assessment again.

---

## If That Doesn't Work

### Option 1: Manual Cache Clear

```bash
# Stop the server (Ctrl+C)
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

### Option 2: Fresh Install

```bash
# Stop the server (Ctrl+C)
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### Option 3: Hard Refresh Browser

Sometimes it's browser cache:
- **Chrome/Edge:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Firefox:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- **Safari:** Cmd+Option+R (Mac)

---

## Common Next.js Errors

### "Module not found"
**Solution:** `npm install` and restart

### "ChunkLoadError"
**Solution:** `rm -rf .next` and restart (what I just did!)

### "Hydration error"
**Solution:** Check for mismatched HTML between server/client

### "Can't resolve module"
**Solution:** Check imports, run `npm install`

---

## After Fix Checklist

Once the server restarts successfully:

- [ ] Visit http://localhost:3000/assessment
- [ ] Should load without error
- [ ] Fill out a few questions
- [ ] Check Supabase for saved data
- [ ] Complete assessment
- [ ] Check emails

---

## Prevention

To avoid this in the future:

1. **After big code changes:** Restart the dev server
2. **After npm install:** Clear cache with `rm -rf .next`
3. **Random errors:** Try cache clear first

---

## Current Status

✅ Cache cleared
✅ Server restarting
⏳ Wait for "Ready in..." message
🔄 Then test http://localhost:3000/assessment

---

**The server should be ready in a few seconds!** 🚀

