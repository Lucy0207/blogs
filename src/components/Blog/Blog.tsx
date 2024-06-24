import styles from "./Blog.module.css"
import moment from "moment";
import Markdown from "react-markdown";

import { BlogPostProps } from "../../interfaces/BlogPost.interface";


import BlogHeading from "../BlogHeading/BlogHeading";

const Blog: React.FC<BlogPostProps> = ({title, body, createdAt, author, slug, tagList}: BlogPostProps) => {
    const avatar = "https://platform.kata.academy/uploads/student_atars/17730.jpg";
     const creationTime = moment(createdAt).format('MMMM D, YYYY');


 

    return(
        <article className={styles["blogCard"]}>
            <div className={styles["heading"]}>
        
                <BlogHeading
                title={title} 

                slug={slug}
 
    />
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
            <div className={styles["tags"]}>
                {tagList && tagList.map((tag, index) => (
                    <span key={index} className={styles["tag"]}>{tag + " "}</span>
                ))}
            </div>
            <div className={styles["text"]}>
                <Markdown>{body}</Markdown>
                </div>
           
        </article>
    )
}
export default Blog;