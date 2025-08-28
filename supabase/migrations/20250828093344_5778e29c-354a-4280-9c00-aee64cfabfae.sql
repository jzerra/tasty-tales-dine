-- Remove the foreign key constraint and change menu_item_id to integer
-- This allows referencing both products (integer ID) and menu_items (UUID)

-- Drop the foreign key constraint
ALTER TABLE public.order_items 
DROP CONSTRAINT IF EXISTS order_items_menu_item_id_fkey;

-- Change menu_item_id to text to accommodate both integer and UUID references
ALTER TABLE public.order_items 
ALTER COLUMN menu_item_id TYPE text;

-- Add check constraint to ensure valid format
ALTER TABLE public.order_items 
ADD CONSTRAINT menu_item_id_valid_format 
CHECK (menu_item_id ~ '^[0-9]+$' OR menu_item_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');

-- Update comment
COMMENT ON COLUMN public.order_items.menu_item_id IS 'Can reference either products.id (integer as string) or menu_items.id (UUID)';