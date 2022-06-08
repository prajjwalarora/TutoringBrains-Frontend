import React, { Fragment, useEffect, useState } from "react";
import shuffle from "../../../../utils/shuffle";
import classes from "./QnWindow.module.css";
const QnWindow = (props) => {
  const [question, setQuestion] = useState();
  const [selectedAns, setSelectedAns] = useState(null);
  const currQnNumber = props.currentQn;
  useEffect(() => {
    if (props.qnData && props.qnData.length > 0) {
      const data = props.qnData[currQnNumber - 1];
      setQuestion(data);
      const storedAssessmentResponseData = JSON.parse(
        localStorage.getItem("assessmentResponseData")
      );

      const selectedAns =
        storedAssessmentResponseData["selectedAnswers"][props.subjectId][
          data.id
        ];
      selectedAns && setSelectedAns(selectedAns);
    }
  }, [props, currQnNumber]);
  return (
    <Fragment>
      {question && (
        <>
          <div className={`card ${classes["qn-card"]}`}>
            <p>{`Q${currQnNumber}. ${question.text}`}</p>
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
                    name={`${question.id}`}
                    value={ans.id}
                    defaultChecked={selectedAns === ans.id}
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

export default React.memo(QnWindow);
