import AddIcon from "@mui/icons-material/Add";
import classes from "./AssessmentInfo.module.css";
const AssessmentInfo = (props) => {
  console.log("====================================");
  console.log(props.assessmentInfo);
  console.log("====================================");
  return (
    <div className={classes["container"]}>
      <div className={classes["container-header"]}>
        <div className={classes["container-header-inner"]}>
          <h3>Assessment Name:</h3> <p>{props.assessmentInfo.name}</p>
        </div>
        {/* <div className={classes["container-header-inner"]}>
          <h3>Duraration:</h3> <p>{props.assessmentInfo.duration}</p>
        </div> */}
      </div>
      <div className={classes["btn-container"]}>
        <button
          className="btn btn-dark-blue btn-auth"
          onClick={props.onClickCreateAndAddSubjectHandler}
        >
          <AddIcon style={{ fontSize: 18 }} /> Add Subject
        </button>
        {props.subjects &&
          props.subjects.length > 0 &&
          (props.assessmentInfo.published ? (
            <button
              type="button"
              className={`btn btn-dark-blue btn-auth ${classes["publish-btn"]}`}
              onClick={props.onClickGenerateResultHandler}
            >
              Generate Result
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn-dark-blue btn-auth ${classes["publish-btn"]}`}
              onClick={props.onClickPublishHandler}
            >
              Publish
            </button>
          ))}
      </div>
    </div>
  );
};

export default AssessmentInfo;
