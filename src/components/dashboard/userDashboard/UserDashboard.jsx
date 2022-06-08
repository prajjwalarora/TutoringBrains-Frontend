import DashboardHeader from "../../ui/dashboardHeader/DashboardHeader";
import classes from "./UserDashboard.module.css";
import UserDashboardSideNav from "./userDashboardSideNav/UserDashboardSideNav";

import MainDashboard from "./mainDahsboard/MainDashboard";
import { useParams } from "react-router-dom";
import AccountDashboard from "./accountDashboard/AccountDashboard";
import useHttp from "../../../hooks/use-http";
import { getMe } from "../../../lib/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-slice";
import ClassDashboard from "./classDashboard/ClassDashboard";
import AssessmentDashboard from "./assessmentDashboard/AssessmentDashboard";
let id,
  counter = 59;
const UserDashboard = () => {
  // const { sendRequest, status, data, error } = useHttp(getMe);
  // const dispatch = useDispatch();
  // const auth = useSelector((data) => data.auth);
  const params = useParams();
  // useEffect(() => {
  //   if (auth) sendRequest({ token: auth.token });
  // }, [auth, sendRequest]);
  // console.log(data);
  // useEffect(() => {
  //   if (status === "completed" && !error && data) {
  //     dispatch(
  //       userActions.setUser({
  //         id: data.data["_id"],
  //         name: data.data.name,
  //         avatar: data.data.avatar,
  //         email: data.data.email,
  //         phone: data.data.phone || "",
  //         role: data.data.role,
  //       })
  //     );
  //   }
  // }, [dispatch, error, data, status]);

  return (
    <div className={classes["dashboard"]}>
      <DashboardHeader />
      <div className={`${classes["dashboard-inner"]} container-inner-big`}>
        <div className={classes["dashboard-sidebar"]}>
          <UserDashboardSideNav />
        </div>
        {params.section === "home" && <MainDashboard />}
        {params.section === "classes" && <ClassDashboard />}
        {params.section === "assessments" && <AssessmentDashboard />}
        {params.section === "account" && <AccountDashboard />}
      </div>
    </div>
  );
};

export default UserDashboard;
