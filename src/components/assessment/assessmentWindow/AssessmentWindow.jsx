import { Fragment, useEffect, useState } from "react";
import Header from "../../ui/header/Header";
import AnsWindow from "./ansWindow/AnsWindow";
import classes from "./AssessmentWindow.module.css";
import QnWindow from "./qnWindow/QnWindow";
import shuffle from "../../../utils/shuffle";
const AssessmentWindow = (props) => {
  const [quizData, setQuizData] = useState();
  const [questionData, setQuestionData] = useState([]);
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
  return (
    <Fragment>
      {quizData && (
        <>
          <Header
            isNav={false}
            isTimer={true}
            totalTime={quizData.timeDuration}
          />
          <div className="container-nh">
            <div className="container-inner">
              <div className={classes["assess-container"]}>
                <div className={classes["qn-container"]}>
                  <QnWindow qnData={questionData} />
                </div>
                <div className={classes["answered-container"]}>
                  <AnsWindow
                    totalCount={quizData.totalQuestions}
                    completedTill={0}
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

export default AssessmentWindow;
