import { useState } from "react";
import AssessmentInfo from "../assessmentInfo/AssessmentInfo";
import classes from "./Subject.module.css";
import CreateSubjectForm from "./SubjectForm/SubjectForm";

const Subject = () => {
  const [assessmentInfo, setAssessmentInfo] = useState({
    id: "62a43b1c724dbbfc35707a82",
    name: "Test Assessment",
    duration: 20,
  });
  const [subjects, setSubjects] = useState([]);
  return (
    <div className={classes["wrapper"]}>
      {!assessmentInfo && (
        <CreateSubjectForm
          onCreated={(assessmentData) => setSubjects(assessmentData)}
        />
      )}
      {assessmentInfo && <AssessmentInfo assessmentInfo={assessmentInfo} />}
      {assessmentInfo && subjects && subjects.map((subject, index) => <></>)}
    </div>
  );
};

export default Subject;
