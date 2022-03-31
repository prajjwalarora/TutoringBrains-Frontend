import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Assessment from "./pages/AssessmentPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/DashboardPage";
import Room from "./pages/RoomPage";

function App() {
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        style={{
          top: 40,
        }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // pauseOnHover
      />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth/login" />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/assessment">
          <Assessment />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/room">
          <Room />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
