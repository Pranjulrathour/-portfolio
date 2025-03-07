-- Add admin user with specific credentials
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, phone, phone_confirmed_at, confirmation_token, recovery_token, email_change_token_new, email_change, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at)
VALUES (
  gen_random_uuid(), 
  'pranjulrathour41@gmail.com', 
  crypt('pranjul1234', gen_salt('bf')), 
  now(), 
  now(), 
  now(), 
  '{"provider":"email","providers":["email"]}', 
  '{"full_name":"Pranjul Rathour"}', 
  false, 
  NULL, 
  NULL, 
  '', 
  '', 
  '', 
  '', 
  '', 
  NULL, 
  false, 
  NULL
)
ON CONFLICT (email) DO NOTHING;

-- Get the user ID for the admin user
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'pranjulrathour41@gmail.com';
  
  -- Create profile for admin user if it doesn't exist
  INSERT INTO public.profiles (id, full_name, avatar_url, website, bio, is_admin, created_at, updated_at)
  VALUES (
    admin_user_id,
    'Pranjul Rathour',
    NULL,
    NULL,
    'Portfolio Admin',
    true,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET is_admin = true;
  
END $$;
