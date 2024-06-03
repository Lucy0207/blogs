import styles from "./App.module.css";
import NavBar from "../NavBar/NavBar";
import BlogList from "../BlogList/BlogList";
import BlogPagination from "../../UI/BlogPagination/BlogPagination";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatcher } from "../../store/store";
import { blogAction } from "../../store/blogs.slice";
import { Route, Routes } from "react-router-dom";
import BlogPost from "../BlogPost/BlogPost";
import { useEffect } from "react";
import { getPosts } from "../../services/getPosts";
import SignUp from "../../pages/SignUp/SignUp";
import Login from "../../pages/Login/Login";

export default function App() {
      const dispatch = useDispatch<AppDispatcher>();
    const currentPage = useSelector((s: RootState) => s.blogs.currentPage)
    const totalPages = useSelector((s: RootState) => s.blogs.totalPages);

    useEffect(() => {
        dispatch(getPosts(currentPage))
    }, [dispatch, currentPage])

    const handlePageChange = (page: number) => {
        
        dispatch(blogAction.setPage(page))
    }
    
    return(
        <div className={styles["main"]}>
             <NavBar />
             <div>
                <Routes>
                    <Route path="/" element={<BlogList />} />
                    <Route path="/articles" element={<BlogList />} />
                    <Route path="/article/:slug" element={<BlogPost />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                </Routes>
             
             <BlogPagination current={currentPage} total={totalPages} onChange={handlePageChange} />
             </div>
             
        </div>
       
    )
}