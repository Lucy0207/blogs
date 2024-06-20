import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts } from "../services/getPosts";
import { BlogPostProps } from "../interfaces/BlogPost.interface";
import { BlogList } from "../interfaces/BlogList.interface";
import { deletePosts } from "../services/deletePosts";
import { setLikes } from "../services/handleLikes";
import { deleteLikes } from "../services/handleLikes";





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
        },
        deleteArticle: (state, action: PayloadAction<string>) => {
          state.blogs = state.blogs.filter(blog => blog.slug !== action.payload)
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getPosts.fulfilled, (state, action: PayloadAction<{ articles: BlogPostProps[], articlesCount: number }>) => {
      state.status = "success";
      state.blogs = action.payload.articles;
      state.totalPages = Math.ceil(action.payload.articlesCount / 20);
      });
     builder.addCase(deletePosts.fulfilled, (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter(blog => blog.slug !== action.payload);
    });
    builder.addCase(setLikes.fulfilled, (state, action: PayloadAction<string>) => {
          const blog = state.blogs.find(blog => blog.slug === action.payload);
      if (blog) blog.favoritesCount += 1;
    });
    builder.addCase(deleteLikes.fulfilled, (state, action: PayloadAction<string>) => {
       const blog = state.blogs.find(blog => blog.slug === action.payload);
      if (blog) blog.favoritesCount -= 1;
    })
   
    }
})

export default blogSlice.reducer;
export const blogAction = blogSlice.actions;