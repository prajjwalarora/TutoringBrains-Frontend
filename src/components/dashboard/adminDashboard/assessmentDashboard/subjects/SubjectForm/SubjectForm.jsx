import React, { useEffect, useState } from "react";
import useHttp from "../../../../../../hooks/use-http";
import useLoader from "../../../../../../hooks/use-loader";
import { addSubIntoAssessment, createSubject } from "../../../../../../lib/api";
import classes from "./SubjectForm.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SubjectForm = (props) => {
  const location = useLocation();
  const [formError, setFormError] = useState(null);
  const [isAdditionReqSent, setAdditionReqSent] = useState(false);
  const history = useHistory();
  const { sendRequest, data, status, error } = useHttp(createSubject);
  const auth = useSelector((data) => data.auth);

  const {
    sendRequest: addIntoAssess,
    data: addIntoAssessData,
    status: addIntoAssessStatus,
    error: addIntoAssessError,
  } = useHttp(addSubIntoAssessment);

  useLoader(
    status,
    error,
    "Creating Subject",
    "Subject Created Successfully.",
    "Subject creation failed."
  );

  useLoader(
    addIntoAssessStatus,
    addIntoAssessError,
    "Adding Subject",
    "Subject Added Successfully.",
    "Subject Add failed."
  );

  useEffect(() => {
    if (status === "completed" && !error && data) {
      if (!isAdditionReqSent) {
        addIntoAssess({
          token: auth.token,
          assessmentid: props.assessmentInfo.id,
          assessmentData: { subjects: [data.id] },
        });
        props.onCreated(data);
        setAdditionReqSent(true);
      }
    }
  }, [status, error, data, auth, props, addIntoAssess, isAdditionReqSent]);

  useEffect(() => {
    if (
      addIntoAssessStatus === "completed" &&
      !addIntoAssessError &&
      addIntoAssessData
    ) {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete("action");
      history.replace({
        search: queryParams.toString(),
      });
    }
  }, [
    addIntoAssessStatus,
    addIntoAssessError,
    history,
    addIntoAssessData,
    props,
    location,
    data,
  ]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormError(null);
    const formData = Object.fromEntries(new FormData(event.target).entries());
    formData.duration = parseInt(formData.duration);
    if (formData.name === "" || formData.name.length < 4) {
      return setFormError("Subject name is not valid");
    }
    console.log({ token: auth.token, subjectData: formData });
    sendRequest({ token: auth.token, subjectData: formData });
  };
  return (
    <div className={classes["wrapper-outer"]}>
      <div className={classes["form-container"]}>
        <button className={classes["close-btn"]} onClick={props.onCloseHandler}>
          <CloseIcon style={{ fontSize: 20 }} />
        </button>
        <div className={classes["form-header"]}>
          <h3>Create Subject</h3>
        </div>
        <form
          className={classes["form"]}
          action="#"
          onSubmit={formSubmitHandler}
        >
          <div className={classes["form-field"]}>
            <label htmlFor="name">Subject Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Please enter Subject name."
            />
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="name">Duration(in minutes)*</label>
            <input
              type="number"
              id="duration"
              name="duration"
              min={1}
              placeholder="Please enter ubject duration."
            />
          </div>
          {formError && <p className="error-msg">{formError}</p>}
          <div className={classes["form-btns"]}>
            <button type="submit" className="btn btn-dark-blue btn-auth">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(SubjectForm);
