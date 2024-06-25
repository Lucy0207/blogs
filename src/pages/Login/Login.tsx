import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useEffect } from "react";

import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import { login, userActions } from "../../store/user.slice";
import { AppDispatcher, RootState } from "../../store/store";

import styles from "./Login.module.css";
import "react-toastify/dist/ReactToastify.css";

export type LoginForm = {
  email: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const dispatch = useDispatch<AppDispatcher>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      if (fromPage) {
        navigate(fromPage, { replace: true });
      } else {
        navigate("/");
      }
    }
  }, [jwt, navigate, fromPage]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onBlur" });

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  const onSubmit = async (data: LoginForm) => {
    dispatch(userActions.clearLoginError());
    const { email, password } = data;
    await sendLogin(email, password);
  };
  useEffect(() => {
    if (loginErrorMessage) {
      toast.error("Either password or username is not correct!", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
      });
      reset();
      dispatch(userActions.clearLoginError());
    }
  }, [loginErrorMessage, dispatch, reset]);

  return (
    <div className={styles["login"]}>
      <Headling>Sign In</Headling>
      <ToastContainer />
      <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
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
            className={errors.email ? styles["error"] : ""}
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
              maxLength: { value: 40, message: "Maximum 40 characters" },
            })}
          />
          {errors.password && (
            <p className={styles["error"]}>{errors.password.message}</p>
          )}
        </div>
        <Button className={styles["login-button"]}>Login</Button>
      </form>
      <div className={styles["links"]}>
        <div>Don't have an account yet?</div>
        <div>
          <Link to="/signup">
            <span className={styles["sign-up"]}>Sign Up.</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
