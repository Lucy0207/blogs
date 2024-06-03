import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogs.slice"

export const store = configureStore({
    reducer: {
        blogs: blogReducer
    }
})

export type AppDispatcher = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;