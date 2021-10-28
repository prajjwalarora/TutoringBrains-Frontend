import AnsWindow from "./ansWindow/AnsWindow";
import classes from "./AssessmentWindow.module.css";
import QnWindow from "./qnWindow/QnWindow";
const AssessmentWindow = () => {
  return (
    <div className={classes["assess-container"]}>
      <div className={classes["qn-container"]}>
        <QnWindow />
      </div>
      <div className={classes["answered-container"]}>
        <AnsWindow />
      </div>
    </div>
  );
};

export default AssessmentWindow;
