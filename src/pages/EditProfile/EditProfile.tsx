import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Headling from "../../components/Headling/Headling";
import { AppDispatcher } from "../../store/store";
import { editProfile } from "../../store/user.slice";
import Button from "../../components/Button/Button";

import styles from "./EditProfile.module.css";

export type EditProfileForm = {
  email: string;
  password: string;
  username: string;
  image: string;
};

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({ mode: "onChange" });

  const dispatch = useDispatch<AppDispatcher>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EditProfileForm> = (data) => {
    const { email, username, password, image } = data;
    dispatch(editProfile({ email, username, password, image }));
    navigate("/articles");
  };

  return (
    <div className={styles["edit-profile"]}>
      <Headling>Edit Profile</Headling>
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["field"]}>
          <label htmlFor="name">Username</label>
          <input
            className={errors.username ? styles["error"] : ""}
            id="name"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "the username is required",
              minLength: { value: 3, message: "Your username is too short" },
              maxLength: {
                value: 20,
                message: "Your username is too long",
              },
            })}
          />
        </div>
        {errors.username && (
          <p className={styles["error"]}>{errors.username.message}</p>
        )}
        <div className={styles["field"]}>
          <label htmlFor="email">Email address</label>
          <input
            className={errors.email ? styles["error"] : ""}
            id="email"
            type="email"
            placeholder="Email address"
            {...register("email", {
              required: "Email is required",
              validate: {
                minLength: (v) => v.length > 0 || "Email is required",
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },
            })}
          />
          {errors.email && (
            <p className={styles["error"]}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">New password</label>
          <input
            className={errors.password ? styles["error"] : ""}
            id="password"
            type="password"
            placeholder="New password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              maxLength: {
                value: 40,
                message: "Password must be less than 40 characters",
              },
            })}
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="image">Avatar image(url)</label>
          <input
            className={errors.image ? styles["error"] : ""}
            id="image"
            type="text"
            placeholder="Avatar image"
            {...register("image", {
              required: false,
              pattern: {
                value:
                  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
                message: "There must be a valid url",
              },
            })}
          />
        </div>
        <Button className={styles["profile-button"]}>Save</Button>
      </form>
    </div>
  );
}
