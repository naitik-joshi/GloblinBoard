# Task Contract

## Shared Types

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

## Create Input

```ts
export interface CreateTaskInput {
  title: string;
  description?: string;
  assignee: string;
  priority: TaskPriority;
  status?: TaskStatus;
}
```

## Required Operations
- `listTasks(): Promise<Task[]>`
- `createTask(input: CreateTaskInput): Promise<Task>`
- `updateTaskStatus(id: string, status: TaskStatus): Promise<Task>`
- `deleteTask(id: string): Promise<void>`

## Contract Rules
- Frontend does not rename fields locally.
- Backend maps database snake_case to the shared application type.
- Any contract change must be announced before code is changed.
- Integration member updates this document and `src/types` first when a shared contract must change.
