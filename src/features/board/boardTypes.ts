export type Priority = "low" | "medium" | "high";

export interface Tag {
    id: string;
    label: string;
    color: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    tagIds: string[];
    deadline?: string | null;
    createdAt: string;
    updatedAt: string;
}


export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

export interface Board {
    id: string;
    title: string;
    columnOrder: string[];
    columns: Record<string, Column>;
    tasks: Record<string, Task>;
    tags: Record<string, Tag>; 
}


export const initialBoard: Board = {
    id: "board-1",
    title: "My Task Board",
    columnOrder: [],
    columns: {
        "col-1": { id: "col-1", title: "To do", taskIds: ["task-1"] },
        "col-2": { id: "col-2", title: "In progress", taskIds: [] },
        "col-3": { id: "col-3", title: "Done", taskIds: [] },
    },
    tasks: {
        "task-1": {
            id: "task-1",
            title: "Start the project",
            description: "Initialize React + TS + Tailwind",
            priority: "medium",
            tagIds: ["tag-1"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    },
    tags: {
        "tag-1": { id: "tag-1", label: "", color: "" }
    },
};
