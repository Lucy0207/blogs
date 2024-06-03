import { BlogPostProps } from "./BlogPost.interface";
export interface BlogList {
  blogs: BlogPostProps[];
  currentPage: number;
  totalPages: number
  status: 'init' | 'loading' | 'error' | 'success';
}