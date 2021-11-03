import icon from "../../../assets/images/tutoring-brains-icon.svg";
import classes from "./Header.module.css";
import Nav from "./nav/Nav";
import TimerNav from "./timerNav/TimerNav";

const Header = (props) => {
  return (
    <div className={classes["header"]}>
      <div className={`container-inner ${classes["header-inner"]}`}>
        <div className={classes["logo-container"]}>
          <img src={icon} alt="tutoringBrains icon" />
        </div>
        {props.isNav && <Nav />}
        {props.isTimer && <TimerNav totalTime={props.totalTime} />}
      </div>
    </div>
  );
};

export default Header;
