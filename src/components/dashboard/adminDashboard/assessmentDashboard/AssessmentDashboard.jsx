import React, { useEffect, useState } from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardChip from "../dashboardChip/DashboardChip";
import classes from "./AssessmentDashboard.module.css";
import useHttp from "../../../../hooks/use-http";
import NoDataFound from "../../../../assets/images/no_data_found.svg";
import {
  getPublishedAssessment,
  getUnpublishedAssessment,
} from "../../../../lib/api";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../../ui/loader/Loader";

const AssessmentDashboard = (props) => {
  const [unpublishedAssessments, setUnpublishedAssessments] = useState(null);
  const [publishedAssessments, setPublishedAssessments] = useState(null);
  const [completedAssessments, setCompletedAssessments] = useState(null);
  const auth = useSelector((data) => data.auth);
  const { sendRequest, data, status, error } = useHttp(
    getUnpublishedAssessment
  );
  const {
    sendRequest: publishedReq,
    data: publishedReqData,
    status: publishedReqStatus,
    error: publishedReqError,
  } = useHttp(getPublishedAssessment);
  const history = useHistory();
  useEffect(() => {
    sendRequest({ token: auth.token });
  }, [sendRequest, auth]);

  useEffect(() => {
    publishedReq({ token: auth.token });
  }, [publishedReq, auth]);

  useEffect(() => {
    if (status === "completed" && !error && data) {
      if (!unpublishedAssessments) {
        setUnpublishedAssessments(data.assessment);
      }
    }
  }, [status, data, error, unpublishedAssessments]);

  useEffect(() => {
    if (
      publishedReqStatus === "completed" &&
      !publishedReqError &&
      publishedReqData
    ) {
      if (!publishedAssessments) {
        const published = [];
        const completed = [];

        publishedReqData.assessment.forEach((assess) => {
          if (assess.isExpired) {
            completed.push(assess);
          } else {
            published.push(assess);
          }
        });
        setPublishedAssessments(published);
        setCompletedAssessments(completed);
      }
    }
  }, [
    publishedReqStatus,
    publishedReqData,
    publishedReqError,
    publishedAssessments,
  ]);

  const onArrowClickHandler = (assessmentId) => {
    history.push({
      pathname: "/dashboard/user/assessments/create-assessment",
      search: `?id=${assessmentId}`,
    });
  };
  console.log(publishedReqData);
  return (
    <div className={classes["assessment-dashboard"]}>
      <div className={classes["assessment-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Unpublished Assessments</h1>
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
        {status === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {unpublishedAssessments && unpublishedAssessments.length > 0 && (
          <div className={classes["assessment-card-container"]}>
            {unpublishedAssessments &&
              unpublishedAssessments.map((assessment, index) => (
                <DashboardCard
                  key={index}
                  cardType={index === 0 ? 1 : (index % 2) + 1}
                  statusType={1}
                  cardData={assessment}
                  onArrowClickHandler={onArrowClickHandler.bind(
                    null,
                    assessment["_id"]
                  )}
                />
              ))}

            {/* <DashboardCard cardType={2} statusType={1} cardData={{}} /> */}
          </div>
        )}
        {status === "completed" &&
          unpublishedAssessments &&
          unpublishedAssessments.length === 0 && (
            <div className="no-data-container">
              <img src={NoDataFound} alt="no data found" />
              <p className={classes["assessment-null"]}>
                No Unpublished Assessments
              </p>
            </div>
          )}
      </div>

      <div className={classes["assessment-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Published Assessments</h1>
        </div>
        {publishedReqStatus === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {publishedAssessments && publishedAssessments.length > 0 && (
          <div className={classes["assessment-card-container"]}>
            {publishedAssessments &&
              publishedAssessments.map((assessment, index) => (
                <DashboardCard
                  key={index}
                  cardType={index === 0 ? 1 : (index % 2) + 1}
                  statusType={1}
                  cardData={assessment}
                  onArrowClickHandler={onArrowClickHandler.bind(
                    null,
                    assessment["_id"]
                  )}
                />
              ))}

            {/* <DashboardCard cardType={2} statusType={1} cardData={{}} /> */}
          </div>
        )}
        {((publishedReqStatus === "completed" &&
          publishedAssessments &&
          publishedAssessments.length === 0) ||
          !publishedAssessments) && (
          <div className="no-data-container">
            <img src={NoDataFound} alt="no data found" />
            <p className={classes["assessment-null"]}>
              No Unpublished Assessments
            </p>
          </div>
        )}
      </div>
      <div className={classes["assessment-past"]}>
        <div className={classes["header"]}>
          <h1>Completed Assessments</h1>
        </div>
        {(!completedAssessments ||
          (status === "completed" &&
            completedAssessments &&
            completedAssessments.length === 0)) && (
          <div className="no-data-container">
            <img src={NoDataFound} alt="no data found" />
            <p className={classes["assessment-null"]}>
              No Completed Assessments
            </p>
          </div>
        )}
        {status === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {completedAssessments && completedAssessments.length > 0 && (
          <div className={classes["assessment-card-container"]}>
            {completedAssessments &&
              completedAssessments.map((assessment, index) => (
                <DashboardChip
                  key={index}
                  cardType={3}
                  statusType={2}
                  cardData={assessment}
                  onArrowClickHandler={onArrowClickHandler.bind(
                    null,
                    assessment["_id"]
                  )}
                />
              ))}

            {/* <DashboardCard cardType={2} statusType={1} cardData={{}} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentDashboard;
