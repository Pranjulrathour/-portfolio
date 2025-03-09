-- Create projects table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  secondary_image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  duration TEXT,
  completion_date TEXT,
  role TEXT,
  client TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_technologies table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.project_technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  technology TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access" ON public.projects;
CREATE POLICY "Public read access" ON public.projects
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access" ON public.projects;
CREATE POLICY "Admin full access" ON public.projects
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

DROP POLICY IF EXISTS "Public read access" ON public.project_technologies;
CREATE POLICY "Public read access" ON public.project_technologies
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access" ON public.project_technologies;
CREATE POLICY "Admin full access" ON public.project_technologies
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE is_admin = true));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_technologies;
