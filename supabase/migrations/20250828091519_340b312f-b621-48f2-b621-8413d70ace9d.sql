-- Allow public (unauthenticated) users to place orders and order items
-- Drop existing restrictive policies and recreate with public access

-- Orders table - allow public inserts
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Public can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Order items table - allow public inserts  
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;
CREATE POLICY "Public can create order items"
ON public.order_items
FOR INSERT
WITH CHECK (true);

-- Also allow public to update orders (for payment status updates from webhooks)
CREATE POLICY "Public can update orders"
ON public.orders
FOR UPDATE
USING (true)
WITH CHECK (true);