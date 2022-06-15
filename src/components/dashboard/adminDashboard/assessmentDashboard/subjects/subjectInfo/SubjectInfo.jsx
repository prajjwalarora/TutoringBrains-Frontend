import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import QuestionInfo from "../../questions/questionInfo/QuestionInfo";
import classes from "./SubjectInfo.module.css";
const SubjectInfo = (props) => {
  const [isCollapseClicked, setIsCollapseClicked] = useState(false);
  return (
    <div className={classes["container"]}>
      {/* <div className={classes["container-header-top"]}>
        <div className={classes["container-header-inner"]}>
          <h3>Subject</h3>
        </div>
      </div> */}
      <div className={classes["container-header"]}>
        <div className={classes["container-header-inner"]}>
          <h3>Subject Name:</h3> <p>{props.subjectInfo.name}</p>
        </div>
        <div className={classes["container-header-inner"]}>
          <h3>Duraration:</h3> <p>{props.subjectInfo.duration}</p>
        </div>
      </div>
      <div>
        <div
          className={`${classes["qn-info-container"]} ${
            isCollapseClicked ? classes["qn-info-container-collapsed"] : ""
          }`}
        >
          {props.questions &&
            props.questions.map((question, index) => (
              <QuestionInfo
                key={question._id}
                count={index + 1}
                questionData={question}
              />
            ))}
        </div>
        <div className={classes["btn-container"]}>
          {props.questions && props.questions.length > 0 && (
            <button
              type="button"
              className={`btn btn-dark-blue btn-auth ${classes["collpase-btn"]}`}
              onClick={() => setIsCollapseClicked((prev) => !prev)}
            >
              {isCollapseClicked ? "Expand" : "Collapse"}
            </button>
          )}
          <button
            className="btn btn-dark-blue btn-auth"
            onClick={props.onClickCreateAndAddQuestionHandler.bind(
              null,
              props.subjectInfo.id
            )}
          >
            <AddIcon style={{ fontSize: 18 }} /> Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectInfo;
