create table if not exists public.hospital_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  hospital_name text not null,
  username text not null,
  logo_data_url text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.patients (
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id text not null,
  name text not null,
  age integer not null check (age between 0 and 120),
  gender text not null,
  phone text not null,
  email text not null,
  blood_group text not null,
  department text not null,
  doctor text not null,
  last_visit text not null,
  status text not null check (status in ('In treatment', 'Admitted', 'Discharged', 'Scheduled')),
  diagnosis text not null,
  allergies text not null,
  created_at timestamptz not null default now(),
  primary key (owner_id, id)
);

create table if not exists public.lab_orders (
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  invoice text not null,
  date text not null,
  patient text not null,
  phone text not null,
  total numeric(12, 2) not null check (total >= 0),
  payment text not null check (payment in ('Paid', 'Unpaid', 'Due')),
  status text not null check (status in ('Pending', 'Sample Collected', 'Completed')),
  created_at timestamptz not null default now(),
  primary key (owner_id, invoice)
);

create index if not exists patients_owner_id_idx on public.patients (owner_id);
create index if not exists lab_orders_owner_id_created_at_idx on public.lab_orders (owner_id, created_at desc);

alter table public.hospital_settings enable row level security;
alter table public.patients enable row level security;
alter table public.lab_orders enable row level security;

create policy "Users manage their own hospital settings"
  on public.hospital_settings for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their own patients"
  on public.patients for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "Users manage their own lab orders"
  on public.lab_orders for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

revoke all on public.hospital_settings, public.patients, public.lab_orders from anon, public;
grant select, insert, update, delete on public.hospital_settings, public.patients, public.lab_orders to authenticated;
