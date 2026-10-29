CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete settings" ON public.site_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX site_items_section_idx ON public.site_items(section, sort_order);
GRANT SELECT ON public.site_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_items TO authenticated;
GRANT ALL ON public.site_items TO service_role;
ALTER TABLE public.site_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read items" ON public.site_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin insert items" ON public.site_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin update items" ON public.site_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin delete items" ON public.site_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (key, value) VALUES
('hero_tagline', 'Болашақ инженерлері. Жаңа идеялар. Үлкен мүмкіндіктер.'),
('about_intro', 'Біз — FIRST LEGO League Challenge бағдарламасына қатысатын оқушылар командасымыз. Бізді инженерия, бағдарламалау, инновация және командалық жұмыс біріктіреді.'),
('robot_intro', 'Робот сипаттамалары кейін қосылады.'),
('project_intro', 'Біздің инновациялық жобамыз. Толық мәліметтер кейін қосылады.'),
('achievements_intro', 'Жарыстар мен нәтижелер кейін қосылады.'),
('contact_intro', 'Серіктестік, сұрақтар немесе ұсыныстар бойынша хабарласыңыз.'),
('email', 'team@example.com'),
('instagram_url', 'https://www.instagram.com/alem_fll_challenge/'),
('instagram_handle', '@alem_fll_challenge'),
('tiktok_url', 'https://www.tiktok.com/@alem_fll_challenge'),
('tiktok_handle', '@alem_fll_challenge');

INSERT INTO public.site_items (section, title, body, sort_order) VALUES
('about', 'Инженерия', 'Механизмдерді жобалап, құрастырып, сынақтан өткіземіз.', 1),
('about', 'Бағдарламалау', 'Роботтың әр қимылын нақты әрі сенімді алгоритмдермен басқарамыз.', 2),
('about', 'Инновация', 'Нақты мәселелерді зерттеп, жаңа шешімдер ұсынамыз.', 3),
('about', 'Командалық жұмыс', 'Бір-бірімізден үйреніп, ортақ мақсатқа бірге жетеміз.', 4),
('robot', 'Миссиялар', 'Маусым алаңындағы миссияларды талдап, орындау стратегиясын құрамыз.', 1),
('robot', 'Механизмдер', 'Ауыстырмалы қосымшалар мен жетектер миссияларға арнайы жасалады.', 2),
('robot', 'Бағдарламалау', 'Датчиктер мен моторларды басқаратын модульдік код жазамыз.', 3),
('robot', 'Инженерлік процесс', 'Жобалау → құрастыру → сынау → жетілдіру циклі.', 4),
('project', 'Мәселе', 'BIOGLOW жобасы шешетін мәселенің сипаттамасы кейін қосылады.', 1),
('project', 'Зерттеу', 'Сарапшылармен сұхбаттар мен жиналған деректер осында жазылады.', 2),
('project', 'Шешім', 'Команда ұсынған идеяның қысқаша сипаттамасы.', 3),
('project', 'Прототип', 'Прототиптің құрылымы мен сынақ кезеңдері.', 4),
('project', 'Нәтижелер', 'Нәтижелер жоба аяқталғаннан кейін қосылады.', 5),
('leader', 'Халиева Жанна Янгибаева', 'Команда жетекшісі', 1),
('leader', 'Қошмұхан Әсел Аралбекқызы', 'Команда жетекшісі', 2);
UPDATE public.site_items SET subtitle = body, body = '' WHERE section = 'leader';
INSERT INTO public.site_items (section, title, subtitle, sort_order) VALUES
('member', 'Қуаныш Нұрәлім Нұрбергенұлы', 'Команда мүшесі', 1),
('member', 'Нұрулхан Кәусәр Алмасханқызы', 'Команда мүшесі', 2),
('member', 'Нұрболат Нұрсая Нұрсұлтанқызы', 'Команда мүшесі', 3),
('member', 'Сарнияз Айділдә Исламқызы', 'Команда мүшесі', 4),
('member', 'Көбен Мәди Айбарұлы', 'Команда мүшесі', 5),
('member', 'Алдиярбек Бексұлтан Қайратұлы', 'Команда мүшесі', 6),
('member', 'Паизхан Амир Тынышбекұлы', 'Команда мүшесі', 7);