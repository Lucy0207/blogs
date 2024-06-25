import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles["error-page"]}>
      <p>The page you are looking for does not exist</p>
      <p className={styles["home-page"]}>
        Try your luck on our <Link to="/">home page</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
