-- Fix order_items table to match products table ID format
-- Since products use SERIAL (integer) IDs, but menu_items use UUID

-- First, let's check if we need to change menu_item_id to integer to match products
-- The cart uses integer IDs, so menu_item_id should be integer too

ALTER TABLE public.order_items 
ALTER COLUMN menu_item_id TYPE integer USING menu_item_id::text::integer;

-- Add comment for clarity
COMMENT ON COLUMN public.order_items.menu_item_id IS 'References products.id or menu_items.id depending on source';