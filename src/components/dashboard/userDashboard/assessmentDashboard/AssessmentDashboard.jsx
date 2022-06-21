import React, { useEffect, useState } from "react";
import DashboardCard from "../dashboardCard/DashboardCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DashboardChip from "../dashboardChip/DashboardChip";
import classes from "./AssessmentDashboard.module.css";
import useHttp from "../../../../hooks/use-http";
import NoDataFound from "../../../../assets/images/no_data_found.svg";
import {
  getAssessmentSubmission,
  getStudentAssessment,
} from "../../../../lib/api";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../../ui/loader/Loader";

const AssessmentDashboard = (props) => {
  const [assessments, setAssessments] = useState(null);
  const [isReqSent, setIsReqSent] = useState(false);
  const [previousAssessments, setPreviousAssessments] = useState(null);
  const auth = useSelector((data) => data.auth);
  const { sendRequest, data, status, error } = useHttp(getStudentAssessment);
  const {
    sendRequest: assessmentSubmission,
    data: assessmentSubmissionData,
    status: assessmentSubmissionStatus,
    error: assessmentSubmissionError,
  } = useHttp(getAssessmentSubmission);
  const history = useHistory();
  useEffect(() => {
    sendRequest({ token: auth.token });
  }, [sendRequest, auth]);

  useEffect(() => {
    if (status === "completed" && !error && data) {
      if (!isReqSent) {
        assessmentSubmission({ token: auth.token });
        // setAssessments(data.assessment);
        setIsReqSent(true);
      }
    }
  }, [status, data, error, auth, assessments, assessmentSubmission, isReqSent]);

  useEffect(() => {
    if (
      assessmentSubmissionStatus === "completed" &&
      !assessmentSubmissionError &&
      assessmentSubmissionData
    ) {
      if (!assessments && !previousAssessments) {
        const upcomming = [];
        const previous = [];
        data.assessment.forEach((assessmentData) => {
          const temp = assessmentSubmissionData.assessment.filter(
            (assess) => assessmentData.id === assess.assessment.id
          );
          if (temp.length > 0) {
            previous.push(temp[0]);
          } else {
            upcomming.push(assessmentData);
          }
        });
        setPreviousAssessments(previous);
        setAssessments(upcomming);

        // assessmentSubmission({ token: auth.token });
      }
    }
  }, [
    assessmentSubmissionStatus,
    assessmentSubmissionData,
    data,
    assessmentSubmissionError,
    auth,
    assessments,
    assessmentSubmission,
    previousAssessments,
  ]);

  const onArrowClickHandler = (assessmentId) => {
    console.log("====================================");
    console.log(assessmentId);
    console.log("====================================");
    history.push({
      pathname: `/assessment/${assessmentId}`,
    });
  };
  return (
    <div className={classes["assessment-dashboard"]}>
      <div className={classes["assessment-upcoming"]}>
        <div className={classes["header"]}>
          <h1>Upcoming Assessments</h1>
        </div>
        {status === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {assessments && assessments.length > 0 && (
          <div className={classes["assessment-card-container"]}>
            {assessments &&
              assessments.map((assessment, index) => (
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
        {(!assessments || (assessments && assessments.length === 0)) && (
          <div className="no-data-container">
            <img src={NoDataFound} alt="no data found" />
            <p className={classes["assessment-null"]}>
              No Upcomming Assessments
            </p>
          </div>
        )}
      </div>
      <div className={classes["assessment-past"]}>
        <div className={classes["header"]}>
          <h1>Previous Assessments</h1>
        </div>

        {status === "pending" && (
          <div className="no-data-container">
            <Loader />
          </div>
        )}
        {previousAssessments && previousAssessments.length > 0 && (
          <div className={classes["assessment-card-container"]}>
            {previousAssessments &&
              previousAssessments.map((assessment, index) => (
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
        {(!previousAssessments ||
          (status === "completed" &&
            previousAssessments &&
            previousAssessments.length === 0)) && (
          <div className="no-data-container">
            <img src={NoDataFound} alt="no data found" />
            <p className={classes["assessment-null"]}>
              No Completed Assessments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentDashboard;
