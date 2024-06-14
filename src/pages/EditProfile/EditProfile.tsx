import { useDispatch } from "react-redux";
import Headling from "../../components/Headling/Headling"
import styles from "./EditProfile.module.css"
import {useForm, SubmitHandler} from "react-hook-form"
import { AppDispatcher } from "../../store/store";
import { editProfile } from "../../store/user.slice";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export type EditProfileForm = {
 email: string;
  password: string;
   username: string;
 image: string
}

export default function EditProfile() {
    const {
    register,
    handleSubmit,
     formState: { errors }
  } = useForm<EditProfileForm>();

  const dispatch = useDispatch<AppDispatcher>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EditProfileForm> = (data) => {
        
        const {email, username, password, image} = data;
        dispatch(editProfile({email, username, password, image}));
        navigate("/articles")
   }

    return (
        <div className={styles["edit-profile"]}>
            <Headling>Edit Profile</Headling>
            <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
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
				<label htmlFor="password">New password</label>
				<input id='password' type='password' placeholder='New password'  {...register("password", {
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
				<label htmlFor="image">Avatar image(url)</label>
				<input id='image' type ="text" placeholder='Avatar image'  {... register("image", {required: "the url is required"})}/>
			</div>
             <Button className={styles["profile-button"]}>Save</Button>
            </form>
        </div>
    )
}