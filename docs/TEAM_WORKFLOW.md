# Three-Person Team Workflow

## Roles

### Member A — Integration / Coordination
Primary ownership:
- project scaffold and shared configuration;
- `src/app/**`;
- `src/types/**`;
- `src/config/**`;
- final wiring between UI and task functions;
- integration testing and deployment;
- resolving shared contract changes.

May help frontend/backend after integration is stable, but should avoid rewriting files owned by another member without coordination.

### Member B — Backend / Supabase
Primary ownership:
- `src/lib/supabase/**`;
- `src/server/tasks/**`;
- `supabase/migrations/**`;
- `.env.example` values/names;
- database mapping and CRUD functions;
- backend error handling.

Should not modify board components or page layout unless explicitly paired with the frontend/integration owner.

### Member C — Frontend / UI/UX
Primary ownership:
- `src/components/board/**`;
- `src/components/ui/**`;
- task card / board / task form UI;
- responsive states, badges, forms, empty/loading states.

Should not modify Supabase helpers, migrations or backend data functions.

## Communication Rules
1. Spend the first 10 minutes agreeing on the `Task` contract and file ownership.
2. Each member announces their branch before coding.
3. If you need a file owned by another member, message them first instead of editing it silently.
4. If a shared contract changes, stop and announce it before both sides continue.
5. Run a 5-minute integration checkpoint around the halfway point.
6. Merge small complete features instead of one giant final branch.
7. After each merge batch, one person runs the full user flow.

## Suggested Branches
- `setup/integration-shell`
- `feature/task-backend`
- `feature/board-ui`

After the first merge, create smaller branches only if needed:
- `feature/task-form`
- `feature/task-status`
- `fix/integration-*`

## Do Not Touch Rule
Treat folder ownership as the default lock. Cross-folder edits are allowed only when:
- the owner agrees;
- the change is very small and communicated;
- or you pair on the change together.

This is practice for preventing merge conflicts, not a permanent company rule.
