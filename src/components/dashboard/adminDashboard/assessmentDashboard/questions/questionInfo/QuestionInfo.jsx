import classes from "./QuestionInfo.module.css";
const QuestionInfo = (props) => {
  return (
    <div className={classes["container"]}>
      {/* <div className={classes["container-header-top"]}>
        <div className={classes["container-header-inner"]}>
          <h3>Question</h3>
        </div>
      </div> */}
      <div className={classes["container-header"]}>
        <div className={classes["container-inner"]}>
          <h3>Question {props.count}:</h3>
          <p>{props.questionData.text}</p>
        </div>
        <div className={classes["container-inner"]}>
          <h3>Type:</h3>
          <p>{props.questionData.type}</p>
        </div>
        <div className={classes["container-inner"]}>
          <div
            className={`${classes["container-inner-container"]} ${classes["container-inner-answers"]}`}
          >
            <h3>Answers:</h3>
            {props.questionData.answers.map((ans, index) => (
              <p key={index}>
                <span style={{ fontWeight: "bold" }}>{index + 1}</span>.{" "}
                {ans.text}
              </p>
            ))}
          </div>
        </div>
        <div className={classes["container-inner"]}>
          <div className={classes["container-inner-container"]}>
            <h3>Correct Answers:</h3>
            <p>
              {
                props.questionData.answers.filter(
                  (ans) => ans.id === props.questionData.correctAnswer
                )[0].text
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionInfo;
