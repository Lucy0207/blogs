import BlogList from "../BlogList/BlogList";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatcher } from "../../store/store";
import { Route, Routes } from "react-router-dom";
import BlogPost from "../BlogPost/BlogPost";
import { useEffect } from "react";
import { getPosts } from "../../services/getPosts";
import SignUp from "../../pages/SignUp/SignUp";
import Login from "../../pages/Login/Login";
import Layout from "../../pages/Layout/Layout";
import EditProfile from "../../pages/EditProfile/EditProfile";

import CreateArticlePage from "../../pages/CreateArticlePage/CreateArticlePage";
import RequireAuth from "../../hoc/RequireAuth";

export default function App() {
      const dispatch = useDispatch<AppDispatcher>();
    const currentPage = useSelector((s: RootState) => s.blogs.currentPage)


    useEffect(() => {
        dispatch(getPosts(currentPage))
    }, [dispatch, currentPage])


    
    return(

           
             <div>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<BlogList />} />
                        <Route path="articles" element={<BlogList />} />
                        <Route path="article/:slug" element={<BlogPost />} />
                        <Route path="signup" element={<SignUp />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<EditProfile />}/>
                        <Route path="new-article" element={
                        <RequireAuth>
                            <CreateArticlePage />
                        </RequireAuth>
                        }/>

                    </Route>
                    

                </Routes>
             
       
             </div>
             

       
    )
}