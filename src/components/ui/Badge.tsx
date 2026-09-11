import React from "react";
import { TaskPriority, TaskStatus } from "@/types/task";

interface BadgeProps {
  type: "priority" | "status";
  value: TaskPriority | TaskStatus;
}

export function Badge({ type, value }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wider";

  const priorityStyles: Record<TaskPriority, string> = {
    low: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    high: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  const statusStyles: Record<TaskStatus, string> = {
    todo: "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20",
    doing: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    done: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  };

  const styles = type === "priority" ? priorityStyles : statusStyles;

  return (
    <span className={`${baseStyles} ${styles[value as keyof typeof styles]}`}>
      {value}
    </span>
  );
}
