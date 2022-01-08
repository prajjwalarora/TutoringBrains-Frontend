import { Fragment, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router";
import AssessmentPreStart from "./assessmentPreStart/AssessmentPreStart";
// import Footer from "../ui/footer/Footer";
import AssessmentWindow from "./assessmentWindow/AssessmentWindow";
import shuffle from "../../utils/shuffle";
import data from "./assessmentData.json";

const Assessment = () => {
  const [quiz, setQuiz] = useState([]);
  const [quizInfo, setQuizInfo] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    // const toggleFullScreen = () => {
    //   document.documentElement
    //     .requestFullscreen({ navigationUI: "hide" })
    //     .then((res) => console.log(res))
    //     .catch((error) => console.log(error));
    // };
    // window.addEventListener("keyup", (e) => {
    //   toggleFullScreen();
    // });
    // document.addEventListener("fullscreenchange", (e) => {
    //   if (!document.fullscreenElement) {
    //     console.log("was in");
    //     setTimeout(() => {
    //       toggleFullScreen();
    //     }, 400);
    //   } else {
    //     console.log("going in");
    //   }
    // });
    // document.addEventListener("visibilitychange", (e) => {
    //   console.log("Window switch");
    // });
  }, []);
  useEffect(() => {
    const shiffledQuiz = shuffle(shuffle(data.quiz));
    setQuiz(shiffledQuiz);
    const quizStatusInfo = shiffledQuiz.map((quiz) => {
      return {
        id: quiz.id,
        name: quiz.name,
        totalQuestions: quiz.totalQuestions,
        isCompleted: false,
      };
    });
    setQuizInfo(quizStatusInfo);
  }, [quiz]);
  return (
    <Fragment>
      {!searchParams.has("quizId") && (
        <AssessmentPreStart quizInfo={quizInfo} />
      )}
      {searchParams.has("quizId") && (
        <AssessmentWindow
          quizData={quiz.filter((q) => q.id === searchParams.get("quizId"))}
        />
      )}
    </Fragment>
  );
};

export default Assessment;
