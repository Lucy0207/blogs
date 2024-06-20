import styles from "./BlogList.module.css";
import { useDispatch, useSelector } from "react-redux";
import Blog from "../Blog/Blog";
import { AppDispatcher, RootState } from "../../store/store";
import { blogAction } from "../../store/blogs.slice";
import BlogPagination from "../../UI/BlogPagination/BlogPagination";

export default function BlogList() {

const blogs = useSelector((s: RootState) => s.blogs.blogs)
const totalPages = useSelector((s: RootState) => s.blogs.totalPages);
const currentPage = useSelector((s: RootState) => s.blogs.currentPage)
const dispatch = useDispatch<AppDispatcher>();

    const handlePageChange = (page: number) => {
        
        dispatch(blogAction.setPage(page))
    }


    return (
        <main className={styles["blog-list"]}>
      {blogs.length > 0 && blogs.map((blog) => {
        const { title, slug, favoritesCount, body, author, createdAt, description, favorited} = blog;
        return (
          <Blog
            key={slug} 
            title={title}
            slug={slug}
            favoritesCount={favoritesCount}
            body={body}
            author={author}
            createdAt={createdAt}
            description={description}
            favorited={favorited}
          />
        );
      })}
            <BlogPagination current={currentPage} total={totalPages} onChange={handlePageChange} />
            </main>
        
    )
}