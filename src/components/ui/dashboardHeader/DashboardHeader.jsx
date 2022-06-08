import { useSelector } from "react-redux";
import icon from "../../../assets/images/tutoring-brains-icon.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "./DashboardHeader.module.css";
const DashboardHeader = () => {
  const user = useSelector((data) => data.user);
  return (
    <div className={classes["header"]}>
      <div className={`container-inner-big ${classes["header-inner"]}`}>
        <div className={classes["logo-container"]}>
          <img src={icon} alt="tutoringBrains icon" />
        </div>
        <div className={classes["header-right"]}>
          <div className={classes["user"]}>
            <p>{user.name.split(" ")[0]}</p>
            {/* <img src="https://i.pravatar.cc/300" alt="avatar" /> */}
            <AccountCircleIcon style={{ fontSize: 30 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
