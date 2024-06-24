import styles from "./BlogList.module.css";
import { useSelector, useDispatch } from "react-redux";
import Blog from "../Blog/Blog";
import { RootState, AppDispatcher } from "../../store/store";
import { useEffect } from "react";
import { getPosts } from "../../services/getPosts";
import Loader from "../../UI/BlogPagination/Loader/Loader";
import BlogPagination from "../../UI/BlogPagination/BlogPagination";
import ErrorIndicator from "../../UI/BlogPagination/ErrorIndicator/ErrorIndicator";

export default function BlogList() {



const {articlesCount, blogs, currentPage, status} = useSelector((s: RootState) => s.blogs)
      const dispatch = useDispatch<AppDispatcher>();
 


    useEffect(() => {
        dispatch(getPosts((currentPage * 5) - 5))
    }, [dispatch, currentPage])



    return (
           
        <main className={styles["blog-list"]}>
           {status === 'loading' && <Loader />}
           {status === "error" && <ErrorIndicator />}
        {blogs.length > 0 && blogs.map((blog) => {
        const { title, slug, body, author, createdAt, description, tagList, favoritesCount, favorited} = blog;
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
            tagList={tagList}
          />
        );
      })}
            <BlogPagination totalResults={blogs ? articlesCount : 0}/>
            </main>
        
    )
}