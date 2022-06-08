import { Fragment } from "react";
import Header from "../../ui/header/Header";
import classes from "./AssessmentPreStart.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useHistory, useLocation } from "react-router";
const AssessmentPreStart = (props) => {
  const history = useHistory();
  const location = useLocation();
  const activeAssessment = (id) => {
    history.replace(`${location.pathname}${location.search}?quizId=${id}`);
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
              className={`card ${classes["step-card"]}`}
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
                  ? info.isCompleted && (
                      <div className={classes["step-card-arrow"]}>
                        <div className={classes["arrow-container"]}>
                          <KeyboardArrowRightIcon
                            style={{ fontSize: 50, color: "#fff" }}
                          />
                        </div>
                      </div>
                    )
                  : !info.isCompleted && (
                      <div className={classes["step-card-arrow"]}>
                        <div className={classes["arrow-container"]}>
                          <KeyboardArrowRightIcon
                            style={{ fontSize: 50, color: "#fff" }}
                          />
                        </div>
                      </div>
                    )} */}
                <div className={classes["step-card-arrow"]}>
                  <div className={classes["arrow-container"]}>
                    <KeyboardArrowRightIcon
                      style={{ fontSize: 50, color: "#fff" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AssessmentPreStart;
