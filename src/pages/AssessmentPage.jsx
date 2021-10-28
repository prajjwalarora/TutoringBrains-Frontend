import { Fragment } from "react";
import { Route, Switch } from "react-router";
import Assessment from "../components/assessment/Assessment";

const AssessmentPage = () => {
  return (
    <Fragment>
      <Switch>
        <Route>
          <Assessment />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default AssessmentPage;
