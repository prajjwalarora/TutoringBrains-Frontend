import { Fragment } from "react";
import { Route, Switch } from "react-router";
import AuthComponent from "../components/auth/Auth";
import Footer from "../components/ui/footer/Footer";
import Header from "../components/ui/header/Header";

const AuthPage = () => {
  return (
    <Fragment>
      <Header isNav={true} />
      <Switch>
        <Route path="/auth/login" exact>
          <AuthComponent />
        </Route>
        <Route path="/auth/signup" exact>
          <AuthComponent />
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default AuthPage;
