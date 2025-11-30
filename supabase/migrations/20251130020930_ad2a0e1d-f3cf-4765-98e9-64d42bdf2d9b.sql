-- Create admin user account and role
-- The auth.users table is managed by Supabase, so we'll create a function to handle user creation and role assignment

-- First, check if user already exists and create if not
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Try to get existing user
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@ngfamilyshield.com';
  
  -- If user doesn't exist, we need to create it via signup (this should be done through the Auth page first time)
  -- For now, we'll just prepare the admin role assignment
  
  -- If user exists, assign admin role
  IF admin_user_id IS NOT NULL THEN
    -- Delete existing admin roles
    DELETE FROM public.admin_roles WHERE user_id = admin_user_id;
    
    -- Insert admin role
    INSERT INTO public.admin_roles (user_id, role)
    VALUES (admin_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;