import { useState } from "react";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import TimerIcon from "@mui/icons-material/Timer";
import classes from "./DashboardCard.module.css";

const DashboardCard = (props) => {
  const [time, setTime] = useState(59);
  const [minute, setMinute] = useState(4);
  return (
    <div
      className={`${classes["card"]} ${classes[`card-${props.cardType || 1}`]}`}
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
      {props.statusType == 1 && (
        <div
          className={`${classes["arc"]} ${
            classes[`arc-${props.cardType || 1}`]
          }`}
        >
          <span>&rarr;</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
