import styles from "./SignUp.module.css"
import {useForm, SubmitHandler} from "react-hook-form"
import Headling from "../../components/Headling/Headling";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatcher, RootState } from "../../store/store";
import { useEffect } from "react";
import { userActions } from "../../store/user.slice";
import { signup } from "../../store/user.slice";

export type SignupForm = {
 email: string;
  password: string;
  confirmPassword: string;
  username: string;
  terms: boolean;
}

export default function SignUp() {
     const {
    register,
    handleSubmit,
    watch,
     formState: { errors }
  } = useForm<SignupForm>();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatcher>();
  const {jwt, signupErrorMessage} = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if(jwt) {
        navigate('/')
    }
  },
   [jwt, navigate])


   const onSubmit: SubmitHandler<SignupForm> = (data) => {
        dispatch(userActions.clearSignupError())
        const {email, username, password} = data;
        dispatch(signup({email, password, username}));
   }
 const password = watch("password", "");
    return (
        <div className={styles["signup"]}>
            <Headling>Create new account</Headling>
            {signupErrorMessage &&<div className={styles['error']}>{signupErrorMessage}</div>}
            <form  className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['field']}>
				<label htmlFor="name">Username</label>
				<input id='name' type ="text" placeholder='Username'  {... register("username", {required: "the username is required", maxLength: {
                    value: 20, message: "Your username is too long"
                }, minLength: {value: 3, message: "Your username is too short"}})}/>
			</div>
             {errors.username && <p className={styles["error"]}>{errors.username.message}</p>}
            <div className={styles['field']}>
				<label htmlFor="email">Email address</label>
				<input id='email' type="email" placeholder='Email address' {... register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Entered value does not match email format"
              }
            })}/>
             {errors.email && <p className={styles["error"]}>{errors.email.message}</p>}
			</div>
            <div className={styles['field']}>
				<label htmlFor="password">Password</label>
				<input id='password' type='password' placeholder='Password'  {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long"
              },
              maxLength: {
                value: 40,
                message: "Password must be less than 40 characters"
              }
            })}/>
			</div>
              <div className={styles['field']}>
				<label htmlFor="password">Repeat password</label>
				<input id='confirmPassword' type='password' placeholder='password' {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}/>
             {errors.confirmPassword && <p className={styles["error"]}>{errors.confirmPassword.message}</p>}
			</div>
            <div className={styles["terms"]}>
                <input type="checkbox"  {...register("terms", {
              required: "You must agree to the terms"
            })}></input>
                <p>I agree to the processing of my personal 
information</p>

            </div>
             {errors.terms && <p className={styles["checkbox-error"]}>{errors.terms.message}</p>}
            <Button className={styles["signup-button"]}
            >Create</Button>
            </form>
            <div  className={styles['links']}>
			
			<div>Already have an account?</div>
			<p>Sign in</p>
		</div>
        </div>
    )
}