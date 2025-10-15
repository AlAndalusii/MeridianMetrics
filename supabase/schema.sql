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

-- Add comment to table
comment on table assessment_submissions is 'Stores PPT assessment submissions including partial/abandoned assessments';

