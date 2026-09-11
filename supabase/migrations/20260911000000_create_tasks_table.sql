-- Supabase migration: create tasks table for GoblinBoard
-- Timestamp: 20260911000000

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  assignee text not null,
  priority text not null check (priority in ('low', 'medium', 'high')),
  status text not null default 'todo' check (status in ('todo', 'doing', 'done')),
  created_at timestamptz not null default now()
);

-- Index for ordering by creation timestamp
create index if not exists idx_tasks_created_at on tasks (created_at desc);
