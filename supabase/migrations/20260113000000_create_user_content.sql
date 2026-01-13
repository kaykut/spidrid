-- Migration: create_user_content
-- Purpose: Store all user-generated and imported content (imported, generated, curriculum)

CREATE TABLE IF NOT EXISTS user_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  UNIQUE(user_id, item_id)
);

-- Create index for efficient queries by user_id and item_type
CREATE INDEX IF NOT EXISTS idx_user_content_user_id ON user_content(user_id);
CREATE INDEX IF NOT EXISTS idx_user_content_user_type ON user_content(user_id, item_type);

ALTER TABLE user_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own content" ON user_content
  FOR ALL USING (auth.uid() = user_id);
