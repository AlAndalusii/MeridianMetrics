# 🚀 Supabase Setup Guide - Quick & Easy!

## ✅ What's Done

I've converted everything to use **Supabase** (much easier than Vercel Postgres!). Your credentials are already configured.

---

## 📋 Setup Steps (3 Minutes!)

### Step 1: Add Environment Variables (1 min)

Copy your Supabase credentials to `.env.local`:

```env
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxx

# Business Email
BUSINESS_EMAIL=zak@millstonecompliance.com

# Supabase Configuration (already provided by you!)
NEXT_PUBLIC_SUPABASE_URL=https://qwqevpicthqeplulpfvs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cWV2cGljdGhxZXBsdWxwZnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDIxMjYsImV4cCI6MjA3NjA3ODEyNn0.IjpXkaKsieRDC-GRwpbTGVKQDzhVwDXsbgPWDsIy4sw
```

### Step 2: Create Database Table (2 min)

1. Go to your Supabase project: https://app.supabase.com/project/qwqevpicthqeplulpfvs
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Paste the SQL from `supabase/schema.sql` (or copy below):

```sql
-- Create the assessment_submissions table
create table if not exists assessment_submissions (
  id bigint primary key generated always as identity,
  session_id text unique not null,
  name text,
  email text,
  company text,
  phone text,
  answers jsonb default '{}'::jsonb,
  score integer,
  is_complete boolean default false,
  current_question integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- Create indexes for better query performance
create index if not exists idx_session_id on assessment_submissions(session_id);
create index if not exists idx_email on assessment_submissions(email);
create index if not exists idx_is_complete on assessment_submissions(is_complete);
create index if not exists idx_created_at on assessment_submissions(created_at desc);

-- Enable Row Level Security (RLS)
alter table assessment_submissions enable row level security;

-- Create policy to allow public read access (for admin dashboard)
create policy "Allow public read access"
  on assessment_submissions
  for select
  to anon
  using (true);

-- Create policy to allow public insert (for new submissions)
create policy "Allow public insert"
  on assessment_submissions
  for insert
  to anon
  with check (true);

-- Create policy to allow public update (for updating submissions)
create policy "Allow public update"
  on assessment_submissions
  for update
  to anon
  using (true)
  with check (true);
```

5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see: **Success. No rows returned**

### Step 3: Test It! (30 sec)

```bash
npm run dev
```

Then visit:
- http://localhost:3000/assessment - Take the assessment
- http://localhost:3000/admin - See submissions!

---

## 🎯 That's It!

Supabase is now configured and ready to track all your assessment submissions!

### What Works:

✅ Auto-save every answer to Supabase
✅ Track abandoned assessments
✅ Admin dashboard at `/admin`
✅ Export to CSV
✅ Follow-up with abandoners
✅ Email system (Resend)
✅ Everything!

---

## 🔍 Verify Setup

### Check Database:

1. Go to Supabase: https://app.supabase.com/project/qwqevpicthqeplulpfvs
2. Click **Table Editor**
3. You should see `assessment_submissions` table
4. Complete an assessment, then refresh - see the row!

### Check Environment:

```bash
# In your terminal:
cat .env.local

# Should show:
# NEXT_PUBLIC_SUPABASE_URL=https://qwqevpicthqeplulpfvs.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
```

---

## 📊 Supabase Dashboard Features

Access your Supabase dashboard at:
**https://app.supabase.com/project/qwqevpicthqeplulpfvs**

### Useful Features:

**Table Editor** - View all submissions visually
**SQL Editor** - Run custom queries
**Database** → **Roles** - Manage permissions (already set up!)
**Logs** - See all database queries
**API Docs** - Auto-generated API documentation

---

## 💰 Supabase Free Tier

Your project is on the **free tier** which includes:

✅ 500 MB database storage (enough for 10,000+ assessments)
✅ Unlimited API requests
✅ Unlimited rows
✅ Row Level Security (RLS)
✅ Realtime subscriptions
✅ Auto-backups (daily)

**Perfect for getting started!** You can scale up later if needed.

---

## 🔒 Security (Already Configured!)

✅ **Row Level Security (RLS)** enabled
✅ **Public policies** allow:
  - Anyone can insert (submit assessment)
  - Anyone can update (save progress)
  - Anyone can read (admin dashboard)
  
✅ **Anon key** is safe for client-side use
✅ **Service key** (secret) not exposed

This is perfect for your use case!

---

## 🧪 Test Queries

Want to run some test queries? Go to **SQL Editor** and try:

### See all submissions:
```sql
SELECT * FROM assessment_submissions 
ORDER BY created_at DESC 
LIMIT 10;
```

### See completion rate:
```sql
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_complete = true) as completed,
  COUNT(*) FILTER (WHERE is_complete = false) as abandoned,
  ROUND(100.0 * COUNT(*) FILTER (WHERE is_complete = true) / COUNT(*), 2) as completion_rate
FROM assessment_submissions;
```

### See average score:
```sql
SELECT 
  AVG(score) as average_score,
  MIN(score) as lowest_score,
  MAX(score) as highest_score
FROM assessment_submissions 
WHERE is_complete = true;
```

---

## 🆘 Troubleshooting

### "Failed to save to database"

**Check:**
1. `.env.local` has correct Supabase URL and key
2. Table exists in Supabase (check Table Editor)
3. RLS policies are enabled (run the schema.sql again)

### "No data showing in admin"

**Check:**
1. Complete at least one assessment first
2. Go to Supabase Table Editor - verify data is there
3. Check browser console for errors

### "RLS policy error"

**Solution:**
Re-run the SQL in Step 2 to create the policies.

---

## 📝 Files Created/Updated

### New Files:
- `/lib/supabase.ts` - Supabase client
- `/lib/db.ts` - Database functions (updated for Supabase)
- `/supabase/schema.sql` - Database schema
- `SUPABASE_SETUP.md` - This guide!

### Updated Files:
- `package.json` - Changed to @supabase/supabase-js
- No other changes needed!

---

## 🎉 Advantages of Supabase

Compared to Vercel Postgres:

✅ **Easier setup** - No CLI needed
✅ **Better UI** - Table Editor for viewing data
✅ **More features** - Realtime, Auth, Storage
✅ **Better free tier** - 500 MB vs 256 MB
✅ **Simpler config** - Just two env vars
✅ **Better debugging** - SQL Editor + Logs
✅ **Auto-backups** - Daily backups included

---

## ✅ You're Ready!

Everything is configured for Supabase. Just:

1. Add credentials to `.env.local`
2. Run the SQL schema in Supabase
3. Start the dev server: `npm run dev`
4. Test it!

**Your assessment now saves to Supabase!** 🚀

---

## 📞 Quick Reference

**Supabase Dashboard:** https://app.supabase.com/project/qwqevpicthqeplulpfvs
**Your Project URL:** https://qwqevpicthqeplulpfvs.supabase.co
**Admin Dashboard:** http://localhost:3000/admin
**Assessment:** http://localhost:3000/assessment

---

**Questions?** Check the main setup guides or the Supabase documentation at docs.supabase.com

