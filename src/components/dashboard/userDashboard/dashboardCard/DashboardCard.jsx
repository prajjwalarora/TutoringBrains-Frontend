import { useState } from "react";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
// import TimerIcon from "@mui/icons-material/Timer";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import classes from "./DashboardCard.module.css";

const DashboardCard = (props) => {
  // console.log(props.cardType);
  // const [time, setTime] = useState(59);
  // const [minute, setMinute] = useState(4);
  // console.log(props.cardData);
  return (
    <div
      className={`${classes["card"]} ${classes[`card-${props.cardType || 1}`]}`}
    >
      <div className={classes["text-container"]}>
        <h3>
          <span>
            {props.actionType === "class" ? (
              <OndemandVideoIcon />
            ) : (
              <ListAltOutlinedIcon />
            )}
          </span>
          {props.cardData.name || "Problem Solving"}
        </h3>
      </div>
      <div>
        <div className={classes["date"]}>
          <CalendarMonthIcon style={{ fontSize: 20 }} />
          <span>
            {(props.cardData.examDate &&
              props.cardData.examDate.split("T")[0]) ||
              (props.cardData.classDate &&
                props.cardData.classDate.split("T")[0]) ||
              "2022-06-21"}
          </span>
        </div>
        <div className={classes["time"]}>
          <AccessTimeIcon style={{ fontSize: 20 }} />
          <span>
            {(props.cardData.examDate &&
              `${props.cardData.examDate.split("T")[1].split(":")[0]}:${
                props.cardData.examDate.split("T")[1].split(":")[1]
              }:00`) ||
              (props.cardData.classDate &&
                `${props.cardData.classDate.split("T")[1].split(":")[0]}:${
                  props.cardData.classDate.split("T")[1].split(":")[1]
                }:00`) ||
              "11:00:00"}
          </span>
        </div>
      </div>
      {props.statusType === 1 && (
        <div
          className={`${classes["arc"]} ${
            classes[`arc-${props.cardType || 1}`]
          }`}
          onClick={props.onArrowClickHandler}
        >
          <span>&rarr;</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
