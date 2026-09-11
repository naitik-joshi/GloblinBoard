# Codex Prompt — Scaffold GoblinBoard Repository

Paste the following prompt into Codex while it is opened inside the GoblinBoard repository.

---

You are setting up a small coordination-practice project called **GoblinBoard**. This is a throwaway practice repository for a three-person team. Do not overengineer it and do not implement the full product yet.

## Goal
Prepare a clean Next.js + TypeScript + Tailwind + Supabase project structure that lets three developers work in parallel with minimal merge conflicts.

## Important constraints
- Preserve all existing planning/documentation files in this repository.
- Do **not** delete or rewrite `ROADMAP.md`, `ARCHITECTURE.md`, or anything under `docs/` unless a setup path in them is clearly impossible.
- Do not implement task CRUD or full UI in this setup task.
- Do not add authentication, AI, state libraries, component libraries, tests, or unrelated dependencies.
- Do not commit secrets.
- `.env.local` must remain ignored.
- `.env.example` must remain tracked.
- Prefer the latest stable Next.js setup using the App Router, TypeScript, ESLint, Tailwind CSS, a `src/` directory, and the `@/*` import alias.
- Install only the Supabase packages required for a modern Next.js integration (`@supabase/supabase-js` and `@supabase/ssr`) unless the current official setup requires a small additional package.

## Desired source structure
Create this structure, with minimal placeholder files only where Git needs them or where a stable import boundary is useful:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    board/
    ui/
  config/
  lib/
    supabase/
  server/
    tasks/
  types/
supabase/
  migrations/
docs/
  contracts/
  roles/
    frontend/
    backend/
    integration/
```

The existing docs folder should be preserved.

## Shared ownership rules
These are important because multiple developers will work at the same time:

- Frontend owner: `src/components/board/**`, `src/components/ui/**`
- Backend owner: `src/lib/supabase/**`, `src/server/tasks/**`, `supabase/migrations/**`
- Integration owner: `src/app/**`, `src/types/**`, `src/config/**`

Do not create duplicate task types in multiple folders.

## Setup work to perform
1. Scaffold/configure Next.js in the current repository while preserving existing docs.
2. Ensure TypeScript, Tailwind, ESLint, App Router and `src/` are configured correctly.
3. Install the Supabase packages listed above.
4. Keep the landing page extremely minimal; it may just display `GoblinBoard` and `Coordination practice project`.
5. Create `src/types/task.ts` containing only the agreed shared contracts from `docs/contracts/task-contract.md`.
6. Create `src/config/team.ts` with three clearly fake placeholder member names (`Member A`, `Member B`, `Member C`) as an exported array so the team can replace them later.
7. Create minimal Supabase helper files only if needed to establish the folder boundary, but do not implement task queries yet.
8. Ensure `.gitignore` protects local env files, build output, Vercel metadata and Supabase temporary files while keeping `.env.example` tracked.
9. Run lint/type checks/build if practical and fix setup errors only.
10. At the end, print:
   - files created/changed;
   - packages installed;
   - checks run and their results;
   - any manual setup still required;
   - exact suggested commit message.

## Do not implement yet
- task database migration;
- `listTasks` / create / update / delete;
- board columns;
- task form;
- Realtime;
- deployment.

This task is complete when the repository is cleanly scaffolded and each developer can start work in their owned folder without stepping on another member's files.
