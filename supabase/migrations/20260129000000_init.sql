-- Migration: init
-- Purpose: Base schema for Devoro sync data

create extension if not exists "pgcrypto";

create table if not exists user_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  item_id text not null,
  item_type text not null,
  data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz,
  unique (user_id, item_id)
);

create index if not exists idx_user_content_user_id on user_content (user_id);
create index if not exists idx_user_content_user_type on user_content (user_id, item_type);

alter table user_content enable row level security;

create policy "Users can CRUD own content" on user_content
  for all using (auth.uid() = user_id);
