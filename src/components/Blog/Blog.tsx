import styles from "./Blog.module.css"
import moment from "moment";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import { BlogPostProps } from "../../interfaces/BlogPost.interface";

const Blog: React.FC<BlogPostProps> = ({title, body, favoritesCount, createdAt, author, slug}: BlogPostProps) => {
    const avatar = "https://platform.kata.academy/uploads/student_atars/17730.jpg";
     const creationTime = moment(createdAt).format('MMMM D, YYYY');
    return(
        <article className={styles["blogCard"]}>
            <div className={styles["heading"]}>
                <div className={styles["heading-left"]}>
                    <h5>
                        <Link to={`/article/${slug}`}>{title}</Link>
                        </h5>
                    <div className={styles["favourite"]}>
                    <img className={styles["favourite-icon"]}  src="heart1.svg" alt="favourites icon" />
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