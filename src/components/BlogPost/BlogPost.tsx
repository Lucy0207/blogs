import styles from "./BlogPost.module.css"
import moment from "moment";
import Markdown from "react-markdown";
import { useParams, Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmation from "../../UI/BlogPagination/DeleteConfirmation/DeleteConfirmation";
import { AppDispatcher, RootState } from "../../store/store";
import NavigationButton from "../NavigationButton/NavigationButton";
import {message} from "antd"
import { useEffect } from "react";
import { deletePosts } from "../../services/deletePosts";
import BlogHeading from "../BlogHeading/BlogHeading";



const BlogPost: React.FC = () => {
      const { slug } = useParams();
      
       const post = useSelector((state: RootState) => state.blogs.blogs.find(blog => blog.slug === slug));

     const navigate = useNavigate();
     const dispatch = useDispatch<AppDispatcher>();


       const user = localStorage.getItem("user")



      useEffect(() => {
        if (!post) {

            navigate('/not-found', { replace: true });
        }
    }, [post, navigate]);


  if (!post) {

        return <div>Loading...</div>;
  }

  const { createdAt, description, title, favoritesCount, author, body, favorited, tagList } = post;
  
     const creationTime: string = moment(createdAt).format('MMMM D, YYYY');
    const avatar: string = "https://platform.kata.academy/uploads/student_atars/17730.jpg";


 



  const confirmDelete = async () => {
    if (!slug) {
      message.error('Invalid post identifier');
      return;
    }

    try {
      await dispatch(deletePosts(slug)).unwrap();

      navigate('/'); 
    } catch (error) {
      message.error('Failed to delete post');
    }
  }



return(
    <article className={styles["blogCard"]}>
            <header className={styles["heading"]}>
                         {slug &&
                  <BlogHeading 
                slug={slug}
                title={title}
                favoritesCount={favoritesCount}
                favorited={favorited}          
                            />}
              
                <div>
                    <div className={styles["heading-right"]}>
                    <div className={styles["person"]}>
                        <h6 className={styles["person-name"]}>{author.username}</h6>
                        <span className={styles["person-date"]}>{creationTime}</span>
                    </div>
                    <div className={styles["avatar"]}>
                        <img className={styles["avatar-icon"]} src={author.image === avatar ? avatar : author.image}  alt="avatar picture" />
                    </div>
                </div>
                
                     {user===author.username && <div className={styles["edit-buttons"]}>

                                <DeleteConfirmation
                                
                                onConfirm={confirmDelete} />
                <Link to={`/articles/${slug}/edit`}><NavigationButton appearance="green">Edit</NavigationButton></Link>
                            </div>}
                </div>
                
            </header>
            <div className={styles["tags"]}>
                {tagList && tagList.map((tag, index) => (
                    <span key={index} className={styles["tag"]}>{tag + " "}</span>
                ))}
            </div>
       
        
            <div><Markdown>{description}</Markdown></div>
            <div><Markdown>{body}</Markdown></div>


    </article>
)
}

export default BlogPost