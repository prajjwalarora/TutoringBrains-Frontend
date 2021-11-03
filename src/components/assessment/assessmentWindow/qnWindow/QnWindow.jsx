import { Fragment, useEffect, useState } from "react";
import shuffle from "../../../../utils/shuffle";
import classes from "./QnWindow.module.css";
const QnWindow = (props) => {
  const [question, setQuestion] = useState();
  const currQnNumber = 1;
  useEffect(() => {
    const data = props.qnData[currQnNumber];
    setQuestion(data);
  }, [props.qnData]);
  return (
    <Fragment>
      {question && (
        <>
          <div className={`card ${classes["qn-card"]}`}>
            <p>{`Q${currQnNumber}. ${question.question.text}`}</p>
          </div>
          <div className={classes["ans-container"]}>
            {shuffle(question.answers).map((ans) => (
              <label
                htmlFor={ans.id}
                key={ans.id}
                className={`card ${classes["ans-card"]}`}
              >
                <div className={classes["ans-card-inner"]}>
                  <input
                    type="radio"
                    id={ans.id}
                    name={`${question.question.id}/ans-selected`}
                    value={ans.id}
                  />
                  <p className={classes["ans-text"]}>{ans.text}</p>
                </div>
              </label>
            ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default QnWindow;
