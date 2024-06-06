import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BlogPostProps } from "../interfaces/BlogPost.interface";
import { PREFIX } from '../store/user.slice';

interface FetchPostsResponse {
  articles: BlogPostProps[];
  articlesCount: number;
}

export const getPosts = createAsyncThunk<FetchPostsResponse, number>(
  "blogs/getPosts",
  async (page: number) => {
    try {
      const { data } = await axios.get(`${PREFIX}/articles?page=${page}`);
      return {
        articles: data.articles,
        articlesCount: data.articlesCount,
      };
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
      throw e;
    }
  }
);