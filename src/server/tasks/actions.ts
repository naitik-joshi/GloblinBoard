"use server";

import { createClient } from "@/lib/supabase/server";
import { CreateTaskInput, Task, TaskStatus } from "@/types/task";
import { revalidatePath } from "next/cache";

export async function listTasks(): Promise<Task[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }

  return (data || []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    assignee: row.assignee,
    priority: row.priority,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title: input.title,
        description: input.description,
        assignee: input.assignee,
        priority: input.priority,
        status: input.status || "todo",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }

  revalidatePath("/");

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    assignee: data.assignee,
    priority: data.priority,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function updateTaskStatus(
  id: string,
  status: TaskStatus
): Promise<Task> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }

  revalidatePath("/");

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    assignee: data.assignee,
    priority: data.priority,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }

  revalidatePath("/");
}
