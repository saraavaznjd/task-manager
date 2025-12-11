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
          style={{
            padding: "0.75rem",
            background: "white",
            borderRadius: "6px",
            marginBottom: "0.5rem",
            border: "1px solid #ddd",
            ...provided.draggableProps.style,
          }}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
