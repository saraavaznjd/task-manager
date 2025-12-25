import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import ColumnComponent from "./Column";
import { addColumn, moveTask } from "../../features/board/boardSlice";
import { useState } from "react";
import { BoardFilters } from "../BoardFilters";
import type { Priority, Task } from "../../features/board/board.types";
import { reorderColumns } from "../../features/board/boardSlice";
import { Modal } from "../Modal";

const Board = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    query: "",
    priority: "all" as Priority | "all",
    tagIds: [] as string[],
  });

  const matches = (task: Task) => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (
        !task.title.toLowerCase().includes(q) &&
        !(task.description ?? "").toLowerCase().includes(q)
      ) return false;
    }
    if (filters.priority !== "all" && task.priority !== filters.priority)
      return false;

    if (filters.tagIds.length) {
      if (!filters.tagIds.every((id) => task.tagIds.includes(id)))
        return false;
    }
    return true;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    // Columns
    if (type === "COLUMN") {
      if (destination.index === source.index) return;

      dispatch(
        reorderColumns({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
      return;
    }
    //Tasks
    dispatch(
      moveTask({
        sourceColId: source.droppableId,
        destColId: destination.droppableId,
        sourceIndex: source.index,
        destIndex: destination.index,
        taskId: draggableId,
      })
    );
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <BoardFilters onChange={setFilters} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          direction="horizontal"
          type="COLUMN"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 overflow-x-auto"
            >
              {board.columnOrder.map((colId, index) => {
                const column = board.columns[colId];
                const tasks = column.taskIds.map((id) => board.tasks[id]).filter(matches);

                return (<div key={colId} className="h-full snap-start min-w-[280px]">
                  <ColumnComponent column={column} tasks={tasks} index={index} />
                </div>)

              })}
              {provided.placeholder}
              {/* Add Column Button */}
              <button onClick={() => setOpen(true)}
                className="min-w-[250px] h-fit py-4 px-3 bg-white shadow-md rounded-xl border border-gray-300 hover:bg-gray-50 transition"
              >
                + Add Column
              </button>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Add Column"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(addColumn({
                      id: title,
                      title: title,
                      taskIds: [],
                    }));
                    setOpen(false);
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
                    Add
                  </button>
                </form>
              </Modal>
            </div>
          )}
        </Droppable>
      </DragDropContext>


    </div>
  );
};

export default Board;

