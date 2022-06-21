import React, { Fragment, useEffect, useState } from "react";
import Header from "../../ui/header/Header";
import AnsWindow from "./ansWindow/AnsWindow";
import classes from "./AssessmentWindow.module.css";
import QnWindow from "./qnWindow/QnWindow";
import shuffle from "../../../utils/shuffle";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
const AssessmentWindow = (props) => {
  const [quizData, setQuizData] = useState();
  const [questionData, setQuestionData] = useState([]);
  const [completedQns, setCompletedQns] = useState([]);
  const [notSelected, setNotSelected] = useState(false);
  const [currentQn, setCurrentQn] = useState(1);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const data = props.quizData[0];

    setQuizData(data);
  }, [props.quizData]);
  useEffect(() => {
    if (quizData) {
      const shuffledQns = shuffle(shuffle(quizData.questions));
      setQuestionData(shuffledQns);
    }
  }, [quizData]);

  useEffect(() => {
    if (questionData.length > 0) {
      const storedAssessmentResponseData = JSON.parse(
        localStorage.getItem("assessmentResponseData")
      );
      const completedQn = [];
      questionData.forEach((qn, index) => {
        if (
          qn.id in
          storedAssessmentResponseData["selectedAnswers"][props.subjectId]
        ) {
          completedQn.push(index + 1);
        }
        setCompletedQns((prev) => [...prev, ...completedQn]);
      });
    }
  }, [questionData, props]);

  const setCompleted = (num) => {
    setCompletedQns((prev) => [...prev, num]);
  };

  const onSaveAnsClick = () => {
    const selectedAns = document.querySelectorAll(
      `input[name="${questionData[currentQn - 1].id}"]`
    );
    let checkedAns = null;
    selectedAns.forEach((ans) => {
      if (ans.checked) {
        checkedAns = ans.value;
      }
    });
    if (checkedAns) {
      setNotSelected(false);
      setCompleted(currentQn);
      const storedAssessmentResponseData = JSON.parse(
        localStorage.getItem("assessmentResponseData")
      );
      storedAssessmentResponseData["selectedAnswers"][props.subjectId][
        questionData[currentQn - 1].correctAnswer
      ] = checkedAns;
      localStorage.setItem(
        "assessmentResponseData",
        JSON.stringify(storedAssessmentResponseData)
      );
      if (currentQn < questionData.length) setCurrentQn((prev) => prev + 1);
    } else {
      setNotSelected(true);
    }
  };

  const onChangeQn = (num) => {
    setCurrentQn(num);
  };
  const onNextSectionClick = () => {
    const queryParams = new URLSearchParams(location.search);
    props.setQuizCompleted((prev) => [...prev, quizData.id]);
    queryParams.delete("quizId");
    history.replace({
      search: queryParams.toString(),
    });
  };
  return (
    <Fragment>
      {quizData && (
        <>
          <Header isNav={false} isTimer={true} totalTime={quizData.duration} />
          <div className="container-nh">
            <div className="container-inner">
              <div className={classes["assess-container"]}>
                <div className={classes["qn-container"]}>
                  <QnWindow
                    qnData={questionData}
                    currentQn={currentQn}
                    setCurrentQn={(num) => setCurrentQn(num)}
                    subjectId={props.subjectId}
                  />
                  <div className={classes["error-container"]}>
                    {notSelected && <p>Please select an answer first</p>}
                  </div>
                  <div className={classes["btn-container"]}>
                    <button
                      className={`btn ${classes["btn-save"]}`}
                      onClick={onSaveAnsClick}
                    >
                      Save
                    </button>
                    {currentQn === questionData.length && (
                      <button
                        className={`btn ${classes["btn-next"]}`}
                        onClick={onNextSectionClick}
                      >
                        Next Section
                      </button>
                    )}
                  </div>
                </div>
                <div className={classes["answered-container"]}>
                  <AnsWindow
                    totalCount={quizData.totalQuestions}
                    completed={completedQns}
                    onChangeQn={onChangeQn}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default React.memo(AssessmentWindow);
