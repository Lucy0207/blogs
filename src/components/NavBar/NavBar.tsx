import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

export default function NavBar() {
    return (
        <header className={styles["navigation-panel"]}>
            <h6>RealWorld Blog</h6>
            <div className={styles["navigation-buttons"]}>
                <Link to={`/login`}>Sign In</Link>
                <Link to={`/signup`}>Sign Up</Link>
            </div>
        </header>
    )
}