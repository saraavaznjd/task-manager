import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

export type Priority = "low" | "medium" | "high";

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "text-green-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "high", label: "High", color: "text-red-600" },
];

interface Props {
  value: Priority;
  onChange: (value: Priority) => void;
}

export function PrioritySelect({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full rounded border px-3 py-2 text-left bg-white">
            <span>
              {
                priorityOptions.find((p) => p.value === value)?.label
              }
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 w-full rounded bg-white border shadow-lg z-10">
              {priorityOptions.map((p) => (
                <Listbox.Option
                  key={p.value}
                  value={p.value}
                  className={({ active }) =>
                    `cursor-pointer select-none px-3 py-2 ${
                      active ? "bg-gray-100" : ""
                    }`
                  }
                >
                  <span className={p.color}>{p.label}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
