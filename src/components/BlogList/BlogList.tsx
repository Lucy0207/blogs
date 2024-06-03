import styles from "./BlogList.module.css";
import { useSelector } from "react-redux";
import Blog from "../Blog/Blog";
import { RootState } from "../../store/store";

export default function BlogList() {

const blogs = useSelector((s: RootState) => s.blogs.blogs)


    return (
        <main className={styles["blog-list"]}>
      {blogs.length > 0 && blogs.map((blog) => {
        const { title, slug, favoritesCount, body, author, createdAt, description} = blog;
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
          />
        );
      })}
            </main>
        
    )
}