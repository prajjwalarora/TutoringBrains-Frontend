import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useHttp from "../../../../../hooks/use-http";
import { getAssessment } from "../../../../../lib/api";
import AssessmentInfo from "../assessmentInfo/AssessmentInfo";
import QuestionForm from "../questions/questionForm/QuestionForm";
import SubjectForm from "../subjects/SubjectForm/SubjectForm";
import SubjectInfo from "../subjects/subjectInfo/SubjectInfo";
import classes from "./CreateAssessment.module.css";
import CreateAssessmentForm from "./createAssessmentForm/CreateAssessmentForm";

const CreateAssessment = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useSelector((data) => data.auth);
  const [searchParams, setSearchParams] = useState(null);
  const [assessmentInfo, setAssessmentInfo] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [assessmentDataFetched, setAssessmentDataFetched] = useState(false);
  const { sendRequest, status, data, error } = useHttp(getAssessment);
  console.log({ subjects });
  useEffect(() => {
    if (location) {
      console.log(location);
      const queryParams = new URLSearchParams(location.search);
      setSearchParams(Object.fromEntries(queryParams));
    }
  }, [location]);

  useEffect(() => {
    if (!assessmentInfo && searchParams && auth && !assessmentDataFetched) {
      if (searchParams["id"]) {
        sendRequest({ token: auth.token, assessmentId: searchParams["id"] });
        setAssessmentDataFetched(true);
      }
    }
  }, [assessmentInfo, searchParams, sendRequest, auth, assessmentDataFetched]);

  useEffect(() => {
    if (status === "completed" && !error && data) {
      setAssessmentInfo({
        id: data.id,
        name: data.name,
        duration: data.duration,
      });
      setSubjects(data.subjects);
    }
  }, [status, error, data]);

  const onClickCreateAndAddSubjectHandler = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.append("action", "add-create-subject");
    history.replace({
      search: queryParams.toString(),
    });
    // history.push({
    //   search: queryParams,
    // });
  };

  const onClickCreateAndAddQuestionHandler = (subjectId) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.append("action", "add-create-question");
    queryParams.append("subject-id", subjectId);
    history.replace({
      search: queryParams.toString(),
    });
    // history.push({
    //   search: queryParams,
    // });
  };

  const onCloseHandler = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("action");
    history.replace({
      search: queryParams.toString(),
    });
  };

  const onQnCloseHandler = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("action");
    queryParams.delete("subject-id");
    history.replace({
      search: queryParams.toString(),
    });
  };

  return (
    <div className={classes["wrapper"]}>
      {searchParams && searchParams["action"] === "add-create-subject" && (
        <SubjectForm
          assessmentInfo={assessmentInfo}
          onCloseHandler={onCloseHandler}
          onCreated={(assessmentData) =>
            setSubjects((prev) => [...prev, assessmentData])
          }
        />
      )}
      {searchParams && searchParams["action"] === "add-create-question" && (
        <QuestionForm
          subjectId={searchParams["subject-id"]}
          onCloseHandler={onQnCloseHandler}
          onCreated={(questionData) =>
            setSubjects((prev) => {
              const tempData = [];
              prev.forEach((sub) => {
                if (sub.id === searchParams["subject-id"]) {
                  sub["questions"] = [...sub["questions"], questionData];
                  tempData.push(sub);
                } else {
                  tempData.push(sub);
                }
              });
              return tempData;
            })
          }
        />
      )}
      {!assessmentInfo && (
        <CreateAssessmentForm
          onCreated={(assessmentData) => {
            setAssessmentInfo(assessmentData);
            history.replace({
              search: `?id=${assessmentData.id}`,
            });
          }}
        />
      )}
      {assessmentInfo && (
        <AssessmentInfo
          assessmentInfo={assessmentInfo}
          onClickCreateAndAddSubjectHandler={onClickCreateAndAddSubjectHandler}
        />
      )}
      {assessmentInfo &&
        subjects &&
        subjects.map((subject, index) => (
          <SubjectInfo
            key={index}
            subjectInfo={subject}
            questions={subject.questions}
            onClickCreateAndAddQuestionHandler={
              onClickCreateAndAddQuestionHandler
            }
          />
        ))}
    </div>
  );
};

export default CreateAssessment;
