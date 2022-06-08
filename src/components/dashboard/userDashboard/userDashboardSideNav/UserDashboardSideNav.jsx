import { NavLink } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

import classes from "./UserDashboardSideNav.module.css";
const UserDashboardSideNav = () => {
  return (
    <div className={classes["sidenav"]}>
      <ul>
        <li>
          <NavLink
            to="/dashboard/user/home"
            className={classes["link"]}
            activeClassName={classes["active-link"]}
          >
            <DashboardRoundedIcon style={{ fontSize: 18 }} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/classes"
            className={classes["link"]}
            activeClassName={classes["active-link"]}
          >
            <SchoolRoundedIcon style={{ fontSize: 18 }} /> <span>Classes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/assessments"
            className={classes["link"]}
            activeClassName={classes["active-link"]}
          >
            <AssignmentRoundedIcon style={{ fontSize: 18 }} />
            <span>Assessment</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/user/account"
            className={classes["link"]}
            activeClassName={classes["active-link"]}
          >
            <ManageAccountsRoundedIcon style={{ fontSize: 18 }} />
            <span>Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserDashboardSideNav;
