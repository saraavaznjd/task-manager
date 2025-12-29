import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import authReducer from "../features/auth/authSlice";
import { loadState, saveBoard, saveUser } from "./localStorage";

const preloadedState = loadState()



export const store = configureStore({
  reducer: {
    board: boardReducer,
    auth: authReducer
  },
  preloadedState: preloadedState ?
    { board: preloadedState } :
    undefined
});

store.subscribe(() => {
  saveUser(store.getState().auth.user);
  saveBoard(store.getState().board);
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
