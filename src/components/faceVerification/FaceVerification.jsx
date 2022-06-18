import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useHttp from "../../hooks/use-http";
import { registerDevice } from "../../lib/api";
import { authActions } from "../../store/auth-slice";
import { userActions } from "../../store/user-slice";
import classes from "./FaceVerification.module.css";

let id;
const FaceVerification = () => {
  const { sendRequest, status, data, error } = useHttp(registerDevice);
  const auth = useSelector((data) => data.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "pending") {
      id = toast.loading("Registring Device...", {
        position: "top-right",
        // autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (status === "completed") {
      if (!error) {
        toast.update(id, {
          render: "Device Registration Successfull",
          type: "success",
          isLoading: false,
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(userActions.updateUser(data.user));
        history.push("/");
      } else {
        toast.update(id, {
          render: "Device Registration failed",
          type: "error",
          isLoading: false,
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [status, error, history, data, dispatch]);

  const registerDeviceHandler = () => {
    // sendRequest({
    //   token: auth.token,
    //   deviceData: { deviceFingerprint: auth.currDeviceFingerPrint },
    // });
  };

  const logoutHandler = async () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  return (
    <div className={classes["registration-outer"]}>
      <div className={classes["registration-container"]}>
        <h3>Face Registration</h3>
        <p>
          This device will be registered with this account and will not be
          accessible from somewhere else after that.
        </p>
        <p>Want to Authorize this device?</p>
        <div className={classes["btn-container"]}>
          <button onClick={registerDeviceHandler} className="btn btn-dark-blue">
            Authorize
          </button>
          <button onClick={logoutHandler} className="btn">
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceVerification;
