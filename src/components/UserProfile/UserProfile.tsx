import styles from "./UserProfile.module.css";
/* import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; */
export default function UserProfile() {

        // const currentUser = useSelector((s: RootState) => s.user.user);
        const currentUser = localStorage.getItem("user")
   
        console.log(`Current user is ${currentUser}`)

    return (
        <div className={styles["user-profile"]}>
            <p className={styles["user"]}>{currentUser}</p>
            <img src="avatar1.svg" />
        </div>
    )
}