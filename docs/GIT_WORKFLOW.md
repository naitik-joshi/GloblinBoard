# Git and GitHub Workflow

## Main Rule
`main` should stay runnable.

## Before Coding
```bash
git checkout main
git pull
git checkout -b <branch-name>
```

## Commit Style
Use small commits such as:

```text
chore: scaffold project structure
feat: add Supabase task queries
feat: add task board columns
feat: add create task form
fix: map database status correctly
```

Avoid commits such as:

```text
stuff
final
working now
changes
```

## Merge Flow
1. Push branch.
2. Ask one teammate to review changed files quickly.
3. Pull latest `main` into the branch if necessary.
4. Resolve conflicts on the feature branch, not directly on `main`.
5. Merge.
6. Pull `main` and smoke-test the app.

## Conflict Prevention
- Do not format/rewrite unrelated files.
- Do not rename shared folders mid-task.
- Do not change shared interfaces silently.
- Avoid multiple people editing `src/app/page.tsx`.
- Integration owner does final page wiring.
- Backend owner is the only person changing migrations.

## AI Agent Rule
When using Codex/other coding agents, explicitly tell the agent which files/folders it may edit and which ones are off-limits.

Example:

> Only modify `src/components/board/**`. Do not edit `src/app/**`, `src/server/**`, `src/lib/**`, database migrations, package configuration, or shared types. If a shared change is required, stop and report it instead of making the change.
