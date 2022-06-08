import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./InvalidDevice.module.css";
const InvalidDevice = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  return (
    <div className={classes["invalid-device-outer"]}>
      <div className={classes["invalid-device-container"]}>
        <h3>Opps! Invalid Device</h3>
        <p>
          This device isn't registered with this account. please log in from a
          registered device.
        </p>
        <div className={classes["btn-container"]}>
          <button onClick={logoutHandler} className="btn btn-dark-blue">
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvalidDevice;
