import { useState } from "react";
import type { Priority, Task } from "../features/board/board.types";
import { PrioritySelect } from "./PrioritySelect";

interface Props {
  onSubmit: (taskData: {
    title: string;
    description: string;
    priority: Priority;
    deadline?: string;
  }) => void;
}

export function CreateTaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      priority,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Title */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          className="w-full border rounded px-3 py-2 mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2 mt-1 resize-none h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm font-medium">Priority</label>
        <PrioritySelect value={priority} onChange={setPriority} />
      </div>

      {/* Deadline */}
      <div>
        <label className="text-sm font-medium">Deadline</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2 mt-1"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Create Task
      </button>
    </form>
  );
}
