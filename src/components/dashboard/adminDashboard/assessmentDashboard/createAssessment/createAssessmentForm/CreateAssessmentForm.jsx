import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../../../../hooks/use-http";
import useLoader from "../../../../../../hooks/use-loader";
import { createAssessment } from "../../../../../../lib/api";
import classes from "./createAssessmentForm.module.css";

const CreateAssessmentForm = (props) => {
  const [formError, setFormError] = useState(null);
  const { sendRequest, data, status, error } = useHttp(createAssessment);
  const auth = useSelector((data) => data.auth);
  const user = useSelector((data) => data.user);
  useLoader(
    status,
    error,
    "Creating Assessment",
    "Assessment Created Successfully.",
    "Assessment creation failed."
  );

  useEffect(() => {
    if (status === "completed" && !error && data) {
      props.onCreated(data);
    }
  }, [status, error, data, props]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormError(null);
    const formData = Object.fromEntries(new FormData(event.target).entries());
    formData.duration = parseInt(formData.duration);
    if (formData.name === "" || formData.name.length < 4) {
      return setFormError("Assessment name is not valid");
    }
    formData.author = user.id;

    sendRequest({ token: auth.token, assessmentData: formData });
  };
  return (
    <div className={classes["form-container"]}>
      <div className={classes["form-header"]}>
        <h3>Create Assessment</h3>
      </div>
      <form className={classes["form"]} action="#" onSubmit={formSubmitHandler}>
        <div className={classes["form-field"]}>
          <label htmlFor="name">Assessment Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Please enter assessment name."
          />
        </div>
        <div className={classes["form-field"]}>
          <label htmlFor="name">Duration(in minutes)*</label>
          <input
            type="number"
            id="duration"
            name="duration"
            min={1}
            placeholder="Please enter assessment duration."
          />
        </div>
        <div className={classes["form-field"]}>
          <label htmlFor="examDate">Date</label>
          <input
            type="date"
            id="examDate"
            name="examDate"
            min={new Date().toISOString().split("T")[0]}
            placeholder="Please select assessment date."
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
  );
};

export default CreateAssessmentForm;
