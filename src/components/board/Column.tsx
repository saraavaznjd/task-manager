import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Column, Task } from "../../features/board/board.types";
import { useState } from "react";
import { Modal } from "../Modal";
import { CreateTaskForm } from "../CreateTaskForm";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/board/boardSlice";
import { EmptyColumn } from "./EmptyColumn";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon, } from "@heroicons/react/24/outline";
import { renameColumn, deleteColumn } from "../../features/board/boardSlice";

interface ColumnComponentProps {
    column: Column
    tasks: Task[]
    index: number
}

const ColumnComponent = ({ column, tasks, index }: ColumnComponentProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [renameOpen, setRenameOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [title, setTitle] = useState(column.title);
    const dispatch = useDispatch()

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="bg-gray-50 w-[260px] flex-shrink-0 rounded-xl shadow-sm border border-gray-200">
                    {/* Column Header */}
                    <div
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing"
                    >
                        <div className="flex items-center justify-between p-3 border-b border-gray-200">
                            <h2 className="font-semibold text-gray-700">{column.title}</h2>
                            <span className="text-sm text-gray-500">{tasks.length}</span>
                            <Menu as="div" className="relative">
                                <Menu.Button onClick={(e) => e.stopPropagation()}>
                                    <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
                                </Menu.Button>

                                <Menu.Items className="absolute right-0 mt-1 w-32 bg-white border rounded shadow">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setRenameOpen(true);
                                                }}
                                                className={`flex items-center gap-2 w-full px-3 py-2 text-sm ${active ? "bg-gray-100" : ""
                                                    }`}
                                            >
                                                <PencilSquareIcon className="w-4 h-4" />
                                                Rename
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteOpen(true);
                                                }}
                                                className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 ${active ? "bg-gray-100" : ""
                                                    }`}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                                Delete
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </div>


                    {/* Droppable Tasks Area */}
                    <Droppable droppableId={column.id} type="TASK">
                        {(provided) => (
                            <div
                                className="p-3 min-h-[200px]"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tasks.length === 0 ? (
                                    <EmptyColumn />
                                ) : (
                                    tasks.map((task, index) => (
                                        <TaskCard key={task.id} task={task} index={index} columnId={column.id} />
                                    ))
                                )}

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
                    {/*Rename Modal*/}
                    <Modal
                        open={renameOpen}
                        onClose={() => setRenameOpen(false)}
                        title="Rename Column"
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch(renameColumn({ columnId: column.id, title }));
                                setRenameOpen(false);
                            }}
                            className="space-y-3"
                        >
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                autoFocus
                            />
                            <button className="w-full bg-blue-600 text-white py-2 rounded">
                                Save
                            </button>
                        </form>
                    </Modal>

                    {/*Delete Modal */}
                    <Modal
                        open={deleteOpen}
                        onClose={() => setDeleteOpen(false)}
                        title="Delete Column"
                    >
                        <p className="text-gray-700 mb-4">
                            All tasks in this column will be deleted. Are you sure?
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteOpen(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(deleteColumn({ columnId: column.id }));
                                    setDeleteOpen(false);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </Modal>

                </div>

            )}
        </Draggable>
    )
}

export default ColumnComponent;
