import React from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import classes from "./ClassDashboard.module.css";

const ClassDashboard = () => {
  return (
    <div className={classes["class-dashboard"]}>
      <div className={classes["class-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Upcoming Classes</h1>
        </div>
        <div className={classes["class-card-container"]}>
          <DashboardCard cardType={1} statusType={1} />
          <DashboardCard cardType={2} statusType={1} />
        </div>
      </div>
      <div className={classes["class-past"]}>
        <div className={classes["header"]}>
          <h1>Previous Classes</h1>
        </div>
        <div className={classes["class-card-container"]}>
          <DashboardCard cardType={3} statusType={2} />
          <DashboardCard cardType={3} statusType={2} />
          <DashboardCard cardType={3} statusType={2} />
          <DashboardCard cardType={3} statusType={2} />
          <DashboardCard cardType={3} statusType={2} />
          <DashboardCard cardType={3} statusType={2} />
          <DashboardCard cardType={3} statusType={2} />
          <DashboardCard cardType={3} statusType={2} />
        </div>
      </div>
    </div>
  );
};

export default ClassDashboard;
