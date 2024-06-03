import styles from "./SignUp.module.css"
import {useForm, SubmitHandler} from "react-hook-form"
import Headling from "../../components/Headling/Headling";
import Button from "../../components/Button/Button";

export type SignupForm = {
 email: string;
  password: string;
  confirmPassword: string;
  name: string;
  terms: boolean;
}

export default function SignUp() {
     const {
    register,
    handleSubmit,
    watch,
     formState: { errors }
  } = useForm<SignupForm>();

   const onSubmit: SubmitHandler<SignupForm> = (data) => console.log(data)
 const password = watch("password", "");
    return (
        <div className={styles["signup"]}>
            <Headling>Create new account</Headling>
            <form  className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['field']}>
				<label htmlFor="name">Username</label>
				<input id='name' type ="text" placeholder='Username'  {... register("name", {required: "the username is required", maxLength: {
                    value: 20, message: "your username is too long"
                }, minLength: {value: 3, message: "your username is too short"}})}/>
			</div>
             {errors.name && <p>{errors.name.message}</p>}
            <div className={styles['field']}>
				<label htmlFor="email">Email address</label>
				<input id='email' type="email" placeholder='Email address' {... register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Entered value does not match email format"
              }
            })}/>
             {errors.email && <p>{errors.email.message}</p>}
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
             {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
			</div>
            <div className={styles["terms"]}>
                <input type="checkbox"  {...register("terms", {
              required: "You must agree to the terms"
            })}></input>
                <p>I agree to the processing of my personal 
information</p>
 {errors.terms && <p>{errors.terms.message}</p>}
            </div>
            <Button>Create</Button>
            </form>
            <div  className={styles['links']}>
			
			<div>Already have an account?</div>
			<p>Sign in</p>
		</div>
        </div>
    )
}