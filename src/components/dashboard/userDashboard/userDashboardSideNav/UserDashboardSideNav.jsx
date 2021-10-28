import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

import classes from "./UserDashboardSideNav.module.css";
const UserDashboardSideNav = () => {
  return (
    <div className={classes["sidenav"]}>
      <ul>
        <li className={classes["active-link"]}>
          <Link to="/dashboard">
            <DashboardRoundedIcon style={{ fontSize: 18 }} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <SchoolRoundedIcon style={{ fontSize: 18 }} /> <span>Classes</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <AssignmentRoundedIcon style={{ fontSize: 18 }} />{" "}
            <span>Assessment</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <ManageAccountsRoundedIcon style={{ fontSize: 18 }} />{" "}
            <span>Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDashboardSideNav;
