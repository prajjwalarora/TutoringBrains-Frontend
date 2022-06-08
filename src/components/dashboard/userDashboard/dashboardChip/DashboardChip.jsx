import { useState } from "react";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EventIcon from "@mui/icons-material/Event";
import classes from "./DashboardChip.module.css";
import PieChart from "../../../ui/charts/PieChart";
import LineChart from "../../../ui/charts/LineChart";
import CloseIcon from "@mui/icons-material/Close";

const DashboardChip = (props) => {
  const [isChipDetailsOpen, setIsChipDetailsOpen] = useState(false);

  const onViewClickHandler = () => {
    setIsChipDetailsOpen((prev) => !prev);
  };
  return (
    <div className={classes["card-outer"]}>
      <div
        className={`${classes["card"]} ${
          classes[`card-${props.cardType || 1}`]
        }`}
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
          <EventIcon style={{ fontSize: 20 }} />
          <span>13/05/2022</span>
        </div>
        <div
          className={`${classes["arc"]} ${
            classes[`arc-${props.cardType || 1}`]
          }`}
          onClick={onViewClickHandler}
        >
          <span>
            {isChipDetailsOpen ? (
              <CloseIcon style={{ fontSize: 26, marginTop: "30%" }} />
            ) : (
              "view"
            )}
          </span>
        </div>
      </div>
      <div
        className={`${classes["chip-details"]} ${
          isChipDetailsOpen ? "" : classes["chip-details-closed"]
        }`}
      >
        <div className={classes["chip-details-inner"]}>
          <div className={classes["text-info-container"]}>
            <div className={classes["text-info"]}>
              <p>
                Total Students enrolled: <span>200</span>
              </p>
            </div>
            <div className={classes["text-info"]}>
              <p>
                Total Submission: <span>180</span>
              </p>
            </div>
            <div className={classes["text-info"]}>
              <p>
                Total Marks: <span>100</span>
              </p>
            </div>
            <div className={classes["text-info"]}>
              <p>
                Marks Scored: <span>70</span>
              </p>
            </div>
          </div>
          <div className={classes["chart-container"]}>
            <div className={classes["chart-1"]}>
              <LineChart />
            </div>
            <div className={classes["chart-2"]}>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChip;
