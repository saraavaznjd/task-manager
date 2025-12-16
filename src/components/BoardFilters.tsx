import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Priority } from "../features/board/board.types";

const priorities: (Priority | "all")[] = ["all", "low", "medium", "high"];

export function BoardFilters({
  onChange,
}: {
  onChange: (v: {
    query: string;
    priority: Priority | "all";
    tagIds: string[];
  }) => void;
}) {
  const tags = Object.values(
    useSelector((s: RootState) => s.board.tags)
  );

  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<Priority | "all">("all");
  const [tagIds, setTagIds] = useState<string[]>([]);

  return (
    <div className="flex gap-3 items-center mb-4">
      {/* Search */}
      <input
        placeholder="Search tasks..."
        className="border rounded px-3 py-2 w-64"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange({ query: e.target.value, priority, tagIds });
        }}
      />

      {/* Priority */}
      <Listbox
        value={priority}
        onChange={(v) => {
          setPriority(v);
          onChange({ query, priority: v, tagIds });
        }}
      >
        <div className="relative">
          <Listbox.Button className="border rounded px-3 py-2">
            Priority: {priority}
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 bg-white border rounded shadow">
            {priorities.map((p) => (
              <Listbox.Option
                key={p}
                value={p}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {p}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {/* Tags */}
      <Listbox
        value={tagIds}
        onChange={(v) => {
          setTagIds(v);
          onChange({ query, priority, tagIds: v });
        }}
        multiple
      >
        <div className="relative">
          <Listbox.Button className="border rounded px-3 py-2">
            Tags ({tagIds.length})
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 bg-white border rounded shadow">
            {tags.map((t) => (
              <Listbox.Option
                key={t.id}
                value={t.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                <span className={`px-2 py-1 rounded text-xs ${t.color}`}>
                  {t.label}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
