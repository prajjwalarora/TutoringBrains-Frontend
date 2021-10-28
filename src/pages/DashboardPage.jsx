import { Fragment } from "react";
import { Route, Switch } from "react-router";
import UserDashboard from "../components/dashboard/userDashboard/UserDashboard";

const DashboardPage = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/dashboard/user">
          <UserDashboard />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default DashboardPage;
