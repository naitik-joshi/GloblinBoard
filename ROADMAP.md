# GoblinBoard Roadmap

## P0 — Must Work

### Foundation
- Create Next.js + TypeScript + Tailwind project.
- Configure Supabase client/server helpers.
- Add `.env.example`.
- Create `tasks` table migration.
- Define and freeze the shared `Task` contract.

### Board
- Load tasks from Supabase.
- Render Todo / Doing / Done columns.
- Render task cards with title, assignee and priority.

### Task Actions
- Add a task.
- Change task status.
- Delete a task.
- Refresh/revalidate board after mutations.

### Team / Delivery
- Work only through feature branches.
- Merge through reviewed PRs or explicit teammate review.
- Keep `main` runnable.
- Test the full flow after every merge batch.

## P1 — Only After P0 Is Stable
- Edit task details.
- Filter by assignee.
- Add description display.
- Improve empty/loading/error states.
- Deploy to Vercel.

## P2 — Fun Stretch
- Supabase Realtime updates.
- Tiny celebration when a task moves to Done.
- Dark mode.

## Explicit Non-Goals
- Authentication.
- Notifications.
- AI features.
- Comments.
- File uploads.
- Calendar integration.
- Complex permissions.
- Multiple workspaces.

## Stop Condition
Once the three members can create, update, move and delete tasks from a deployed or locally integrated build, stop adding features and run a 10-minute team retrospective.
