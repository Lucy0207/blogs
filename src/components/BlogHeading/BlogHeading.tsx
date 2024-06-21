import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogHeading.module.css';
import Likes from '../Likes/Likes';

interface BlogHeadingProps {
    title: string;
    slug: string;
    favorited: boolean;
    favoritesCount: number;

}

const BlogHeading: React.FC<BlogHeadingProps> = ({ title, slug, favoritesCount, favorited }) => (
    <div className={styles["heading-left"]}>
        <h5>
            <Link to={`/articles/${slug}`} className={styles["heading-left__title"]}>{title}</Link>
        </h5>
        <Likes
        favorited={favorited}
        favoritesCount={favoritesCount}
        slug={slug} />
       </div>
);

export default BlogHeading;
