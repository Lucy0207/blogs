import { BlogPostProps } from "./BlogPost.interface";
export interface BlogList {
  blogs: BlogPostProps[];
  currentPage: number;
articlesCount: number;
favorited: boolean;
favoritesCount: number;
  status: 'init' | 'loading' | 'error' | 'success';
}