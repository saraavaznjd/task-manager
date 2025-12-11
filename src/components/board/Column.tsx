import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Column, Task } from "../../features/board/board.types";

interface ColumnComponentProps {
    column: Column
    tasks: Task[];
}

const ColumnComponent = ({ column, tasks }: ColumnComponentProps) => {
    return (
        <div
            style={{
                background: "#f3f3f3",
                padding: "1rem",
                borderRadius: "8px",
                width: "250px",
                minHeight: "300px",
            }}
        >
            <h2>{column.title}</h2>

            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ marginTop: "1rem" }}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ColumnComponent;
