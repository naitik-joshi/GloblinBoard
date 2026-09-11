import React, { useState } from "react";
import { CreateTaskInput, TaskPriority, TaskStatus } from "@/types/task";
import { TEAM_MEMBERS } from "@/config/team";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { createTask } from "@/server/tasks/actions";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddTaskModal({ isOpen, onClose, onSuccess }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<string>(TEAM_MEMBERS[0]);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const input: CreateTaskInput = {
        title,
        description,
        assignee,
        priority,
        status,
      };
      await createTask(input);
      setTitle("");
      setDescription("");
      setAssignee(TEAM_MEMBERS[0]);
      setPriority("medium");
      setStatus("todo");
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm border border-red-500/20">
            {error}
          </div>
        )}
        <Input
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Design landing page"
          autoFocus
          disabled={isSubmitting}
        />
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="description" className="text-sm font-medium text-neutral-300">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex min-h-[80px] w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Add more details..."
            disabled={isSubmitting}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            id="assignee"
            label="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            options={TEAM_MEMBERS.map((m) => ({ value: m, label: m }))}
            disabled={isSubmitting}
          />
          <Select
            id="priority"
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            disabled={isSubmitting}
          />
        </div>
        <Select
          id="status"
          label="Initial Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          options={[
            { value: "todo", label: "Todo" },
            { value: "doing", label: "Doing" },
            { value: "done", label: "Done" },
          ]}
          disabled={isSubmitting}
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
