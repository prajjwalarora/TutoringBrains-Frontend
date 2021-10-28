import icon from "../../../assets/images/tutoring-brains-icon.svg";
import classes from "./DashboardHeader.module.css";
const DashboardHeader = () => {
  return (
    <div className={classes["header"]}>
      <div className={`container-inner-big ${classes["header-inner"]}`}>
        <div className={classes["logo-container"]}>
          <img src={icon} alt="tutoringBrains icon" />
        </div>
        <div className={classes["header-right"]}>
          <div className={classes["dashboard-window"]}>
            <h1>Upcoming Assesment</h1>
          </div>
          <div className={classes["user"]}>
            <img src="https://i.pravatar.cc/300" alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
