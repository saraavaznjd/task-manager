import { useState } from "react";
import type { Priority } from "../features/board/board.types";
import { PrioritySelect } from "./PrioritySelect";
import { TagSelect } from "./TagSelect";

interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  deadline?: string;
  tags: string[];
}

interface Props {
  initialValues?: TaskFormValues;
  onSubmit: (data: TaskFormValues) => void;
}



export function CreateTaskForm({ onSubmit,initialValues }: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [priority, setPriority] = useState<Priority>(
    initialValues?.priority ?? "medium"
  );
  const [deadline, setDeadline] = useState(
    initialValues?.deadline?.slice(0, 10) ?? ""
  );
  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      priority,
      tags,
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

      {/* Tags */}
      <div>
        <label className="text-sm font-medium">Tags</label>
        <TagSelect value={tags} onChange={setTags} />
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
        {initialValues ? 'Edit Task' : 'Create Task'}
      </button>
    </form>
  );
}
