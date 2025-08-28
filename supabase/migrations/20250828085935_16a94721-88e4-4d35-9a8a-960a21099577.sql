-- Fix RLS recursion by introducing a SECURITY DEFINER role-check and updating policies
-- 1) Create a SECURITY DEFINER helper to check admin role without triggering RLS on profiles
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- 2) Update policies on profiles to avoid self-referencing recursion
-- Drop the recursive policy
drop policy if exists "Admins can view all profiles" on public.profiles;

-- Recreate the policy using the helper function (no recursion)
create policy "Admins can view all profiles"
on public.profiles
for select
using (public.is_admin());

-- 3) Update admin policies on other tables to use the helper function as well
-- Events
drop policy if exists "Admins can manage events" on public.events;
create policy "Admins can manage events"
on public.events
for all
using (public.is_admin())
with check (public.is_admin());

-- Menu Items
drop policy if exists "Admins can manage menu items" on public.menu_items;
create policy "Admins can manage menu items"
on public.menu_items
for all
using (public.is_admin())
with check (public.is_admin());

-- Orders
drop policy if exists "Admins can view and manage all orders" on public.orders;
create policy "Admins can view and manage all orders"
on public.orders
for all
using (public.is_admin())
with check (public.is_admin());

-- Order Items
drop policy if exists "Admins can view and manage all order items" on public.order_items;
create policy "Admins can view and manage all order items"
on public.order_items
for all
using (public.is_admin())
with check (public.is_admin());