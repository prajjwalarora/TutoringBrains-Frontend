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
// import { authActions } from "./store/auth-slice";

function App() {
  const { sendRequest, status, data, error } = useHttp(getMe);
  const dispatch = useDispatch();
  const auth = useSelector((data) => data.auth);
  console.log(auth);

  useEffect(() => {
    if (auth) sendRequest({ token: auth.token });
  }, [auth, sendRequest]);
  console.log(data);
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
        })
      );
    }
  }, [dispatch, error, data, status]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     dispatch(authActions.login({ token }));
  //   }
  // }, [dispatch]);
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
      </Switch>
    </Fragment>
  );
}

export default App;
