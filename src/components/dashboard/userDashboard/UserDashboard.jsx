import DashboardHeader from "../../ui/dashboardHeader/DashboardHeader";
import classes from "./UserDashboard.module.css";
import UserDashboardSideNav from "./userDashboardSideNav/UserDashboardSideNav";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import TimerIcon from "@mui/icons-material/Timer";
import { useState } from "react";
import { useEffect } from "react";
let id,
  counter = 59;
const UserDashboard = () => {
  const [time, setTime] = useState(59);
  const [minute, setMinute] = useState(4);
  useEffect(() => {
    id = setInterval(() => {
      if (counter > 0) {
        setTime((prev) => prev - 1);
        counter -= 1;
      } else {
        setTime(59);
        counter = 59;
      }
      if (counter === 0) {
        clearInterval(id);
      } else {
        if (time === 0) setMinute((prev) => prev - 1);
      }
    }, 1000);
  }, [setTime, setMinute, time]);
  return (
    <div className={classes["dashboard"]}>
      <DashboardHeader />
      <div className={`${classes["dashboard-inner"]} container-inner-big`}>
        <div className={classes["dashboard-sidebar"]}>
          <UserDashboardSideNav />
        </div>
        <div className={classes["dashboard-main"]}>
          <div
            className={`${classes["assessment-card"]} ${classes["assessment-card-1"]}`}
          >
            <div className={classes["text-container"]}>
              <h3>
                <span>
                  <ListAltOutlinedIcon />
                </span>
                Problem Solving
              </h3>
            </div>
            <div className={classes["timer"]}>
              <TimerIcon style={{ fontSize: 20 }} />
              <span>
                0{minute}M:{time > 10 ? `${time}` : `0${time}`}S
              </span>
            </div>
            <div className={classes["arc"]}>
              <span>&rarr;</span>
            </div>
          </div>
          <div
            className={`${classes["assessment-card"]} ${classes["assessment-card-2"]}`}
          >
            <div className={classes["text-container"]}>
              <h3>
                <span>
                  <ListAltOutlinedIcon />
                </span>
                Problem Solving
              </h3>
            </div>
            <div className={classes["timer"]}>
              <TimerIcon style={{ fontSize: 20 }} />
              <span>
                0{minute}M:{time > 10 ? `${time}` : `0${time}`}S
              </span>
            </div>
            <div className={`${classes["arc"]} ${classes["arc-2"]}`}>
              <span>&rarr;</span>
            </div>
          </div>
          {/* <div className={classes["assessment-card"]}></div> */}
          {/* <div className={classes["assessment-card"]}></div> */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
