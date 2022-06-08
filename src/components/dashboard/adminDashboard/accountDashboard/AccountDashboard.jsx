import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useHttp from "../../../../hooks/use-http";
import { updateMe } from "../../../../lib/api";
import { userActions } from "../../../../store/user-slice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "./AccountDashboard.module.css";

let id;
const AccountDashboard = () => {
  const {
    sendRequest: updateUser,
    status: updateUserStatus,
    data: updateUserData,
    error: updateUserError,
  } = useHttp(updateMe);
  const [heading, setHeading] = useState("Account Settings");
  const [isProfileUpdate, setIsProfileUpdate] = useState(false);
  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);
  const user = useSelector((data) => data.user);
  const auth = useSelector((data) => data.auth);
  const dispatch = useDispatch();
  const toastConfig = useMemo(() => {
    return {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };
  }, []);

  useEffect(() => {
    if (updateUserStatus === "pending") {
      id = toast.loading("Updating...", {
        ...toastConfig,
      });
    } else if (updateUserStatus === "completed") {
      if (!updateUserError) {
        toast.update(id, {
          render: "Updated Successfully.",
          type: "success",
          isLoading: false,
          ...toastConfig,
        });
        dispatch(userActions.updateUser(updateUserData.user));
      } else {
        toast.update(id, {
          render: "Update failed",
          type: "error",
          isLoading: false,
          ...toastConfig,
        });
      }
    }
  }, [
    updateUserStatus,
    updateUserError,
    updateUserData,
    dispatch,
    toastConfig,
  ]);

  const onUpdateProfileClickHandler = () => {
    setIsProfileUpdate((prev) => !prev);
    setHeading("Update Profile");
  };

  const onUpdatePasswordClickHandler = () => {
    setIsPasswordUpdate((prev) => !prev);
    setHeading("Update Password");
  };
  const onBackClickHandler = () => {
    setIsProfileUpdate(false);
    setIsPasswordUpdate(false);
    setHeading("Account Settings");
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target).entries());
    updateUser({ token: auth.token, userData: formData });
  };
  return (
    <div className={classes["account-outer"]}>
      <div className={classes["account-container"]}>
        <div className={classes["account-header"]}>
          {(isProfileUpdate || isPasswordUpdate) && (
            <span
              className={classes["back-arrow-container"]}
              onClick={onBackClickHandler}
            >
              <ArrowBackIcon style={{ fontSize: 26 }} />
            </span>
          )}
          <h4>{heading}</h4>
        </div>
        {!isPasswordUpdate && !isProfileUpdate && (
          <div className={classes["operation-selector-container"]}>
            <div
              className={classes["operation-selector"]}
              onClick={onUpdateProfileClickHandler}
            >
              <p>Update profile </p>
              <span>
                <ArrowForwardIosIcon style={{ fontSize: 16 }} />
              </span>
            </div>
            <hr className="seprator" />
            <div
              className={classes["operation-selector"]}
              onClick={onUpdatePasswordClickHandler}
            >
              <p>Update password </p>
              <span>
                <ArrowForwardIosIcon style={{ fontSize: 16 }} />
              </span>
            </div>
          </div>
        )}
        {isProfileUpdate && (
          <div className={classes["account-form-outer"]}>
            <form
              action="#"
              className={classes["account-form"]}
              onSubmit={updateProfileHandler}
            >
              <div className={classes["account-form-field"]}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.name}
                  placeholder="Please enter full name."
                />
              </div>
              <div className={classes["account-form-field"]}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  placeholder="Please enter Email."
                />
              </div>
              <div className={classes["account-form-field"]}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  defaultValue={user.phone}
                  placeholder="Please enter Phone Number."
                />
              </div>
              <div className={classes["account-form-field"]}>
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={user.role}
                  disabled={true}
                />
              </div>
              <div className={classes["save-btn-container"]}>
                <button type="submit" className="btn btn-blue btn-auth">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
        {/* <hr className="separator" /> */}
        {isPasswordUpdate && (
          <div className={classes["password-container"]}>
            <div className={classes["account-form-outer"]}>
              <form action="#" className={classes["passwprd-form"]}>
                <div className={classes["account-form-field"]}>
                  <label htmlFor="current-password">Current Password</label>
                  <input
                    type="password"
                    name="current-password"
                    id="current-password"
                    placeholder="Please enter current password."
                  />
                </div>
                <div className={classes["account-form-field"]}>
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Please enter new Password"
                  />
                </div>
                <div className={classes["account-form-field"]}>
                  <label htmlFor="repeat-password">Repeat Password</label>
                  <input
                    type="text"
                    name="repeat-password"
                    id="repeat-password"
                    placeholder="Please re-enter new password."
                  />
                </div>
                <div className={classes["save-btn-container"]}>
                  <button type="submit" className="btn btn-blue btn-auth">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDashboard;
