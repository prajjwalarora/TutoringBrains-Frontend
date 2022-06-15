import React, { useEffect, useState } from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardChip from "../dashboardChip/DashboardChip";
import classes from "./AssessmentDashboard.module.css";
import useHttp from "../../../../hooks/use-http";
import {
  getPublishedAssessment,
  getUnpublishedAssessment,
} from "../../../../lib/api";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AssessmentDashboard = (props) => {
  const [unpublishedAssessments, setUnpublishedAssessments] = useState(null);
  const [publishedAssessments, setPublishedAssessments] = useState(null);
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
        setPublishedAssessments(publishedReqData.assessment);
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
          {unpublishedAssessments && unpublishedAssessments.length === 0 && (
            <p className={classes["assessment-null"]}>
              No Unpublished Assessments
            </p>
          )}
        </div>
      </div>

      <div className={classes["assessment-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Published Assessments</h1>
        </div>
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
          {publishedAssessments && publishedAssessments.length === 0 && (
            <p className={classes["assessment-null"]}>
              No Published Assessments
            </p>
          )}
        </div>
      </div>
      <div className={classes["assessment-past"]}>
        <div className={classes["header"]}>
          <h1>Completed & Ongoing Assessments</h1>
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
