import TimerIcon from "@mui/icons-material/Timer";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./TimerNav.module.css";
const TimerNav = (props) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = useCallback((e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  }, []);

  const clearTimer = useCallback(
    (e) => {
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        startTimer(e);
      }, 1000);
      Ref.current = id;
    },
    [startTimer]
  );
  const getDeadTime = useCallback(() => {
    let deadline = new Date();
    // props.totalTime
    // console.log(deadline.getSeconds());
    // deadline.setSeconds(props.totalTime * 60);
    return new Date(deadline.getTime() + props.totalTime * 60000);
  }, [props]);

  useEffect(() => {
    setTimer(`00:${props.totalTime}:00`);
    clearTimer(getDeadTime());
    return () => clearInterval(Ref.current);
  }, [clearTimer, getDeadTime, props]);

  return (
    <div className={classes["nav-container"]}>
      <h3 className={classes["timer"]}>
        <TimerIcon style={{ fontSize: "2rem" }} />
        {/* <span style={{ marginLeft: ".5rem" }}>00:{props.totalTime}:00</span> */}
        <span style={{ marginLeft: ".5rem" }}>{timer}</span>
      </h3>
      <button className={`btn btn-red-field ${classes["finish-btn"]}`}>
        Finish test
      </button>
    </div>
  );
};

export default TimerNav;
