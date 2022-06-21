import React, { useEffect, useRef, useState } from "react";
import useHttp from "./../../../../../hooks/use-http";
import useLoader from "./../../../../../hooks/use-loader";

import classes from "./PublishForm.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getStudent, publishedAssessment } from "../../../../../lib/api";

const PublishForm = (props) => {
  const location = useLocation();
  const studentEmailRef = useRef();
  const [formError, setFormError] = useState(null);
  const [isAdditionReqSent, setAdditionReqSent] = useState(false);
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const history = useHistory();
  const { sendRequest, data, status, error } = useHttp(publishedAssessment);
  const {
    sendRequest: studentRequest,
    data: studentData,
    status: studentStatus,
    error: studentError,
  } = useHttp(getStudent);
  const auth = useSelector((data) => data.auth);
  useLoader(
    status,
    error,
    "Publishing Assessment",
    "Assessment published successfully.",
    "Assessment pubishling failed."
  );

  useEffect(() => {
    if (status === "completed" && !error && data) {
      if (!isAdditionReqSent) {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete("action");
        history.replace({
          pathname: "/dashboard/user/assessments/",
        });
        setAdditionReqSent(true);
      }
    }
  }, [status, error, data, auth, location, isAdditionReqSent, history]);

  useEffect(() => {
    if (studentStatus === "completed" && !studentError) {
      setSearchedStudent(studentData.user);
    }
  }, [studentStatus, studentError, studentData]);

  const onStudentSearchClickHandler = () => {
    studentRequest({ token: auth.token, email: studentEmailRef.current.value });
  };

  const addStudentClickHandler = () => {
    setStudents((prev) => {
      const temp = prev.filter((student) => student === searchedStudent._id);
      if (temp.length === 0) {
        return [...prev, searchedStudent._id];
      }
      return prev;
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormError(null);
    const formData = Object.fromEntries(new FormData(event.target).entries());

    formData["published"] = true;
    formData["students"] = students;
    const assessmentId = new URLSearchParams(location.search).get("id");
    sendRequest({ token: auth.token, assessmentId, publishData: formData });
  };
  return (
    <div className={classes["wrapper-outer"]}>
      <div className={classes["form-container"]}>
        <button className={classes["close-btn"]} onClick={props.onCloseHandler}>
          <CloseIcon style={{ fontSize: 20 }} />
        </button>
        <div className={classes["form-header"]}>
          <h3>Publish Assessment</h3>
        </div>
        <form
          className={classes["form"]}
          action="#"
          onSubmit={formSubmitHandler}
        >
          <div className={classes["form-field"]}>
            <label htmlFor="name">Search Student via Email*</label>
            <div className={classes["email-search-container"]}>
              <input
                ref={studentEmailRef}
                type="text"
                id="name"
                placeholder="Please enter student email."
              />
              <button
                className="btn btn-dark-blue btn-auth"
                type="button"
                onClick={onStudentSearchClickHandler}
              >
                Search
              </button>
            </div>
            <div className={classes["search-wrapper"]}>
              <label htmlFor="name">Search Result*</label>
              {searchedStudent && (
                <div
                  className={classes["searched-student"]}
                  onClick={addStudentClickHandler}
                >
                  <p>{searchedStudent.name}</p>
                </div>
              )}
            </div>
          </div>
          {formError && <p className="error-msg">{formError}</p>}
          <div className={classes["form-btns"]}>
            <button type="submit" className="btn btn-dark-blue btn-auth">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(PublishForm);
