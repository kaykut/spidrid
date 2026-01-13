-- Migration: create_user_certificates
-- Purpose: Store earned certificates for speed milestones and article completions

CREATE TABLE IF NOT EXISTS user_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  cert_id TEXT NOT NULL,
  data JSONB NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, cert_id)
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_user_certificates_user_id ON user_certificates(user_id);

ALTER TABLE user_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own certificates" ON user_certificates
  FOR ALL USING (auth.uid() = user_id);
