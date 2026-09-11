# Backend Role

## Owner
Member B

## Main Goal
Provide a very small, predictable data layer for tasks so the UI never needs to understand Supabase details.

## Owned Paths
- `src/lib/supabase/**`
- `src/server/tasks/**`
- `supabase/migrations/**`
- `.env.example` variable names

## Tasks
- Supabase client/server helper setup.
- `tasks` table migration.
- `listTasks`.
- `createTask`.
- `updateTaskStatus`.
- `deleteTask`.
- Map snake_case database rows into the agreed `Task` type.
- Basic error handling.

## Do Not Edit Without Coordination
- `src/components/**`
- `src/app/**`
- `src/types/**`
- Tailwind/global layout files

If a shared type must change, report it to the integration owner instead of changing it locally.
