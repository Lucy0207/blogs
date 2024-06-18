import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts } from "../services/getPosts";
import { BlogPostProps } from "../interfaces/BlogPost.interface";
import { BlogList } from "../interfaces/BlogList.interface";





const initialState: BlogList = {
  blogs: [],
 currentPage: 1,
 totalPages: 1,
  status: 'init',
};


export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        addArticle: (state, action) => {
          state.blogs.unshift(action.payload)
        },
        updateArticle: (state, action) => {
          state.blogs = state.blogs.map(blog => blog.slug === action.payload.slug ? action.payload : blog)
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getPosts.fulfilled, (state, action: PayloadAction<{ articles: BlogPostProps[], articlesCount: number }>) => {
      state.status = "success";
      state.blogs = action.payload.articles;
      state.totalPages = Math.ceil(action.payload.articlesCount / 20);
      })
   
    }
})

export default blogSlice.reducer;
export const blogAction = blogSlice.actions;