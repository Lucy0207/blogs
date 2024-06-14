import styles from "./Login.module.css"
import {useForm} from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Headling from "../../components/Headling/Headling"
import Button from "../../components/Button/Button"

import { useEffect } from "react"
import { userActions, login } from "../../store/user.slice"
import { AppDispatcher, RootState } from "../../store/store"


export type LoginForm = {
 email: string;
  password: string;

}
const Login = () => {
    const navigate = useNavigate();
	const location = useLocation();
	const fromPage = location.state?.from?.pathname || '/'
	const dispatch = useDispatch<AppDispatcher>();
	const {jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {
		if (jwt) {
			if(fromPage) {
				navigate(fromPage, {replace: true})
			} else {
	navigate('/')
			}
	
		}
	}, [jwt, navigate, fromPage]);

    const {    register, handleSubmit,  formState: { errors }   } = useForm<LoginForm>({mode: "onBlur"});

    const sendLogin = async (email: string, password: string) => {
		dispatch(login({email, password}));
		
    }

  const onSubmit = async (data: LoginForm) => {
 dispatch(userActions.clearLoginError());
const {email, password} = data;
    await sendLogin(email, password)
	
  }

    return (
<div className={styles['login']}>
		<Headling>Sign In</Headling>
{loginErrorMessage && <div>{loginErrorMessage}</div>}
		<form className={styles['form']} onSubmit={handleSubmit(onSubmit)} >
			<div className={styles['field']}>
				<label htmlFor="email">Email address</label>
				<input id='email' type="email" placeholder='Email address' {...register("email", {required: "Enter the corect email address"})}/>
                        {errors.email && <p className={styles["error"]}>{errors.email.message}</p>}
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Password</label>
				<input id='password' type='password' placeholder='Password' {...register("password", {required: "Enter the correct password"})}/>
                            {errors.password && <p className={styles["error"]}>{errors.password.message}</p>}
			</div>
			<Button className={styles["login-button"]} >Login</Button>
		
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