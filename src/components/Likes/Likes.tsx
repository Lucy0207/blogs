import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { AppDispatcher, RootState } from "../../store/store";
import { deleteLikes, setLikes } from "../../services/handleLikes";
import Heart from "../../UI/BlogPagination/Heart/HeartOutlined";
import FilledHeart from "../../UI/BlogPagination/HeartFilled/HeartFilled";

import styles from "./Likes.module.css";

interface ILikeProps {
  slug: string;
}

const Likes = ({ slug }: ILikeProps) => {
  const dispatch = useDispatch<AppDispatcher>();
  const blog = useSelector((state: RootState) =>
    state.blogs.blogs.find((blog) => blog.slug === slug),
  );
  const favorited = blog?.favorited;
  const favoritesCount = blog?.favoritesCount;
  const [favorite, setFavorite] = useState<boolean>(favorited || false);

  const handleFavourites = async () => {
    try {
      if (favorite) {
        dispatch(deleteLikes(slug));
        setFavorite((prevState) => !prevState);
      } else {
        dispatch(setLikes(slug));
        setFavorite((prevState) => !prevState);
      }
    } catch (error) {
      console.error("Failed to update likes", error);
    }
  };

  const handleClick = () => {
    handleFavourites();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleFavourites();
    }
  };

  return (
    <div
      className={styles["favourite"]}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles["favourite-icon"]}>
        {favorite ? <FilledHeart /> : <Heart />}{" "}
      </div>
      <span className={styles["favourite-count"]}>{favoritesCount}</span>
    </div>
  );
};

export default Likes;
