import styles from "./BlogPost.module.css"
import moment from "moment";
import Markdown from "react-markdown";
import { useParams, Link} from "react-router-dom";
import { useSelector } from "react-redux";
// import { PostProps } from "../../interfaces/Post.interface";
import { RootState } from "../../store/store";
import NavigationButton from "../NavigationButton/NavigationButton";


const BlogPost: React.FC = () => {
      const { slug } = useParams();
      
       const post = useSelector((state: RootState) => state.blogs.blogs.find(blog => blog.slug === slug));
     

       const user = localStorage.getItem("user")


  if (!post) {
    return <div>Loading...</div>;
  }

  const { createdAt, description, title, favoritesCount, author, body } = post;
     const creationTime: string = moment(createdAt).format('MMMM D, YYYY');
    const avatar: string = "https://platform.kata.academy/uploads/student_atars/17730.jpg";
 
return(
    <article className={styles["blogCard"]}>
            <header className={styles["heading"]}>
                <div className={styles["heading-left"]}>
                    <h5>{title}</h5>
                    <div className={styles["favourite"]}>
                    <img className={styles["favourite-icon"]}  src="heart1.svg" alt="favourites icon" />
                    <span className={styles["favourite-count"]} > {favoritesCount}</span>
                    </div>                    
                </div>
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
                        <NavigationButton appearance="red">Delete</NavigationButton>
                <Link to={`/articles/${slug}/edit`}><NavigationButton appearance="blue">Edit</NavigationButton></Link>
                            </div>}
                </div>
                
            </header>
       
        
            <div><Markdown>{description}</Markdown></div>
            <div><Markdown>{body}</Markdown></div>

    </article>
)
}

export default BlogPost