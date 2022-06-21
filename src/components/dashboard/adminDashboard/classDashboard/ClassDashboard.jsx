import React, { useEffect, useState } from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import classes from "./ClassDashboard.module.css";
import useHttp from "../../../../hooks/use-http";
import { getAuthorClassess } from "../../../../lib/api";
import { useSelector } from "react-redux";
import Loader from "../../../ui/loader/Loader";
import { useHistory } from "react-router";
import NoDataFound from "../../../../assets/images/no_data_found.svg";

const ClassDashboard = (props) => {
  const [scheduledClasses, setScheduledClasses] = useState(null);
  const [previousClasses, setPreviousClasses] = useState(null);
  const history = useHistory();
  const auth = useSelector((data) => data.auth);
  const { sendRequest, data, status, error } = useHttp(getAuthorClassess);

  useEffect(() => {
    sendRequest({ token: auth.token });
  }, [auth, sendRequest]);

  useEffect(() => {
    if (status === "completed" && !error && data) {
      if (!scheduledClasses) {
        setScheduledClasses(data.classes);
      }
    }
  }, [status, data, error, scheduledClasses]);
  const onArrowClickHandler = (roomId) => {
    history.push({
      pathname: "/classess/join",
      search: `?id=${roomId}&type=instructor`,
    });
  };
  return (
    <div className={classes["class-dashboard"]}>
      <div className={classes["class-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Scheduled Classes</h1>
          <button
            className={`btn btn-blue btn-auth ${classes["new-assessment-btn"]}`}
            onClick={props.onCreateClassClickHandler}
          >
            <AddCircleOutlineIcon
              style={{ fontSize: 16, marginRight: 4, marginBottom: 2 }}
            />
            Schedule classes
          </button>
        </div>
        {status === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {scheduledClasses && scheduledClasses.length > 0 && (
          <div className={classes["class-card-container"]}>
            {scheduledClasses &&
              scheduledClasses.map((classes, index) => (
                <DashboardCard
                  key={index}
                  actionType="class"
                  cardType={index === 0 ? 1 : (index % 2) + 1}
                  statusType={1}
                  cardData={classes}
                  onArrowClickHandler={onArrowClickHandler.bind(
                    null,
                    classes["roomId"]
                  )}
                />
              ))}

            {/* <DashboardCard cardType={2} statusType={1} cardData={{}} /> */}
          </div>
        )}
        {((status === "completed" &&
          scheduledClasses &&
          scheduledClasses.length === 0) ||
          !scheduledClasses) && (
          <div className="no-data-container">
            <img src={NoDataFound} alt="no data found" />
            <p className={classes["assessment-null"]}>No Scheduled Classes</p>
          </div>
        )}
      </div>
      <div className={classes["class-past"]}>
        <div className={classes["header"]}>
          <h1>Previous Classes</h1>
        </div>
        {status === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {previousClasses && previousClasses.length > 0 && (
          <div className={classes["class-card-container"]}>
            {previousClasses &&
              previousClasses.map((classes, index) => (
                <DashboardCard
                  key={index}
                  cardType={3}
                  actionType="class"
                  statusType={2}
                  cardData={previousClasses}
                  onArrowClickHandler={onArrowClickHandler.bind(
                    null,
                    classes["roomId"]
                  )}
                />
              ))}

            {/* <DashboardCard cardType={2} statusType={1} cardData={{}} /> */}
          </div>
        )}
        {((status === "completed" &&
          previousClasses &&
          previousClasses.length === 0) ||
          !previousClasses) && (
          <div className="no-data-container">
            <img src={NoDataFound} alt="no data found" />
            <p className={classes["assessment-null"]}>
              No Previous Classes found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDashboard;
