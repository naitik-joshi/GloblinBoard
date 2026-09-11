# GoblinBoard — Frontend Design System

## 1. Purpose

This document defines the visual and interaction language for the GoblinBoard frontend. The goal is a clean, professional, hackathon-ready task board that is easy to scan and fast to operate.

The design system applies primarily to:

- `src/components/board/**`
- `src/components/ui/**`

The frontend must respect the shared application contract and must not depend directly on Supabase internals.

---

## 2. Product Personality

GoblinBoard should feel:

- **Clean** — no unnecessary decoration.
- **Focused** — tasks and status are the visual priority.
- **Modern** — contemporary SaaS/product-board styling.
- **Friendly** — subtle personality without looking like a toy.
- **Fast** — interactions should feel immediate and predictable.
- **Professional** — suitable for demonstrating the project during a hackathon.

Avoid:

- Excessive gradients.
- Excessive glassmorphism.
- Huge decorative illustrations.
- Overly rounded everything.
- Heavy shadows.
- Animation that distracts from task management.
- Features outside the roadmap.

---

## 3. Recommended Visual Direction

### Theme

Use a **dark-first neutral interface** with restrained accent colors.

Suggested foundation:

- Page background: near-black / very dark neutral.
- Surface: dark neutral slightly lighter than the page.
- Elevated surface: another small contrast step.
- Primary text: near-white.
- Secondary text: muted neutral.
- Borders: subtle neutral.
- Primary accent: one consistent brand accent.
- Status colors: semantic and used consistently.

The existing starter page already uses a dark visual direction, so the frontend should evolve that direction rather than introduce an unrelated theme.

### Color principle

Do not assign colors arbitrarily to individual components.

Use semantic roles:

- `background`
- `surface`
- `surface-elevated`
- `border`
- `text-primary`
- `text-secondary`
- `text-muted`
- `accent`
- `success`
- `warning`
- `danger`

Status colors should communicate meaning:

- Todo → neutral/blue family.
- Doing → amber/orange family.
- Done → green family.
- High priority → danger/red family.
- Medium priority → warning/amber family.
- Low priority → neutral/blue/green family.

Keep status and priority visually distinct so users do not confuse them.

---

## 4. Typography

Use the application's existing font setup unless there is a strong reason to change it.

Hierarchy:

- Page title: strong, large, compact.
- Section/column title: medium-large and semibold.
- Task title: readable and semibold.
- Metadata: small and muted.
- Labels/badges: compact, medium weight.
- Helper/error text: small but readable.

Recommended Tailwind scale:

- Page title: `text-2xl` to `text-4xl`
- Column title: `text-base` to `text-lg`
- Task title: `text-sm` to `text-base`
- Metadata: `text-xs` to `text-sm`

Avoid using too many font sizes.

---

## 5. Spacing

Use a consistent spacing rhythm based on Tailwind's spacing scale.

Recommended principles:

- Page padding: responsive `p-4` / `p-6` / `p-8`.
- Board gap: approximately `gap-4` to `gap-6`.
- Column internal spacing: approximately `gap-3` to `gap-4`.
- Card internal spacing: approximately `p-4`.
- Form field spacing: approximately `gap-3` to `gap-4`.

Prefer consistent spacing over pixel-perfect one-off values.

---

## 6. Layout

### Desktop

Use a three-column board:

```text
----------------------------------------------------
| Header / Board controls                           |
----------------------------------------------------
| TODO             | DOING            | DONE        |
|                  |                  |             |
| Task card        | Task card        | Task card   |
| Task card        |                  | Task card   |
|                  |                  |             |
----------------------------------------------------
```

Columns should have:

- Clear headings.
- Optional task count.
- Consistent surface treatment.
- Enough vertical space for multiple cards.
- Independent scrolling if necessary.

### Mobile

Do not force three narrow columns onto a phone.

Use a responsive strategy such as:

- horizontally scrollable columns, or
- stacked columns.

Choose the option that best preserves usability and visual clarity.

---

## 7. Board Column

Each column should communicate:

1. Status.
2. Number of tasks.
3. Task list.
4. Empty state when no tasks exist.

Column visual hierarchy:

- Column header → strongest.
- Task cards → primary content.
- Task count / supporting information → secondary.

Do not make every column visually loud.

---

## 8. Task Card

A task card should expose the most important information immediately:

```text
Task title
Short description (when available)

[Priority]   Assignee
```

For the P0 board, prioritize:

- title
- assignee
- priority
- status/action controls

Description display belongs to P1 unless the team decides otherwise.

### Card behavior

Cards should have:

- clear boundaries,
- subtle hover feedback,
- readable text,
- enough padding,
- obvious interactive controls.

Avoid putting too many controls directly on the card.

---

## 9. Priority Badge

Priority should be represented by a compact semantic badge.

Example:

```text
HIGH
MEDIUM
LOW
```

Rules:

- Use consistent shape and padding.
- Keep text short.
- Ensure sufficient contrast.
- Do not rely on color alone.
- Use the same priority mapping everywhere.

---

## 10. Assignee

The assignee should be visible without overwhelming the card.

Possible presentation:

```text
👤 Sambhav
```

or a compact avatar/initial plus name.

Use the predefined team configuration where applicable. Do not create a second team/member data source inside the frontend.

---

## 11. Add Task UI

Prefer a modal/dialog or clearly separated form rather than placing a large form permanently above the board.

Required fields:

- Title
- Assignee
- Priority

Optional:

- Description
- Initial status if the integration contract supports it

The form should have:

- clear labels,
- useful defaults,
- validation,
- disabled/submitting state,
- success/error feedback.

The primary action should be visually obvious.

---

## 12. Status Changes

The user must be able to change a task's status.

For P0, favor a simple interaction that is reliable and easy to understand.

Possible approaches:

- status dropdown/select on the card,
- action menu,
- drag-and-drop only if it does not introduce unnecessary complexity.

For a one-day warm-up project, **reliable status selection is preferred over complex drag-and-drop**.

If drag-and-drop is added later, it should not replace a clear accessible status mechanism.

---

## 13. Delete Action

Delete should be visually secondary because it is destructive.

Recommended:

- subtle icon/button,
- danger styling on hover,
- confirmation for accidental deletion risk.

The UI must clearly distinguish Delete from normal actions.

---

## 14. Loading State

Avoid a blank screen while data is loading.

Use:

- skeleton cards, or
- a compact loading indicator.

Skeletons are preferred when the board structure is already known because they preserve layout stability.

---

## 15. Empty State

Each empty column should explain the state simply.

Example:

```text
No tasks here yet
```

Optional supporting text:

```text
Create a task or move one here.
```

Do not use large illustrations for the MVP.

---

## 16. Error State

Errors should be understandable and actionable.

Example:

```text
Something went wrong while loading tasks.
[Try again]
```

Avoid exposing raw Supabase/database errors to users.

---

## 17. Interaction States

Every interactive element should account for:

- default
- hover
- focus
- active
- disabled
- loading
- error where applicable

Keyboard focus must remain visible.

Do not rely exclusively on hover interactions.

---

## 18. Accessibility

Minimum requirements:

- Semantic HTML.
- Labels for form controls.
- Buttons must have understandable accessible names.
- Sufficient color contrast.
- Keyboard-accessible controls.
- Visible focus states.
- Do not communicate meaning through color alone.
- Avoid unnecessarily tiny click targets.

Accessibility is part of the implementation, not a post-processing step.

---

## 19. Animation

Animation should be subtle.

Good:

- button hover transitions,
- card hover elevation/border transition,
- modal enter/exit,
- small status-change feedback.

Avoid:

- excessive bouncing,
- long transitions,
- animated backgrounds,
- distracting particle effects.

P2 may include a tiny completion celebration when a task reaches Done, but it must not delay the workflow.

---

## 20. Component Architecture

Keep components small and purposeful.

Suggested frontend structure:

```text
src/components/
├── board/
│   ├── Board.tsx
│   ├── BoardColumn.tsx
│   ├── TaskCard.tsx
│   ├── AddTaskModal.tsx
│   └── ...
└── ui/
    ├── Button.tsx
    ├── Badge.tsx
    ├── Modal.tsx
    ├── Select.tsx
    ├── EmptyState.tsx
    ├── LoadingState.tsx
    └── ...
```

Names are suggestions, not mandatory filenames. Follow the existing project structure and avoid creating unnecessary abstractions.

---

## 21. Frontend Boundary

The frontend owns the visual board components and reusable UI components.

Do not directly modify or depend on:

- `src/server/**`
- `src/lib/supabase/**`
- `src/types/**`
- `supabase/migrations/**`
- environment files

The frontend consumes the shared `Task`, `TaskStatus`, `TaskPriority`, and `CreateTaskInput` contracts.

If a backend/shared contract change is required, notify the integration owner first.

---

## 22. P0 Visual Priorities

If time becomes limited, prioritize in this order:

1. Responsive three-column board.
2. Clear task cards.
3. Add-task experience.
4. Status change interaction.
5. Delete interaction.
6. Loading state.
7. Empty state.
8. Error state.
9. Small visual polish.
10. Advanced animation.

Functionality always wins over decorative polish.

---

## 23. P1/P2 Visual Features

Only after P0 is stable:

### P1

- Better task editing UI.
- Assignee filtering.
- Description display.
- Improved loading/error/empty states.
- Deployment polish.

### P2

- Realtime updates.
- Small Done celebration.
- Dark mode toggle if a light theme is also designed.

Do not let P1/P2 work destabilize the P0 workflow.

---

## 24. Design Review Checklist

Before considering the frontend complete:

- [ ] Board clearly shows Todo / Doing / Done.
- [ ] Cards are easy to scan.
- [ ] Priority is immediately recognizable.
- [ ] Assignee is visible.
- [ ] Add task is obvious.
- [ ] Status changes are obvious.
- [ ] Delete is safe and understandable.
- [ ] Empty states exist.
- [ ] Loading state exists.
- [ ] Error state exists.
- [ ] Desktop layout works.
- [ ] Mobile layout works.
- [ ] Keyboard focus is visible.
- [ ] No UI depends directly on Supabase.
- [ ] No duplicate task type exists.
- [ ] No P1/P2 feature has been allowed to destabilize P0.

---

## 25. Design Principle for the Hackathon

The board should look like a small real product, not a collection of UI components.

Every design decision should answer:

> Does this make it faster or clearer for a team member to understand and manage tasks?

If not, leave it out.
