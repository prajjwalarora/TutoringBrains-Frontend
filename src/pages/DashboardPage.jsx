import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import AdminDashboard from "../components/dashboard/adminDashboard/AdminDashboard";
import UserDashboard from "../components/dashboard/userDashboard/UserDashboard";

const DashboardPage = () => {
  const user = useSelector((data) => data.user);
  return (
    <Fragment>
      <Switch>
        <Route path="/dashboard/user/:section" exact>
          {user.role === "student" && <UserDashboard />}
          {user.role === "instructor" && <AdminDashboard />}
        </Route>
        <Route path="/dashboard/user/:section/:action" exact>
          {user.role === "student" && <UserDashboard />}
          {user.role === "instructor" && <AdminDashboard />}
        </Route>
      </Switch>
    </Fragment>
  );
};

export default DashboardPage;
