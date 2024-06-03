import styles from "./NavBar.module.css"

export default function NavBar() {
    return (
        <header className={styles["navigation-panel"]}>
            <h6>RealWorld Blog</h6>
            <div className={styles["navigation-buttons"]}>
                <button>Sign In</button>
                <button>Sign Up</button>
            </div>
        </header>
    )
}