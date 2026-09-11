import { createClient } from "@/lib/supabase/server";
import type {
  Task,
  CreateTaskInput,
  TaskPriority,
  TaskStatus,
} from "@/types/task";

const VALID_PRIORITIES: readonly TaskPriority[] = ["low", "medium", "high"];
const VALID_STATUSES: readonly TaskStatus[] = ["todo", "doing", "done"];

interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  assignee: string;
  priority: string;
  status: string;
  created_at: string;
}

/**
 * Maps a database task row (snake_case) to the agreed application Task contract (camelCase).
 */
function mapRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? null,
    assignee: row.assignee,
    priority: row.priority as TaskPriority,
    status: row.status as TaskStatus,
    createdAt: row.created_at,
  };
}

/**
 * Retrieves all tasks from the database ordered by creation date ascending.
 */
export async function listTasks(): Promise<Task[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, description, assignee, priority, status, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to list tasks: ${error.message}`);
  }

  return (data as TaskRow[] | null ?? []).map(mapRowToTask);
}

/**
 * Inserts a new task row into the database and returns the created Task.
 */
export async function createTask(input: CreateTaskInput): Promise<Task> {
  if (!input) {
    throw new Error("Task input data is required.");
  }

  const title = input.title?.trim();
  if (!title) {
    throw new Error("Task title is required and cannot be empty.");
  }

  const assignee = input.assignee?.trim();
  if (!assignee) {
    throw new Error("Task assignee is required and cannot be empty.");
  }

  if (!input.priority || !VALID_PRIORITIES.includes(input.priority)) {
    throw new Error(
      `Invalid task priority "${input.priority}". Allowed values: ${VALID_PRIORITIES.join(", ")}.`
    );
  }

  const status: TaskStatus = input.status ?? "todo";
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(
      `Invalid task status "${status}". Allowed values: ${VALID_STATUSES.join(", ")}.`
    );
  }

  const description = input.description?.trim() ? input.description.trim() : null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
      assignee,
      priority: input.priority,
      status,
    })
    .select("id, title, description, assignee, priority, status, created_at")
    .single();

  if (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }

  if (!data) {
    throw new Error("Failed to create task: No data returned from database.");
  }

  return mapRowToTask(data as TaskRow);
}

/**
 * Updates the status of an existing task and returns the updated Task.
 */
export async function updateTaskStatus(
  id: string,
  status: TaskStatus
): Promise<Task> {
  const taskId = id?.trim();
  if (!taskId) {
    throw new Error("Task ID is required for updating status.");
  }

  if (!status || !VALID_STATUSES.includes(status)) {
    throw new Error(
      `Invalid task status "${status}". Allowed values: ${VALID_STATUSES.join(", ")}.`
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .select("id, title, description, assignee, priority, status, created_at")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to update task status: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Task with id "${id}" not found.`);
  }

  return mapRowToTask(data as TaskRow);
}

/**
 * Deletes a task by ID. Throws an error if the task is not found.
 */
export async function deleteTask(id: string): Promise<void> {
  const taskId = id?.trim();
  if (!taskId) {
    throw new Error("Task ID is required for deletion.");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .select("id");

  if (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`Task with id "${id}" not found.`);
  }
}
