-- Migration: create_user_progress
-- Purpose: Store reading progress per article/content item

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  content_id TEXT NOT NULL,
  progress JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);
