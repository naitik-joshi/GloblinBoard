# Integration / Coordination Role

## Owner
Member A

## Main Goal
Keep the project boundaries stable and connect frontend + backend without taking over their owned folders.

## Owned Paths
- `src/app/**`
- `src/types/**`
- `src/config/**`
- root-level setup/config files when needed

## Tasks
- Scaffold project.
- Freeze shared `Task` contract.
- Provide team-member constants.
- Wire board components to task functions/actions.
- Handle page-level loading/revalidation behavior.
- Manage integration checkpoints.
- Resolve cross-feature issues.
- Run final smoke test.
- Optional Vercel deployment.

## Coordination Duty
When frontend and backend disagree about a contract, decide and update the shared contract once. Do not allow duplicate types or adapters to spread across the repo.

## Do Not Do
Do not casually rewrite frontend components or backend implementation. Pair with the folder owner when a cross-boundary change is required.
