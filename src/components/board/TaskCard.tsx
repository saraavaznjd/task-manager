import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../../features/board/board.types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useState } from "react";
import { Modal } from "../Modal";
import { CreateTaskForm } from "../CreateTaskForm";
import { deleteTask, editTask } from "../../features/board/boardSlice";
import { Menu } from "@headlessui/react";
import { ConfirmDelete } from "../ConformDelete";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface TaskCardProps {
  task: Task;
  index: number;
  columnId: string
}

const TaskCard = ({ task, index, columnId }: TaskCardProps) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();

  const allTags = useSelector((state: RootState) => state.board.tags);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative bg-white p-3 mb-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <p className="font-medium text-gray-800">{task.title}</p>

          <Menu as="div" className="absolute right-2 top-2">
            <Menu.Button
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-32 bg-white border rounded shadow">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`block w-full text-left px-3 py-2 text-sm ${active ? "bg-gray-100" : ""
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`block w-full text-left px-3 py-2 text-sm text-red-600 ${active ? "bg-red-50" : ""
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmOpen(true);
                    }}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>


          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tagIds.map((tagId) => {
              const tag = allTags[tagId];
              if (!tag) return null;

              return (
                <span
                  key={tag.id}
                  className={`text-xs px-2 py-1 rounded ${tag.color}`}
                >
                  {tag.label}
                </span>
              );
            })}
          </div>

          {/* Priority Indicator */}
          <div className="mt-2">
            {task.priority === "high" && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-md">
                High
              </span>
            )}

            {task.priority === "medium" && (
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-md">
                Medium
              </span>
            )}

            {task.priority === "low" && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-md">
                Low
              </span>
            )}
          </div>

          {/*Edit Modal */}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Edit Task"
          >
            <CreateTaskForm
              initialValues={{
                title: task.title,
                description: task.description ?? "",
                priority: task.priority,
                deadline: task.deadline ?? undefined,
                tags: task.tagIds,
              }}
              onSubmit={(data) => {
                dispatch(editTask({ id: task.id, ...data }));
                setOpen(false);
              }}
            />
          </Modal>


          {/*Delete Modal */}
          <Modal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Delete Task"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ConfirmDelete
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => {
                  dispatch(deleteTask({ taskId: task.id, columnId }));
                  setConfirmOpen(false);
                }}
              />
            </div>
          </Modal>


        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
