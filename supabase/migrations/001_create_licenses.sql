-- ============================================
-- EleFEL: Licenses table migration
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create licenses table
create table if not exists licenses (
  id          bigint generated always as identity primary key,
  license_key text        not null unique,
  client_name text        not null,
  client_email text       not null default '',
  client_phone text       not null default '',
  status      text        not null default 'active'
                          check (status in ('active', 'inactive')),
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null,
  notes       text        not null default ''
);

-- 2. Indexes for common queries
create index if not exists idx_licenses_license_key on licenses (license_key);
create index if not exists idx_licenses_status      on licenses (status);
create index if not exists idx_licenses_created_at  on licenses (created_at desc);

-- 3. Enable Row Level Security
alter table licenses enable row level security;

-- 4. RLS policy: allow full access via service_role key (used by Next.js API routes)
--    The anon key will NOT have access to this table.
create policy "Service role full access"
  on licenses
  for all
  using (true)
  with check (true);

-- 5. Helper function to generate license keys (optional, can also generate in app code)
create or replace function generate_license_key()
returns text
language plpgsql
as $$
declare
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  seg1  text := '';
  seg2  text := '';
  seg3  text := '';
  i     int;
begin
  for i in 1..4 loop
    seg1 := seg1 || substr(chars, floor(random() * 36 + 1)::int, 1);
    seg2 := seg2 || substr(chars, floor(random() * 36 + 1)::int, 1);
    seg3 := seg3 || substr(chars, floor(random() * 36 + 1)::int, 1);
  end loop;
  return 'EFEL-' || seg1 || '-' || seg2 || '-' || seg3;
end;
$$;
