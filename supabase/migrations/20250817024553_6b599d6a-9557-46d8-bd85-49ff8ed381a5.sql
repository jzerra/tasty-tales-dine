-- First, create an admin user in the auth.users table
-- Note: This is a special case where we need to directly insert into auth schema
-- We'll create a function to handle this properly

-- Create a function to create an admin user
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Insert admin user into auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    role,
    aud,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin
  ) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'admin@restaurant.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    '',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Admin User"}',
    false
  ) RETURNING id INTO admin_user_id;

  -- Insert corresponding profile
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (admin_user_id, 'Admin User', 'admin');
END;
$$;

-- Execute the function to create the admin user
SELECT create_admin_user();

-- Drop the function after use
DROP FUNCTION create_admin_user();