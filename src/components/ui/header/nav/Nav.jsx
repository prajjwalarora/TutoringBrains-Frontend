import { useLocation } from "react-router";
import classes from "./Nav.module.css";
const Nav = () => {
  const location = useLocation();

  return (
    <ul className={classes["nav-list"]}>
      <li className={classes["nav-item"]}>
        <a href="/">Home</a>
      </li>
      <li className={classes["nav-item"]}>
        <a href="/">About us</a>
      </li>
      <li className={classes["nav-item"]}>
        <a href="/">Features</a>
      </li>
      {!location.pathname.includes("auth") && (
        <li className={classes["nav-item"]}>
          <button className={`btn btn-red btn-signup`}>Sign up</button>
        </li>
      )}
      {location.pathname.includes("auth") && (
        <li className={classes["nav-item"]}>
          <a href="/">Contact Us</a>
        </li>
      )}
    </ul>
  );
};

export default Nav;
