import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import ColumnComponent from "./Column";
import { moveTask } from "../../features/board/boardSlice";
import { useState } from "react";
import { BoardFilters } from "../BoardFilters";
import type { Priority, Task } from "../../features/board/board.types";

const Board = () => {
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
    const { source, destination, draggableId } = result;

    if (!destination) return;

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
        <div className="flex gap-4 overflow-x-auto pb-6 h-full">
          {board.columnOrder.map((colId) => {
            const column = board.columns[colId];
            const tasks = column.taskIds.map((id) => board.tasks[id]).filter(matches);

            return <ColumnComponent key={colId} column={column} tasks={tasks} />;
          })}

          {/* Add Column Button */}
          <button
            className="min-w-[250px] h-fit py-4 px-3 bg-white shadow-md rounded-xl border border-gray-300 hover:bg-gray-50 transition"
          >
            + Add Column
          </button>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;

