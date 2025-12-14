import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../../features/board/board.types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useState } from "react";
import { Modal } from "../Modal";
import { CreateTaskForm } from "../CreateTaskForm";
import { editTask } from "../../features/board/boardSlice";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const allTags = useSelector((state: RootState) => state.board.tags);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-3 mb-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <p className="font-medium text-gray-800">{task.title}</p>

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

          <Modal open={open} onClose={() => setOpen(false)} title="Edit Task">
            <CreateTaskForm
              initialValues={{
                title: task.title,
                description: task.description ?? "",
                priority: task.priority,
                deadline: task.deadline ?? undefined,
                tags: task.tagIds,
              }}
              onSubmit={(data) => {
                dispatch(
                  editTask({
                    id: task.id,
                    ...data!,
                  })
                );
                setOpen(false);
              }}
            />
          </Modal>

        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
