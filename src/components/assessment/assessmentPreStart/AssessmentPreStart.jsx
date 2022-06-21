import { Fragment, useEffect } from "react";
import Header from "../../ui/header/Header";
import classes from "./AssessmentPreStart.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useHistory, useLocation } from "react-router";
import useHttp from "../../../hooks/use-http";
import { assessmentSubmission } from "../../../lib/api";
import useLoader from "../../../hooks/use-loader";
import { useSelector } from "react-redux";
const AssessmentPreStart = (props) => {
  const { sendRequest, status, data, error } = useHttp(assessmentSubmission);
  const auth = useSelector((data) => data.auth);
  const history = useHistory();
  const location = useLocation();

  useLoader(
    status,
    error,
    "Submitting response",
    "Response Submitted  Successfully.",
    "Response Submission failed."
  );

  useEffect(() => {
    if (status === "completed" && !error) {
      history.replace({
        pathname: "/dashboard/user/assessments/",
      });
    }
  }, [status, history, error]);

  const activeAssessment = (id) => {
    history.replace(`${location.pathname}${location.search}?quizId=${id}`);
  };

  const onResponseSubmitClickHandler = () => {
    const storedAssessmentResponseData = JSON.parse(
      localStorage.getItem("assessmentResponseData")
    );
    sendRequest({
      token: auth.token,
      responseData: storedAssessmentResponseData,
    });
    localStorage.removeItem("assessmentResponseData");
    props.onfullScreenCloseClickHandler();
  };
  return (
    <Fragment>
      <Header />
      <div className="container-nh">
        <div className={`${classes["pre-window"]} container-inner`}>
          <div className={classes["heading-container"]}>
            <h2>{props.quizHeading}</h2>
            <h3>Upcomings</h3>
          </div>
          {props.quizInfo.map((info, i) => (
            <div
              key={info.id}
              className={`card ${
                props.quizCompleted.includes(info.id) ? "disabled" : ""
              } ${classes["step-card"]}`}
              onClick={activeAssessment.bind(null, info.id)}
            >
              <div className={classes["step-card-inner"]}>
                <div className={classes["step-card-left"]}>
                  <h4>{`${i + 1}. ${info.name}`}</h4>
                  <div className={classes["step-info"]}>
                    <p>
                      <span>Total Questions:</span> {info.totalQuestions}
                    </p>
                    <p>
                      <span>Total Time:</span> {info.timeDuration} min
                    </p>
                  </div>
                </div>

                {/* {i !== 0
                  ? props.quizCompleted.includes(info.id) && (
                      <div className={classes["step-card-arrow"]}>
                        <div className={classes["arrow-container"]}>
                          <KeyboardArrowRightIcon
                            style={{ fontSize: 50, color: "#fff" }}
                          />
                        </div>
                      </div>
                    )
                  : !props.quizCompleted.includes(info.id) && (
                      <div className={classes["step-card-arrow"]}>
                        <div className={classes["arrow-container"]}>
                          <KeyboardArrowRightIcon
                            style={{ fontSize: 50, color: "#fff" }}
                          />
                        </div>
                      </div>
                    )} */}
                {!props.quizCompleted.includes(info.id) && (
                  <div className={classes["step-card-arrow"]}>
                    <div className={classes["arrow-container"]}>
                      <KeyboardArrowRightIcon
                        style={{ fontSize: 50, color: "#fff" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className={classes["btn-container"]}>
            <button
              type="button"
              className="btn btn-dark-blue btn-auth"
              onClick={onResponseSubmitClickHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AssessmentPreStart;
