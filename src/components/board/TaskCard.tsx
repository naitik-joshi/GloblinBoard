import React, { useState } from "react";
import { Task, TaskStatus } from "@/types/task";
import { Badge } from "../ui/Badge";
import { Select } from "../ui/Select";
import { updateTaskStatus, deleteTask } from "@/server/tasks/actions";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    if (newStatus === task.status) return;
    
    setIsUpdating(true);
    try {
      await updateTaskStatus(task.id, newStatus);
      onUpdate();
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete task", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className={`flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow-sm transition-all hover:border-neutral-700 ${isUpdating || isDeleting ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-neutral-100 break-words line-clamp-2 leading-snug">
          {task.title}
        </h4>
        <div className="flex-shrink-0">
          <Badge type="priority" value={task.priority} />
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-neutral-400 line-clamp-3">
          {task.description}
        </p>
      )}
      
      <div className="mt-2 flex items-center justify-between border-t border-neutral-800 pt-3">
        <div className="text-sm text-neutral-500 font-medium truncate max-w-[100px]">
          {task.assignee}
        </div>
        
        <div className="flex items-center gap-2">
          <Select
            label=""
            id={`status-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
            disabled={isUpdating || isDeleting}
            className="h-8 py-1 px-2 text-xs w-24 bg-neutral-800 border-neutral-700"
            options={[
              { value: "todo", label: "Todo" },
              { value: "doing", label: "Doing" },
              { value: "done", label: "Done" },
            ]}
          />
          <button
            onClick={handleDelete}
            disabled={isUpdating || isDeleting}
            className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
            aria-label="Delete task"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
