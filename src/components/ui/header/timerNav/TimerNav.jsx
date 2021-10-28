import TimerIcon from "@mui/icons-material/Timer";
import classes from "./TimerNav.module.css";
const TimerNav = () => {
  return (
    <div className={classes["nav-container"]}>
      <h3 className={classes["timer"]}>
        <TimerIcon style={{ fontSize: "2rem" }} />
        <span style={{ marginLeft: ".5rem" }}>01:00</span>
      </h3>
      <button className={`btn btn-red-field ${classes["finish-btn"]}`}>
        Finish test
      </button>
    </div>
  );
};

export default TimerNav;
