import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

import Headling from "../../components/Headling/Headling";
import Button from "../../components/Button/Button";
import { AppDispatcher, RootState } from "../../store/store";
import { userActions, signup } from "../../store/user.slice";

import styles from "./SignUp.module.css";

export type SignupForm = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  terms: boolean;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({ mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatcher>();
  const { jwt, signupErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    dispatch(userActions.clearSignupError());
    const { email, username, password } = data;
    dispatch(signup({ email, password, username }));
  };

  const password = watch("password", "");
  useEffect(() => {
    if (signupErrorMessage) {
      toast.error("Either email or username is already in use", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
      });
      reset();
      dispatch(userActions.clearSignupError());
    }
  }, [signupErrorMessage, dispatch, reset]);

  return (
    <div className={styles["signup"]}>
      <Headling>Create new account</Headling>
      <ToastContainer />
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["field"]}>
          <label htmlFor="name">Username</label>
          <input
            className={errors.username ? styles["error"] : ""}
            id="name"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "The field must be filled in",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum 20 characters",
              },
              pattern: {
                value: /^[a-z][a-z0-9_-]*$/,
                message:
                  "You can only use lowercase English letters and numbers, - and _",
              },
            })}
          />
          {errors.username && (
            <p className={styles["error"]}>{errors.username.message}</p>
          )}
        </div>
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
          <label htmlFor="password">Password</label>
          <input
            className={errors.password ? styles["error"] : ""}
            id="password"
            type="password"
            placeholder="Password"
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
          {errors.password && (
            <p className={styles["error"]}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Repeat password</label>
          <input
            className={errors.confirmPassword ? styles["error"] : ""}
            id="confirmPassword"
            type="password"
            placeholder="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className={styles["error"]}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className={styles["terms"]}>
          <input
            type="checkbox"
            {...register("terms", {
              required: "You must agree to the terms",
            })}
          />
          <p>I agree to the processing of my personal information</p>
        </div>
        {errors.terms && (
          <p className={styles["checkbox-error"]}>{errors.terms.message}</p>
        )}
        <Button className={styles["signup-button"]}>Create</Button>
      </form>
      <div className={styles["links"]}>
        <div>Already have an account?</div>
        <Link to="/login">
          <p className={styles["sign-in"]}>Sign in</p>
        </Link>
      </div>
    </div>
  );
}
