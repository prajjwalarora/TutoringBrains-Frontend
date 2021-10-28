import { Fragment } from "react";
import classes from "./QnWindow.module.css";
const QnWindow = () => {
  return (
    <Fragment>
      <div className={`card ${classes["qn-card"]}`}>
        <p>
          Q1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className={classes["ans-container"]}>
        <div className={`card ${classes["ans-card"]}`}>
          <div className={classes["ans-card-inner"]}>
            <input type="radio" />
            <label htmlFor="">Loream Ipsum dolor sit amet</label>
          </div>
        </div>
        <div className={`card ${classes["ans-card"]}`}>
          <div className={classes["ans-card-inner"]}>
            <input type="radio" />
            <label htmlFor="">Loream Ipsum dolor sit amet</label>
          </div>
        </div>
        <div className={`card ${classes["ans-card"]}`}>
          <div className={classes["ans-card-inner"]}>
            <input type="radio" />
            <label htmlFor="">Loream Ipsum dolor sit amet</label>
          </div>
        </div>
        <div className={`card ${classes["ans-card"]}`}>
          <div className={classes["ans-card-inner"]}>
            <input type="radio" />
            <label htmlFor="">Loream Ipsum dolor sit amet</label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default QnWindow;
