import AddIcon from "@mui/icons-material/Add";
import classes from "./AssessmentInfo.module.css";
const AssessmentInfo = (props) => {
  return (
    <div className={classes["container"]}>
      <div className={classes["container-header"]}>
        <div className={classes["container-header-inner"]}>
          <h3>Assessment Name:</h3> <p>{props.assessmentInfo.name}</p>
        </div>
        <div className={classes["container-header-inner"]}>
          <h3>Duraration:</h3> <p>{props.assessmentInfo.duration}</p>
        </div>
      </div>
      <div className={classes["btn-container"]}>
        <button
          className="btn btn-dark-blue btn-auth"
          onClick={props.onClickCreateAndAddSubjectHandler}
        >
          <AddIcon style={{ fontSize: 18 }} /> Add Subject
        </button>
      </div>
    </div>
  );
};

export default AssessmentInfo;
