import React, { useEffect, useState } from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import classes from "./MainDashboard.module.css";
import useHttp from "../../../../hooks/use-http";
import { getAuthorClassess, getStudentClasses } from "../../../../lib/api";
import { useSelector } from "react-redux";
import Loader from "../../../ui/loader/Loader";
import { useHistory } from "react-router";
import NoDataFound from "../../../../assets/images/no_data_found.svg";

const MainDashboard = () => {
  const [time, setTime] = useState(59);
  const [minute, setMinute] = useState(4);
  const [scheduledClasses, setScheduledClasses] = useState(null);
  const [previousClasses, setPreviousClasses] = useState(null);
  const history = useHistory();
  const auth = useSelector((data) => data.auth);
  const { sendRequest, data, status, error } = useHttp(getStudentClasses);

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
      search: `?id=${roomId}&type=student`,
    });
  };
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
      <div className={classes["class-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Scheduled Classes</h1>
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
        {status === "completed" &&
          scheduledClasses &&
          scheduledClasses.length === 0 && (
            <div className="no-data-container">
              <img src={NoDataFound} alt="no data found" />
              <p className={classes["assessment-null"]}>No Scheduled Classes</p>
            </div>
          )}
      </div>
      {/* <DashboardCard
        cardType={1}
        statusType={1}
        cardData={{}}
        onArrowClickHandler={() => {}}
      />
      <DashboardCard
        cardType={2}
        statusType={1}
        cardData={{}}
        onArrowClickHandler={() => {}}
      /> */}
    </div>
  );
};

export default MainDashboard;
