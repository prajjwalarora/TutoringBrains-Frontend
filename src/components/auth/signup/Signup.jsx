import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "./Signup.module.css";
import useHttp from "../../../hooks/use-http";
import { signup } from "../../../lib/api";
import { toast } from "react-toastify";
let id;
const Signup = () => {
  const formInnerContainer = useRef();
  const formInner = useRef();
  const [formStepCount, setFormStepCount] = useState(1);
  const { sendRequest, data, status, error } = useHttp(signup);
  const history = useHistory();
  useEffect(() => {
    if (formStepCount <= 2) {
      formInner.current.scrollTo(
        formInnerContainer.current.scrollWidth * (formStepCount - 1),
        0
      );
    }
  }, [formStepCount]);

  useEffect(() => {
    if (status === "pending") {
      id = toast.loading("Signing up...", {
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
          render: "Account created successfully!!",
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
        setTimeout(() => {
          history.push("/dashboard/user");
        }, 500);
      } else {
        toast.update(id, {
          render: "Signup failed",
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
  }, [status, error, history]);
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());
    if (formStepCount === 1 && (!formData.name || !formData.email)) {
      return alert("Name and Email Required!");
    }
    if (
      formStepCount === 2 &&
      (!formData.password || !formData.passwordConfirm)
    ) {
      return alert("Password and Password Confirm Required!");
    }
    if (formData.password !== formData.passwordConfirm) {
      return alert("Password and Password Confirm doesn't match!");
    }
    if (formStepCount < 2) {
      setFormStepCount((prevCount) => prevCount + 1);
    }

    if (formStepCount === 2) {
      if (formData.password.length < 8) {
        return (id = toast.error("Password length is less then 8", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }));
      }
      console.log(formData);
      // const userData = {
      //   email: formData.email,
      //   password: formData.password,
      // };
      sendRequest(formData);
    }
  };
  return (
    <Fragment>
      <div className={classes["card-header"]}>
        <h3>Sign Up</h3>
        <p>Create new account</p>
      </div>
      <hr />
      <form action="" className={classes["form"]} onSubmit={formSubmitHandler}>
        <div ref={formInner} className={classes["form-inner"]}>
          <div
            ref={formInnerContainer}
            className={classes["form-inner-container"]}
          >
            <div className={classes["form-field"]}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please enter your full name."
              />
            </div>
            <div className={classes["form-field"]}>
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                name="email"
                placeholder="Please enter your Email address"
              />
            </div>
          </div>
          <div className={classes["form-inner-container"]}>
            <div className={classes["form-field"]}>
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                placeholder="Please enter your password."
              />
            </div>
            <div className={classes["form-field"]}>
              <label htmlFor="signup-password-confirm">Password Confirm</label>
              <input
                type="password"
                id="signup-password-confirm"
                name="passwordConfirm"
                placeholder="Please renter your Password"
              />
            </div>
          </div>
        </div>
        <div
          className={`${classes["form-field"]} ${classes["form-field-button"]}`}
        >
          {history.location.pathname.includes("signupd") && (
            <button type="submit" className="btn btn-blue btn-auth">
              {formStepCount < 2 ? "Next" : "Submit"}
              {formStepCount < 2 && (
                <ArrowForwardIosIcon
                  style={{ fontSize: "1.3rem", marginLeft: ".5rem" }}
                />
              )}
            </button>
          )}
        </div>
      </form>
      <hr />
      <div className={classes["link-text"]}>
        <p>
          Already Have an account? <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Signup;
