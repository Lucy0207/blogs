import { Link, Outlet, useNavigate } from "react-router-dom"
import styles from "./Layout.module.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatcher, RootState } from "../../store/store"
import { userActions } from "../../store/user.slice"
import NavigationButton from "../../components/NavigationButton/NavigationButton"
import UserProfile from "../../components/UserProfile/UserProfile"

export default function Layout() {


    const jwt = useSelector((s: RootState) => s.user.jwt);
        const dispatch = useDispatch<AppDispatcher>();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(userActions.logout());
        localStorage.clear();
        navigate("login")
    }
    return (
        <>
        <header className={styles["navigation-panel"]}>
            <h6>RealWorld Blog</h6>
            {!jwt ? (
                   <div className={styles["navigation-buttons"]}>
                <Link to={`/login`}><NavigationButton>Sign In</NavigationButton></Link>
                <Link to={`/signup`}><NavigationButton>Sign Up</NavigationButton></Link>
            </div>
            ) : (
                <div className={styles["profile-buttons"]}>
                <Link to={`/login`}><NavigationButton appearance="small">Create article</NavigationButton></Link>
                <UserProfile />
                <Link to={`/signup`}><NavigationButton appearance="big" onClick={logout}>Log out</NavigationButton></Link>
            </div>
            )} 
         
        </header>
        <div className={styles["main"]}>
        <Outlet />
        </div>
        
        </>
   

    )
}