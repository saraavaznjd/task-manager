import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../../features/board/board.types";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ( {task, index} : TaskCardProps ) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-3 mb-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <p className="font-medium text-gray-800">{task.title}</p>

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
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
