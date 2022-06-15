import React, { useEffect, useRef, useState } from "react";
import useHttp from "../../../../../../hooks/use-http";
import useLoader from "../../../../../../hooks/use-loader";
import classes from "./QuestionForm.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addSubIntoSubject, createQuestion } from "../../../../../../lib/api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { v4 as uuid } from "uuid";

const QuestionForm = (props) => {
  const location = useLocation();
  const [formError, setFormError] = useState(null);
  const answerRef = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [isAdditionReqSent, setAdditionReqSent] = useState(false);
  const history = useHistory();
  const { sendRequest, data, status, error } = useHttp(createQuestion);
  const auth = useSelector((data) => data.auth);
  console.log(answers);
  const {
    sendRequest: addIntoQn,
    data: addIntoQnData,
    status: addIntoQnStatus,
    error: addIntoQnError,
  } = useHttp(addSubIntoSubject);

  useLoader(
    status,
    error,
    "Creating Question",
    "Question Created Successfully.",
    "Question creation failed."
  );

  useLoader(
    addIntoQnStatus,
    addIntoQnError,
    "Adding Question",
    "Question Added Successfully.",
    "Adding Question failed."
  );

  useEffect(() => {
    if (status === "completed" && !error && data) {
      if (!isAdditionReqSent) {
        addIntoQn({
          token: auth.token,
          subjectid: props.subjectId,
          subjectData: { questions: [data.id] },
        });
        props.onCreated(data);
        setAdditionReqSent(true);
      }
    }
  }, [status, error, data, auth, props, addIntoQn, isAdditionReqSent]);

  useEffect(() => {
    if (addIntoQnStatus === "completed" && !addIntoQnError && addIntoQnData) {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete("action");
      queryParams.delete("subject-id");
      history.replace({
        search: queryParams.toString(),
      });
    }
  }, [
    addIntoQnStatus,
    addIntoQnError,
    history,
    addIntoQnData,
    props,
    location,
    data,
  ]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormError(null);
    const formData = Object.fromEntries(new FormData(event.target).entries());
    formData.answers = answers;
    if (formData.text === "" || formData.text.length < 4) {
      return setFormError("Question name is not valid");
    }
    console.log({ token: auth.token, questionData: formData });
    sendRequest({ token: auth.token, questionData: formData });
  };

  const onAnsAdd = () => {
    setFormError(null);
    if (answerRef.current.value.length > 5) {
      const text = answerRef.current.value;
      setAnswers((prev) => [...prev, { id: uuid(), text }]);
      answerRef.current.value = "";
    } else {
      return setFormError("Answer is not valid");
    }
  };

  const editAns = (ansId) => {
    const remainAns = answers.filter((ans) => ans.id !== ansId);
    const editAns = answers.filter((ans) => ans.id === ansId)[0];
    setAnswers(remainAns);
    answerRef.current.value = editAns.text;
  };

  return (
    <div className={classes["wrapper-outer"]}>
      <div className={classes["form-container"]}>
        <button className={classes["close-btn"]} onClick={props.onCloseHandler}>
          <CloseIcon style={{ fontSize: 20 }} />
        </button>
        <div className={classes["form-header"]}>
          <h3>Create Question</h3>
        </div>
        <form
          className={classes["form"]}
          action="#"
          onSubmit={formSubmitHandler}
        >
          <div className={classes["form-field"]}>
            <label htmlFor="type">Type: </label>
            <input type="text" value="mcq" disabled={true} />
            <input
              type="text"
              name="type"
              id="type"
              defaultValue="mcq"
              hidden={true}
            />
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="text">Question*</label>
            <textarea
              type="text"
              id="text"
              name="text"
              placeholder="Please enter Question."
              rows={3}
            ></textarea>
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="name">Answers*</label>
            <div className={classes["ans-container"]}>
              {answers.map((ans, index) => (
                <div key={ans.id} className={classes["ans-wrapper"]}>
                  <p>
                    {index + 1}. {ans.text}
                  </p>
                  <button
                    type="button"
                    className="btn btn-blue"
                    onClick={editAns.bind(null, ans.id)}
                  >
                    <EditIcon style={{ fontSize: 16 }} />
                  </button>
                  <button type="button" className="btn btn-red">
                    <DeleteForeverIcon style={{ fontSize: 16 }} />
                  </button>
                </div>
              ))}
            </div>
            <div className={classes["add-ans-container"]}>
              <input
                ref={answerRef}
                type="text"
                placeholder="Please enter Answer."
              />
              <button
                type="button"
                className="btn btn-dark-blue"
                onClick={onAnsAdd}
              >
                Add
              </button>
            </div>
          </div>
          <div className={classes["form-field"]}>
            <label htmlFor="name">Correct Answer*</label>
            {/* <input
              type="number"
              id="duration"
              name="duration"
              min={1}
              placeholder="Please enter ubject duration."
            /> */}
            <select name="correctAnswer" defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Select Correct Answer
              </option>
              {answers.map((ans, index) => (
                <option value={ans.id} key={ans.id}>
                  {ans.text}
                </option>
              ))}
            </select>
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

export default React.memo(QuestionForm);
