import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { initialBoard } from "./board.types"
import type { Task,Column } from "./board.types"


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
    reducers:{
        addTask: (state,action:PayloadAction<Task>) => {
            const task = action.payload
            state.tasks[task.id] = task
        },

        addColumn: (state,action:PayloadAction<Column>) => {
            const column = action.payload
            state.columns[column.id] = column
        },

        moveTask: (state,action:PayloadAction<MoveTaskPayload>) => {
            const {sourceColId,destColId,sourceIndex,destIndex,taskId} = action.payload

            const sourceTasks = state.columns[sourceColId].taskIds
            const destTasks = state.columns[destColId].taskIds
            //remove from source
            sourceTasks.splice(sourceIndex,1)
            //add to destination
            destTasks.splice(destIndex,0,taskId)
        }
    }
})

export const {addTask,addColumn,moveTask} = boardSlice.actions
export default boardSlice.reducer