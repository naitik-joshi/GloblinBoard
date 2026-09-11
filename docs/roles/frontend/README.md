# Frontend Role

## Owner
Member C

## Main Goal
Build a clean, simple and responsive task-board experience without depending directly on Supabase internals.

## Owned Paths
- `src/components/board/**`
- `src/components/ui/**`

## Tasks
- Board with Todo / Doing / Done columns.
- `TaskCard` component.
- Add-task form/modal component.
- Priority badge.
- Assignee display/select.
- Empty, loading and error presentation components where required.
- Responsive layout.

## Input Contract
Use the shared `Task`, `TaskStatus`, `TaskPriority` and `CreateTaskInput` types. Do not create a second competing task interface.

## Do Not Edit Without Coordination
- `src/app/**`
- `src/server/**`
- `src/lib/supabase/**`
- `src/types/**`
- `supabase/migrations/**`
- environment files

If a backend or shared contract change is needed, tell the integration owner first.
