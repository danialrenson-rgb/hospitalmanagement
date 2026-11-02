alter table public.lab_orders
  add column if not exists items jsonb not null default '[]'::jsonb;

alter table public.lab_orders
  add column if not exists discount numeric(12, 2) not null default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'lab_orders_items_array_check'
      and conrelid = 'public.lab_orders'::regclass
  ) then
    alter table public.lab_orders
      add constraint lab_orders_items_array_check
      check (jsonb_typeof(items) = 'array');
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'lab_orders_discount_nonnegative_check'
      and conrelid = 'public.lab_orders'::regclass
  ) then
    alter table public.lab_orders
      add constraint lab_orders_discount_nonnegative_check
      check (discount >= 0);
  end if;
end
$$;
