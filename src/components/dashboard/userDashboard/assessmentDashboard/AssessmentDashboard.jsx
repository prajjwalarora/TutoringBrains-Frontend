import React from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import DashboardChip from "../dashboardChip/DashboardChip";
import classes from "./AssessmentDashboard.module.css";

const AssessmentDashboard = () => {
  return (
    <div className={classes["assessment-dashboard"]}>
      <div className={classes["assessment-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Upcoming Assessments</h1>
        </div>
        <div className={classes["assessment-card-container"]}>
          <DashboardCard cardType={1} statusType={1} />
          <DashboardCard cardType={2} statusType={1} />
        </div>
      </div>
      <div className={classes["assessment-past"]}>
        <div className={classes["header"]}>
          <h1>Previous Assessments</h1>
        </div>
        <div className={classes["assessment-card-container"]}>
          <DashboardChip cardType={3} statusType={2} />
          <DashboardChip cardType={3} statusType={2} />
          <DashboardChip cardType={3} statusType={2} />
          <DashboardChip cardType={3} statusType={2} />
          <DashboardChip cardType={3} statusType={2} />
        </div>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
