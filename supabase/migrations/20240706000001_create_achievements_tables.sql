-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  place TEXT NOT NULL,
  product TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  secondary_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public achievements are viewable by everyone" ON achievements;
CREATE POLICY "Public achievements are viewable by everyone"
  ON achievements FOR SELECT
  USING (true);

-- Enable realtime
alter publication supabase_realtime add table achievements;
