import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router";
import AssessmentPreStart from "./assessmentPreStart/AssessmentPreStart";
// import Footer from "../ui/footer/Footer";
import AssessmentWindow from "./assessmentWindow/AssessmentWindow";
import shuffle from "../../utils/shuffle";
// import data from "./assessmentData.json";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAssessment } from "../../lib/api";
import { useSelector } from "react-redux";

import classes from "./Assessment.module.css";

const Assessment = () => {
  const [searchParams, setSearchParams] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [assessmentResponseData, setAssessmentResponseData] = useState(null);

  const [quiz, setQuiz] = useState([]);
  const [quizInfo, setQuizInfo] = useState([]);
  const location = useLocation();
  const params = useParams();
  const auth = useSelector((data) => data.auth);
  const user = useSelector((data) => data.user);
  const { sendRequest, status, data, error } = useHttp(getAssessment);

  useEffect(() => {
    if (auth && "assessmentId" in params)
      sendRequest({ token: auth.token, assessmentId: params["assessmentId"] });
  }, [auth, sendRequest, params]);

  const toggleFullScreen = () => {
    document.documentElement
      .requestFullscreen({ navigationUI: "hide" })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", (e) => {
      if (!document.fullscreenElement) {
        console.log("was in");
        // setTimeout(() => {
        //   toggleFullScreen();
        // }, 400);
        setIsFullScreen(false);
      } else {
        console.log("going in");
      }
    });
    document.addEventListener("visibilitychange", (e) => {
      console.log("Window switch");
    });
  }, []);

  // useEffect(() => {
  //   window.addEventListener("keyup", (e) => {
  //     toggleFullScreen();
  //   });
  // });

  useEffect(() => {
    if (location.search) {
      console.log("location.search");
      const queryParams = new URLSearchParams(location.search);
      setSearchParams(queryParams);
    } else {
      setSearchParams(null);
    }
  }, [location]);
  useEffect(() => {
    if (status === "completed" && !error) {
      const responseData = {
        assessmentId: data.id,
        userId: user.id,
        selectedAnswers: {},
      };
      data.subjects.forEach((sub) => {
        responseData["selectedAnswers"][sub.id] = [];
      });
      setAssessmentResponseData(responseData);
      const shiffledQuiz = shuffle(shuffle(data.subjects));
      setQuiz(shiffledQuiz);
      const quizStatusInfo = shiffledQuiz.map((quiz) => {
        return {
          id: quiz._id,
          name: quiz.name,
          totalQuestions: quiz.totalQuestions,
          timeDuration: quiz.timeDuration,
          isCompleted: false,
        };
      });
      setQuizInfo(quizStatusInfo);
    }
  }, [status, error, data, user]);

  useEffect(() => {
    const storedAssessmentResponseData = localStorage.getItem(
      "assessmentResponseData"
    );
    if (assessmentResponseData && !storedAssessmentResponseData) {
      localStorage.setItem(
        "assessmentResponseData",
        JSON.stringify(assessmentResponseData)
      );
    }
  }, [assessmentResponseData]);

  const onfullScreenOkClickHandler = () => {
    toggleFullScreen();
    setIsFullScreen(true);
  };
  return (
    <Fragment>
      {!isFullScreen && (
        <div className={classes["full-screen-popup"]}>
          <div className={classes["full-screen-popup-container"]}>
            <div className={classes["full-screen-text"]}>
              <p>Please keep full mode while assessment is active.</p>
              <button onClick={onfullScreenOkClickHandler}>Ok</button>
            </div>
          </div>
        </div>
      )}
      {(!searchParams || (searchParams && !searchParams.has("quizId"))) && (
        <AssessmentPreStart
          quizHeading={data ? data.name : ""}
          quizInfo={quizInfo}
          toggleFullScreen={toggleFullScreen}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      )}
      {searchParams && searchParams.has("quizId") && (
        <AssessmentWindow
          quizData={quiz.filter((q) => q.id === searchParams.get("quizId"))}
          subjectId={searchParams.get("quizId")}
        />
      )}
    </Fragment>
  );
};

export default Assessment;
