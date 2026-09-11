import React from "react";
import { Task, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";

interface BoardColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskUpdate: () => void;
}

export function BoardColumn({ title, tasks, onTaskUpdate }: BoardColumnProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-neutral-950/50 p-4 border border-neutral-800/50 min-w-[300px] sm:min-w-0">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-semibold text-neutral-200">{title}</h3>
        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-neutral-800 px-2 text-xs font-medium text-neutral-400">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-[150px]">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={onTaskUpdate} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 rounded-lg border border-dashed border-neutral-800 bg-neutral-900/30 text-center">
            <p className="text-sm text-neutral-500">No tasks here yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
