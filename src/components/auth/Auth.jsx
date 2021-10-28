import authIllustration from "../../assets/images/login-illustration.svg";
import classes from "./Auth.module.css";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname.includes("signup")) {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [history.location.pathname]);
  return (
    <div className="container">
      <div className={`container-inner ${classes["auth-container"]}`}>
        <div className={classes["illustration-container"]}>
          <img src={authIllustration} alt="auth illustration" />
        </div>
        <div className={classes["auth-card-inner"]}>
          <div
            className={`${classes["card-container"]} ${
              isSignup ? classes["show-signup"] : ""
            }`}
          >
            <div
              className={`${classes["auth-card"]} ${classes["auth-card-login"]}`}
            >
              <Login />
            </div>
            <div
              className={`${classes["auth-card"]} ${classes["auth-card-signup"]}`}
            >
              <Signup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
