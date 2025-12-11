import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import ColumnComponent from "./Column";
import { moveTask } from "../../features/board/boardSlice";

const Board = () => {
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // اگر جایی رها نشده بود → هیچ کاری نکن
    if (!destination) return;

    // اگر در همان موقعیت رها شده → هیچ کاری نکن
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

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
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {board.columnOrder.map((colId) => {
          const column = board.columns[colId];
          const tasks = column.taskIds.map((id) => board.tasks[id]);

          return <ColumnComponent key={colId} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
