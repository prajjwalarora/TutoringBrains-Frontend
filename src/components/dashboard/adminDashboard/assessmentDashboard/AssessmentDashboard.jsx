import React from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardChip from "../dashboardChip/DashboardChip";
import classes from "./AssessmentDashboard.module.css";

const AssessmentDashboard = (props) => {
  return (
    <div className={classes["assessment-dashboard"]}>
      <div className={classes["assessment-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Upcoming Assessments</h1>
          <button
            className={`btn btn-blue btn-auth ${classes["new-assessment-btn"]}`}
            onClick={props.onCreateAssessmentClickHandler}
          >
            <AddCircleOutlineIcon
              style={{ fontSize: 16, marginRight: 4, marginBottom: 2 }}
            />
            Create Assessment
          </button>
        </div>
        <div className={classes["assessment-card-container"]}>
          {/* <DashboardCard cardType={1} statusType={1} /> */}
          {/* <DashboardCard cardType={2} statusType={1} /> */}
          <p className={classes["assessment-null"]}>No Upcoming Assessments</p>
        </div>
      </div>
      <div className={classes["assessment-past"]}>
        <div className={classes["header"]}>
          <h1>Previous Assessments</h1>
        </div>
        <div className={classes["assessment-card-container"]}>
          <DashboardChip cardType={3} statusType={2} />
          {/* <DashboardChip cardType={3} statusType={2} /> */}
          {/* <DashboardChip cardType={3} statusType={2} /> */}
          {/* <DashboardChip cardType={3} statusType={2} /> */}
          {/* <DashboardChip cardType={3} statusType={2} /> */}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
