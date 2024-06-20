import styles from "./UserProfile.module.css";

export default function UserProfile() {

        const avatar = localStorage.getItem("avatar")
        const currentUser = localStorage.getItem("user")
   
  

    return (
        <div className={styles["user-profile"]}>
            <p className={styles["user"]}>{currentUser}</p>
            <img src={avatar || "avatar1.svg"} className={styles["user-avatar"]}/>
        </div>
    )
}