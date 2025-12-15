import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Column, Task } from "../../features/board/board.types";
import { useState } from "react";
import { Modal } from "../Modal";
import { CreateTaskForm } from "../CreateTaskForm";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/board/boardSlice";

interface ColumnComponentProps {
    column: Column
    tasks: Task[];
}

const ColumnComponent = ({ column, tasks }: ColumnComponentProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch()

    return (
        <div className="bg-gray-50 w-[260px] flex-shrink-0 rounded-xl shadow-sm border border-gray-200">
            {/* Column Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <h2 className="font-semibold text-gray-700">{column.title}</h2>
                <span className="text-sm text-gray-500">{tasks.length}</span>
            </div>

            {/* Droppable Tasks Area */}
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        className="p-3 min-h-[200px]"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} columnId={column.id} />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Add Task button */}
            <button onClick={() => setOpen(true)} className="w-full py-2 text-gray-600 hover:bg-gray-100 rounded-b-xl transition">
                + Add Task
            </button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Create Task"
            >
                <CreateTaskForm
                    onSubmit={(data) => {
                        dispatch(addTask({ ...data, columnId: column.id }));
                        setOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}

export default ColumnComponent;
