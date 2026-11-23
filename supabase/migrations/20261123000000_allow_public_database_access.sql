alter table public.hospital_settings
  drop constraint if exists hospital_settings_user_id_fkey;

alter table public.patients
  drop constraint if exists patients_owner_id_fkey;

alter table public.lab_orders
  drop constraint if exists lab_orders_owner_id_fkey;

alter table public.appointments
  drop constraint if exists appointments_owner_id_fkey;

alter table public.hospital_settings alter column user_id drop not null;
alter table public.patients alter column owner_id drop not null;
alter table public.lab_orders alter column owner_id drop not null;
alter table public.appointments alter column owner_id drop not null;

drop policy if exists "Users manage their own hospital settings" on public.hospital_settings;
drop policy if exists "Users manage their own patients" on public.patients;
drop policy if exists "Users manage their own lab orders" on public.lab_orders;
drop policy if exists "Users manage their own appointments" on public.appointments;

create policy "Public access to hospital settings"
  on public.hospital_settings for all to anon, authenticated
  using (true)
  with check (true);

create policy "Public access to patients"
  on public.patients for all to anon, authenticated
  using (true)
  with check (true);

create policy "Public access to lab orders"
  on public.lab_orders for all to anon, authenticated
  using (true)
  with check (true);

create policy "Public access to appointments"
  on public.appointments for all to anon, authenticated
  using (true)
  with check (true);

grant select, insert, update, delete
  on public.hospital_settings, public.patients, public.lab_orders, public.appointments
  to anon, authenticated;
