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

export interface CreateTaskInput {
  title: string;
  description?: string;
  assignee: string;
  priority: TaskPriority;
  status?: TaskStatus;
}
