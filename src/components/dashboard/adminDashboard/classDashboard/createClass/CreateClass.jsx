import React, { useEffect, useRef, useState } from "react";
import useHttp from "./../../../../../hooks/use-http";
import useLoader from "./../../../../../hooks/use-loader";

import classes from "./CreateClass.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getStudent, scheduleClass } from "../../../../../lib/api";

const CreateClass = (props) => {
  const location = useLocation();
  const studentEmailRef = useRef();
  const [formError, setFormError] = useState(null);
  const [isAdditionReqSent, setAdditionReqSent] = useState(false);
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const history = useHistory();
  const { sendRequest, data, status, error } = useHttp(scheduleClass);
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
    "Scheduling class",
    "Class scheduled successfully.",
    "Scheduling class failed."
  );

  useEffect(() => {
    if (status === "completed" && !error && data) {
      if (!isAdditionReqSent) {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete("action");
        history.replace({
          pathname: "/dashboard/user/classes/",
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
      const temp = prev.filter(
        (student) => student._id === searchedStudent._id
      );
      if (temp.length === 0) {
        return [...prev, searchedStudent];
      }
      return prev;
    });
    studentEmailRef.current.value = null;
    setSearchedStudent(null);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormError(null);
    const formData = Object.fromEntries(new FormData(event.target).entries());
    const studentIds = students.map((student) => student._id);
    formData["students"] = studentIds;
    console.log(formData);
    sendRequest({ token: auth.token, classData: formData });
  };
  return (
    <div className={classes["wrapper-outer"]}>
      <div className={classes["form-container"]}>
        <button className={classes["close-btn"]} onClick={props.onCloseHandler}>
          <CloseIcon style={{ fontSize: 20 }} />
        </button>
        <div className={classes["form-header"]}>
          <h3>Schedule Class</h3>
        </div>
        <form
          className={classes["form"]}
          action="#"
          onSubmit={formSubmitHandler}
        >
          <div className={classes["form-field"]}>
            <label htmlFor="name">Class Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Please enter class name."
            />
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="classDate">Date</label>
            <input
              type="datetime-local"
              id="classDate"
              name="classDate"
              min={new Date().toISOString()}
              placeholder="Please select assessment date."
            />
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="">Enrolled Students</label>
            {(students && students.length) > 0 ? (
              students.map((student, index) => (
                <div key={index} className={classes["searched-student"]}>
                  <p>{student.name}</p>
                </div>
              ))
            ) : (
              <div className={classes["no-searched-student"]}>
                <p>No Student Select Yet.</p>
              </div>
            )}
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="name">Add Student via Email*</label>
            <div className={classes["email-search-container"]}>
              <input
                ref={studentEmailRef}
                type="email"
                id="name"
                placeholder="Please enter student email."
              />
              <button
                className="btn btn-dark-blue btn-auth"
                type="button"
                onClick={onStudentSearchClickHandler}
              >
                {studentStatus === "pending" ? "Loading..." : "Search"}
              </button>
            </div>
            {searchedStudent && (
              <div className={classes["search-wrapper"]}>
                <label htmlFor="name">Search Result*</label>
                <div
                  className={classes["searched-student"]}
                  onClick={addStudentClickHandler}
                >
                  <p>{searchedStudent.name}</p>
                </div>
              </div>
            )}
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

export default React.memo(CreateClass);
