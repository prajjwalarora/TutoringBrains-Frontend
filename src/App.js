import { Fragment, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Assessment from "./pages/AssessmentPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/DashboardPage";
import Room from "./pages/RoomPage";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "./hooks/use-http";
import { getMe } from "./lib/api";
import { userActions } from "./store/user-slice";
import DebugPage from "./pages/DebugPage";
import { useHistory } from "react-router-dom";
import DeviceRegistrationPage from "./pages/DeviceRegistrationPage";
import InvalidDevicePage from "./pages/InvalidDevicePage";
import { authActions } from "./store/auth-slice";
import FaceRecognitionPage from "./pages/FaceRecognitionPage";
import FaceVerificationPage from "./pages/FaceVerificationPage";
import ClassPage from "./pages/ClassPage";

function App() {
  const { sendRequest, status, data, error } = useHttp(getMe);
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((data) => data.auth);
  const user = useSelector((data) => data.user);

  useEffect(() => {
    if (auth && auth.token != null && auth.isLoggedIn === true)
      sendRequest({ token: auth.token });
  }, [auth, sendRequest]);

  useEffect(() => {
    if (status === "completed" && !error && data) {
      dispatch(
        userActions.setUser({
          id: data.data["_id"],
          name: data.data.name,
          avatar: data.data.avatar,
          email: data.data.email,
          phone: data.data.phone || "",
          role: data.data.role,
          deviceFingerprint: data.data.deviceFingerprint,
        })
      );
    } else if (status === "completed" && error) {
      dispatch(authActions.logout());
      history.push("/");
    }
  }, [dispatch, error, data, status, history]);
  useEffect(() => {
    if (
      auth.isLoggedIn &&
      user &&
      ((user.deviceFingerprint && user.deviceFingerprint.length === 0) ||
        !user.deviceFingerprint)
    ) {
      history.push("/registerDevice");
    } else if (
      auth.currDeviceFingerPrint &&
      user.deviceFingerprint !== auth.currDeviceFingerPrint
    ) {
      history.push("/registerDevice");
    } else if (auth.isLoggedIn && !user.avatar) {
      history.push("/faceAuthentication");
    }
  }, [user, history, auth]);
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
          {auth.isLoggedIn ? (
            <Redirect to="/dashboard/user/home" />
          ) : (
            <Redirect to="/auth/login" />
          )}
        </Route>
        <Route path="/registerDevice" exact>
          {auth.isLoggedIn ? (
            <DeviceRegistrationPage />
          ) : (
            <Redirect to="/auth/login" />
          )}
        </Route>
        <Route path="/faceAuthentication" exact>
          {auth.isLoggedIn ? (
            <FaceRecognitionPage />
          ) : (
            <Redirect to="/auth/login" />
          )}
        </Route>
        <Route path="/faceVerification" exact>
          {auth.isLoggedIn ? (
            <FaceVerificationPage />
          ) : (
            <Redirect to="/auth/login" />
          )}
        </Route>
        <Route path="/invalidDevice" exact>
          <InvalidDevicePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/assessment">
          {!auth.isLoggedIn ? <Redirect to="/auth/login" /> : <Assessment />}
        </Route>
        <Route path="/dashboard">
          {!auth.isLoggedIn ? <Redirect to="/auth/login" /> : <Dashboard />}
        </Route>
        <Route path="/room">
          {!auth.isLoggedIn ? <Redirect to="/auth/login" /> : <Room />}
        </Route>
        <Route path="/classess">
          {!auth.isLoggedIn ? <Redirect to="/auth/login" /> : <ClassPage />}
        </Route>
        <Route path="/debug" exact={true}>
          <DebugPage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
