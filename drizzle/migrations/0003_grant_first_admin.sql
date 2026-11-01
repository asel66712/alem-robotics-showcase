CREATE UNIQUE INDEX IF NOT EXISTS user_roles_user_role_uniq ON public.user_roles (user_id, role);
INSERT INTO public.profiles (id) SELECT id FROM auth.users WHERE lower(email) = 'asel66712@gmail.com' ON CONFLICT DO NOTHING;
INSERT INTO public.user_roles (user_id, role) SELECT id, 'admin'::public.app_role FROM auth.users WHERE lower(email) = 'asel66712@gmail.com' ON CONFLICT DO NOTHING;