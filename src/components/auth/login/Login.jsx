import { Fragment, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useHttp from "../../../hooks/use-http";
import { login } from "../../../lib/api";
import classes from "./Login.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
let id;
const Login = () => {
  const passwordRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { sendRequest, status, data, error } = useHttp(login);
  const passwordToggleHandler = (event) => {
    if (isShowPassword) {
      setIsShowPassword((state) => !state);
      passwordRef.current.type = "password";
    } else {
      setIsShowPassword((state) => !state);
      passwordRef.current.type = "text";
    }
  };

  useEffect(() => {
    if (status === "pending") {
      id = toast.loading("Logging in...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (status === "completed") {
      if (!error) {
        toast.update(id, {
          render: "Successfully Logged in",
          type: "success",
          isLoading: false,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(authActions.login({ token: data.token }));
        history.push("/dashboard/user/home");
      } else {
        toast.update(id, {
          render: "Login failed",
          type: "error",
          isLoading: false,
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [status, error, history, data, dispatch]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    toast.dismiss(id);
    const formData = Object.fromEntries(new FormData(event.target).entries());
    if (!formData.password || !formData.email) {
      // setIsError(true);
      // return (errorRef.current.innerText = "Email and Password is required!");
    }
    const userData = {
      email: formData.email,
      password: formData.password,
    };

    sendRequest(userData);
  };
  return (
    <Fragment>
      <div className={classes["card-header"]}>
        <h3>Login</h3>
        <p>Access your account</p>
      </div>
      <hr />
      <form action="" className={classes["form"]} onSubmit={formSubmitHandler}>
        <div className={classes["form-field"]}>
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="Please enter your email address"
          />
        </div>
        <div className={classes["form-field"]}>
          <label htmlFor="password">Password</label>
          <div className={classes["input-container"]}>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              placeholder="Please enter your Password"
            />
            <button
              type="button"
              className={classes["password-toggler"]}
              onClick={passwordToggleHandler}
            >
              {!isShowPassword && <VisibilityIcon />}
              {isShowPassword && <VisibilityOffIcon />}
            </button>
          </div>
        </div>
        {/* <div className={classes["form-field-inline"]}>
          <input
            type="checkbox"
            id="checkbox"
            onChange={checkboxClickHandler}
          />
          <label htmlFor="checkbox">Show Password</label>
        </div> */}
        <div
          className={`${classes["form-field"]} ${classes["form-field-button"]}`}
        >
          <button type="submit" className="btn btn-blue btn-auth">
            Login
            <ArrowForwardIosIcon
              style={{ fontSize: "1.3rem", marginLeft: ".5rem" }}
            />
          </button>
        </div>
      </form>
      <hr />
      <div className={classes["link-text"]}>
        <p>
          Don’t Have account yet? <Link to="/auth/signup">Sign up</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
