import { useEffect, useState } from "react";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import TimerIcon from "@mui/icons-material/Timer";
import classes from "./MainDashboard.module.css";
import DashboardCard from "../dashboardCard/DashboardCard";

const MainDashboard = () => {
  const [time, setTime] = useState(59);
  const [minute, setMinute] = useState(4);
  useEffect(() => {
    // id = setInterval(() => {
    //   if (counter > 0) {
    //     setTime((prev) => prev - 1);
    //     counter -= 1;
    //   } else {
    //     setTime(59);
    //     counter = 59;
    //   }
    //   if (counter === 0) {
    //     clearInterval(id);
    //   } else {
    //     if (time === 0) setMinute((prev) => prev - 1);
    //   }
    // }, 1000);
  }, [setTime, setMinute, time]);
  return (
    <div className={classes["dashboard-main"]}>
      <DashboardCard cardType={1} />
      <DashboardCard cardType={2} />
    </div>
  );
};

export default MainDashboard;
