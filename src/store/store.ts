import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./blogs.slice";
import userReducer, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const jwt = state.user.jwt;

  saveState({ jwt }, JWT_PERSISTENT_STATE);
});

export type AppDispatcher = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
