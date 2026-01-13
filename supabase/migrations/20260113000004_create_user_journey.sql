-- Migration: create_user_journey
-- Purpose: Store journey statistics (total words read, streak data, level progress)

CREATE TABLE IF NOT EXISTS user_journey (
  user_id UUID PRIMARY KEY REFERENCES auth.users,
  stats JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_journey ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own journey" ON user_journey
  FOR ALL USING (auth.uid() = user_id);
