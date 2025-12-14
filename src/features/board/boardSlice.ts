import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { initialBoard } from "./board.types"
import type { Task, Column, Priority } from "./board.types"


interface MoveTaskPayload {
    sourceColId: string,
    destColId: string,
    sourceIndex: number,
    destIndex: number,
    taskId: string
}

export const boardSlice = createSlice({
    name: 'board',
    initialState: initialBoard,
    reducers: {
        addTask: (state, action: PayloadAction<{
            columnId: string;
            title: string;
            description: string;
            priority: Priority;
            tags: string[]
            deadline?: string;
        }>
        ) => {
            const id = `task-${Date.now()}`;

            const newTask: Task = {
                id,
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
                tagIds: action.payload.tags ?? [],
                deadline: action.payload.deadline,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            state.tasks[id] = newTask;
            state.columns[action.payload.columnId].taskIds.push(id);
        },

        editTask: (
            state,
            action: PayloadAction<{
                id: string;
                title: string;
                description: string;
                priority: Priority;
                deadline?: string;
                tags: string[];
            }>
        ) => {
            const task = state.tasks[action.payload.id];
            if (!task) return;

            task.title = action.payload.title;
            task.description = action.payload.description;
            task.priority = action.payload.priority;
            task.deadline = action.payload.deadline;
            task.tagIds = action.payload.tags;
            task.updatedAt = new Date().toISOString();
        },

        addColumn: (state, action: PayloadAction<Column>) => {
            const column = action.payload
            state.columns[column.id] = column
        },

        moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
            const { sourceColId, destColId, sourceIndex, destIndex, taskId } = action.payload

            const sourceTasks = state.columns[sourceColId].taskIds
            const destTasks = state.columns[destColId].taskIds
            //remove from source
            sourceTasks.splice(sourceIndex, 1)
            //add to destination
            destTasks.splice(destIndex, 0, taskId)
        }
    }
})

export const { addTask, editTask, addColumn, moveTask } = boardSlice.actions
export default boardSlice.reducer