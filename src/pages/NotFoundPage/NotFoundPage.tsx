import styles from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
return(
    <div className={styles["error-page"]}>
        <p>The page you're looking for doesn't exist</p>
       <p className={styles["home-page"]}>Try your luck on our <Link to="/" >home page</Link></p> 
    </div>
)
}

export default NotFoundPage