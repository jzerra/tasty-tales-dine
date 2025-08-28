-- Completely disable Row Level Security for orders and order_items tables
-- This allows unauthenticated users to place orders without any restrictions

-- Disable RLS on orders table
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- Disable RLS on order_items table  
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;

-- Drop existing policies since RLS is now disabled
DROP POLICY IF EXISTS "Admins can view and manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Public can create orders" ON public.orders;
DROP POLICY IF EXISTS "Public can update orders" ON public.orders;

DROP POLICY IF EXISTS "Admins can view and manage all order items" ON public.order_items;
DROP POLICY IF EXISTS "Public can create order items" ON public.order_items;