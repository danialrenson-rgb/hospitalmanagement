create table if not exists public.appointments (
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  phone text not null,
  age_years smallint not null default 0 check (age_years between 0 and 120),
  age_months smallint not null default 0 check (age_months between 0 and 11),
  age_days smallint not null default 0 check (age_days between 0 and 30),
  gender text not null default '',
  doctor text not null,
  visit_date date not null,
  consultation_type text not null,
  fee numeric(10, 2) not null check (fee >= 0),
  created_at timestamptz not null default now()
);

create index if not exists appointments_owner_id_visit_date_idx
  on public.appointments (owner_id, visit_date, created_at desc);

alter table public.appointments enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'appointments'
      and policyname = 'Users manage their own appointments'
  ) then
    execute 'create policy "Users manage their own appointments"
      on public.appointments for all to authenticated
      using ((select auth.uid()) = owner_id)
      with check ((select auth.uid()) = owner_id)';
  end if;
end
$$;

revoke all on public.appointments from anon, public;
grant select, insert, update, delete on public.appointments to authenticated;
