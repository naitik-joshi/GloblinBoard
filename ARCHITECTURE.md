# GoblinBoard Architecture

## Purpose
Keep the architecture intentionally simple while still practising the same boundaries we may use in the hackathon.

## Stack
- **Next.js + React + TypeScript** — application, routing and integration layer.
- **Tailwind CSS** — responsive UI styling.
- **Supabase** — managed backend service.
- **PostgreSQL** — task persistence through Supabase.
- **GitHub** — source control, branches and PRs.
- **Vercel** — optional deployment.

## High-Level Flow

```text
Browser
  |
  v
Next.js App
  |
  +--> Board UI / Forms
  |
  +--> Task data functions / actions
             |
             v
        Supabase Client
             |
             v
         PostgreSQL
          tasks table
```

## Task Data Contract

The whole team should agree on this shape before parallel coding begins:

```ts
export type TaskStatus = "todo" | "doing" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
}
```

The exact database field naming may use snake_case, but application code should expose one agreed TypeScript shape.

## Database

### `tasks`
- `id` UUID primary key
- `title` text not null
- `description` text nullable
- `assignee` text not null
- `priority` text/check constraint
- `status` text/check constraint
- `created_at` timestamptz default now()

No user table is needed for this practice project. Team member names may be stored as simple predefined strings.

## Folder Ownership Boundaries

```text
src/
  app/                     # integration member owns routing/wiring
  components/
    board/                 # frontend member owns visual board components
    ui/                    # frontend member owns small reusable UI pieces
  lib/
    supabase/              # backend member owns Supabase setup/helpers
  server/
    tasks/                 # backend member owns task data functions
  types/                   # integration member owns shared contracts
  config/                  # integration member owns shared constants
supabase/
  migrations/              # backend member only

docs/
  roles/
    frontend/
    backend/
    integration/
  contracts/
```

## Integration Rule
The public contract between frontend and backend is the `Task` type plus a small set of task operations:

- `listTasks()`
- `createTask(input)`
- `updateTaskStatus(id, status)`
- `deleteTask(id)`

If one side needs to change this contract, announce it first and let the integration owner update the shared type/contract. Do not silently change field names from one branch.
