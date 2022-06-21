import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import useLoader from "../../hooks/use-loader";
import { getAuthorValidation, getStudentValidation } from "../../lib/api";
import { authActions } from "../../store/auth-slice";
import Loader from "../ui/loader/Loader";
import classes from "./VerifyStatus.module.css";
const VerifyStatus = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(null);

  const { sendRequest, data, status, error } = useHttp(getStudentValidation);
  const {
    sendRequest: AVSendRequest,
    data: AVData,
    status: AVStatus,
    error: AVError,
  } = useHttp(getAuthorValidation);
  const auth = useSelector((data) => data.auth);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  //   useLoader(
  //     status,
  //     error,
  //     "Creating Question",
  //     "Question Created Successfully.",
  //     "Question creation failed."
  //   );

  useEffect(() => {
    if (queryParams.get("type") === "student") {
      sendRequest({
        token: auth.token,
        validationData: { actionId: queryParams.get("id") },
      });
    } else if (queryParams.get("type") === "instructor") {
      AVSendRequest({
        token: auth.token,
        validationData: { actionId: queryParams.get("id") },
      });
    }
  }, [sendRequest, auth, queryParams, AVSendRequest]);

  useEffect(() => {
    if (status === "completed" && !error) {
      setIsValid(data.isValid);
    }
  }, [status, error, data]);

  useEffect(() => {
    if (AVStatus === "completed" && !AVError) {
      setIsValid(AVData.isValid);
    }
  }, [AVStatus, AVError, AVData]);

  useEffect(() => {
    if (isValid != null && isValid === true) {
      history.replace({
        pathname: `/room/${queryParams.get("id")}`,
      });
    }
  }, [history, queryParams, isValid]);

  const logoutHandler = async () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  return (
    <div className={classes["verify-status-outer"]}>
      <div className={classes["verify-status-container"]}>
        <h3>
          {isValid === null
            ? "Please wait!!!"
            : isValid === false
            ? "Sorry!"
            : "Verified!"}
        </h3>
        {isValid === null && <Loader />}
        <p>
          {isValid === null
            ? "Verifying status..."
            : isValid === false
            ? "Not Allowed"
            : "Joining..."}
        </p>
        {isValid != null && isValid === false && (
          <div className={classes["btn-container"]}>
            <button onClick={logoutHandler} className="btn btn-dark-blue">
              logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyStatus;
