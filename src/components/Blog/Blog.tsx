import styles from "./Blog.module.css"
import moment from "moment";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { BlogPostProps } from "../../interfaces/BlogPost.interface";
import { useDispatch } from "react-redux";
import { AppDispatcher } from "../../store/store";
import { deleteLikes, setLikes } from "../../services/handleLikes";
import { useState } from "react";

const Blog: React.FC<BlogPostProps> = ({title, body, favoritesCount, createdAt, author, slug, favorited}: BlogPostProps) => {
    const avatar = "https://platform.kata.academy/uploads/student_atars/17730.jpg";
     const creationTime = moment(createdAt).format('MMMM D, YYYY');
     const dispatch = useDispatch<AppDispatcher>();
     const [favorite, setFavorite] = useState<boolean>(favorited);
    console.log(favorited)
     const handleFavourites = () => {
            if (favorite) {
                dispatch(deleteLikes(slug))
                setFavorite(false)
            } else {
                dispatch(setLikes(slug))
                setFavorite(true)
                
            }
     }
    return(
        <article className={styles["blogCard"]}>
            <div className={styles["heading"]}>
                <div className={styles["heading-left"]}>
                    <h5>
                        <Link to={`/articles/${slug}`} className={styles["heading-left__title"]}>{title}</Link>
                    </h5>
                    <div className={styles["favourite"]} onClick={handleFavourites}>
                        <img className={styles["favourite-icon"]}  src={favorite ? "hear2.svg" : "heart1.svg"} alt="favourites icon" />
                        <span className={styles["favourite-count"]} > {favoritesCount}</span>
                    </div>                    
                </div>
                <div className={styles["heading-right"]}>
                    <div className={styles["person"]}>
                        <h6 className={styles["person-name"]}>{author.username}</h6>
                        <span className={styles["person-date"]}>{creationTime}</span>
                    </div>
                    <div className={styles["avatar"]}>
                        <img className={styles["avatar-icon"]} src={author.image === avatar ? avatar : author.image}  alt="avatar picture" />
                    </div>
                </div>
            </div>
            <div className={styles["tags"]}></div>
            <div className={styles["text"]}>
                <Markdown>{body}</Markdown>
                </div>
           
        </article>
    )
}
export default Blog;