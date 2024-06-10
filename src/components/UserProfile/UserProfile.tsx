import styles from "./UserProfile.module.css";
/* import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; */
export default function UserProfile() {

        const avatar = localStorage.getItem("avatar")
        const currentUser = localStorage.getItem("user")
   
        console.log(`Current user is ${currentUser}`)

    return (
        <div className={styles["user-profile"]}>
            <p className={styles["user"]}>{currentUser}</p>
            <img src={avatar || "avatar1.svg"} className={styles["user-avatar"]}/>
        </div>
    )
}