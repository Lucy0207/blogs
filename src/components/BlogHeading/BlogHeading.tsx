import { Link } from "react-router-dom";

import Likes from "../Likes/Likes";

import styles from "./BlogHeading.module.css";

interface BlogHeadingProps {
  title: string;
  slug: string;
}

const BlogHeading: React.FC<BlogHeadingProps> = ({ title, slug }) => (
  <div className={styles["heading-left"]}>
    <h5>
      <Link to={`/articles/${slug}`} className={styles["heading-left__title"]}>
        {title}
      </Link>
    </h5>
    <Likes slug={slug} />
  </div>
);

export default BlogHeading;
