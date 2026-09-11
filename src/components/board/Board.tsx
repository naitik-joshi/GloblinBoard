"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Task } from "@/types/task";
import { BoardColumn } from "./BoardColumn";
import { AddTaskModal } from "./AddTaskModal";
import { Button } from "../ui/Button";
import { listTasks } from "@/server/tasks/actions";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const data = await listTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const doingTasks = tasks.filter((t) => t.status === "doing");
  const doneTasks = tasks.filter((t) => t.status === "done");

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-800 border-t-indigo-500"></div>
          <p className="text-neutral-400">Loading board...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-red-500/10 p-3">
          <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-neutral-100">Something went wrong</h3>
          <p className="mt-1 text-neutral-400">{error}</p>
        </div>
        <Button onClick={fetchTasks} variant="secondary" className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100">GoblinBoard</h1>
          <p className="text-sm text-neutral-400">Team Task & Delivery Board</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </Button>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 py-24 text-center bg-neutral-900/30">
          <div className="rounded-full bg-neutral-800 p-3 mb-4">
            <svg className="h-6 w-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-100">No tasks yet</h3>
          <p className="mt-1 text-neutral-400 max-w-sm mb-6">
            Get started by creating your first task to track work across the team.
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>Create your first task</Button>
        </div>
      ) : (
        <div className="flex flex-1 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex flex-1 min-w-max sm:min-w-0 grid-cols-1 sm:grid sm:grid-cols-3 gap-6 w-full">
            <BoardColumn title="TODO" status="todo" tasks={todoTasks} onTaskUpdate={fetchTasks} />
            <BoardColumn title="DOING" status="doing" tasks={doingTasks} onTaskUpdate={fetchTasks} />
            <BoardColumn title="DONE" status="done" tasks={doneTasks} onTaskUpdate={fetchTasks} />
          </div>
        </div>
      )}

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchTasks}
      />
    </div>
  );
}
