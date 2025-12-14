import { Listbox } from "@headlessui/react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagSelect({ value, onChange }: Props) {
  const tags = Object.values(
    useSelector((state: RootState) => state.board.tags)
  );

  return (
    <Listbox value={value} onChange={onChange} multiple>
      <div className="relative">
        <Listbox.Button className="w-full border rounded px-3 py-2 text-left">
          {value.length === 0
            ? "Select tags"
            : `${value.length} tag(s) selected`}
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
          {tags.map((tag) => (
            <Listbox.Option
              key={tag.id}
              value={tag.id}
              className={({ active }) =>
                `cursor-pointer px-3 py-2 ${
                  active ? "bg-gray-100" : ""
                }`
              }
            >
              <span className={`px-2 py-1 rounded text-xs ${tag.color}`}>
                {tag.label}
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
