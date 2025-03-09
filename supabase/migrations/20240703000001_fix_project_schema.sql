-- Fix any issues with the projects table
ALTER TABLE IF EXISTS public.projects
  ALTER COLUMN content TYPE TEXT,
  ALTER COLUMN description TYPE TEXT;

-- Ensure project_technologies table exists
CREATE TABLE IF NOT EXISTS public.project_technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  technology TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for projects
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_technologies;
