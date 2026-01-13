-- Migration: create_user_settings
-- Purpose: Store user preferences (theme, default WPM, reading language)

CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users,
  settings JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own settings" ON user_settings
  FOR ALL USING (auth.uid() = user_id);
