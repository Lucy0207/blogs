import { useDispatch, useSelector } from "react-redux";
import styles from "./Likes.module.css"
import { AppDispatcher, RootState } from "../../store/store";
import { deleteLikes } from "../../services/handleLikes";
import { setLikes } from "../../services/handleLikes";
import { useState } from "react";
import Heart from "../../UI/BlogPagination/Heart/HeartOutlined";
import FilledHeart from "../../UI/BlogPagination/HeartFilled/HeartFilled";


interface ILikeProps {
  slug: string;
}

const Likes = ({slug}: ILikeProps) => {

    const dispatch = useDispatch<AppDispatcher>()
     const blog = useSelector((state: RootState) => state.blogs.blogs.find(blog => blog.slug === slug));
  const favorited = blog?.favorited;
  const favoritesCount = blog?.favoritesCount;
const [favorite, setFavorite] = useState<boolean>(favorited || false)



      const handleFavourites = async () => {
    try {
      if (favorite) {
dispatch(deleteLikes(slug))
  setFavorite((prevState) => !prevState);
      } else {
       dispatch(setLikes(slug))
        setFavorite((prevState) => !prevState);
      }

    } catch (error) {
      console.error('Failed to update likes', error);
    }
  };


    return (
        <div className={styles["favourite"]} onClick={handleFavourites}>
          <div className={styles["favourite-icon"]}>{favorite ? <FilledHeart /> : <Heart />} </div>
            <span className={styles["favourite-count"]}>{favoritesCount}</span>
        </div>
    )
}

export default Likes;