create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'starter',
  status text not null check (status in ('active', 'trial', 'paused', 'churned')),
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_daily (
  date date primary key,
  active_companies integer not null default 0,
  new_signups integer not null default 0,
  conversion_rate numeric(5,2) not null default 0,
  events integer not null default 0
);

create table if not exists public.operations_status (
  id uuid primary key default gen_random_uuid(),
  service_name text not null unique,
  status text not null check (status in ('operational', 'degraded', 'outage', 'maintenance')),
  response_ms integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  status text not null check (status in ('open', 'monitoring', 'resolved')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table public.companies enable row level security;
alter table public.analytics_daily enable row level security;
alter table public.operations_status enable row level security;
alter table public.incidents enable row level security;

-- For admin usage, add strict policies tied to authenticated users.
-- Example permissive policy for quick setup (replace before production):
create policy if not exists "allow_authenticated_read_companies"
on public.companies
for select
using (auth.role() = 'authenticated');

create policy if not exists "allow_authenticated_read_analytics"
on public.analytics_daily
for select
using (auth.role() = 'authenticated');

create policy if not exists "allow_authenticated_read_operations"
on public.operations_status
for select
using (auth.role() = 'authenticated');

create policy if not exists "allow_authenticated_read_incidents"
on public.incidents
for select
using (auth.role() = 'authenticated');
