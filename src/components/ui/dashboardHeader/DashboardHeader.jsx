import { useDispatch, useSelector } from "react-redux";
import icon from "../../../assets/images/tutoring-brains-icon.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./DashboardHeader.module.css";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { authActions } from "../../../store/auth-slice";
const DashboardHeader = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const user = useSelector((data) => data.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains(classes["user-inner"])) {
        setIsUserClicked(false);
      }
    });
  }, []);

  const onUserClickHandler = () => {
    setIsUserClicked((prev) => !prev);
  };

  const logoutHandler = async () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  return (
    <div className={classes["header"]}>
      <div className={`container-inner-big ${classes["header-inner"]}`}>
        <div className={classes["logo-container"]}>
          <NavLink to="/dashboard/user/home">
            <img src={icon} alt="tutoringBrains icon" />
          </NavLink>
        </div>
        <div className={classes["header-right"]}>
          <div className={classes["user"]}>
            <div className={classes["user-inner"]} onClick={onUserClickHandler}>
              <p>{user.name.split(" ")[0]}</p>
              {/* <img src="https://i.pravatar.cc/300" alt="avatar" /> */}
              <AccountCircleIcon
                style={{ fontSize: 30, pointerEvents: "none" }}
              />
            </div>
            {isUserClicked && (
              <div className={classes["user-dropdown"]}>
                <ul>
                  <li onClick={logoutHandler}>logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
