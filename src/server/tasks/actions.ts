"use server";

import {
  listTasks as getTasks,
  createTask as insertTask,
  updateTaskStatus as mutateTaskStatus,
  deleteTask as removeTask,
} from "./tasks";
import { CreateTaskInput, Task, TaskStatus } from "@/types/task";
import { revalidatePath } from "next/cache";

export async function listTasks(): Promise<Task[]> {
  return getTasks();
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const task = await insertTask(input);
  revalidatePath("/");
  return task;
}

export async function updateTaskStatus(
  id: string,
  status: TaskStatus
): Promise<Task> {
  const task = await mutateTaskStatus(id, status);
  revalidatePath("/");
  return task;
}

export async function deleteTask(id: string): Promise<void> {
  await removeTask(id);
  revalidatePath("/");
}

