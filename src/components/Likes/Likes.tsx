import { useDispatch } from "react-redux";
import styles from "./Likes.module.css"
import { AppDispatcher } from "../../store/store";
import { deleteLikes } from "../../services/handleLikes";
import { setLikes } from "../../services/handleLikes";
import { useState } from "react";
import Heart from "../../UI/BlogPagination/Heart/HeartOutlined";
import FilledHeart from "../../UI/BlogPagination/HeartFilled/HeartFilled";

interface ILikeProps {
  favoritesCount: number;
  favorited: boolean;
  slug: string;
}

const Likes = ({favorited, favoritesCount, slug}: ILikeProps) => {

    const dispatch = useDispatch<AppDispatcher>()
    const [favorite, setFavorite] = useState<boolean>(favorited)

        const handleFavourites = () => {
        if (favorite) {
            dispatch(deleteLikes(slug!));
            setFavorite((prevState) => !prevState);
        } else {
            dispatch(setLikes(slug!));
            setFavorite((prevState) => !prevState);
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