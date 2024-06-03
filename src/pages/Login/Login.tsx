import styles from "./Login.module.css"
import Headling from "../../components/Headling/Headling"
import Button from "../../components/Button/Button"
const Login = () => {
    return (
<div className={styles['login']}>
		<Headling>Sign In</Headling>

		<form className={styles['form']} >
			<div className={styles['field']}>
				<label htmlFor="email">Email address</label>
				<input id='email' placeholder='Email address' name='email'/>
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Password</label>
				<input id='password' type='password' placeholder='Password' name='password'/>
			</div>
			<Button >Login</Button>
		
		</form>
		<div  className={styles['links']}>
			
			<div>Don't have an account yet?</div>
			<div>
			Sign Up.
			</div>
		</div>
	</div>
    )
}

export default Login